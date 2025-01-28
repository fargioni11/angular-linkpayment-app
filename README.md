Angular Payment Link App
Descripción 📖
Esta es una aplicación desarrollada con Angular (Frontend) y Node.js (Backend) que permite a los usuarios generar links de pago a través de Stripe y compartirlos mediante WhatsApp, SMS o correo electrónico. Está diseñada para ser responsiva, intuitiva y fácil de usar.

Características 🚀
Registro y Login:

Sistema de autenticación utilizando JWT.
Formulario con validaciones usando Angular Reactive Forms y Angular Material.
Dashboard:

Generación de links de pago con la integración de Stripe.
División de montos entre varias personas.
Compartir los links generados vía WhatsApp, SMS o email usando la API nativa de compartir del navegador.
Diseño moderno:

Uso de Angular Material para un diseño limpio y responsivo.
Mensajes de éxito o error utilizando MatSnackBar.
API Backend:

Node.js con Express para manejar los endpoints.
Mongoose para la conexión con MongoDB.
Integración con Stripe para la creación de enlaces de pago.
Tecnologías Utilizadas 🛠️
Frontend:
Angular 19.
Angular Material para estilos.
Web Share API para compartir links.
Backend:
Node.js con Express.
Stripe para la integración de pagos.
Mongoose para la base de datos MongoDB.
Requisitos del Sistema 🖥️
Node.js v16+
MongoDB (puede ser local o en la nube).
Angular CLI instalado globalmente:
bash
Copiar
Editar
npm install -g @angular/cli
Cuenta en Stripe (para obtener tus claves de API).
Instalación y Configuración ⚙️
1. Clona el repositorio:
bash
Copiar
Editar
git clone https://github.com/fargioni11/angular-linkpayment-app.git
cd angular-linkpayment-app
2. Configura el Backend:
Ve al directorio del backend:
bash
Copiar
Editar
cd node-stripe-app
Instala las dependencias:
bash
Copiar
Editar
npm install
Crea un archivo .env en el directorio raíz del backend y configura las siguientes variables:
env
Copiar
Editar
PORT=3000
JWT_SECRET=mi_super_secreto_seguro
STRIPE_SECRET_KEY=sk_test_1234567890abcdef
MONGO_URI=mongodb://localhost:27017/payment-app
Inicia el servidor:
bash
Copiar
Editar
npm run dev
3. Configura el Frontend:
Ve al directorio del frontend:
bash
Copiar
Editar
cd angular-linkpayment-app
Instala las dependencias:
bash
Copiar
Editar
npm install
Construye el proyecto para producción:
bash
Copiar
Editar
ng build --configuration=production --base-href "/angular-linkpayment-app/"
Publica en GitHub Pages:
bash
Copiar
Editar
npx angular-cli-ghpages --dir=dist/angular-linkpayment-app
Uso de la Aplicación 📱
1. Registro y Login
Regístrate con un nombre de usuario y contraseña.
Ingresa a la app con las credenciales registradas.
2. Generar Links de Pago
Accede al dashboard.
Ingresa el monto total del pago y la cantidad de personas.
Genera links únicos que se pueden compartir.
3. Compartir Links
Haz clic en el botón Compartir para enviar links de pago por WhatsApp, SMS o correo electrónico.
Estructura del Proyecto 📂
Frontend (angular-linkpayment-app):
arduino
Copiar
Editar
src/
├── app/
│   ├── components/
│   │   ├── login/
│   │   ├── register/
│   │   ├── dashboard/
│   │   └── not-found/
│   ├── guards/
│   ├── services/
│   └── app.routes.ts
├── assets/
└── styles.css
Backend (node-stripe-app):
arduino
Copiar
Editar
src/
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
└── utils/

Mejoras Futuras 🚀
Implementar Twilio para enviar mensajes de WhatsApp directamente desde el backend.
Agregar una sección para ver el historial de pagos generados.
Mejorar la experiencia de usuario con animaciones adicionales.
Contribución 🤝
¿Tienes ideas o quieres contribuir? ¡Eres bienvenido!

Haz un fork del proyecto.
Crea un branch con tu mejora:
bash
Copiar
Editar
git checkout -b mejora-nueva
Haz un pull request.
