import React, { useState } from 'react';
import { Button, Input, Label } from 'reactstrap';

export default function GrayBorderInput({ getSelectedHtmlElement }) {

  const handleDefault = () => {
    const element = getSelectedHtmlElement();
    let attributes = getSelectedHtmlElement().getAttributes();
    getSelectedHtmlElement().setAttributes(attributes);
    element.addStyle({ 'border': '1px solid gray', 'background-image': 'none' });

  };

  return (
    <>
      <button onClick={handleDefault} className="button-like-input">
        Gray Border Input
      </button>
    </>
  );
}
