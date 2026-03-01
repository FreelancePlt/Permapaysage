"use client";

import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import {
  Circle,
  CircleMarker,
  MapContainer,
  TileLayer,
  Tooltip,
  ZoomControl,
  useMap,
} from "react-leaflet";

const VALLET: [number, number] = [47.1611, -1.2644];
const RADIUS_M = 25_000;

function MapConfig() {
  const map = useMap();

  useEffect(() => {
    map.dragging.disable();
    map.keyboard.disable();

    const el = map.getContainer();
    const enableDrag = () => map.dragging.enable();
    const disableDrag = () => map.dragging.disable();

    el.addEventListener("mouseenter", enableDrag);
    el.addEventListener("mouseleave", disableDrag);

    return () => {
      el.removeEventListener("mouseenter", enableDrag);
      el.removeEventListener("mouseleave", disableDrag);
    };
  }, [map]);

  return null;
}

export function InterventionMap() {
  return (
    <MapContainer
      center={VALLET}
      zoom={10}
      scrollWheelZoom={false}
      zoomControl={false}
      minZoom={9}
      maxZoom={13}
      attributionControl={false}
      className="intervention-map h-105 w-full"
      style={{ background: "#F7F3ED" }}
    >
      <MapConfig />
      <ZoomControl position="bottomright" />

      <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />

      <Circle
        center={VALLET}
        radius={RADIUS_M + 1500}
        pathOptions={{
          color: "transparent",
          fillColor: "#8BA87E",
          fillOpacity: 0.06,
        }}
      />

      <Circle
        center={VALLET}
        radius={RADIUS_M}
        pathOptions={{
          color: "#4A7C59",
          fillColor: "#8BA87E",
          fillOpacity: 0.12,
          weight: 2,
          opacity: 0.7,
          dashArray: "8 6",
        }}
      />

      <Circle
        center={VALLET}
        radius={RADIUS_M}
        pathOptions={{
          color: "#4A7C59",
          fillColor: "transparent",
          fillOpacity: 0,
          weight: 1,
          opacity: 0.25,
          dashArray: "2 4",
          dashOffset: "4",
        }}
      />

      <CircleMarker
        center={VALLET}
        radius={6}
        pathOptions={{
          color: "#FEFDFB",
          fillColor: "#4A7C59",
          fillOpacity: 1,
          weight: 2.5,
        }}
      >
        <Tooltip permanent direction="top" offset={[0, -10]}>
          Vallet
        </Tooltip>
      </CircleMarker>
    </MapContainer>
  );
}
