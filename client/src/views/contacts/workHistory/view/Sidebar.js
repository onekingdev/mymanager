// ** React Import
import { useMemo, Fragment, useEffect, useRef, useState } from 'react';

// ** Custom Components
import Sidebar from '@components/sidebar';
import Avatar from '../../../../@core/components/avatar';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

// ** Utils
import { getScreenshotsByUserId, getDetailImage } from '../../store/api';
import { Calendar, File, Plus, Icon, Settings, Users } from 'react-feather';
import {
  Button,
  Card,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
  Col,
  Label,
  Spinner
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/light.css';
// import { ChevronDown, ChevronUp } from 'react-feather';

const SidebarNewUsers = ({ open, toggleSidebar, userId, times, data }) => {
  // ** States
  const [isDetail, setIsDetail] = useState(false);
  const [showImage, setShowImage] = useState(null);
  const [active, setActive] = useState('1');
  const [newData, setNewData] = useState([]);
  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };
  // ** Store Vars
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [startPicker, setStartPicker] = useState(new Date());
  const handleSidebarClosed = () => {
    //
  };
  useEffect(async () => {
    let screens = [];
    let updatedData = [];
    const screendata = await getScreenshotsByUserId(userId, startPicker);
    screendata.data.map((screen) => {
      if (screen.screenshots.length != 0)
        updatedData.push({
          startTime: screen.startTime,
          endTime: screen.endTime,
          description: screen.description
        });
      screen.screenshots.map((item) => screens.push({ image: item, _id: screen._id }));
    });
    setImages(screens);
    setNewData(updatedData);
  }, [startPicker]);

  const ShowDetail = async (image_data) => {
    setShowImage(null);
    setIsDetail(true);
    const detailImage = await getDetailImage(image_data._id, image_data.image._id);
    setShowImage(detailImage.data);
  };

  const initModal = () => {
    setIsDetail(false);
  };
  const setStartPickerfuc = (e) => {
    setStartPicker(e[0]);
  };

  return (
    <Sidebar
      style={{ width: '800px' }}
      open={open}
      title="View detail"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Card className="post">
        <CardBody>
          <Row>
            <Col md="6" className="mb-1">
              <div className="d-flex">
                <Avatar
                  className="me-1"
                  color="light-primary"
                  content={data.name}
                  size="lg"
                  // id={`av-tooltip-${data.name}`}
                  imgWidth="50"
                  initials
                />
                <div className="profile-user-info">
                  <h4 className="mb-0 mt-1">{data.name}</h4>
                </div>
              </div>
            </Col>
            <Col md="6" className="mb-1">
              <Row>
                <Col md="4" className="mb-1 mt-1">
                  <Label className="form-label" for="date-time-picker">
                    <h5>Select Date</h5>
                  </Label>
                </Col>
                <Col md="8" className="mb-1">
                  <Flatpickr
                    value={startPicker}
                    id="startWorkDate"
                    name="starWorktDate"
                    className="form-control"
                    onChange={(date) => setStartPickerfuc(date)}
                    options={{
                      enableTime: false,
                      dateFormat: 'Y-m-d'
                    }}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <table className="w-100 ">
            <thead>
              <tr>
                {times.map((day) => (
                  <th className="cursor-pointer text-end">
                    <span style={{ fontWeight: '200' }}> {day}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <th className="border cursor-pointer" style={{ height: '60px' }}>
                {newData.length != 0 &&
                  newData.map((time, index) => {
                    const window_width = screen.width;
                    const start = new Date(time.startTime);
                    const end = new Date(time.endTime);
                    const startDiff = start.getHours() * 60 + start.getMinutes();
                    const duration =
                      end.getHours() * 60 +
                      end.getMinutes() -
                      start.getHours() * 60 -
                      start.getMinutes();
                    return (
                      <div
                        key={index}
                        style={{
                          position: 'absolute',
                          left: `calc(718px*${startDiff}/1440)`,
                          width: `calc(718px*${duration}/1440)`,
                          height: '20px',
                          backgroundColor: '#27c26c'
                        }}
                      ></div>
                    );
                  })}
              </th>

              <th className="border cursor-pointer"></th>
              <th className="border cursor-pointer"></th>
              <th className="border cursor-pointer"></th>
              <th className="border cursor-pointer"></th>
              <th className="border cursor-pointer"></th>
              <th className="border cursor-pointer"></th>
              <th className="border cursor-pointer"></th>
              <th className="border cursor-pointer"></th>
              <th className="border cursor-pointer"></th>
              <th className="border cursor-pointer"></th>
              <th className="border cursor-pointer"></th>
            </tbody>
          </table>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <h4>{moment(startPicker).format('ll')}</h4>
          <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }}>
            <Fragment>
              <Nav pills className="mb-2">
                <NavItem>
                  <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
                    <Calendar className="font-medium-1 me-50" />
                    <span className="fs-6">History</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
                    <File className="font-medium-1 me-50" />
                    {/* <span className="fs-6">My Forms</span> */}
                    <span className="fs-6">Screenshots</span>
                  </NavLink>
                </NavItem>
              </Nav>

              <TabContent activeTab={active}>
                <TabPane tabId="1">
                  <table className="w-100 ">
                    <thead>
                      <tr>
                        <th className="cursor-pointer text-center">
                          <span style={{ fontWeight: '200' }}> Date</span>
                        </th>
                        <th className="cursor-pointer text-center">
                          <span style={{ fontWeight: '200' }}> Time Start</span>
                        </th>
                        <th className="cursor-pointer text-center">
                          <span style={{ fontWeight: '200' }}> Time End</span>
                        </th>
                        <th className="cursor-pointer text-center">
                          <span style={{ fontWeight: '200' }}> Descriptions</span>
                        </th>
                        <th className="cursor-pointer text-center">
                          <span style={{ fontWeight: '200' }}> Type</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {newData.length != 0 &&
                        newData.map((item, index) => {
                          const first = new Date(item.startTime);
                          const startTimeHour = first.getHours();
                          const startTimeMinute = first.getMinutes();
                          const end = new Date(item.endTime);
                          const endTimeHour = end.getHours();
                          const endTimeMinute = end.getMinutes();
                          return (
                            <tr key={index} className="text-center">
                              <th>
                                {first.getMonth()}/{first.getDate()}/{first.getFullYear()}
                              </th>
                              <th>
                                {startTimeHour % 12 < 10 && '0'}
                                {startTimeHour % 12} : {startTimeMinute < 10 && '0'}
                                {startTimeMinute} {parseInt(startTimeHour / 12) == 0 ? 'AM' : 'PM'}
                              </th>
                              <th>
                                {endTimeHour % 12 < 10 && '0'}
                                {endTimeHour % 12} : {endTimeMinute < 10 && '0'}
                                {endTimeMinute} {parseInt(endTimeHour / 12) == 0 ? 'AM' : 'PM'}
                              </th>
                              <th>{item.description}</th>
                              <th></th>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </TabPane>
                <TabPane tabId="2">
                  <Row>
                    {images.length != 0 &&
                      images.map((item, index) => {
                        const date = new Date(item.image.trackTime);
                        const hour = date.getHours();
                        const min = date.getMinutes();
                        return (
                          <Col
                            key={index}
                            md="2"
                            xs="3"
                            className="d-flex flex-wrap profile-latest-img mt-2"
                          >
                            <a>
                              <img
                                className="img-fluid rounded"
                                src={item.image.screenshot_sm}
                                style={{ width: '100px' }}
                                alt="latest-photo"
                                onClick={() => ShowDetail(item)}
                              />
                              <p className="me-1">
                                {date.getMonth()}/{date.getDate()}/{date.getFullYear()}
                                <br></br>
                                {hour < 10 && '0'}
                                {hour % 12}: {min < 10 && '0'}
                                {min} {parseInt(hour / 12) == 0 ? 'AM' : 'PM'}
                              </p>
                              <p className="text-center mt-1"></p>
                            </a>
                          </Col>
                        );
                      })}
                    <Modal isOpen={isDetail} className="modal-dialog-centered modal-lg">
                      <ModalHeader closeButton onClick={initModal}></ModalHeader>
                      <ModalBody>
                        {showImage == null ? (
                          <Spinner className="me-25" />
                        ) : (
                          <img src={showImage} width="80%" className="mx-auto d-block"></img>
                        )}
                      </ModalBody>
                      <ModalFooter>
                        <Button variant="danger" onClick={initModal}>
                          Close
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </Row>
                </TabPane>
              </TabContent>
            </Fragment>
          </Col>
        </CardBody>
      </Card>
    </Sidebar>
  );
};

export default SidebarNewUsers;
