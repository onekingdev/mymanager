import React, { memo, useState } from 'react';

import { FaAlignJustify } from 'react-icons/fa';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap';
import TextTemplateListing from './TamplateListing/TextTemplateListing';
import TextTemplateSidebar from './Sidebar/index';

function TextTemplate() {
  const [open, setOpen] = useState(false);

  const [activeMainFolder, setActiveMainFolder] = useState(null);
  const [activeSubMainFolder, setActiveSubMainFolder] = useState(null);

  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Button color="link" size="sm" className="btn-icon" onClick={() => handleClose()}>
        <FaAlignJustify size={16} />
      </Button>
      <Modal isOpen={open} size="lg" toggle={() => handleClose()}>
        <ModalBody className="px-0">
          <Row>
            <Col md={3}>
              <TextTemplateSidebar
                activeMainFolder={activeMainFolder}
                setActiveMainFolder={setActiveMainFolder}
                activeSubMainFolder={activeSubMainFolder}
                setActiveSubMainFolder={setActiveSubMainFolder}
              />
            </Col>
            <Col md={9}>
              <TextTemplateListing
                activeMainFolder={activeMainFolder}
                activeSubMainFolder={activeSubMainFolder}
              />
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default memo(TextTemplate);
