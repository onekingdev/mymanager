import React from 'react'
import { Button, Input, Label } from 'reactstrap'
import { sendOrgEmailAction } from '../store/action'

export default function SendActivation({dispatch,stepper,org,setOrg,toggle}) {
    const handleInputChanged =(e)=>{
      setOrg({...org,message:e.target.value})
    }
    const handleSendMessage = ()=>{
      const payload =  {
        message:org?.message || '',
        organizationId:org._id
      }
      dispatch(sendOrgEmailAction(payload))
      toggle()
    }
  return (
    <>
    
    <div>
    <Label className="form-label" for="basicInput">
              Email Message
            </Label>
            <Input
              type="textarea"
              id="basicInput"
              placeholder="Enter Message"
              name="message"
              onChange={handleInputChanged}
            />
    </div>
    <div className='d-flex justify-content-end mt-50'>
            <Button color='primary' onClick={handleSendMessage}>
                Send
            </Button>
        </div>
    </>
  )
}
