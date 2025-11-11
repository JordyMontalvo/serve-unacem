# Configuración de Variables de Entorno

Para que el proyecto funcione correctamente, necesitas crear un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

## Archivo .env.local

Crea un archivo llamado `.env.local` en la raíz del proyecto con el siguiente contenido:

```env
MONGODB_URI=mongodb://localhost:27017/landings-3d
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Explicación de las Variables

### MONGODB_URI
- **Descripción**: URI de conexión a MongoDB
- **Ejemplo local**: `mongodb://localhost:27017/landings-3d`
- **Ejemplo MongoDB Atlas**: `mongodb+srv://usuario:password@cluster.mongodb.net/landings-3d?retryWrites=true&w=majority`
- **Requerido**: Sí

### NEXT_PUBLIC_BASE_URL
- **Descripción**: URL base de la aplicación (para generar las URLs de las notas)
- **Ejemplo desarrollo**: `http://localhost:3000`
- **Ejemplo producción**: `https://tudominio.com`
- **Requerido**: Sí

## Configuración de MongoDB

### Opción 1: MongoDB Local
1. Instala MongoDB en tu sistema
2. Inicia el servicio de MongoDB
3. Usa: `mongodb://localhost:27017/landings-3d`

### Opción 2: MongoDB Atlas (Cloud)
1. Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea un cluster gratuito
3. Obtén la cadena de conexión
4. Reemplaza `<password>` con tu contraseña
5. Usa la cadena de conexión completa en `MONGODB_URI`

## Notas Importantes

- El archivo `.env.local` está en `.gitignore` y no se subirá al repositorio
- Nunca compartas tus credenciales de MongoDB
- Para producción, configura estas variables en tu plataforma de hosting (Vercel, Netlify, etc.)
