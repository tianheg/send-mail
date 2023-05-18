import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config();

const weatherApiKey = process.env.WEATHER_API_KEY;

// docs output: https://openweathermap.org/current#current_JSON
fetch(
  `https://api.caiyunapp.com/v2.5/${weatherApiKey}/115.62203,33.16026/daily?dailysteps=1`
)
  .then((res) => res.json())
  .then((data) => {
    async function main() {
      const user = process.env.SEND;
      const pass = process.env.PASS;
      const to = process.env.TO;

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

      // integer number
      let minTemp = Math.round(data.result.daily.temperature[0].min);
      let maxTemp = Math.round(data.result.daily.temperature[0].max);
      let aveTemp = Math.round(data.result.daily.temperature[0].avg);
      let pm25 = Math.round(data.result.daily.air_quality.pm25[0].max);
      let aqi = Math.round(data.result.daily.air_quality.aqi[0].max.chn);

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: `tianheg <${user}>`,
        to: `域名邮箱 <${to}>`,
        subject: `今日 ${year}-${month}-${day} 测试`,
        text: `今天太和温度区间 ${minTemp}-${maxTemp}℃, 平均气温在 ${aveTemp}℃，空气质量——PM2.5指数 ${pm25}、空气质量指数AQI ${aqi}`,
      });

      console.log(data);
      console.log("Message sent: %s", info.messageId);
    }
    main().catch(console.error);
  });
