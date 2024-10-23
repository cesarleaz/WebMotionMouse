const express = require('express')
const socketIo = require('socket.io')
const { exec } = require('child_process') // Para ejecutar comandos en la terminal
const qrcode = require('qrcode')
const https = require('https')
const os = require('os')
const fs = require('fs')

const app = express()
const server = https.createServer(
  {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
  },
  app,
)
const io = socketIo(server)

// Middleware para servir archivos estáticos
app.use(express.static('public'))

// Generar el QR Code
const generateQRCode = async (host, port) => {
  const qrCodeData = await qrcode.toString(`https://${host}:${port}`, {
    type: 'terminal',
  })
  console.log(`Escanea este código QR para conectarte:\n${qrCodeData}`)
}

// Obtener la dirección IP local
const getLocalIP = () => {
  const networkInterfaces = os.networkInterfaces()
  for (const interface in networkInterfaces) {
    for (const details of networkInterfaces[interface]) {
      // Filtrar por dirección IPv4 y no ser una dirección de loopback
      if (details.family === 'IPv4' && !details.internal) {
        return details.address
      }
    }
  }
  return '127.0.0.1' // Retornar localhost si no se encuentra una dirección IP
}

// Variables para almacenar el estado del mouse en el servidor
let mouseX = 0
let mouseY = 0
let mouseSpeed = 1 // Factor para acelerar el mouse

// Función para mover el mouse en el servidor
const moveMouse = (deltaX, deltaY) => {
  // Limitar las coordenadas para que no sean negativas
  mouseX = Math.max(0, mouseX + deltaX * mouseSpeed)
  mouseY = Math.max(0, mouseY + deltaY * mouseSpeed)

  // Redondear las coordenadas para que no tengan decimales
  const roundedX = Math.round(mouseX)
  const roundedY = Math.round(mouseY)

  const command = `xdotool mousemove ${roundedX} ${roundedY}`
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error al mover el mouse: ${error.message}`)
      return
    }
    if (stderr) {
      console.error(`Error en el movimiento del mouse: ${stderr}`)
      return
    }
  })
}

// Función para hacer clic en el servidor
const clickMouse = (button) => {
  const command = `xdotool click ${button}`
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error al hacer clic: ${error.message}`)
      return
    }
    if (stderr) {
      console.error(`Error en el clic del mouse: ${stderr}`)
      return
    }
  })
}

// Manejo de eventos con Socket.IO
io.on('connection', (socket) => {
  console.log(`Cliente conectado: ${socket.id}`)

  // Movimiento del mouse
  socket.on('moveMouse', (data) => {
    const { x, y } = data

    // Aumentar velocidad si es necesario
    const deltaX = x * mouseSpeed
    const deltaY = y * mouseSpeed

    // Mover el mouse en el servidor
    moveMouse(deltaX, deltaY)
    // console.log(`Movimiento del mouse X: ${deltaX}, Y: ${deltaY}`);
  })

  // Clic del mouse
  socket.on('click', (button) => {
    // console.log(`Click recibido en el servidor, botón: ${button}`);
    clickMouse(button) // Ejecutar clic en el servidor
  })

  // Desconexión del cliente
  socket.on('disconnect', () => {
    console.log(`Cliente desconectado: ${socket.id}`)
  })
})

// Servidor escuchando en el puerto disponible
server.listen(0, async () => {
  console.clear()
  const port = server.address().port
  const host = getLocalIP()
  console.log(
    `Server: https://${host}:${port}\nLocal: https://127.0.0.1:${port}\n`,
  )
  await generateQRCode(host, port)
})
