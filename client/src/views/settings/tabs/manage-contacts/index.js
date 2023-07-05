import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  Card,
  CardTitle,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink,
  Row,
  UncontrolledDropdown
} from 'reactstrap';
import { Edit, MoreVertical, Trash2 } from 'react-feather';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {
  deleteContactTypeByIdAction,
  getContactFieldByTypeAction
} from '../../../contacts/store/actions';
import AddContactTypeModal from './AddContactTypeModal';
import Table from './Table';

import { customInterIceptors } from '../../../../lib/AxiosProvider';
import '@styles/react/libs/tables/react-dataTable-component.scss';

const API = customInterIceptors();

const ManageContacts = (props) => {
  const mySwal = withReactContent(Swal);
  const dispatch = useDispatch();

  const [isNew, setIsNew] = useState(false);
  const [activeType, setActiveType] = useState(null);
  const [openAddContactType, setOpenAddContactType] = useState(false);
  const [tableData, setTableData] = useState([]);

  const contactTypes = useSelector((state) => state.totalContacts.contactTypeList);

  // ** Effect
  useEffect(() => {
    if (contactTypes?.length > 0) {
      setActiveType(contactTypes[0]._id);
      dispatch(getContactFieldByTypeAction(contactTypes[0]._id));
    }
  }, [contactTypes]);

  // ** Handlers
  const toggleAddContactType = () => {
    setIsNew(true);
    setOpenAddContactType(!openAddContactType);
  };

  const handleTypeClick = async (e, x) => {
    setActiveType(x._id);
    dispatch(getContactFieldByTypeAction(x._id));
  };

  const handleDeleteContactType = async (x) => {
    const res = await mySwal.fire({
      titleText: 'Delete Contact Type',
      text: 'By deleting contact type, all your contacts with this type will transfer to Client. Are you sure you want to delete? ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete anyway',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    });

    if (res.value) {
      //delete contact type
      dispatch(deleteContactTypeByIdAction(x._id, x)).then((res) => {
        dispatch(contactsAction());
      });
    }
  };

  return (
    <div>
      <Card className="px-0 mx-0">
        <Row className="g-0">
          <Col md="3" className="border-end me-0 pe-0" style={{ minHeight: '70vh' }}>
            <div className="my-2">
              <div className="justify-content-center"></div>
              <Nav vertical tabs>
                <Button color="primary" className="mx-auto mb-1" onClick={toggleAddContactType}>
                  New Contact Type
                </Button>
                {contactTypes?.length > 0 &&
                  contactTypes.map((x, idx) => {
                    return (
                      <NavItem
                        className={`${
                          activeType === x._id && 'border-start-primary border-2 me-0 pe-0'
                        }`}
                        key={idx}
                      >
                        <NavLink
                          className="justify-content-start w-100 pe-0 me-0"
                          onClick={(e) => handleTypeClick(e, x)}
                        >
                          <div className="w-100">
                            <div className="d-flex justify-content-between">
                              <span>{x?.name}</span>
                              <div className="column-action">
                                <UncontrolledDropdown>
                                  <DropdownToggle tag="div" className="btn btn-sm">
                                    <MoreVertical size={14} className="cursor-pointer" />
                                  </DropdownToggle>
                                  <DropdownMenu container="body">
                                    <DropdownItem
                                      className="w-100"
                                      onClick={() => {
                                        setActiveType(x);
                                        toggleAddContactType();
                                        setIsNew(false);
                                      }}
                                    >
                                      <Edit size={14} className="me-50" />
                                      <span className="align-middle">Edit</span>
                                    </DropdownItem>

                                    {['client', 'employee', 'lead'].includes(x.type) ? null : (
                                      <DropdownItem
                                        className="w-100"
                                        onClick={() => handleDeleteContactType(x)}
                                      >
                                        <Trash2 size={14} className="me-50" />
                                        <span className="align-middle">Delete</span>
                                      </DropdownItem>
                                    )}
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              </div>
                            </div>
                          </div>
                        </NavLink>
                      </NavItem>
                    );
                  })}
              </Nav>
            </div>
          </Col>
          <Col md="9">
            <Table contactType={activeType} setOpenAddContactType={setOpenAddContactType} />
          </Col>
        </Row>
      </Card>
      <AddContactTypeModal
        isNew={isNew}
        open={openAddContactType}
        toggle={toggleAddContactType}
        dispatch={dispatch}
        contactType={activeType}
        setContactType={setActiveType}
      />
    </div>
  );
};

export default ManageContacts;
