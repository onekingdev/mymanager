// ** React Imports
import { Fragment, useContext, useEffect, useState } from 'react';

// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs';

// ** Components
import WizardModernVertical from './WizardModernVertical';
import { useParams, useHistory } from 'react-router-dom';

import { DocumentContext } from '../../../utility/context/Document';
import { Button, Col, Row } from 'reactstrap';

const CreateDoc = () => {
  const { setRecipients, setIsTemplate, setTemplateType } = useContext(DocumentContext);
  const { template, type } = useParams();
  const history = useHistory();

  const handleBackButtonClick = () => {
    history.goBack(); // Go back to the previous page
  };
  // ** State

  useEffect(() => {
    setTemplateType(type);
    setIsTemplate(true);
    if (template === 'template') {
      setRecipients([
        {
          id: crypto.randomUUID(),
          name: 'first party',
          email: 'firstparty',
          color: '#B5EAD7',
          active: true,
          roleOption: 'sign',
          hashCode: '',
          url: '',
          hasViewed: false
        },
        {
          id: crypto.randomUUID(),
          name: 'Myself',
          email: 'myself',
          color: '#C7CEEA',
          active: false,
          roleOption: 'sign',
          hashCode: '',
          url: '',
          hasViewed: false
        }
      ]);
    } else {
      setIsTemplate(false);
    }
  }, [template, type]);

  return (
    <Fragment>
      <Row>
        <Col md={11} className="invoice-child-header-wrapper">
          <BreadCrumbs
            breadCrumbTitle="Documents"
            breadCrumbParent="Documents"
            breadCrumbActive="Create Doc"
          />
        </Col>
        <Col md={1}>
          <Button onClick={handleBackButtonClick} className="btn-sm" outline color="primary">
            Back
          </Button>
        </Col>
      </Row>

      <WizardModernVertical />
    </Fragment>
  );
};

export default CreateDoc;
