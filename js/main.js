$(document).ready(function () {

	var templateSource 		= $("#results-template").html();
	var template 			= Handlebars.compile(templateSource);
	var resultsPlaceholder 	= $("#results");	



	var markers     = new Array();
    var LatLngList = new Array();
    var infowindow = '';

	var meters = [
		{"id": 0, "user": "", 'lat': 44.4759194, 'lng': -73.2150619, "time_left": "1H20M"},
		{"id": 1, "user": "", "lat": 44.4759654, "lng": -73.2144181, "time_left": "10M"},
		{"id": 2, "user": "", "lat": 44.4757881, "lng": -73.2148232, "time_left": "15M"},
		{"id": 3, "user": "", "lat": 44.4758016, "lng": -73.2146864, "time_left": "45M"},
		{"id": 4, "user": "", "lat": 44.4760182, "lng": -73.2147655, "time_left": "2H"},
		{"id": 5, "user": "", "lat": 44.4760358, "lng": -73.2147869, "time_left": "50M"}
	]

	var myLatlng = new google.maps.LatLng(meters[0].lat, meters[0].lng);
	var myOptions = {
	    zoom: 20,
	    center: myLatlng,
	    mapTypeId: google.maps.MapTypeId.SATELLITE
	}
	map = new google.maps.Map(document.getElementById("mapholder"), myOptions);

	$.when(
		$.each(meters, function (tkey, place) {
	                   
			var latLng = new google.maps.LatLng(place.lat, place.lng);
			LatLngList.push(latLng);

			var marker = new google.maps.Marker({
				position: latLng,
				map: map
			});

			var place_id = place.id;
			marker.metadata = ({type: "point", id: place_id});

			markers.push(marker);

			var infoHtml = "<div class='marker' style='width:100px; height:70px;'><h2 style='color:red; font-weight:bold;'>" + place.time_left + "</h1>\
				<a href='http://maps.google.com/?q=" + place.lat +","+place.lng + "'>Get me here!</a></div>";

            bindInfoWindow(marker, map, infowindow, infoHtml);



		})
	).then(function (){
		//  Create a new viewpoint bound
	    var bounds = new google.maps.LatLngBounds();
	    //  Go through each...
	    for (var i = 0, LtLgLen = LatLngList.length; i < LtLgLen; i++) {
	      //  And increase the bounds to take this point
	      bounds.extend (LatLngList[i]);
	    }
	    map.fitBounds(bounds);

	    resultsPlaceholder.html(template(meters));


	});



	function bindInfoWindow(marker, map, infoWindow, html) 
    {   
        // on click
        google.maps.event.addListener(marker, 'click', function() {

            if (infowindow) 
                infowindow.close();
        
            infowindow = new google.maps.InfoWindow({
                content: html
            });

            infowindow.open(map,marker); 
        });

        // on click
        google.maps.event.addListener(marker, 'mouseover', function() {

            if (infowindow) 
                infowindow.close();
        
            infowindow = new google.maps.InfoWindow({
                content: html
            });

            infowindow.open(map,marker); 
        });

    }

    $(document).on("click", ".meter", function () {

    	var marker_id = $(this).attr("id");

    	marker = markers[marker_id];

    	new google.maps.event.trigger( marker, 'click' );

    	



    })







});

