import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import type { EnvironmentalImpact } from '../../types';

const ENVIRONMENTAL_CONDITIONS = [
  'pavement slippery',
  'glare',
  'obstruction/debris',
  'pavement defective',
  'view obstructed',
  'outside car distraction'
];

// const mockGetEnvironmentalData = (condition: string): EnvironmentalImpact => ({
//   condition,
//   accidentCount: Math.floor(Math.random() * 100),
//   deaths: Math.floor(Math.random() * 50),
//   injuries: Math.floor(Math.random() * 200)
// });



export const EnvironmentalAnalysis: React.FC = () => {
  const [selectedCondition, setSelectedCondition] = useState<string>('');
  const [data, setData] = useState<EnvironmentalImpact | null>(null);
  
  const handleAnalyze =async() => {
    if (selectedCondition) {
      const result = await fetchEnvironmentalData(selectedCondition);
      setData(result);
    }
  };
  const fetchEnvironmentalData = async (condition: string): Promise<EnvironmentalImpact> => {
    const response = await fetch('http://localhost:5000/api/env_factors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ condition }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
  
    return await response.json();
  };
  
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Environmental Condition
        </label>
        <select
          className="w-full bg-gray-700 text-white rounded p-2"
          value={selectedCondition}
          onChange={(e) => setSelectedCondition(e.target.value)}
        >
          <option value="">Select condition</option>
          {ENVIRONMENTAL_CONDITIONS.map((condition) => (
            <option key={condition} value={condition}>
              {condition}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleAnalyze}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        disabled={!selectedCondition}
      >
        Analyze
      </button>

      {data && (
        <div className="mt-4 bg-gray-700 p-4 rounded">
          <h3 className="text-lg font-semibold text-white mb-3">Analysis Results</h3>
          <div className="space-y-2">
            {/* <p className="text-gray-300">
              Accident Count: <span className="text-white">{data.accidentCount}</span>
            </p> */}
            <p className="text-gray-300">
              Deaths: <span className="text-red-400">{data.deaths}</span>
            </p>
            <p className="text-gray-300">
              Injuries: <span className="text-yellow-400">{data.injuries}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};