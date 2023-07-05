import React, { useState } from 'react';
import { Button, Card, CardBody, CardHeader, CardText, CardTitle, Col, Input, Label, Row } from 'reactstrap';
import FamilyMemberModal from './FamilyMemberModal';

export default function NewContactForm(
  {stepper,
  buyer,
  setBuyer,
  cart,
  setCart,
  selectedFamily,
  setSelectedFamily,
  dispatch}
) {
  const [openFamilyMembers, setOpenFamilyMembers] = useState(false);
  const [familyMembers, setFamilyMembers] = useState([]);

  const toggleOpenFamilyMember = () => setOpenFamilyMembers(!openFamilyMembers);

  const handleInputChange = (e) => {
    setBuyer({ ...buyer, [e.target.name]: e.target.value });
  };
  const handleAddressChange = (e) => {
    let temp = buyer;
    setBuyer({ ...buyer, address: { ...temp.address, [e.target.name]: e.target.value } });
  };
  return (
    <div>
      <Row>
        <Col md="8">
          <Card>
            <CardBody>
              <h4>Member Details</h4>
              <div>
                <Label>Name</Label>
                <Input
                  type="text"
                  name="fullName"
                  value={buyer?.fullName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label>email</Label>
                <Input type="text" name="email" value={buyer?.email} onChange={handleInputChange} />
              </div>
              <div>
                <Label>Phone Number</Label>
                <Input type="text" name="phone" value={buyer?.phone} onChange={handleInputChange} />
              </div>
              <Row>
                <Col md="8">
                  <div>
                    <Label>Street</Label>
                    <Input
                      type="text"
                      name="street"
                      value={buyer?.address?.street}
                      onChange={handleAddressChange}
                    />
                  </div>
                </Col>
                <Col md="4">
                  <div>
                    <Label>Zip Code</Label>
                    <Input
                      type="text"
                      name="zipCode"
                      value={buyer?.address?.zipCode}
                      onChange={handleAddressChange}
                    />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col md="4">
                  <div>
                    <Label>City</Label>
                    <Input
                      type="text"
                      name="city"
                      value={buyer?.address?.city}
                      onChange={handleAddressChange}
                    />
                  </div>
                </Col>
                <Col md="4">
                  <div>
                    <Label>State</Label>
                    <Input
                      type="text"
                      name="state"
                      value={buyer?.address?.state}
                      onChange={handleAddressChange}
                    />
                  </div>
                </Col>
                <Col md="4">
                  {' '}
                  <div>
                    <Label>Country</Label>
                    <Input
                      type="text"
                      name="country"
                      value={buyer?.address?.country}
                      onChange={handleAddressChange}
                    />
                  </div>
                </Col>
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
                  
                  <CardText>{buyer?.email}</CardText>
                  <CardText>{buyer?.phone}</CardText>
                </div>
              )}
              {selectedFamily?.length > 0 && (
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
              <Button color="primary" onClick={() => stepper.next()}>
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
    </div>
  );
}
