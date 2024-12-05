import React from 'react';
import { Car } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Car className="h-6 w-6" />
          <span className="text-xl font-bold">Road Accident Analysis</span>
        </div>
        {/* <div className="flex space-x-4">
          <button className="hover:text-gray-300">Dashboard</button>
          <button className="hover:text-gray-300">Analytics</button>
          <button className="hover:text-gray-300">Data Entry</button>
        </div> */}
      </div>
    </nav>
  );
};