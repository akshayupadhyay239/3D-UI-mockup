import React from 'react';

interface CameraControlsProps {
  focalLength: number;
  onFocalLengthChange: (newFocalLength: number) => void;
}

const CameraControls: React.FC<CameraControlsProps> = ({ focalLength, onFocalLengthChange }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-center text-slate-900 border-b-2 border-slate-200 pb-2">Camera Controls</h2>
      <div className="flex flex-col">
          <div className="flex justify-between items-center mb-1">
              <label className="font-medium text-sm text-slate-600">Focal Length</label>
              <span className="text-sm font-mono bg-slate-100 text-slate-900 px-2 py-1 rounded">
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
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
          />
      </div>
    </div>
  );
};

export default CameraControls;