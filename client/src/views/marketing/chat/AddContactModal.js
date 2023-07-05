import React, { useState, useRef, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { customInterIceptors } from '../../../lib/AxiosProvider';

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Table,
  Form,
  Row,
  Col
} from 'reactstrap';
import { FaUserAlt, FaUserFriends, FaUserTie, FaRegStar } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import useMessage from '../../../lib/useMessage';
import { addEmpContactAction as addEmployeeContactAction } from '../../contacts/store/actions';
import { addLeadContactAction as addLeadContactActions } from '../../contacts/store/actions';
import { addRelationshipContactAction as addRelationContactAction } from '../../contacts/store/actions';
import { addVendorContactAction as addVendorContactActions } from '../../contacts/store/actions';
import { newClientContact as addClientContactAction } from '../../contacts/store/actions';

const AddContactModal = ({ modal, setModal, addContactModalToggle, selectedRow }) => {
  let selectedContact = selectedRow && selectedRow.contact;
  const [contactType, setContactType] = useState('');
  const { error, success } = useMessage();
  const API = customInterIceptors();
  const eventId = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const status = useSelector((state) => state);

  const contactClickHandler = (contact) => {
    if (contact == 'employee') {
      dispatch(addEmployeeContactAction(selectedContact));
      if (status?.employeeContact.addEmployee.error) {
        error(
          `Adding ${selectedContact.email} failed!   ` + status?.employeeContact.addEmployee.error
        );
      } else {
        success(`Add ${selectedContact.email} to Employee Successfully`);
      }
    } else if (contact == 'lead') {
      dispatch(addLeadContactActions(selectedContact));
      if (status?.leadContact.addLead.error) {
        error(`Adding ${selectedContact.email} failed!   ` + status?.leadContact.addLead.error);
      } else {
        success(`Add ${selectedContact.email} to Lead Successfully`);
      }
    } else if (contact == 'relationship') {
      dispatch(addRelationContactAction(selectedContact));
      if (status?.relationshipContact.addLead.error) {
        error(
          `Adding ${selectedContact.email} failed!   ` + status?.relationshipContact.addLead.error
        );
      } else {
        success(`Add ${selectedContact.email} to Relationship Successfully`);
      }
    } else if (contact == 'vendor') {
      dispatch(addVendorContactActions(selectedContact));
      if (status.vendorContact.addLead.error) {
        error(`Adding ${selectedContact.email} failed!   ` + status.vendorContact.addLead.error);
      } else {
        success(`Add ${selectedContact.email} to Vendors Successfully`);
      }
    } else if (contact == 'client') {
      dispatch(addClientContactAction(selectedContact));
      if (status.clientContact.clientContact.error) {
        error(
          `Adding ${selectedContact.email} failed!   ` +
            status.clientContact.isClientContactErrors.error?.data.message
        );
      } else {
        success(`Add ${selectedContact.email} to Clients Successfully`);
      }
    }
    setModal(false);
  };

  return (
    <form>
      <Modal isOpen={modal} toggle={addContactModalToggle}>
        <ModalHeader toggle={addContactModalToggle}>Add this member to contact</ModalHeader>
        <ModalBody>
          <div className="mb-3">
            <div className="d-flex align-items-center mt-1">
              <FaUserAlt size="20" />
              <h3 className="ms-1 mb-0 font-medium-1">{selectedRow?.contact?.fullName}</h3>
            </div>
          </div>
          <h3 className="text-primary font-small-4">*Choose Contacts*</h3>
          <Row className="border-primary border-round rounded-3 pt-1 pb-1">
            <Col md="12">
              <Button
                color="primary w-100 mb-1"
                className="d-flex align-items-center justify-content-between"
                onClick={(e) => {
                  setContactType('client');
                  contactClickHandler('client');
                }}
              >
                <FaRegStar size="15" />
                Client
                <FaRegStar size="15" />
              </Button>
            </Col>
            <Col md="12">
              <Button
                color="primary w-100 mb-1"
                className="d-flex align-items-center justify-content-between"
                onClick={(e) => {
                  setContactType('lead');
                  contactClickHandler('lead');
                }}
              >
                <FaRegStar size="15" />
                Lead
                <FaRegStar size="15" />
              </Button>
            </Col>
            <Col md="12">
              <Button
                color="primary w-100 mb-1"
                className="d-flex align-items-center justify-content-between"
                onClick={(e) => {
                  setContactType('vendor');
                  contactClickHandler('vendor');
                }}
              >
                <FaRegStar size="15" />
                Vendor
                <FaRegStar size="15" />
              </Button>
            </Col>
            <Col md="12">
              <Button
                color="primary w-100 mb-1"
                className="d-flex align-items-center justify-content-between"
                onClick={(e) => {
                  setContactType('employee');
                  contactClickHandler('employee');
                }}
              >
                <FaRegStar size="15" />
                Employee
                <FaRegStar size="15" />
              </Button>
            </Col>
            <Col md="12">
              <Button
                color="primary w-100"
                className="d-flex align-items-center justify-content-between"
                onClick={(e) => {
                  setContactType('relationship');
                  contactClickHandler('relationship');
                }}
              >
                <FaRegStar size="15" />
                Relationship
                <FaRegStar size="15" />
              </Button>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary">Cancel</Button>
        </ModalFooter>
      </Modal>
    </form>
  );
};

export default AddContactModal;
