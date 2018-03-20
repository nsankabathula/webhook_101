const request = require('request');

const dialogFlowModelDefault = {
    titleTypes: [],
    datePeriod: null,
    profession: [],
    crewFirstName: null,
    crewLastName: null,
    genres: [],
    title: null,
    seasonSequence: null,
    episodeSequence: null,
    metadata: {
        intentName: null
    }
}
/*
* HTTP Cloud Function.
*
* @param {Object} req Cloud Function request context.
* @param {Object} res Cloud Function response context.
*/

exports.helloHttp = function helloHttp(req, res) {

    tempResponse = (req && req.body && req.body.result && req.body.result.parameters && req.body.result.parameters) ? Object.assign(dialogFlowModelDefault, req.body.result.parameters) : Object.assign(dialogFlowModelDefault, {});
    //Default response from the webhook to show it's working
    //console.log('request', req.body);




    tempResponse['metadata'] = (req && req.body && req.body && req.body.result && req.body.result.metadata) ? Object.assign(tempResponse.metadata, req.body.result.metadata) : Object.assign(tempResponse.metadata, {});
    //tempResponse['baseUrl'] = req.baseUrl
    //tempResponse['originalUrl'] = req.originalUrl
    //tempResponse['hostname'] = req.hostname
    //tempResponse['protocol'] = req.protocol
    const logUrl = req.protocol + '://' + req.hostname + '/log/'
    request.post(logUrl,
        {
            json:
                {
                    'request': req.body,
                    'response': tempResponse

                }
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.info(body);
            }
            else {
                console.error(error);
            }

        }
    )
    response = JSON.stringify(tempResponse);
    //console.log('response', response);





    res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
    res.send(JSON.stringify({
        "speech": response, "displayText": response

        //"request": JSON.parse(cJSON.stringify(req))
        //"speech" is the spoken version of the response, "displayText" is the visual version
    }));
};

