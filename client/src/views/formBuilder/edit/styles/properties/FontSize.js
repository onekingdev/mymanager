import React, { useState, useEffect } from 'react';
import { Input, Label, Col } from 'reactstrap';

export default function FontSize({ getSelectedHtmlElement }) {
  const [fontSize, setFontSize] = useState(16);
  const minFontSize = 8;
  const maxFontSize = 72;

  const handleFontsize = (e) => {
    let newFontSize = e.target.value;
    const element = getSelectedHtmlElement();
    element.addStyle({ 'font-size': newFontSize + 'px' });
    setFontSize(newFontSize);
  };

  useEffect(()=>{
    const element = getSelectedHtmlElement();
    let style= element.getStyle()
    if(style['font-size']){
      setFontSize(parseInt(style['font-size'].split('%')[0]));
    }else{
      setFontSize(0);
    }
  },[])

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-1">
      <Col xl="6" xs="6">
          <Label>Font Size</Label>
        </Col>
        <Col xl="4" >
          <Input type="range" min={minFontSize} max={maxFontSize} value={fontSize} onChange={handleFontsize} />
        </Col>
        <Col xl="1" xs="1">
          <Input className="countinput p-0" value={fontSize} onChange={handleFontsize} />
        </Col>
      </div>
    </>
  );
}
