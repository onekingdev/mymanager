import React, { useEffect, useState } from 'react'
import { Input, Label, Col } from 'reactstrap';

export default function TextTransform({ getSelectedHtmlElement }) {
  const [textTransform, setTextTransform] = useState(
    getSelectedHtmlElement().getStyle('text-transform')
  );

  const handlestyle = (e) => {
    const element = getSelectedHtmlElement();
    element.addStyle({ 'text-transform': e.target.value });
    setTextTransform(e.target.value)
  }

  // useEffect(()=>{
  //   const element = getSelectedHtmlElement();
  //   let style= element.getStyle()
  //   if(style['text-transform']){
  //     setTextTransform(parseInt(style['text-transform'].split('%')[0]));
  //   }else{
  //     setTextTransform(0);
  //   }
  // },[])



  // const handlestyle = (e, name) => {
  //   const element = getSelectedHtmlElement();
  //   element.style[name] = e.target.value;
  // };
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-1">
        <Col xl="6" xs="6">
          <Label>Text Transform</Label>
        </Col>
        <Col xl="6" xs="6">
          <Input
            type="select"
            value={textTransform}
            onChange={handlestyle}
          >
            <option value="normal">Normal</option>
            <option value="uppercase">Uppercase</option>
            <option value="lowercase">Lowercase</option>
            <option value="capitalize">Capitalize</option>
          </Input>
        </Col>
      </div>
    </>
  )
}
