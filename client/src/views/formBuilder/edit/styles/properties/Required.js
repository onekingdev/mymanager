import React, { useEffect } from 'react'
import { FormGroup, Input, Label } from 'reactstrap'

export default function Required({getSelectedHtmlElement}) {
    const handleaddatribute = (e) => {
        let attributes = getSelectedHtmlElement().getAttributes()
        attributes = {...attributes,required:e.target.checked}
        getSelectedHtmlElement().setAttributes(attributes)
        
    }
    useEffect(()=>{
      let attr = getSelectedHtmlElement().getAttributes()
      if(attr.required=== undefined){
        attr = {...attr,required:true}
        getSelectedHtmlElement().setAttributes(attr)
      }
    },[])
  return (
    <>
    <div className="d-flex justify-content-start align-items-center mt-1">
    <Input type='checkbox' defaultChecked onChange={handleaddatribute}/> <Label className='ms-50 my-auto'>Required</Label>
   
    </div>
    
    </>
  )
}
