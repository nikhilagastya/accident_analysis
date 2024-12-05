import React, { useState } from 'react';
import { useAccidentStore } from '../store/accidentStore';
import type { AccidentData } from '../types';

export const DataEntry: React.FC = () => {
  const addAccident = useAccidentStore((state) => state.addAccident);
  const [formData, setFormData] = useState<Partial<AccidentData>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      addAccident({
        id: Date.now().toString(),
        ...formData,
      } as AccidentData);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-white">Add New Accident Data</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300">Date</label>
          <input
            type="date"
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
            onChange={(e) =>
              setFormData({ ...formData, date: e.target.value })
            }
          />
        </div>
        {/* Add more form fields for other data points */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};