import React, { useState } from 'react';
import { Button, Input, Label } from 'reactstrap';

export default function BlackUnderlineInput({ getSelectedHtmlElement }) {

  const handleDefault = () => {
    const element = getSelectedHtmlElement();
    let attributes = getSelectedHtmlElement().getAttributes();
    getSelectedHtmlElement().setAttributes(attributes);
    element.addStyle({
      'border-bottom': '5px solid #000',
      'font-weight': 'normal',
      'background-color': 'none',
      'border': 'none'
    });
  };

  return (
    <>
      <button onClick={handleDefault} className="button-like-input">
        Black Underline Input
      </button>
    </>
  );
}
