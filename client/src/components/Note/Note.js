import React from 'react';
import { useDrag } from 'react-dnd';
import { colors } from '../../util/colors';

function Note({bgColor, text, deleteNote, id}) {
  /**
   * useDrag is a hook imported from react-dnd.
   * It's used to implement the dragging functionality.
   * The items we drag are declared as type "note."
   * Item is assigned to an ID.
   * When the dragging operation ends, drop result is retrieved and validated.
   * If the operation is valid, deleteNote function is called. This function is declared in App.js.
   */
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "note",
    item: {id},
    end: (note, monitor) => {
      const dropResult = monitor.getDropResult();
      if(note && dropResult) {
        deleteNote(note);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    })
  }));

  // Style is manipulated through the color state. color state stores the ID of the button that's been selected as the background.
  return (
      <div 
        className="note" 
        style={{background: `${colors[bgColor].bgColor}`, color: `${colors[bgColor].color}`}}
        ref={dragRef}
      >
            {text}
      </div>
  );
}

export default Note;