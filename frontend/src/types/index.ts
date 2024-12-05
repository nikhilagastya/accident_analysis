export interface Location {
  latitude: number;
  longitude: number;
  radius?: number;
}

export interface AccidentData {
  id: string;
  date: string;
  location: Location;
  vehicleType: string;
  deaths: number;
  injuries: number;
  environmentalCondition: string;
  contributingFactor: string;
  gender: 'male' | 'female';
}

export interface HotspotAnalysis {
  isHotspot: boolean;
  accidentCount: number;
}

export interface VehicleTypeProbability {
  vehicleType: string;
  probability: number;
}

export interface EnvironmentalImpact {
  condition: string;
  accidentCount: number;
  deaths: number;
  injuries: number;
}