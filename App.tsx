
import React, { useState, useRef, useCallback } from 'react';
import ImageCanvas from './components/ImageCanvas';
import RotationControls from './components/RotationControls';
import ImageUploader from './components/ImageUploader';
import ScaleControl from './components/ScaleControl';
import CameraControls from './components/CameraControls';
import { Rotation } from './types';

const App: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [rotation, setRotation] = useState<Rotation>({ x: 0, y: 0, z: 0 });
  const [scale, setScale] = useState<number>(1);
  const [focalLength, setFocalLength] = useState<number>(75);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [resetTrigger, setResetTrigger] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result as string);
      handleReset(); // Reset everything for the new image
    };
    reader.readAsDataURL(file);
  }, []);
  
  const handleRotationChange = useCallback((newRotation: Partial<Rotation>) => {
    setRotation(prev => ({ ...prev, ...newRotation }));
  }, []);

  const handleScaleChange = useCallback((newScale: number) => {
    setScale(newScale);
  }, []);

  const handleFocalLengthChange = useCallback((newFocalLength: number) => {
    setFocalLength(newFocalLength);
  }, []);

  const handleExport = useCallback(() => {
    if (!canvasRef.current) return;
    setIsExporting(true);
    
    // Allow a render cycle for any UI changes
    setTimeout(() => {
        try {
            const dataUrl = canvasRef.current?.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'transformed-image.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Failed to export canvas:", error);
            alert("Could not export image. Your browser might not support this feature or it may be blocked.");
        } finally {
            setIsExporting(false);
        }
    }, 100);

  }, []);

  const handleReset = useCallback(() => {
    setRotation({ x: 0, y: 0, z: 0 });
    setScale(1);
    setFocalLength(75);
    setResetTrigger(c => c + 1); // Trigger camera reset in ImageCanvas
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-6 lg:p-8 font-sans">
      <header className="w-full max-w-7xl text-center mb-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-brand-secondary tracking-tight">3D Image Transformer</h1>
        <p className="text-lg text-gray-400 mt-2">Upload, rotate, scale, and frame your image in 3D, then export your creation.</p>
      </header>

      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8">
        {/* Controls Panel */}
        <aside className="w-full lg:w-1/3 xl:w-1/4 bg-gray-800 rounded-2xl shadow-2xl p-6 flex flex-col gap-6 h-fit">
          <ImageUploader onImageUpload={handleImageUpload} />
          {imageUrl && (
            <>
              <RotationControls rotation={rotation} onRotationChange={handleRotationChange} />
              <ScaleControl scale={scale} onScaleChange={handleScaleChange} />
              <CameraControls focalLength={focalLength} onFocalLengthChange={handleFocalLengthChange} />
              <div className="flex flex-col sm:flex-row sm:gap-4 gap-2">
                <button
                  onClick={handleReset}
                  className="w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
                >
                  Reset All
                </button>
                <button
                  onClick={handleExport}
                  disabled={isExporting}
                  className="w-full bg-brand-primary hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
                >
                  {isExporting ? 'Exporting...' : 'Export as PNG'}
                </button>
              </div>
            </>
          )}
        </aside>

        {/* Canvas Viewer */}
        <main className="w-full lg:w-2/3 xl:w-3/4 aspect-video bg-gray-800 rounded-2xl shadow-2xl overflow-hidden relative">
          {imageUrl ? (
            <ImageCanvas 
              ref={canvasRef} 
              imageUrl={imageUrl} 
              rotation={rotation} 
              scale={scale}
              focalLength={focalLength}
              resetTrigger={resetTrigger}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <p className="mt-2 text-xl">Upload an image to begin</p>
                <p className="text-sm text-gray-600 mt-1">You can drag to rotate the view and scroll to zoom.</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
