import React from 'react';
import { Input, Label, Col } from 'reactstrap';
import FontFamily from '../../configuration/fontfamily';

const styleType = {
  fontFamily: 'font-family'
};

const removePreviousFontFamiles = (element) => {
 
};
export default function Font({ getSelectedHtmlElement }) {
  const existingFontFamilies = React.useMemo(() => {
    return FontFamily.families
    .map((value) => value.split(' ').join('-'))
    .reduce((acc, val) => {
      acc[val] = true;
      return acc;
    }, []);
  }, [])
  
  const handlestyle = (e, name) => {
    const element = getSelectedHtmlElement();
    if (name === styleType.fontFamily) {
      const classes = element.getClasses();
      const fontFamilyClass = classes.filter(cls => existingFontFamilies[cls])
      fontFamilyClass.forEach(cls => {
        element.removeClass(cls);
      });
      const cls = e.target.value.split(' ').join('-');
      element.addClass(cls);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-1">
        <Col xl="6" xs="6">
          <Label>Font</Label>
        </Col>
        <Col xl="6">
          <Input
            type="select"
            onChange={(e) => {
              handlestyle(e, styleType.fontFamily);
            }}
          >
            {FontFamily.families.map((item, i) => {
              return (
                <option value={item} key={i}>
                  {item}
                </option>
              );
            })}
          </Input>
        </Col>
      </div>
    </>
  );
}
