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