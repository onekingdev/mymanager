import "@styles/react/libs/flatpickr/flatpickr.scss";

import {
  Button,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { TbBusinessplan, TbPercentage, TbUsers, TbX } from "react-icons/tb";
import { useEffect, useState } from "react";

const CreatePlan = ({ open, plan, toggleModal, successAction }) => {
  const [name, setName] = useState("");
  const [rate, setRate] = useState("");
  const [requirement, setRequirement] = useState("");

  useEffect(() => {
    if (plan) {
      setName(plan.name);
      setRate(plan.rate);
      setRequirement(plan.requirement);
    }
  }, [plan]);

  // ** Custom close btn
  const CloseBtn = (
    <TbX className="cursor-pointer" size={15} onClick={toggleModal} />
  );

  const onSubmit = () => {
    successAction({
      ...plan,
      name,
      rate,
      requirement,
    });
  };

  if (!plan) return null;

  return (
    <Modal
      isOpen={open}
      toggle={toggleModal}
      className="sidebar-sm"
      modalClassName="modal-slide-in"
      contentClassName="pt-0"
    >
      <ModalHeader
        className="mb-1"
        toggle={toggleModal}
        close={CloseBtn}
        tag="div"
      >
        <h5 className="modal-title">
          {plan.id ? "Edit" : "Create"} Commission Plan
        </h5>
      </ModalHeader>
      <ModalBody className="flex-grow-1">
        <div className="mb-1">
          <Label className="form-label" for="name">
            Name
          </Label>
          <InputGroup>
            <InputGroupText>
              <TbBusinessplan size={15} />
            </InputGroupText>
            <Input
              id="name"
              placeholder="Level X"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </InputGroup>
        </div>
        <div className="mb-1">
          <Label className="form-label" for="rate">
            Commission Rate in %
          </Label>
          <InputGroup>
            <InputGroupText>
              <TbPercentage size={15} />
            </InputGroupText>
            <Input
              type="number"
              id="rate"
              placeholder="10"
              name="rate"
              min={0}
              max={100}
              value={rate}
              onChange={(e) => {
                setRate(e.target.value);
              }}
            />
          </InputGroup>
        </div>
        <div className="mb-1">
          <Label className="form-label" for="requirement">
            Required User for Upgrade
          </Label>
          <InputGroup>
            <InputGroupText>
              <TbUsers size={15} />
            </InputGroupText>
            <Input
              type="number"
              id="requirement"
              name="requirement"
              min={0}
              value={requirement}
              onChange={(e) => {
                setRequirement(e.target.value);
              }}
            />
          </InputGroup>
        </div>
        <Button className="me-1" color="primary" onClick={onSubmit}>
          Submit
        </Button>
        <Button color="secondary" onClick={toggleModal} outline>
          Cancel
        </Button>
      </ModalBody>
    </Modal>
  );
};

export default CreatePlan;
