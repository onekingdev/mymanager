// ** React Imports
import { Fragment, useState } from 'react';
import { Edit2 } from 'react-feather';
import '../../../../assets/styles/socialconnect.scss';

// ** Reactstrap Imports
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';

const ComposeModal = () => {
  // ** States
  const [basicModal, setBasicModal] = useState(false);

  return (
    <div className="basic-modal">
      {/* <Button color="primary" outline>
        Basic Modal
      </Button> */}
      <Button color="success" onClick={() => setBasicModal(!basicModal)} className="composebtn">
        <Edit2 size={16} className="me-1" />
        Compose
      </Button>
      <Modal isOpen={basicModal} toggle={() => setBasicModal(!basicModal)}>
        <ModalHeader toggle={() => setBasicModal(!basicModal)}>Basic Modal</ModalHeader>
        <ModalBody>
          <h5>Check First Paragraph</h5>
          Oat cake ice cream candy chocolate cake chocolate cake cotton candy dragée apple pie.
          Brownie carrot cake candy canes bonbon fruitcake topping halvah. Cake sweet roll cake
          cheesecake cookie chocolate cake liquorice.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => setBasicModal(!basicModal)}>
            Accept
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default ComposeModal;
