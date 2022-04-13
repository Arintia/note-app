import React from 'react';
import { useDrag } from 'react-dnd';
import { colors } from '../../util/colors';

function Note({bgColor, text, deleteNote, id}) {
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