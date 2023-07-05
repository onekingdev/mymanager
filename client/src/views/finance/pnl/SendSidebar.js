import React from 'react';

import Sidebar from '@components/sidebar';
import { Button, Input, Label } from 'reactstrap';
import { Paperclip } from 'react-feather';


export default function SendSidebar({ open, toggle , attached }) {
  return (
    <Sidebar
     
      open={open}
      title="Send To"
      headerClassName="mb-1"
      contentClassName="p-0"
      toggleSidebar={toggle}
     
    >
      <div>
        <Label >Email To</Label>
        <Input type="email"/>

        <Label >Subject</Label>
        <Input type="text"/>

        <Label >Message</Label>
        <Input type="textarea" />
        <Paperclip className='text-primary' size={13}/> <span>This email has attachment</span>
        <div className='d-flex justify-content-end'>
            <Button color='primary'>SEND</Button>
        </div>
      </div>
    </Sidebar>
  );
}
