"use strict";
// This file is for Minecraft authentication code.

var	mcHash	= require('./mcHash'), // Minecraft hashing stuff.
	crypto	= require('crypto'),
	superagent	= require('superagent');

// Returns a random hash suitable for the server hash.
exports.generateHash = function generateHash(callback) {
	// TODO: Could we use crypto.pseudoRandomBytes instead? This isn't really security critical.
	crypto.randomBytes(Math.floor(Math.random() * 100) + 8, function(ex, data) { // Create at least 8 random bytes.
		if (ex) {
			callback(ex);
		} else {
			callback(null, mcHash.hexDigest(crypto.createHash('sha1').update(data).digest()));
		}
	});
}

// Checks if a user has logged in
exports.verifyUser = function verifyUser(userName, serverHash, callback) { // Loosely based on https://github.com/PrismarineJS/node-minecraft-protocol/blob/master/src/yggdrasil.js#L81-L98
	superagent.get("https://sessionserver.mojang.com/session/minecraft/hasJoined" + "?username=" + userName + "&serverId=" + serverHash).end(function(err, res) {
		if (err) callback(err);
		
		// Is everything ok?
		if(!res.ok) {
			var myErr = new Error(response.body.error);
			myErr.errorMessage = response.body.errorMessage;
			myErr.cause = response.body.cause;
			callback(myErr);
		}
		
		// If there is a body and the id exists...
		if (typeof(res.body) !== 'undefined' && res.body != null && 'id' in res.body) { // the user is authorised
			var body = res.body;
			callback(null, true, body.name, body.id);
		} else { // the user is not authorised
			callback(null, false, userName);
		}
	});
}

