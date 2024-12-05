import React from 'react';
import { AlertTriangle, Car, Truck, Bike, Calendar, Shield } from 'lucide-react';
import { AnalysisCard } from './AnalysisCard';

export const Dashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnalysisCard
        title="Hotspot Analysis"
        description="Identify accident-prone areas"
        icon={AlertTriangle}
        type="hotspot"
      />
      <AnalysisCard
        title="Vehicle Type Prediction"
        description="Predict accident probability by vehicle type"
        icon={Car}
        type="prediction"
      />
      <AnalysisCard
        title="Seasonal Analysis"
        description="Impact of seasons on accidents"
        icon={Calendar}
        type="seasonal"
      />
      <AnalysisCard
        title="Environmental Factors"
        description="Analysis of environmental conditions"
        icon={Shield}
        type="environmental"
      />
      <AnalysisCard
        title="Vehicle Distribution"
        description="Accidents by vehicle category"
        icon={Truck}
        type="distribution"
      />
      <AnalysisCard
        title="Trend Analysis"
        description="Historical accident trends"
        icon={Bike}
        type="trends"
      />
    </div>
  );
};