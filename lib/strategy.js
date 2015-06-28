"use strict";

var util = require('util'),
	Strategy = require('passport-strategy');

var mcAuth = require('./auth');

function MCMUCHStrategy(verify) {
	if (!verify) throw new Error('MCMUCG authentication strategy requires a verify function');
	Strategy.call(this);
}

util.inherits(MCMUCHStrategy, Strategy);

MCMUCHStrategy.prototype.authenticate = function(req, options) {
	// TODO: authenticate request
}
