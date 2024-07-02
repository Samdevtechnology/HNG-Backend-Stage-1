import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const ipinfoToken = process.env.IPINFO_TOKEN;
const openWeatherMapApiKey = process.env.OPENWEATHERMAP_API_KEY;

export const getHello = async (req, res, next) => {
  const { visitor_name } = req.query;
  const ip =
    req.headers["x-forwarded-for"] || req.socket.remoteAddress || req.ip;

  const ipinfoResponse = await axios.get(
    `https://ipinfo.io/${ip}?token=${ipinfoToken}`
  );
  const locationData = ipinfoResponse.data;
  console.log("🚀 ~ getHello ~ locationData:", locationData);
  const city = locationData.city;
  console.log("🚀 ~ getHello ~ city:", city);

  res.send(`Your current Ip address is IP address id ${ip}`);

  // try {
  //   // Fetch geolocation data
  //   const ipinfoResponse = await axios.get(
  //     `https://ipinfo.io/${ip}?token=${ipinfoToken}`
  //   );
  //   const locationData = ipinfoResponse.data;
  //   const city = locationData.city;

  //   if (!city) {
  //     return res.send("City information not available");
  //   }

  //   // Fetch weather data
  //   const weatherResponse = await axios.get(
  //     `https://api.openweathermap.org/data/2.5/weather`,
  //     {
  //       params: {
  //         q: "lagos",
  //         appid: openWeatherMapApiKey,
  //         units: "metric",
  //       },
  //     }
  //   );
  //   const weatherData = weatherResponse.data;
  //   const temp = weatherData.main.temp;

  //   res.json({
  //     client_ip: req.ip, // The IP address of the requester
  //     location: `${city}`, // The city of the requester
  //     greeting: `Hello, ${visitor_name}!, the temperature is ${temp} degrees Celsius in ${city}`,
  //   });
  // } catch (error) {
  //   console.error("Error fetching geolocation or weather data:", error);
  //   res.status(500).send("Error fetching geolocation or weather data");
  // }
};
