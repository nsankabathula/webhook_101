var fs = require('fs');
const fileName = __dirname + '/log.json'

const appendLog = function (fileName, body, calllback) {
    var jsonLog = JSON.parse(fs.readFileSync(fileName, 'utf8'));
    jsonLog.push(body)
    fs.writeFile(fileName, JSON.stringify(jsonLog), 'utf8', calllback); // write i
}

const clearLog = function clear(fileName, calllback) {
    //var jsonLog = JSON.parse(fs.readFileSync(fileName, 'utf8'));
    var jsonLog = [];
    fs.writeFile(fileName, JSON.stringify(jsonLog), 'utf8', calllback); // write i
}


module.exports = function (app) {
    app.get('/log', (req, res) => {
        const readLog = JSON.parse(fs.readFileSync(fileName, 'utf8'));
        res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
        res.send(JSON.stringify(readLog));
    });

    app.post('/log', (req, res) => {
        body = req.body;
        res.setHeader('Content-Type', 'application/json');
        appendLog(fileName, body, () => {
            res.status(200).send({ 'status': 'Log appended.' });
        }); // write it back 

    });

    app.delete('/log', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        clearLog(fileName, () => {
            res.status(200).send({ 'status': 'Log cleared.' });
        }); // write it back 

    });

    app.get('/log/test', (req, res) => {
        appendLog(fileName, { 'id': 'test' + Date.now().toString() }, () => {
            res.status(200).send({ 'status': 'Log appended.' });
        }); // write it back 

    });
}

