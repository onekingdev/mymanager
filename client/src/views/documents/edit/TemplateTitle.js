import React, { useContext, useEffect, useState } from 'react';
import { HelpCircle } from 'react-feather';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button
} from 'reactstrap';
import { DocumentContext } from '../../../utility/context/Document';
import PreviewModal from '../preview/PreviewModal';
import EditRecipients from './menuModals/EditRecipients';
import MessageModal from './menuModals/MessageModal';
import { generateDocCode } from '../helpers/loadPdfHelper';
import { putSendEmail } from '../../../requests/documents/create-doc';
import { useHistory } from 'react-router-dom';

export default function TemplateTitle({ closeToggle }) {
  const [isOpen, setIsOpen] = useState(true);
  const [previewModal, setPreviewModal] = useState(false);
  const [messageModal, setMessageModal] = useState(false);
  const [recipientsModal, setRecipientsModal] = useState(false);

  const {
    url,
    board,
    recipients,
    docMessage,
    setBoardCurrent,
    setSelectedItem,
    setRecipients,
    setUrl,
    setDocumentFiles,
    setDocMessage,
    setCurrentPage,
    setZoom,
    setIsOnlySigner,
    setHashcode,
    setSignatures,
    setStamps,
    setSignatureId,
    setSignature,
    setStamp,
    setCustomFields,
    setRedoList,
    setUndoList,
    setIsUndoRedo,
    setBoard,
    documentTitle,
    setDocumentTitle,
    templateType,
    setTemplateType,
    isTemplate,
    setIsTemplate
  } = useContext(DocumentContext);

  const history = useHistory();
  const toggle = () => setIsOpen(!isOpen);
  const handlePreviewToggle = () => setPreviewModal(!previewModal);
  const handleMessageToggle = () => setMessageModal(!messageModal);
  const handleRecipientsModal = () => setRecipientsModal(!recipientsModal);
  const handleSaveDoc = () => {
    //update db with data
    let boardPayload = [];
    board.map((b) => {
      boardPayload.push({ ...b, icon: null });
    });

    recipients.map((r) => {
      const temp = r;
      if (temp.hashCode === undefined || temp.hashCode === '') {
        temp.hashCode = generateDocCode(url.id, temp.email);
        temp.url = `https://mymanager.com/document/email-link/${temp.hashCode}`;
      }
      return temp;
    });
    putSendEmail(
      url.id,
      {
        documentUrl: url.url,
        mymanagerUrl: `https://mymanager.com/document/preview/`,
        recipients: recipients,
        properties: boardPayload,
        docMessage: docMessage
      },
      false
    );

    //clear context
    setBoardCurrent([]);
    setSelectedItem({});
    setRecipients([]);
    setUrl({});
    setDocumentFiles([]);
    setDocMessage({});
    setCurrentPage(1);
    setZoom(1);
    setIsOnlySigner(false);
    setHashcode();
    setSignatures([]);
    setStamps([]);
    setSignatureId();
    setSignature({});
    setStamp({});
    setCustomFields([]);
    setRedoList([]);
    setUndoList([]);
    setIsUndoRedo(false);
    setBoard([]);
    setDocumentTitle('');
    setIsTemplate(false);
    setTemplateType('');
    closeToggle();
    history.push('/documents');
  };

  return (
    <div>
      <Navbar full="true" expand="md">
        <NavbarText>Template {templateType} | {documentTitle} </NavbarText>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
            
            <NavItem className="me-1">
              <Button color='primary' outline className=" px-2" onClick={handleSaveDoc}>
                Save & Close
              </Button>
            </NavItem>
            <NavItem className="me-1">
              <Button color='primary' className=" px-2" onClick={handlePreviewToggle}>
                Preview
              </Button>
            </NavItem>
         
          </Nav>
        </Collapse>
      </Navbar>
      <PreviewModal toggle={handlePreviewToggle} open={previewModal} />
    
    </div>
  );
}
