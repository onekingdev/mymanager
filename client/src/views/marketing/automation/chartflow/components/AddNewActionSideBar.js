import React, { useState } from 'react';
import Sidebar from '@components/sidebar';
import { Row, Col, Button, Modal, ModalHeader, Form, Input, ModalBody, ModalFooter, Card, CardBody, Label } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
// import AddAutomationModal from './AddAutomationModal';
import { GrAddCircle } from 'react-icons/gr';
import { Plus } from 'react-feather';
import AddNotification from './addNewSideBars/AddNotification';
import AddText from './addNewSideBars/AddText';
import AddEmail from './addNewSideBars/AddEmail';
import AddAutomation from './addNewSideBars/AddAutomation';
import sendEmailSvg from '../../../../../assets/images/svg/send_email.svg';
import sendTextSvg from '../../../../../assets/images/svg/send_text.svg';
import automationSvg from '../../../../../assets/images/svg/automation.svg';
import followUpSvg from '../../../../../assets/images/svg/follow_up.svg';
import watchedVideoSvg from '../../../../../assets/images/svg/watched_video.svg';
import { v4 as uuidv4 } from 'uuid';
import { setAddNewTypeAndIndex, setSelectedAutomationAction, setOffShowAddNewActionSideBarAction } from '../../store/actions';

const AddNewActionSideBar = (props) => {
  const [open, setOpen] = useState(props.open);
  // const classes = useStyles()
  const [openNewNotification, setOpenNewNotification] = useState(false);
  const [openNewText, setOpenNewText] = useState(false);
  const [openNewEmail, setOpenNewEmail] = useState(false);
  const [openNewAutomation, setOpenNewAutomation] = useState(false);
  const [showWatchedPercentage, setShowWatchedPercetage] = useState(false);
  const [showSetPercentage, setShowSetPercetage] = useState('setPercent');
  const [showPercentModal, setShowPercentModal] = useState(false);
  const [watchedPercentage, setWatchedPercentage] = useState(30);
  const [isPercentageConfirm, setIsPercenageConfirm] = useState(false)
  const [showYesNoBranchModal, setShowYesNoBranchModal] = useState(false);
  const [yesNoBranch, setYesNoBranch] = useState('yes');
  const selectedAutomation = useSelector(state => state.automation.contactInfo);
  const automationData = useSelector(state => state.automation.selectedAutomation);
  const parent = useSelector(state => state.automation.addedParent);
  const isOpenSidebar = useSelector(state => state.automation.showAddNewSideBar)
  const dispatch = useDispatch();
  const toggleModal = () => {
    setOpen(!open);
  };
  const handleSidebarClosed = () => {
    //
  };

  const onChangePercentOption = (e) => {
    setShowSetPercetage(e.target.value)
  }

  const onShowAddNewNotification = () => {
    const actiondata = {
      type: 'notification',
      index: props.index,
      order: props.order
    };
    dispatch(setAddNewTypeAndIndex(actiondata));
    setOpen(false);
    setOpenNewNotification(true);
    dispatch(setOffShowAddNewActionSideBarAction())
  };

  const onSetShowReview = () => {
    setShowWatchedPercetage(true)
  }

  const onShowAddNewText = () => {
    const actiondata = {
      type: 'text',
      index: props.index,
      order: props.order
    };
    dispatch(setAddNewTypeAndIndex(actiondata));
    setOpen(false);
    setOpenNewText(true);
    dispatch(setOffShowAddNewActionSideBarAction())
  };
  const onShowAddNewEmail = () => {
    const actiondata = {
      type: 'email',
      index: props.index,
      order: props.order
    };
    dispatch(setAddNewTypeAndIndex(actiondata));
    setOpen(false);
    setOpenNewEmail(true);
    dispatch(setOffShowAddNewActionSideBarAction())
  };
  const onShowAddNewAutomation = () => {
    const actiondata = {
      type: 'automation',
      index: props.index,
      order: props.order
    };
    dispatch(setAddNewTypeAndIndex(actiondata));
    setOpen(false);
    setOpenNewAutomation(true);
    dispatch(setOffShowAddNewActionSideBarAction())
  };

  const toggleNotificationBar = () => setOpenNewNotification(!openNewNotification);
  const toggleTextBar = () => setOpenNewText(!openNewText);
  const toggleEmailBar = () => setOpenNewEmail(!openNewEmail);
  const toggleAutomationBar = () => setOpenNewAutomation(!openNewAutomation);


  const onInsertCondition = () => {

    let yesAction = {
      id: uuidv4(),
      actionType: 'condition',
      duration: {
        time: 0,
        unit: ''
      },
      parentId: parent.id,
      setCustomTime: false,
      useSubscriberTimeZone: false,
      customTime: {
        days: [],
        time: 0,
      },
      subject: '',
      content: '',
      attatchments: [],
      condition: 'yes',
      confirmProgress: {
        isPercentConfirm: false,
        percentage: 0
      },
      to: {
        type: '',
        contact: []
      },
      method: '',
      isStart: false,
      isLast: true,
      isCondition: false,
    }

    let noAction = {
      id: uuidv4(),
      actionType: 'condition',
      duration: {
        time: 0,
        unit: ''
      },
      parentId: parent.id,
      setCustomTime: false,
      useSubscriberTimeZone: false,
      customTime: {
        days: [],
        time: 0,
      },
      subject: '',
      content: '',
      attachments: [],
      condition: 'no',
      confrimProgress: {
        isPercentConfirm: false,
        percentage: 0
      },
      to: {
        type: '',
        contact: []
      },
      method: '',
      isStart: false,
      isLast: true,
      isCondition: false,
    }

    if (parent.isLast) {
      yesAction.isLast = true
      noAction.isLast = true
    } else {
      if (yesNoBranch == 'yes') {
        yesAction.isLast = false
        noAction.isLast = true
      } else if (yesNoBranch == 'no') {
        yesAction.isLast = true
        noAction.isLast = false
      }

    }

    let updatedata = automationData;
    let updatedObject;
    let newActions;
    let _updatedata;
    let _confirmProgression = {
      isPercentConfirm: isPercentageConfirm,
      percentage: watchedPercentage
    }


    if (parent.isLast) {
      const parentIndex = automationData.actions.findIndex(item => item.id == parent.id);
      const _parent = automationData.actions[parentIndex];
      const updatedParent = { ..._parent, isLast: false, confirmProgress: _confirmProgression }
      newActions = [
        ...updatedata.actions.slice(0, parentIndex),
        updatedParent,
        yesAction,
        noAction,

        ...updatedata.actions.slice(parentIndex + 1),
      ];
    } else {
      const parentIndex = automationData.actions.findIndex(item => item.id == parent.id);
      const _parent = automationData.actions[parentIndex];
      const updatedParent = { ..._parent, confirmProgress: _confirmProgression }
      const childIndex = automationData.actions.findIndex(item => item.parentId == parent.id);
      const child = automationData.actions[childIndex];
      let updatedChild;

      if (yesNoBranch == 'yes') updatedChild = { ...child, parentId: yesAction.id }
      if (yesNoBranch == 'no') updatedChild = { ...child, parentId: noAction.id }
      _updatedata = [
        ...updatedata.actions.slice(0, parentIndex),
        updatedParent,
        ...updatedata.actions.slice(parentIndex + 1)
      ]
      newActions = [
        ..._updatedata.slice(0, childIndex),
        updatedChild,
        yesAction,
        noAction,
        ..._updatedata.slice(childIndex + 1),
      ];
    }
    // console.log(parent)
    updatedObject = { ...updatedata, actions: newActions };
    dispatch(setSelectedAutomationAction(updatedObject))
    setIsPercenageConfirm(false);
    setWatchedPercentage(30)
    setShowWatchedPercetage(false)
    dispatch(setOffShowAddNewActionSideBarAction())
  };

  const onCheckParent = () => {
    if (parent.isLast) {
      onInsertCondition();
    } else {
      setShowYesNoBranchModal(true)
    }
  }
  const onInsertConditionHandling = () => {
    if (showSetPercentage == 'unsetPercent') {
      onCheckParent()
      setShowWatchedPercetage(false)
    } else {
      setShowWatchedPercetage(false)
      setShowPercentModal(true)
    }
  }

  const onInsertConditionHandlingWithPercentage = () => {
    setShowPercentModal(false)
    setIsPercenageConfirm(true)
    onCheckParent()
  }

  const onSetYesNoBranchHandling = (e) => {
    setYesNoBranch(e);
    onInsertCondition()
    setShowYesNoBranchModal(false)
  }
  return (
    <div>
      <Sidebar
        style={{ width: '500px' }}
        open={isOpenSidebar}
        title="Add New Action"
        headerClassName="mb-1"
        contentClassName="pt-0"
        toggleSidebar={props.toggleSidebar}
        onClosed={handleSidebarClosed}
      >
        <Card className="post">
          <CardBody onClick={() => onShowAddNewNotification()} >
            <Row style={{ cursor: 'pointer' }}>
              <Col sm="2" md="2" xl="2">
                <img src={followUpSvg} alt="email" height="45" width="45" />
              </Col>
              <Col sm="10" md="10" xl="10">
                <Label style={{ marginLeft: '5px', cursor: 'pointer' }}>
                  <strong className="m-0 fw-bold" style={{ fontSize: '14px', lineHeight: '19px' }}>
                    New Notification
                  </strong>
                  <p
                    className="m-0 fs-14px lh-19px"
                    style={{ fontSize: '14px', lineHeight: '19px' }}
                  >
                    Create a new notification for an action
                  </p>
                </Label>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Card className="post" >
          <CardBody onClick={onShowAddNewText}>
            <Row style={{ cursor: 'pointer' }}>
              <Col sm="2" md="2" xl="2">
                <img src={sendTextSvg} alt="email" height="45" width="45" />
              </Col>
              <Col sm="10" md="10" xl="10">
                <Label style={{ marginLeft: '5px', cursor: 'pointer' }}>
                  <strong className="m-0 fw-bold" style={{ fontSize: '14px', lineHeight: '19px' }}>
                    New Text
                  </strong>
                  <p
                    className="m-0 fs-14px lh-19px"
                    style={{ fontSize: '14px', lineHeight: '19px' }}
                  >
                    Add a new text to the automation flow
                  </p>
                </Label>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Card className="post">
          <CardBody onClick={onShowAddNewEmail}>
            <Row style={{ cursor: 'pointer' }}>
              <Col sm="2" md="2" xl="2">
                <img src={sendEmailSvg} alt="email" height="45" width="45" />
              </Col>
              <Col sm="10" md="10" xl="10">
                <Label style={{ marginLeft: '5px', cursor: 'pointer' }}>
                  <strong className="m-0 fw-bold" style={{ fontSize: '14px', lineHeight: '19px' }}>
                    New Email
                  </strong>
                  <p
                    className="m-0 fs-14px lh-19px"
                    style={{ fontSize: '14px', lineHeight: '19px' }}
                  >
                    Add a new email to the automation flow
                  </p>
                </Label>
              </Col>
            </Row>
          </CardBody>
        </Card>
        {parent.attachments && parent.attachments.length != 0 && <Card className="post">
          <CardBody onClick={onSetShowReview}>
            <Row style={{ cursor: 'pointer' }}>
              <Col sm="2" md="2" xl="2">
                <img src={watchedVideoSvg} alt="email" height="45" width="45" />
              </Col>
              <Col sm="10" md="10" xl="10">
                <Label style={{ marginLeft: '5px', cursor: 'pointer' }}>
                  <strong className="m-0 fw-bold" style={{ fontSize: '14px', lineHeight: '19px' }}>
                    New Video View
                  </strong>
                  <p
                    className="m-0 fs-14px lh-19px"
                    style={{ fontSize: '14px', lineHeight: '19px' }}
                  >
                    Create a custom marketing sequence base on if the video content has been viewed
                  </p>
                </Label>
              </Col>
            </Row>
          </CardBody>
        </Card>}
        <Card className="post">
          <CardBody onClick={onShowAddNewAutomation}>
            <Row style={{ cursor: 'pointer' }}>
              <Col sm="2" md="2" xl="2">
                <img src={automationSvg} alt="email" height="45" width="45" />
              </Col>
              <Col sm="10" md="10" xl="10">
                <Label style={{ marginLeft: '5px', cursor: 'pointer' }}>
                  <strong className="m-0 fw-bold" style={{ fontSize: '14px', lineHeight: '19px' }}>
                    New Automation
                  </strong>
                  <p
                    className="m-0 fs-14px lh-19px"
                    style={{ fontSize: '14px', lineHeight: '19px' }}
                  >
                    Add an existing automation to the campaign
                  </p>
                </Label>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Sidebar>
      {showWatchedPercentage &&
        <Modal
          isOpen={showWatchedPercentage}
          className='modal-dialog-centered'
        >
          <ModalHeader>
            <h4>What view method triggers a YES?</h4>
          </ModalHeader>
          <ModalBody>
            <Form>
              <div className='demo mt-1' onChange={onChangePercentOption}>
                <div className='form-check d-flex justify-content-between'>
                  <Input type='radio' id='setView' name='setView' value="setPercent" checked={showSetPercentage == 'setPercent'} />
                  <Label className='form-check-label' for='setView'>
                    <h5>Set View Percentage</h5>
                  </Label>
                  <div style={{ width: '50px' }}></div>
                  <div className='form'>
                    <input type="number" style={{ width: '70px', height: '30px' }} className='form-control' min={1} max={100} step='1' value={watchedPercentage} onChange={(e) => setWatchedPercentage(e.target.value)} ></input>
                  </div>
                  <h5 style={{ marginTop: '2px' }}>% watched</h5>
                  <div style={{ width: '50px' }}></div>
                </div>
                <div className='form-check mt-1'>
                  <Input type='radio' id='unSetView' name='unSetView' value="unsetPercent" checked={showSetPercentage == 'unsetPercent'} />
                  <Label className='form-check-label' for='unSetView'>
                    <h5>Simply Open Video</h5>
                  </Label>
                </div>
              </div>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color='success' outline onClick={() => setShowWatchedPercetage(false)}>
              Cancel
            </Button>
            <Button color='primary' outline onClick={() => onInsertConditionHandlingWithPercentage()}>
              OK
            </Button>
          </ModalFooter>
        </Modal>
      }

      {/* <Modal
        isOpen={showPercentModal}
        className='modal-dialog-centered'
      >
        <ModalHeader>
          <h4>Assign Watched Percentage</h4>
        </ModalHeader>
        <ModalBody>
          Please input percentage...
          <div className='form mt-1'>
            <input type="number" className='form-control' step='1' value={watchedPercentage} onChange={(e) => setWatchedPercentage(e.target.value)} ></input>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color='success' outline >
            Cancel
          </Button>
          <Button color='primary' outline onClick={() => onInsertConditionHandlingWithPercentage()}>
            Assign
          </Button>
        </ModalFooter>
      </Modal> */}

      <Modal
        isOpen={showYesNoBranchModal}
        className='modal-dialog-centered'
      >
        <ModalHeader>
          <h4>Select a condition</h4>
        </ModalHeader>
        <ModalBody>
          Which branch would you connect the following actions to?

        </ModalBody>
        <ModalFooter className='d-flex justify-content-around'>
          <Button color='danger' outline onClick={() => onSetYesNoBranchHandling('yes')} >
            Yes branch
          </Button>
          <Button color='primary' outline onClick={() => onSetYesNoBranchHandling('no')}>
            No branch
          </Button>

          <Button color='' outline onClick={() => setShowYesNoBranchModal(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      {openNewNotification &&
        <AddNotification open={openNewNotification} toggleSidebar={toggleNotificationBar} />
      }
      {openNewText && <AddText open={openNewText} toggleSidebar={toggleTextBar} />}
      {openNewEmail && <AddEmail open={openNewEmail} toggleSidebar={toggleEmailBar} />}
      {openNewAutomation && (
        <AddAutomation open={openNewAutomation} toggleSidebar={toggleAutomationBar} />
      )}
    </div>
  );
};

export default AddNewActionSideBar;
