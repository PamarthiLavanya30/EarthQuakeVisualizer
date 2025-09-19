/**
 * Fetches earthquake data from USGS all_day feed and transforms it.
 * Returns an array of earthquake objects with:
 * id, magnitude, place, time, depth, url, coordinates [lat, lng]
 */
export async function fetchEarthquakes() {
  const url =
    "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    const data = await res.json();

    // Transform features to simplified quake objects
    const earthquakes = data.features.map((feature) => {
      const {
        id,
        properties: { mag, place, time, url },
        geometry: { coordinates },
      } = feature;

      return {
        id,
        magnitude: mag,
        place,
        time,
        depth: coordinates[2], // depth is third coordinate
        url,
        coordinates: [coordinates[1], coordinates[0]], // [lat, lng] for leaflet
      };
    });

    return earthquakes;
  } catch (error) {
    throw error;
  }
}