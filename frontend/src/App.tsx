import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { DataManagement } from './components/DataManagement';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <main className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 rounded ${
                activeTab === 'dashboard'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('data')}
              className={`px-4 py-2 rounded ${
                activeTab === 'data'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Data Management
            </button>
          </div>
        </div>

        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'data' && <DataManagement />}
      </main>
    </div>
  );
}

export default App;