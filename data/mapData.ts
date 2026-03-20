export interface MarkerData {
  markerOffset: number;
  nameKey: string;
  coordinates: [number, number];
  stats: {
    yieldBoost: string;
    farmers: string;
    soilHealthKey: string;
  };
  cropKey: string;
}

export const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export const mapMarkers: MarkerData[] = [
  {
    markerOffset: -30,
    nameKey: "map_maharashtra",
    coordinates: [75.7139, 19.7515],
    stats: {
      yieldBoost: "+28%",
      farmers: "4,500+",
      soilHealthKey: "map_excellent",
    },
    cropKey: "map_maharashtra_crop",
  },
  {
    markerOffset: -30,
    nameKey: "map_punjab",
    coordinates: [75.3412, 31.1471],
    stats: {
      yieldBoost: "+22%",
      farmers: "2,100+",
      soilHealthKey: "map_improving",
    },
    cropKey: "map_punjab_crop",
  },
  {
    markerOffset: 15,
    nameKey: "map_kenya",
    coordinates: [37.9062, -0.0236],
    stats: { yieldBoost: "+35%", farmers: "850+", soilHealthKey: "map_good" },
    cropKey: "map_kenya_crop",
  },
  {
    markerOffset: 15,
    nameKey: "map_vietnam",
    coordinates: [108.2022, 14.0583],
    stats: {
      yieldBoost: "+19%",
      farmers: "1,200+",
      soilHealthKey: "map_good",
    },
    cropKey: "map_vietnam_crop",
  },
];
