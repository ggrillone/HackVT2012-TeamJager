$(document).ready(function() {

	// var response;
	// $.ajax({
	//     url: 'http://api.brewerydb.com/v2/brewery/qIqpZc/beers/?key=75c487072c38fac9621fac0f4db26ca1',
	//     dataType: 'jsonp',
	//     success: function(data){
	//     	response = eval( '(' + data + ')' );
	//     }
	// });


  $.ajax({
    type: "GET",
    url: "http://api.brewerydb.com/v2/brewery/RzvedX/?key=75c487072c38fac9621fac0f4db26ca1&format=xml",
    dataType: "xml",
    success: parseXml
  });

  function parseXml(xml)
{
  //find every Tutorial and print the author
  $(xml).find("images").each(function()
  {
    $("#json").append($(this).attr("icon") + "<br />");
  });

  // Output:
  // The Reddest
  // The Hairiest
  // The Tallest
  // The Fattest
}

});