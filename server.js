const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () =>{
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
	return text.toUpperCase();
});
app.set('view engine', 'hbs');

app.use(express.static(__dirname+'/public'));



app.use((req,res,next)=>{
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err)=>{
		if (err) {
			console.log('Unable to append to server.log.')
		}
	});
	next();
});

app.get('/', (req,res)=>{
	res.render('home.hbs', {pageTitle: 'Home page', welcomeMessage: 'Welcome Earthlings!'});
});

app.get('/about', (req,res)=>{
	res.render('about.hbs', {pageTitle: 'About page'});
});

app.get('/bad', (req,res)=>{
	res.send({
		errorMessage: 'Bad link- Sorry'
	});
});

// app.use((req,res,next)=>{
// 	res.render('maintanance.hbs');
// });

app.listen(port,()=>{
	console.log(`Server is up on port ${port}`);
});