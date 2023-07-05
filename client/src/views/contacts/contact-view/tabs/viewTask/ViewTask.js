import React, { useContext, useEffect, useState } from 'react';
import {
  Badge,
  Button,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  UncontrolledButtonDropdown
} from 'reactstrap';
import DocViewer from './DocViewer';
import { isMobile } from 'react-device-detect';

import { X } from 'react-feather';

import { DocumentContext } from '../../../../../utility/context/Document';
import { getUserData } from '../../../../../auth/utils';
import { mergeAllFiles } from '../../../../documents/helpers/loadPdfHelper';
import { useUploadSignature } from '../../../../../requests/documents/recipient-doc';
import { useDispatch } from 'react-redux';
import {
  updateTaskByEmployeeAction,
  updateTaskByUserAction
} from '../../../../settings/tabs/rolesandper/store/employee/action';
import UploadDoc from './UploadDoc';

import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import FileSaver from 'file-saver';

const statusColors = {
  pending: { title: 'Pending', color: 'light-info' },
  declined: { title: 'Denied', color: 'light-danger' },
  remind: { title: 'Remind', color: 'light-primary' },
  approved: { title: 'Completed', color: 'light-success' },
  archived: { title: 'Archived', color: 'light-secondary' }
};

export default function ViewTask({ open, toggle, empTask }) {
  const { board, zoom, setZoom } = useContext(DocumentContext);
  const [attachments, setAttachments] = useState([]);
  const [boardDimention, setBoardDimention] = useState({ x: 0, y: 0 });
  const dispatch = useDispatch();
  // const [taskState, setTaskState] = useState(task);
  // const {setBoard,setRecipients,setHashcode} = useContext(DocumentContext)
  // const handleSave = ()=>{
  //   console.log("save",store.selectedTask)
  //   dispatch(updateTaskByUserAction(store.selectedTask._id,store.selectedTask))
  // }

  const handleSave = async () => {
    let boardTemp = board;
    if (attachments.length > 0) {
      const mergedFile = await mergeAllFiles(attachments[0].files);
      const formData = new FormData();
      formData.append('file', mergedFile);
      const data = await useUploadSignature(formData);

      if (data.success === true) {
        if (empTask.type === 'form') {
          boardTemp.map((b) => {
            let temp = b;
            if (temp.id === attachments[0].id && temp.type === 'attachment') {
              temp.list = [];
              temp.list.push(data.url);
            }
            return temp;
          });
        } else {
          //add to specific task
          empTask.properties.push({
            documentUrl: data.url
          });
        }

        const { userId, email, fullName } = getUserData();

        if (userId === empTask.originTask.userId) {
          //set approved
          const payload = {
            properties: boardTemp,
            history: [...empTask.history, { by: 'employer', status: 'approved', note: '' }],
            status: 'approved'
          };
          dispatch(updateTaskByUserAction(empTask._id, payload));
        } else {
          //employee
          //set pending
          const payload = {
            properties: boardTemp,
            history: [...empTask.history, { by: 'employee', status: 'pending', note: '' }],
            status: 'pending'
          };
          dispatch(updateTaskByEmployeeAction(empTask._id, payload));
        }
      }
    } else {
      const { userId, email, fullName } = getUserData();

      if (userId === empTask.originTask.userId) {
        //set approved
        const payload = {
          properties: board,
          history: [...empTask.history, { by: 'employer', status: 'approved', note: '' }],
          status: 'approved'
        };
        dispatch(updateTaskByUserAction(empTask._id, payload));
      } else {
        //employee
        //set pending
        const payload = {
          properties: board,
          history: [...empTask.history, { by: 'employee', status: 'pending', note: '' }],
          status: 'pending'
        };
        dispatch(updateTaskByEmployeeAction(empTask._id, payload));
      }
    }
  };
  const handleDownload = async () => {
    var elementHTML = document.querySelector('#pageContainer');
    const prevZoom = zoom;
    if (prevZoom != 1) {
      setZoom(1);
    }
    const doc = new jsPDF('p', 'px', [boardDimention.x + 1, boardDimention.y + 1]);
    doc.html(elementHTML, {
      callback: function (doc) {
        doc.save(`${empTask.originTask[0].title}.pdf`);
        setZoom(prevZoom);
      }
    });
    const attachments = board.filter((x) => x.type === 'attachment');
    if (attachments.length > 0) {
      attachments.map((x) => {
        if (x.isDone === true) {
          FileSaver.saveAs(
            x.list[0],
            `attachment-${empTask.originTask[0].title}-${x.recipient.name}.pdf`
          );
        }
      });
    }
  };

  return (
    <>
      {empTask && empTask.originTask && (
        <Modal
          isOpen={open}
          toggle={toggle}
          fullscreen={empTask?.originTask[0]?.type === 'form'}
          size="lg"
        >
          <div className="bg-light" id="modalHeader">
            <div className="container-fluid">
              <Row>
                <Col md="8">
                  <div className="d-flex justify-content-start">
                    <Button onClick={toggle} color="link" className="p-0">
                      <X />
                    </Button>
                    <div className="p-1">
                      <div>
                        <span className="pe-1">Task: {empTask?.originTask[0]?.title}</span>
                        <Badge color={`${statusColors[empTask?.status]?.color}`}>
                          {statusColors[empTask?.status]?.title}
                        </Badge>
                      </div>
                      <Label className="text-secondary">
                        {empTask?.originTask[0]?.description}
                      </Label>
                    </div>
                  </div>
                </Col>

                <Col md="4" className="my-auto text-end">
                  <Button color="primary" className="me-1" onClick={handleSave}>
                    Save
                  </Button>
                  <Button color="primary" onClick={handleDownload}>
                    Download
                  </Button>
                </Col>
              </Row>
            </div>
          </div>

          <ModalBody>
            {empTask?.originTask[0]?.type === 'form' ? (
              <DocViewer
                task={empTask}
                attachments={attachments}
                setAttachments={setAttachments}
                boardDimention={boardDimention}
                setBoardDimention={setBoardDimention}
              />
            ) : (
              <UploadDoc attachments={attachments} setAttachments={setAttachments} />
            )}
          </ModalBody>
        </Modal>
      )}
    </>
  );
}
