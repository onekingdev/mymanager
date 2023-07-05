import React, { useState } from 'react';
import { Input, Label, Col } from 'reactstrap';

export default function SubText({ getSelectedHtmlElement }) {
  const [textInput, setTextInput] = useState(() => {
    const selectedElement = getSelectedHtmlElement();
    const textElement = selectedElement?.find('span')[1]
    return textElement?.attributes?.content
  });

  const handleInput = (e) => {
    const newTextInput = e.target.value;
    const element = getSelectedHtmlElement();
    const textElement = element.find('span')[1]
    textElement?.set({ "content": newTextInput});
    setTextInput(newTextInput);
  };


  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-1">
        <Col xl="6" xs="6">
          <Label>Sub Text</Label>
        </Col>
        <Col xl="6">
          <Input type='text' value={textInput} onChange={handleInput} />
        </Col>
      </div>
    </>
  );
}
