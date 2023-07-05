// ** React Imports
import { Fragment } from 'react';

// ** Icons Imports
import { ArrowRight } from 'react-feather';

// ** Reactstrap Imports
import { Row, Col, Form, Button, Label, Input } from 'reactstrap';

// ** Components
import { mergeAllFiles } from '../../../../../../documents/helpers/loadPdfHelper';

// ** Styles
import '@styles/react/libs/file-uploader/file-uploader.scss';
import { useUploadDocument } from '../../../../../../../requests/documents/create-doc';
import { addTaskAction } from '../../../store/employee/action';
import { useDispatch } from 'react-redux';

function DocumentDesAndTitle({task,setTask}) {
  const dispatch = useDispatch()
  const handleAddDetails = (e)=>{
    setTask({...task,[e.target.name]:e.target.value})
  }
  const handleSubmit =()=>{
    //save to db
    if(task.files){
      mergeFiles()
    }
    else{
      //save to task
      dispatch(addTaskAction(task))
    }
  }
  //merge files
  const mergeFiles = async()=>{
    try {
      const mergedDoc = await mergeAllFiles(task.files);
      const formData = new FormData();
      formData.append('file', mergedDoc);
      formData.append('type', 'task');
      const res = await useUploadDocument(formData);
      if(res?.success){
        const payload ={
          title:payload.title,
          description:payload.description,
          type:payload.type,
          empRoleId:payload.empRoleId,
          documentUrl:res.uploadedDocuments.url
      }
      //save to task
      dispatch(addTaskAction(payload))
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Fragment>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Row>
          <Col sm="6">
            <Label className="form-label" for="title">
              Title
            </Label>
            <Input type="text" name="title" onChange={handleAddDetails}/>
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
              <span className="align-middle d-sm-inline-block d-none">Submit</span>
            </Button>
          </div>
        </Row>
      </Form>
    </Fragment>
  );
}

export default DocumentDesAndTitle;
