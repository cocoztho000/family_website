

var hidden = 0;
var name_of_person_clicked = 'jim_bob'
$(window).scroll( function(){
	if($(window).scrollTop() > 0)
		hidden = 0;
	else
		hidden = 1;

	if (hidden == 0 &&  $('body').width() > 390){
		document.getElementById('head').style.removeProperty("backgroundColor");
	    document.getElementById('head').style["transition"] = "background-color 1s .2s ease";
	    document.getElementById('head').style["backgroundColor"] = "rgba(29, 40, 34, .5)";
		document.getElementById('head').style["box-shadow"] = "0px 4px 6px 2px rgba(0, 0, 0, .2)";
	}
	else {
		document.getElementById('head').style.removeProperty("backgroundColor");
	    document.getElementById('head').style["transition"] = "background-color 1s .2s ease";
        document.getElementById('head').style["backgroundColor"] = "transparent";
	    document.getElementById('head').style["box-shadow"] = "none";
	}
});


$( document ).ready(function() {
    document.getElementById('hint_ul').style["opacity"] = "0";

    function set_window(){
    	var header_height = ($('#head').height() / 2);
    	var hint_height = ($('#hint').height() / 2);
    	var family_height = ($('#family').height());
    	var window_height = $(window).height();
    	document.getElementById('hint').style["padding-top"] = (header_height - hint_height).toString() + "px";
    	console.log(window_height)
    	document.getElementById('map').style["height"] = (100 * ((window_height - family_height) / window_height) ).toString() + "vh";

    }
    set_window();

    $(window).resize(function(e) {
		console.log("set window");
		set_window();
	});
    var menu_open = false;
    $('#map_menu').click(function(e) {
        if(!menu_open) {
            $('#joe_button').css('top',  '3em');
            $('#dan_button').css('top',  '5em');
            $('#lid_button').css('top',  '7em');
            $('#mike_button').css('top', '9em');
            $('#tom_button').css('top',  '11em');
            $('#sam_button').css('top',  '13em');
            $('#mom_button').css('top',  '15em');
            $('#dad_button').css('top',  '17em');
            $('#diego_button').css('top', '19em');
            menu_open = true;
        }
        else {
            $('#joe_button').css('top',  '1em');
            $('#dan_button').css('top',  '1em');
            $('#lid_button').css('top',  '1em');
            $('#mike_button').css('top', '1em');
            $('#tom_button').css('top',  '1em');
            $('#sam_button').css('top',  '1em');
            $('#mom_button').css('top',  '1em');
            $('#dad_button').css('top',  '1em');
            $('#diego_button').css('top', '1em');
            menu_open = false;
        }
    });
});

function handle_face_click(name, redirect) {
    if (name_of_person_clicked == name) {
        // Go to mike webpage
        console.log(redirect)
        location.assign(redirect);
    }
    else {
        name_of_person_clicked = name;
    }
    moveTo(name);
}

$(function() {
	$('.btn_mike').click(function(e) {
        handle_face_click('mike', '')
    });
	$('.btn_joe').click(function(e) {
        handle_face_click('joe', '');
    });
	$('.btn_mom').click(function(e) {
        handle_face_click('mom', '');
    });
	$('.btn_dad').click(function(e) {
        handle_face_click('dad', '');
    });
	$('.btn_tom').click(function(e) {
        handle_face_click('tom', 'http://www.cocozzello.com');
    });
	$('.btn_sam').click(function(e) {
        handle_face_click('sam', 'http://www.cocozzello.com/sam');
    });
	$('.btn_lidnesy').click(function(e) {
        handle_face_click('lidnesy', '');
    });
    $('.btn_dan').click(function(e) {
        handle_face_click('dan', '');
    });
	$('.btn_diego').click(function(e) {
        handle_face_click('diego', '');
    });
});

var map, marker_tom, marker_sam, marker_lid, marker_mike, marker_joe, marker_mom, marker_dad, marker_dan, marker_diego;
var infoWindow;
var animate_zoom_time_gap = 200;
var map_zoom_out_to       = 1;

// Keep track of all pending animations to clear them if someone triggers a differet
// person
var timeouts = [];


var momContentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading">Jones beach</h1>'+
        '<div id="bodyContent">'+
        '<p>As a child they would go to the beach around 3:30 when everyone has exited. After'+
        ' her and her siblings came out of the water her Dad '+
        'would give them each a box of cracker jacks with the prize '+
        'inside. They would eat their dinner there and watch the sun set.</p>'+
        '</div>'+
        '</div>';

var people = {
    'mike': {
        'loc': {lat: 51.503324, lng: -0.119543},
        'zoom': 17,
        'content': "London Eye" },
    'tom': {
        'loc': {lat: 43.9959019, lng: -92.6212583},
        'zoom': 12,
        'content': 'Tom hasnt set a favorite place' },
    'sam': {
        'loc': {lat: 13.7515912, lng: 100.4926579},
        'zoom': 17,
        'content': "The Temple of Emerald Buddha" },
    'lidnesy': {
        'loc': {lat: 21.3069646, lng: -157.8581215},
        'zoom': 12,
        'content': "Honolulu"},
    'dan': {
        'loc': {lat: -33.8686055, lng: 151.2090233},
        'zoom': 13,
        'content': "Sydney Austraila" },
    'dad': {
        'loc': {lat: 39.4855002, lng: 16.2952093},
        'zoom': 14,
        'content': "Town Named After Our Family" },
    'mom': {
        'loc': {lat: 40.5949991, lng: -73.509588},
        'zoom': 14,
        'content': momContentString },
    'diego': {
        'loc': {lat: 41.0221779, lng: -83.922091},
        'zoom': 17,
        'content': "The Gilboa Town Bull" },
    'joe': {
        'loc': {lat: 40.6782722, lng: -73.9442666},
        'zoom': 11,
        'content': "Brooklyn" },
    'jim_bob': {
        'loc': {lat: 40.6782722, lng:-73.9442666},
        'zoom': 5,
        'content': 'Rando'}
};

var mapStyle = [
    {
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#ff4400"
            },
            {
                "saturation": -68
            },
            {
                "lightness": -4
            },
            {
                "gamma": 0.72
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.icon"
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#0077ff"
            },
            {
                "gamma": 3.1
            }
        ]
    },
    {
        "featureType": "water",
        "stylers": [
            {
                "hue": "#00ccff"
            },
            {
                "gamma": 0.44
            },
            {
                "saturation": -33
            }
        ]
    },
    {
        "featureType": "poi.park",
        "stylers": [
            {
                "hue": "#44ff00"
            },
            {
                "saturation": -23
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "hue": "#007fff"
            },
            {
                "gamma": 0.77
            },
            {
                "saturation": 65
            },
            {
                "lightness": 99
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "gamma": 0.11
            },
            {
                "weight": 5.6
            },
            {
                "saturation": 99
            },
            {
                "hue": "#0091ff"
            },
            {
                "lightness": -86
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": -48
            },
            {
                "hue": "#ff5e00"
            },
            {
                "gamma": 1.2
            },
            {
                "saturation": -23
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "saturation": -64
            },
            {
                "hue": "#ff9100"
            },
            {
                "lightness": 16
            },
            {
                "gamma": 0.47
            },
            {
                "weight": 2.7
            }
        ]
    }
];

var mapStyleNone = [
          {
            featureType: "all",
            elementType: "labels",
            stylers: [
              { visibility: "off" }
            ]
          }
        ]

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: people['dad']['loc'],
      zoom: 13,
      styles: mapStyle
    });
    map.setOptions( {
        draggable: false,
        zoomControl: false,
        scrollwheel: false,
        mapTypeControl: false,
        disableDoubleClickZoom: true,
        mapTypeId: 'terrain'});


    infoWindow = new google.maps.InfoWindow({
      content: people['dad']['content']
    });
    marker = new google.maps.Marker({
        position: people['dad']['loc'],
        map: map,
        title: 'Favorite Location'
    });
    marker.addListener('click', function() {
      infoWindow.open(map, marker);
    });
}

function moveToLocation(loc){
    var center = new google.maps.LatLng(loc['lat'], loc['lng']);
    // using global variable:
    map.panTo(center);
}

function moveTo(name) {

    var temp_loc  = people[name]['loc']
    var temp_zoom = people[name]['zoom']

    moveMarker(name);

    // Hide marker
    marker.setVisible(false);
    infoWindow.close();

    clear_pending_animations();
    var zoom_out_time = (map.getZoom() - map_zoom_out_to) * animate_zoom_time_gap
    var time_to_trigger_move =  zoom_out_time * 2;
    var time_to_trigger_zoom = time_to_trigger_move * 1.5;
    var time_to_trigger_marker = time_to_trigger_zoom*1.6;

    // remove all map attributes to make scroller smoother
    map.setOptions( { styles: mapStyleNone});
    animateMapZoomTo(map, map_zoom_out_to);

    timeouts.push( setTimeout(function (){
        moveToLocation(temp_loc);
    }, time_to_trigger_move));

    timeouts.push( setTimeout(function (){
        animateMapZoomTo(map, temp_zoom);
    }, time_to_trigger_zoom));

    timeouts.push( setTimeout(function (){
        marker.setVisible(true);
        marker.setAnimation(google.maps.Animation.DROP);
    }, time_to_trigger_marker));

    timeouts.push( setTimeout(function (){
        map.setOptions( { styles: mapStyle});
    }, time_to_trigger_marker));
};

function moveMarker( name ) {
    infoWindow.setContent(people[name]['content']);
    marker.setPosition( new google.maps.LatLng( people[name]['loc'] ) );
};

function clear_pending_animations() {
    for (var i = 0; i < timeouts.length; i++) {
        clearTimeout(timeouts[i]);
    }
    //quick reset of the timer array you just cleared
    timeouts = [];
}

function animateMapZoomTo(map, targetZoom) {
    var currentZoom = arguments[2] || map.getZoom();
    if (currentZoom != targetZoom) {
        google.maps.event.addListenerOnce(map, 'zoom_changed', function (event) {
            animateMapZoomTo(map, targetZoom, currentZoom + (targetZoom > currentZoom ? 1 : -1));
        });
        setTimeout(function(){ map.setZoom(currentZoom) }, animate_zoom_time_gap);
    }
}

