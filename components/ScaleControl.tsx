import React from 'react';

interface ScaleControlProps {
  scale: number;
  onScaleChange: (newScale: number) => void;
}

const ScaleControl: React.FC<ScaleControlProps> = ({ scale, onScaleChange }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-center text-slate-900 border-b-2 border-slate-200 pb-2">Scale Control</h2>
      <div className="flex flex-col">
          <div className="flex justify-between items-center mb-1">
              <label className="font-medium text-sm text-slate-600">Zoom</label>
              <span className="text-sm font-mono bg-slate-100 text-slate-900 px-2 py-1 rounded">
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
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
          />
      </div>
    </div>
  );
};

export default ScaleControl;