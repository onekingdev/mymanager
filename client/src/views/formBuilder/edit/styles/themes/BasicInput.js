import React, { useState } from 'react';
import { Button, Input, Label } from 'reactstrap';

export default function BasicInput({ getSelectedHtmlElement }) {

  const handleDefault = () => {
    const element = getSelectedHtmlElement();
        let attributes = getSelectedHtmlElement().getAttributes();
        getSelectedHtmlElement().setAttributes(attributes);
        element.addStyle({ 'box-shadow': '#E7E9EB',  'background-image': 'none',
       })

  }

  return (
    <>
      <button onClick={handleDefault} className="button-like-input">
        Basic Input
      </button>
    </>
  );
}

