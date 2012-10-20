$(document).ready(function() {

	var brewery_names = [
		"14th Star Brewing Co.", "Alchemist", "Bobcat Cafe & Brewery",
		"Fiddlehead Brewing Company", "Brewery at Trapp Family Lodge", "Harpoon Brewery",
		"Lawson's Finsest Liquids", "Long Trail", "Magic Hat Brewing Company",
		"McNeil's Pub and Brewery", "Northshire Brewery", "Norwich Inn",
		"Otter Creek Brewing Co.", "Rock Art Brewery", "Switchback",
		"Three Needs", "Trout River Brewing Co.", "Vermont Beer Co.",
		"Vermont Pub & Brewery", "Zero Gravity", "Drop-In Brewing Company"
	];

	var brewery_ids = [
		"XYOIqp", "pj4HJk", "qlEuN1", "pATY6L", "NHwMvH", "RzvedX",
		"LN8yp5", "2ntvtp", "qIqpZc", "i7SC2N", "kc28OR", "plvi9O",
		"h45jwd", "LpX3cU", "KJmWjL", "L8M1u9", "1irs0u", "vKs97O",
		"HAszUa", "VEY3Xa", "9s770G"
	];

	// Append breweries to select lists
	$.each(brewery_names, function(i, val) {
		var option = "<option value='"+brewery_ids[i]+"'>" + val + "</option>";

		$("#brewery-select-list").append(option);
		$("#brewery-select-list2").append(option);
	});

	/*
	 * Getting Data stuff
	*/

	// http://en.wikipedia.org/wiki/Same_origin_policy
	// http://usejquery.com/posts/the-jquery-cross-domain-ajax-guide
	// https://github.com/padolsey/jQuery-Plugins/tree/master/cross-domain-ajax
	// http://james.padolsey.com/javascript/cross-domain-requests-with-jquery/
	// http://stackoverflow.com/questions/9164944/convert-string-to-json-object

	// data_type can be brewery or beer
	var getBeers = function(brewery_id, data_type) {

		// If user searching for brewery
		if(data_type == "brewery") {
			$.ajax({
				url: 'http://api.brewerydb.com/v2/brewery/' + brewery_id + '/locations/?key=75c487072c38fac9621fac0f4db26ca1',
				type: 'GET',
				success: function(res) {
					$("#json").html($(res.responseText));
					var content = $("#json").find('p').html();
					var json_object = $.parseJSON(content); // data stores all json data objects
					// console.log(json_object);

					$("#loader").hide();

					// Loops through all beers for a brewery
					$(json_object["data"]).each(function(index, element) {
						$.each(element, function(key,value) {

							// Get necessary data
							if(key == "locationTypeDisplay" || key == "hoursOfOperation" || key == "brewery"
								|| key == "phone" || key == "streetAddress" || key == "locality"
								|| key == "website") {

								// Loop deeper into brewery object
								if(key == "brewery") {
									$.each(value, function(k,v) {
										if(k == "images" || k == "description" || k == "established" || k == "name") {
											// Loop deeper into images object
											if(k == "images") {
												// Get all label images
												$.each(v, function(k2,v2) {
													if(k2 == "medium") {
														// image icon
														$(".brewery-img").attr("src",v2);
													}
												});
											}
											else {
												// description, established, name
												if(k == "description") { $(".brewery-description").html(v); }
												if(k == "established") { $(".brewery-established").html("Established: " + v); }
												if(k == "name") { $(".brewery-name").html(v); }
											}
										}
									});
								}
								else {
									// type, hours, phone, street address, city, website
									if(key == "streetAddress") { $(".brewery-address").html("Address: " + value); }
									if(key == "hoursOfOperation") { $(".brewery-hours").html("Hours: " + value); }
									if(key == "locationTypeDisplay") { $(".brewery-type").html("Type: " + value); }
									if(key == "phone") { $(".brewery-phone").html("Phone: " + value); }
									if(key == "website") { $(".brewery-website").html("Website: <a target='_blank' href='"+value+"'>website</a>"); }
									if(key == "locality") { $(".brewery-city").html(value + ", VT"); }
								}
							}
						});
					});
				}
			});
		}
		// If user searching for beers
		else if(data_type == "beer") {
			$.ajax({
				url: 'http://api.brewerydb.com/v2/brewery/' + brewery_id + '/beers/?key=75c487072c38fac9621fac0f4db26ca1',
				type: 'GET',
				success: function(res) {
					$("#json2").html($(res.responseText));
					var content = $("#json2").find('p').html();
					var json_object = $.parseJSON(content); // data stores all json data objects
					// console.log(json_object);
					$(".beer-container").html("");

					$("#loader2").hide();

					var i = 0;
					// Loops through all beers for a brewery
					$(json_object["data"]).each(function(index, element) {
						i++;
						var new_beer = "<div class='beer"+i+"' style='margin-bottom:25px;'>";

						$.each(element, function(key,value) {
							
							if(key == "labels" || key == "availableId" || key == "glasswareId" || key == "name" || key == "description" || key == "abv") {


								if(key == "labels") {

									// Get all label images
									$.each(value, function(k,v) {
										// medium label
										if(k == "medium") {
											new_beer += "<img class='beer-img' src='"+v+"'>";
										}
									});
								}
								// Availability Yes
								else if(key == "availableId" && value == "1") {
									new_beer += "<div class='beer-available'>Available: Yes</div><br />";
								}
								// Availability No
								else if(key == "availableId" && value == "2") {
									new_beer += "<div class='beer-available'>Available: No</div><br />";
								}
								// Glassware Flute 1
								else if(key == "glasswareId" && value == "1") {
									new_beer += "<div class='beer-glassware'>Glassware: Flute</div>";
								}
								// Glassware Goblet 2
								else if(key == "glasswareId" && value == "2") {
									new_beer += "<div class='beer-glassware'>Glassware: Goblet</div>";
								}
								// Glassware Mug 3
								else if(key == "glasswareId" && value == "3") {
									new_beer += "<div class='beer-glassware'>Glassware: Mug</div>";
								}
								// Glassware Pilsner 4
								else if(key == "glasswareId" && value == "4") {
									new_beer += "<div class='beer-glassware'>Glassware: Pilsner</div>";
								}
								// Glassware Pint 5
								else if(key == "glasswareId" && value == "5") {
									new_beer += "<div class='beer-glassware'>Glassware: Pint</div>";
								}
								// Glassware Snifter 6
								else if(key == "glasswareId" && value == "6") {
									new_beer += "<div class='beer-glassware'>Glassware: Snifter</div>";
								}
								// Glassware Stange 7
								else if(key == "glasswareId" && value == "7") {
									new_beer += "<div class='beer-glassware'>Glassware: Stange</div>";
								}
								// Glassware Tulip 8
								else if(key == "glasswareId" && value == "8") {
									new_beer += "<div class='beer-glassware'>Glassware: Tulip</div>";
								}
								// Glassware Weizen 9
								else if(key == "glasswareId" && value == "9") {
									new_beer += "<div class='beer-glassware'>Glassware: Weizen</div>";
								}
								// Glassware Oversized Wine Glass 10
								else if(key == "glasswareId" && value == "10") {
									new_beer += "<div class='beer-glassware'>Glassware: Oversized Wine Glass</div>";
								}
								// Glassware Willi 13
								else if(key == "glasswareId" && value == "13") {
									new_beer += "<div class='beer-glassware'>Glassware: Willi</div>";
								}
								// Glassware Thistle 14
								else if(key == "glasswareId" && value == "14") {
									new_beer += "<div class='beer-glassware'>Glassware: Thistle</div>";
								}
								else {
									// abv, description, name
									if(key == "abv") {
										new_beer += "<div class='beer-abv'>Alcohol By Volume: " + value + "</div>";
									}
									else if(key == "description") {
										new_beer += "<p><div class='beer-description'>" + value + "</div></p>";
									}
									else if(key == "name") {
										new_beer += "<p><h1 class='beer-name'>" + value + "</h1></p>";
									}
								}
							}

						});
						new_beer += "</div>";
						$(".beer-container").append(new_beer);
						var img = $('.beer-container').find(".beer"+i).find('img.brewery-img');
						var img_src = $('.beer-container').find(".beer"+i).find('img.brewery-img').attr('src');
						
						if(typeof img_src != 'undefined') {
							$(".beer-container").find(".beer"+i).find("h1").after($(img));
						}
						// else {
						// 	$(".beer-container").find(".beer"+i).find("h1").after("<img class='beer-img' src='assets/img/placeholder.png'>");
						// }
					});
				}
			});
		}
	};

	// on change listener for brewery select list
	$("#brewery-select-list").change(function() {
		if($(this).val != 'nil') {
			$("#loader").show();
			var brew_id = $(this).val();
			
			getBeers(brew_id, "brewery");
		}
	});

	// on change listener for brewery select list2 (beer)
	$("#brewery-select-list2").change(function() {
		if($(this).val != 'nil') {
			$("#loader2").show();
			var brew_id = $(this).val();
			
			getBeers(brew_id, "beer");
		}
	});

});