$(document).ready(function(){

	//here is the call to the server to scrape the website 
	$(".scraper").on("click", function(){
		$(".articleContainer").empty();
		$.get("/scrape",function(response){
			console.log("Scrape initiated!" + response.length);
			for(i=0; i< response.length; i++){
				displayUnsavedArticles(response[i]);
			}
		});
	});
//here the articles will generate onto the HTML
function displayUnsavedArticles(articleData){
	if(articleData.thumbnail === undefined || articleData.thumbnail === "" ){
		articleData.thumbnail = "/img/ocean.jpg";
		$("<div class= 'indivualArticle'</div>").append("<h3>" + articleData.title + "</h3>")
		.append("<p class='link'>" + articleData.link + "</p>")
		.append("img")
	}
}

});