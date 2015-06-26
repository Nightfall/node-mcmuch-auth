// This file is for Minecraft authentication code.

// Returns a random hash suitable for the server hash.
function generateHash() {
	
}

// Checks if a user has logged in
function verifyUser(userName, serverHash, callback) {
	
}

// Client requests server for hash
function getHash(callback) {
	callback(generateHash())
}
