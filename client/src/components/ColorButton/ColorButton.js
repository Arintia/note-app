import React from 'react';

function ColorButton({bgColor, handleColor, id}) {
  return (
    <button 
        className="color"
        style={{background: `${bgColor}`}}
        onClick={handleColor}
        data-btnid={id}
    >
    </button>
  );
}

export default ColorButton;