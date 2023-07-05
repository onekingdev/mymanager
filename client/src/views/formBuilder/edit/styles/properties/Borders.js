import React, { useEffect, useState } from 'react';
import { Input, Label, Col } from 'reactstrap';

export default function Borders({ getSelectedHtmlElement }) {
  const element = getSelectedHtmlElement();
  const [type, setType] = useState(getBorderType(element));
  const [style, setStyle] = useState(getBorderProp(element, borders.borderStyle));
  const [color, setColor] = useState(getBorderProp(element, borders.borderColor));
  const [size, setSize] = useState(getBorderProp(element, borders.borderSize));
  // const [isBorder, setIsBorder] = useState(!!getBorderProp(element, borders.borderSize));

  useEffect(() => {
    const element = getSelectedHtmlElement();
    element.addStyle({
      [borders.borderSizeBottom]: 0,
      [borders.borderSizeTop]: 0,
      [borders.borderSizeRight]: 0,
      [borders.borderSizeLeft]: 0
    });
    switch (type) {
      case borderTypes.none:
        break;
      case borderTypes.full:
        element.addStyle({
          [borders.borderSizeBottom]: size,
          [borders.borderSizeTop]: size,
          [borders.borderSizeRight]: size,
          [borders.borderSizeLeft]: size
        });
        break;
      case borderTypes.bottom:
        element.addStyle({ [borders.borderSizeBottom]: size });
        break;
      // case 'top':
      //   element.addStyle({ [borders.borderSizeTop]: size });
      //   break;
      case borderTypes.top_bottom:
        element.addStyle({ [borders.borderSizeBottom]: size });
        element.addStyle({ [borders.borderSizeTop]: size });
        break;
    }

    element.addStyle({
      [borders.borderColor]: color,
      [borders.borderStyle]: style
    });
  }, [type, style, color, size]);

  const setTypeToFullBorderIfNone = () => {
    if (borderTypes.none) {
      setType(borderTypes.full)
    }
  }

  return (
    <>
      <div>
        <hr />
        <Label>Borders</Label>
        <div className="d-flex justify-content-between align-items-center mt-1">
          <Col xl="6" xs="6">
            <Label> Color</Label>
          </Col>
          <Col xl="6" xs="6">
            <Input
              className="p-0"
              style={{
                height: '40px'
              }}
              size="small"
              type="color"
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
                setTypeToFullBorderIfNone()
              }}
            />
          </Col>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-1">
          <Col xl="6" xs="6">
            <Label> Style</Label>
          </Col>
          <Col xl="6" xs="6">
            <Input
              type="select"
              value={style}
              onChange={(e) => {
                setStyle(e.target.value);
                setTypeToFullBorderIfNone()
              }}
            >
              <option value="solid">Solid</option>
              <option value="dotted">Dotted</option>
            </Input>
          </Col>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-50">
          <Col xl="6" xs="6">
            <Label>Size</Label>
          </Col>
          <Col xl="6" xs="6">
            <Input
              type="select"
              value={size}
              onChange={(event) => {
                setSize(event.target.value);
                setTypeToFullBorderIfNone()
              }}
            >
              <option value="inherit">inherit</option>
              <option value="0">none</option>
              <option value="1px">1px</option>
              <option value="2px">2px</option>
              <option value="3px">3px</option>
              <option value="4px">4px</option>
              <option value="5px">5px</option>
              <option value="10px">10px</option>
            </Input>
          </Col>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-1">
          <Col xl="6" xs="6">
            <Label>Type</Label>
          </Col>
          <Col xl="6" xs="6">
            <Input
              type="select"
              value={type}
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              <option value={borderTypes.none}>No Border</option>
              <option value={borderTypes.full}>Full Border</option>
              <option value={borderTypes.bottom}>Bottom Border</option>
              <option value={borderTypes.top_bottom}>Top & Bottom Border</option>
            </Input>
          </Col>
        </div>

        <hr />
      </div>
    </>
  );
}

const borders = {
  borderStyle: 'border-style',
  borderColor: 'border-color',
  borderSize: 'border-width',
  borderSizeBottom: 'border-bottom-width',
  borderSizeTop: 'border-top-width',
  borderSizeRight: 'border-right-width',
  borderSizeLeft: 'border-left-width'
};

const borderTypes = {
  full: 'full',
  none: 'none',
  bottom: 'bottom',
  top_bottom: 'top_bottom'
};

const getBorderType = (element) => {
  const btmBorderSize = element.getStyle(borders.borderSizeBottom);
  const topBorderSize = element.getStyle(borders.borderSizeTop);
  const leftBorderSize = element.getStyle(borders.borderSizeLeft);
  const rightBorderSize = element.getStyle(borders.borderSizeRight);

  if (btmBorderSize && topBorderSize && leftBorderSize && rightBorderSize) {
    return borderTypes.full;
  } else if (btmBorderSize && topBorderSize && !leftBorderSize && !rightBorderSize) {
    return borderTypes.top_bottom;
  } else if (btmBorderSize) {
    return borderTypes.bottom;
  } else {
    return borderTypes.none;
  }
};
const getBorderProp = (element, styleProp) => {
  switch (styleProp) {
    case borders.borderSize:
      return (
        element.getStyle(borders.borderSizeBottom) ||
        element.getStyle(borders.borderSizeTop) ||
        element.getStyle(borders.borderSizeLeft) ||
        element.getStyle(borders.borderSizeRight) || '1px'
      );
    case borders.borderColor:
      return element.getStyle(borders.borderColor) || 'black';
    case borders.borderStyle:
      return element.getStyle(borders.borderStyle) || 'solid';
  }
};
