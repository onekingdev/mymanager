import React, { useState } from 'react';
import { Input, Label, Nav, NavItem, NavLink } from 'reactstrap';

export default function AddressTheme({ getSelectedHtmlElement }) {
    const [active, setActive] = useState('1');
    const handleNavClicked = (tab) => {
        const element = getSelectedHtmlElement();
        element.removeClass(' Label-Clean-Input Gray-Label-Input Color-Label-Input ')
        element.addClass(tab);
        setActive(tab);
    };
    return (
        <>
            <div className="w-100">
                <Nav tabs vertical className="w-100">
                    <NavItem>
                        <NavLink
                            className="justify-content-start border-bottom"
                            active={active === 'Label-Clean-Input'}
                            onClick={() => handleNavClicked('Label-Clean-Input')}
                        >
                            <div className="w-100  d-flex justify-content-between align-items-center ">

                                <div className='Label-Clean-Input'>
                                    <h3>Enter your Addresss</h3>
                                    <div>
                                        <Label for="addressLine2">Full Address </Label>
                                        <Input type="text" name="addressLine2" id="addressLine2" placeholder="Full Address" disabled/>
                                    </div>
                                    <div>
                                        <Label for="city">City</Label>
                                        <Input type="text" name="city" id="city" placeholder="City"disabled />
                                    </div>
                                    <div>
                                        <Label for="state">State</Label>
                                        <Input type="text" name="state" id="state" placeholder="State"disabled />
                                    </div>
                                    <div>
                                        <Label for="zipCode">Zip Code</Label>
                                        <Input type="text" name="zipCode" id="zipCode" placeholder="Zip Code" disabled/>
                                    </div>
                                    <div>
                                        <Label for="country">Country</Label>
                                        <Input type="text" name="country" id="country" placeholder="Country"disabled />
                                    </div>
                                    <div>
                                        <Label for="exampleText">
                                            Additional Information
                                        </Label>
                                        <Input
                                            id="exampleText"
                                            name="text"
                                            type="textarea"
                                            placeholder="Additional Information"disabled
                                        />
                                    </div>
                                </div>
                            </div>
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink
                            className="justify-content-start border-bottom"
                            active={active === 'Gray-Label-Input'}
                            onClick={() => handleNavClicked('Gray-Label-Input')}
                        >
                            <div className="w-100  d-flex justify-content-between align-items-center mt-2">
                                <div className='Gray-Label-Input'>
                                    <h3>Enter your Addresss</h3>
                                    <div>
                                        <Label for="addressLine2">Full Address </Label>
                                        <Input type="text" name="addressLine2" id="addressLine2" placeholder="Full Address" disabled />
                                    </div>
                                    <div>
                                        <Label for="city">City</Label>
                                        <Input type="text" name="city" id="city" placeholder="City"disabled />
                                    </div>
                                    <div>
                                        <Label for="state">State</Label>
                                        <Input type="text" name="state" id="state" placeholder="State" disabled/>
                                    </div>
                                    <div>
                                        <Label for="zipCode">Zip Code</Label>
                                        <Input type="text" name="zipCode" id="zipCode" placeholder="Zip Code"disabled />
                                    </div>
                                    <div>
                                        <Label for="country">Country</Label>
                                        <Input type="text" name="country" id="country" placeholder="Country"disabled />
                                    </div>
                                    <div>
                                        <Label for="exampleText">
                                            Additional Information
                                        </Label>
                                        <Input
                                            id="exampleText"
                                            name="text"
                                            type="textarea"
                                            placeholder="Additional Information"disabled
                                        />
                                    </div>
                                </div>
                            </div>


                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className="justify-content-start border-bottom"
                            active={active === 'Color-Label-Input'}
                            onClick={() => handleNavClicked('Color-Label-Input')}
                        >
                            <div className=" w-100 d-flex justify-content-between align-items-center mt-2">
                                <div className='Color-Label-Input'>
                                    <h3>Enter your Addresss</h3>
                                    <div>
                                        <Label for="addressLine2">Full Address </Label>
                                        <Input type="text" name="addressLine2" id="addressLine2" placeholder="Full Address" disabled/>
                                    </div>
                                    <div>
                                        <Label for="city">City</Label>
                                        <Input type="text" name="city" id="city" placeholder="City" disabled/>
                                    </div>
                                    <div>
                                        <Label for="state">State</Label>
                                        <Input type="text" name="state" id="state" placeholder="State"disabled />
                                    </div>
                                    <div>
                                        <Label for="zipCode">Zip Code</Label>
                                        <Input type="text" name="zipCode" id="zipCode" placeholder="Zip Code"disabled />
                                    </div>
                                    <div>
                                        <Label for="country">Country</Label>
                                        <Input type="text" name="country" id="country" placeholder="Country"disabled />
                                    </div>
                                    <div>
                                        <Label for="exampleText">
                                            Additional Information
                                        </Label>
                                        <Input
                                            id="exampleText"
                                            name="text"
                                            type="textarea"
                                            placeholder="Additional Information"disabled
                                        />
                                    </div>
                                </div>
                            </div>



                        </NavLink>
                    </NavItem>
                </Nav>
            </div>
        </>
    );
}
