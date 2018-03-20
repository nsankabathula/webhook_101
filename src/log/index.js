var fs = require('fs');
const fileName = __dirname + '/log.json'

writeLog = function writeLog(fileName, body, calllback) {
    var jsonLog = JSON.parse(fs.readFileSync(fileName, 'utf8'));
    jsonLog.push(body)
    fs.writeFile(fileName, JSON.stringify(jsonLog), 'utf8', calllback); // write i
}

exports.getLog = function getLog(req, res) {
    const readLog = JSON.parse(fs.readFileSync(fileName, 'utf8'));
    res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
    res.send(JSON.stringify(readLog));
};
exports.putLog = function putLog(req, res) {
    body = req.body;
    writeLog(fileName, body, () => {
        res.status(200).send({ 'status': 'Log appended.' });
    }); // write it back 

};




exports.testLog = function testLog(req, res) {
    writeLog(fileName, { 'id': 'test' + Date.now().toString() }, () => {
        res.status(200).send({ 'status': 'Log appended.' });
    }); // write it back 

};
exports.writeLog = writeLog;
