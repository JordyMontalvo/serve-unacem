# Configuración para Vercel - Producción

## Variables de Entorno en Vercel

Para que el proyecto funcione en producción en Vercel, necesitas configurar las siguientes variables de entorno:

### Cómo configurar variables de entorno en Vercel:

1. Ve a tu proyecto en Vercel Dashboard
2. Ve a **Settings** → **Environment Variables**
3. Agrega las siguientes variables:

### Variables Requeridas:

#### 1. MONGODB_URI
- **Descripción**: URI de conexión a MongoDB
- **Valor para MongoDB Atlas** (recomendado para producción):
  ```
  mongodb+srv://usuario:password@cluster.mongodb.net/landings-3d?retryWrites=true&w=majority
  ```
- **Valor para MongoDB local** (solo si tienes un servidor accesible):
  ```
  mongodb://usuario:password@tu-servidor:27017/landings-3d
  ```

#### 2. NEXT_PUBLIC_BASE_URL
- **Descripción**: URL base de tu aplicación en producción
- **Valor**: La URL de tu proyecto en Vercel
  ```
  https://tu-proyecto.vercel.app
  ```
- **Nota**: Vercel también proporciona automáticamente `VERCEL_URL`, pero es mejor usar `NEXT_PUBLIC_BASE_URL` para URLs permanentes

### Configuración por Ambiente:

Puedes configurar diferentes valores para diferentes ambientes:
- **Production**: Para producción
- **Preview**: Para preview deployments
- **Development**: Para desarrollo local

### Recomendaciones:

1. **MongoDB Atlas**: Usa MongoDB Atlas (gratis) para producción en lugar de MongoDB local
2. **URL Base**: Usa tu dominio personalizado si tienes uno, o la URL de Vercel
3. **Seguridad**: Nunca compartas tus credenciales de MongoDB

## Pasos para Desplegar:

1. **Configura MongoDB Atlas** (si aún no lo tienes):
   - Ve a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Crea un cluster gratuito
   - Crea un usuario de base de datos
   - Obtén la cadena de conexión
   - Agrega tu IP a la whitelist (o usa 0.0.0.0/0 para desarrollo)

2. **Configura variables de entorno en Vercel**:
   - MONGODB_URI: Tu cadena de conexión de MongoDB Atlas
   - NEXT_PUBLIC_BASE_URL: https://tu-proyecto.vercel.app

3. **Haz push a tu repositorio**:
   ```bash
   git add .
   git commit -m "Configuración para producción"
   git push
   ```

4. **Vercel desplegará automáticamente** tu proyecto

## Verificación:

Después del despliegue, verifica que:
1. El build se completa sin errores
2. La aplicación carga correctamente
3. Puedes crear una nota
4. Puedes acceder a la nota por su URL única

## Troubleshooting:

### Error: "MONGODB_URI is not defined"
- Verifica que hayas agregado la variable en Vercel
- Asegúrate de que esté configurada para el ambiente correcto (Production)

### Error: "Connection timeout"
- Verifica que tu IP esté en la whitelist de MongoDB Atlas
- Verifica que la cadena de conexión sea correcta
- Asegúrate de que el cluster de MongoDB esté activo

### Error: "Invalid URL"
- Verifica que `NEXT_PUBLIC_BASE_URL` tenga el formato correcto (https://...)
- Asegúrate de que no termine con una barra "/"
