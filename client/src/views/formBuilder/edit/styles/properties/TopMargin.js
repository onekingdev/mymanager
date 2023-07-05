import React, { useEffect, useState } from 'react';
import { Input, Label, Col, Progress } from 'reactstrap';

export default function TopMargin({ getSelectedHtmlElement }) {
  const [marginTop, setMarginTop] = useState(0);

  const handleMarginTop = (e) => {
    let margin = e.target.value;
    const element = getSelectedHtmlElement();
    element.addStyle({ 'margin-top': margin + '%' });
    setMarginTop(margin);
  };

  useEffect(() => {
    const element = getSelectedHtmlElement();
    let style = element.getStyle();
    if (style['margin-top']) {
      setMarginTop(parseInt(style['margin-top'].split('%')[0]));
    } else {
      setMarginTop(0);
    }
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-1">
        <Col xl="6" xs="6">
          <Label>Top Margin</Label>
        </Col>
        <Col xl="4" className="my-auto">
          <Input
            type="range"
            min={-20}
            max={20}
            step={1}
            value={marginTop}
            onChange={handleMarginTop}
          />
        </Col>
        <Col xl="1" xs="1">
          <Input
            className="countinput p-0 text-center"
            value={`${marginTop}`}
            onChange={handleMarginTop}
            style={{ width: '30px' }}
          />
        </Col>
      </div>
      <hr />
    </>
  );
}
