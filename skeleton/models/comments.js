// here I am requiring mongoose
var mongoose = require("mongoose");
//create a schema class
var Schema = mongoose.Schema;
// creating the note schema 

var CommentSchema = new Schema({
	// just a string for the title 
	title:{
		type: String
	},
	//just a string for body
	body: {
		type: String
	}
});

// creating the Note model with the NoteSchema
var Comment = mongoose.model("Comment", CommentSchema);

//exporting note model
module.exports = Comment; 