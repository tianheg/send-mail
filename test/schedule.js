"use strict";
const at = require("run-at")

const hello = () => {
	console.log("HEllo!")
}

at("10 seconds from now", hello)
