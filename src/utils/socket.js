import io from 'socket.io-client'

import href from './href'

const socket = io(href)

export default socket
