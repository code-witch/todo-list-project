const express = require('express');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');


const hostname = 'localhost';
const port = '3000';

const urlEncodedParser = bodyParser.urlencoded({
    extended: true
});

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.get('/', routes.index);
app.post('/', urlEncodedParser, routes.createTask);
app.post('/delete_item/:taskName', urlEncodedParser, routes.deleteItem);

app.listen(port, hostname, () =>{
    console.log(`todo-list running at http://${hostname}:${port}`);
});