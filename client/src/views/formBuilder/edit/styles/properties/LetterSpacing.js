import React from 'react';
import { Input, Label, Col } from 'reactstrap';

export default function LetterSpacing({ getSelectedHtmlElement }) {
  const [letterSpacing, setLetterSpacing] = React.useState(0);

  const minSpace = -10;
  const maxSpace = 20;


  // const handlestyle = (e, name) => {
  //   const element = getSelectedHtmlElement();
  //   element.addStyle({ [name]: e });
  // };


  const handlestyle = (e) => {
    let newSpacing = e.target.value;
    const element = getSelectedHtmlElement();
    element.addStyle({ 'letter-spacing': newSpacing + 'px' });
    setLetterSpacing(newSpacing);
  };

  React.useEffect(()=>{
    const element = getSelectedHtmlElement();
    let style= element.getStyle()
    if(style['letter-spacing']){
      setLetterSpacing(parseInt(style['letter-spacing'].split('%')[0]));
    }else{
      setLetterSpacing(0);
    }
  },[])


  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-1">
        <Col xl="6" xs="6">
          <Label>Letter Spacing</Label>
        </Col>
        <Col xl="4">
          <Input
            type="range"
            min={minSpace} max={maxSpace}
            value={letterSpacing}
            onChange={handlestyle}
          />
        </Col>
        <Col xl="1" xs="1">
          <Input className="countinput p-0" value={letterSpacing} onChange={handlestyle} />
        </Col>
      </div>
    </>
  );
}
