// ** React Imports
import { Fragment, useContext, useState, useEffect, useCallback } from 'react';

// ** Third Party Components
import { ArrowLeft, ArrowRight } from 'react-feather';

// ** Reactstrap Imports
import { Label, Row, Col, Form, Input, Button } from 'reactstrap';
import { addRecipients, useAddRecipients, useUploadDocument } from '../../../../requests/documents/create-doc';
import { DocumentContext } from '../../../../utility/context/Document';
import EditDoc from '../../edit/EditDoc';
import { toast } from 'react-toastify';
import { generateDocCode, mergeAllFiles } from '../../helpers/loadPdfHelper';
import { useParams } from 'react-router-dom';
import { getUserData } from '../../../../auth/utils';


const Message = ({ stepper }) => {
  // ** Contexts
  const {
    recipients,
    documentFiles,
    url,
    setUrl,
    docMessage,
    setDocMessage,
    setRecipients,
    isOnlySigner,
    setBoard,
    setBoardCurrent,
    setOpenProps,
    setSelectedItem,
    setDocumentFiles,
    setCurrentPage,
    documentTitle,
    setIsOnlySigner,
    setHashcode,
    setUndoList,
    setRedoList,
    isTemplate,
    setIsTemplate,
    templateType,
    setTemplateType
  } = useContext(DocumentContext);
  // ** States
  const [modal, setModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);


  const {template,type} = useParams();
  const { mutate } = useAddRecipients();

  const handleMessage = (e) => {
    setDocMessage({ ...docMessage, [e.target.name]: e.target.value });
  };

  const handleAddRecipient = () => {
  
    if (documentFiles.length > 0) {
      //upload document to db
      if (documentTitle === '') {
        toast.error('Please povide a title for your document');
      } else {
       
        if (recipients.length > 0) {
          if (isOnlySigner) {
            setBoard([]);
            setUndoList([]);
            setRedoList([]);
            setBoardCurrent([]);
            setOpenProps(false);
            setSelectedItem({});
            setRecipients([]);
            setUrl({});
            setDocumentFiles([]);
            setCurrentPage(1);
            setIsOnlySigner(false);
            setHashcode('');
            setIsUploading(false);
            
            mergeFilesAndAdd();
          } else {
            if(isTemplate===true){
              setBoard([]);
              setUndoList([]);
              setRedoList([]);
              setBoardCurrent([]);
              setOpenProps(false);
              setSelectedItem({});
              setRecipients([]);
              setUrl({});
              setDocumentFiles([]);
              setCurrentPage(1);
              setIsOnlySigner(false);
              setHashcode('');
              setIsUploading(false);
              
              mergeFilesAndAdd();
            }
            else{
              const temp = recipients.some((r) => r.name === '' || r.email === '');

              if (temp) {
                toast.error('Name and email is required for all recipients');
              } else {
                const regex =
                  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                const validEmail = recipients.filter((r) => regex.test(r.email));
                if (validEmail.length === recipients.length) {
                  setBoard([]);
                  setUndoList([]);
                  setRedoList([]);
                  setBoardCurrent([]);
                  setOpenProps(false);
                  setSelectedItem({});
                  setRecipients([]);
                  setUrl({});
                  setDocumentFiles([]);
                  setCurrentPage(1);
                  setIsOnlySigner(false);
                  setHashcode('');
                  setIsUploading(false);
                  setIsTemplate(false);
                  mergeFilesAndAdd();
                } else {
                  toast.error('Email is not valid');
                }
              }
            }
           
          }
        }
      }
    } else {
      toast.error('Please upload document!');
    }
  };
  const toggle = () => setModal(!modal);
  const mergeFilesAndAdd = async () => {
    try {
      setIsUploading(true);
      const mergedDoc = await mergeAllFiles(documentFiles);
      //save mergedDoc
      const formData = new FormData();
      formData.append('file', mergedDoc);
      formData.append('type', 'general');
      const res = await useUploadDocument(formData);
      
      let rec = recipients;
      const reci = rec.map((c) => {
        const code = generateDocCode(res.uploadedDocuments.id, c.email);
        c = {
          ...c,
          hashCode: code,
          url: `https://mymanager.com/document/email-link/${code}`
        };
        return c;
      });
      setRecipients(reci);
      let organization = JSON.parse(localStorage.getItem('organization'));
   
      let data;
      if (recipients.length === 1 && recipients[0].name === '') {
        if(organization!==null){
          data = await addRecipients({
            documentId: res.uploadedDocuments.id,
            documentUrl: res.uploadedDocuments.url,
            mymanagerUrl: `https://mymanager.com/document`,
            recipients: [],
            properties: [],
            docMessage: docMessage,
            title: documentTitle,
            isTemplate:template==='template'?true:false,
            docType:type,
            organizationId: organization._id,
            creatorType: getUserData().userType
          })
      
      if (res?.success) {
        setUrl({...res.uploadedDocuments,id:data.data._id});
      }
        }
        else{
          data = await addRecipients({
            documentId: res.uploadedDocuments.id,
            documentUrl: res.uploadedDocuments.url,
            mymanagerUrl: `https://mymanager.com/document`,
            recipients: [],
            properties: [],
            docMessage: docMessage,
            title: documentTitle,
            isTemplate:template==='template'?true:false,
            docType:type,
            creatorType: getUserData().userType
          })
     
      if (res?.success) {
        setUrl({...res.uploadedDocuments,id:data.data._id});
      }
          //mutate();
        }
        
      } else {
        if(organization!==null){
          data = await addRecipients({
            documentId: res.uploadedDocuments.id,
            documentUrl: res.uploadedDocuments.url,
            mymanagerUrl: `https://mymanager.com/document`,
            recipients: reci,
            properties: [],
            docMessage: docMessage,
            title: documentTitle,
            isTemplate:template==='template'?true:false,
            docType:type,
            organizationId: organization._id,
            creatorType: getUserData().userType
          })
         
          if (res?.success) {
            setUrl({...res.uploadedDocuments,id:data.data._id});
          }
          
        }
        else{
          data = await addRecipients({
            documentId: res.uploadedDocuments.id,
            documentUrl: res.uploadedDocuments.url,
            mymanagerUrl: `https://mymanager.com/document`,
            recipients: reci,
            properties: [],
            docMessage: docMessage,
            title: documentTitle,
            isTemplate:template==='template'?true:false,
            docType:type,
            creatorType: getUserData().userType
          })
       
      if (res?.success) {
        setUrl({...res.uploadedDocuments,id:data.data._id});
      }
          
        }
       
      }
      
      
      toggle();
    } catch (error) {
      setIsUploading(false);
    }
  };

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">Add Message</h5>
        <small>A few words for recipients</small>
      </div>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Row>
          <Col md="12" className="mb-1">
            <Label className="form-label" for="basicInput">
              Email Subject
            </Label>
            <Input
              type="host"
              id="basicInput"
              placeholder="Enter Host Name"
              name="subject"
              onChange={handleMessage}
            />
          </Col>
          <Col md="12" className="mb-1">
            <Label className="form-label" for="basicInput">
              Email Message
            </Label>
            <Input
              type="textarea"
              id="basicInput"
              placeholder="Enter Message"
              name="message"
              onChange={handleMessage}
            />
          </Col>
        </Row>

        <div className="d-flex justify-content-between">
          <Button color="primary" className="btn-prev" outline onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">Previous</span>
          </Button>
          <Button
            color="primary"
            className="btn-next"
            onClick={handleAddRecipient}
            disabled={isUploading}
          >
            <span className="align-middle d-sm-inline-block d-none">
              {isUploading ? '...Loading' : 'Next'}
            </span>
            <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
          </Button>
        </div>
      </Form>
      <EditDoc open={modal} toggle={toggle} />
    </Fragment>
  );
};

export default Message;
