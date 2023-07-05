import { Fragment, useState } from 'react';

import { Card, CardBody, Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap';

const ImageZoom = (props) => {
  const { srcUrl, setIsOpen } = props;
  const [moreZoom, setMoreZoom] = useState(false);

  const cancleBtnClicked = () => {
    setIsOpen(null);
  };

  return (
    <Modal
      isOpen={srcUrl?.length}
      toggle={() => cancleBtnClicked()}
      className="modal-dialog-centered"
      size={moreZoom ? 'xl' : 'lg'}
    >
      <ModalBody style={{ padding: 0 }}>
        <Fragment>
          <img
            src={srcUrl}
            width="100%"
            style={{ borderRadius: '5px' }}
            onDoubleClick={(e) => {
              e.preventDefault();
              setMoreZoom(!moreZoom);
            }}
          />
        </Fragment>
      </ModalBody>
    </Modal>
  );
};

export default ImageZoom;
