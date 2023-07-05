import React from 'react'
import { Input, Label, } from 'reactstrap';

function LabelInput() {
    return (
        <div className="d-flex justify-content-between align-items-center mt-2">
            {/* <Col xl="12" xs="12">
                <div className='Label-Clean-Input'>
                    <Input
                        id="exampleEmail"
                        name="email"
                        placeholder="Clean Input"
                        type="email"
                    />
                </div>
            </Col> */}
            <div className='Gray-Label-Input'>
                <h3>Enter your Addresss</h3>
                {/* <div>
                    <Label for="addressLine1">Address Line 1</Label>
                    <Input type="text" name="addressLine1" id="addressLine1" placeholder="123 Main St" />
                </div> */}
                <div>
                    <Label for="addressLine2">Full Address </Label>
                    <Input type="text" name="addressLine2" id="addressLine2" placeholder="Full Address" />
                </div>
                <div>
                    <Label for="city">City</Label>
                    <Input type="text" name="city" id="city" placeholder="City" />
                </div>
                <div>
                    <Label for="state">State</Label>
                    <Input type="text" name="state" id="state" placeholder="State" />
                </div>
                <div>
                    <Label for="zipCode">Zip Code</Label>
                    <Input type="text" name="zipCode" id="zipCode" placeholder="Zip Code" />
                </div>
                <div>
                    <Label for="country">Country</Label>
                    <Input type="text" name="country" id="country" placeholder="Country" />
                </div>
                <div>
                    <Label for="exampleText">
                        Additional Information
                    </Label>
                    <Input
                        id="exampleText"
                        name="text"
                        type="textarea"
                        placeholder="Additional Information"
                    />
                </div>
            </div>
        </div>
    )
}

export default LabelInput