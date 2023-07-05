// ** React Imports
import { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
// ** Components
import WizardModernVertical from './WizardModernVertical';

// ** Styles
import '@styles/base/pages/app-ecommerce.scss';
import BreadCrumbs from '../Breadcrumbs';
import { Button, Col, Row } from 'reactstrap';

const AddEvent = () => {
  return (
    <Fragment>
      <Row>
        <Col md={12}>
          <BreadCrumbs
            breadCrumbTitle="New Event"
            breadCrumbActive="Add New Event"
            breadCrumbParent="Calendar"
            breadCrumbParentLink="/calendar/2"
            isBack={false}
          />
        </Col>
      </Row>

      <WizardModernVertical />
    </Fragment>
  );
};

export default AddEvent;
