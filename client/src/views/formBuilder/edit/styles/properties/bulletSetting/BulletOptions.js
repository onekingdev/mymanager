import React, { useState } from 'react';
import { Input, Label } from 'reactstrap';
import CustomOptions from './CustomOptions';

export default function BulletOptions({ getSelectedHtmlElement }) {
  const [options, setOptions] = useState([]);
  const handleSaveOptions = () => {
    if (options.length > 0) {
      for (const option of options) {
        getSelectedHtmlElement().append({
            tagName: 'li',
            components: [
              {
                tagName: 'i',
                components: '',
                hoverable: false,
                badgable: false,
                draggable: false,
                droppable: false,
                selectable: false,
                attributes: { class: 'fa fa-check' }
              },
              {
                tagName: 'span',
                content: option.name,
                type: 'text',
                hoverable: false,
                badgable: false,
                draggable: false,
                droppable: false,
                selectable: false,
                attributes: { class: 'bullet-list-content' }
              }
            ],
            layerable: false,
            droppable: false,
            draggable: false,
            selectable: false,
            hoverable: false,
          });
      }
    }
  };
  const handleaddoptionforULorOL = (e) => {
      switch (e.target.value) {
        case 'order':
            getSelectedHtmlElement().addStyle({'list-style':'decimal'})
           
            for (let i = 0; i< getSelectedHtmlElement().components().length;i++) {
                let att = getSelectedHtmlElement().getChildAt(i).getChildAt(0).getAttributes()
                att = {...att,class:'fa'}
                getSelectedHtmlElement().getChildAt(i).getChildAt(0).setAttributes(att)
            }
          break;
          case 'icon':
            getSelectedHtmlElement().addStyle({'list-style':'none'})
            for (let i = 0; i< getSelectedHtmlElement().components().length;i++) {
                let att = getSelectedHtmlElement().getChildAt(i).getChildAt(0).getAttributes()
                att = {...att,class:'fa fa-check'}
                getSelectedHtmlElement().getChildAt(i).getChildAt(0).setAttributes(att)
            }
          break;
      
        default:
          break;
      }
    }
    const handleSelectIcon = (e)=>{
        for (let i = 0; i< getSelectedHtmlElement().components().length;i++) {
            let att = getSelectedHtmlElement().getChildAt(i).getChildAt(0).getAttributes()
            att = {...att,class:e.target.value}
            getSelectedHtmlElement().getChildAt(i).getChildAt(0).setAttributes(att)
        }
    }
  return (
    <>
      <div>
        <Label>List Type</Label>
        <Input
          type="select"
          //getPopupContainer={() => document.getElementById('buttoninput')}
          onChange={handleaddoptionforULorOL}
        >
          <option value="order">Order List</option>
          <option value="icon">Icon List</option>
        </Input>
      </div>
      <div>
        <Label>Select Icon</Label>
        <Input type="select" onChange={handleSelectIcon}>
          <option value="fa fa-check"> Check</option>
          <option value="fa-solid fa-circle">Circle</option>
        </Input>
      </div>
      <div>
        <Label>Add Options</Label>
        <CustomOptions
          options={options}
          setOptions={setOptions}
          handleSaveOptions={handleSaveOptions}
        />
      </div>
    </>
  );
}
