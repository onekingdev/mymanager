import React, { useEffect, useState } from 'react';
import { Button, Col, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import NewFamilyMember from './NewFamilyMember';

export default function FamilyMemberModal({
  open,
  toggle,
  member,
  dispatch,
  selectedFamily,
  setSelectedFamily,
  familyMembers,
  setFamilyMembers
}) {
  const [openAddFamily, setOpenAddFamily] = useState(false);

  const toggleAddFamily = () => setOpenAddFamily(!openAddFamily);
  const handleSelectedFamily = (e) => {
    if (e.target.checked === true) {
      setSelectedFamily([...selectedFamily, e.target.value]);
    } else {
      setSelectedFamily(selectedFamily.filter((x) => x !== e.target.value));
    }
  };

  useEffect(() => {
    if (member && member?.familyMembers) {
      let family = member.familyMembers.map((x) => {
        let t = { ...x, relation: member.family.find((y) => y.id === x._id).relation };
        return t;
      });
      setFamilyMembers(family);
    }
  }, [member]);

  return (
    <>
      <Modal isOpen={open} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>Add Family Members</ModalHeader>
        <ModalBody>
          <Row>
            <Col md="6">
              <Label>Search for a member to add to this family</Label>
              <Input type="text" placeholder="Search Member" />
            </Col>
            <Col md="6" className="mt-auto mb-0">
              <div>
                <Button color="primary" className="w-100" onClick={toggleAddFamily}>
                  Add new family member
                </Button>
              </div>
            </Col>
          </Row>
          <hr />
          <table className="table">
            <tr>
              <td>
                <div>
                  <h6>{member?.fullName}</h6>
                  <p>{member?.email}</p>
                </div>
              </td>
              <td>
                <div className="my-auto">
                  <p>Primary Account</p>
                </div>
              </td>
              <td></td>
            </tr>
            {familyMembers &&
              familyMembers.map((x, idx) => {
                return (
                  <tr key={idx}>
                    <td>
                      <div className="d-flex justify-content-start">
                        <Input
                          type="checkbox"
                          className="me-50"
                          value={x._id}
                          onChange={handleSelectedFamily}
                        />
                        <div>
                          <h6>{x?.fullName}</h6>
                          <p>{x?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p>{x?.relation}</p>
                    </td>
                  </tr>
                );
              })}
          </table>
          {/* <div className='d-flex justify-content-end mt-1'>
              <Button color='primary' onClick={handleAddFamilyMembership}>Add to Membership</Button>
          </div> */}
        </ModalBody>
      </Modal>
      <NewFamilyMember
        toggle={toggleAddFamily}
        open={openAddFamily}
        dispatch={dispatch}
        setFamilyMembers={setFamilyMembers}
        familyMembers={familyMembers}
        primaryMember={member}
      />
    </>
  );
}
