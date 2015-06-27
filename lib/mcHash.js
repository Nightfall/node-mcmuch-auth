"use strict";

// Minecraft Hashing stuff. Code taken from https://gist.github.com/andrewrk/4425843 and https://github.com/zekesonxx/node-yggdrasil/blob/master/lib/index.js#L171-L182

var crypto = require('crypto');
 
exports.hexDigest = function(hash, encoding) {
	if (!(hash instanceof Buffer))
		hash = new Buffer(hash, encoding || 'binary');
	// check for negative hashes
	var negative = hash.readInt8(0) < 0;
	if (negative) performTwosCompliment(hash);
	var digest = hash.toString('hex');
	// trim leading zeroes
	digest = digest.replace(/^0+/g, '');
	if (negative) digest = '-' + digest;
	return digest;
 
}
 
function performTwosCompliment(buffer) {
	var carry = true;
	var i, newByte, value;
	for (i = buffer.length - 1; i >= 0; --i) {
		value = buffer.readUInt8(i);
		newByte = ~value & 0xff;
		if (carry) {
			carry = newByte === 0xff;
			buffer.writeUInt8(newByte + 1, i);
		} else {
			buffer.writeUInt8(newByte, i);
		}
	}
}

