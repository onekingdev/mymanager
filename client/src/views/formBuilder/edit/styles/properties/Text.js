import React, { useState, useEffect } from 'react';
import { Input, Label, Col } from 'reactstrap';


const getTagName = (e) => e.attributes.tagName
export default function Text({ getSelectedHtmlElement }) {
  const [textInput, setTextInput] = useState(() => {
    const selectedElement = getSelectedHtmlElement();
    if (getTagName(selectedElement) === "button") {
      const textElement = selectedElement?.find('span')[0]
      return textElement?.attributes?.content
    } else if (getTagName(selectedElement) === "h3") {
      return selectedElement?.attributes?.content
    }else if(getTagName(selectedElement) === "p"){
      return selectedElement.attributes?.content
    }else if(getTagName(selectedElement) === "p"){
      return selectedElement.attributes?.content
    }
  });

  const handleInput = (e) => {
    const newTextInput = e.target.value;
    const element = getSelectedHtmlElement();
    if (getTagName(element) === "button") {
      const textElement = element.find('span')[0]
      textElement?.set({ "content": newTextInput});
    } else if (getTagName(element) === "h3") {
      element?.set({ "content": newTextInput})
    }else if (getTagName(element) === "p"){
      element.set({ "content": newTextInput})
    }else if(getTagName(selectedElement) === "p"){
      return selectedElement.attributes?.content
    }
    setTextInput(newTextInput);
  };

  return (
    <div className="d-flex justify-content-between align-items-center mt-1">
      <Col xl="6" xs="6">
        <Label>Text</Label>
      </Col>
      <Col xl="6">
      <Input type='textarea' value={textInput} onChange={handleInput} />
      </Col>
    </div>
  );
}
