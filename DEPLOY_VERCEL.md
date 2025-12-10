# 🚀 Guía de Despliegue en Vercel

## Proyecto Unificado - Semilla de Compromisos UNACEM

Este proyecto está unificado (frontend + backend) y listo para desplegar en Vercel.

## 📋 Pasos para Desplegar

### 1. Preparar el Repositorio

```bash
# Asegúrate de estar en la carpeta del proyecto unificado
cd landings-3D

# Verificar que todo esté correcto
npm install
npm run build
```

### 2. Conectar con Vercel

1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Haz clic en **"Add New Project"**
3. Conecta tu repositorio de GitHub/GitLab
4. Selecciona el proyecto `landings-3D` (o la carpeta donde está el proyecto unificado)

### 3. Configurar el Proyecto en Vercel

**Framework Preset:** Next.js (se detecta automáticamente)

**Root Directory:** `landings-3D` (si está en una subcarpeta) o `.` (si está en la raíz)

**Build Command:** `npm run build` (por defecto)

**Output Directory:** `.next` (por defecto)

### 4. Configurar Variables de Entorno

En Vercel Dashboard → Settings → Environment Variables, agrega:

#### Obligatoria:
- **Key:** `MONGODB_URI`
- **Value:** Tu URI de MongoDB Atlas
- **Example:** `mongodb+srv://usuario:password@cluster.mongodb.net/unacem?retryWrites=true&w=majority`
- **Environments:** Production, Preview, Development

#### Opcional:
- **Key:** `NEXT_PUBLIC_BASE_URL`
- **Value:** Se genera automáticamente con `VERCEL_URL`, pero puedes definirla manualmente
- **Example:** `https://tu-proyecto.vercel.app`

### 5. Desplegar

1. Haz clic en **"Deploy"**
2. Espera a que termine el build
3. ¡Listo! Tu proyecto estará disponible en `https://tu-proyecto.vercel.app`

## 🔧 Configuración de MongoDB Atlas

Si usas MongoDB Atlas (recomendado para producción):

1. Crea un cluster en [MongoDB Atlas](https://cloud.mongodb.com)
2. Crea un usuario de base de datos
3. Agrega `0.0.0.0/0` a la whitelist de IPs (permite todas las IPs)
4. Obtén la connection string y úsala como `MONGODB_URI`

## ✅ Verificación Post-Despliegue

1. Visita tu URL de Vercel
2. Prueba crear un compromiso
3. Verifica que se guarde en MongoDB
4. Revisa los logs en Vercel Dashboard si hay errores

## 🐛 Troubleshooting

### Error: "MONGODB_URI is not defined"
- Verifica que la variable esté configurada en Vercel
- Asegúrate de seleccionar el environment correcto (Production/Preview/Development)

### Error: "Connection timeout"
- Verifica que la whitelist de MongoDB Atlas incluya todas las IPs (`0.0.0.0/0`)
- Verifica que la URI de conexión sea correcta

### Error: "Build failed"
- Revisa los logs de build en Vercel
- Verifica que todas las dependencias estén en `package.json`
- Asegúrate de que no haya errores de TypeScript

## 📝 Notas Importantes

- El proyecto está unificado: frontend y backend en el mismo proyecto Next.js
- No necesitas configurar CORS ya que todo está en el mismo dominio
- Las variables de entorno se aplican después de hacer deploy
- Vercel detecta automáticamente Next.js y configura el build

---

**¡Listo para producción!** 🎉

