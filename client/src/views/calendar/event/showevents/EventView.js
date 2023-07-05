import React, { useContext, useEffect, useState } from 'react';
import { Badge, Button, Card, Col, Collapse, Label, Row } from 'reactstrap';
import Select from 'react-select';
import { Link } from 'react-router-dom';

import { FaChevronDown, FaChevronUp, FaPhoneAlt } from 'react-icons/fa';
import { GrLocation, GrMail } from 'react-icons/gr';
import { IoLocationSharp } from 'react-icons/io5';

import defaultImg from '@src/assets/images/banner/default.png';
import DeleteEventModal from './DeleteEventModal';
import { deleteEvent } from '../store';
import { toast } from 'react-toastify';

// ** Styles
import '@styles/react/libs/swiper/swiper.scss';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';

const categoryObj = {
  birthday: 'info',
  general: 'success',
  promotion: 'warning'
};
function EventView({ toggle, eventData, isOpen }) {
  const [eventId, setEventId] = useState('');
  const [deleteModal, setDeleteModal] = useState(false);
  const toggleDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };

  const dispatch = useDispatch();

  const handleViewClick = (id) => {
    window.open(`/event-view/${id}`);
  };
  const handleRemoveClick = (id) => {
    Swal.fire({
      title: 'Delete?',
      text: `Are you sure you want to delete this data?`,
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete anyway',
      cancelButtonText: 'Cancel',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        if (id) {
          dispatch(deleteEvent(id)).then((res) => {
            toast.success('Successfully Deleted');
          });
        }
      }
    });
  };
  // ** Slider params
  const params = {
    className: 'swiper-responsive-breakpoints swiper-container px-4 py-2',
    slidesPerView: 3,
    spaceBetween: 55,
    navigation: true,
    breakpoints: {
      1600: {
        slidesPerView: 3,
        spaceBetween: 55
      },
      1300: {
        slidesPerView: 3,
        spaceBetween: 55
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 55
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 55
      }
    }
  };

  return (
    <div style={{ marginLeft: '10px', marginRight: '10px' }}>
      {eventData.length > 0 &&
        eventData.map((items, index) => {
          const dateStart = items?.start;
          const dateEnd = items?.end;

          const startDate = new Date(dateStart);
          const endDate = new Date(dateEnd);

          const startMonth = startDate.getUTCMonth() + 1;
          const startDay = startDate.getUTCDate();
          const startYear = startDate.getUTCFullYear();
          const startHours = startDate.getUTCHours();
          const startMinutes = startDate.getUTCMinutes();
          const startAmpm = startHours >= 12 ? 'PM' : 'AM';
          const formattedDate = `${startMonth.toString().padStart(2, '0')}/${startDay
            .toString()
            .padStart(2, '0')}/${startYear} ${(startHours % 12 || 12).toString()}:${startMinutes
            .toString()
            .padStart(2, '0')} ${startAmpm}`;

          const endMonth = endDate.getUTCMonth() + 1;
          const endDay = endDate.getUTCDate();
          const endYear = endDate.getUTCFullYear();
          const endHours = endDate.getUTCHours();
          const endMinutes = endDate.getUTCMinutes();
          const endAmpm = endHours >= 12 ? 'PM' : 'AM';
          const formattedEndDate = `${endMonth.toString().padStart(2, '0')}/${endDay
            .toString()
            .padStart(2, '0')}/${endYear} ${(endHours % 12 || 12).toString()}:${endMinutes
            .toString()
            .padStart(2, '0')} ${endAmpm}`;

          return (
            <Row key={index} className="p-1">
              <Card className="p-1 border mb-0">
                <Row style={{ cursor: 'pointer' }}>
                  <Col md={7} className="event-wrapper1" onClick={() => toggle(index)}>
                    <div className="d-flex align-items-center">
                      <img
                        alt={items?.eventBanner}
                        src={items?.eventBanner ? items.eventBanner : defaultImg}
                        style={{ height: '49px', width: '49px', borderRadius: '50%' }}
                        className="event-img"
                      />
                      <div style={{ marginLeft: '20px' }}>
                        <h5 style={{ fontWeight: 'bolder', color: '#000' }} className="mb-50">
                          {items?.title}
                          <Badge
                            className="text-capitalize ms-50"
                            color={
                              categoryObj[items?.eventCategory]
                                ? categoryObj[items?.eventCategory]
                                : 'success'
                            }
                          >
                            {items?.eventCategory ? items.eventCategory : 'General'}
                          </Badge>
                          <Badge
                            className="text-capitalize ms-1"
                            color={items.type == 'Public' ? 'light-success' : 'light-warning'}
                          >
                            {items.type}
                          </Badge>
                        </h5>
                        <span>
                          {formattedDate} - {formattedEndDate} {items?.eventAddress}
                        </span>
                      </div>
                    </div>
                  </Col>
                  <Col md={4} className="event-wrapper">
                    <div
                      style={{ display: 'flex', justifyContent: 'space-between' }}
                      className="event-list-button"
                    >
                      <Link to={'#'}>
                        <button className="btn" onClick={(e) => handleViewClick(items._id)}>
                          View
                        </button>
                      </Link>
                      <Link to={{ pathname: `/event-view-list/${items._id}` }}>
                        <button
                          className="btn"
                          style={{ backgroundColor: '#FF8C00	', color: '#fff' }}
                        >
                          Manage
                        </button>
                      </Link>
                      <Link to={`/edit-event/${items._id}`} className="text-white">
                        {' '}
                        <Button color="primary">Edit</Button>
                      </Link>
                      <Link to={'#'}>
                        <Button
                          onClick={(e) => handleRemoveClick(items._id)}
                          style={{ background: 'transparent', color: '#dc3545' }}
                          color="danger"
                          outline
                        >
                          Delete
                        </Button>
                      </Link>
                      <div onClick={() => toggle(index)} style={{ cursor: 'pointer' }}>
                        {isOpen[index] ? (
                          <FaChevronUp size={18} style={{ color: 'lightgray' }} />
                        ) : (
                          <FaChevronDown size={18} color="primary" />
                        )}
                      </div>
                    </div>
                  </Col>
                </Row>
                <Collapse isOpen={isOpen[index]}>
                  <Card className="m-4">
                    <Row>
                      <Col md={6}>
                        <h5>GENERAL INFORMATION</h5>
                        <Row className="mt-1">
                          <Col md={1}>
                            <IoLocationSharp size={18} style={{ color: '#000' }} />
                          </Col>
                          <Col md={11}>
                            <h5 style={{ marginLeft: '20px' }}>{items?.eventAddress}</h5>
                          </Col>
                        </Row>

                        <Row className="mt-1">
                          <Col md={1}>
                            <FaPhoneAlt size={18} />
                          </Col>
                          <Col md={11}>
                            <h5 style={{ marginLeft: '20px' }}>{items?.hostMobileNumber}</h5>
                          </Col>
                        </Row>
                        <Row className="mt-1">
                          <Col md={1}>
                            <GrMail size={18} />
                          </Col>
                          <Col md={11}>
                            <h5 style={{ marginLeft: '20px' }}>{items?.hostEmail}</h5>
                          </Col>
                        </Row>

                        <h5 className="mt-3">ADDITIONAL INFORMATION</h5>
                        <Row className="mt-1">
                          <Col md={4}>
                            <p style={{ fontWeight: 'bold', color: '#000' }}>Status</p>
                          </Col>
                          <Col md={6}>
                            <Badge color={items?.status ? 'success' : 'warning'}>
                              {items?.status ? items.status : 'Inactive'}
                            </Badge>
                          </Col>
                        </Row>
                        <Row className="mt-1">
                          <Col md={4}>
                            <p style={{ fontWeight: 'bold', color: '#000' }}>Entries On Platform</p>
                          </Col>
                          <Col md={6}>
                            <Badge
                              color={items?.guests?.length > 0 ? 'success' : 'warning'}
                              style={{ marginLeft: '20px' }}
                            >
                              {items?.guests?.length > 0 ? 'Yes' : 'No'}
                            </Badge>
                          </Col>
                        </Row>
                        <Row className="mt-1">
                          <Col md={4}>
                            <p style={{ fontWeight: 'bold', color: '#000' }}>Registration Starts</p>
                          </Col>
                          <Col md={6}>
                            <p style={{ marginLeft: '20px' }}>{formattedDate}</p>
                          </Col>
                        </Row>
                        <Row className="mt-1">
                          <Col md={4}>
                            <p style={{ fontWeight: 'bold', color: '#000' }}>
                              Late Registration Ends
                            </p>
                          </Col>
                          <Col md={6}>
                            <p style={{ marginLeft: '20px' }}>{formattedEndDate}</p>
                          </Col>
                        </Row>
                        <Row className="mt-1">
                          <Col md={4}>
                            <p style={{ fontWeight: 'bold', color: '#000' }}>Registration Ends</p>
                          </Col>
                          <Col md={6}>
                            <p style={{ marginLeft: '20px' }}>{formattedEndDate}</p>
                          </Col>
                        </Row>
                        <Row className="mt-1">
                          <Col md={4}>
                            <p style={{ fontWeight: 'bold', color: '#000' }}>Information</p>
                          </Col>
                          <Col md={8}>
                            <div
                              style={{ marginLeft: '20px' }}
                              dangerouslySetInnerHTML={{
                                __html: items?.eventDetail ? items.eventDetail : 'Unset'
                              }}
                            ></div>
                          </Col>
                        </Row>
                      </Col>

                      <Col md={6}>
                        <h5>LOCATION</h5>
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29195.74079167713!2d78.73111716149656!3d23.837523965710304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3978d14a2cf591af%3A0xf446eaa2b5281370!2sSagar%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1681053566934!5m2!1sen!2sin"
                          style={{ width: '100%', height: '50vh' }}
                          allowfullscreen=""
                          loading="lazy"
                          referrerpolicy="no-referrer-when-downgrade"
                        ></iframe>
                      </Col>
                    </Row>
                    {/* <Row>
                      <Col sm={12}>
                        <h5 className="text-uppercase text-center mt-3">Other Events</h5>
                        <Swiper {...params}>
                          {[
                            eventData[(index + 1) % eventData.length],
                            eventData[(index + 2) % eventData.length],
                            eventData[(index + 3) % eventData.length]
                          ].map((slide) => {
                            return (
                              <SwiperSlide key={slide.title + 'other event'}>
                                <a href={`/event-view-list/${slide._id}`}>
                                  <div className="item-heading">
                                    <img
                                      alt={slide?.eventBanner}
                                      src={slide?.eventBanner ? slide.eventBanner : defaultImg}
                                      className="event-img w-100"
                                      style={{ height: '300px' }}
                                    />
                                    <h5 className="mt-1 text-center fw-bolder">{slide?.title}</h5>
                                  </div>
                                </a>
                              </SwiperSlide>
                            );
                          })}
                        </Swiper>
                      </Col>
                    </Row> */}
                  </Card>
                </Collapse>
              </Card>
              <DeleteEventModal
                deleteModal={deleteModal}
                toggleDeleteModal={toggleDeleteModal}
                eventId={eventId}
              />
            </Row>
          );
        })}
    </div>
  );
}

export default EventView;