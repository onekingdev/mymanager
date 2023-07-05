import React from 'react'
import { Input, Label } from 'reactstrap'

export default function NewLocationForm({form, handleInputChanged}) {
  return (
    <>
     <div>
          <Label>Name</Label>
          <Input type="text" name='name' placeholder="Enter Org Name" onChange={handleInputChanged}/>
        </div>
        <div>
          <Label>Email</Label>
          <Input type="text" name='email' placeholder="Enter Org Email" onChange={handleInputChanged}/>
        </div>
        <div>
          <Label>Contact</Label>
          <Input type="number" name='contact' placeholder="Enter Org Contact Number" onChange={handleInputChanged}/>
        </div>
        <div>
          <Label>Full Address</Label>
          <Input type="text" name='address' placeholder="Enter Org Full Address" onChange={handleInputChanged}/>
        </div>
    </>
  )
}
