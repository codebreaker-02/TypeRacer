import io from 'socket.io-client'
// this line -> { transports : ['websocket'] } is used to prevent the CORS policy from preventing the sending of messages 
const socket = io('http://localhost:3001', { transports : ['websocket'] })
export default socket;

