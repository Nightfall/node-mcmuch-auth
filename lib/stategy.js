"use strict";

var util = require('util'),
	Strategy = require('passport-strategy');

function MCMUCHStrategy(...) {
	Strategy.call(this);
}

util.inherits(MCMUCHStrategy, Strategy);

MCMUCHStrategy.prototype.authenticate = function(req, options) {
	// TODO: authenticate request
}
