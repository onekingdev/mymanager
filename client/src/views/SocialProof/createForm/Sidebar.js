// ** React Import
import { useState } from 'react';
import map from '../../../assets/img/svg/austinMap.png';
import DataForDemo from '../../../assets/img/svg/DataForDemo.svg';
// ** Custom Components
import Sidebar from '@components/sidebar';
import '../../../assets/styles/SocialProof.scss';
import { Button, Label, Form, Input, FormGroup, Row, Col, InputGroup } from 'reactstrap';
import { AddRecentlyActivity } from '../../../requests/userproof';
const SidebarNewUsers = ({ open, toggleSidebar, setSidebarOpen }) => {
  const [message, setMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState({});
  const [displayLastConvo, setDisplayLast] = useState();
  const [convoFromLast, setConvoLast] = useState();
  const [atLeastOne, setAtLeastOne] = useState();
  const [loopNotification, setLoopNotification] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(toggleSidebar, open, setSidebarOpen);
    const formData = new FormData();
    formData.append('file', selectedImage);
    formData.append('msg', message);
    console.log(message, selectedImage);
    formData.append('display_last_convo', displayLastConvo);
    formData.append('convo_from_last', convoFromLast);
    formData.append('at_least_one', atLeastOne);

    AddRecentlyActivity(formData).then((response) => {
      console.log(response.data);
      setMessage('');
      setSelectedImage('');
      setDisplayLast('');
      setConvoLast('');
      setAtLeastOne('');
      setSidebarOpen;
    });
  };

  const onImageChange = (e) => {
    console.log(e.target.files[0]);
    setSelectedImage(e.target.files[0]);
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title="Recent Activity Notifications"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
    >
      <div className="demo">
        <div className="preview">
          <div className="parentDiv">
            <div className="innerMap">
              <img src={map} alt="CountPulse" width={50} height={50} />
            </div>
            <div className="dddd">
              <div className="BoxHead">
                <span className="fw-bolder" style={{ fontSize: '12px' }}>
                  Dave from Austin ,TX
                </span>
              </div>
              <div className="demoPara" style={{ fontSize: '10px' }}>
                {message === '' ? 'Recently signed up for Gusto' : message}
              </div>
              <div className="currentTime" style={{ fontSize: '10px' }}>
                2 minutes ago
              </div>
              <img src={DataForDemo} alt="CountPulse" width={10} height={10} />
            </div>
          </div>

          <img src={DataForDemo} alt="CountPulse" width={100} height={100} />
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <div className="mt-1 mb-1">
          <Label className="form-label" for="message">
            Message <span className="text-danger">*</span>
          </Label>
          <Input
            name="message"
            id="message"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <Row>
          <h4 className="my-1 fw-bolder">Image Option</h4>
          <Col md={6} sm={12} lg={6}>
            <FormGroup>
              <div style={{ paddingTop: '8px' }}>Display a custom image</div>
            </FormGroup>
          </Col>

          <Col md={6} sm={12} lg={6}>
            <FormGroup>
              <InputGroup>
                <Input
                  onChange={onImageChange}
                  name="file"
                  placeholder="Your logo"
                  type="file"
                  accept="image/png, image/gif, image/jpeg"
                />
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
        <div>
          <h4 className="fw-bolder">Display Rules</h4>
        </div>
        <div className="d-flex my-1 align-items-baseline">
          <div className="mr-1">Display the last</div>
          <div className="InputDiv">
            <span className="setInput">
              <Input
                type="number"
                onChange={(e) => setDisplayLast(e.target.value)}
                value={displayLastConvo}
                placeholder="20"
                className="inputTime"
              />
            </span>
          </div>
          <span className="ml-1"> conversions</span>
        </div>
        <div className="d-flex my-1 align-items-baseline">
          <div className="mr-1">Only show conversions from the last</div>
          <div className="InputDiv">
            <span className="">
              <Input
                type="number"
                onChange={(e) => setConvoLast(e.target.value)}
                value={convoFromLast}
                placeholder="7"
                className="inputTime"
              />
            </span>
          </div>
          <span className="ml-1"> days</span>
        </div>
        <div className="d-flex my-1 align-items-baseline">
          <div className="mr-1">Only display if there are at least</div>
          <div className="InputDiv">
            <span className="">
              <Input
                type="number"
                onChange={(e) => setAtLeastOne(e.target.value)}
                value={atLeastOne}
                placeholder="1"
                className="inputTime"
              />
            </span>
          </div>
          <span className="ml-1">conversions</span>
        </div>
        <div className="innerAppearance">
          <div>Do not loop notifications</div>
          <div className="d-flex switches">
            <div>
              <span className="switchbtn">{loopNotification === true ? 'ON' : 'OFF'}</span>
            </div>
            <FormGroup switch>
              <Input
                type="switch"
                id="1"
                checked={loopNotification}
                onClick={() => setLoopNotification(!loopNotification)}
              />
            </FormGroup>
          </div>
        </div>
        <div className="submitBtn mt-1">
          <Button className="me-1" color="primary">
            Done
          </Button>
        </div>
      </Form>
    </Sidebar>
  );
};

export default SidebarNewUsers;
