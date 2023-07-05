// ** React Imports
import { Fragment, useState } from 'react';

// ** Icons Imports
import { ArrowLeft, ArrowRight } from 'react-feather';

// ** Reactstrap Imports
import { Label, Row, Col, Input, Form, Button, Select } from 'reactstrap';

// ** Components
import FileUploaderSingle from '../FileUploaderSingle';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

// ** Styles
import '@styles/react/libs/file-uploader/file-uploader.scss';
import '@styles/react/libs/editor/editor.scss';

const Detail = ({ stepper, type, eventForm, eventInfo }) => {
  // ** State
  const [value, setValue] = useState(EditorState.createEmpty());

  const handleNext = () => {
    const text = draftToHtml(convertToRaw(value.getCurrentContent()));
    eventForm.set('eventDetail', text);
    stepper.next();
  };

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">Event Detail</h5>
        <small className="text-muted">Add more text and images for more detail.</small>
      </div>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Row>
          <Col sm="12">
            <Editor editorState={value} onEditorStateChange={(data) => setValue(data)} />
          </Col>
        </Row>

        <div className="d-flex justify-content-between mt-2">
          <Button
            color="secondary"
            className="btn-prev btn btn-primary"
            outline
            onClick={() => stepper.previous()}
          >
            <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">Previous</span>
          </Button>
          <Button color="primary" className="btn-next" onClick={() => handleNext()}>
            <span className="align-middle d-sm-inline-block d-none">Next</span>
            <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default Detail;
