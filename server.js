const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const port = 8000;
const webHook = require('./src/webhook/index')
//const log = require('./src/log/index')

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

require('./src/routes')(app);

app.get('/test', webHook.helloHttp)
app.post('/', webHook.helloHttp)

app.listen(port, '0.0.0.0', () => console.log('Example app listening on ', port))