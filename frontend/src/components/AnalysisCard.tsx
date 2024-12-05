import React, { useState } from 'react';
import { LucideIcon } from 'lucide-react';
import { Modal } from './Modal';
import { HotspotAnalyzer } from './analysis/HotspotAnalyzer';
import { VehicleTypePrediction } from './analysis/VehicleTypePrediction';
import { SeasonalAnalysis } from './analysis/SeasonalAnalysis';
import { EnvironmentalAnalysis } from './analysis/EnvironmentalAnalysis';
import { VehicleDistribution } from './analysis/VehicleDistribution';
import { TrendAnalysis } from './analysis/TrendAnalysis';

interface AnalysisCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  type: 'hotspot' | 'prediction' | 'seasonal' | 'environmental' | 'distribution' | 'trends';
}

const getAnalysisComponent = (type: string) => {
  switch (type) {
    case 'hotspot':
      return <HotspotAnalyzer />;
    case 'prediction':
      return <VehicleTypePrediction />;
    case 'seasonal':
      return <SeasonalAnalysis />;
    case 'environmental':
      return <EnvironmentalAnalysis />;
    case 'distribution':
      return <VehicleDistribution />;
    case 'trends':
      return <TrendAnalysis />;
    default:
      return null;
  }
};

export const AnalysisCard: React.FC<AnalysisCardProps> = ({
  title,
  description,
  icon: Icon,
  type,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div 
        className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex items-center mb-4">
          <Icon className="h-8 w-8 text-blue-500 mr-3" />
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        <p className="text-gray-300 mb-4">{description}</p>
        <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
          Analyze →
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
      >
        {getAnalysisComponent(type)}
      </Modal>
    </>
  );
};