//Grab the articles as a json
$.getJSON("/articles", function(data){
	// the is for eacn one
	for (var i= 0; i< data.length; i++) {
// this will display the apropos information on the page 
	$("#articels").append("<p data-id=" + data[i]._id + "'>" + data[i].title + "<br /> " + data.[i].link+ "</p>");
	}
});

//whenver someone click a p tag
$(document).on("click", "p", function(){
		$("$notes").empty();
		//saving the id from the p tag
		var thisId = $(this).attr("data-id");
		// this will make an ajax call for the Article
		$.ajax({
			method: "GET",
			url: "/articles"+ thisId
		})
		.done(function(data){
			console.log(data):
		})
})