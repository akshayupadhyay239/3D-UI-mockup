
import React from 'react';

interface CameraControlsProps {
  focalLength: number;
  onFocalLengthChange: (newFocalLength: number) => void;
}

const CameraControls: React.FC<CameraControlsProps> = ({ focalLength, onFocalLengthChange }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-center text-brand-secondary border-b-2 border-gray-700 pb-2">Camera Controls</h2>
      <div className="flex flex-col">
          <div className="flex justify-between items-center mb-1">
              <label className="font-medium text-sm text-gray-300">Focal Length</label>
              <span className="text-sm font-mono bg-gray-700 text-brand-light px-2 py-1 rounded">
                  {focalLength.toFixed(0)}
              </span>
          </div>
          <input
              type="range"
              min="20"
              max="120"
              step="1"
              value={focalLength}
              onChange={(e) => onFocalLengthChange(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
      </div>
    </div>
  );
};

export default CameraControls;
