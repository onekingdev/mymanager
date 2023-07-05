import React, { useState } from 'react';
import { Button, Input, Label } from 'reactstrap';

export default function SimpleCleanInput({ getSelectedHtmlElement }) {

  const handleDefault = () => {
    const element = getSelectedHtmlElement();
    let attributes = getSelectedHtmlElement().getAttributes();
    getSelectedHtmlElement().setAttributes(attributes);
    element.addStyle({
      'background-image': 'none',
      'font-weight': 'normal',
      'background-color': 'none',
    });

  };

  return (
    <>
      <button onClick={handleDefault} className="button-like-input">
        Simple Clean Input
      </button>
    </>
  );
}
