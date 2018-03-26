////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
//  filename : viewer.js                                                                                          //
//  author: Prateek Pandey(Digital)                                                                               //
//  language: NodeJs                                                                                              //
//  description: This is the file that is reponsible for creating the map and publishing the markers on the map   //
//  input: NA                                                                                                     //
//  output: NA                                                                                                    //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// creating the map
let map
let markers = new Map()

// adding the event listener to the page
document.addEventListener('DOMContentLoaded', () => {

  // Initializing socket
  const socket = io('/')

  // when locationsUpdate event has been received
  socket.on('locationsUpdate', locations => {
    console.log('locations : ',locations)

    // resetting markers to null
    markers.forEach((marker, id) =>{
      marker.setMap(null)
      markers.delete(id)
    })

    // setting markers for each location
    locations.forEach(([id, position]) => {
      if(position.lat && position.lng){

        // selecting icons for the map
        var icon = 'http://www.google.com/mapfiles/ms/micons/' + position.type + '.png';

        // creating markers with position and icon
        const marker = new google.maps.Marker({
          position,
          icon: icon,
          map
        })

        // setting markers
        markers.set(id, marker)
      }
    })
  })

  // setting update interval for socket requestLocations event emit
  setInterval( () => {
    socket.emit('requestLocations')
  }, 2000)
})

// Initializing the map. This is the most important function to generate the map.
function initMap() {

  // getting the current position on the map from where the map is being viewed
  navigator.geolocation.getCurrentPosition(pos => {
    // setting up the coordinates
    const { latitude: lat, longitude: lng} = pos.coords

    // generating map on the html page using the div id
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat, lng},
      zoom: 15  // zoom of 15X
    });

    // creating marker to show your location on the map
    var marker = new google.maps.Marker({
      position: {lat, lng},
      icon: 'http://www.maps.google.com/mapfiles/kml/pal4/icon57.png',
      map: map
    });
  }, err => {
    console.error(err)
  })
}
