import React, { useState } from 'react';
import { Input, Label, Col } from 'reactstrap';

export default function TextColor({ getSelectedHtmlElement }) {
  const [style, setStyle] = useState(() => ({
    current: getSelectedHtmlElement().getStyle('color') || '',
    previous: ''
  }));

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    const name = e.target.name;
    const element = getSelectedHtmlElement();
    if (element) {
      element.addStyle({ [name]: e.target.value });
      setStyle(newColor);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-1">
        <Col xl="6" xs="3">
          <Label>Text color</Label>
        </Col>
        <Col xl="6" xs="6">
          <Input
            className="p-0"
            style={{
              // width: 230,
              height: '40px'
            }}
            name="color"
            value={style.current}
            size="small"
            type="color"
            onChange={handleColorChange}
          />
        </Col>
      </div>
    </>
  );
}
