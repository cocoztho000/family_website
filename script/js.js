

var hidden = 0;
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
	$('.btn_mike_landscape').hover(function(e) {
            moveTo(map, MikeLatLng, MikeZoom, marker_mike); 
        });
	$('.btn_joe_landscape').hover(function(e) {
            moveTo(map, JoeLatLng, JoeZoom, marker_joe);  
        });
	$('.btn_mom_landscape').hover(function(e) {
            moveTo(map, MomLatLng, MomZoom, marker_mom);  
        });
	$('.btn_dad_landscape').hover(function(e) {
            moveTo(map, DadLatLng, DadZoom, marker_dad);  
        });
	$('.btn_tom_landscape').hover(function(e) {
        	moveTo(map, TomLatLng, TomZoom, marker_tom);  
        });
	$('.btn_sam_landscape').hover(function(e) {
            moveTo(map, SamLatLng, SamZoom, marker_sam);  
        });
	$('.btn_lidnesy_landscape').hover(function(e) {
            moveTo(map, lidnesyLatLng, LidnesyZoom, marker_lid);  
        });
    $('.btn_dan_landscape').hover(function(e) {
            moveTo(map, DanLatLng, DanZoom, marker_dan);  
        });
	$('.btn_diageo_landscape').hover(function(e) {
            moveTo(map, DanLatLng, DanZoom, marker_diageo);  
        });
});

var panPath = [];   // An array of points the current panning action will use
var panQueue = [];  // An array of subsequent panTo actions to take
var STEPS = 200;     // The number of steps that each panTo action will undergo

var map
var marker_tom, marker_sam, marker_lid, marker_mike, marker_joe, marker_mom, marker_dad, marker_dan, marker_diageo;
var tomiw, samiw, lidiw, mikeiw, joeiw, momiw, dadiw, daniw, diageoiw;
var animate_zoom_time_gap = 400;
var map_zoom_out_to       = 1;

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

var DiageoLatLng    = {lat: 40.7056079, lng: -74.0134997};
var DiageoZoom      = 13;

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

    tomiw = new google.maps.InfoWindow({
      content: "Tom hasn't set a favorite place"
    });
    marker_tom = new google.maps.Marker({
        position: TomLatLng,
        map: map,
        title: "Tom"
    });
    tomiw.addListener('click', function() {
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
    samiw.addListener('click', function() {
      samiw.open(map, marker_sam);
    });


    marker_lid = new google.maps.Marker({
        position: lidnesyLatLng,
        map: map,
        title: 'Lidnesy'
    });
    marker_mike = new google.maps.Marker({
        position: MikeLatLng,
        map: map,
        title: 'Mike'
    });
    marker_joe = new google.maps.Marker({
        position: JoeLatLng,
        map: map,
        title: 'Joe'
    });
    marker_mom = new google.maps.Marker({
        position: MomLatLng,
        map: map,
        title: 'Mom'
    });
    marker_dad = new google.maps.Marker({
        position: DadLatLng,
        map: map,
        title: 'Dad'
    });
    marker_dan = new google.maps.Marker({
        position: DanLatLng,
        map: map,
        title: 'Dan'
    });
    marker_diageo = new google.maps.Marker({
        position: DiageoLatLng,
        map: map,
        title: 'Diageo'
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
    marker_diageo.setVisible(false);
}

function moveTo(map, lat_and_lng, target_zoom, marker) {
    hide_all_markers();
    var step_one_time = (map.getZoom() - map_zoom_out_to) * (animate_zoom_time_gap/1.5)
    var time_to_trigger_move =  step_one_time;
    var time_to_trigger_zoom = step_one_time * 1.3;
    var time_to_trigger_marker = step_one_time * 2.3;

    animateMapZoomTo(map, map_zoom_out_to);

    setTimeout(function (){
        moveToLocation(lat_and_lng);
    }, time_to_trigger_move);

    setTimeout(function (){
        animateMapZoomTo(map, target_zoom);
    }, time_to_trigger_zoom);

    setTimeout(function (){
        marker.setVisible(true);
        marker.setAnimation(google.maps.Animation.DROP);
    }, time_to_trigger_marker);
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