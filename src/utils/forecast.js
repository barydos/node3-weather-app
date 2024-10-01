const forecast = async (lon, lat) => {
  const url =
    "http://api.weatherstack.com/current?access_key=13492e1c329cf4f06fd6dfca9c9a738c&query=" +
    lon +
    "," +
    lat +
    "&units=m";

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      return {
        error: "Unable to connect to forecast service!",
      };
    }

    const temp = data.current.temperature;
    const tempReal = data.current.feelslike;

    return {
      forecast: `${data.current.weather_descriptions[0]}. It is currently ${temp} degrees out. It feels like ${tempReal} degrees out.`,
    };
  } catch (err) {
    console.error(err);
    return {
      error: "Unable to connect to forecast service!",
    };
  }
};

module.exports = forecast;
