import React, { useState } from 'react';

interface SeasonalData {
  killed: number;
  injured: number;
}

export const SeasonalAnalysis: React.FC = () => {
  const [date, setDate] = useState<string>('');
  const [result, setResult] = useState<SeasonalData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFetchData = async () => {
    if (!date) {
      setError('Please enter a valid date');
      return;
    }
  
    setLoading(true);
    setError(null);
  
    try {
      const response = await fetch('http://localhost:5000/api/get_accident_by_date', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date }), // Sending the date in the request body
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch seasonal data');
      }
  
      const data: SeasonalData = await response.json();
      setResult(data);
    } catch (err) {
      setError( 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Enter Date (dd-mm-yyyy)"
          className="bg-gray-700 text-white rounded p-2"
          onChange={(e) => setDate(e.target.value)}
        />
        <button
          onClick={handleFetchData}
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Fetching Data...' : 'Get Seasonal Data'}
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {result && (
        <div className="mt-4 p-4 bg-gray-700 rounded">
          <p className="text-white">Killed: {result.killed}</p>
          <p className="text-white">Injured: {result.injured}</p>
        </div>
      )}
    </div>
  );
};
