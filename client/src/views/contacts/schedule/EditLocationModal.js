import {
  Input,
  InputGroup,
  InputGroupText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from 'reactstrap';

const EditLocationModal = (props) => {
  const { openEditZip, zipEditHandler, setZipCode, zipCode } = props;
  const zipOkHandler = () => {
    let code = document.querySelector('[name="zipCode"]').value;
    setZipCode(parseInt(code));
    localStorage.setItem('location', code);
    zipEditHandler();
  };
  return (
    <Modal isOpen={openEditZip} toggle={zipEditHandler} centered>
      <ModalHeader toggle={zipEditHandler}>Change Position</ModalHeader>
      <ModalBody>
        <InputGroup className="mb-1">
          <InputGroupText>
            <h6 className="mb-0">Zip Code</h6>
          </InputGroupText>
          <Input type="text" alt="text" name="zipCode" placeholder="us" defaultValue={zipCode} />
        </InputGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={(e) => zipOkHandler()}>
          Ok
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditLocationModal;
