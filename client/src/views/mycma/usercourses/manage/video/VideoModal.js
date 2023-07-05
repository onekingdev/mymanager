import { Row, Col, Card, CardBody, Input, Button, Modal, ModalBody, ModalHeader,ModalFooter } from 'reactstrap';
import { Fragment, useState, useContext, useEffect } from 'react';

const VideoModal = ({modal, video, toggle}) => {

  return (
    <Modal isOpen={modal}
      widith={1000}
      height={1000}
      toggle={toggle}
      modalTransition={{ timeout: 2000 }}>
      <ModalHeader toggle={toggle}>{video.title}</ModalHeader>
      <ModalBody>
        <video width="400px" height="400px" controls>
          <source src={video.download} type="video/mp4" />
        </video>
      </ModalBody> 
      <ModalFooter>
        {video.description}
      </ModalFooter> 
    </Modal>
  )
}

export default VideoModal;