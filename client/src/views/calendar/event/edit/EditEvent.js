// ** React Imports
import { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
// ** Components
import WizardModernVertical from './WizardModernVertical';
import BreadCrumbs from '../Breadcrumbs';
// ** Styles
import '@styles/base/pages/app-ecommerce.scss';
import { Button, Col, Row } from 'reactstrap';

const EditEvent = () => {
  return (
    <Fragment>
      <Row>
        <Col>
          <BreadCrumbs
            breadCrumbTitle="Edit Event"
            breadCrumbActive="Edit Event"
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

export default EditEvent;
