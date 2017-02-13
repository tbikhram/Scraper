//require for mongoose
var mongoose = require("mongoose");
//create schema class
var schema = mongoose.Schema;
// create artile schema
var ArcticleSchema = new Schema({
// title is a required string
	title:{
		type : String,
		required: true
	},
// link is required string
	link:{
		type: String,
		required: true
	},
// this only saves one notes objectId, ref refers to note model
	note: {
		type: Schema.Types.ObjectId,
		ref: "Note"
	}
});

//create the article model with the artcilesSchema
var Arcticle = mongoose.model("Article", ArcticleSchema);

//exporting the model
module.export = Article;