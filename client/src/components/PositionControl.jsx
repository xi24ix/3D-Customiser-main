import React from 'react';
import { useSnapshot } from 'valtio';
import state from '../store';

const PositionControl = () => {
  const snap = useSnapshot(state);

  const handlePosition = (direction) => {
    const step = 0.01; // Adjust step size as needed
    switch(direction) {
      case 'up':
        state.logoPosition.y += step;
        break;
      case 'down':
        state.logoPosition.y -= step;
        break;
      case 'left':
        state.logoPosition.x -= step;
        break;
      case 'right':
        state.logoPosition.x += step;
        break;
    }
  };

  const handleSize = (change) => {
    const step = 0.1; // Adjust step size as needed
    state.logoScale += change * step;
    if (state.logoScale < 0.1) state.logoScale = 0.1; // Minimum size
    if (state.logoScale > 2) state.logoScale = 2; // Maximum size
  };

  return (
    <div className="position-controls bg-white p-3 rounded-lg">
      <div className="text-center font-bold mb-2">Position & Size Control</div>
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div></div>
        <button 
          className="p-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => handlePosition('up')}
        >↑</button>
        <div></div>
        
        <button 
          className="p-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => handlePosition('left')}
        >←</button>
        <div className="p-2 bg-gray-100 rounded">●</div>
        <button 
          className="p-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => handlePosition('right')}
        >→</button>
        
        <div></div>
        <button 
          className="p-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => handlePosition('down')}
        >↓</button>
        <div></div>
      </div>
      
      <div className="flex justify-center gap-2 mt-2">
        <button 
          className="p-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => handleSize(-1)}
        >-</button>
        <div className="p-2">Size</div>
        <button 
          className="p-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => handleSize(1)}
        >+</button>
      </div>
    </div>
  );
};

export default PositionControl;
