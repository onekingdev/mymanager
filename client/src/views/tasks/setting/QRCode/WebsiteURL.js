import { Fragment, useState } from 'react';

import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Card,
  CardBody,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Button,
  Input,
  Spinner,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from 'reactstrap';

const WebsiteURL = (props) => {
  const { urlInfo, setUrlInfo } = props;

  return (
    <Row>
      <Col md="12" sm="12">
        <div style={{ fontWeight: 800, margin: '0.5rem' }}>Your URL</div>
        <Input
          value={urlInfo}
          onChange={(e) => setUrlInfo(e.target.value)}
          placeholder="Input your website URL"
        />
      </Col>
    </Row>
  );
};

export default WebsiteURL;
