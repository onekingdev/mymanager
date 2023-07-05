import React, { useState } from 'react'
import { Input, Label } from 'reactstrap'

export default function Float({getSelectedHtmlElement}) {
  const [float, setFloat] = useState('')
    const handleFloatChange = (e) => {
        const element = getSelectedHtmlElement();
        // element.style.float = value;
        element.addStyle({ 'float': e.target.value })
        setFloat(e.target.value)
      }

  return (
    <>
      <Label>Float</Label>
      <Input
        type="select"
        value={float}
        onChange={handleFloatChange}
      >
        <option value="initial">None</option>
        <option value="left">Left</option>
        <option value="right">Right</option>
      </Input>
    </>
  )
}
