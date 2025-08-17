
import React from 'react';
import { Rotation } from '../types';

interface RotationControlsProps {
  rotation: Rotation;
  onRotationChange: (newRotation: Partial<Rotation>) => void;
}

const Slider: React.FC<{
    label: string;
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, value, onChange}) => (
    <div className="flex flex-col">
        <div className="flex justify-between items-center mb-1">
            <label className="font-medium text-sm text-gray-300">{label} Axis</label>
            <span className="text-sm font-mono bg-gray-700 text-brand-light px-2 py-1 rounded">
                {value.toFixed(0)}°
            </span>
        </div>
        <input
            type="range"
            min="-180"
            max="180"
            value={value}
            onChange={onChange}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
    </div>
);


const RotationControls: React.FC<RotationControlsProps> = ({ rotation, onRotationChange }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-center text-brand-secondary border-b-2 border-gray-700 pb-2">Rotation Controls</h2>
      <Slider 
        label="X" 
        value={rotation.x} 
        onChange={(e) => onRotationChange({ x: parseFloat(e.target.value) })}
      />
      <Slider 
        label="Y" 
        value={rotation.y} 
        onChange={(e) => onRotationChange({ y: parseFloat(e.target.value) })}
      />
      <Slider 
        label="Z" 
        value={rotation.z} 
        onChange={(e) => onRotationChange({ z: parseFloat(e.target.value) })}
      />
    </div>
  );
};

export default RotationControls;
