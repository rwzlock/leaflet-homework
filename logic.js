// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson";

var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
});

L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
  "access_token=pk.eyJ1Ijoicnd6bG9jayIsImEiOiJjamlkdmVuaWYwZnZjM2twZWs3eWY4MTdyIn0." +
  "PZhghkJRnVia5SkmmtnuyA").addTo(myMap);


function markerSize(magnitude) {
  return magnitude*magnitude*magnitude * 5000;
}
function markerColor(magnitude) {
    if (2.5 <= magnitude && magnitude <= 2.9) {return "yellow"}

    else if (2.9 < magnitude && magnitude <=3.3) {return "orange"}  

    else if (3.3 < magnitude && magnitude <=3.7) {return "red"}
        
    else if (3.7 < magnitude && magnitude <=4.1) {return "green"}
        
    else if (4.1 < magnitude && magnitude <=4.5) {return "blue"}
        
    else if (4.5 < magnitude && magnitude <=5) {return "purple"}
        
    else if (5 < magnitude && magnitude <=5.5) {return "navy"}
        
    else if (5.5 < magnitude && magnitude <=6) {return "brown"}
        
    else if (magnitude > 6) {return "black"}
        
    else {return "white"}      
}

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  var earthquakeData = data.features;
  createEarthquakes(earthquakeData)
});

function createEarthquakes(earthquakeData) {

  var earthquakes = []

  for (var i = 0; i < earthquakeData.length-1; i++) {
    var earthquake_dict = 
    {
      name: earthquakeData[i].properties.place,
      location: [ earthquakeData[i].geometry.coordinates[1], earthquakeData[i].geometry.coordinates[0] ],
      magnitude: earthquakeData[i].properties.mag
    }
    earthquakes.push(earthquake_dict)
  }
  console.log(earthquakes)
  console.log(earthquakes[0].magnitude)
  // Sending our earthquakes layer to the createMap function
  //createMap(earthquakeMarkers);
  createFeatures(earthquakes)
}

function createFeatures(earthquakes) {
  for (var j = 0; j < earthquakes.length; j++) {
    console.log(earthquakes[j].magnitude)
    L.circle(earthquakes[j].location, {
      fillOpacity: 0.75,
      color: markerColor(earthquakes[j].magnitude),
      fillColor: markerColor(earthquakes[j].magnitude),
      // Setting our circle's radius equal to the output of our markerSize function
      // This will make our marker's size proportionate to its population
      radius: markerSize(earthquakes[j].magnitude)
    }).bindPopup("<h1>" + earthquakes[j].name + "</h1> <hr> <h3>Magnitude: " + earthquakes[j].magnitude + "</h3>").addTo(myMap);
  }
}


/*

for (var i = 0; i < earthquakeData.length; i++) {
  //console.log(earthquakeData[i].geometry.coordinates[0])
  // Setting the marker radius for the state by passing population into the markerSize function
  earthquakeMarkers.push(
    L.circle([earthquakeData[i].geometry.coordinates[0], earthquakeData[i].geometry.coordinates[1]], {
      stroke: false,
      fillOpacity: 0.75,
      color: "white",
      fillColor: "white",
      radius: markerSize(earthquakeData[i].properties.mag)
    })
  );
  L.bindPopup("<h3>" + earthquakeData[i].properties.place +
    "</h3><br><h3>" + earthquakeData[i].properties.mag +"<hr><p>" + new Date(earthquakeData[i].properties.time) + "</p>");
}


earthquakeMarkers.push(
  L.circle([earthquakeData[i].geometry.coordinates[0], earthquakeData[i].geometry.coordinates[1]], {
    stroke: false,
    fillOpacity: 0.75,
    color: "white",
    fillColor: "white",
    radius: markerSize(earthquakeData[i].properties.mag)
  })
);
L.bindPopup("<h3>" + earthquakeData[i].properties.place +
  "</h3><br><h3>" + earthquakeData[i].properties.mag +"<hr><p>" + new Date(earthquakeData[i].properties.time) + "</p>");






function createMap(earthquakeMarkers) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
  "access_token=pk.eyJ1Ijoicnd6bG9jayIsImEiOiJjamlkdmVuaWYwZnZjM2twZWs3eWY4MTdyIn0." +
  "PZhghkJRnVia5SkmmtnuyA");

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?" +
  "access_token=pk.eyJ1Ijoicnd6bG9jayIsImEiOiJjamlkdmVuaWYwZnZjM2twZWs3eWY4MTdyIn0." +
  "PZhghkJRnVia5SkmmtnuyA");

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };
  var earthquakes = L.layerGroup(earthquakeMarkers);

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    //Earthquakes: earthquakes,
    "Magnitudes": earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, earthquakes1]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}

*/
