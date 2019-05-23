import io from 'socket.io-client'
const socket = io(process.env.WS_URL)

socket.on('ping2', (data) => {
  console.log(data)
})

export default socket
