import React, { useContext, useRef, useState, useCallback, useEffect } from 'react';
import SlideDown from 'react-slidedown';
import Repeater from '../../../@core/components/repeater';
import { DocumentContext } from '../../../utility/context/Document';
import * as PDFJS from 'pdfjs-dist/legacy/build/pdf';
import { decodeFromBase64 } from 'pdf-lib';
import Sign from '../recipientPreview/properties/sign/Sign';
import Initial from '../recipientPreview/properties/Initial';
import Stamp from '../recipientPreview/properties/stamp/Stamp';
import SignedDate from '../recipientPreview/properties/SignedDate';
import Name from '../recipientPreview/properties/Name';
import Email from '../recipientPreview/properties/Email';
import Company from '../recipientPreview/properties/Company';
import Title from '../recipientPreview/properties/Title';
import Text from '../recipientPreview/properties/Text';
import Checkbox from '../recipientPreview/properties/Checkbox';
import Radio from '../recipientPreview/properties/Radio';
import Dropdown from '../recipientPreview/properties/Dropdown';
import Drawing from '../recipientPreview/properties/drawing/Drawing';
import Formula from '../recipientPreview/properties/Formula';
import Attachment from '../recipientPreview/properties/attachment/Attachment';
import Note from '../recipientPreview/properties/Note';
import Approve from '../recipientPreview/properties/Approve';
import Decline from '../recipientPreview/properties/decline/Decline';
import Line from '../recipientPreview/properties/Line';
import MembershipTotalPrice from '../recipientPreview/properties/membership/MembershipTotalPrice';
import MembershipPaymentCount from '../recipientPreview/properties/membership/MembershipPaymentCount';
import MembershipFrequency from '../recipientPreview/properties/membership/MembershipFrequency';
import MembershipDownPayment from '../recipientPreview/properties/membership/MembershipDownPayment';
import MembershipDescription from '../recipientPreview/properties/membership/MembershipDescription';
import MembershipBalance from '../recipientPreview/properties/membership/MembershipBalance';
import MembershipAmount from '../recipientPreview/properties/membership/MembershipAmount';
import MembershipDurationType from '../recipientPreview/properties/membership/MembershipDurationType';
import MembershipDuration from '../recipientPreview/properties/membership/MembershipDuration';
import MembershipType from '../recipientPreview/properties/membership/MembershipType';
import MembershipName from '../recipientPreview/properties/membership/MembershipName';
import MembershipStartDate from '../recipientPreview/properties/membership/MembershipStartDate';
import MembershipEndDate from '../recipientPreview/properties/membership/MembershipEndDate';
import MembershipRegFee from '../recipientPreview/properties/membership/MembershipRegFee';
import MembershipNextPayment from '../recipientPreview/properties/membership/MembershipNextPayment';
import MembershipDue from '../recipientPreview/properties/membership/MembershipDue';
import Street from '../recipientPreview/properties/membership/buyer/Street';
import City from '../recipientPreview/properties/membership/buyer/City';
import State from '../recipientPreview/properties/membership/buyer/State';
import Country from '../recipientPreview/properties/membership/buyer/Country';
import Gender from '../recipientPreview/properties/membership/buyer/Gender';
import Dob from '../recipientPreview/properties/membership/buyer/Dob';
import PrimaryContact from '../recipientPreview/properties/membership/buyer/PrimaryContact';
import SecondaryContact from '../recipientPreview/properties/membership/buyer/SecondaryContact';
import { Button } from 'reactstrap';
import { editDoc } from '../../../requests/documents/create-doc';
import { toast } from 'react-toastify';
PDFJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.min.js`;

export default function DocumentPreviewModule({ recipient, userMembership }) {
  const [pageCnt, setPageCnt] = useState(0);
  const [pdfFile, setPdfFile] = useState();
  const [membership, setMembership] = useState(null);
  const [boardDimention, setBoardDimention] = useState({ x: 0, y: 0 });
  const [isDone, setIsDone] = useState(false);
 
  // ** Context
  const {
    board,
    url,
    stamp,
    signature,
    selectedItem,
    setBoard,
    hashcode,
    recipients,
    setRecipients
  } = useContext(DocumentContext);

  const canvasRef = useRef([]);

  const handleFinish = async () => {
    const thisBoard = board.filter((b) => b.recipient.hashCode === hashcode);
    const shouldBeDone = thisBoard.filter((b) => b.required === true);

    const isDone = thisBoard.filter((x) => x.isDone === true);
    if (shouldBeDone.length === isDone.length) {
      //update recipients where is finished
      let recipientsTemp = recipients;
      recipientsTemp.map((rec) => {
        if (rec.hashCode === hashcode) {
          rec.isDone = true;
        }
        return rec;
      });

      let boardTemp = board;

      boardTemp.map((b) => {
        let temp = b;

        if (temp.recipient.hashCode === hashcode && temp.isDone) {
          temp.recipient.isDone = true;
        }
        return temp;
      });
      const allIsDone = recipientsTemp.every((x) => x.isDone === true);
      //save -- update recipient board
      const payload = {
        recipients: recipientsTemp,
        properties: boardTemp,
        isDone: allIsDone
      };
      editDoc(url.documentId, payload, false).then(
        (res) => {
          if (res.success) {
            setIsDone(true);
            setBoard(res.data.properties);
            setRecipients(res.data.recipients);
            //window.open(`/document/email-link/${hashcode}`);
          }
        }
      );
    } else {
      //not all is done
      toast.error('Please fill all the required fields before submitting!');
    }
  };

  const handleDownload = () => {};

  const renderPages = useCallback(async () => {
    if (pdfFile != null && pageCnt > 0) {
      for (let index = 0; index < pageCnt; index++) {
        const page = await pdfFile.getPage(index + 1);
        const viewport = page.getViewport({ scale: 1.5 });
        //const canvas = document.createElement('canvas')
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

  useEffect(() => {
    let temp = [];

    if (selectedItem.type === 'sign' && signature.initials) {
      //when initial & signature selected together
      for (const b of board) {
        let i = b;
        if (i.type === 'sign' && i.recipient.hashCode === recipient.hashCode) {
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
        } else if (i.type === 'initial' && i.recipient.hashCode === recipient.hashCode) {
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
        if (i.type === 'stamp' && i.recipient.hashCode === recipient.hashCode) {
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
          if (i.type === 'initial' && i.recipient.hashCode === recipient.hashCode) {
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
          } else if (i.type === 'sign' && i.recipient.hashCode === recipient.hashCode) {
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
          if (i.type === 'initial' && i.recipient.hashCode === recipient.hashCode) {
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

    if (temp.length > 0) {
      setBoard(temp);
    }
  }, [signature, stamp]);

  useEffect(() => {
    const loadingTask = PDFJS.getDocument(url.url);
    loadingTask.promise.then((loadedPdf) => {
      setPdfFile(loadedPdf);
      setPageCnt(loadedPdf.numPages);
    });
    if (userMembership) {
      setMembership(userMembership);
    }
  }, []);
  //render page on canvas
  useEffect(() => {
    if (pdfFile != null && pageCnt > 0) {
      renderPages();
    }
  }, [pageCnt, canvasRef]);

  return (
    <div>
      <div>
        {isDone === false ? (
          <div>
            <Button color="primary" className="me-2" onClick={handleFinish}>
              Finish
            </Button>
          </div>
        ) : (
          <div>
            {/* <Button color="primary" className="me-2" onClick={handleDownload}>
              Download
            </Button> */}
          </div>
        )}
      </div>
      <div className="d-flex justify-content-center">
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
                  {board
                    .filter((x) => x.page === i + 1 && x.recipient.email === recipient.email)
                    .map((item, idx) => {
                      switch (item?.type) {
                        case 'sign':
                          return <Sign key={idx} item={item} recipient={recipient} />;
                        case 'initial':
                          return <Initial key={idx} item={item} />;
                        case 'stamp':
                          return <Stamp key={idx} item={item} />;
                        case 'signDate':
                          return <SignedDate key={idx} item={item} />;

                        case 'name':
                          return <Name key={idx} item={item} />;
                        case 'email':
                          return <Email key={idx} item={item} />;
                        case 'company':
                          return <Company key={idx} item={item} />;
                        case 'title':
                          return <Title key={idx} item={item} />;
                        case 'text':
                          return <Text key={idx} item={item} />;
                        case 'checkbox':
                          return <Checkbox key={idx} item={item} />;
                        case 'radio':
                          return <Radio key={idx} item={item} />;
                        case 'dropdown':
                          return <Dropdown key={idx} item={item} />;
                        case 'drawing':
                          return <Drawing key={idx} item={item} />;
                        case 'formula':
                          return <Formula key={idx} item={item} />;
                        case 'attachment':
                          return <Attachment key={idx} item={item} />;
                        case 'note':
                          return <Note key={idx} item={item} />;
                        case 'approve':
                          return <Approve key={idx} item={item} />;
                        case 'decline':
                          return <Decline key={idx} item={item} />;
                        case 'line':
                          return <Line key={idx} item={item} />;
                        case 'membershipName':
                          return <MembershipName key={idx} item={item} membership={membership} />;
                        case 'membershipType':
                          return <MembershipType key={idx} item={item} membership={membership} />;
                        case 'membershipDuration':
                          return (
                            <MembershipDuration key={idx} item={item} membership={membership} />
                          );
                        case 'membershipDurationType':
                          return (
                            <MembershipDurationType key={idx} item={item} membership={membership} />
                          );
                        case 'membershipAmount':
                          return <MembershipAmount key={idx} item={item} membership={membership} />;
                        case 'membershipBalance':
                          return (
                            <MembershipBalance key={idx} item={item} membership={membership} />
                          );
                        case 'membershipDesc':
                          return (
                            <MembershipDescription key={idx} item={item} membership={membership} />
                          );
                        case 'membershipDownpay':
                          return (
                            <MembershipDownPayment key={idx} item={item} membership={membership} />
                          );
                        case 'membershipFreequency':
                          return (
                            <MembershipFrequency key={idx} item={item} membership={membership} />
                          );
                        case 'membershipPaymentCount':
                          return (
                            <MembershipPaymentCount key={idx} item={item} membership={membership} />
                          );
                        case 'membershipTotal':
                          return (
                            <MembershipTotalPrice key={idx} item={item} membership={membership} />
                          );
                        case 'membershipStartDate':
                          return (
                            <MembershipStartDate key={idx} item={item} membership={membership} />
                          );
                        case 'membershipEndDate':
                          return (
                            <MembershipEndDate key={idx} item={item} membership={membership} />
                          );
                        case 'membershipregistrationFee':
                          return <MembershipRegFee key={idx} item={item} membership={membership} />;
                        case 'membershipNextPayment':
                          return (
                            <MembershipNextPayment key={idx} item={item} membership={membership} />
                          );
                        case 'membershipDue':
                          return <MembershipDue key={idx} item={item} membership={membership} />;
                        case 'street':
                          return <Street key={idx} item={item} membership={membership} />;
                        case 'city':
                          return <City key={idx} item={item} membership={membership} />;
                        case 'state':
                          return <State key={idx} item={item} membership={membership} />;
                        case 'country':
                          return <Country key={idx} item={item} membership={membership} />;
                        case 'gender':
                          return <Gender key={idx} item={item} membership={membership} />;
                        case 'dob':
                          return <Dob key={idx} item={item} membership={membership} />;
                        case 'primarycontact':
                          return <PrimaryContact key={idx} item={item} membership={membership} />;
                        case 'secondarycontact':
                          return <SecondaryContact key={idx} item={item} membership={membership} />;
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
  );
}
