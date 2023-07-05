import React, { useEffect, useState } from 'react';

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
  TabContent,
  TabPane,
  UncontrolledDropdown
} from 'reactstrap';
import { getContactTypeByOrgAction } from '../../../../store/action';
import AddContactType from '../contacts/AddContactType';
import { Edit, MoreVertical, Trash2 } from 'react-feather';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { deleteContactTypeByIdAction } from '../../../../../contacts/store/actions';

export default function ContactManagementTab({ dispatch, selectedOrg }) {
  const [activeContact, setActiveContact] = useState('1');
  const [contactTypes, setContactTypes] = useState([]);
  const [selectedContactType, setSelectedContactType] = useState(null);
  const [openAddContactType, setOpenAddContactType] = useState(false);

  const mySwal = withReactContent(Swal);

  const toggleAddContactType = () => setOpenAddContactType(!openAddContactType);


  const handleDeleteContactType = async (x) => {
    const res = await mySwal.fire({
        titleText:"Delete Contact Type",
        text:"By deleting contact type, all your contacts with this type will transfer to Client. Are you sure you want to delete? ",
        icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete anyway',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    })
    
    if (res.value){
        //delete contact type
        dispatch(deleteContactTypeByIdAction(x._id,x)).then(res=>{

            dispatch(getContactTypeByOrgAction(selectedOrg._id)).then(result=>{
                setContactTypes(result)
            })
            
        })
    }
  };

  useEffect(() => {
    //get contact types
    if (selectedOrg) {
      dispatch(getContactTypeByOrgAction(selectedOrg._id)).then((res) => {
        if (res?.length > 0) {
          setContactTypes(res);
        }
      });
    }
  }, [selectedOrg]);
  return (
    <div>
      <h6>Manage contacts for the organization</h6>

      <Card className="px-0 mx-0">
        <Row>
          <Col md="3" className="border-end me-0 pe-0" style={{ minHeight: '70vh' }}>
            <div className="my-2">
              <div className="justify-content-center"></div>
              <Nav vertical tabs>
                <Button color="primary" className="mx-auto mb-1" onClick={toggleAddContactType}>
                  New Contact Type
                </Button>
                {contactTypes?.map((x, idx) => {
                  return (
                    <NavItem
                      className={`${
                        activeContact === x._id && 'border-start-primary border-2 me-0 pe-0'
                      }`}
                      key={idx}
                    >
                      <NavLink
                        className="justify-content-start w-100 pe-0 me-0"
                        onClick={() => setActiveContact(x._id)}
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
                                      setSelectedContactType(x);
                                      toggleAddContactType();
                                    }}
                                  >
                                    <Edit size={14} className="me-50" />
                                    <span className="align-middle">Edit</span>
                                  </DropdownItem>

                                  {
                                    ['client','employee','lead'].includes(x.type)? null :(
                                        <DropdownItem className="w-100" onClick={()=>handleDeleteContactType(x)}>
                                    <Trash2 size={14} className="me-50" />
                                    <span className="align-middle">Delete</span>
                                  </DropdownItem>
                                    )
                                  }
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
            <TabContent activeTab={activeContact}>
              <TabPane></TabPane>
            </TabContent>
          </Col>
        </Row>
      </Card>
      <AddContactType
        open={openAddContactType}
        toggle={toggleAddContactType}
        orgId={selectedOrg._id}
        dispatch={dispatch}
        setContactTypes={setContactTypes}
        contactType={selectedContactType}
        setContactType={setSelectedContactType}
      />
    </div>
  );
}
