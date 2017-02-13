/**
 * http://usejsdoc.org/
 */
var apiai = require("apiai");
var fs = require("fs");
var say = require("say");

var apiaiApp = apiai("c95fccd881194f95a641475e6725a77f");

exports.get = function(req, res){
	res.render('apiai-form');
};

exports.post = function(req, res){
	var enteredText = req.body.entered_text;
	var options = {
    	sessionId: '1'
	};
	var request = apiaiApp.voiceRequest(options);
	request.on('response', function(response) {
    	console.log(response);
    	var speech = response.result.fulfillment.speech;
		res.render('apiai-form', {enteredText: enteredText, apiaiResponse: speech});
		say.speak(speech);
		res.end();
	});
	request.on('error', function(error) {
    	console.log(error);
	});
	
	fs.readFile("hello.wav", function(error, buffer) {
    if (error) {
        console.log(error);
    } else {
        request.write(buffer);
    }
    request.end();
});
	
	
};

