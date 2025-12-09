# 🚀 Guía Rápida: Solucionar Error de Conexión MongoDB Atlas

## ⚡ Solución Rápida (2 minutos)

### Paso 1: Ve a MongoDB Atlas
👉 https://cloud.mongodb.com/v2#/security/network/whitelist

### Paso 2: Agrega IP Address
1. Haz clic en el botón verde **"Add IP Address"**
2. Selecciona **"Allow Access from Anywhere"**
3. O escribe: `0.0.0.0/0`
4. Haz clic en **"Confirm"**

### Paso 3: Espera 1-2 minutos
- Verás el estado cambiar de "Pending" a "Active"

### Paso 4: Listo ✅
- Vuelve a probar crear una nota en Vercel

---

## 📸 Guía Visual

### 1. En MongoDB Atlas Dashboard:
```
Security (menú lateral) → Network Access → Add IP Address
```

### 2. Configuración:
```
┌─────────────────────────────────────┐
│ Add IP Address                      │
├─────────────────────────────────────┤
│ Access List Entry:                  │
│ ○ Allow Access from Anywhere        │ ← Selecciona esta
│ ○ Add Current IP Address            │
│ ○ Add IP Address (manual)           │
│                                     │
│ Comment: Vercel - Todas las IPs    │
│                                     │
│ [Cancel]  [Confirm]                 │
└─────────────────────────────────────┘
```

### 3. Después de agregar:
```
┌─────────────────────────────────────┐
│ Network Access List                 │
├─────────────────────────────────────┤
│ 0.0.0.0/0    Active    [Delete]     │ ← Debe decir "Active"
│                                     │
│ Si dice "Pending", espera 1-2 min   │
└─────────────────────────────────────┘
```

---

## 🔍 Verificar que Funciona

### 1. Verifica en MongoDB Atlas:
- ✅ IP `0.0.0.0/0` está en la lista
- ✅ Estado es "Active" (no "Pending")

### 2. Verifica en Vercel:
- ✅ Variable `MONGODB_URI` está configurada
- ✅ La cadena de conexión es correcta
- ✅ La contraseña está correcta (sin espacios)

### 3. Prueba:
- ✅ Intenta crear una nota en tu aplicación
- ✅ Debería funcionar sin errores

---

## 🚨 Si Aún No Funciona

### Verifica la cadena de conexión:
```env
# Formato correcto:
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/landings-3d?retryWrites=true&w=majority

# Reemplaza:
# - usuario: tu usuario de MongoDB
# - password: tu contraseña (sin espacios, URL encoded si tiene caracteres especiales)
# - cluster: tu cluster de MongoDB Atlas
# - landings-3d: nombre de tu base de datos
```

### Verifica el usuario de la base de datos:
1. Ve a MongoDB Atlas → Security → Database Access
2. Verifica que el usuario tenga permisos de lectura/escritura
3. Verifica que el usuario esté activo

### Espera un poco más:
- Los cambios en la whitelist pueden tardar hasta 5 minutos en aplicarse
- Si acabas de agregar la IP, espera 2-3 minutos antes de probar de nuevo

---

## 📞 Más Ayuda

- Documentación completa: Ver `SOLUCION_MONGODB_ATLAS.md`
- MongoDB Atlas Docs: https://www.mongodb.com/docs/atlas/security-whitelist/
- Vercel Docs: https://vercel.com/docs

