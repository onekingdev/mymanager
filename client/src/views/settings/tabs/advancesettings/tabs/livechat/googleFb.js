import React, { Fragment, useState } from 'react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { HiUser, HiUserCircle } from 'react-icons/hi';
import { TbUserCircle } from 'react-icons/tb';
import { VscChromeMinimize } from 'react-icons/vsc';
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  Row
  // TabContent,
  // TabPane
} from 'reactstrap';
// import { FaFacebook } from 'react-icons/fa';
// import { FcGoogle } from 'react-icons/fc';
import AccordianFun from './AccordianFun';
// import { RxCross2 } from 'react-icons/rx';
import ChatBoxLive from './ChatBoxLive';
// import { displayName } from 'cleave.js/react';

function index() {
  // const [active, setActive] = useState('today');
  // const [startChat,setStartChat] = useState(false)
  const [openLiveChat, setOpenLiveChat] = useState(false);
  const [switchValueEmail, setSwitchValueEmail] = useState(false);
  const [switchValueWeb, setSwitchValueWeb] = useState(false);
  const [switchValuePrivacy, setSwitchValuePrivacy] = useState(false);
  const [selectedOption, setSelectedOption] = useState('center');
  const [align, setAlign] = useState('left');
  const [sideSpacing, setSideSpacing] = useState(0);
  const [bottomSpacing, setBottomSpacing] = useState(0);
  const [devs, setDevs] = useState('');
  const [smooth, setSmooth] = useState(false);
  const [modern, setModern] = useState(false);
  const [bar, setBar] = useState(false);
  const [bubble, setBubble] = useState(false);
  const [theme, setTheme] = useState(false);
  const [themeColor, setThemeColor] = useState('#1565C0');
  const [sendCode, setSendCode] = useState(false);
  const [code, setCode] = useState('');
  const [logo, setLogo] = useState({});
  const startChathand = (e) => {
    e.preventDefault();
    setOpenLiveChat(true);
  };
  return (
    <>
      <div className="p-1">
        <Row className="border-bottom">
          <Col sm={7} md={7} lg={7} className="border-end">
            <h3 className="text-center pt-1 pb-1">Customization</h3>
          </Col>

          <Col sm={5} md={5} lg={5} className="">
            <h3 className="text-center  pt-1 pb-1">Preview</h3>
          </Col>
        </Row>
        <Row>
          <Col sm={7} md={7} lg={7} className="border-end ">
            <AccordianFun
              logo={logo}
              setLogo={setLogo}
              switchValueEmail={switchValueEmail}
              setSwitchValueEmail={setSwitchValueEmail}
              switchValueWeb={switchValueWeb}
              setSwitchValueWeb={setSwitchValueWeb}
              switchValuePrivacy={switchValuePrivacy}
              setSwitchValuePrivacy={setSwitchValuePrivacy}
              align={align}
              setAlign={setAlign}
              smooth={smooth}
              setSmooth={setSmooth}
              modern={modern}
              setModern={setModern}
              bar={bar}
              setBar={setBar}
              bubble={bubble}
              setBubble={setBubble}
              theme={theme}
              setTheme={setTheme}
              themeColor={themeColor}
              setThemeColor={setThemeColor}
              sideSpacing={sideSpacing}
              setSideSpacing={setSideSpacing}
              bottomSpacing={bottomSpacing}
              setBottomSpacing={setBottomSpacing}
              sendCode={sendCode}
              setSendCode={setSendCode}
              code={code}
              setCode={setCode}
              devs={devs}
              setDevs={setDevs}
              setOpenLiveChat={setOpenLiveChat}
            />
          </Col>
          <Col sm={5} md={5} lg={5} className={`pb-1 d-flex justify-content-${align}`}>
            {bar == true ? (
              <div
                className="bg-primary rounded-2 text-white d-flex align-items-center mt-auto"
                style={{ width: '80%', height: '40px' }}
              >
                <div className="d-flex justify-content-around align-items-center w-100">
                  <div>Chat with agent</div>
                  <div>
                    {logo.url !== '' ? (
                      <img src={logo.url} width="32" height="32" />
                    ) : (
                      <svg
                        viewBox="0 0 32 32"
                        className=" w-8 h-8"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fab"
                        data-icon="twitter"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ width: 32, height: 32 }}
                      >
                        <path
                          fill="#FFFFFF"
                          d="M12.63,26.46H8.83a6.61,6.61,0,0,1-6.65-6.07,89.05,89.05,0,0,1,0-11.2A6.5,6.5,0,0,1,8.23,3.25a121.62,121.62,0,0,1,15.51,0A6.51,6.51,0,0,1,29.8,9.19a77.53,77.53,0,0,1,0,11.2,6.61,6.61,0,0,1-6.66,6.07H19.48L12.63,31V26.46"
                        ></path>
                        <path
                          fill="#7367f0"
                          d="M19.57,21.68h3.67a2.08,2.08,0,0,0,2.11-1.81,89.86,89.86,0,0,0,0-10.38,1.9,1.9,0,0,0-1.84-1.74,113.15,113.15,0,0,0-15,0A1.9,1.9,0,0,0,6.71,9.49a74.92,74.92,0,0,0-.06,10.38,2,2,0,0,0,2.1,1.81h3.81V26.5Z"
                        ></path>
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            ) : bubble == true ? (
              <div className="d-flex align-items-end">
                {logo.url !== '' ? (
                  <img src={logo.url} width="32" height="32" />
                ) : (
                  <button
                    type="button"
                    className="text-white bg-primary font-medium-3 text-sm text-center d-inline-flex align-items-center p-1 rounded-circle border-0"
                  >
                    <svg
                      viewBox="0 0 32 32"
                      className=" w-8 h-8"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fab"
                      data-icon="twitter"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ width: 32, height: 32 }}
                    >
                      <path
                        fill="#FFFFFF"
                        d="M12.63,26.46H8.83a6.61,6.61,0,0,1-6.65-6.07,89.05,89.05,0,0,1,0-11.2A6.5,6.5,0,0,1,8.23,3.25a121.62,121.62,0,0,1,15.51,0A6.51,6.51,0,0,1,29.8,9.19a77.53,77.53,0,0,1,0,11.2,6.61,6.61,0,0,1-6.66,6.07H19.48L12.63,31V26.46"
                      ></path>
                      <path
                        fill="#7367f0"
                        d="M19.57,21.68h3.67a2.08,2.08,0,0,0,2.11-1.81,89.86,89.86,0,0,0,0-10.38,1.9,1.9,0,0,0-1.84-1.74,113.15,113.15,0,0,0-15,0A1.9,1.9,0,0,0,6.71,9.49a74.92,74.92,0,0,0-.06,10.38,2,2,0,0,0,2.1,1.81h3.81V26.5Z"
                      ></path>
                    </svg>
                  </button>
                )}
              </div>
            ) : (
              <Card
                className="mt-2 ms-1 me-1 rounded "
                style={{
                  width: '22rem',
                  display: openLiveChat ? 'none' : '',
                  backgroundColor: theme ? '#85819cb3' : '#1f2937'
                }}
              >
                <CardBody className="shadow-lg p-0">
                  <CardTitle
                    tag="h5"
                    className="p-1 rounded-top text-light"
                    style={{
                      borderBottom: `1px solid ${themeColor ? themeColor : '#1565C0'}`,
                      backgroundColor: themeColor ? themeColor : '#1565C0'
                    }}
                  >
                    <div
                      className="d-flex  justify-content-between"
                      style={{ color: theme ? '#ffffffd9' : '#fff' }}
                    >
                      <div>
                        <BiDotsHorizontalRounded size="20" />
                      </div>
                      <div>
                        <span>Chat With Us</span>
                      </div>
                      <div>
                        <VscChromeMinimize size="20" />
                      </div>
                    </div>
                  </CardTitle>

                  <form
                    action="/action_page.php"
                    autocomplete="off"
                    class="was-validated"
                    className="p-1 position-relative border rounded-2 mx-1 my-3"
                    style={{
                      backgroundColor: theme ? '#fff' : '#374151'
                    }}
                  >
                    <span class="position-absolute top-0 start-50 translate-middle ">
                      <div className="bg-white " style={{ borderRadius: '50%' }}>
                        <TbUserCircle size="32" color={themeColor ? themeColor : '#1565C0'} />
                      </div>
                    </span>

                    <div class=" mt-1">
                      <label
                        for="uname"
                        class="form-label"
                        style={{ color: theme ? '#5e5873' : '#fff' }}
                      >
                        Your Name: <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        //id="uname"
                        placeholder="Enter username"
                        name="uname"
                        autocomplete="false"
                        required
                      />
                      <div class="valid-feedback">Valid.</div>
                      <div class="invalid-feedback">Please fill out this field.</div>
                    </div>

                    {switchValueEmail ? (
                      <div class=" mt-1">
                        <label
                          for="uname"
                          class="form-label"
                          style={{ color: theme ? '#5e5873' : '#fff' }}
                        >
                          Email: <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          //id="uname"
                          placeholder="Enter Email"
                          name="uname"
                          autocomplete="false"
                          required
                        />
                        <div class="valid-feedback">Valid.</div>
                        <div class="invalid-feedback">Please fill out this field.</div>
                      </div>
                    ) : null}
                    <div class=" mt-1">
                      <label
                        for="uname"
                        class="form-label"
                        style={{ color: theme ? '#5e5873' : '#fff' }}
                      >
                        Phone: <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="uname"
                        placeholder="Enter Phone "
                        name="uname"
                        autocomplete="false"
                        required
                      />
                      <div class="valid-feedback">Valid.</div>
                      <div class="invalid-feedback">Please fill out this field.</div>
                    </div>

                    {switchValueWeb ? (
                      <div class=" mt-1">
                        <label
                          for="uname"
                          class="form-label"
                          style={{ color: theme ? '#5e5873' : '#fff' }}
                        >
                          Your Website address: <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="uname"
                          placeholder="Enter  Website Address"
                          name="uname"
                          autocomplete="false"
                          required
                        />
                        <div class="valid-feedback">Valid.</div>
                        <div class="invalid-feedback">Please fill out this field.</div>
                      </div>
                    ) : null}
                    {switchValuePrivacy ? (
                      <div class="form-check  mt-1">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="myCheck"
                          name="remember"
                          required
                        />
                        <label
                          class="form-check-label"
                          for="myCheck"
                          style={{ color: theme ? '#5e5873' : '#fff' }}
                        >
                          I have read the privacy policy and agree to have personal data processed
                          on its basis by mymanager,Inc.For chat support.{' '}
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <div class="valid-feedback">Valid.</div>
                        <div class="invalid-feedback">Check this checkbox to continue.</div>
                      </div>
                    ) : null}
                    <button
                      className="mb-3 mt-4 border-0 text-white rounded-2 px-2 py-75 w-100"
                      onClick={startChathand}
                      style={{
                        backgroundColor: themeColor ? themeColor : '#1565C0'
                      }}
                    >
                      Start Chat
                    </button>
                  </form>
                </CardBody>
                <div
                  className="p-1 rounded-bottom fs-6 text-center lh-sm fw-light"
                  style={{
                    borderTop: `1px solid ${themeColor ? themeColor : '#1565C0'}`,
                    backgroundColor: themeColor ? themeColor : '#1565C0'
                  }}
                >
                  <span style={{ color: theme ? '#ffffffd9' : '#fff' }} className="py-25 d-block">
                    Powered By mymanager.com
                  </span>
                </div>
              </Card>
            )}
            {openLiveChat ? (
              <ChatBoxLive
                smooth={smooth}
                modern={modern}
                bar={bar}
                bubble={bubble}
                theme={theme}
                themeColor={themeColor}
                align={align}
                sideSpacing={sideSpacing}
                bottomSpacing={bottomSpacing}
              />
            ) : (
              ''
            )}
          </Col>
        </Row>
      </div>
    </>
  );
}
export default index;
