import React, { useEffect, useState } from 'react'
import { RiContactsBookLine } from 'react-icons/ri';
import SlideDown from 'react-slidedown';
import { Button, Col, Form, Input, InputGroup, InputGroupText, Label, Row } from 'reactstrap';
import Repeater from '../../../@core/components/repeater';
import Select from 'react-select';
import { Trash2 } from 'react-feather';
import ContactModal from './ContactModal';

export default function UsersRepeatingForm({recipients,setRecipients}) {
    // ** State
    const [count, setCount] = useState(1);
    const [contactsModal, setContactsModal] = useState(false);
    const [active, setActive] = useState('1');

    const toggle =  (tab)=>setActive(tab);
    const toggleContactModal = ()=>setContactsModal(!contactsModal)

    const onFormChanged = (e,rec)=>{
      let temp = recipients;
      temp = temp.map(x=>{
        let t = x;
        if(rec.id===t.id){
          t = {...t,[e.target.name]:e.target.value}
        }
        return t;
      })
      setRecipients(temp)
    }
    const increaseCount = () => {
        setCount(count + 1);
      };
      const deleteForm = (e) => {
        e.preventDefault();
        let temp = recipients;
    
          if (String(recipients[0].id) === e.target.id) {
            if (temp.length > 1) {
              temp[1].active = true;
            }
          }
          temp = temp.filter((x) => x.id.toString() != e.target.id);
          setRecipients(temp);
          setCount(count + 1);
      };

      useEffect(()=>{
        setCount(recipients.length + 1)
        setRecipients([
            ...recipients,
            {
              id: crypto.randomUUID(),
              name: '',
              email: '',
            
              active: true,
            
            }
          ]);
      },[])
  return (
 <>
   <Repeater count={recipients.length}>
    {(i) =>{
        const Tag = i===0?'div':SlideDown;
        return(
            <Tag key={i}>
                <Form>
                <div
                  style={{
                    margin: '20px 0 20px 0',
                    display: 'flex',
                    width: '100%',
                    border: '1px solid #ced4da'
                  }}
                >
                  
                  <div
                    style={{
                      width: '99%'
                    }}
                  >
                    <Row
                      style={{
                        margin: '15px 15px 15px 0'
                      }}
                    >
                      <Col md={10}>
                        <Col sm="12" className="mb-1">
                          <Label className="form-label" for="nameVertical">
                            Name
                          </Label>
                          <InputGroup className="mb-2">
                            <Input
                              id="nameVertical"
                              data-id={recipients[i].id}
                              placeholder="search..."
                              onChange={(e)=>onFormChanged(e,recipients[i])}
                              name="name"
                              value={recipients[i]?.name}
                             
                            />
                            <InputGroupText>
                              <RiContactsBookLine
                                size={18}
                                className="cursor-pointer"
                                onClick={toggleContactModal}
                              />
                            </InputGroupText>
                          </InputGroup>
                        </Col>
                        <Col sm="12">
                          <Label className="form-label" for="EmailVertical">
                            Email
                          </Label>
                          <Input
                            type="email"
                            name="email"
                            data-id={recipients[i].id}
                            id="EmailVertical"
                            placeholder="Email"
                            onChange={(e)=>onFormChanged(e,recipients[i])}
                            value={recipients[i]?.email}
                            
                          />
                        </Col>
                      </Col>
                      
                      <Col md={2}>
                        <Button
                          onClick={deleteForm}
                          id={recipients[i].id}
                          className="text-nowrap text-secondary float-end mt-2"
                          color="link"
                        >
                          <Trash2
                            size={20}
                            style={{ pointerEvents: 'none' }}
                            //  style={{pointerEvents:"none",marginTop:"8px"}} onClick={deleteForm} className="float-end"
                          />
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </div>
                </Form>
            </Tag>
        )
    }}
   </Repeater>
   <ContactModal contactsModal={contactsModal} setContactsModal={setContactsModal}
        toggle={toggle}
        active={active}
        recipients={recipients}
        setRecipients={setRecipients}/>
 </>
  )
}
