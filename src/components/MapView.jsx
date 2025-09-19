// src/components/MapView.jsx
import React from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import dayjs from "dayjs";
import "leaflet/dist/leaflet.css";

function getRadius(mag) {
  if (!mag || mag < 0) return 4;
  return Math.min(4 + mag * 6, 40);
}
function getColor(mag) {
  if (mag >= 6) return "#d73027";
  if (mag >= 4) return "#fc8d59";
  if (mag >= 2) return "#fee08b";
  return "#d9ef8b";
}

export default function MapView({ earthquakes }) {
  const center = [20, 0];
  const zoom = 2;

  return (
    <div className="relative h-full w-full">
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} className="h-full w-full">
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {earthquakes.map((q) => (
          <CircleMarker
            key={q.id}
            center={q.coordinates}
            radius={getRadius(q.magnitude)}
            pathOptions={{ color: getColor(q.magnitude), fillOpacity: 0.6 }}
          >
            <Popup>
              <div className="max-w-xs">
                <h3 className="font-bold text-lg mb-1">{q.place}</h3>
                <p><strong>Magnitude:</strong> {q.magnitude.toFixed(1)}</p>
                <p><strong>Depth:</strong> {q.depth} km</p>
                <p><strong>Time:</strong> {dayjs(q.time).format("MMM D, YYYY h:mm A")}</p>
                <p><a href={q.url} target="_blank" rel="noreferrer" className="text-blue-600 underline">USGS Details</a></p>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>

      {/* Legend (bottom-right) with high z-index to stay on top */}
      <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow p-3 text-sm z-[1000]">
        <div className="font-semibold mb-2">Magnitude</div>
        <div className="flex items-center space-x-2"><span style={{backgroundColor:"#d73027"}} className="w-4 h-4 rounded-full inline-block"></span><span>≥ 6.0 (Strong)</span></div>
        <div className="flex items-center space-x-2"><span style={{backgroundColor:"#fc8d59"}} className="w-4 h-4 rounded-full inline-block"></span><span>4.0–5.9 (Moderate)</span></div>
        <div className="flex items-center space-x-2"><span style={{backgroundColor:"#fee08b"}} className="w-4 h-4 rounded-full inline-block"></span><span>2.0–3.9 (Light)</span></div>
        <div className="flex items-center space-x-2"><span style={{backgroundColor:"#d9ef8b"}} className="w-4 h-4 rounded-full inline-block"></span><span>&lt; 2.0 (Minor)</span></div>
      </div>
    </div>
  );
}