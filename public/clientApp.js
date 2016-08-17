$( document ).ready(function(){

	$('[data-action="addHotel"]').on('click', function(){
		var $dropdown = $('#hotel-choices');
		var selectedHotel = $dropdown.find(":selected").text();

		var $removalButton = newButtonWithRemoveHandler(newButtonHtml);

		$('.myHotel').children().remove();

		$('.myHotel').append("<span class='title'>"+selectedHotel+"</span>")
		.append($removalButton);

	});


		
	$('[data-action="addRestaurant"]').on('click', function(){
		var $dropdown = $('#restaurant-choices');
		var selectedRestaurant = $dropdown.find(":selected").text();
		
		var $removalButton = newButtonWithRemoveHandler(newButtonHtml);

		// var $removeButton = $(newButtonHtml);
		// $removeButton.on('click', function(){
		// 	$itemToRemove = $(this).prev();
		// 	$itemToRemove.remove();
		// 	$removeButton.remove();
		// });

		$('.myRestaurant').append("<span class='title'>"+selectedRestaurant+"</span>")
		.append($removalButton);


	});



	$('[data-action="addActivity"]').on('click', function(){
		var $dropdown = $('#activity-choices');
		var selectedActivity = $dropdown.find(":selected").text();

		var $removalButton = newButtonWithRemoveHandler(newButtonHtml);
		
		$('.myActivity').append("<span class='title'>"+selectedActivity+"</span>")
		.append($removalButton);


	});

});

var newButtonHtml = "<button class='btn btn-xs btn-danger remove btn-circle'>x</button>";

function newButtonWithRemoveHandler(html){
	var $removeButton = $(html);
		$removeButton.on('click', function(){
			$itemToRemove = $(this).prev();
			$itemToRemove.remove();
			$removeButton.remove();
		});
	return $removeButton;
}








