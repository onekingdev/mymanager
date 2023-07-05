import React, { useState } from 'react';
import { Button, Input, Label } from 'reactstrap';

export default function GradientNoIcon3dInput({ getSelectedHtmlElement }) {

  const handleDefault = () => {
    const element = getSelectedHtmlElement();
    let attributes = getSelectedHtmlElement().getAttributes();
    getSelectedHtmlElement().setAttributes(attributes);
    element.addStyle({
      'background-image':
        'linear-gradient(to bottom, rgba(255,255,255,0.5), rgba(255,255,255,0.2) 49%, rgba(0,0,0,0.15) 51%, rgba(0,0,0,0.05))',
        'background-repeat': 'repeat-x'
    });

  };

  return (
    <>
      <button onClick={handleDefault} className="gradientNoIcon3dInput">
        3D Gradient (no icon) Input
      </button>
    </>
  );
}
