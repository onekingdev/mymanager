import React from 'react'
import { Input, Label } from 'reactstrap'

export default function ListType({getSelectedHtmlElement}) {
    const handleaddoptionforULorOL = (e) => {
      const element = getSelectedHtmlElement();
     
        const attributes = getSelectedHtmlElement().getAttributes();
        switch (e.target.value) {
          case 'order':
            
            break;
            case 'icon':
            
            break;
        
          default:
            break;
        }
      }
  return (
    <>
   <div>
   <Label>List Style</Label>
      <Input
        type="select"
        //getPopupContainer={() => document.getElementById('buttoninput')}
        onChange={handleaddoptionforULorOL}
      >
        <option value="order">Order List</option>
        <option value="icon">Icon List</option>
      </Input>
   </div>
   <div>
    <Label>Select Icon</Label>
    <Input type="select">
      <option value='fa fa-check'> Check</option>
      <option value='fa-solid fa-circle'>Circle</option>

    </Input>
   </div>
    </>
  )
}
