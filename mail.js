"use strict";
const nodemailer = require("nodemailer");

require('dotenv').config()

async function main() {
	const user = "yidajiabei@qq.com";
	const pass = process.env.PASS;
	const to = "me@tianheg.xyz";

	const time = new Date();
	const year = time.getFullYear();
	const month = time.getMonth() + 1;
	const day = time.getDate();

	let transporter = nodemailer.createTransport({
		host: "smtp.qq.com",
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
			user: user,
			pass: pass,
		},
	});

	// send mail with defined transport object
	let info = await transporter.sendMail({
		from: `tianheg <${user}>`,
		to: `域名邮箱 <${to}>`, // list of receivers
		subject: `今日 ${year}-${month}-${day} 测试`, // Subject line
		text: "", // plain text body
	});

	console.log("Message sent: %s", info.messageId);
	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}

main().catch(console.error);
