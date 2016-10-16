

var hidden = 0;
var name_of_person_clicked = ''
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

$(function() {
	$('.btn_mike_landscape').click(function(e) {
            if (name_of_person_clicked == 'mike') {
                // Go to mike webpage
            }
            else {
                name_of_person_clicked = 'mike'
            }
            moveTo(map, MikeLatLng, MikeZoom, marker_mike);
        });
	$('.btn_joe_landscape').click(function(e) {
            if (name_of_person_clicked == 'joe') {
                // Go to mike webpage
            }
            else {
                name_of_person_clicked = 'joe'
            }
            moveTo(map, JoeLatLng, JoeZoom, marker_joe);  
        });
	$('.btn_mom_landscape').click(function(e) {
            if (name_of_person_clicked == 'mom') {
                // Go to mike webpage
            }
            else {
                name_of_person_clicked = 'mom'
            }
            moveTo(map, MomLatLng, MomZoom, marker_mom);  
        });
	$('.btn_dad_landscape').click(function(e) {
            if (name_of_person_clicked == 'dan') {
                // Go to mike webpage
            }
            else {
                name_of_person_clicked = 'dan'
            }
            moveTo(map, DadLatLng, DadZoom, marker_dad);  
        });
	$('.btn_tom_landscape').click(function(e) {
        	if (name_of_person_clicked == 'tom') {
                // Go to mike webpage
                window.location = 'www.cocozzello.com';
            }
            else {
                name_of_person_clicked = 'tom'
            }
            moveTo(map, TomLatLng, TomZoom, marker_tom);  
        });
	$('.btn_sam_landscape').click(function(e) {
            if (name_of_person_clicked == 'sam') {
                // Go to mike webpage
                window.location = 'www.cocozzello.com/sam';
            }
            else {
                name_of_person_clicked = 'sam'
            }
            moveTo(map, SamLatLng, SamZoom, marker_sam);  
        });
	$('.btn_lidnesy_landscape').click(function(e) {
           if (name_of_person_clicked == 'lidnesy') {
                // Go to mike webpage
            }
            else {
                name_of_person_clicked = 'lidnesy'
            }
             moveTo(map, lidnesyLatLng, LidnesyZoom, marker_lid);  
        });
    $('.btn_dan_landscape').click(function(e) {
            if (name_of_person_clicked == 'dan') {
                // Go to mike webpage
            }
            else {
                name_of_person_clicked = 'dan'
            }
            moveTo(map, DanLatLng, DanZoom, marker_dan);  
        });
	$('.btn_diego_landscape').click(function(e) {
            if (name_of_person_clicked == 'diego') {
                // Go to mike webpage
            }
            else {
                name_of_person_clicked = 'diego'
            }
            moveTo(map, diegoLatLng, diegoZoom, marker_diego);  
        });
});

var panPath = [];   // An array of points the current panning action will use
var panQueue = [];  // An array of subsequent panTo actions to take
var STEPS = 200;     // The number of steps that each panTo action will undergo

var map
var marker_tom, marker_sam, marker_lid, marker_mike, marker_joe, marker_mom, marker_dad, marker_dan, marker_diego;
// var tomiw, samiw, lidiw, mikeiw, joeiw, momiw, dadiw, daniw, diegoiw;
var animate_zoom_time_gap = 200;
var map_zoom_out_to       = 1;

// Keep track of all pending animations to clear them if someone triggers a differet
// person
var timeouts = [];

var TomLatLng       = {lat: 43.9959019, lng: -92.6212583};
var TomZoom         = 12;

var SamLatLng       = {lat: 13.7515912, lng: 100.4926579};
var SamZoom         = 15;

var lidnesyLatLng   = {lat: 21.3279758,lng: -157.9391622};
var LidnesyZoom     = 12;

var MikeLatLng      = {lat: 51.503324, lng: -0.1217317};
var MikeZoom        = 17;

var JoeLatLng       = {lat: 40.6451594, lng: -74.085084};
var JoeZoom         = 11;

var MomLatLng       = {lat: 40.5949991, lng: -73.509588};
var MomZoom         = 14;

var DadLatLng       = {lat: 39.4877302, lng: 16.2891784};
var DadZoom         = 14;

var DanLatLng       = {lat: -33.8642497, lng: 151.1876884};
var DanZoom         = 13;

var diegoLatLng    = {lat: 41.0221779, lng: -83.922091};
var diegoZoom      = 13;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: TomLatLng,
      zoom: 10
    });

    map.setOptions( {
        draggable: false, 
        zoomControl: false, 
        scrollwheel: false, 
        disableDoubleClickZoom: true, 
        mapTypeId: 'terrain'});

    var tomiw = new google.maps.InfoWindow({
      content: 'Tom hasnt set a favorite place'
    });
    marker_tom = new google.maps.Marker({
        position: TomLatLng,
        map: map,
        title: "Tom"
    });
    marker_tom.addListener('click', function() {
      tomiw.open(map, marker_tom);
    });

    samiw = new google.maps.InfoWindow({
      content: "The Temple of Emerald Buddha"
    });
    marker_sam = new google.maps.Marker({
        position: SamLatLng,
        map: map,
        title: 'Sam'
    });
    marker_sam.addListener('click', function() {
      samiw.open(map, marker_sam);
    });


    lidiw = new google.maps.InfoWindow({
      content: "Honolulu"
    });
    marker_lid = new google.maps.Marker({
        position: lidnesyLatLng,
        map: map,
        title: 'Lidnesy'
    });
    marker_lid.addListener('click', function() {
      lidiw.open(map, marker_lid);
    });


    mikeiw = new google.maps.InfoWindow({
      content: "London Eye"
    });
    marker_mike = new google.maps.Marker({
        position: MikeLatLng,
        map: map,
        title: 'Mike'
    });
    marker_mike.addListener('click', function() {
      mikeiw.open(map, marker_mike);
    });


    joeiw = new google.maps.InfoWindow({
      content: "Brooklyn"
    });
    marker_joe = new google.maps.Marker({
        position: JoeLatLng,
        map: map,
        title: 'Joe'
    });
    marker_joe.addListener('click', function() {
      joeiw.open(map, marker_joe);
    });

    var contentString = '<div id="content">'+
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

    momiw = new google.maps.InfoWindow({
      content: contentString
    });
    marker_mom = new google.maps.Marker({
        position: MomLatLng,
        map: map,
        title: 'Mom'
    });
    marker_mom.addListener('click', function() {
      momiw.open(map, marker_mom);
    });


    dadiw = new google.maps.InfoWindow({
      content: "Town Named After Our Family"
    });
    marker_dad = new google.maps.Marker({
        position: DadLatLng,
        map: map,
        title: 'Dad'
    });
    marker_dad.addListener('click', function() {
      dadiw.open(map, marker_dad);
    });


    daniw = new google.maps.InfoWindow({
      content: "Sydney Austraila"
    });
    marker_dan = new google.maps.Marker({
        position: DanLatLng,
        map: map,
        title: 'Dan'
    });
    marker_dan.addListener('click', function() {
      daniw.open(map, marker_dan);
    });


    diegoiw = new google.maps.InfoWindow({
      content: "The Gilboa Town Bull"
    });
    marker_diego = new google.maps.Marker({
        position: diegoLatLng,
        map: map,
        title: 'Diego'
    });
    marker_diego.addListener('click', function() {
      diegoiw.open(map, marker_diego);
    });
}

function moveToLocation(loc){
    var center = new google.maps.LatLng(loc['lat'], loc['lng']);
    // using global variable:
    map.panTo(center);
}
    
function hide_all_markers() {
    marker_sam.setVisible(false);
    marker_tom.setVisible(false);
    marker_lid.setVisible(false);
    marker_mike.setVisible(false);
    marker_joe.setVisible(false);
    marker_mom.setVisible(false);
    marker_dad.setVisible(false);
    marker_dan.setVisible(false);
    marker_diego.setVisible(false);
}

function moveTo(map, lat_and_lng, target_zoom, marker) {
    hide_all_markers();
    clear_pending_animations();
    var step_one_time = (map.getZoom() - map_zoom_out_to) * (animate_zoom_time_gap/1.5)
    var time_to_trigger_move =  step_one_time;
    var time_to_trigger_zoom = step_one_time * 2.5;
    var time_to_trigger_marker = step_one_time * 5;

    animateMapZoomTo(map, map_zoom_out_to);

    timeouts.push( setTimeout(function (){
        moveToLocation(lat_and_lng);
    }, time_to_trigger_move));

    timeouts.push( setTimeout(function (){
        animateMapZoomTo(map, target_zoom);
    }, time_to_trigger_zoom));

    timeouts.push( setTimeout(function (){
        marker.setVisible(true);
        marker.setAnimation(google.maps.Animation.DROP);
    }, time_to_trigger_marker));
}

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