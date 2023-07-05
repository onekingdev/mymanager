import React, { useContext, useEffect, useState } from 'react';
import { Plus } from 'react-feather';
import SlideDown from 'react-slidedown';
import { Button, Col, Form, Input, Label, Row } from 'reactstrap';
import Repeater from '../../../../../../@core/components/repeater';



export default function CustomOptions({options,setOptions,handleSaveOptions}) {
  // ** State
  const [count, setCount] = useState(1);
  const [items, setItems] = useState([]);
  // ** Context

  const handleAddNew = () => {
    setCount(count + 1);
  };

  const handleOnChange = (e) => {
    const f = e.target.closest('form');
    let tempItem = items;
    tempItem = items?.map((item) => {
      let temp = item;
      if (String(temp.id) === f.id) {
        switch (e.target.name) {
          case 'value':
            temp = {...temp,value:e.target.value}
            
            break;
          case 'name':
            temp = {...temp,name:e.target.value}
            
            break;
          default:
            break;
        }
      }
      return temp;
    });
    setItems(tempItem);
    setOptions(tempItem)
  };
  useEffect(() => {
    setItems([...items, { id: count, name: '', value: '' }]);
  }, [count]);
  useEffect(() => {
    if (options && options.length > 0) {
      setCount(options.length);
    }
  }, [options]);

  return (
    <div>
        <Repeater count={count}>
        {(i) => {
          const Tag = i === 0 ? 'div' : SlideDown;
          return (
            <Tag key={i}>
              <Form id={i + 1}>
                <Row>
                  <Col md={6}>
                    <Label className="form-label">Value</Label>
                    <Input
                      type="text"
                      name="value"
                      value={options && options[i]?.value}
                      onChange={handleOnChange}
                    />
                  </Col>
                  <Col md={6}>
                    <Label className="form-label">Name</Label>
                    <Input
                      type="text"
                      name="name"
                      onChange={handleOnChange}
                      value={options && options[i]?.name}
                    />
                  </Col>
                </Row>
              </Form>
            </Tag>
          );
        }}
      </Repeater>
      <div className='d-flex justify-content-between'>
      <Button
        className="btn-icon ms-1 mb-2 mt-1 "
        style={{ padding: '2px' }}
        color="primary"
        onClick={handleAddNew}
      >
        <Plus />
      </Button>
      <Button
        className="btn-icon ms-1 mb-2 mt-1 "
       
        color="primary"
        onClick={handleSaveOptions}
      >
        save
      </Button>
      </div>
    </div>
  );
}
