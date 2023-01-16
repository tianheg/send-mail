const whois = require("whois");

whois.lookup("baidu.com", function (error, data) {
	console.log(data.slice(0, 936));
});