import { Row, Label, Col, Card, CardBody, Input, Button, Modal, ModalBody, ModalHeader,ModalFooter } from 'reactstrap';
import { Fragment, useState, useContext, useEffect } from 'react';

const EditModal = ({modal, videoId, handleEdit, getVideos}) => {
  const [videoTitle, setVideoTitle] = useState("");
  const [videoText, setVideoText] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  
  const editVideo = () => {
    const options = {
      method: 'PATCH',
      headers: {'authorization': '9fce07dd3513a2db4560776814221276', 'Content-Type': 'application/json' },
      body: JSON.stringify({"title": videoTitle, "description": videoDescription, "ctaSettings": { "label": "Click me!", "url": "https://www.synthesia.io/" }, "visibility": "public" }) 
    };
    fetch(`https://api.synthesia.io/v2/videos/${videoId}`, options)
    .then(res => res.json())
    .then(result => {
      console.log('here is test', result);
      handleEdit();
      getVideos();
    })
  }

  return (
    <Modal isOpen={modal}
      widith={1000}
      height={1000}
      toggle={handleEdit}
      modalTransition={{ timeout: 2000 }}>
      <ModalBody>
        <Label className="mb-0" for="basicInput">
          Video Title:
        </Label>
        <Input
          autoFocus
          placeholder="Enter video title here"
          value={videoTitle}
          onChange={(e) => setVideoTitle(e.target.value)}
        />
        <Label className="mb-0" for="basicInput">
          Video Description:
        </Label>
        <Input
          autoFocus
          type="textarea"
          placeholder="Enter video description here"
          value={videoText}
          onChange={(e) => setVideoText(e.target.value)}
        />
        <Label className="mb-0" for="basicInput">
          Video Text:
        </Label>
        <Input
          autoFocus
          type="textarea"
          placeholder="Enter video Text here"
          value={videoDescription}
          onChange={(e) => setVideoDescription(e.target.value)}
        />
        <Button
          color="primary"
          className="btn-next"
          onClick={() => editVideo()}                       
        >
          <span className="align-middle d-sm-inline-block d-none">
            Edit
          </span>
        </Button>
      </ModalBody> 
    </Modal>
  )
}

export default EditModal;