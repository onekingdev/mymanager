// ** React Imports
import { Fragment, useContext, useEffect, useState } from 'react';

// ** Icons Imports
import { ArrowRight } from 'react-feather';

// ** Reactstrap Imports
import { Row, Col, Form, Button, Label, Input, Spinner } from 'reactstrap';

// ** Components
import { mergeAllFiles } from '../../../../../../documents/helpers/loadPdfHelper';

// ** Styles
import '@styles/react/libs/file-uploader/file-uploader.scss';
import { useUploadDocument } from '../../../../../../../requests/documents/create-doc';
import { addTaskAction } from '../../../store/employee/action';
import { useDispatch, useSelector } from 'react-redux';
import EditorModal from '../editTask/taskEditor/EditorModal';

import { DocumentContext } from '../../../../../../../utility/context/Document';

function DocumentDesAndTitle({ task, setTask, toggle }) {
  const [isLoading, setIsLoading] = useState(false);
  const [openEditor,setOpenEditor] = useState(false);

  const {setRecipients,setUrl} = useContext(DocumentContext)

  const dispatch = useDispatch();
  const store = useSelector(state=>state.employeeTasks)
 
  const toggleEditor =()=>setOpenEditor(!openEditor)
  const handleAddDetails = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    //save to db
    if (task.files) {
      mergeFiles();
      //toggle();
      //go to edit form
      //toggleEditor();
      
  

    } else {
      //save to task
      dispatch(addTaskAction(task));
      toggle();
    }
  };
  // useEffect(()=>{
  //   console.log("selectedTask",store.selectedTask)
    
  // },[store.selectedTask])
  //merge files
  const mergeFiles = async () => {
    try {
      setIsLoading(true);
      const mergedDoc = await mergeAllFiles(task.files);
      const formData = new FormData();
      formData.append('file', mergedDoc);
      formData.append('type', 'task');
      useUploadDocument(formData).then((res)=>{
        if (res?.success) {
          setUrl(res.uploadedDocuments);
          setRecipients([{id:store.role._id,name:store.role.roleName,color:store.role.color,active:true},{id:0,name:"Mine",color:'#c9fadf',active:false}])
          const payload = {
            title: task.title,
            description: task.description,
            type: task.type,
            empRoleId: task.empRoleId,
            documentUrl: res.uploadedDocuments.url,
            documentId: res.uploadedDocuments.id,
          
          empIds:task.empIds
          }
          setIsLoading(false);
          //save to task
          //dispatch(addTaskAction(payload));
         
          setTask(payload);
          toggleEditor()
          
        }
      })
      
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <Fragment>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Row>
          <Col sm="6">
            <Label className="form-label" for="title">
              Title
            </Label>
            <Input type="text" name="title" onChange={handleAddDetails} />
          </Col>
          <Col sm="12" className="mt-1">
            <Label className="form-label" for="des">
              Description
            </Label>
            <Input
              id="exampleText"
              name="description"
              type="textarea"
              placeholder="Write your notes..."
              style={{ height: '150px' }}
              onChange={handleAddDetails}
            />
          </Col>
          <div className=" d-flex justify-content-end float-end mt-1 mb-2">
            <Button color="primary" className="btn-next" onClick={handleSubmit}>
              {isLoading ? (
                <Spinner color="light" size="sm" />
              ) : (
                <span className="align-middle d-sm-inline-block ">Submit</span>
              )}
            </Button>
          </div>
        </Row>
      </Form>
      <EditorModal toggle={toggleEditor} open={openEditor} store={store} task={task}/>
    </Fragment>
  );
}

export default DocumentDesAndTitle;
