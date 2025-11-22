from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)
CORS(app)

EMAIL_EMISOR = 'notifications@lookandgo.pe'
EMAIL_PASSWORD = 'qdltvhiopsahrrwi'  # Reemplaza con tu app password real

# Email adicional para logística
EMAIL_OPERATIONS = 'operations.manager@lookandgo.pe'
EMAIL_LOGISTICA = 'commercial.manager@lookandgo.pe'  # <- Cambia aquí al email real del gerente logística

@app.route('/confirmar-compra', methods=['POST'])
def enviar_confirmacion():
    data = request.json

    required_fields = ['nombre', 'email', 'telefono', 'fecha', 'hora', 'branch', 'representante', 'productos']
    missing_fields = [field for field in required_fields if not data.get(field)]
    if missing_fields:
        return jsonify({'error': f'Faltan campos obligatorios: {", ".join(missing_fields)}'}), 400
    
    nombre = data.get('nombre')
    email_cliente = data.get('email')  # email del cliente
    telefono = data.get('telefono')
    fecha = data.get('fecha')
    hora = data.get('hora')
    branch = data.get('branch')
    representante = data.get('representante')
    productos = data.get('productos', [])  # [{nombre, cantidad, precio}]
    
    total = sum(p['precio'] for p in productos)
    productos_html = "".join(
        f"<li>{p['nombre']} - Precio unitario: S/ {p['precio']:.2f}</li>"
        for p in productos
    )

    # --- Cuerpo para la empresa ---
    asunto_empresa = 'Nuevo Pedido Confirmado | Look & Go'
    cuerpo_empresa = f'''
    <html>
        <body style="font-family: Arial, sans-serif;">
            <h2>Nuevo pedido confirmado:</h2>
            <ul>
                <li><strong>Nombre:</strong> {nombre}</li>
                <li><strong>Email:</strong> {email_cliente}</li>
                <li><strong>Teléfono:</strong> {telefono}</li>
                <li><strong>Fecha de entrega:</strong> {fecha}</li>
                <li><strong>Hora:</strong> {hora}</li>
                <li><strong>Estación del tren:</strong> {branch}</li>
                <li><strong>Encargado de entrega:</strong> {representante}</li>
            </ul>
            <h3>Productos:</h3>
            <ul>{productos_html}</ul>
            <p><strong>Total:</strong> S/ {total:.2f}</p>
        </body>
    </html>
    '''

    # --- Cuerpo para el cliente ---
    asunto_cliente = 'Confirmación de Entrega | Look & Go'
    cuerpo_cliente = f'''
    <html>
        <body style="font-family: Arial, sans-serif;">
            <h2 style="color: navy;">¡Gracias por tu pedido, {nombre}!</h2>
            <p>Hemos recibido tu solicitud de entrega. Aquí te dejamos los detalles:</p>
            <h3>📦 Datos del Pedido:</h3>
            <ul>
                <li><strong>Nombre:</strong> {nombre}</li>
                <li><strong>Email del cliente:</strong> {email_cliente}</li>
                <li><strong>Teléfono:</strong> {telefono}</li>
                <li><strong>Fecha de entrega:</strong> {fecha}</li>
                <li><strong>Hora:</strong> {hora}</li>
                <li><strong>Estación del tren:</strong> {branch}</li>
                <li><strong>Encargado de entrega:</strong> {representante}</li>
            </ul>
            <h3>🛍️ Productos confirmados:</h3>
            <ul>{productos_html}</ul>
            <p><strong>Total:</strong> S/ {total:.2f}</p>
            <p style="margin-top: 30px;">
                Por favor, si tuvieras algún inconveniente o cambio de horario, <strong>infórmanos con anticipación</strong> para evitar desplazamientos innecesarios.<br>
                ¡Gracias por confiar en <strong>Look & Go</strong>!
            </p>
            <p style="margin-top: 20px;">
                Si tienes alguna consulta, contáctanos vía email: <strong>informes@lookandgo.pe</strong> 
                o por WhatsApp: <a href="https://wa.me/51922762808">+51 922 762 808</a>.</p>

            <p style="color: #555;">Este correo es solo una confirmación. Te estaremos contactando si hay alguna novedad.</p>
        </body>
    </html>
    '''

    # Preparar correo empresa
    mensaje_empresa = MIMEMultipart()
    mensaje_empresa['From'] = EMAIL_EMISOR
    mensaje_empresa['To'] = ", ".join([EMAIL_OPERATIONS, EMAIL_LOGISTICA])
    mensaje_empresa['Subject'] = asunto_empresa
    mensaje_empresa.attach(MIMEText(cuerpo_empresa, 'html'))

    # Preparar correo cliente
    mensaje_cliente = MIMEMultipart()
    mensaje_cliente['From'] = EMAIL_EMISOR
    mensaje_cliente['To'] = email_cliente
    mensaje_cliente['Subject'] = asunto_cliente
    mensaje_cliente.attach(MIMEText(cuerpo_cliente, 'html'))

    try:
        with smtplib.SMTP('smtp.gmail.com', 587) as servidor:
            servidor.starttls()
            servidor.login(EMAIL_EMISOR, EMAIL_PASSWORD)

            # Enviar correo a empresa
            servidor.sendmail(EMAIL_EMISOR, [EMAIL_OPERATIONS, EMAIL_LOGISTICA], mensaje_empresa.as_string())

            # Enviar correo al cliente
            servidor.sendmail(EMAIL_EMISOR, [email_cliente], mensaje_cliente.as_string())

        return jsonify({'mensaje': 'Pedido confirmado y correos enviados exitosamente.'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
