import React from 'react';
import { Col, Input, Label } from 'reactstrap';

export default function Spacing({ getSelectedHtmlElement }) {
  const [bulletSpace, setBulletSpace] = React.useState(0);

  const handleSpaceChange = (e) => {
    const element = getSelectedHtmlElement();
    let attributes = element.getAttributes();
    attributes = { ...attributes, space: e.target.value };
    getSelectedHtmlElement().setAttributes(attributes);
    element.addStyle({ gap: e.target.value + 'px' });
    setBulletSpace(e.target.value);
  };

  React.useEffect(() => {
    const element = getSelectedHtmlElement();
    let style = element.getStyle();
    if (style['gap']) {
      setBulletSpace(parseInt(style['gap'].split('%')[0]));
    } else {
      setBulletSpace(0);
    }
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-1">
        <Col xl="6" xs="6">
          <Label>Spacing</Label>
        </Col>
        <Col xl="4" className="my-auto">
          <Input type="range" value={bulletSpace} onChange={handleSpaceChange} />
        </Col>
        <Col xl="1">
          <Input className="countinput p-0" value={bulletSpace} onChange={handleSpaceChange} />
        </Col>
      </div>
    </>
  );
}
