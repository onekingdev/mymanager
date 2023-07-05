import React, { useState, useContext, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import { AlignLeft, Check } from 'react-feather';
import { DocumentContext } from '../../../../../utility/context/Document';

export default function NoteBoard({ item, handleDisabled,scale }) {
  // ** Contexts
  const { setOpenProps, setSelectedItem, setUndoList, undoList, isUndoRedo, setIsUndoRedo } =
    useContext(DocumentContext);

  // ** States
  const [state, setState] = useState(item);
  const [defaultPosition, setDefaultPosition] = useState({
    x: item.left,
    y: item.top 
  });

  const drag = useRef();

  const onStart = (e, ui) => {
    handleDisabled();
    setIsUndoRedo(false);
  };
  const onStop = (e, position) => {
    setOpenProps(true);
    setState({ ...item, top: position.y, left: position.x, _type: 'board' });
    handleDisabled();
  };

  useEffect(() => {
    setSelectedItem(state);
    setUndoList([...undoList, state]);
  }, [state]);

  return (
    <Draggable
      bounds="parent"
      defaultPosition={defaultPosition}
      id={item.id}
      onStop={onStop}
      position={isUndoRedo ? { x: item.left, y: item.top }:{ x: state.left, y: state.top }}
      ref={drag}
      onStart={onStart}
      onDrag={() => setOpenProps(true)}
      scale={scale}
    >
      <div className="box" style={{ width: '150px',position:"absolute"  }}>
        <div
          className=" border border-dark text-start"
          style={{
            backgroundColor: item.recipient.color,
            color: item.fontColor,
            fontFamily: item.font,
            fontSize: `${item.fontSize}px`,
            fontStyle: item.italic ? 'italic' : 'normal',
            fontWeight: item.bold ? 'bold' : 'normal',
            textDecoration: item.underline ? 'underline' : 'normal',
            transform: `scale(${item.formatting / 100})`,
            width: '150px',
            height: '80px'
          }}
        >
          <AlignLeft /> {item?.addText? item.addText : 'Note'}
        </div>
      </div>
    </Draggable>
  );
}
