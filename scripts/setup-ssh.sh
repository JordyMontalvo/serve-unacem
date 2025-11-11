#!/bin/bash

# Script para configurar SSH sin contraseña
# Uso: ./setup-ssh.sh usuario@servidor

echo "🔑 Configurando SSH para acceso sin contraseña..."
echo ""

# Verificar si existe clave SSH
if [ ! -f ~/.ssh/id_rsa ] && [ ! -f ~/.ssh/id_ed25519 ]; then
    echo "📝 Generando nueva clave SSH..."
    ssh-keygen -t ed25519 -C "tu_email@example.com" -f ~/.ssh/id_ed25519 -N ""
    echo "✅ Clave SSH generada"
else
    echo "✅ Clave SSH ya existe"
fi

# Obtener la clave pública
if [ -f ~/.ssh/id_ed25519.pub ]; then
    PUBLIC_KEY=$(cat ~/.ssh/id_ed25519.pub)
elif [ -f ~/.ssh/id_rsa.pub ]; then
    PUBLIC_KEY=$(cat ~/.ssh/id_rsa.pub)
else
    echo "❌ Error: No se encontró clave pública"
    exit 1
fi

echo ""
echo "📋 Tu clave pública SSH:"
echo "----------------------------------------"
echo "$PUBLIC_KEY"
echo "----------------------------------------"
echo ""
echo "📝 Instrucciones:"
echo "1. Copia la clave pública de arriba"
echo "2. Conéctate a tu servidor Linux:"
echo "   ssh usuario@tu-servidor"
echo ""
echo "3. En el servidor, ejecuta estos comandos:"
echo "   mkdir -p ~/.ssh"
echo "   chmod 700 ~/.ssh"
echo "   echo '$PUBLIC_KEY' >> ~/.ssh/authorized_keys"
echo "   chmod 600 ~/.ssh/authorized_keys"
echo ""
echo "O ejecuta este comando desde tu Mac (reemplaza usuario@servidor):"
echo "   ssh-copy-id -i ~/.ssh/id_ed25519.pub usuario@tu-servidor"
echo ""

# Preguntar si quiere copiar automáticamente
read -p "¿Quieres copiar la clave automáticamente? Ingresa usuario@servidor (o presiona Enter para saltar): " SERVER

if [ ! -z "$SERVER" ]; then
    echo "🚀 Copiando clave al servidor $SERVER..."
    if command -v ssh-copy-id &> /dev/null; then
        if [ -f ~/.ssh/id_ed25519.pub ]; then
            ssh-copy-id -i ~/.ssh/id_ed25519.pub "$SERVER"
        else
            ssh-copy-id -i ~/.ssh/id_rsa.pub "$SERVER"
        fi
        echo "✅ Clave copiada exitosamente"
        echo "🧪 Probando conexión..."
        ssh "$SERVER" "echo '✅ Conexión exitosa sin contraseña!'"
    else
        echo "❌ ssh-copy-id no está disponible. Usa las instrucciones manuales de arriba."
    fi
fi
