"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Circle, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const VALLET_CENTER: [number, number] = [47.1614, -1.2658];
const RADIUS_KM = 25;

const cityCoordinates: { name: string; coords: [number, number] }[] = [
  { name: "Vallet", coords: [47.1614, -1.2658] },
  { name: "Clisson", coords: [47.0872, -1.2818] },
  { name: "Le Loroux-Bottereau", coords: [47.2389, -1.3472] },
  { name: "Haute-Goulaine", coords: [47.2058, -1.4283] },
  { name: "Saint-Julien-de-Concelles", coords: [47.2514, -1.3917] },
  { name: "Vertou", coords: [47.1687, -1.4694] },
  { name: "Gorges", coords: [47.1017, -1.2972] },
  { name: "Le Pallet", coords: [47.1389, -1.3333] },
  { name: "Mouzillon", coords: [47.1417, -1.2833] },
  { name: "La Chapelle-Heulin", coords: [47.1611, -1.3306] },
];

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export function InterventionMap() {
  return (
    <MapContainer
      center={VALLET_CENTER}
      zoom={10}
      scrollWheelZoom={false}
      className="z-0 h-72 w-full rounded-md"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Circle
        center={VALLET_CENTER}
        radius={RADIUS_KM * 1000}
        pathOptions={{
          color: "hsl(108, 22%, 33%)",
          fillColor: "hsl(108, 22%, 33%)",
          fillOpacity: 0.1,
          weight: 2,
        }}
      />
      {cityCoordinates.map((city) => (
        <Marker key={city.name} position={city.coords} icon={markerIcon}>
          <Popup>{city.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
