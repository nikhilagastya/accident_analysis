import React, { useState } from 'react';
import { Truck } from 'lucide-react';

interface VehicleDistribution {
  type: string;
  count: number;
}

export const VehicleDistribution: React.FC = () => {
  const [location, setLocation] = useState({ lat: 0, lng: 0, radius: 5 });
  const [distribution, setDistribution] = useState<VehicleDistribution[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Mock function to simulate vehicle distribution data
  const mockGetDistribution = (location: { lat: number; lng: number; radius: number }): VehicleDistribution[] => [
    { type: '2-Wheeler', count: Math.floor(Math.random() * 100) },
    { type: '4-Wheeler', count: Math.floor(Math.random() * 200) },
    { type: 'Heavy Vehicle', count: Math.floor(Math.random() * 50) }
  ];

  // Handle analyze button click
  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/vehicle_distribution', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lat: location.lat,
          lng: location.lng,
          radius: location.radius,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch vehicle distribution data');
      }

      const data: VehicleDistribution[] = await response.json();
      setDistribution(data);
    } catch (err) {
      setError( 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Latitude</label>
          <input
            type="number"
            className="w-full bg-gray-700 text-white rounded p-2"
            value={location.lat}
            onChange={(e) => setLocation({ ...location, lat: Number(e.target.value) })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Longitude</label>
          <input
            type="number"
            className="w-full bg-gray-700 text-white rounded p-2"
            value={location.lng}
            onChange={(e) => setLocation({ ...location, lng: Number(e.target.value) })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Radius (km)</label>
          <input
            type="number"
            className="w-full bg-gray-700 text-white rounded p-2"
            value={location.radius}
            onChange={(e) => setLocation({ ...location, radius: Number(e.target.value) })}
          />
        </div>
      </div>

      <button
        onClick={handleAnalyze}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Loading...' : 'Analyze'}
      </button>

      {error && <p className="text-red-500">{error}</p>}

      {distribution.length > 0 && (
        <div className="space-y-4 mt-4">
          {distribution.map((item) => (
            <div key={item.type} className="bg-gray-700 p-4 rounded">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white">{item.type}</span>
                <span className="text-blue-400">{item.count} accidents</span>
              </div>
              <div className="w-full bg-gray-600 h-2 rounded-full">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{
                    width: `${(item.count / Math.max(...distribution.map(d => d.count))) * 100}%`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
