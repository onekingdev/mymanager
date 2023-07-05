// ** Components
import CardInvite from '../CardInvite';
import InvitationPreview from '../InvitationPreview';
import { useParams, useHistory } from 'react-router-dom';
import { customInterIceptors } from '../../../../lib/AxiosProvider';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setErrors, getEventInfo } from '../store';
import { toast, Slide } from 'react-toastify';
// ** Reactstrap Imports
import { Row, Col, Card, CardTitle, CardBody, Input, Label, Button } from 'reactstrap';

// ** Styles
import '@styles/react/libs/charts/apex-charts.scss';
import '@styles/base/pages/dashboard-ecommerce.scss';
import BreadCrumbs from '../Breadcrumbs';
import Table from './Table';
import AddGuestCheckModal from './AddGuestCheckModal';

const AddGuest = (props) => {
  const eventId = useParams();
  const dispatch = useDispatch();

  const [addGuestByInput, setAddGuestByInput] = useState('');
  const [isCheckedClient, setIsCheckedClient] = useState(false);
  const [allClients, setAllClients] = useState([]);
  const [isCheckedVenders, setIsCheckedVenders] = useState(false);
  const [allVenders, setAllVenders] = useState([]);
  const [isCheckedLeads, setIsCheckedLeads] = useState(false);
  const [allEmployees, setAllEmployees] = useState([]);
  const [isCheckedEmployees, setIsCheckedEmployees] = useState(false);
  const [allLeads, setAllLeads] = useState([]);
  const [isCheckedRelationship, setIsCheckedRelationship] = useState(false);
  const [allRelationships, setAllRelationship] = useState([]);
  const [guestsData, setGuestsData] = useState([]);
  const [curInputNum, setCurInputNum] = useState(0);
  const [totalNumber, setTotalNumber] = useState(0);
  const [clientTypeId, setClientTypeId] = useState('');
  const [employeeTypeId, setEmployeeTypeId] = useState('');
  const [leadTypeId, setLeadTypeId] = useState('');
  const [relationshipTypeId, setRelationshipTypeId] = useState('');
  const [vendorTypeId, setVendorTypeId] = useState('');

  const event = useSelector((state) => state.event);
  const eventInfo = useSelector((state) => state.event.eventInfo);
  const totalContacts = useSelector((state) => state?.totalContacts?.contactList?.list);
  const contactTypes = useSelector((state) => state?.totalContacts?.contactTypeList);

  useEffect(() => {
    dispatch(getEventInfo(eventId.eventId));
  }, []);
  useEffect(() => {
    contactTypes?.length > 0 &&
      contactTypes.map((contactType) => {
        if (contactType.name === 'Client') {
          setClientTypeId(contactType._id);
        } else if (contactType.name === 'Employee') {
          setEmployeeTypeId(contactType._id);
        } else if (contactType.name === 'Lead') {
          setLeadTypeId(contactType._id);
        } else if (contactType.name === 'Relationship') {
          setRelationshipTypeId(contactType._id);
        } else if (contactType.name === 'Vendor') {
          setVendorTypeId(contactType._id);
        }
      });
  }, [contactTypes]);
  useEffect(() => {
    setTotalNumber(
      allClients.length +
        allVenders.length +
        allEmployees.length +
        allLeads.length +
        allRelationships.length +
        curInputNum
    );
  }, [allClients, allVenders, allEmployees, allLeads, allRelationships, curInputNum]);
  const onChangeAddGuestByInput = (e) => {
    setAddGuestByInput(e.target.value);
  };

  const checkClient = (status) => {
    setIsCheckedClient(status);
    if (status) {
      let tmp = [];
      totalContacts?.length > 0 &&
        totalContacts.map((contact) => {
          if (contact.contactType.includes(clientTypeId)) {
            tmp.push({
              id: contact._id,
              name: contact.fullName,
              email: contact.email,
              phone: contact.phone,
              status: contact.status,
              category: 'Client'
            });
          }
        });
      setAllClients(tmp);
    } else {
      setAllClients([]);
    }
  };

  const checkLead = (status) => {
    setIsCheckedLeads(status);
    if (status) {
      let tmp = [];
      totalContacts?.length > 0 &&
        totalContacts.map((contact) => {
          if (contact.contactType.includes(leadTypeId)) {
            tmp.push({
              id: contact._id,
              name: contact.fullName,
              email: contact.email,
              phone: contact.phone,
              status: contact.status,
              category: 'Lead'
            });
          }
        });
      setAllLeads(tmp);
    } else {
      setAllLeads([]);
    }
  };
  const checkRelationship = (status) => {
    setIsCheckedRelationship(status);
    if (status) {
      let tmp = [];
      totalContacts?.length > 0 &&
        totalContacts.map((contact) => {
          if (contact.contactType.includes(relationshipTypeId)) {
            tmp.push({
              id: contact._id,
              name: contact.fullName,
              email: contact.email,
              phone: contact.phone,
              status: contact.status,
              category: 'Relationship'
            });
          }
        });
      setAllRelationship(tmp);
    } else {
      setAllRelationship([]);
    }
  };
  const checkVender = (status) => {
    setIsCheckedVenders(status);
    if (status) {
      let tmp = [];
      totalContacts?.length > 0 &&
        totalContacts.map((contact) => {
          if (contact.contactType.includes(vendorTypeId)) {
            tmp.push({
              id: contact._id,
              name: contact.fullName,
              email: contact.email,
              phone: contact.phone,
              status: contact.status,
              category: 'Vendor'
            });
          }
        });
      setAllVenders(tmp);
    } else {
      setAllVenders([]);
    }
  };
  const checkEmployee = (status) => {
    setIsCheckedEmployees(status);
    if (status) {
      let tmp = [];
      totalContacts?.length > 0 &&
        totalContacts.map((contact) => {
          if (contact.contactType.includes(employeeTypeId)) {
            tmp.push({
              id: contact._id,
              name: contact.fullName,
              email: contact.email,
              phone: contact.phone,
              status: contact.status,
              category: 'Employee'
            });
          }
        });
      setAllEmployees(tmp);
    } else {
      setAllEmployees([]);
    }
  };

  // Check New Employee
  // useEffect(() => {
  //   if (isCheckedClient == true || isCheckedEmployees == true || isCheckedLeads == true || isCheckedRelationship == true || isCheckedVenders == true) {
  //     setIsNewMember(false);
  //   }
  // }, [isCheckedClient, isCheckedEmployees, isCheckedLeads, isCheckedRelationship, isCheckedVenders])
  // ** Modal
  const [modal, setModal] = useState(false);
  const toggle = () => {
    let isVaildEmail = true;
    let addEmailArray = [];
    if (addGuestByInput != '') {
      addEmailArray = addGuestByInput.split(',').map((item) => item.trim());
      let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      addEmailArray.map((item) => {
        if (!item.match(validRegex)) {
          isVaildEmail = false;
        }
      });
    }

    if (isVaildEmail == false) {
      toast.error('Invalid Email');
    } else {
      let guests = event.addGuests;
      if (addEmailArray) {
        addEmailArray.map(
          (email) =>
            (guests = [
              ...guests,
              {
                email: email
              }
            ])
        );
      }

      if (guests.length == 0) {
        toast.error('Select Guests!');
      } else {
        setGuestsData(guests);
        setModal(!modal);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key == 'Enter' || e.key == ',') {
      let isVaildEmail = true;
      let addEmailArray = [];
      if (addGuestByInput != '') {
        addEmailArray = addGuestByInput.split(',').map((item) => item.trim());
        let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        addEmailArray.map((item) => {
          if (!item.match(validRegex)) {
            isVaildEmail = false;
          }
        });
      }

      if (isVaildEmail == false) {
        toast.error('Invalid Email');
      } else {
        if (addEmailArray) {
          setCurInputNum(addEmailArray.length);
        }
      }
    }
  };

  return (
    <>
      <BreadCrumbs
        breadCrumbTitle={eventInfo.title}
        breadCrumbActive={eventInfo.title}
        breadCrumbParent="Calendar"
        breadCrumbParentLink="/calendar"
        breadCrumbParent2="Event Detail"
        breadCrumbParent2Link={`/event-details/${eventInfo._id}`}
        isBack={true}
      />
      <Row>
        <Col lg="8" md="8" sm="12">
          <Card>
            <CardBody>
              <CardTitle>Invite Guests</CardTitle>
              <div className="mb-2">
                <div className="form-check form-check-inline me-1">
                  <Input
                    type="checkbox"
                    id="basic-cb-unchecked"
                    defaultChecked={isCheckedClient}
                    onChange={() => checkClient(!isCheckedClient)}
                  />
                  <Label for="basic-cb-unchecked" className="form-check-label">
                    Clients
                  </Label>
                </div>
                <div className="form-check form-check-inline me-1">
                  <Input
                    type="checkbox"
                    id="basic-cb-unchecked"
                    defaultChecked={isCheckedVenders}
                    onChange={() => checkVender(!isCheckedVenders)}
                  />
                  <Label for="basic-cb-unchecked" className="form-check-label">
                    Vendors
                  </Label>
                </div>
                <div className="form-check form-check-inline me-1">
                  <Input
                    type="checkbox"
                    id="basic-cb-unchecked"
                    defaultChecked={isCheckedLeads}
                    onChange={() => checkLead(!isCheckedLeads)}
                  />
                  <Label for="basic-cb-unchecked" className="form-check-label">
                    Leads
                  </Label>
                </div>
                <div className="form-check form-check-inline me-1">
                  <Input
                    type="checkbox"
                    id="basic-cb-unchecked"
                    defaultChecked={isCheckedEmployees}
                    onChange={() => checkEmployee(!isCheckedEmployees)}
                  />
                  <Label for="basic-cb-unchecked" className="form-check-label">
                    Employees
                  </Label>
                </div>
                <div className="form-check form-check-inline">
                  <Input
                    type="checkbox"
                    id="basic-cb-unchecked"
                    defaultChecked={isCheckedRelationship}
                    onChange={() => checkRelationship(!isCheckedRelationship)}
                  />
                  <Label for="basic-cb-unchecked" className="form-check-label">
                    Relationships
                  </Label>
                </div>
              </div>

              <div className="mb-1">
                <div className="mb-1 d-flex justify-content-between">
                  <div>Or Enter emails</div>
                  <div>
                    Total Found: <strong>{totalNumber}</strong>
                  </div>
                </div>
                <Input
                  type="textarea"
                  name="text"
                  id="exampleText"
                  rows="3"
                  disabled={
                    isCheckedClient == true ||
                    isCheckedEmployees == true ||
                    isCheckedLeads == true ||
                    isCheckedRelationship == true ||
                    isCheckedVenders == true
                      ? true
                      : false
                  }
                  value={addGuestByInput}
                  onChange={onChangeAddGuestByInput}
                  onKeyPress={handleKeyPress}
                  placeholder="Seperated By Commas Ex. example1@gmail.com, example2@gmail.com ..."
                />
              </div>
              <div>
                <Button color="primary" onClick={toggle}>
                  Add Guests
                </Button>
              </div>
            </CardBody>
          </Card>
          <div className="app-user-list">
            <Table
              allClients={allClients}
              allLeads={allLeads}
              allVenders={allVenders}
              allEmployees={allEmployees}
              allRelationships={allRelationships}
            />
          </div>
        </Col>
        <Col lg="4" md="4" sm="12">
          {/* <CardInvite eventInfo={{ url: eventInfo.eventBanner }} /> */}
          <InvitationPreview eventInfo={{ eventInfo }} />
        </Col>
      </Row>
      <AddGuestCheckModal
        modal={modal}
        setModal={setModal}
        toggle={toggle}
        guestsData={guestsData}
        setGuestsData={setGuestsData}
      />
    </>
  );
};

export default AddGuest;
