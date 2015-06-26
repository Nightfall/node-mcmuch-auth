/// <reference path="../typings/request/request.d.ts" />
import request = require('request');

export class Yggdrasil {
	private authServer:String;

	private call(path:String, data:Object, callback:Function) {
		request({}, () => {})
	}

	public constructor(authServer?: String) {
		this.authServer = authServer || "https://authserver.mojang.com";
	}

}
