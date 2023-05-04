import * as dotenv from 'dotenv';
dotenv.config();

const weatherApiKey = process.env.WEATHER_API_KEY;

fetch(
  `https://api.caiyunapp.com/v2.5/${weatherApiKey}/115.62203,33.16026/daily?dailysteps=1`
)
  .then((res) => res.json())
  .then((data) => {
    console.log(data.result.daily.air_quality.aqi[0].max.chn);
  });
