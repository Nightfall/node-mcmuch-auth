"use strict";

var util = require('util'),
	Strategy = require('passport-strategy');

var mcAuth = require('./auth');

function MCMUCHStrategy(verify) {
	if (!verify) throw new Error('The MCMUCH strategy requires a verify function');
	Strategy.call(this);
	this.name = 'mcmuch-auth';
	this._verify = verify;
}

util.inherits(MCMUCHStrategy, Strategy);

MCMUCHStrategy.prototype.authenticate = function(req, options) {
	var self = this;
	
	// TODO: get data from JSON body?
	// Get the username
	var username = req.query.name;
	// Get the server ID
	var serverHash = req.query.hash;
	
	console.log(username, serverHash)
	
	if (!username || !serverHash) {
		return self.fail({ message: 'Missing username or server hash' }, 400);
	}
	
	// Authenticate the user
	mcAuth.verifyUser(username, serverHash, function(err, success, name, id) {
		console.log(err, success, name, id)
		// If it wasn't a success...
		if (!success)	self.fail({ message: 'Minecraft user has not authorised for MCMUCH'}, 401);
		// If it was a success...
		else {
			self._verify(name, id, done);
		}
	});
}

module.exports = MCMUCHStrategy;
