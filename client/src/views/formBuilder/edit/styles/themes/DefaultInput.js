import React, { useState } from 'react';
import { Button, Input, Label } from 'reactstrap';

export default function DefaultInput({ getSelectedHtmlElement }) {

  const handleDefault = () => {
    const element = getSelectedHtmlElement();
        let attributes = getSelectedHtmlElement().getAttributes();
        getSelectedHtmlElement().setAttributes(attributes);
        element.addStyle({ 'box-shadow': '2px 2px 2px 2px #E7E9EB', 'background-image': 'none' })

  }

  return (
    <>
      <button onClick={handleDefault} className="button-like-input">
        Default Input
      </button>
    </>
  );
}
