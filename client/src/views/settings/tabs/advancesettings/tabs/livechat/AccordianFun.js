import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BiCode, BiSlider } from 'react-icons/bi';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { FaCheckCircle, FaCheck, FaRegSave, FaFileUpload } from 'react-icons/fa';
import { MdOutlineColorLens, MdZoomOutMap } from 'react-icons/md';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Row
} from 'reactstrap';
import { getUserData } from '@src/utility/Utils.js';
import Bluetick from './Bluetick.js';
import { el } from 'date-fns/locale';
import SendCodeModal from './SendCodeModal.js';
import { saveSettingAction } from '../../../../store/action.js';
import { uploadFile } from '../../../../../apps/filemanager/store/index.js';
import { toast } from 'react-toastify';

function Example(props) {
  const {
    logo,
    setLogo,
    switchValueEmail,
    setSwitchValueEmail,
    switchValueWeb,
    setSwitchValueWeb,
    switchValuePrivacy,
    setSwitchValuePrivacy,
    align,
    setAlign,
    smooth,
    setSmooth,
    modern,
    setModern,
    bar,
    setBar,
    bubble,
    setBubble,
    theme,
    setTheme,
    themeColor,
    setThemeColor,
    sideSpacing,
    setSideSpacing,
    bottomSpacing,
    setBottomSpacing,
    code,
    setCode,
    devs,
    setDevs,
    setOpenLiveChat
  } = props;

  const [open, setOpen] = useState('1');
  const [sendCodeModalOpen, setSendCodeModalOpen] = useState(false);

  const dispatch = useDispatch();

  const fileUploadRef = useRef();
  // ** Click Handlers
  const handleSmoothClick = () => {
    setSmooth(true);
    setModern(false);
    setBubble(false);
    setBar(false);
  };
  const handleModernClick = () => {
    setSmooth(false);
    setModern(true);
    setBubble(false);
    setBar(false);
  };
  const handleBarClick = () => {
    setBubble(false);
    setBar(true);
    setOpenLiveChat(false);
  };
  const handleBubbleClick = () => {
    setBubble(true);
    setBar(false);
    setOpenLiveChat(false);
  };
  const handleThemeClick = (e, status) => {
    setBar(false);
    setBubble(false);
    setTheme(status);
  };

  const handleThemeColorClicked = (e, selectedColor) => {
    if (!e.target.classList.contains('active')) {
      e.target.closest('.theme-color-group').childNodes.forEach((el, index) => {
        if (el.classList.contains('active')) el.classList.remove('active');
      });
      e.target.classList.add('active');
    } else {
      return;
    }
    setBar(false);
    setBubble(false);
    setThemeColor(selectedColor);
  };

  const handleSaveClick = () => {
    dispatch(
      saveSettingAction({
        bar,
        theme,
        themeColor,
        align,
        sideSpacing,
        bottomSpacing,
        switchValueEmail,
        switchValuePrivacy,
        switchValueWeb,
        logo
      })
    );
  };
  const handleResetClick = () => {
    setBubble(false);
    setBar(false);
    setTheme(false);
    setThemeColor('#1565C0');
    setAlign('left');
    setSideSpacing(0);
    setBottomSpacing(0);
    setSwitchValueEmail(false);
    setSwitchValuePrivacy(false);
    setSwitchValueWeb(false);
    setSendCode(false);
  };
  // Put in or off inputs to form
  const handleSwitchToggle = (e) => {
    setBar(false);
    setBubble(false);
    setOpenLiveChat(false);
    if (e.target.name == 'email') {
      setSwitchValueEmail(!switchValueEmail);
    } else if (e.target.name == 'website') {
      setSwitchValueWeb(!switchValueWeb);
    } else if (e.target.name == 'privacy') {
      setSwitchValuePrivacy(!switchValuePrivacy);
    }
  };

  // Upload Logo
  const currentPath = useSelector((state) => state.filemanager.currentPath);
  const handleChangeFile = async ({ file, id }) => {
    setBar(false);
    setBubble(true);
    setSendCodeModalOpen(false);
    const form = new FormData();
    form.append('file', file);
    form.append('userId', getUserData().id);
    form.append('path', currentPath);
    const response = await dispatch(uploadFile(form));
    if (response?.payload?.url) {
      setLogo(response.payload);
      toast.success('File uploaded successfully');
    } else {
      toast.error('Error occured');
    }
  };

  const handleFileUpload = () => {
    fileUploadRef?.current?.click();
  };
  // ** Accordion Toggle
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  // ** Send code confirm modal
  const sendCodeModalToggle = () => {
    setSendCodeModalOpen(!sendCodeModalOpen);
  };

  SVGAnimatedLengthList;

  // ** Get input values
  const alignChange = (event) => {
    setBar(false);
    setBubble(false);
    setOpenLiveChat(true);
    setAlign(event.target.value);
  };

  const sideSpacingChange = (e) => {
    setBar(false);
    setBubble(false);
    setOpenLiveChat(true);
    setSideSpacing(e.target.value);
  };

  const bottomSpacingChange = (e) => {
    setBar(false);
    setBubble(false);
    setSendCodeModalOpen(true);
    setBottomSpacing(e.target.value);
  };

  return (
    <div>
      <Accordion open={open} toggle={toggle}>
        <AccordionItem>
          <AccordionHeader targetId="1">
            {' '}
            <MdOutlineColorLens size="20" className="" /> <span className="ms-1 ">Appearance</span>{' '}
          </AccordionHeader>
          <AccordionBody accordionId="1">
            <div className="d-flex align-items-center">
              <p className="mt-1 mx-2">Custom Logo</p>
              <span>{logo.filename}</span>
            </div>

            <input
              type="file"
              onChange={(e) => {
                handleChangeFile({ file: e.target.files[0], id: 1 });
              }}
              hidden
              ref={fileUploadRef}
            />
            <div className="d-flex align-items-center justify-content-center mb-3">
              <Button color="primary" onClick={handleFileUpload}>
                <FaFileUpload size="20" color="white" className="me-1" />
                Upload Logo
              </Button>
            </div>
            <p className="mt-1 ms-2">MAXIMIMIZED WINDOW</p>
            <Row className="justify-content-center">
              <Col
                sm="4"
                onClick={handleSmoothClick}
                className={`${
                  smooth ? 'text-success bg-light border  border-primary rounded-2' : ''
                }`}
                style={{ cursor: 'pointer' }}
              >
                <div className="text-center invisible">Smooth</div>
                <div className="border rounded-2 p-75 position-relative d-flex align-items-center justify-content-center">
                  {smooth && (
                    <div className="bg-transparent">
                      {' '}
                      <div className="">
                        <span class="position-absolute top-0 start-100 translate-middle  ">
                          <FaCheckCircle color="#312edb" size="22" />
                          <span class="visually-hidden">Smooth</span>
                        </span>
                      </div>
                    </div>
                  )}
                  <svg viewBox="0 0 80 80" style={{ color: '#424d5799', width: 80, height: 80 }}>
                    <path
                      d="M32,17 L50,17 C52.209139,17 54,18.790861 54,21 L54,57 C54,59.209139 52.209139,61 50,61 L32,61 C29.790861,61 28,59.209139 28,57 L28,21 C28,18.790861 29.790861,17 32,17 Z M33.5,45 C32.6715729,45 32,45.6715729 32,46.5 C32,47.3284271 32.6715729,48 33.5,48 L43.5,48 C44.3284271,48 45,47.3284271 45,46.5 C45,45.6715729 44.3284271,45 43.5,45 L33.5,45 Z M33,24 C32.4477153,24 32,24.4477153 32,25 L32,41 C32,41.5522847 32.4477153,42 33,42 L49,42 C49.5522847,42 50,41.5522847 50,41 L50,25 C50,24.4477153 49.5522847,24 49,24 L33,24 Z M41.5,50 C40.6715729,50 40,50.6715729 40,51.5 C40,52.3284271 40.6715729,53 41.5,53 L48.5,53 C49.3284271,53 50,52.3284271 50,51.5 C50,50.6715729 49.3284271,50 48.5,50 L41.5,50 Z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="text-center mt-25">Smooth</div>
              </Col>
              <Col
                sm={{ offset: 1, size: 4 }}
                onClick={handleModernClick}
                className={`${
                  modern ? 'text-success bg-light border  border-primary rounded-2 ' : ''
                }`}
                style={{ cursor: 'pointer' }}
              >
                <div className="text-center invisible">Modern</div>
                <div className="border  rounded-2 p-75 position-relative d-flex align-items-center justify-content-center">
                  {modern && (
                    <div className="">
                      <span class="position-absolute top-0 start-100 translate-middle  ">
                        <FaCheckCircle color="#312edb" size="22" />
                        <span class="visually-hidden">Modern</span>
                      </span>
                    </div>
                  )}
                  <svg viewBox="0 0 80 80" style={{ color: '#424d5799', width: 80, height: 80 }}>
                    <path
                      d="M57 57h9v2H14v-2h9V23a2 2 0 0 1 2-2h30a2 2 0 0 1 2 2v34zM26 29a1 1 0 0 0-1 1v26a1 1 0 0 0 1 1h28a1 1 0 0 0 1-1V30a1 1 0 0 0-1-1H26z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                  <div></div>
                </div>
                <div className="text-center mb-1 mt-25">Modern</div>
              </Col>
            </Row>

            <p className="mt-3 ms-1">MINIMIZED WINDOW</p>
            <Row className="justify-content-center">
              <Col
                sm="4"
                onClick={handleBarClick}
                className={`${bar ? 'text-success bg-light border  border-primary rounded-2' : ''}`}
                style={{ cursor: 'pointer' }}
              >
                <div className="text-center invisible">Bar</div>
                <div className="border rounded-2 p-75 position-relative d-flex align-items-center justify-content-center">
                  {bar && (
                    <div className="bg-transparent">
                      <div className="">
                        <span class="position-absolute top-0 start-100 translate-middle  ">
                          <FaCheckCircle color="#312edb" size="22" />
                          <span class="visually-hidden"> Bar</span>
                        </span>
                      </div>
                    </div>
                  )}
                  <svg viewBox="0 0 80 80" style={{ color: '#424d5799', width: 80, height: 80 }}>
                    <path
                      d="M63,39.8999819 L63,46 L66,46 L66,48 L14,48 L14,46 L17,46 L17,38 C17,35.790861 18.790861,34 21,34 L57.1000181,34 C57.0344303,34.3231099 57,34.6575342 57,35 C57,37.7614237 59.2385763,40 62,40 C62.3424658,40 62.6768901,39.9655697 63,39.8999819 Z M62,38 C60.3431458,38 59,36.6568542 59,35 C59,33.3431458 60.3431458,32 62,32 C63.6568542,32 65,33.3431458 65,35 C65,36.6568542 63.6568542,38 62,38 Z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="text-center mb-1">Bar</div>
              </Col>
              <Col
                sm={{ offset: 1, size: 4 }}
                onClick={handleBubbleClick}
                className={`${
                  bubble ? 'text-success bg-light border border-primary rounded-2' : ''
                }`}
                style={{ cursor: 'pointer' }}
              >
                <div className="text-center invisible">Bubble</div>
                <div className="border rounded-2 p-75 position-relative">
                  {bubble && (
                    <div>
                      <span class="position-absolute top-0 start-100 translate-middle  ">
                        <FaCheckCircle color="#312edb" size="22" />
                      </span>
                    </div>
                  )}
                  <svg viewBox="0 0 80 80" style={{ color: '#424d5799', width: 80, height: 80 }}>
                    <path
                      d="M44.5074471,27.8026741 C44.182457,28.4658851 44,29.211635 44,30 C44,32.7614237 46.2385763,35 49,35 C49.9758818,35 50.886465,34.7204238 51.6560244,34.2369967 C52.5163942,35.9738177 53,37.9304328 53,40 C53,47.1797017 47.1797017,53 40,53 C32.8202983,53 27,47.1797017 27,40 C27,32.8202983 32.8202983,27 40,27 C41.5846973,27 43.1031686,27.283547 44.5074471,27.8026741 Z M49,33 C47.3431458,33 46,31.6568542 46,30 C46,28.3431458 47.3431458,27 49,27 C50.6568542,27 52,28.3431458 52,30 C52,31.6568542 50.6568542,33 49,33 Z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="text-center mt-25 mb-1">Bubble</div>
              </Col>
            </Row>

            <p className="mt-3 ms-1">THEME MODE</p>
            <Row className="justify-content-center">
              <Col
                sm="4"
                onClick={(e) => handleThemeClick(e, true)}
                className={`${
                  theme ? 'text-success bg-light border border-primary rounded-2' : ''
                }`}
                style={{ cursor: 'pointer' }}
              >
                <div className="text-center invisible">Light</div>
                <div className="border rounded-2 p-75 position-relative d-flex justify-content-center align-items-center">
                  {theme && (
                    <div className="bg-transparent">
                      <div className="">
                        <span class="position-absolute top-0 start-100 translate-middle  ">
                          <FaCheckCircle color="#312edb" size="22" />
                        </span>
                      </div>
                    </div>
                  )}
                  <svg viewBox="0 0 40 40" style={{ color: '#424d5799', width: 40, height: 40 }}>
                    <path
                      d="M20 29a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1Zm-6.667-2.333a.943.943 0 0 1 0 1.333L12 29.333A.943.943 0 1 1 10.667 28L12 26.667a.943.943 0 0 1 1.333 0Zm14.667 0L29.333 28A.943.943 0 1 1 28 29.333L26.667 28A.943.943 0 1 1 28 26.667ZM20 13a7 7 0 1 1 0 14 7 7 0 0 1 0-14Zm12 6a1 1 0 0 1 0 2h-2a1 1 0 0 1 0-2h2Zm-22 0a1 1 0 0 1 0 2H8a1 1 0 0 1 0-2h2Zm19.333-8.333a.943.943 0 0 1 0 1.333L28 13.333A.943.943 0 1 1 26.667 12L28 10.667a.943.943 0 0 1 1.333 0Zm-17.333 0L13.333 12A.943.943 0 1 1 12 13.333L10.667 12A.943.943 0 1 1 12 10.667ZM20 7a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0V8a1 1 0 0 1 1-1Z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="text-center mt-25 mb-1">Light</div>
              </Col>
              <Col
                sm={{ offset: 1, size: 4 }}
                onClick={(e) => handleThemeClick(e, false)}
                className={`${
                  !theme ? 'text-success bg-light border border-primary rounded-2 ' : ''
                }`}
                style={{ cursor: 'pointer' }}
              >
                <div className="text-center invisible">Dark</div>
                <div className="border rounded-2 p-75 position-relative d-flex justify-content-center">
                  {!theme && (
                    <div className="">
                      <span class="position-absolute top-0 start-100 translate-middle  ">
                        <FaCheckCircle color="#312edb" size="22" />
                      </span>
                    </div>
                  )}
                  <svg viewBox="0 0 40 40" style={{ color: '#424d5799', width: 40, height: 40 }}>
                    <path
                      className="h-8 y-8  text-warning"
                      d="m18.995 10-.24.24c-.913.928-1.759 1.958-1.759 4.256 0 2.95 1.35 5.062 2.999 6.496 1.424 1.238 2.95 1.998 5.497 1.998 2.299 0 3.329-.845 4.257-1.759l.241-.24a.59.59 0 0 1 1.008.41v.426a1.663 1.663 0 0 1-.008.164c-.727 5.367-5.428 8.994-10.995 8.994C13.923 30.985 9 26.064 9 19.993 9 14.506 12.74 9.824 17.996 9c.076-.012.226-.017.45-.014l.142.002a.593.593 0 0 1 .407 1.011Z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="text-center mt-25 mb-1">Dark</div>
              </Col>
            </Row>

            <p className="mt-3 ms-1">THEME COLORS</p>
            <div className="theme-color-group d-flex justify-content-center my-2">
              <div
                className="rounded-circle cursor-pointer theme-color mx-1 d-flex align-items-center justify-content-center"
                style={{ backgroundColor: '#1565C0', width: '30px', height: '30px' }}
                onClick={(e) => handleThemeColorClicked(e, '#1565C0')}
              >
                <FaCheck
                  size="15"
                  className={themeColor == '#1565C0' ? 'd-block' : 'd-none'}
                  color="white"
                />
              </div>
              <div
                className="rounded-circle cursor-pointer theme-color mx-1 d-flex align-items-center justify-content-center"
                style={{ backgroundColor: '#6F0FFF', width: '30px', height: '30px' }}
                onClick={(e) => handleThemeColorClicked(e, '#6F0FFF')}
              >
                <FaCheck
                  size="15"
                  className={themeColor == '#6F0FFF' ? 'd-block' : 'd-none'}
                  color="white"
                />
              </div>
              <div
                className="rounded-circle cursor-pointer theme-color mx-1 d-flex align-items-center justify-content-center"
                style={{ backgroundColor: '#DA3807', width: '30px', height: '30px' }}
                onClick={(e) => handleThemeColorClicked(e, '#DA3807')}
              >
                <FaCheck
                  size="15"
                  className={themeColor == '#DA3807' ? 'd-block' : 'd-none'}
                  color="white"
                />
              </div>
              <div
                className="rounded-circle cursor-pointer theme-color mx-1 d-flex align-items-center justify-content-center"
                style={{ backgroundColor: '#0F8524', width: '30px', height: '30px' }}
                onClick={(e) => handleThemeColorClicked(e, '#0F8524')}
              >
                <FaCheck
                  size="15"
                  className={themeColor == '#0F8524' ? 'd-block' : 'd-none'}
                  color="white"
                />
              </div>
              <div
                className="rounded-circle cursor-pointer theme-color mx-1 d-flex align-items-center justify-content-center"
                style={{ backgroundColor: '#00796B', width: '30px', height: '30px' }}
                onClick={(e) => handleThemeColorClicked(e, '#00796B')}
              >
                <FaCheck
                  size="15"
                  className={themeColor == '#00796B' ? 'd-block' : 'd-none'}
                  color="white"
                />
              </div>
            </div>
          </AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="2">
            <MdZoomOutMap size="20" className="" /> <span className="ms-1 ">Position</span>{' '}
          </AccordionHeader>
          <AccordionBody accordionId="2">
            <Form>
              <FormGroup className="ms-3">
                <Row className="align-items-center">
                  <Col xs="12" className="">
                    <Row>
                      <Col xs="3">
                        <Label for="exampleEmail" className=" fw-bold   lh-lg mt-1">
                          Align to:
                        </Label>
                      </Col>
                      <Col xs="5">
                        <Input
                          id="exampleSelect"
                          name="select"
                          type="select"
                          value={align}
                          onChange={alignChange}
                        >
                          <option value="center">Center</option>
                          <option value="left">Left</option>
                          <option value="end">Right</option>
                        </Input>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs="12" className=" mt-1">
                    <Row className=" align-items-center">
                      <Col xs="3">
                        <Label for="exampleEmail" className="fw-bold lh-lg m-0">
                          Side spacing <span className="text-primary font-weight-bold ">:</span>
                        </Label>
                      </Col>
                      <Col xs="5">
                        <InputGroup size="xs">
                          <Input
                            type="number"
                            placeholder="10px"
                            onChange={(e) => {
                              sideSpacingChange(e);
                            }}
                          />
                          <InputGroupText>px</InputGroupText>
                        </InputGroup>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs="12" className=" mt-1">
                    <Row className="align-items-center">
                      <Col xs="3">
                        <Label for="exampleEmail" className=" fw-bold  lh-lg mt-1">
                          Bottom spacing:
                        </Label>
                      </Col>
                      <Col xs="5">
                        <InputGroup size="md">
                          <Input
                            placeholder="10px"
                            type="number"
                            onChange={(e) => {
                              bottomSpacingChange(e);
                            }}
                          />
                          <InputGroupText>px</InputGroupText>
                        </InputGroup>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                {/*                             ////////////////////////// */}
              </FormGroup>
            </Form>
          </AccordionBody>
        </AccordionItem>
        {/* <AccordionItem>
          <AccordionHeader targetId="3">
            {' '}
            <BiSlider size="20" className="" /> <span className="ms-1 ">Additional tweaks</span>{' '}
          </AccordionHeader>
          <AccordionBody accordionId="3">
            <Row>
              <Col sm="9">
                <Row>
                  <Col sm="10">Show Logo</Col>
                  <Col sm="2">
                    {' '}
                    <Form>
                      <FormGroup switch>
                        <Input type="switch" role="switch" />
                        <Label check></Label>
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="10">Show Agent's Photo</Col>
                  <Col sm="2">
                    {' '}
                    <Form>
                      <FormGroup switch>
                        <Input type="switch" role="switch" />
                        <Label check></Label>
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="10">Enable sound notifications for customers</Col>
                  <Col sm="2">
                    {' '}
                    <Form>
                      <FormGroup switch>
                        <Input type="switch" role="switch" />
                        <Label check></Label>
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="10">Let customers rate agents</Col>
                  <Col sm="2">
                    {' '}
                    <Form>
                      <FormGroup switch>
                        <Input type="switch" role="switch" />
                        <Label check></Label>
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="10">Let customers get chat transcripts</Col>
                  <Col sm="2">
                    {' '}
                    <Form>
                      <FormGroup switch>
                        <Input type="switch" role="switch" />
                        <Label check></Label>
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="10">White label widget</Col>
                  <Col sm="2">
                    {' '}
                    <Form>
                      <FormGroup switch>
                        <Input type="switch" role="switch" />
                        <Label check></Label>
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
                <hr />
              </Col>
              <Col sm="3"></Col>
            </Row>
          </AccordionBody>
        </AccordionItem> */}
        <AccordionItem>
          <AccordionHeader targetId="4">
            {' '}
            <BsFillChatDotsFill size="20" className="" />{' '}
            <span className="ms-1 ">Chat With Us Form</span>{' '}
          </AccordionHeader>
          <AccordionBody accordionId="4">
            <Row className="form-chatwidget">
              <Col sm="9">
                <Row>
                  <Col sm="10">User Name</Col>
                  <Col sm="2">
                    {' '}
                    <Form>
                      <FormGroup switch>
                        <Input type="switch" role="switch" checked={true} disabled />
                        <Label check></Label>
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="10">Phone</Col>
                  <Col sm="2">
                    {' '}
                    <Form>
                      <FormGroup switch>
                        <Input type="switch" role="switch" checked={true} disabled />
                        <Label check></Label>
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="10">Email</Col>
                  <Col sm="2">
                    {' '}
                    <Form>
                      <FormGroup switch>
                        <Input
                          type="switch"
                          name="email"
                          role="switch"
                          checked={switchValueEmail}
                          onChange={handleSwitchToggle}
                        />
                        <Label check></Label>
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="10">Website Address</Col>
                  <Col sm="2">
                    {' '}
                    <Form>
                      <FormGroup switch>
                        <Input
                          type="switch"
                          role="switch"
                          name="website"
                          checked={switchValueWeb}
                          onChange={handleSwitchToggle}
                        />
                        <Label check></Label>
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="10">Privacy Policy </Col>
                  <Col sm="2">
                    {' '}
                    <Form>
                      <FormGroup switch>
                        <Input
                          type="switch"
                          role="switch"
                          name="privacy"
                          checked={switchValuePrivacy}
                          onChange={handleSwitchToggle}
                        />
                        <Label check></Label>
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
                <hr />
              </Col>
              <Col sm="3"></Col>
            </Row>
          </AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="5">
            {' '}
            <BiCode size="20" className="" />{' '}
            <span className="ms-1 ">Install LiveChat code manually</span>{' '}
          </AccordionHeader>
          <AccordionBody accordionId="5">
            <ol id="sendingCode">
              Copy and paste this code before the closing {'<body/>'}
              tag on every page of your website.
              <div className="bg-gray-200 my-[8px] leading-8 flex flex-col items-start breadk-">
                <div>
                  <p>{`<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/bluesky0724/chat-widget-build/index.css">`}</p>
                </div>
                <div className="flex flex-col items-start">
                  <p>
                    {`<script src="https://cdn.jsdelivr.net/gh/bluesky0724/chat-widget-build/index.js"></script>`}
                  </p>
                </div>
                <div>
                  <p>
                    {`<script>
                  window._lc = window._lc || {};
                  window.__lc.license = '${getUserData().id}';
                  </script>`}
                  </p>
                </div>
              </div>
            </ol>
            <ol>
              <Button onClick={(e) => setSendCodeModalOpen(true)} color="primary">
                Send your code to developers
              </Button>
            </ol>

            {/* <Row>
              <Col sm="9">
                <Row>
                  <Col sm="10">Show Logo</Col>
                  <Col sm="2">
                    {' '}
                    <Form>
                      <FormGroup switch>
                        <Input type="switch" role="switch" />
                        <Label check></Label>
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="10">Show Agent's Photo</Col>
                  <Col sm="2">
                    {' '}
                    <Form>
                      <FormGroup switch>
                        <Input type="switch" role="switch" />
                        <Label check></Label>
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="10">Enable sound notifications for customers</Col>
                  <Col sm="2">
                    {' '}
                    <Form>
                      <FormGroup switch>
                        <Input type="switch" role="switch" />
                        <Label check></Label>
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="10">Let customers rate agents</Col>
                  <Col sm="2">
                    {' '}
                    <Form>
                      <FormGroup switch>
                        <Input type="switch" role="switch" />
                        <Label check></Label>
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="10">Let customers get chat transcripts</Col>
                  <Col sm="2">
                    {' '}
                    <Form>
                      <FormGroup switch>
                        <Input type="switch" role="switch" />
                        <Label check></Label>
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="10">White label widget</Col>
                  <Col sm="2">
                    {' '}
                    <Form>
                      <FormGroup switch>
                        <Input type="switch" role="switch" />
                        <Label check></Label>
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
                <hr />
              </Col>
              <Col sm="3"></Col>
            </Row> */}
          </AccordionBody>
        </AccordionItem>
        <AccordionItem className="bg-white">
          <div className="py-2">
            <div className="d-flex mb-2 align-items-center ps-1 pe-1">
              <FaRegSave size={20} />
              <h5 className="mb-0 ms-1">Save these all options</h5>
            </div>
            <div className="d-flex align-items-center justify-content-around ">
              <Button color="primary" onClick={handleSaveClick}>
                Save All
              </Button>
              <Button color="primary" onClick={handleResetClick}>
                Reset
              </Button>
            </div>
          </div>
        </AccordionItem>
      </Accordion>
      <SendCodeModal
        sendCodeModalOpen={sendCodeModalOpen}
        setSendCodeModalOpen={setSendCodeModalOpen}
        toggle={sendCodeModalToggle}
        code={code}
        setCode={setCode}
        devs={devs}
        setDevs={setDevs}
      />
    </div>
  );
}

export default Example;
