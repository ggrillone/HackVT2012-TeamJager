$(document).ready(function() {

	// http://en.wikipedia.org/wiki/Same_origin_policy
	// http://usejquery.com/posts/the-jquery-cross-domain-ajax-guide
	// https://github.com/padolsey/jQuery-Plugins/tree/master/cross-domain-ajax
	// http://james.padolsey.com/javascript/cross-domain-requests-with-jquery/
	// http://stackoverflow.com/questions/9164944/convert-string-to-json-object

	var getBeers = function(brewery) {

		$.ajax({
			url: 'http://api.brewerydb.com/v2/brewery/' + brewery + '/beers/?key=7c7a3e4d800c8745829f95c338570201',
			type: 'GET',
			success: function(res) {
				$("#json").html($(res.responseText));
				var content = $("#json").find('p').html();
				var json_object = $.parseJSON(content); // data stores all json data objects
				console.log(json_object);
				$("#structure").html("");

				$("#loader").hide();

				// Loops through all beers for a brewery
				$(json_object["data"]).each(function(index, element) {
					$.each(element, function(key,value) {

						if(key == "labels" || key == "availableId" || key == "glasswareId"
							|| key == "name" || key == "id" || key == "description"
							|| key == "abv") {

							if(key == "labels") {

								// Get all label images
								var label_row = "<tr><td>" + key + "</td><td>";
								$.each(value, function(k,v) {
									label_row += v + "<br/>";
								});
								label_row += "</td></tr>";
								$("#structure").append(label_row);
							}
							// Availability Yes
							else if(key == "availableId" && value == "1") {
								$("#structure").append("<tr><td>Available</td><td>Yes</td></tr>");
							}
							// Availability No
							else if(key == "availableId" && value == "2") {
								$("#structure").append("<tr><td>Available</td><td>No</td></tr>");
							}
							// Glassware Flute 1
							else if(key == "glasswareId" && value == "1") {
								$("#structure").append("<tr><td>Glassware</td><td>Flute</td></tr>");
							}
							// Glassware Goblet 2
							else if(key == "glasswareId" && value == "2") {
								$("#structure").append("<tr><td>Glassware</td><td>Goblet</td></tr>");
							}
							// Glassware Mug 3
							else if(key == "glasswareId" && value == "3") {
								$("#structure").append("<tr><td>Glassware</td><td>Mug</td></tr>");
							}
							// Glassware Pilsner 4
							else if(key == "glasswareId" && value == "4") {
								$("#structure").append("<tr><td>Glassware</td><td>Pilsner</td></tr>");
							}
							// Glassware Pint 5
							else if(key == "glasswareId" && value == "5") {
								$("#structure").append("<tr><td>Glassware</td><td>Pint</td></tr>");
							}
							// Glassware Snifter 6
							else if(key == "glasswareId" && value == "6") {
								$("#structure").append("<tr><td>Glassware</td><td>Snifter</td></tr>");
							}
							// Glassware Stange 7
							else if(key == "glasswareId" && value == "7") {
								$("#structure").append("<tr><td>Glassware</td><td>Stange</td></tr>");
							}
							// Glassware Tulip 8
							else if(key == "glasswareId" && value == "8") {
								$("#structure").append("<tr><td>Glassware</td><td>Tulip</td></tr>");
							}
							// Glassware Weizen 9
							else if(key == "glasswareId" && value == "9") {
								$("#structure").append("<tr><td>Glassware</td><td>Weizen</td></tr>");
							}
							// Glassware Oversized Wine Glass 10
							else if(key == "glasswareId" && value == "10") {
								$("#structure").append("<tr><td>Glassware</td><td>Oversized Wine Glass</td></tr>");
							}
							// Glassware Willi 13
							else if(key == "glasswareId" && value == "13") {
								$("#structure").append("<tr><td>Glassware</td><td>Willi</td></tr>");
							}
							// Glassware Thistle 14
							else if(key == "glasswareId" && value == "14") {
								$("#structure").append("<tr><td>Glassware</td><td>Thistle</td></tr>");
							}
							else {
								$("#structure").append("<tr><td>" + key + "</td><td>" + value + "</td></tr>");
							}
						}
					});
				});
			}
		});
	};

	$("a").click(function(event) {
		$("#loader").show();

		event.preventDefault();
		var db_id = $(this).attr("data");
		
		getBeers(db_id);
	});

	 
});