const geocode = async (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYmFyeWRvcyIsImEiOiJjazlxdnE4ZzgwbzQ5M2p0cmp0ejdxMXlwIn0.JuBPijw9PnR5g_ia7XXc9Q&limit=1";

  try {
    const result = await fetch(url);
    const data = await result.json();

    if (!data.feature || data.feature.length === 0) {
      console.error(data);

      return {
        error: "Location not found!",
      };
    }

    return {
      lon: body.features[0].center[1],
      lat: body.features[0].center[0],
      location: body.features[0].place_name,
    };
  } catch (err) {
    console.error(err);
    return {
      error: "Unable to connect to location services!",
    };
  }
};

module.exports = geocode;
