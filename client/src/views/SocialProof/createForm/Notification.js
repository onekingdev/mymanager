import React, { useState } from 'react';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Input,
  FormGroup,
  Button,
  Label,
  Form
} from 'reactstrap';
import { ArrowLeft, ArrowRight } from 'react-feather';
import { notificationData } from '../../../requests/userproof';
import count from '../../../assets/img/svg/CountPulse.svg';
import fire from '../../../assets/img/svg/fire.svg';
import groupImg from '../../../assets/img/svg/bulkpng.png';
import '../../../assets/styles/SocialProof.scss';
import Sidebar from '../../SocialProof/createForm/Sidebar';
const Notification = ({ stepper }) => {
  const [hide, setHide] = useState(false);
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState(false);
  const [dropDownValue, setDropDownValue] = useState('');
  const [firstNoti, setFirstNoti] = useState();
  const [displayNoti, setDisplayNoti] = useState();
  const [spaceNoti, setSpaceNoti] = useState();
  const [recentlyPost, setRecentlyPost] = useState(true);
  const [check, setCheck] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const handleSubmit = () => {
    let allData = {
      hide,
      show,
      position,
      dropDownValue,
      firstNoti,
      displayNoti,
      spaceNoti
    };

    notificationData(allData).then((response) => {});

    stepper.next();
  };
  const handleStaus = (e) => {
    setDropDownValue(e.target.value);
  };
  const handleRecentlyCard = (event) => {
    setCheck(!check);

    setRecentlyPost(!recentlyPost);
    if (recentlyPost) {
      setSidebarOpen(!sidebarOpen);
    }
  };

  return (
    <>
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} setSidebarOpen={setSidebarOpen} />
      <Row>
        <Col lg="4" md="4" sm="12">
          <Card className={recentlyPost ? 'CardStyle' : ' pd'} onClick={handleRecentlyCard}>
            <CardBody className="p-0">
              <div className="firstCard">
                <img src={groupImg} alt="groupImg" width={100} height={100} />
                <div className="cardTitle">Recently Activity</div>
                <p>
                  Show individual people that
                  <br /> recently signed up
                </p>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col lg="4" md="4" sm="12">
          <Card className="cardChange CardStyle">
            <CardBody className="p-0">
              <div className="firstCard">
                <img src={count} alt="CountPulse" width={100} height={100} />
                <div className="cardTitle">Live visitors count</div>
                <p>
                  Show how many people are <br /> currently pn your page
                </p>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col lg="4" md="4" sm="12">
          <Card className="cardChange CardStyle">
            <CardBody className="p-0">
              <div className="firstCard">
                <img src={fire} alt="fire" width={100} height={100} />
                <div className="cardTitle">HOT STEAKS</div>
                <p>
                  Show the total visitors or <br /> signups over a period of time
                </p>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg="6" md="6" sm="12">
          <Card className="cardChange CardStyle">
            <CardHeader className="notifiCard">
              <CardTitle className="cardttl">Appearance</CardTitle>
            </CardHeader>
            <CardBody className="">
              <div className="innerAppearance">
                <div>Hide notifications on mobile</div>
                <div className="d-flex switches">
                  <div>
                    <span className="switchbtn">{hide === true ? 'ON' : 'OFF'}</span>
                  </div>
                  <FormGroup switch>
                    <Input
                      type="switch"
                      id="1"
                      checked={hide}
                      onClick={(e) => {
                        setHide(!hide);
                      }}
                    />
                  </FormGroup>
                </div>
              </div>

              <div className="innerAppearance">
                <div>Show on top of page on mobile</div>
                <div className="d-flex">
                  <div>
                    <span className="switchbtn">{show === true ? 'ON' : 'OFF'}</span>
                  </div>
                  <FormGroup switch>
                    <Input
                      type="switch"
                      id="2"
                      checked={show}
                      onClick={() => {
                        setShow(!show);
                      }}
                    />
                  </FormGroup>
                </div>
              </div>
              <div className="innerAppearance">
                <div>Position notifications on</div>
                <div className="d-flex">
                  <div>
                    <span className="switchbtn">{position === true ? 'ON' : 'OFF'}</span>
                  </div>
                  <FormGroup switch>
                    <Input
                      className=""
                      type="switch"
                      id="3"
                      checked={position}
                      onClick={() => {
                        setPosition(!position);
                      }}
                    />
                  </FormGroup>
                </div>
              </div>
              <div className="innerAppearance" style={{ border: 'none', marginTop: '11px' }}>
                <div>Notification Theme</div>
                <div className="">
                  <Input
                    onChange={handleStaus}
                    defaultValue={dropDownValue}
                    value={dropDownValue}
                    type="select"
                    name="status"
                    className="form select"
                    id="status"
                  >
                    <option value={'Rounded'}>Rounded</option>
                    <option value={'Boxy'}>Boxy</option>
                  </Input>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col lg="6" md="6" sm="12">
          <Card className="cardChange CardStyle">
            <CardHeader className="notifiCard">
              <CardTitle className="cardttl"> Timing</CardTitle>
            </CardHeader>
            <CardBody className="">
              <div className="d-flex my-1 align-items-baseline">
                <div className="mr-1"> Delay the first notification for</div>
                <div className="InputDiv">
                  <span className="setInput">
                    <Input
                      type="number"
                      onChange={(e) => setFirstNoti(e.target.value)}
                      value={firstNoti}
                      placeholder="0"
                      className="inputTime"
                    />
                  </span>
                </div>
                <span className="ml-1"> seconds</span>
              </div>
              <div className="d-flex my-1 align-items-baseline">
                <div className="mr-1">Display each notification for</div>
                <div className="InputDiv">
                  <span className="">
                    <Input
                      type="number"
                      onChange={(e) => setDisplayNoti(e.target.value)}
                      value={displayNoti}
                      placeholder="7"
                      className="inputTime"
                    />
                  </span>
                </div>
                <span className="ml-1"> seconds</span>
              </div>
              <div className="d-flex my-1 align-items-baseline">
                <div className="mr-1">Space notifications on</div>
                <div className="InputDiv">
                  <span className="">
                    <Input
                      type="number"
                      onChange={(e) => setSpaceNoti(e.target.value)}
                      value={spaceNoti}
                      placeholder="3"
                      className="inputTime"
                    />
                  </span>
                </div>
                <span className="ml-1"> seconds apart</span>
              </div>
            </CardBody>
          </Card>
        </Col>

        <div className="d-flex justify-content-between ">
          <Button color="primary" className="btn-prev" outline onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">Previous</span>
          </Button>
          <Button color="primary" className="btn-next" onClick={handleSubmit}>
            <span className="align-middle d-sm-inline-block d-none">Next</span>
            <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
          </Button>
        </div>
      </Row>
    </>
  );
};
export default Notification;
