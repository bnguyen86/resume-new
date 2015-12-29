var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');
var qs = require('querystring');
var url = require('url');

var mysql      = require('mysql');
var connectionPool = mysql.createPool({
  connectionLimit	: 10,
  host    			: 'localhost',
  port	   			: '3307',
  user     			: 'websiteuser',
  password 			: 'password',
  database 			: 'resume'
  
});
//http://192.168.1.71:3307/
var bodyParser = require('./node_modules/body-parser');
	 var textParser = bodyParser.json();


var app = express();

app.use('/resume',express.static('./'));

app.use('/resume/query/',textParser, function(req,res){
	
	var queryString = "";
	  console.log(req.body.list);
	  if(req.body.list == "skill-detail") queryString = "select * from skills";
	  	else if(req.body.list == "skill-catagory") queryString = "select sm_name from skills_major";
	  	else if(req.body.list == "edu-catagory") queryString = "select * from education";
	  	else if(req.body.list == "edu-detail") queryString = "select * from courses";
	  	else if(req.body.list == "work-catagory") queryString = "select * from work_exp";
	  	else if(req.body.list == "work-detail") queryString = "select * from work_desc";
	  	else if(req.body.list == "projects-catagory") queryString = "select * from projects";
	  	else if(req.body.list == "projects-detail") queryString = "select * from project_desc";
	  	else if(req.body.list == "projects-skills") queryString = "select * from project_skill";
	  	else if(req.body.list == "hobbies") queryString = "select * from hobbies";
	  	
	  	console.log("queryString: " + queryString);
	  	
	connectionPool.getConnection(function(err, connection) {
	  if (err) {
	    console.error('error connecting: ' + err.stack);
	    return;
	  }	
	  console.log('connected as id ' + connection.threadId);	  
	  
	  connection.query(queryString, function(err, rows, fields) {
	  		if (err) console.log(err);

	 		res.send(rows);
			connection.release();
		});
	});
	

});

app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500).send('Something broke!');
});

http.createServer(app).listen(81, function(){
	console.log('Server started on: ' + Date());
});