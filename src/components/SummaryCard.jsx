import React from "react";
import dayjs from "dayjs";

/**
 * SummaryCard component shows:
 * - Total earthquakes
 * - Largest magnitude
 * - Most recent earthquake (place + formatted time)
 *
 * Props:
 * - earthquakes: array of earthquake objects
 */
export default function SummaryCard({ earthquakes }) {
  if (!earthquakes.length) {
    return (
      <div className="p-4 bg-white rounded shadow text-center text-gray-500">
        No earthquakes to display.
      </div>
    );
  }

  const total = earthquakes.length;
  const largestMag = Math.max(...earthquakes.map((q) => q.magnitude));
  const mostRecent = earthquakes.reduce((a, b) =>
    a.time > b.time ? a : b
  );

  return (
    <div className="p-4 bg-white rounded shadow space-y-3">
      <h2 className="text-xl font-bold text-gray-800">Summary</h2>
      <p>
        <span className="font-semibold">Total Earthquakes:</span> {total}
      </p>
      <p>
        <span className="font-semibold">Largest Magnitude:</span>{" "}
        {largestMag.toFixed(1)}
      </p>
      <p>
        <span className="font-semibold">Most Recent:</span> {mostRecent.place}{" "}
        <br />
        <time dateTime={new Date(mostRecent.time).toISOString()}>
          {dayjs(mostRecent.time).format("MMM D, YYYY h:mm A")}
        </time>
      </p>
    </div>
  );
}