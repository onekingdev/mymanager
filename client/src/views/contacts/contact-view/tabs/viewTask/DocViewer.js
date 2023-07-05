import React, { useContext, useRef, useState, useCallback, useEffect } from 'react';
import SlideDown from 'react-slidedown';
import Repeater from '../../../../../@core/components/repeater';
import { DocumentContext } from '../../../../../utility/context/Document';
import * as PDFJS from 'pdfjs-dist/legacy/build/pdf';

import Sign from './properties/sign/Sign';
import Approve from './../../../../documents/recipientPreview/properties/Approve';
import Decline from './../../../../documents/recipientPreview/properties/decline/Decline';
import Radio from './../../../../documents/recipientPreview/properties/Radio';
import Checkbox from './../../../../documents/recipientPreview/properties/Checkbox';
import SignedDate from './../../../../documents/recipientPreview/properties/SignedDate';
import Name from './../../../../documents/recipientPreview/properties/Name';
import Email from './../../../../documents/recipientPreview/properties/Email';
import Drawing from '../../../../documents/recipientPreview/properties/drawing/Drawing';
import Note from './../../../../documents/recipientPreview/properties/Note';
import Title from './../../../../documents/recipientPreview/properties/Title';
import Company from './../../../../documents/recipientPreview/properties/Company';
import Initial from './properties/Initial';

import Text from './../../../../documents/recipientPreview/properties/Text';
import Stamp from './properties/stamp/Stamp';
import Attachment from './../../../../documents/recipientPreview/properties/attachment/Attachment';
import Dropdown from './../../../../documents/recipientPreview/properties/Dropdown';
import Line from './../../../../documents/recipientPreview/properties/Line';
import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown
} from 'reactstrap';
// import {

//   editDocFromRecipient,
// } from '../../../requests/documents/recipient-doc';

import { isMobile } from 'react-device-detect';

import { getUserData } from '../../../../../auth/utils';

PDFJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.min.js`;

export default function DocViewer({
  task,
  attachments,
  setAttachments,
  boardDimention,
  setBoardDimention
}) {
  const [pageCnt, setPageCnt] = useState(0);
  const [pdfFile, setPdfFile] = useState();

  const [isDone, setIsDone] = useState(false);

  const [zoomOpen, setZoomOpen] = useState(false);
  const [zoom, setZoom] = useState();
  const [isEmployee, setIsEmployee] = useState(true);

  // ** Context
  const {
    board,
    setBoard,
    signature,
    selectedItem,
    stamp,
    setRecipients,
    recipients,
    setHashcode,
    hashcode
  } = useContext(DocumentContext);

  const canvasRef = useRef([]);

  const handleZoomDropdown = () => {
    setZoomOpen(!zoomOpen);
  };

  const handleZoomChange = (val) => {
    if (val === 0) {
      //zoomInstance.smoothZoom(0.5, 0, (isMobile ? 0.4 : 1) / zoom);
      setZoom(isMobile ? 0.4 : 1);
    } else {
      //zoomInstance.smoothZoom(0.5, 0, val / zoom);
      setZoom(val);
    }
  };
  const renderPages = useCallback(async () => {
    if (pdfFile != null && pageCnt > 0) {
      for (let index = 0; index < pageCnt; index++) {
        const page = await pdfFile.getPage(index + 1);
        const viewport = page.getViewport({ scale: 1.5 });
        const temp = canvasRef.current;
        const canvas = temp[index];

        const canvasContext = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        canvas.id = index;
        setBoardDimention({ x: canvas.width, y: canvas.height });

        const renderContext = { canvasContext, viewport };
        page.render(renderContext);
        //parent.current.appendChild(div)
      }
    }
  }, [pageCnt, pdfFile]);

  const handleDecline = () => {
    //if task userId === user.user Id => decline document => change status to declined
  };

  useEffect(() => {
    isMobile ? setZoom(0.4) : setZoom(1);
    const loadingTask = PDFJS.getDocument(task.originTask[0].documentUrl);
    loadingTask.promise.then((loadedPdf) => {
      setPdfFile(loadedPdf);
      setPageCnt(loadedPdf.numPages);

      const { email, userId } = getUserData();

      const props = task.properties.map((x) => {
        let p = x;
        if (userId === task.originTask.userId) {
          //for sender
          return { ...x, recipient: { ...p.recipient, email: email, hashCode: x.id } };
        } else {
          if (x.recipient.id !== 0) {
            return { ...x, recipient: { ...p.recipient, email: email, hashCode: x.id } };
          }
        }
      });
      setHashcode(props.find((x) => x.recipient.id !== 0).recipient.id);
      if (userId === task.originTask.userId) {
        setIsEmployee(false);
        setBoard(props);
      } else {
        const p = props.filter((x) => x.recipient.id !== 0 || x.isDone === true);
        setBoard(p);
      }

      const rec = [
        { ...props.find((x) => x.recipient.id !== 0).recipient },
        { ...props.find((x) => x.recipient.id === 0).recipient }
      ];
      setRecipients(rec);

      // setRecipients(doc.recipients);
    });
  }, []);

  //render page on canvas

  useEffect(() => {
    let temp = [];

    if (selectedItem.type === 'sign' && signature.initials) {
      //when initial & signature selected together
      for (const b of board) {
        let i = b;
        if (i.type === 'sign') {
          //&& i.recipient.id === employee Id
          if (signature.id) {
            i.isDone = true;
            i.signValue = {
              name: signature.fullName,
              path: signature.path
            };
            //i.recipient.isDone=true
          } else {
            i.isDone = false;
            i.signValue = {};
            //i.recipient.isDone=false
          }
        } else if (i.type === 'initial') {
          ////&& i.recipient.id === employee Id
          if (signature.id) {
            i.isDone = true;
            i.signValue = {
              name: signature.initials.initial,
              path: signature.initials.path
            };
            //i.recipient.isDone=true
          } else {
            i.isDone = false;
            i.signValue = {};
            //i.recipient.isDone=false
          }
        }
        temp.push(i);
      }
    } else if (selectedItem.type === 'stamp') {
      for (const b of board) {
        let i = b;
        if (i.type === 'stamp') {
          ////&& i.recipient.id === employee Id
          if (stamp.id) {
            i.isDone = true;
            i.signValue = {
              name: stamp.departmentName,
              path: stamp.path
            };
            //i.recipient.isDone=true
          } else {
            i.isDone = false;
            i.signValue = {};
            //i.recipient.isDone=false
          }
        }
        temp.push(i);
      }
    } else if (selectedItem.type === 'initial') {
      if (signature.path !== '') {
        for (const b of board) {
          let i = b;
          if (i.type === 'initial') {
            //////&& i.recipient.id === employee Id
            if (selectedItem.type === 'initial') {
              if (signature.id) {
                i.isDone = true;
                i.signValue = {
                  name: signature.initials.initial,
                  path: signature.initials.path
                };
                //i.recipient.isDone=true
              } else {
                i.isDone = false;
                i.signValue = {};
                //i.recipient.isDone=false
              }
            } else {
              if (signature.id) {
                i.isDone = true;
                i.signValue = {
                  name: signature.fullName,
                  path: signature.path
                };
                //i.recipient.isDone=true
              } else {
                i.isDone = false;
                i.signValue = {};
                //i.recipient.isDone=false
              }
            }
          } else if (i.type === 'sign') {
            ////&& i.recipient.id === employee Id
            if (signature.id) {
              i.isDone = true;
              i.signValue = {
                name: signature.fullName,
                path: signature.path
              };
              //i.recipient.isDone=true
            } else {
              i.isDone = false;
              i.signValue = {};
              //i.recipient.isDone=false
            }
          }
          temp.push(i);
        }
      } else {
        for (const b of board) {
          let i = b;
          if (i.type === 'initial') {
            /////&& i.recipient.id === employee Id
            if (selectedItem.type === 'initial') {
              if (signature.id) {
                i.isDone = true;
                i.signValue = {
                  name: signature.initials.initial,
                  path: signature.initials.path
                };
                //i.recipient.isDone=true
              } else {
                i.isDone = false;
                i.signValue = {};
                //i.recipient.isDone=false
              }
            } else {
              if (signature.id) {
                i.isDone = true;
                i.signValue = {
                  name: signature.fullName,
                  path: signature.path
                };
                //i.recipient.isDone=true
              } else {
                i.isDone = false;
                i.signValue = {};
                //i.recipient.isDone=false
              }
            }
          }
          temp.push(i);
        }
      }
    }

    setBoard(temp);
  }, [signature, stamp]);
  useEffect(() => {
    if (pdfFile != null && pageCnt > 0 && board.length > 0) {
      renderPages();
    }
  }, [board]);

  return (
    <>
      <div className="container-fluid ">
        <div className="d-flex justify-content-between pt-1">
          {/* zoom out zoom in  */}
          <div>
            <UncontrolledButtonDropdown
              className={`${isMobile ? 'w-100' : ''}`}
              isOpen={zoomOpen}
              toggle={handleZoomDropdown}
              style={{ width: '160px' }}
            >
              <DropdownToggle
                outline
                color="primary"
                caret
                className="w-100"
                style={{ borderRadius: 'none' }}
              >
                {zoom && (zoom === 0 ? 'Fit to window' : `${zoom * 100} %`)}
              </DropdownToggle>
              <DropdownMenu className="w-100">
                <DropdownItem className="w-100" onClick={() => handleZoomChange(0.25)}>
                  25%
                </DropdownItem>
                <DropdownItem className="w-100" onClick={() => handleZoomChange(0.5)}>
                  50%
                </DropdownItem>
                <DropdownItem className="w-100" onClick={() => handleZoomChange(0.75)}>
                  75%
                </DropdownItem>
                <DropdownItem className="w-100" onClick={() => handleZoomChange(1)}>
                  100%
                </DropdownItem>
                <DropdownItem className="w-100" onClick={() => handleZoomChange(1.25)}>
                  125%
                </DropdownItem>
                <DropdownItem className="w-100" onClick={() => handleZoomChange(1.5)}>
                  150%
                </DropdownItem>
                <DropdownItem className="w-100" onClick={() => handleZoomChange(1.75)}>
                  175%
                </DropdownItem>
                <DropdownItem className="w-100" onClick={() => handleZoomChange(2)}>
                  200%
                </DropdownItem>
                <DropdownItem className="w-100" onClick={() => handleZoomChange(0)}>
                  Fit to window
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledButtonDropdown>
          </div>
        </div>
      </div>

      <hr />
      <div>
        <div
          className="container-fluid mx-auto"
          style={{
            width: `${isMobile ? window.innerWidth : boardDimention.x + 50}px`,
            overflow: 'hidden'
          }}
          id="boundDiv"
        >
          <div style={{ overflowX: 'scroll' }}>
            <div id="pageContainer" style={{ transform: `scale(${zoom})`, transformOrigin: '0 0' }}>
              <Repeater count={pageCnt}>
                {(i = 1) => {
                  const Tag = i === 0 ? 'div' : SlideDown;
                  return (
                    <Tag key={i} className="d-flex ">
                      <canvas ref={(ref) => canvasRef.current.push(ref)}></canvas>
                      <div
                        className="Board border-primary mx-0"
                        style={{
                          position: 'absolute',
                          display: 'block',
                          width: `${boardDimention.x}px`,
                          height: `${boardDimention.y}px`
                        }}
                      >
                        {board &&
                          board
                            .filter((x) => x.page === i + 1)
                            .map((item, idx) => {
                              switch (item?.type) {
                                case 'sign':
                                  return <Sign key={idx} item={item} isDone={isDone} />;
                                case 'initial':
                                  return <Initial key={idx} item={item} isDone={isDone} />;
                                case 'stamp':
                                  return <Stamp key={idx} item={item} isDone={isDone} />;
                                case 'signDate':
                                  return <SignedDate key={idx} item={item} />;

                                case 'name':
                                  return <Name key={idx} item={item} />;
                                case 'email':
                                  return <Email key={idx} item={item} />;
                                case 'company':
                                  return <Company key={idx} item={item} isDone={isDone} />;
                                case 'title':
                                  return <Title key={idx} item={item} isDone={isDone} />;
                                case 'text':
                                  return <Text key={idx} item={item} isDone={isDone} />;
                                case 'checkbox':
                                  return <Checkbox key={idx} item={item} isDone={isDone} />;
                                case 'radio':
                                  return <Radio key={idx} item={item} isDone={isDone} />;
                                case 'dropdown':
                                  return <Dropdown key={idx} item={item} isDone={isDone} />;
                                case 'drawing':
                                  return <Drawing key={idx} item={item} isDone={isDone} />;
                                case 'formula':
                                  return <Formula key={idx} item={item} />;
                                case 'attachment':
                                  return (
                                    <Attachment
                                      key={idx}
                                      item={item}
                                      attachments={attachments}
                                      setAttachments={setAttachments}
                                      isDone={isDone}
                                    />
                                  );
                                case 'note':
                                  return <Note key={idx} item={item} />;
                                case 'approve':
                                  return <Approve key={idx} item={item} isDone={isDone} />;
                                case 'decline':
                                  return (
                                    <Decline
                                      key={idx}
                                      item={item}
                                      isDone={isDone}
                                      handleDecline={handleDecline}
                                    />
                                  );
                                case 'line':
                                  return <Line key={idx} item={item} />;
                                default:
                                  return <></>;
                              }
                            })}
                      </div>
                    </Tag>
                  );
                }}
              </Repeater>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
