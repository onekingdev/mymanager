import React, { useState, useEffect } from 'react';
import JournalNavbar from './JournalNavbar';
import Editor from '../../formBuilder/edit/Editor';
// ** React Imports
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// ** DATA ACTIONS
import { getFormDataAction, getFormsEntryAction } from '../../formBuilder/store/action';
import { Button, Card, CardBody, Col, Input, InputGroup, InputGroupText, Row } from 'reactstrap';
export default function JournalModal({ store, setTitle, setUpload }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  // ** States
  const [isBlock, setIsBlock] = useState(false);
  const [isStyle, setIsStyle] = useState(false);
  const [isLayers, setIsLayers] = useState(false);
  const [device, setDevice] = useState('desktop');
  const [editor, setEditor] = useState(null);
  const [blockTitle, setBlockTitle] = useState('');
  const [stylesTitle, setStylesTitle] = useState('');

  // ** Handlers
  const toggleBlocks = (val) => {
    setIsBlock(val);
  };
  const toggleStyles = (val) => {
    setIsStyle(val);
  };
  const toggleLayers = (val) => {
    setIsLayers(val);
  };

  useEffect(() => {
    if (store?.form?._id === '') {
      dispatch(getFormDataAction(id));

      dispatch(getFormsEntryAction(id));
    }
  }, [dispatch]);

  return (
    <div>
      <div
        className=""
        style={{
          paddingTop: '5px',
          paddingBottom: '5px',
          backgroundColor: '#f8f8f8'
          // borderColor: '#2A3A4D'
          // border: 1px solid #ebe9f1
        }}
      >
        <JournalNavbar
          // toggle={toggle}
          // isOpen={open}
          toggleBlocks={toggleBlocks}
          // setDevice={setDevice}
          editor={editor}
          store={store}
          dispatch={dispatch}
          setBlockTitle={setBlockTitle}
          // step={step}
        />
      </div>

      <div className="p-0 customeditore">
        <Editor
          className="editorbody"
          setTitle={setTitle}
          setUpload={setUpload}
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
          width="500px"
          // step={step}
        />
      </div>
    </div>
  );
}
