var http = require('http');
const PORT = process.env.PORT || 5000;

var express = require('express'),
app = express();


app.set('views', __dirname + '/views');

//app.use(express.static(__dirname + '/week09_ponder'));
app.set('view engine', 'ejs');

//Path for all static files, such as css, auxiliar js etc
//ejs/html pages must point css/js files starting from folder "views"
app.use(express.static('views'))

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


app.use(require('./controllers'));


app.listen(PORT, () => {
  console.log(`Server running on ${PORT}/`);
});
