import { useState, useEffect, useCallback } from 'react';

// Grid configuration (must match your generation parameters)
const P_MIN = -15;
const P_MAX = 15;
const STEP = 2.0;  // 256 images (16x16 grid) - ultra smooth animation
const SIZE = 256;

/**
 * Converts normalized coordinates [-1, 1] to grid coordinates
 * Snaps to the nearest grid point in the step 2.0 grid: -15, -13, -11, ..., 13, 15
 */
function quantizeToGrid(val) {
  const raw = P_MIN + (val + 1) * (P_MAX - P_MIN) / 2; // [-1,1] -> [-15,15]
  // Snap to nearest grid point: round to nearest step from P_MIN
  const snapped = Math.round((raw - P_MIN) / STEP) * STEP + P_MIN;
  // Clamp to valid range and ensure it's a valid grid value
  return Math.max(P_MIN, Math.min(P_MAX, snapped));
}

/**
 * Converts grid coordinates to filename format
 * Must match Python's sanitize_val function exactly
 * Python: f"{v}".replace("-", "m").replace(".", "p")
 */
function gridToFilename(px, py) {
  const sanitize = (val) => {
    // Python f"{0.0}" gives "0.0", so we need to preserve decimal format
    // Use toFixed to ensure decimal point
    // Python's replace() replaces ALL occurrences, so we use replaceAll
    const str = val.toFixed(1); // This gives "0.0" for 0, "-15.0" for -15
    return str.replaceAll('-', 'm').replaceAll('.', 'p');
  };
  return `gaze_px${sanitize(px)}_py${sanitize(py)}_${SIZE}.webp`;
}

/**
 * Custom hook for gaze tracking
 * @param {React.RefObject} containerRef - Reference to the container element
 * @param {string} basePath - Base path to face images (default: '/faces/')
 * @returns {Object} { currentImage, isLoading, error }
 */
export function useGazeTracking(containerRef, basePath = '/faces/') {
  const [currentImage, setCurrentImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateGaze = useCallback((clientX, clientY) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Convert to normalized coordinates [-1, 1]
    const nx = (clientX - centerX) / (rect.width / 2);
    // Invert Y axis: when cursor goes up (negative relative to center), face should look up
    // So we negate the Y calculation to fix the inversion
    const ny = -(clientY - centerY) / (rect.height / 2);
    
    // Clamp to [-1, 1] range
    const clampedX = Math.max(-1, Math.min(1, nx));
    const clampedY = Math.max(-1, Math.min(1, ny));
    
    // Convert to grid coordinates
    const px = quantizeToGrid(clampedX);
    const py = quantizeToGrid(clampedY);
    
    // Generate filename
    const filename = gridToFilename(px, py);
    const imagePath = `${basePath}${filename}`;
    
    setCurrentImage(imagePath);
  }, [basePath]);

  const handleMouseMove = useCallback((e) => {
    updateGaze(e.clientX, e.clientY);
  }, [updateGaze]);

  const handleTouchMove = useCallback((e) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      updateGaze(touch.clientX, touch.clientY);
    }
  }, [updateGaze]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Add event listeners to document - track cursor anywhere on the page
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Set initial center gaze after a brief delay to ensure container is rendered
    const initTimer = setTimeout(() => {
      const rect = container.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        updateGaze(centerX, centerY);
      }
    }, 100);

    return () => {
      clearTimeout(initTimer);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [handleMouseMove, handleTouchMove, updateGaze]);

  return { currentImage, isLoading, error };
}

export default useGazeTracking;

