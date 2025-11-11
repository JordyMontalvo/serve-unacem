#!/bin/bash

# Script para configurar SSH sin contraseña
# Servidor: bibliotecas@68.211.112.39

echo "🔑 Configurando SSH sin contraseña para bibliotecas@68.211.112.39"
echo ""

# Verificar que existe la clave
if [ ! -f ~/.ssh/id_ed25519.pub ]; then
    echo "❌ Error: No se encontró la clave SSH pública"
    echo "Generando nueva clave..."
    ssh-keygen -t ed25519 -C "landings-3d" -f ~/.ssh/id_ed25519 -N ""
fi

echo "📋 Tu clave pública SSH:"
echo "----------------------------------------"
cat ~/.ssh/id_ed25519.pub
echo "----------------------------------------"
echo ""
echo "🚀 Copiando clave al servidor..."
echo "   (Te pedirá la contraseña una última vez)"
echo ""

# Copiar la clave usando un comando que permite ingresar la contraseña
cat ~/.ssh/id_ed25519.pub | ssh bibliotecas@68.211.112.39 "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys && echo '✅ Clave SSH agregada exitosamente'"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Configuración completada!"
    echo ""
    echo "🧪 Probando conexión sin contraseña..."
    ssh bibliotecas@68.211.112.39 "echo '✅ ¡Conexión exitosa sin contraseña!'"
else
    echo ""
    echo "❌ Error al copiar la clave. Por favor ejecuta los pasos manuales."
    echo "   Ver archivo: INSTRUCCIONES_SSH.md"
fi
