////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
//  filename : index.js                                                                                           //
//  author: Prateek Pandey(Digital)                                                                               //
//  language: NodeJs                                                                                              //
//  description: This is the server file for the tracker micro component. It contains the main socket events to   //
//               maintain the communication between the viewer page and the various tracker pages.                //
//  input: NA                                                                                                     //
//  output: NA                                                                                                    //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



'use strict'


// Importing the required npm packages
const http = require('http')
    , express = require('express')
    , bodyParser = require('body-parser')
    , socketIo = require('socket.io')
    , path = require('path');

// Initializing socket, creating server and Initializing blank map
const app = express()
    , server = http.createServer(app)
    , io = socketIo(server)
    , locationMap = new Map()

// Setting the path to load static files
app.use(express.static(path.join(__dirname, 'public')))

// Default route to check server health
app.get('/', (req, res) => {
  res.send('Hello!')
})

// setting the socket on connection
io.on('connection', socket => {

  // when updateLocation event has been received
  socket.on('updateLocation', pos => {
    console.log('This is pos : ', pos)

    // setting the position co-ordinates that are in the pos variable in locationMap
    locationMap.set(socket.id, pos)
  })

  // when requestLocations event has been received
  socket.on('requestLocations', () => {
    // emitting the array of locationMap with the event name locationsUpdate
    socket.emit('locationsUpdate', Array.from(locationMap))
  })

  // when disconnect event has been received
  socket.on('disconnect', () => {
    // deleting the socket id from locationMap that has been disconnected
    locationMap.delete(socket.id)
  })
})


// server listening on port 3001
server.listen(3001, err => {
  if (err) {
    throw err
  }
  console.log('Server started on port 3001')
})
