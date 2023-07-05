import React, { Fragment, useState, useEffect } from 'react';
import { CheckCircle, Clock } from 'react-feather';
import {
  Button,
  Card,
  Col,
  Input,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane
} from 'reactstrap';
import Moment from 'react-moment';
import moment from 'moment';
import GridView from './GridView';
import FeedView from './FeedView';
import CalendarView from './CalendarView';
import { Edit2 } from 'react-feather';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookSquare } from 'react-icons/fa';
import { FaTwitterSquare } from 'react-icons/fa';
import { BsLinkedin } from 'react-icons/bs';
import { FaYoutube } from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa';
import { AiOutlinePlusSquare } from 'react-icons/ai';
import Insta from '../../../../assets/images/logo/insta.png';
import { Modal, ModalHeader, ModalBody, ModalFooter, Alert, Tooltip } from 'reactstrap';
import Profile from '../../../../assets/images/profile/post-media/2.jpg';
import Select from 'react-select';
import { selectThemeColors } from '@utils';
import { toast } from 'react-toastify';
import CreateWorkspace from './CreateWorkspace';
import { addCompose, viewOneWorkspace } from '../../../../requests/Planable';
import { useParams } from 'react-router-dom';

import '../../../../assets/styles/socialconnect.scss';
import { AddPages } from './AddPages';
import { AddGooglepage } from './AddGooglepage';
import { param } from 'jquery';

const WorkspaceMain = ({ workspacename, args }) => {
  const workspacetitle = workspacename;
  const [basicModal, setBasicModal] = useState(false);
  const [active, setActive] = useState('today');
  const [activeadd, setActiveadd] = useState('facebook');
  const [viewType, setViewType] = useState('Feed View');
  const [textarea, setTextarea] = useState('');
  const [time, setTime] = useState();
  const [date, setDate] = useState('');
  const [Url, setUrl] = useState('');
  const [file, setFile] = useState();
  const [social, setSocial] = useState();
  const [tab, setTab] = useState('');
  const [Loading, setLoading] = useState(false);
  const [tooltipOpe, setTooltipOpe] = useState(false);
  const [tooltipO, setTooltipO] = useState(false);
  const [viewOne, setViewone] = useState();
  const [composeImage, setcomposeImage] = useState('');
  const [ResComose, setResComose] = useState(false);
  const [currentime, setcurrentime] = useState('');

  const [modaladdone, setModalAddone] = useState(false);
  const toggleaddone = () => setModalAddone(!modaladdone);
  const toggletool = () => setTooltipOpe(!tooltipOpe);
  const togglesecon = () => setTooltipO(!tooltipO);

  const params = useParams();

  useEffect(() => {
    GetOneWorkSpace();
  }, []);

  useEffect(() => {
    setInterval(() => {
      setcurrentime(new Date().toLocaleString());
    }, 1000);
  }, []);

  const GetOneWorkSpace = async () => {
    localStorage.setItem('getcompose', false);

    setLoading(true);
    await viewOneWorkspace(params.id).then((response) => {
      setViewone(response);
      if (response.facebookData.length > 0) {
        setcomposeImage(response?.facebookData[0]?.profileImg);
        console.log(response?.createdAt.split('T')[0]);

        setLoading(false);
        setTab('today');
      } else if (response.googleData.length > 0) {
        setTab('completed');
        setLoading(false);
      } else if (response.instaData.length > 0) {
        setTab('test-3');
        setLoading(false);
      } else if (response.linkedlnData.length > 0) {
        setTab('test-2');
        setLoading(false);
      } else if (response.tiktokData.length > 0) {
        setTab('test-5');
        setLoading(false);
      } else if (response.twitterData.length > 0) {
        setTab('test-1');
        setLoading(false);
      } else if (response.youtubeData.length > 0) {
        setTab('test-4');
        setLoading(false);
      }

      // if (response?.facebookData.length > 0) {
      //   setLoader(false);
      //   setViewOne(response?.facebookData[0]);
      // } else if (response?.googleData.length > 0) {
      //   setLoader(false);
      //   setViewOne(response.googleData[0]);
      // }
    });
  };

  const handleSelectSocial = (select) => {
    const socialconnect = select.map((data) => data.label);
    const data = socialconnect;
    setSocial(data);
  };

  const handleSubmit = async () => {
    const formdata = new FormData();

    if (textarea.length > 2) {
      formdata.append('workspaceId', params.id);
      formdata.append('file', file);
      formdata.append('url', Url);
      formdata.append('desc', textarea);
      formdata.append('date', date);
      formdata.append('time', time);
      formdata.append('platform', social);

      await addCompose(formdata)
        .then((response) => {
          console.log(response);
          if (response.msg == 'Compose created successfully') {
            setResComose(true);
            toast.success('Composed Created Successfully');
            setTextarea('');
            setTime('');
            setDate('');
            setUrl('');
            setFile('');
            setSocial('');
          } else {
            setTextarea('');
            setTime('');
            setDate('');
            setUrl('');
            setFile('');
            setSocial('');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const toggle = (tab) => {
    setActive(tab);
  };
  const toggleadd = (tab) => {
    setActiveadd(tab);
  };
  const handleViewType = (e) => {
    setViewType(e.target.value);
  };

  const colourOptions = [
    { value: 'Facebook', label: 'Facebook' },
    { value: 'Google', label: 'Google' },
    { value: 'Twitter', label: 'Twitter' },
    { value: 'Linkdin', label: 'Linkdin' },
    { value: 'Instagram', label: 'Instagram' }
  ];

  return (
    <Fragment>
      {Loading === true ? (
        <>
          <h3>Loading...</h3>
        </>
      ) : (
        <>
          <h3>
            <Card className="p-1 Socialmedia_heading">
              <Row className="SocialmediaRow">
                <Col sm={2} md={2} lg={2}>
                  <Input type="select" onChange={handleViewType} value={viewType}>
                    <option value="Grid View">Grid View</option>
                    <option value="Feed View">Feed View</option>
                    <option value="Calendar View">Calendar View</option>
                  </Input>
                </Col>
                <Col sm={8} md={8} lg={8} className="iconfeedview">
                  <Nav className="justify-content-center mb-0 mt-0" tabs>
                    <NavItem>
                      {tab === 'today' && (
                        <NavLink
                          active={active === 'today'}
                          onClick={() => {
                            toggle('today');
                          }}
                        >
                          <div>
                            <FaFacebookSquare size={25} />

                            <h6 className="logo" style={{ color: 'black' }}>
                              {workspacetitle?.slice(0, 4)}
                            </h6>
                          </div>
                        </NavLink>
                      )}
                    </NavItem>
                    <NavItem>
                      {tab === 'completed' && (
                        <NavLink
                          active={active === 'completed'}
                          onClick={() => {
                            toggle('completed');
                          }}
                        >
                          <div>
                            <FcGoogle size={25} />
                            <h6 className="logo" style={{ color: 'black' }}>
                              {workspacetitle?.slice(0, 4)}
                            </h6>
                          </div>
                        </NavLink>
                      )}
                    </NavItem>

                    <NavItem>
                      {tab == 'test-1' && (
                        <NavLink
                          active={active === 'test-1'}
                          onClick={() => {
                            toggle('test-1');
                          }}
                        >
                          <div>
                            <FaTwitterSquare size={25} fill="#00acee" />
                            <h6 className="logo" style={{ color: 'black' }}>
                              {workspacetitle?.slice(0, 4)}
                            </h6>
                          </div>
                        </NavLink>
                      )}
                    </NavItem>
                    <NavItem>
                      {tab == 'test-2' && (
                        <NavLink
                          active={active === 'test-2'}
                          onClick={() => {
                            toggle('test-2');
                          }}
                        >
                          <div>
                            <BsLinkedin size={25} fill="#0A66C2" />
                            <h6 className="logo" style={{ color: 'black' }}>
                              {workspacetitle?.slice(0, 4)}
                            </h6>
                          </div>
                        </NavLink>
                      )}
                    </NavItem>

                    <NavItem>
                      {tab == 'test-3' && (
                        <NavLink
                          active={active === 'test-3'}
                          onClick={() => {
                            toggle('test-3');
                          }}
                        >
                          <div>
                            <img src={Insta} alt="insta" width={25} />
                            <h6 className="logo" style={{ color: 'black' }}>
                              {workspacetitle?.slice(0, 4)}
                            </h6>
                          </div>
                        </NavLink>
                      )}
                    </NavItem>

                    <NavItem>
                      {tab == 'test-4' && (
                        <NavLink
                          active={active === 'test-4'}
                          onClick={() => {
                            toggle('test-4');
                          }}
                        >
                          <div>
                            <FaYoutube size={25} fill="#c4302b" />
                            <h6 className="logo" style={{ color: 'black' }}>
                              {workspacetitle?.slice(0, 4)}
                            </h6>
                          </div>
                        </NavLink>
                      )}
                    </NavItem>
                    <NavItem>
                      {tab == 'test-5' && (
                        <NavLink
                          active={active === 'test-5'}
                          onClick={() => {
                            toggle('test-5');
                          }}
                        >
                          <div>
                            <FaTiktok size={25} fill="#EE1D52" />
                            <h6 className="logo" style={{ color: 'black' }}>
                              {workspacetitle?.slice(0, 4)}
                            </h6>
                          </div>
                        </NavLink>
                      )}
                    </NavItem>
                    <NavItem>
                      <NavLink
                        active={active === 'test-6'}
                        onClick={toggleaddone}
                        // onClick={() => {
                        //   toggle('test-6');
                        // }}
                      >
                        <div>
                          <div className="container">
                            <AiOutlinePlusSquare size={28} fill="blue" />
                          </div>
                          <h6 className="d-flex justify-content-center " style={{ color: 'black' }}>
                            Add Page
                          </h6>
                        </div>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </Col>
                <Col sm={2} md={2} lg={2} className="d-flex justify-content-end">
                  <div className="composebutton">
                    <Button
                      color="success"
                      onClick={() => setBasicModal(!basicModal)}
                      className="composebtn"
                    >
                      <Edit2 size={18} className="me-1" />
                      Compose
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card>
            <TabContent className="py-50" activeTab={active}>
              <TabPane tabId="today">
                {viewType === 'Grid View' ? (
                  <GridView ResComose={ResComose} setResComose={setResComose} />
                ) : viewType === 'Feed View' ? (
                  <FeedView ResComose={ResComose} setResComose={setResComose} />
                ) : (
                  <CalendarView ResComose={ResComose} setResComose={setResComose} />
                )}
              </TabPane>

              <TabPane tabId="completed">
                {viewType === 'Grid View' ? (
                  <GridView />
                ) : viewType === 'Feed View' ? (
                  <FeedView />
                ) : (
                  <CalendarView />
                )}
              </TabPane>
              {/* <TabPane tabId="test-1">
                {viewType === 'Grid View' ? (
                  <GridView />
                ) : viewType === 'Feed View' ? (
                  <FeedView />
                ) : (
                  <CalendarView />
                )}
              </TabPane> */}
              {/* <TabPane tabId="test-2">
                {viewType === 'Grid View' ? (
                  <GridView />
                ) : viewType === 'Feed View' ? (
                  <FeedView />
                ) : (
                  <CalendarView />
                )}
              </TabPane> */}
              {/* <TabPane tabId="test-3">
                {viewType === 'Grid View' ? (
                  <GridView />
                ) : viewType === 'Feed View' ? (
                  <FeedView />
                ) : (
                  <CalendarView />
                )}
              </TabPane> */}
              {/* <TabPane tabId="test-4">
                {viewType === 'Grid View' ? (
                  <GridView />
                ) : viewType === 'Feed View' ? (
                  <FeedView />
                ) : (
                  <CalendarView />
                )}
              </TabPane> */}
              {/* <TabPane tabId="test-5">
                {viewType === 'Grid View' ? (
                  <GridView />
                ) : viewType === 'Feed View' ? (
                  <FeedView />
                ) : (
                  <CalendarView />
                )}
              </TabPane> */}
              {/* <TabPane tabId="test-6">
                <CreateWorkspace />
              </TabPane> */}
            </TabContent>
          </h3>
        </>
      )}

      <div>
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          isOpen={basicModal}
          toggle={() => setBasicModal(!basicModal)}
        >
          <ModalHeader toggle={() => setBasicModal(!basicModal)}>Compose your post</ModalHeader>
          <ModalBody>
            <div className="compose-content">
              <form>
                <Row>
                  <Col md="2">
                    <div className="text-center">
                      <img
                        className="mb-1 mt-1"
                        alt="profile"
                        src={composeImage}
                        style={{
                          border: '1px solid',
                          borderRadius: '4%',
                          width: '50px',
                          height: '50px'
                        }}
                      />
                    </div>
                  </Col>
                  <Col md="10">
                    <Select
                      onChange={handleSelectSocial}
                      theme={selectThemeColors}
                      isMulti
                      className="react-select"
                      classNamePrefix="select"
                      // defaultValue={colourOptions[0]}
                      options={colourOptions}
                      isClearable={true}
                    />
                  </Col>
                  <Col md="12" className="mt-1">
                    <Input
                      type="textarea"
                      name="text"
                      id="exampleText"
                      value={textarea}
                      rows="3"
                      placeholder="write something..."
                      onChange={(e) => setTextarea(e.target.value)}
                    />
                  </Col>
                  <Col md="12" className="mt-1">
                    <label className="">Select Time and Date</label>
                    <Row>
                      <Col md="6">
                        <Input
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          type="time"
                          name=""
                        />
                      </Col>
                      <Col md="6">
                        <Input
                          min={moment(currentime).format().split('T')[0]}
                          onChange={(e) => setDate(e.target.value)}
                          type="date"
                          name=""
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col md="6" className="mt-1">
                    <label className="">Add Url</label>
                    <Input
                      value={Url}
                      onChange={(e) => setUrl(e.target.value)}
                      type="text"
                      placeholder="www.dummy.com"
                    />
                  </Col>
                  <Col md="6" className="mt-1">
                    <label className="">Add File</label>
                    <Input onChange={(e) => setFile(e.target.files[0])} type="file" />
                  </Col>
                </Row>
              </form>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color={textarea.length > 5 ? 'primary' : 'secondary'}
              onClick={() => {
                setBasicModal(!basicModal);
                handleSubmit();
              }}
            >
              Submit
            </Button>
          </ModalFooter>
        </Modal>
      </div>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        // centered
        isOpen={modaladdone}
        toggle={toggleaddone}
        {...args}
      >
        <ModalHeader
          className="d-flex justify-content-center mainheadermodaladdpage"
          toggle={toggleaddone}
        >
          <div className=" addpagesclass">
            <span className="addpagetextmodal">Add pages</span>
          </div>
        </ModalHeader>
        <Row>
          <Nav className="justify-content-center mb-0 mt-1" tabs>
            <NavItem>
              <NavLink
                className="facebook"
                active={activeadd === 'facebook'}
                onClick={() => {
                  toggleadd('facebook');
                }}
              >
                <div>
                  <FaFacebookSquare size={21} />
                </div>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className="facebook"
                active={activeadd === 'google'}
                onClick={() => {
                  toggleadd('google');
                }}
              >
                <div>
                  <FcGoogle size={21} />
                </div>
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                className="facebook"
                active={activeadd === 'twittor'}
                onClick={() => {
                  toggleadd('twittor');
                }}
              >
                <div>
                  <FaTwitterSquare size={21} fill="#00acee" />
                </div>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className="facebook"
                active={activeadd === 'linkedin'}
                onClick={() => {
                  toggleadd('linkedin');
                }}
              >
                <div>
                  <BsLinkedin size={21} fill="#0A66C2" />
                </div>
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                className="facebook"
                active={activeadd === 'instagram'}
                onClick={() => {
                  toggleadd('instagram');
                }}
              >
                <div>
                  <img src={Insta} alt="insta" width={21} />
                </div>
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                className="facebook"
                active={activeadd === 'youtube'}
                onClick={() => {
                  toggleadd('youtube');
                }}
              >
                <div>
                  <FaYoutube size={21} fill="#c4302b" />
                </div>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className="facebook"
                active={activeadd === 'tiktok'}
                onClick={() => {
                  toggleadd('tiktok');
                }}
              >
                <div>
                  <FaTiktok size={21} fill="#EE1D52" />
                </div>
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent className="py-10" activeTab={activeadd}>
            <TabPane tabId="facebook">
              <AddPages viewOne={viewOne} />
            </TabPane>

            <TabPane tabId="google">
              <AddGooglepage />
            </TabPane>

            <TabPane tabId="twittor">
              <AddPages />
            </TabPane>

            <TabPane tabId="linkedin">
              <AddPages />
            </TabPane>
            <TabPane tabId="instagram">
              <AddPages />
            </TabPane>

            <TabPane tabId="youtube">
              <AddPages />
            </TabPane>

            <TabPane tabId="tiktok">
              <AddPages />
            </TabPane>
          </TabContent>
        </Row>
      </Modal>
    </Fragment>
  );
};
export default WorkspaceMain;
