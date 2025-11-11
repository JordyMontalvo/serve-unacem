# Configuración SSH sin contraseña para bibliotecas@68.211.112.39

## Paso 1: Obtener tu clave pública SSH

Ejecuta este comando en tu Mac para ver tu clave pública:

```bash
cat ~/.ssh/id_ed25519.pub
```

Copia toda la clave que aparece (debería comenzar con `ssh-ed25519`).

## Paso 2: Conectarte al servidor Linux

Conéctate al servidor (te pedirá la contraseña una última vez):

```bash
ssh bibliotecas@68.211.112.39
```

## Paso 3: En el servidor Linux, ejecuta estos comandos:

```bash
# Crear el directorio .ssh si no existe
mkdir -p ~/.ssh

# Establecer permisos correctos
chmod 700 ~/.ssh

# Crear o editar el archivo authorized_keys
nano ~/.ssh/authorized_keys
```

## Paso 4: Pegar tu clave pública

En el editor nano:
1. Si el archivo está vacío, pega tu clave pública
2. Si ya tiene contenido, ve al final y presiona Enter para una nueva línea, luego pega tu clave
3. Presiona `Ctrl + X` para salir
4. Presiona `Y` para confirmar
5. Presiona `Enter` para guardar

## Paso 5: Establecer permisos correctos

```bash
chmod 600 ~/.ssh/authorized_keys
```

## Paso 6: Salir del servidor

```bash
exit
```

## Paso 7: Probar la conexión

Desde tu Mac, prueba conectarte sin contraseña:

```bash
ssh bibliotecas@68.211.112.39
```

¡Ahora deberías conectarte sin pedir contraseña!

---

## Alternativa: Comando único (si prefieres)

Si prefieres hacerlo en un solo paso, ejecuta este comando desde tu Mac:

```bash
cat ~/.ssh/id_ed25519.pub | ssh bibliotecas@68.211.112.39 "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"
```

Te pedirá la contraseña una vez y luego quedará configurado.
