# Landings 3D - Sistema de Notas

Sistema web para crear y compartir notas únicas con Next.js y MongoDB.

## Características

- ✅ Crear notas con nombre, email y contenido
- ✅ Almacenamiento en MongoDB
- ✅ URLs únicas para cada nota usando ID
- ✅ Mensaje de éxito al subir correctamente
- ✅ Página exclusiva para cada nota

## Requisitos

- Node.js 18 o superior
- MongoDB (local o MongoDB Atlas)

## Instalación

1. Instala las dependencias:
```bash
npm install
```

2. Crea un archivo `.env.local` en la raíz del proyecto:
```env
MONGODB_URI=mongodb://localhost:27017/landings-3d
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

3. Asegúrate de que MongoDB esté ejecutándose.

4. Inicia el servidor de desarrollo:
```bash
npm run dev
```

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Estructura del Proyecto

```
├── app/
│   ├── api/
│   │   └── notas/
│   │       ├── route.js (POST - crear nota)
│   │       └── [note_id]/route.js (GET - obtener nota)
│   ├── nota/
│   │   └── [note_id]/
│   │       └── page.jsx (página de visualización de nota)
│   ├── layout.jsx
│   ├── page.jsx (formulario principal)
│   └── globals.css
├── lib/
│   └── mongodb.js (configuración de conexión)
├── models/
│   └── Nota.js (modelo de MongoDB)
└── package.json
```

## Uso

1. Completa el formulario en la página principal con:
   - Nombre
   - Email
   - Nota (contenido)

2. Haz clic en "Subir Nota"

3. Una vez subida correctamente, recibirás un mensaje de éxito y una URL única

4. Puedes compartir esa URL para que otros accedan a tu nota

## Variables de Entorno

- `MONGODB_URI`: URI de conexión a MongoDB
- `NEXT_PUBLIC_BASE_URL`: URL base de la aplicación (para generar las URLs de las notas)

## Tecnologías

- Next.js 14
- React 18
- JavaScript
- MongoDB con Mongoose
- Tailwind CSS
- UUID para IDs únicos
