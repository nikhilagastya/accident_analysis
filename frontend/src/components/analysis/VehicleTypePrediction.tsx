import React, { useState } from 'react';
import { Car } from 'lucide-react';
import type { Location, VehicleTypeProbability } from '../../types';

export const VehicleTypePrediction: React.FC = () => {
  const [location, setLocation] = useState<Location>({ latitude: 0, longitude: 0 });
  const [predictions, setPredictions] = useState<VehicleTypeProbability[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/predict_vehicle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude: location.latitude,
          longitude: location.longitude,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch predictions');
      }

      const data = await response.json();
      setPredictions(data.predictions);
    } catch (err) {
      setError('An error occurred while predicting vehicle types.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <div className="flex items-center mb-6">
        <Car className="text-blue-500 mr-2" />
        <h2 className="text-xl font-bold text-white">Vehicle Type Prediction</h2>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Latitude"
            className="bg-gray-700 text-white rounded p-2"
            onChange={(e) => setLocation({ ...location, latitude: Number(e.target.value) })}
          />
          <input
            type="number"
            placeholder="Longitude"
            className="bg-gray-700 text-white rounded p-2"
            onChange={(e) => setLocation({ ...location, longitude: Number(e.target.value) })}
          />
        </div>
        <button
          onClick={handlePredict}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Predicting...' : 'Predict'}
        </button>
        {error && <div className="text-red-500 mt-2">{error}</div>}
        {predictions.length > 0 && (
          <div className="mt-4 space-y-3">
            {predictions.map((pred) => (
              <div key={pred.vehicleType} className="bg-gray-700 p-3 rounded">
                <div className="flex justify-between items-center">
                  <span className="text-white">{pred.vehicleType}</span>
                  <span className="text-blue-400">
                    {(pred.probability * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-600 h-2 rounded-full mt-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${pred.probability * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleTypePrediction;
