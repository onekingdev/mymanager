import React from 'react';
import DocumentMain from './DocumentMain';
import Breadcrumbs from '@components/breadcrumbs';

function index() {
  return (
    <div style={{ width: '100%'}}>
      <div className="invoice-child-header-wrapper">
        <Breadcrumbs
          breadCrumbTitle={'Documents'}
          breadCrumbParent="Documents"
          breadCrumbActive={'Docs & Template'}
        />
      </div>
      <DocumentMain />
    </div>
  );
}

export default index;
