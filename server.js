const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;


hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('capitalize', (text) => {
    return text.toUpperCase();
});

app.set('view engine', 'hbs');

app.use((request, response, next) => {
    let now = new Date().toDateString();
    let log = `${now} ${request.method} ${request.url}`;
    console.log(log);
    fs.appendFile(`server.log`, log + '\n', (error) => {
        if (error) console.log(`Unable to append to server.log.`);
    });
    next();
});

// app.use((request, response, next) => {
//     response.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (reqest, response) => {
    response.render('home.hbs', {
        pageTitle: 'Welcome to an hbs page',
        welcomeMessage: 'This is a node express generated site.'
    });
});

app.get('/about', (reqest, response) => {
    response.render('about.hbs', {
        pageTitle: 'About'
    });
});

app.get('/normal', (reqest, response) => {
    response.send('Serving root boy.');
});

app.listen(port, () => {
    console.log(`Serving on port ${port}`);
});