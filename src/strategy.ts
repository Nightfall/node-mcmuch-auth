/// <reference path="../typings/passport-strategy/passport-strategy.d.ts" />
import BaseStrategy = require('passport-strategy');
/// <reference path="../typings/express/express.d.ts" />
import Express = require('express');
/// <reference path="Yggdrasil.ts" />

class MCMUCHStrategy extends BaseStrategy.Strategy {
	constructor() { super(); }
	authenticate(req: Express.Request, options?: any) {
		options = options || {};
	}
}
