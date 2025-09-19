// src/App.jsx
import React, { useEffect, useState } from "react";
import Controls from "./components/Controls";
import SummaryCard from "./components/SummaryCard";
import MapView from "./components/MapView";

/** Fetch helper - adjust to your utils/usgs import if you have it */
async function fetchEarthquakes() {
  const url =
    "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
  const res = await fetch(url);
  const data = await res.json();
  return data.features.map((f) => ({
    id: f.id,
    magnitude: f.properties.mag ?? 0,
    place: f.properties.place ?? "Unknown",
    time: f.properties.time,
    url: f.properties.url,
    depth: f.geometry?.coordinates?.[2] ?? 0,
    coordinates: [f.geometry.coordinates[1], f.geometry.coordinates[0]],
  }));
}

export default function App() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [minMag, setMinMag] = useState(0);
  const [categoryFilters, setCategoryFilters] = useState({
    strong: true,
    moderate: true,
    light: true,
    minor: true,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchEarthquakes()
      .then((data) => {
        if (!mounted) return;
        setEarthquakes(data);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err.message || "Failed to fetch earthquakes");
      })
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, []);

  // Helper for category visibility
  const categoryVisible = (mag) => {
    if (mag >= 6) return categoryFilters.strong;
    if (mag >= 4) return categoryFilters.moderate;
    if (mag >= 2) return categoryFilters.light;
    return categoryFilters.minor;
  };

  // Final filtered list passed to MapView
  const filteredQuakes = earthquakes.filter(
    (q) => q.magnitude >= minMag && categoryVisible(q.magnitude)
  );

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Enhanced Header */}
      <header className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 text-gray-800 p-5 shadow-sm relative overflow-hidden border-b border-gray-200">
        {/* Subtle seismic waves */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -bottom-10 -left-10 w-40 h-40 border-2 border-blue-100 border-opacity-50 rounded-full animate-pulse"></div>
          <div
            className="absolute -bottom-20 -left-5 w-60 h-60 border-2 border-indigo-100 border-opacity-40 rounded-full animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute -bottom-5 -right-10 w-50 h-50 border-2 border-purple-100 border-opacity-30 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-wide text-gray-800">
            <span className="inline-block transform hover:scale-105 transition-transform duration-300">
              🌍 Global Earthquake Monitor
            </span>
          </h1>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto mb-2">
            Real-time tracking of seismic activity worldwide with interactive visualization
          </p>

          {/* Disclaimer */}
          <div className="text-xs text-gray-500 italic max-w-2xl mx-auto mb-3">
            Note: This visualization displays earthquake data from the last 24 hours only
          </div>

          {/* Stats bar */}
          <div className="flex justify-center mt-4 space-x-4 text-xs md:text-sm">
            <div className="bg-white bg-opacity-70 px-3 py-1 rounded-full border border-gray-200 shadow-sm">
              <span className="font-semibold text-gray-700">Total:</span>{" "}
              <span className="text-blue-600 font-medium">{earthquakes.length}</span>
            </div>
            <div className="bg-white bg-opacity-70 px-3 py-1 rounded-full border border-gray-200 shadow-sm">
              <span className="font-semibold text-gray-700">Max Mag:</span>{" "}
              <span className="text-red-600 font-medium">
                {earthquakes.length
                  ? Math.max(...earthquakes.map((q) => q.magnitude)).toFixed(1)
                  : "0.0"}
              </span>
            </div>
            <div className="bg-white bg-opacity-70 px-3 py-1 rounded-full border border-gray-200 shadow-sm">
              <span className="font-semibold text-gray-700">Updated:</span>{" "}
              <span className="text-green-600 font-medium">Now</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row flex-1">
        {/* Sidebar */}
        <aside
          className="md:w-80 w-full p-4 
          bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 
          overflow-auto border-r border-gray-200"
        >
          <Controls
            minMag={minMag}
            setMinMag={setMinMag}
            categoryFilters={categoryFilters}
            setCategoryFilters={setCategoryFilters}
          />

          <div className="mt-4">
            {loading ? (
              <p className="text-gray-600">Loading data...</p>
            ) : error ? (
              <p className="text-red-600">{error}</p>
            ) : (
              <SummaryCard earthquakes={filteredQuakes} />
            )}
          </div>
        </aside>

        {/* Map area */}
        <main className="flex-1 relative">
          <div className="absolute inset-0">
            <MapView earthquakes={filteredQuakes} />
          </div>
        </main>
      </div>
    </div>
  );
}
