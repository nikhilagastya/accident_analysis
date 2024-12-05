import React from 'react';
import { MapPin } from 'lucide-react';
import type { Location, HotspotAnalysis } from '../types';

const mockAnalyzeHotspot = (location: Location): HotspotAnalysis => ({
  isHotspot: Math.random() > 0.5,
  accidentCount: Math.floor(Math.random() * 100),
});

export const HotspotAnalyzer: React.FC = () => {
  const [result, setResult] = React.useState<HotspotAnalysis | null>(null);
  const [location, setLocation] = React.useState<Location>({
    latitude: 0,
    longitude: 0,
  });

  const handleAnalyze = () => {
    const analysis = mockAnalyzeHotspot(location);
    setResult(analysis);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <div className="flex items-center mb-4">
        <MapPin className="text-red-500 mr-2" />
        <h2 className="text-xl font-bold text-white">Hotspot Analysis</h2>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Latitude"
            className="bg-gray-700 text-white rounded p-2"
            onChange={(e) =>
              setLocation({ ...location, latitude: Number(e.target.value) })
            }
          />
          <input
            type="number"
            placeholder="Longitude"
            className="bg-gray-700 text-white rounded p-2"
            onChange={(e) =>
              setLocation({ ...location, longitude: Number(e.target.value) })
            }
          />
        </div>
        <button
          onClick={handleAnalyze}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Analyze Location
        </button>
        {result && (
          <div className="mt-4 p-4 bg-gray-700 rounded">
            <p className="text-white">
              Status:{' '}
              <span
                className={result.isHotspot ? 'text-red-500' : 'text-green-500'}
              >
                {result.isHotspot ? 'Hotspot' : 'Safe Zone'}
              </span>
            </p>
            <p className="text-white">
              Accident Count: {result.accidentCount}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};