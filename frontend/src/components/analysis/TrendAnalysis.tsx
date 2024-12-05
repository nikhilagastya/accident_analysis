import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const generateMockData = (startYear: number, endYear: number) => {
  const data = [];
  for (let year = startYear; year <= endYear; year++) {
    data.push({
      year,
      '2-Wheeler': Math.floor(Math.random() * 100),
      '4-Wheeler': Math.floor(Math.random() * 150),
      'Heavy Vehicle': Math.floor(Math.random() * 80),
    });
  }
  return data;
};

export const TrendAnalysis: React.FC = () => {
  const [yearRange, setYearRange] = useState({ start: 2020, end: 2024 });
  const [data, setData] = useState(generateMockData(2020, 2024));

  const handleAnalyze = () => {
    setData(generateMockData(yearRange.start, yearRange.end));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Start Year
          </label>
          <input
            type="number"
            className="w-full bg-gray-700 text-white rounded p-2"
            value={yearRange.start}
            onChange={(e) => setYearRange({ ...yearRange, start: Number(e.target.value) })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            End Year
          </label>
          <input
            type="number"
            className="w-full bg-gray-700 text-white rounded p-2"
            value={yearRange.end}
            onChange={(e) => setYearRange({ ...yearRange, end: Number(e.target.value) })}
          />
        </div>
      </div>

      <button
        onClick={handleAnalyze}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Analyze
      </button>

      <div className="mt-4 bg-gray-700 p-4 rounded">
        <LineChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="year" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
          <Legend />
          <Line type="monotone" dataKey="2-Wheeler" stroke="#3B82F6" />
          <Line type="monotone" dataKey="4-Wheeler" stroke="#10B981" />
          <Line type="monotone" dataKey="Heavy Vehicle" stroke="#F59E0B" />
        </LineChart>
      </div>
    </div>
  );
};
