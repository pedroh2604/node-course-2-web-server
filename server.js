const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

// setting a template page
hbs.registerPartials(__dirname + '/views/partials');

// that's how we set modules to express
app.set('view engine', 'hbs');

// register middleware
app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url} `;

	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append to server.log');
		}
	});
	next();
});

// it bypasses the other app.get
// app.use((req, res, next) => {
// 	res.render('maintenance.hbs');
// });

// setting up files to express
app.use(express.static(__dirname + '/public'));

// registering functions to be used on the .hbs files
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Hey there'
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs',  {
		pageTitle: 'About page'
	});
});


app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Something went bad'
	});
});

app.listen(3000, () => {
	console.log('Server is up on port 3000');
});