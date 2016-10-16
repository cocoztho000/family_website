

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
});

function handle_face_click(name, redirect) {
    if (name_of_person_clicked == name) {
        // Go to mike webpage
        console.log(redirect)
        window.location.href = redirect;
    }
    else {
        name_of_person_clicked = name;
    }
    moveTo(name);
}

$(function() {
	$('.btn_mike_landscape').click(function(e) {
        handle_face_click('mike', '')
    });
	$('.btn_joe_landscape').click(function(e) {
        handle_face_click('joe', '');
    });
	$('.btn_mom_landscape').click(function(e) {
        handle_face_click('mom', '');
    });
	$('.btn_dad_landscape').click(function(e) {
        handle_face_click('dad', '');
    });
	$('.btn_tom_landscape').click(function(e) {
        handle_face_click('tom', 'www.cocozzello.com');
    });
	$('.btn_sam_landscape').click(function(e) {
        handle_face_click('sam', 'www.cocozzello.com/sam');
    });
	$('.btn_lidnesy_landscape').click(function(e) {
        handle_face_click('lidnesy', '');
    });
    $('.btn_dan_landscape').click(function(e) {
        handle_face_click('dan', '');
    });
	$('.btn_diego_landscape').click(function(e) {
        handle_face_click('diego', '');
    });
});

var map, marker_tom, marker_sam, marker_lid, marker_mike, marker_joe, marker_mom, marker_dad, marker_dan, marker_diego;

// var tomiw, samiw, lidiw, mikeiw, joeiw, momiw, dadiw, daniw, diegoiw;
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
        'loc': {lat: 51.503324, lng: -0.1217317},
        'zoom': 17,
        'content': "London Eye" },
    'tom': {
        'loc': {lat: 43.9959019, lng: -92.6212583},
        'zoom': 12,
        'content': 'Tom hasnt set a favorite place' },
    'sam': {
        'loc': {lat: 13.7515912, lng: 100.4926579},
        'zoom': 15,
        'content': "The Temple of Emerald Buddha" },
    'lidnesy': {
        'loc': {lat: 21.3279758,lng: -157.9391622},
        'zoom': 12,
        'content': "Honolulu"},
    'dan': {
        'loc': {lat: -33.8642497, lng: 151.1876884},
        'zoom': 13,
        'content': "Sydney Austraila" },
    'dad': {
        'loc': {lat: 39.4877302, lng: 16.2891784},
        'zoom': 14,
        'content': "Town Named After Our Family" },
    'mom': {
        'loc': {lat: 40.5949991, lng: -73.509588},
        'zoom': 14,
        'content': momContentString },
    'diego': {
        'loc': {lat: 41.0221779, lng: -83.922091},
        'zoom': 13,
        'content': "The Gilboa Town Bull" },
    'joe': {
        'loc': {lat: 40.6451594, lng: -74.085084},
        'zoom': 11,
        'content': "Brooklyn" },
    'jim_bob': {
        'loc': {lat: 41.0221779, lng: -83.922091},
        'zoom': 5,
        'content': 'Rando'}
};

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: people['tom']['loc'],
      zoom: 10
    });

    map.setOptions( {
        draggable: false,
        zoomControl: false,
        scrollwheel: false,
        disableDoubleClickZoom: true,
        mapTypeId: 'terrain'});

    console.log(people[name_of_person_clicked]['content'])
    console.log(people[name_of_person_clicked]['loc'])
    var tomiw = new google.maps.InfoWindow({
      content: people[name_of_person_clicked]['content']
    });
    marker = new google.maps.Marker({
        position: people[name_of_person_clicked]['loc'],
        map: map,
        title: 'Favorite Location'
    });
    marker.addListener('click', function() {
      tomiw.open(map, marker);
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

    clear_pending_animations();
    var zoom_out_time = (map.getZoom() - map_zoom_out_to) * animate_zoom_time_gap
    var time_to_trigger_move =  zoom_out_time * 2;
    var time_to_trigger_zoom = time_to_trigger_move * 1.5;
    var time_to_trigger_marker = time_to_trigger_zoom*1.6;

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
};

function moveMarker( name ) {
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

