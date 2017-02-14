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
			//with that done, add the note information to the page 
			$("#notes").append("<h2>" + data.title + "</h2>");
			//an input to enter the new title 
			$("#notes").append("<input id='titleinput' name = 'title'>");
			//text area to add a new note body
			$("#notes").append("<button date-id='" + data._id + "' id='savenote'>Save Note</button>");
			//if statement for notes in the article
			if(data.note) {
				//places the title of the note int he title input 
				$("#titleinput").val(data.note.title);
				//places the body of the note in the body text area 
				$("#bodyinput").val(data.note.body);
			}
		});
});

//when you click the save note button 
$(document).on("click", "#savenote", function(){
	//this grabs the id associated with the article from the submit button
	var thisId = $(this).attr("data-id");
	//this runs a POSt request a chnage the note, using what's entered in the inputs
	$.ajax({
		method: "POST",
		url: "/articles" + thisId,
		data: {
			//here is the value taken from title input
			title: $("#titleinput").val(),
			//vale taken from note text area
			body: $("bodyinput").val()
		}
	})
	//with that done
	.done(function(data){
		//here it logs responses
		console.log(data);
		$("#notes").empty();
	});
	// also, remove the values entered in the input and text area for note entry
	$("#titleinput").val("");
	$("#bodyinput").val("");
});



