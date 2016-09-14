$(document).ready(function() {

	//get the value of the input when user clicks submit
	$('.wuInput').submit(function(event) {

	// zero out results from previous search
	$('.results').html('');

	// get the value of the zip code the the user enters
	var zip = $('input[name=zipInput]').val();

	//set a variable for the message of an improperly entered zip
	var use5DigitZip = "<br><p>not so fast chief!<br><br>enter a real 5-digit US zip code</p>";


	//check to make sure the input is a 5-digit number
	//The html input maxlength="5" pattern=".{5,5}" also help ensure the zip if formatted correctly
	if (isNaN(zip)) {
		$('.results').html(use5DigitZip);

	//check to make sure the input is not negative
	} else if (zip <= 0) {
		$('.results').html(use5DigitZip);

	} else {

		//grabs the Weather Undeground JSON for a particular zip
		$.ajax({
			url: "http://api.wunderground.com/api/291369cc63912a1e/geolookup/conditions/q/"+zip+".json",
			dataType: "jsonp",
			success: function(parsed_json) {

				//set variables for a few of the parsed weather values
				var city = parsed_json.location.city;
				var state = parsed_json.location.state;
				var icon = parsed_json.current_observation.icon_url;
				var weather = parsed_json.current_observation.weather;
				var temp_f = parsed_json.current_observation.temp_f;
				var humidity = parsed_json.current_observation.relative_humidity;
				var wind = parsed_json.current_observation.wind_string;
				var link = parsed_json.location.wuiurl;

				//put some context around the weather values that you just parsed out
				var weatherIN = "<h2>" + city + ", " + state + "</h2><div><img src='" + icon + "'></div><p>" + weather + "</p><p>" + temp_f + "F</p><p>" + humidity + " humidity</p><p>wind: " + wind + "</p><p>more:<br><br><a href='" + link + "' target='_blank'>" + link + "</a></p>";

				//put the weatherIN string with context and variables into the results div as html
				$(".results").html(weatherIN);
			}

		//logs a success in the console if everything works!
		}).done(function() {
			console.log("great success");

		//log a failure in the console if something is broken :(
		}).fail(function() {
			console.log("something is broken"); 

		});

	//end else
	};

	//end on submit function
	});

//end doc ready function
});
