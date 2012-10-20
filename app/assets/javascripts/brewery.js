$(document).ready(function() {
	$.ajax({
	    url: 'http://api.brewerydb.com/v2/brewery/qIqpZc/beers/?key=75c487072c38fac9621fac0f4db26ca1',
	    dataType: 'jsonp',
	    success: function(data){
	    	console.log(data);
	    	$("#json").html(data);
	    }
	});

});