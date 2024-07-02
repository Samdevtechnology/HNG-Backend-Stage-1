import axios from "axios";
import dotenv from "dotenv";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config();

const ipinfoToken = process.env.IPINFO_TOKEN;
const openWeatherMapApiKey = process.env.OPENWEATHERMAP_API_KEY;

export const getHello = async (req, res, next) => {
  const { visitor_name: visitorName = "Visitor" } = req.query;
  const ip =
    req.headers["x-forwarded-for"] || req.socket.remoteAddress || req.ip;

  // Remove quotes from visitor_name
  visitorName = visitorName.replace(/['"]+/g, "");

  try {
    // Fetching geolocation data
    const ipinfoResponse = await axios.get(
      `https://ipinfo.io/${ip}?token=${ipinfoToken}`
    );
    const locationData = ipinfoResponse.data;
    const city = locationData.city;

    if (!city) {
      return res.send("City information not available");
    }

    // Fetching weather data (for temperature)
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          q: "lagos",
          appid: openWeatherMapApiKey,
          units: "metric",
        },
      }
    );
    const weatherData = weatherResponse.data;
    const temp = weatherData.main.temp;

    if (req.accepts("html")) {
      res.render("hello", {
        ip,
        visitorName,
        city,
        temp,
      });
    } else {
      res.json({
        client_ip: ip, // The IP address of the requester
        location: `${city}`, // The city of the requester
        greeting: `Hello, ${visitorName}!, the temperature is ${temp} degrees Celsius in ${city}`,
      });
    }
  } catch (error) {
    console.error("Error fetching geolocation or weather data:", error);
    res.status(500).send("Error fetching geolocation or weather data");
  }
};
