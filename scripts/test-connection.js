// Script para probar la conexión a MongoDB
import connectDB from '../lib/mongodb.js';
import Nota from '../models/Nota.js';

async function testConnection() {
  try {
    console.log('🔌 Conectando a MongoDB...');
    await connectDB();
    console.log('✅ Conexión exitosa a MongoDB');
    
    console.log('📊 Probando modelo de Nota...');
    const testNota = await Nota.findOne({});
    console.log('✅ Modelo de Nota funciona correctamente');
    
    console.log('🎉 Todo está configurado correctamente!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testConnection();
