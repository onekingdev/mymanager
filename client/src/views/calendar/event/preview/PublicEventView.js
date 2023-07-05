// ** React Imports
import { Fragment, useEffect, useState } from 'react';

// ** Components
import Avatar from '@components/avatar';

// ** Reactstrap Imports
import { Row, Col, Button, Badge, Spinner } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserShield, FaUserPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { formatFullDate } from '@src/utility/Utils';

// ** Styles
import '@styles/react/libs/swiper/swiper.scss';

import '@src/assets/styles/eventpreview/event-preview-public.scss';
import { Calendar } from 'react-feather';
import Footer from '@layouts/components/footer';
import ReplyModal from './modals/ReplyModal';
import { getEventInfoAction } from '../store/actions';

const PublicEventView = () => {
  // ** Store variable
  const dispatch = useDispatch();
  const { eventId } = useParams();

  // ** State variable
  /// ** Modal States */
  const [replyModal, setReplyModal] = useState(false);

  // ** Redux
  const eventInfo = useSelector((state) => state.event.eventInfo);
  const eventLoading = useSelector((state) => state.event.eventLoading);
  // ** Effects
  useEffect(() => {
    dispatch(getEventInfoAction(eventId));
  }, [eventId]);

  useEffect(() => {
    document.querySelector('body').classList.add('event-preview-2');
  }, []);

  // ** Handlers
  const handleCheckClick = () => {
    setReplyModal(true);
  };

  return (
    <Fragment>
      <>
        <div className="bg-white">
          <nav className="navbar align-items-center floating-nav navbar-shadow navbar navbar-expand-lg navbar-light event-preview-navbar mt-0 justify-content-center">
            <div className="container">
              <div className="w-100 d-flex justify-content-between py-1">
                <div className="d-flex align-items-center">
                  <Link
                    className="brand-logo d-flex align-items-center"
                    to="/"
                    onClick={(e) => e.preventDefault()}
                  >
                    <svg viewBox="0 0 139 95" version="1.1" height="28">
                      <defs>
                        <linearGradient
                          x1="100%"
                          y1="10.5120544%"
                          x2="50%"
                          y2="89.4879456%"
                          id="linearGradient-1"
                        >
                          <stop stopColor="#000000" offset="0%"></stop>
                          <stop stopColor="#FFFFFF" offset="100%"></stop>
                        </linearGradient>
                        <linearGradient
                          x1="64.0437835%"
                          y1="46.3276743%"
                          x2="37.373316%"
                          y2="100%"
                          id="linearGradient-2"
                        >
                          <stop stopColor="#EEEEEE" stopOpacity="0" offset="0%"></stop>
                          <stop stopColor="#FFFFFF" offset="100%"></stop>
                        </linearGradient>
                      </defs>
                      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g id="Artboard" transform="translate(-400.000000, -178.000000)">
                          <g id="Group" transform="translate(400.000000, 178.000000)">
                            <path
                              d="M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z"
                              id="Path"
                              className="text-primary"
                              style={{ fill: 'currentColor' }}
                            ></path>
                            <path
                              d="M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z"
                              id="Path"
                              fill="url(#linearGradient-1)"
                              opacity="0.2"
                            ></path>
                            <polygon
                              id="Path-2"
                              fill="#000000"
                              opacity="0.049999997"
                              points="69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325"
                            ></polygon>
                            <polygon
                              id="Path-2"
                              fill="#000000"
                              opacity="0.099999994"
                              points="69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338"
                            ></polygon>
                            <polygon
                              id="Path-3"
                              fill="url(#linearGradient-2)"
                              opacity="0.099999994"
                              points="101.428699 0 83.0667527 94.1480575 130.378721 47.0740288"
                            ></polygon>
                          </g>
                        </g>
                      </g>
                    </svg>
                    <h2 className="brand-text text-primary ms-1">My Manager</h2>
                  </Link>
                  {/* <Button onClick={toggle} color="primary" className="d-flex align-items-center"><FaEnvelopeOpenText size="15" className="me-1" />Reply Event</Button> */}
                </div>
                <div className="d-flex align-items-center">
                  <div className="mb-0 me-auto font-medium-2 font-weight-bold">
                    <h4 className="fw-bolder text-uppercase">
                      <span className="font-large-1 text-primary">{eventInfo.eventCategory}</span>{' '}
                      event manager{' '}
                    </h4>
                  </div>
                </div>
                <div className="d-flex justify-content-end align-items-center">
                  <Link to="/">
                    <Button color="primary" className="me-1 align-items-center d-flex ">
                      <FaUserShield size="15" className="me-1" />
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button color="primary" className="d-flex align-items-center">
                      <FaUserPlus size="15" className="me-1" />
                      Register
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </nav>
          <div className="header-navbar-shadow d-block"></div>
          <div className="container">
            <div className="intro-banner">
              {eventLoading ? (
                <div
                  className="d-flex align-items-center"
                  style={{ width: '100%', height: '500px' }}
                >
                  <div className="d-flex flex-column align-items-center" style={{ width: '100%' }}>
                    <Spinner style={{ width: '4rem', height: '4rem' }} />
                    <h3 className="mt-1 fw-bold">Loading . . .</h3>
                  </div>
                </div>
              ) : (
                <img
                  src={
                    eventInfo.eventBanner
                      ? eventInfo.eventBanner
                      : 'https://me.mymanager.com/assets/images/events/default.jpg'
                  }
                  height="500"
                  alt="Event Banner"
                  className="w-100"
                />
              )}
            </div>
          </div>
          <div className="container">
            <div className="event-details-wrapper mt-5">
              <div className="event-detail-main d-flex flex-column justify-content-start">
                <div>
                  <p className="start-date">{formatFullDate(new Date())}</p>
                  <h1
                    style={{ fontWeight: 'bolder', color: '#000' }}
                    className="mb-50 font-large-2 mt-1"
                  >
                    {eventInfo?.title}
                    <Badge
                      className="text-capitalize ms-1  font-medium-1"
                      style={{ verticalAlign: 'super' }}
                      color={eventInfo.type == 'Public' ? 'light-success' : 'light-warning'}
                    >
                      {eventInfo.type ? eventInfo.type : 'Public'}
                    </Badge>
                  </h1>
                  <small className="text-capitalize d-block mb-25 font-medium-3">
                    {eventInfo?.eventCategory ? eventInfo.eventCategory : 'General'} Event
                  </small>
                  <p className="summary font-medium-3 mb-0">{eventInfo.notes}</p>
                </div>
                <div className="mt-5">
                  <h2>When and Where</h2>
                  <Row className="mt-2">
                    <Col md="6" className="datetime-heading d-flex flex-row ">
                      <div className="me-2">
                        <Avatar
                          className="rounded"
                          color="light-success"
                          icon={<Calendar size={24} />}
                        />
                      </div>
                      <div>
                        <h4 className="">Date and time</h4>
                        <p>
                          {eventInfo.start ? formatFullDate(new Date(eventInfo.start)) : 'Anytime'}{' '}
                          -{eventInfo.end ? formatFullDate(new Date(eventInfo.end)) : 'Anytime'}
                        </p>
                      </div>
                    </Col>
                    <Col md="6" className="location-heading">
                      <div className="datetime-heading d-flex flex-row ">
                        <div className="me-2">
                          <Avatar
                            className="rounded"
                            color="light-success"
                            icon={<Calendar size={24} />}
                          />
                        </div>
                        <div>
                          <h4 className="">Location</h4>
                          <p>{eventInfo.eventAddress ? eventInfo.eventAddress : 'Anywhere'}</p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row className="mt-2">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29195.74079167713!2d78.73111716149656!3d23.837523965710304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3978d14a2cf591af%3A0xf446eaa2b5281370!2sSagar%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1681053566934!5m2!1sen!2sin"
                      style={{ width: '100%', height: '400px' }}
                      allowfullscreen=""
                      loading="lazy"
                      referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </Row>
                  <Row className="mt-5">
                    <h2>Refund Policy</h2>
                    <p>No Refund</p>
                  </Row>
                  <Row className="mt-5 mb-5">
                    <h2>About this event</h2>
                    <div dangerouslySetInnerHTML={{ __html: eventInfo.eventDetail }}></div>
                  </Row>
                </div>
              </div>
              <div className="event-details-aside">
                <div className="conversion-bar conversion-bar--checkout-opener eds-fx--slide-up d-flex flex-column justify-content-center text-center">
                  {['product', 'ticket'].includes(eventInfo.checkoutType) && (
                    <>
                      <p style={{ fontSize: '1rem' }}>${eventInfo.ticketPrice}</p>
                      <p>Fees and taxes included</p>
                    </>
                  )}
                  <Button color="danger" className="w-100" onClick={(e) => handleCheckClick()}>
                    {eventInfo.checkoutType === 'product' && 'Buy now'}
                    {eventInfo.checkoutType === 'ticket' && 'Get Tickets'}
                    {eventInfo.checkoutType === 'none' && 'RSVP'}
                    {!eventInfo.checkoutType && 'Get Tickets'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <ReplyModal
            replyModal={replyModal}
            setReplyModal={setReplyModal}
            eventInfo={eventInfo}
            contactId={null}
            contactEmail={'admin@private.com'}
          />
        </div>
        <Footer />
      </>
    </Fragment>
  );
};

export default PublicEventView;
