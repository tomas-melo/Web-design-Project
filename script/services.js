var map;
var infowindows = [];
var city = {lat: 41.1496100, lng: -8.6109900}; // Coordinates of Porto, Portugal
var counter = 0;
var currentType = 'all';

// Initialize the map
function initMap() {
    clearMarkers();

    map = new google.maps.Map(document.getElementById('map'), {
        center: city,
        zoom: 13.5
    });
    performSearch('bar');
    performSearch('restaurant');
}

// Perform a search for places
function performSearch(type) {
    var request = {
        location: city,
        radius: '10000',
        type: [type]
    };
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, function(results, status, pagination) {
    console.log(service);
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        createMarkers(results, type);

        // If more pages are available, wait a bit before loading them
        if (pagination.hasNextPage) {
            setTimeout(function() {
                pagination.nextPage();
            }, 2000);
        }
    }
});
}

// Function to create a marker
function createMarker(place, type) {
    var marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map,
        title: place.name
    });
    counter++;
    console.log(counter);
    var typeLabel = type === 'bar' ? 'Bar' : 'Restaurant';
    var rating = place.rating ? place.rating + ' ' + getStars(place.rating) : 'No rating';
    var contentString = '<div class="info-window">' +
        '<h3>' + place.name + '</h3>' + '<p>Type: ' + typeLabel + '</p>' + 
        '<p>Rating: ' + rating + '</p>' +
        (place.website ? '<p><a href="' + place.website + '" target="_blank">Website</a></p>' : '') +
        '</div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    marker.addListener('click', function() {
        infowindows.forEach(function(item) { item.infowindow.close(); }); // Close all open infowindows
        infowindow.open(map, marker);
    });

    infowindow.open(map, marker);
    infowindows.push({infowindow, marker, type});
}

// Function to get star ratings
function getStars(rating) {
    var stars = '';
    for (var i = 0; i < 5; i++) {
        if (rating >= i + 0.5) {
            stars += '\u2605'; // Unicode for full star
        } else {
            stars += '\u2606'; // Unicode for empty star
        }
    }
    return stars;
}

// Toggle visibility of infowindows
function toggleInfowindows(show) {
    infowindows.forEach(function(item) {
        if(((currentType === 'all' || item.type === currentType) && show)) {
            item.infowindow.open(map, item.marker);
        } else {
            item.infowindow.close();
        }
    });
}

// Function to show places of a specific type
function showPlaces(typeToShow) {
    currentType = typeToShow;
    infowindows.forEach(function(item) {
        if (item.type === typeToShow || typeToShow === 'all') {
            item.marker.setMap(map); // Show the marker
        } else {
            item.marker.setMap(null); // Hide the marker
        }
    });
}

// Function to create markers for results
function createMarkers(results, type) {
    for (var i = 0; i < results.length; i++) {
        if (!results[i].types.includes('lodging') && results[i].rating >= 4.5) {
            createMarker(results[i], type);
        }
    }
}

// Function to clear all markers
function clearMarkers() {
    for (var i = 0; i < infowindows.length; i++) {
        infowindows[i].marker.setMap(null);
    }
    infowindows = []; // Also reset the infowindows array
}

// Event listeners for buttons
document.getElementById('showBars').addEventListener('click', function() {
    showPlaces('bar');
    selectButton('showBars', false);
});

document.getElementById('showRestaurants').addEventListener('click', function() {
    showPlaces('restaurant');
    selectButton('showRestaurants', false);
});

// Function to select a button
function selectButton(buttonId, isInfoButton) {
    var button = document.getElementById(buttonId);
    if (button) {
        if (isInfoButton) {
            // For info buttons, make sure only one can be selected at a time
            var otherButtonId = buttonId === 'showInfo' ? 'hideInfo' : 'showInfo';
            var otherButton = document.getElementById(otherButtonId);
            button.classList.add('selected');
            otherButton.classList.remove('selected');
        } else {
            // For type of place buttons, normal behavior
            document.querySelectorAll('.button a:not(.info-button)').forEach(function(btn) {
                btn.classList.remove('selected');
            });
            button.classList.add('selected');
        }
    }
}