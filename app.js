// Setup for Express and Handle Bars and Request
const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const reqest = require('request')
const bodyParser = require('body-parser');


// Use bodyParser middleWare
app.use(bodyParser.urlencoded({extended: false}));


// Setup for Path
const path = require('path');

// Port To Listen On
const PORT = process.env.PORT || 5000;


// Create Call API
function call_api(finishedAPI, stock){
    reqest('https://cloud.iexapis.com/stable/stock/'+ stock +'/quote?token=pk_5451527bce9247f9a6a637750bf084b5', { json: true }, (err, res, body) => {
        if (err) {return console.log(err);};
        if (res.statusCode === 200){
            //console.log(body);
            finishedAPI(body);
        };
    });
};



// Set Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Set Handlebar index Get Route
app.get('/', function (req, res) {
    call_api(function(doneAPI) {
        res.render('home', {
            stock: doneAPI
        }); 
    }, "TSLA");
});
app.get('/about', function (req, res) {
    res.render('about', {

    });
});

// Set Handlebar index Post Route
app.post('/', function (req, res) {
    call_api(function(doneAPI) {
        res.render('home', {
            stock: doneAPI
        }); 
    }, req.body.stockTicker);
});


// Set Static folder
app.use(express.static(path.join(__dirname, 'Public')));


app.listen(PORT, () => console.log('Server Started on port: ' + PORT));