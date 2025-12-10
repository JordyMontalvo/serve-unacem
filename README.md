# Semilla de Compromisos - UNACEM

Experiencia interactiva "Semilla de Compromisos" para el evento THM de UNACEM.

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus valores

# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Iniciar servidor de producción
npm start
```

## 📁 Estructura del Proyecto

```
landings-3D/
├── app/
│   ├── api/
│   │   └── commitments/      # APIs de compromisos
│   ├── src/
│   │   ├── components/       # Componentes React
│   │   ├── contexts/         # Estado global
│   │   ├── services/         # Servicios/API
│   │   ├── types/            # TypeScript types
│   │   ├── utils/            # Utilidades
│   │   └── styles/           # Estilos CSS
│   ├── page.jsx              # Página principal
│   └── layout.jsx            # Layout raíz
├── lib/                      # Utilidades del backend
├── models/                   # Modelos de MongoDB
├── public/                   # Assets estáticos
└── package.json
```

## ⚙️ Variables de Entorno

Crea un archivo `.env.local`:

```env
# MongoDB (OBLIGATORIA)
MONGODB_URI=mongodb://localhost:27017/unacem

# Para MongoDB Atlas:
# MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/unacem?retryWrites=true&w=majority

# URL base (opcional, para generar URLs de compromisos)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## 🛠️ Stack Tecnológico

- **Next.js 14** - Framework React
- **React 18** - Biblioteca UI
- **TypeScript** - Tipado estático
- **MongoDB + Mongoose** - Base de datos
- **Tailwind CSS** - Estilos
- **Framer Motion** - Animaciones

## 📦 Despliegue en Vercel

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno en Vercel Dashboard
3. Vercel detectará automáticamente Next.js y desplegará

### Variables de Entorno en Vercel

- `MONGODB_URI` - URI de conexión a MongoDB Atlas
- `NEXT_PUBLIC_BASE_URL` - URL de tu proyecto en Vercel (opcional)

## 📚 Documentación

- Ver `VARIABLES_ENTORNO.md` para configuración detallada
- Ver `VERCEL_SETUP.md` para guía de despliegue

---

**Versión:** 1.0.0 (Proyecto Unificado)
