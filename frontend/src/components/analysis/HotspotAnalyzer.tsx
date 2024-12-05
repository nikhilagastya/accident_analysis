import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import type { Location, HotspotAnalysis } from '../../types';

export const HotspotAnalyzer: React.FC = () => {
  const [result, setResult] = useState<HotspotAnalysis | null>(null);
  const [location, setLocation] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);

    try {
      // Make the API call to analyze the hotspot
      const response = await fetch('http://localhost:5000/api/hotspot_finder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(location),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch hotspot data');
      }

      const data: HotspotAnalysis = await response.json();
      setResult(data);
    } catch (err) {
      setError('Error analyzing location');
    } finally {
      setLoading(false);
    }
  };

  return (
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
        disabled={loading}
      >
        {loading ? 'Analyzing...' : 'Analyze Location'}
      </button>
      {error && (
        <div className="mt-4 p-4 bg-red-600 text-white rounded">
          <p>{error}</p>
        </div>
      )}
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
  );
};
