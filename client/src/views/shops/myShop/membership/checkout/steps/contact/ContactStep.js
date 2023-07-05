// ** React Imports
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// ** Third Party Components
import { useForm } from 'react-hook-form';
import classnames from 'classnames';
import Select from 'react-select';

// ** Reactstrap Imports
import {
  Form,
  Card,
  Label,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Button,
  Row,
  Col,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu
} from 'reactstrap';

// ** Utils
import { selectThemeColors } from '@utils';

// ** Store Actions
import { getUserData } from '../../../../../../../auth/utils';
import { getTemplatesDocuments } from '../../../../../../../requests/documents/create-doc';
import FamilyMemberModal from './FamilyMemberModal';


export default function ContactStep({
  stepper,
  buyer,
  setBuyer,
  cart,
  setCart,
  selectedFamily,
  setSelectedFamily
}) {
  const [templates, setTemplates] = useState([]);
  const [allTemplates, setAllTemplates] = useState([]);
  const [contractType, setContractType] = useState('All Contracts');
  const [contactOptions, setContactOptions] = useState([]);
  const [openFamilyMembers, setOpenFamilyMembers] = useState(false);
  const [familyMembers, setFamilyMembers] = useState([]);

  const storeContacts = useSelector((state) => state.totalContacts);
  const dispatch = useDispatch();

  const toggleOpenFamilyMember = () => setOpenFamilyMembers(!openFamilyMembers);

  useEffect(() => {
    if (storeContacts && storeContacts?.contactList?.list?.length > 0) {
      const contacts = storeContacts?.contactList?.list?.map((x, index) => ({
        index,
        value: x._id,
        label: x.fullName,
        client: x
      }));
      setContactOptions(contacts);
    }
  }, [storeContacts?.contactList]);

  useEffect(() => {
    //get templates
    getTemplatesDocuments().then((res) => {
      setTemplates(res?.filter((x) => x.docType === 'contract'));
      setAllTemplates(res?.filter((x) => x.docType === 'contract'));
    });
  }, []);

  const handleContractCategory = (cat) => {
    switch (cat) {
      case 'all':
        setTemplates(allTemplates?.filter((x) => x.docType === 'contract'));
        setContractType('All Contracts');
        break;
      case 'organization':
        setContractType('My Organization');
        const organization = JSON.parse(localStorage.getItem('organization'))
        //user organization
        setTemplates(allTemplates?.filter((x) => x?.organizationId === organization._id));
        break;
      case 'my':
        setContractType('My Contracts');
        setTemplates(allTemplates?.filter((x) => x.userId === getUserData().id));
        break;

      default:
        setTemplates(allTemplates?.filter((x) => x.docType === 'contract'));
        setContractType('All Contracts');
        break;
    }
  };

  const renderTemplates = () => {
    return templates?.map((item , idx) => (
      <Col md="4" key={idx}>
        <Card className="border">
          <CardBody>
            <h6>{item?.title}</h6>
            <iframe
              src={item.documentUrl}
              scrolling="no"
              className="shadow-sm"
              style={{
                position: 'relative',
                overflow: 'hidden',
                width: '100%',
                border: 'none',
                height: '200px',
                borderRadius: 10
              }}
              onClick={(e) => e.stopPropagation()}
            ></iframe>
            <Button
              key={item._id}
              id={item._id}
              color="primary"
              outline
              className={`w-100 mx-auto`}
              onClick={() => setCart({ ...cart, template: item })}
            >
              Select
            </Button>
          </CardBody>
        </Card>
      </Col>
    ));
  };


  return (
    <>
      <Row>
        <Col md="8">
          <Card>
            <CardHeader className="flex-column align-items-start">
              <CardTitle tag="h4">Who is buying?</CardTitle>
              <CardText className="text-muted mt-25">Select A member from your Contacts</CardText>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md="6" sm="12">
                  <div className="mb-2">
                    <Label className="form-label" for="checkoutName">
                      Select Member
                    </Label>
                    <Select
                      theme={selectThemeColors}
                      className="react-select"
                      classNamePrefix="select"
                      options={contactOptions}
                      isClearable={false}
                      onChange={(e) => {
                        setBuyer(e.client);
                      }}
                    />
                  </div>
                </Col>
                <Col md="6" sm="12">
                  <div className="mb-2">
                    <Label className="form-label" for="checkoutNumber">
                      Family Member
                    </Label>
                    {/* <Select
                      theme={selectThemeColors}
                      className="react-select"
                      classNamePrefix="select"
                      defaultValue={contractMethods[1]}
                      options={contractMethods}
                      isClearable={false}
                      onChange={(e) =>
                        setCart({ ...cart, contractMethod: e.value })
                      }
                    /> */}
                    <br />
                    <Button color="primary" onClick={toggleOpenFamilyMember}>
                      Add Family Members
                    </Button>
                  </div>
                </Col>
                <div>
                  <div className="d-flex justify-content-between">
                    <div className="my-auto">
                      <CardTitle tag="h4">Choose a template</CardTitle>
                      <CardText className="text-muted ">
                        Select a Membership Contract Template to send
                      </CardText>
                    </div>
                    <div>
                      <Row>
                        <Col sm="12">
                          <div className="d-flex justify-content-end">
                            <div className="my-auto me-25">
                              <span className="search-results">
                                {templates?.length} Results Found
                              </span>
                            </div>

                            <div className="view-options d-flex">
                              <UncontrolledButtonDropdown className="dropdown-sort">
                                <DropdownToggle
                                  className="text-capitalize me-1"
                                  color="primary"
                                  outline
                                  caret
                                >
                                  {contractType}
                                </DropdownToggle>
                                <DropdownMenu>
                                  <DropdownItem
                                    className="w-100"
                                    onClick={() => handleContractCategory('all')}
                                  >
                                    All Contracts
                                  </DropdownItem>
                                  <DropdownItem
                                    className="w-100"
                                    onClick={() => handleContractCategory('organization')}
                                  >
                                    My Organization
                                  </DropdownItem>
                                  <DropdownItem
                                    className="w-100"
                                    onClick={() => handleContractCategory('my')}
                                  >
                                    My Contracts
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledButtonDropdown>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                  <Row>{renderTemplates()}</Row>
                </div>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col md="4">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Preview</CardTitle>
            </CardHeader>
            <CardBody>
              {buyer && (
                <div>
                  <CardText tag="h4">{buyer?.fullName}</CardText>
                  <CardText className="mb-0">{buyer?.address?.street}</CardText>
                  <CardText>
                    {buyer?.address?.city} {buyer?.address?.state} {buyer?.address?.country}
                  </CardText>
                  <CardText>{buyer?.company}</CardText>
                  <CardText>{buyer?.email}</CardText>
                  <CardText>{buyer?.phone}</CardText>
                </div>
              )}
              {selectedFamily.length > 0 && (
                <div>
                  <h6>Family Members</h6>
                  <ul>
                    {familyMembers.map((x, idx) => {
                      return (
                        <>
                          {selectedFamily?.includes(x._id) && (
                            <li key={idx}>
                              {x?.fullName} ({x?.relation})
                            </li>
                          )}
                        </>
                      );
                    })}
                  </ul>
                </div>
              )}
              <Button
                block
                type="button"
                color="primary"
                onClick={() => stepper.next()}
                className="btn-next delivery-address mt-2"
              >
                Next
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <FamilyMemberModal
        open={openFamilyMembers}
        toggle={toggleOpenFamilyMember}
        member={buyer}
        dispatch={dispatch}
        selectedFamily={selectedFamily}
        setSelectedFamily={setSelectedFamily}
        familyMembers={familyMembers}
        setFamilyMembers={setFamilyMembers}
      />
    </>
  );
}
