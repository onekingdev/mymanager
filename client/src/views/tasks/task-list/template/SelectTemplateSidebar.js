import React from 'react';
import Sidebar from '../../../../@core/components/sidebar';

export default function SelectTemplateSidebar({ open, toggle }) {
  return (
    <Sidebar
      size="lg"
      open={open}
      toggleSidebar={toggle}
      title="Select A Template to Start With"
      headerClassName="mb-1"
      contentClassName="pt-0"
    >
      <div>this is side bar for template</div>
    </Sidebar>
  );
}
