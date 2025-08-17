
import React from 'react';

interface ScaleControlProps {
  scale: number;
  onScaleChange: (newScale: number) => void;
}

const ScaleControl: React.FC<ScaleControlProps> = ({ scale, onScaleChange }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-center text-brand-secondary border-b-2 border-gray-700 pb-2">Scale Control</h2>
      <div className="flex flex-col">
          <div className="flex justify-between items-center mb-1">
              <label className="font-medium text-sm text-gray-300">Zoom</label>
              <span className="text-sm font-mono bg-gray-700 text-brand-light px-2 py-1 rounded">
                  {scale.toFixed(2)}x
              </span>
          </div>
          <input
              type="range"
              min="0.1"
              max="3"
              step="0.01"
              value={scale}
              onChange={(e) => onScaleChange(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
      </div>
    </div>
  );
};

export default ScaleControl;
