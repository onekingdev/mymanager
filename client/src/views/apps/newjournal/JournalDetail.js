import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Button, Col, Container, Form, Input, Label, Row } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { toast } from 'react-toastify';
import { MdDeleteOutline, MdOutlineDeleteOutline } from 'react-icons/md';
import { Edit2, Plus } from 'react-feather';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import {
  createMyJournalById,
  deleteJournalListById,
  getOneJournalListById,
  updateMyJournal,

} from '../../../requests/myJournal/getMyJournal';
import defaultImg from '@src/assets/images/banner/default.png';
import '../../../../src/assets/styles/jaornal.scss';
import { addJournalAction, editJournalAction, getJournalByIdAction } from './store/action';

export default function JournalDetail({
  statusOpen,
  setStatusOpen,
  viewDetailsId,
  setSideBarUpdateData,
  detailsSelectedItem,
  selectedCategory,
  dispatch,
  store
}) {
  const [Upload, setUpload] = useState({});
  const [title, setTitle] = useState('');
  const [journaldata, setJournaldata] = useState({});
  const [desc, setdesc] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const now = new Date();
  const recentHour = now.getTime();
  const createdAt = journaldata?.createdAt;
  const dateObj = new Date(createdAt);
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const amPm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  const formattedTime = `${formattedHours ? formattedHours : recentHour}:${
    formattedMinutes ? formattedMinutes : '00'
  } ${amPm}`;

  useEffect(() => {
    console.log("viewDetailsId",viewDetailsId)
    console.log("detailsSelectedItem",detailsSelectedItem !== null)
    if(viewDetailsId || detailsSelectedItem){
      dispatch(getJournalByIdAction(viewDetailsId ? viewDetailsId : detailsSelectedItem?._id)).then(res=>{
        setJournaldata(res);
        setStatusOpen('open');
      })
    }
   
  }, [viewDetailsId ? viewDetailsId : detailsSelectedItem]);

  useEffect(() => {
     if(journaldata?.desc && statusOpen === 'edit'){
      setEditorState(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(convertFromHTML(journaldata.desc))
        )
      );
    setdesc(journaldata.desc);
    setUpload(journaldata.img);
     }
      
      
  }, [journaldata, statusOpen]);

  const handleCreateJournal = () => {
    setStatusOpen('new');
    setTitle('');
    setEditorState(EditorState.createEmpty());
  };

  const handleEditClick = () => {
    setStatusOpen('edit');
    setTitle(journaldata?.title);
  };

  let date = new Date();
  let mDate = moment(date);
  const handleSubmit = () => {
    // const title = localStorage.getItem('jounaltitle');
    const datas = new FormData();
    datas.append('date', mDate.format('YYYY-MM-DD'));
    datas.append('type', 'Notes');
    datas.append('title', title);
    datas.append('desc', desc);
    datas.append('file', Upload);
    datas.append('journalCategory', selectedCategory);
    if (statusOpen === 'new') {
      dispatch(addJournalAction(datas))
      setEditorState('');
        setUpload({});
        setTitle('');
        setdesc('');
    } else {
      dispatch(editJournalAction(journaldata._id,datas))
    }
  };

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    setdesc(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  const MySwal = withReactContent(Swal);
  const handleDeleteConfirmation = () => {
    MySwal.fire({
      title: 'Delete?',
      text: 'Are you sure you want to delete this journal entry?',
      // icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete anyway',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        deleteJournalListById(journaldata?._id)
          .then(() => {
            setSideBarUpdateData(true);
            toast.error('Journal data deleted successfully!', {
              icon: <MdOutlineDeleteOutline size={18} style={{ color: 'red' }} />
            });
          })
          .catch((error) => {
            console.error('Error deleting journal entry:', error);
          })
          .finally(() => {
            setShowConfirmationModal(false);
          });
      }
    });
  };

  return (
    <div>
      <div className="detail-m customeditordivmain">
        <div className="mm-1 d-flex justify-content-between align-items-center mb-1">
          <span style={{ color: '#000' }}>
            {moment(journaldata?.date).format('MMM-DD-Y')} - {formattedTime}
          </span>
          <div className="right-side">
            <div style={{ marginTop: '5px' }}>
              <Button
                className="waves-effect btn-icon me-1 btn cursor-pointer"
                color="primary"
                outline
                style={{ padding: '5px', marginTop: '0px' }}
                onClick={() => {
                  handleCreateJournal();
                }}
              >
                <Plus size={18} />
              </Button>
              <Button
                className="waves-effect btn-icon me-1 btn cursor-pointer"
                color="primary"
                outline
                style={{ padding: '5px', marginTop: '0px' }}
                onClick={() => {
                  handleEditClick();
                }}
              >
                <Edit2 size={18} />
              </Button>
              <Button
                color="danger"
                outline
                className="waves-effect btn-icon btn cursor-pointer"
                onClick={() => setShowConfirmationModal(true)}
                style={{ padding: '5px' }}
              >
                <MdDeleteOutline size={18} />
              </Button>
            </div>
          </div>
        </div>
        {statusOpen === 'open' && (
          <>
            <div className="detail-view">
              <Row>
                <Col md="12" className="jrnl_image_wrapper">
                  <img
                    src={journaldata?.jrnl_img ? journaldata?.jrnl_img : defaultImg}
                    className="jrnl_img "
                    alt="jrnl_img"
                    width="100%"
                    style={{
                      maxWidth: '100%',
                      height: '250px',
                      objectFit: 'cover',
                      boxShadow: '0px 5px 10px 0px'
                    }}
                  />
                </Col>
                <Col md="12" className="mt-1">
                  <h2>{journaldata?.title}</h2>
                </Col>
                <Col md="12" className="mt-1 mb-2 journal-wrapper-des">
                  <p>{ReactHtmlParser(journaldata?.desc)}</p>
                </Col>
              </Row>
            </div>
          </>
        )}
        {statusOpen === 'edit' && (
          <div className="detail-1 mt-2">
            <h4>Edit Journal</h4>
            <div>
              <Form>
                <Row>
                  <Col md="12">
                    <Label>Journal Title</Label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      type="text"
                      className="form-control mb-1"
                      name="title"
                      placeholder={'Enter Title of Journal'}
                    />
                  </Col>
                  <Col md="12" className=" ">
                    <Label>Select Cover Photo</Label>
                    <Input
                      onChange={(e) => setUpload(e.target.files[0])}
                      name="file"
                      type="file"
                      className="form-control mb-1"
                    />
                  </Col>
                  <Col md="12" className="editor-wrappper">
                    <Label>Enter Data</Label>
                    <Editor
                      editorState={editorState}
                      toolbarClassName="toolbarClassName"
                      wrapperClassName="wrapperClassName"
                      editorClassName="editorClassName"
                      onEditorStateChange={onEditorStateChange}
                      toolbar={{
                        options: [
                          'inline',
                          'blockType',
                          'fontSize',
                          'list',
                          'textAlign',
                          'colorPicker',
                          'emoji',
                          'link',
                          'embedded',
                          'image',
                          'remove',
                          'history'
                        ],
                        inline: {
                          options: [
                            'bold',
                            'italic',
                            'underline',
                            'strikethrough',
                            'monospace',
                            'superscript',
                            'subscript'
                          ]
                        },
                        blockType: {
                          options: [
                            'Normal',
                            'H1',
                            'H2',
                            'H3',
                            'H4',
                            'H5',
                            'H6',
                            'Blockquote',
                            'Code'
                          ]
                        },
                        fontSize: {
                          options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96]
                        },
                        list: {
                          options: ['unordered', 'ordered', 'indent', 'outdent']
                        },
                        textAlign: {
                          options: ['left', 'center', 'right', 'justify']
                        },
                        colorPicker: {
                          colors: [
                            'black',
                            'red',
                            'orange',
                            'yellow',
                            'green',
                            'blue',
                            'indigo',
                            'violet'
                          ]
                        },
                        emoji: {
                          options: ['smile', 'wink', 'laugh', 'thumbsup']
                        },
                        link: {
                          showOpenOptionOnHover: true,
                          defaultTargetOption: '_blank',
                          options: ['link', 'unlink']
                        },
                        embedded: {
                          defaultSize: {
                            height: 'auto',
                            width: 'auto'
                          }
                        },
                        image: {
                          defaultSize: {
                            height: 'auto',
                            width: 'auto'
                          }
                        },
                        remove: {
                          options: ['remove']
                        },
                        history: {
                          options: ['undo', 'redo']
                        }
                      }}
                    />
                  </Col>
                  <Col md="12">
                    <div className="btn-st-r">
                      <Button color="primary" outline onClick={handleSubmit}>
                        Update
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        )}
        {statusOpen === 'new' && (
          <div className="detail-1 mt-2">
            <h4>Create a Journal</h4>
            <div>
              <Form>
                <Row>
                  <Col md="12">
                    <Label>Journal Title</Label>
                    <Input
                      type="text"
                      className="form-control mb-1"
                      name="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter Journal Title"
                    />
                  </Col>
                  <Col md="12" className=" ">
                    <Label>Select Cover Photo</Label>
                    <Input
                      onChange={(e) => setUpload(e.target.files[0])}
                      type="file"
                      className="form-control mb-1"
                      name="file"
                    />
                  </Col>
                  <Col md="12" className="editor-wrappper">
                    <Label>Enter Data</Label>
                    <Editor
                      editorState={editorState}
                      toolbarClassName="toolbarClassName"
                      wrapperClassName="wrapperClassName"
                      editorClassName="editorClassName"
                      onEditorStateChange={onEditorStateChange}
                      toolbar={{
                        options: [
                          'inline',
                          'blockType',
                          'fontSize',
                          'list',
                          'textAlign',
                          'colorPicker',
                          'emoji',
                          'link',
                          'embedded',
                          'image',
                          'remove',
                          'history'
                        ],
                        inline: {
                          options: [
                            'bold',
                            'italic',
                            'underline',
                            'strikethrough',
                            'monospace',
                            'superscript',
                            'subscript'
                          ]
                        },
                        blockType: {
                          options: [
                            'Normal',
                            'H1',
                            'H2',
                            'H3',
                            'H4',
                            'H5',
                            'H6',
                            'Blockquote',
                            'Code'
                          ]
                        },
                        fontSize: {
                          options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96]
                        },
                        list: {
                          options: ['unordered', 'ordered', 'indent', 'outdent']
                        },
                        textAlign: {
                          options: ['left', 'center', 'right', 'justify']
                        },
                        colorPicker: {
                          colors: [
                            'black',
                            'red',
                            'orange',
                            'yellow',
                            'green',
                            'blue',
                            'indigo',
                            'violet'
                          ]
                        },
                        emoji: {
                          options: ['smile', 'wink', 'laugh', 'thumbsup']
                        },
                        link: {
                          showOpenOptionOnHover: true,
                          defaultTargetOption: '_blank',
                          options: ['link', 'unlink']
                        },
                        embedded: {
                          defaultSize: {
                            height: 'auto',
                            width: 'auto'
                          }
                        },
                        image: {
                          defaultSize: {
                            height: 'auto',
                            width: 'auto'
                          }
                        },
                        remove: {
                          options: ['remove']
                        },
                        history: {
                          options: ['undo', 'redo']
                        }
                      }}
                    />
                  </Col>
                  <Col md="12">
                    <div className="btn-st-r">
                      <Button color="primary" outline onClick={handleSubmit}>
                        Save
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        )}
      </div>

      <Modal isOpen={showConfirmationModal} toggle={() => setShowConfirmationModal(false)} centered>
        <ModalHeader>Delete Confirmation</ModalHeader>
        <ModalBody>
          <div className="alert alert-danger p-2">
            {'Are you sure you want to delete this Journal Entry!'}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" outline onClick={() => setShowConfirmationModal(false)}>
            No
          </Button>
          <Button
            color="primary"
            outline
            onClick={() => {
              deleteJournalListById(journaldata?._id);
              setSideBarUpdateData(true);
              toast.error('Journal data deleted successfully!', {
                icon: <MdOutlineDeleteOutline size={18} style={{ color: 'red' }} />
              });
              setShowConfirmationModal(false);
            }}
          >
            Yes
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
