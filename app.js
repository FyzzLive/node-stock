//                                                     Setup for Express and Handle Bars
const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');

//                                                     Setup for Path
const path = require('path');

//                                                     Port To Listen On
const PORT = process.env.PORT || 5000;

//                                                     Set Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//                                                     Set Handlebar Route
app.get('/', function (req, res) {
    res.render('home', {
        stuff: "This is some stuff"

    });
});

//                                                     Set Static folder
app.use(express.static(path.join(__dirname, 'Public')));


app.listen(PORT, () => console.log('Server Started on port: ' + PORT));