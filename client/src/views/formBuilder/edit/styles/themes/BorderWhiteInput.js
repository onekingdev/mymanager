import React, { useState } from 'react';
import { Button, Input, Label } from 'reactstrap';

export default function BorderWhiteInput({ getSelectedHtmlElement }) {
  const handleDefault = () => {
    const element = getSelectedHtmlElement();
    let attributes = getSelectedHtmlElement().getAttributes();
    getSelectedHtmlElement().setAttributes(attributes);
    element.addStyle({ 'font-weight': 'bold', 'background-image': 'none' });

  };

  return (
    <>
      <button onClick={handleDefault} className="button-like-input">
        Border White Input
      </button>
    </>
  );
}
