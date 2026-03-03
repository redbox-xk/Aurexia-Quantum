const { Server } = require('socket.io')
const io = new Server(3001, { cors: { origin: '*' } })

let players = []

io.on('connection', (socket) => {
  console.log('player connected', socket.id)
  players.push({ id: socket.id, x: 0, y: 0, z: 20 })

  socket.on('move', (pos) => {
    const player = players.find(p => p.id === socket.id)
    if (player) {
      player.x = pos.x
      player.y = pos.y
      player.z = pos.z
      io.emit('playerMove', players.filter(p => p.id !== socket.id))
    }
  })

  socket.on('disconnect', () => {
    players = players.filter(p => p.id !== socket.id)
  })
})

console.log('Socket.IO server running on port 3001')
