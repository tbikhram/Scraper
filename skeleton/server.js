//Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
// here we will be requiring our Note and Article models 
var Note = require ("./models/Note.js");
var Article = require ("./models/Article.js");
//these are the scraping tools used 
var request = require ("request");
var cheerio = require ("cheerio");
// mongoose mpromise deprecated - use bluebird promise
var Promise = require("bluebird");

mongoose.Promise = Promise;

// initialize Express
var app = express();

// here using morgan and body parser with the scraper app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
	extended: false
}));

//make public a static dir
app.use(express.static("public"));
//Database configuration with mongoose
mongoose.connect("mongodb://localhost/week18HW");
var db = mongoose.connection;

//show any mongoose errors 
db.on("error", function(error){
	console.log("Mongoose Error:", error);
});

// Here once logged into the db through mongoose , log a success message 
db.once("open", function(){
	console.log("Mongoose connection successful.");
});

//routes
//===============

//Simple index route
app.get("/", function(req, res){
	res.send(index.html);
});

// Get request to scrape the Cnn website
app.get("/scrape", function(req, res){
	//here we grab the body of the html request 
	request("http://www.cnn.com/", function(error, response, html){
	//then we load that into cheerio and save it to $ for a shorthand selector
	var $ = cheerio.load(html);
	// now, we grab the li within the article tag and do the following
	$("article li").each(function(i, element){
		//here we will save an empty  result object
		var result = {};

	// now we add the text and href of every link, and save them as properties of the result object
	result.title = $(this).children("a").text();
	result.link = $(this).children("a").attr("href");

	//using our artcile model, to create a new entry
	//this will pass the result objets to the entry and the the title and link
	var entry = new Article(result);
	// now, save that entry to the db
	entry.save(function(err, doc){
		//log any errors
		if(err){
			console.log(err);
		}
		//or log the doc
		else{
			console.log(doc);
		}
	  });

	});
  });
	//now we will tell the browse that we finished scraping the text
	res.send("Scraping Complete");

});
// this will get the article we scrapped from the mongoDB
app.get("/articles", function(req, res){

	//now we grab every doc in the articles array 
	Article.find({}, function(error, doc){
		// here we log errors
		if (error){
			console.log(error);
		}
		//or we send the doc to the browser as json object
		else{
			res.json(doc);
		}
	});
});

//Grab an article by it's ObjectID
app.get("/article/:id" function(req, res){
	//now using the id passed in the id parameter, prepare a query that finds the match one in our db
	Article.findOne({ "_id": req.params.id})
	// and populate all of the notes associated with it
	.populate("note")
	//now, we will execute our query
	.exec(function(error, doc){
		if(error){
			console.log(error);
		}
		//otherwise, send the doc to the browser as json object 
		else{
			res.json(doc)
		}

	});
});

//create a new note or replace an existing note
app.post("/articles/:id", function(req, res){
	//create a new note and pass the req.body to the entry
	var newNote = new Note(req.body);

	//and then save the new note the db
	newNote.save(function(error, doc){
		// here we log any errors
		if(error){
			console.log(error);
		}
		//otherwise
		else{
			//use the article id to find and update its note
			Article.findOneUpdate({"_id": req.params.id }, {"note": doc._id})
			//excute the above query 
			.exec(function(err, doc){
				if(err){
					console.log(err);
				}
				else{
					//or send the document to the browser
					res.send(doc)
				}
			});
			
		}

	});
});

//listen on port 3000
app.listen(3000, function(){
	console.log("App running on port 3000");
});






















