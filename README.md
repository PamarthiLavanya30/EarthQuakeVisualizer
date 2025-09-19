# Earthquake Visualizer

A mobile-friendly React app to visualize recent earthquakes worldwide on an interactive map.

## Features

- Fetches real-time earthquake data from USGS all_day feed.
- Displays earthquakes as circle markers on a Leaflet map.
- Marker radius scales with earthquake magnitude.
- Popups show detailed info: place, magnitude, depth, time, and USGS link.
- Sidebar with:
  - Minimum magnitude filter slider.
  - Summary card showing total quakes, largest magnitude, and most recent quake.
- Responsive layout:
  - Desktop: Sidebar left (25%), map right (75%).
  - Mobile: Collapsible sidebar on top, map fills screen.
- Loading and error states.
- Smooth transitions and clean UI using Tailwind CSS.

## Tech Stack

- React (Vite)
- Tailwind CSS
- react-leaflet + leaflet
- dayjs for date formatting

## Setup & Run

1. Clone repo:

   ```bash
   git clone https://github.com/yourusername/earthquake-visualizer.git
   cd earthquake-visualizer