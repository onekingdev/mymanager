import React, { useState } from 'react';
import { Button, Input, Label } from 'reactstrap';

export default function BasicBgInput({ getSelectedHtmlElement }) {

  const handleDefault = () => {
    const element = getSelectedHtmlElement();
    let attributes = getSelectedHtmlElement().getAttributes();
    getSelectedHtmlElement().setAttributes(attributes);
    element.addStyle({
      'background-color': '#000',
      'color': '#fff'
    });

  };

  return (
    <>
      <button onClick={handleDefault} className="button-like-input">
        Basic Bg Input
      </button>
    </>
  );
}
