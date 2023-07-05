import React from 'react';
import { Input, Label } from 'reactstrap';

export default function Sticky({ getSelectedHtmlElement }) {
  const handleStickyChange = (e) => {
    if(e.target.checked===true){
      getSelectedHtmlElement().addClass('sticky')
    }
    else{
      getSelectedHtmlElement().removeClass('sticky')
    }
  };
  return (
    <>
      <div class="form-check form-switch my-1">
        <Input
          class="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckChecked"
          onChange={handleStickyChange}
        />
        <label class="form-check-label" for="flexSwitchCheckChecked">
          Sticky
        </label>
      </div>
    </>
  );
}
