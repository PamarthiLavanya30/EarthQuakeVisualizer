import React from "react";

export default function Legend() {
  const categories = [
    { color: "#d73027", label: "Strong (≥ 6.0)" },
    { color: "#fc8d59", label: "Moderate (4.0 – 5.9)" },
    { color: "#fee08b", label: "Light (2.0 – 3.9)" },
    { color: "#d9ef8b", label: "Minor (< 2.0)" },
  ];

  return (
    <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-md p-4 text-sm">
      <h3 className="font-bold mb-2">Magnitude Legend</h3>
      <ul className="space-y-1">
        {categories.map(({ color, label }) => (
          <li key={label} className="flex items-center space-x-2">
            <span
              className="inline-block w-4 h-4 rounded-full"
              style={{ backgroundColor: color }}
            ></span>
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
