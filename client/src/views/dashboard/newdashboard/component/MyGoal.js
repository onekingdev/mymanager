import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Progress,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Input
} from 'reactstrap';
import OneImage from '../../../../assets/images/avatars/1.png';
import { AiFillSetting } from 'react-icons/ai';

// ** Custom Components Imports
import { selectThemeColors } from '@utils';
import Select from 'react-select';
import CreateGoalModal from './CreateGoalModal';

const data = [
  {
    progress: 54,
    title: 'Laravel',
    subtitle: 'eCommerce',
    progressColor: 'danger',
    imgSrc: OneImage
  },
  {
    progress: 85,
    title: 'Figma',
    subtitle: 'App UI Kit',
    progressColor: 'primary',
    imgSrc: OneImage
  },
  {
    progress: 64,
    title: 'VusJs',
    subtitle: 'Calendar App',
    progressColor: 'success',
    imgSrc: OneImage
  },
  {
    progress: 40,
    title: 'React',
    subtitle: 'Dashboard',
    progressColor: 'info',
    imgSrc: OneImage
  },
  {
    progress: 17,
    title: 'Bootstrap',
    subtitle: 'Website',
    progressColor: 'primary',
    imgSrc: OneImage
  },
  {
    progress: 30,
    title: 'Sketch',
    progressColor: 'warning',
    subtitle: 'Website Design',
    imgSrc: OneImage
  }
];

const CrmActiveProjects = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <Card style={{ height: '60vh' }}>
      <CardHeader>
        <h4 className="mb-0">My Goal</h4>
        <div className="d-flex ">
          <Input type="select" style={{ marginLeft: '15px !important' }} >
            <option value={'This Month'}>This Month</option>
            <option value={'Last Month'}>Last Month</option>
            <option value={'Yesterday'}>Yesterday</option>
          </Input>
          <AiFillSetting size={24} style={{ marginTop: '5px !important',marginLeft: '15px !important' }} onClick={toggle} />
        </div>
      </CardHeader>
      <CardBody>
        {data.map((item, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <img alt={item.title} src={item.imgSrc} width={32} style={{ borderRadius: '25px' }} />
            <div
              style={{
                marginLeft: '1rem',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <h6>{item.title}</h6>
                <p className="text-muted">{item.subtitle}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Progress
                  value={item.progress}
                  color={item.progressColor}
                  style={{ marginRight: '1rem', height: '8px', width: '80px' }}
                />
                <p className="text-muted">{`${item.progress}%`}</p>
              </div>
            </div>
          </div>
        ))}
      </CardBody>
      {/* <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </ModalBody>
      </Modal> */}
      <CreateGoalModal isOpen={modal} toggle={toggle} />
    </Card>
  );
};

export default CrmActiveProjects;
