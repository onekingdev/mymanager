import React, { useState } from 'react';
import { Button, Input, Label } from 'reactstrap';

export default function LightGrayInput({ getSelectedHtmlElement }) {

  const handleDefault = () => {
    const element = getSelectedHtmlElement();
    let attributes = getSelectedHtmlElement().getAttributes();
    getSelectedHtmlElement().setAttributes(attributes);
    element.addStyle({ 'color': 'red !important', 'background-image': 'none' });

  };

  return (
    <>
      <button onClick={handleDefault} className="button-like-input">
        Light Gray Input
      </button>
    </>
  );
}
