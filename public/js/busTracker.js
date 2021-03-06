////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
//  filename : busTracker.js                                                                                      //
//  author: Prateek Pandey(Digital)                                                                               //
//  language: NodeJs                                                                                              //
//  description: This is the file that is reponsible for generating bus geolocation information                   //
//  input: NA                                                                                                     //
//  output: NA                                                                                                    //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// adding the event listener to the page
document.addEventListener('DOMContentLoaded', () => {

  // Initializing socket
  const socket = io('/')

  // setting positionOptions for the location update
  const positionOptions = {
    enableHighAccuracy: true,
    maximumAge: 0
  }

  // setting interval to emit updateLocation event
  setInterval( () => {
    console.log('tick')

    // getting the location of the device
    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude: lat, longitude: lng} = pos.coords
          , type = 'bus';       // setting the type as bus to have a different marker
      // emmiting the updateLocation addEventListener
      socket.emit('updateLocation', { lat, lng, type})
    }, err => {
      console.error(err)
    },positionOptions)
  }, 2000)
})
