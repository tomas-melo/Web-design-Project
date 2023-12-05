var map;
var infowindows = [];
var city = {lat: 41.1496100, lng: -8.6109900}; // Coordonnées de Porto, Portugal
var compteur = 0;
var currentType = 'all';

function initMap() {

    clearMarkers();

    map = new google.maps.Map(document.getElementById('map'), {
        center: city,
        zoom: 13.5
    });
    performSearch('bar');
    performSearch('restaurant');
}

function performSearch(type) {
        var request = {
            location: city,
            radius: '10000',
            type: [type]
        };
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, function(results, status, pagination) {
    console.log(service)
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        createMarkers(results, type);

        // Si d'autres pages sont disponibles, attendez un peu avant de les charger
        if (pagination.hasNextPage) {
            setTimeout(function() {
                pagination.nextPage();
            }, 2000);
        }
    }
});
}

function createMarker(place, type) {
    var marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map,
        title: place.name
    });
    compteur+=1;
    console.log(compteur);
    var typeLabel = type === 'bar' ? 'Bar' : 'Restaurant';
    var rating = place.rating ? place.rating + ' ' + getStars(place.rating) : 'Pas de note';
    var contentString = '<div class="info-window">' +
        '<h3>' + place.name + '</h3>' + '<p>Type: ' + typeLabel + '</p>' + 
        '<p>Note: ' + rating + '</p>' +
        (place.website ? '<p><a href="' + place.website + '" target="_blank">Site web</a></p>' : '') +
        '</div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    marker.addListener('click', function() {
        infowindows.forEach(function(item) { item.infowindow.close(); }); // Ferme toutes les infobulles ouvertes
        infowindow.open(map, marker);
    });

    infowindow.open(map, marker);
    infowindows.push({infowindow, marker, type});
}

function getStars(rating) {
    var stars = '';
    for (var i = 0; i < 5; i++) {
        if (rating >= i + 0.5) {
            stars += '\u2605'; // Unicode étoile pleine
        } else {
            stars += '\u2606'; // Unicode étoile vide
        }
    }
    return stars;
}

function toggleInfowindows(show) {
    infowindows.forEach(function(item) {
        if(((currentType === 'all' || item.type === currentType) && show)) {
            item.infowindow.open(map, item.marker);
        } else {
            item.infowindow.close();
        }
    });
}

function showPlaces(typeToShow) {
    currentType = typeToShow;
    infowindows.forEach(function(item) {
        if (item.type === typeToShow || typeToShow === 'all') {
            item.marker.setMap(map); // Afficher le marqueur
        } else {
            item.marker.setMap(null); // Masquer le marqueur
        }
    });
}
function createMarkers(results, type) {
    for (var i = 0; i < results.length; i++) {
        if (!results[i].types.includes('lodging') && results[i].rating >= 4.5) {
            createMarker(results[i], type);
        }
    }
}

function clearMarkers() {
    for (var i = 0; i < infowindows.length; i++) {
        infowindows[i].marker.setMap(null);
    }
    infowindows = []; // Réinitialisez également le tableau des infowindows
}

document.getElementById('showBars').addEventListener('click', function() {
    showPlaces('bar');
});

document.getElementById('showRestaurants').addEventListener('click', function() {
    showPlaces('restaurant');
});