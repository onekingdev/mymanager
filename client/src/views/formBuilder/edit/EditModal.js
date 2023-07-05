import React, { useState } from 'react';

import { Modal } from 'reactstrap';
import MainNav from './MainNav';
import Editor from './Editor';

export default function EditModal({ toggle, open, store, dispatch, step }) {
  const [isBlock, setIsBlock] = useState(false);
  const [isStyle, setIsStyle] = useState(false);
  const [isLayers, setIsLayers] = useState(false);
  const [device, setDevice] = useState('desktop');
  const [editor, setEditor] = useState(null);
  const [blockTitle, setBlockTitle] = useState('');
  const [stylesTitle, setStylesTitle] = useState('');

  const toggleBlocks = (val) => {
    setIsBlock(val);
  };
  const toggleStyles = (val) => {
    setIsStyle(val);
  };
  const toggleLayers = (val) => {
    setIsLayers(val);
  };

  return (
    <>
      <Modal isOpen={open} toggle={toggle} fullscreen scrollable style={{ overflowX: 'hidden' }}>
        <div style={{ paddingTop: '5px', paddingBottom: '5px', backgroundColor: '#2A3A4D' }}>
          <MainNav
            toggle={toggle}
            isOpen={open}
            toggleBlocks={toggleBlocks}
            setDevice={setDevice}
            editor={editor}
            store={store}
            dispatch={dispatch}
            setBlockTitle={setBlockTitle}
            step={step}
          />
        </div>
        <div className="p-0">
          <Editor
            toggleBlocks={toggleBlocks}
            toggleLayers={toggleLayers}
            toggleStyles={toggleStyles}
            editor={editor}
            setEditor={setEditor}
            isBlocks={isBlock}
            isLayers={isLayers}
            isStyles={isStyle}
            store={store}
            dispatch={dispatch}
            device={device}
            setBlockTitle={setBlockTitle}
            blockTitle={blockTitle}
            setStylesTitle={setStylesTitle}
            stylesTitle={stylesTitle}
            step={step}
          />
        </div>
      </Modal>
    </>
  );
}
