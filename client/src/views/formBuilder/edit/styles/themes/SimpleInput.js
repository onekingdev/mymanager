import React, { useState } from 'react';
import { Button, Input, Label } from 'reactstrap';

export default function SimpleInput({ getSelectedHtmlElement }) {
  const handleDefault = () => {
    const element = getSelectedHtmlElement();
    let attributes = getSelectedHtmlElement().getAttributes();
    getSelectedHtmlElement().setAttributes(attributes);
    element.addStyle({
      'font-weight': 'normal',
      'background-image': 'none',
      'border-bottom': '',
      'font-weight': 'normal',
      'background-color': 'none',
      border: ''
    });
  };

  return (
    <>
      <button onClick={handleDefault} className="button-like-input">
        Simple Input
      </button>
    </>
  );
}
