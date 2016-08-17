
$( document ).ready(function(){

var myHotelMarker;

  $('[data-action="addHotel"]').on('click', function(){

  	var day = $('#day-display').text().replace(/\s/, '');
    var $dropdown = $('#hotel-choices');
    var $selectedHotel = $dropdown.find(":selected");
    var location = $selectedHotel['0'].attributes['0'].nodeValue;
    
	var selectedHotel = $selectedHotel.text();

	var marker = drawMarker(location, selectedHotel, 'hotel');
	if (dayMarkers[day]) dayMarkers[day].push(marker);
	else dayMarkers[day] = [marker];
	
	if(myHotelMarker) myHotelMarker.setMap(null);

	myHotelMarker=marker;


    
    var $removalButton = newButtonWithRemoveHandler(newButtonHtml, day, marker);
    $('.myHotel').children("."+day).remove();
    $('.myHotel').append("<span class='title "+day+"'>"+selectedHotel+"</span>")
    .append($removalButton);

    // var hotelCoords = Place.findOne('hotel', {include: hotel})

    // drawMarker('hotel', hotelCoords);

  });

 	
    
  $('[data-action="addRestaurant"]').on('click', function(){
    var day = $('#day-display').text().replace(/\s/, '');

    var $dropdown = $('#restaurant-choices');
    var $selectedRestaurant = $dropdown.find(":selected");

    var location = $selectedRestaurant['0'].attributes['0'].nodeValue;
	var selectedRestaurant = $selectedRestaurant.text();
    
    var marker = drawMarker(location, selectedRestaurant, 'restaurant');
    
    if (dayMarkers[day]) dayMarkers[day].push(marker);
	else dayMarkers[day] = [marker];

   

    var $removalButton = newButtonWithRemoveHandler(newButtonHtml, day, marker);

    $('.myRestaurant').append("<span class='title "+day+"'>"+selectedRestaurant+"</span>")
    .append($removalButton);


  });

  


  $('[data-action="addActivity"]').on('click', function(){
    var day = $('#day-display').text().replace(/\s/, '');
    var $dropdown = $('#activity-choices');
    var $selectedActivity = $dropdown.find(":selected");

    var location = $selectedActivity['0'].attributes['0'].nodeValue;
	var selectedActivity = $selectedActivity.text();

    var marker = drawMarker(location, selectedActivity, 'activity');
    
    if (dayMarkers[day]) dayMarkers[day].push(marker);
	else dayMarkers[day] = [marker];

    var $removalButton = newButtonWithRemoveHandler(newButtonHtml, day, marker);

    
    
    $('.myActivity').append("<span class='title "+day+"'>"+selectedActivity+"</span>")
    .append($removalButton);


  });


  $('.day-btn').on('click', function(){
  	$('.day-btn').removeClass('current-day');
  	var $this = $(this);
  	$this.addClass('current-day');

	$('#day-display').text('Day '+ ($this.text()));

	var day = $('#day-display').text().replace(/\s/, '');

	var $allItinItems = $('.itinerary-item');
	$allItinItems.children().css("display", "none");
	$allItinItems.find("."+day).css("display", "inline-block");


		
	console.log(dayMarkers);

	for (var dayKey in dayMarkers){
		var markerArray = dayMarkers[dayKey];
		if (dayKey == day) markerArray.forEach(function(marker){marker.setMap(currentMap);});
		else markerArray.forEach(function(marker){marker.setMap(null);});
	}


	});





});

var dayMarkers = {};

var newButtonHtml = "<button class='btn btn-xs btn-danger remove btn-circle'>x</button>";

function newButtonWithRemoveHandler(html, dayClass, marker){
  var $removeButton = $(html).addClass(dayClass);
    $removeButton.on('click', function(){
      $itemToRemove = $(this).prev();
      $itemToRemove.remove();
      $removeButton.remove();
      marker.setMap(null);
    });
  return $removeButton;
}

function drawMarker(locationString, name, type) {

	var locationArray = locationString.split(',');

  	var myLatLng = {lat: +locationArray[0], lng: +locationArray[1]};

  	var marker = new google.maps.Marker({
    	position: myLatLng,
    	map: currentMap,
    	title: name,
    	icon: iconURLs[type]
  	});
  	return marker;
}

  // function drawMarker (type, coords) {
  //   var latLng = new google.maps.LatLng(coords[0], coords[1]);
  //   var iconURL = iconURLs[type];
  //   var marker = new google.maps.Marker({
  //     icon: iconURL,
  //     position: latLng
  //   });
  //   marker.setMap(currentMap);
  // }

    var iconURLs = {
    hotel: '/images/lodging_0star.png',
    restaurant: '/images/restaurant.png',
    activity: '/images/star-3.png'
  };

