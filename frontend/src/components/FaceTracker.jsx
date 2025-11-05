import React, { useRef, useState } from 'react';
import { useGazeTracking } from '../hooks/useGazeTracking';
import './FaceTracker.css';

/**
 * FaceTracker Component
 * Displays a face that follows mouse/touch movement
 */
export default function FaceTracker({ 
  className = '', 
  basePath = '/faces/',
  showDebug = false 
}) {
  const containerRef = useRef(null);
  const { currentImage, error } = useGazeTracking(containerRef, basePath);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Track mouse position for debug display (only if debug is enabled)
  React.useEffect(() => {
    if (!showDebug) return;
    
    const handleMouseMove = (e) => {
      setMousePos({
        x: e.clientX,
        y: e.clientY
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [showDebug]);

  if (error) {
    return (
      <div className="face-tracker-error">
        Error loading face images: {error.message}
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`face-tracker ${className}`}
    >
      {currentImage ? (
        <img
          src={currentImage}
          alt="Face following gaze"
          className="face-image"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            transition: 'opacity 0.1s ease-out',
            display: 'block'
          }}
          onError={(e) => {
            // Silently handle errors - keep showing previous image
          }}
        />
      ) : (
        <div className="face-loading" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100%',
          color: '#666',
          fontSize: '14px'
        }}>
          Loading face image...
        </div>
      )}
      
      {showDebug && (
        <div className="face-debug">
          <div>Mouse: ({Math.round(mousePos.x)}, {Math.round(mousePos.y)})</div>
          <div>Image: {currentImage?.split('/').pop() || 'none'}</div>
        </div>
      )}
    </div>
  );
}
