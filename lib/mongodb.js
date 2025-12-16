import mongoose from 'mongoose';

let cached = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI || '';

  // No validar durante el build time de Next.js
  // Durante el build, las variables de entorno pueden no estar disponibles
  const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build' || 
                      (process.env.NODE_ENV === 'production' && !process.env.MONGODB_URI && typeof process.env.VERCEL === 'undefined');

  if (!MONGODB_URI) {
    // Durante el build, simplemente retornar sin error
    if (isBuildTime) {
      console.warn('⚠️ MONGODB_URI no disponible durante el build. La conexión se establecerá en runtime.');
      return null;
    }
    // En runtime, lanzar error si no hay URI
    throw new Error('Por favor define la variable MONGODB_URI en las variables de entorno');
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 50,
      minPoolSize: 5,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 20000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    // Mejorar mensaje de error para conexión
    if (e.name === 'MongooseServerSelectionError') {
      console.error('❌ Error de conexión a MongoDB Atlas:');
      console.error('   - Verifica que tu IP esté en la whitelist de MongoDB Atlas');
      console.error('   - Ve a: https://cloud.mongodb.com/v2#/security/network/whitelist');
      console.error('   - Agrega 0.0.0.0/0 para permitir todas las IPs (o las IPs de Vercel)');
    }
    throw e;
  }

  return cached.conn;
}

export default connectDB;
