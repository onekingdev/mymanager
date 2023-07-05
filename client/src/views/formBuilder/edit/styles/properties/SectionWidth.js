import React from 'react'
import { Input, Label } from 'reactstrap';

export default function SectionWidth({getSelectedHtmlElement}) {
    const handleSectionWidthChange = (e) => {
        let element = getSelectedHtmlElement();
       
        //attributes = {...attributes,class:`section-row ${e.target.value}`}
        element.removeClass('section-full-width section-wide section-medium section-small')
        element.addClass(e.target.value)

        //getSelectedHtmlElement().setAttributes(attributes);
      }
  return (
    <>
    <Label>Width</Label>
      <Input
        type="select"
        onChange={handleSectionWidthChange}
        //getPopupContainer={() => document.getElementById('buttoninput')}
      >
     <option value="section-full-width">Full Page</option>
          <option value="section-wide">Wide</option>
          <option value="section-medium">Medium</option>
          <option value="section-small">Small</option>
      </Input>
    </>
  )
}
