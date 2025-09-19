// src/components/Controls.jsx
import React from "react";

export default function Controls({
  minMag,
  setMinMag,
  categoryFilters,
  setCategoryFilters,
}) {
  const toggle = (key) => setCategoryFilters({ ...categoryFilters, [key]: !categoryFilters[key] });

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-bold text-lg mb-2">Filters</h3>

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Minimum Magnitude: <span className="font-semibold">{minMag.toFixed(1)}</span>
        </label>
        <input
          type="range"
          min="0"
          max="10"
          step="0.1"
          value={minMag}
          onChange={(e) => setMinMag(parseFloat(e.target.value))}
          className="w-full accent-blue-600 mb-3"
        />

        <div className="text-sm mb-3">
          <div className="font-medium mb-1">Magnitude categories</div>
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={categoryFilters.strong} onChange={() => toggle("strong")} />
            <span>Strong (≥ 6.0)</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={categoryFilters.moderate} onChange={() => toggle("moderate")} />
            <span>Moderate (4.0 – 5.9)</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={categoryFilters.light} onChange={() => toggle("light")} />
            <span>Light (2.0 – 3.9)</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={categoryFilters.minor} onChange={() => toggle("minor")} />
            <span>Minor (&lt; 2.0)</span>
          </label>
        </div>
      </div>
    </div>
  );
}