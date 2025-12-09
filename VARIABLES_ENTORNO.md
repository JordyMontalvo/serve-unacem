# Variables de Entorno Requeridas

## 🔴 Variable OBLIGATORIA

### 1. MONGODB_URI
- **Descripción**: URI de conexión a MongoDB
- **Requerida**: ✅ SÍ (obligatoria)
- **Ejemplo para MongoDB local**:
  ```
  MONGODB_URI=mongodb://localhost:27017/landings-3d
  ```
- **Ejemplo para MongoDB Atlas (Producción)**:
  ```
  MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/landings-3d?retryWrites=true&w=majority
  ```
- **Dónde configurarla**:
  - **Local**: En archivo `.env.local` (ya creado)
  - **Vercel**: En Settings → Environment Variables → Agregar variable

---

## 🟡 Variable OPCIONAL (Recomendada)

### 2. NEXT_PUBLIC_BASE_URL
- **Descripción**: URL base de la aplicación (para generar URLs de las notas)
- **Requerida**: ❌ NO (opcional, pero recomendada)
- **Ejemplo para desarrollo local**:
  ```
  NEXT_PUBLIC_BASE_URL=http://localhost:3000
  ```
- **Ejemplo para producción Vercel**:
  ```
  NEXT_PUBLIC_BASE_URL=https://tu-proyecto.vercel.app
  ```
- **Nota**: Si no la defines, el sistema usará automáticamente `VERCEL_URL` en Vercel o `http://localhost:3000` en desarrollo local
- **Dónde configurarla**:
  - **Local**: En archivo `.env.local` (opcional)
  - **Vercel**: En Settings → Environment Variables (opcional)

---

## 📋 Resumen

### Para Desarrollo Local (.env.local):
```env
MONGODB_URI=mongodb://localhost:27017/landings-3d
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Para Producción en Vercel:
```env
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/landings-3d?retryWrites=true&w=majority
NEXT_PUBLIC_BASE_URL=https://tu-proyecto.vercel.app
```

---

## 🔧 Cómo Configurar en Vercel

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto
3. Ve a **Settings** → **Environment Variables**
4. Haz clic en **Add New**
5. Agrega las variables:
   - **Key**: `MONGODB_URI`
   - **Value**: Tu URI de MongoDB
   - **Environment**: Selecciona `Production`, `Preview`, y/o `Development`
6. Haz clic en **Save**
7. Repite para `NEXT_PUBLIC_BASE_URL` (opcional)

---

## ✅ Verificación

### Verificar que las variables estén configuradas:

**En desarrollo local:**
```bash
# Verificar que el archivo .env.local existe
cat .env.local
```

**En Vercel:**
- Ve a Settings → Environment Variables
- Deberías ver `MONGODB_URI` listada
- Opcionalmente `NEXT_PUBLIC_BASE_URL`

---

## 🚨 Troubleshooting

### Error: "MONGODB_URI is not defined"
- **Solución**: Agrega la variable `MONGODB_URI` en Vercel o en `.env.local`

### Error: "Connection timeout"
- **Solución**: Verifica que tu IP esté en la whitelist de MongoDB Atlas
- **Solución**: Verifica que la cadena de conexión sea correcta

### Error: "Invalid URL"
- **Solución**: Verifica que `NEXT_PUBLIC_BASE_URL` tenga el formato correcto (https://... o http://...)
- **Solución**: Si no la defines, el sistema usará automáticamente `VERCEL_URL`

---

## 📝 Notas Importantes

1. **MONGODB_URI es OBLIGATORIA**: Sin esta variable, la aplicación no funcionará
2. **NEXT_PUBLIC_BASE_URL es OPCIONAL**: El sistema tiene valores por defecto
3. **Seguridad**: Nunca compartas tus credenciales de MongoDB
4. **MongoDB Atlas**: Para producción, se recomienda usar MongoDB Atlas (gratis hasta cierto límite)
5. **Variables en Vercel**: Las variables se aplican después de hacer un nuevo deploy

