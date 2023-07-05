import React, { useState } from 'react';
import { Calendar, User } from 'react-feather';
import { BiCalendarCheck } from 'react-icons/bi';
import { BsCalendarX, BsFillCalendarXFill } from 'react-icons/bs';
import { FaPhoneAlt, FaUser } from 'react-icons/fa';
import { IoLocationSharp } from 'react-icons/io5';
import { MdError } from 'react-icons/md';
import { RiErrorWarningLine } from 'react-icons/ri';
import { Card, Col, ListGroup, ListGroupItem, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import EntryFormModal from '../EventEnter/members/EntryFormModal';

function EventViewList(props) {
  const { event } = props;
  // ** State
  const [entryModal, setEntryModal] = useState(false);
  // ** handlers
  const toggle = (e) => {
    setEntryModal(!entryModal);
  };

  return (
    <Row>
      <Col md={5}>
        <Card className="p-1">
          <Row>
            <Col md={2}>
              <img
                src="https://storage.googleapis.com/mymember-storage/my-manager/7ee9d65b-73d1-49db-8781-449a0c2e1f1d-WhatsApp%20Image%202023-02-18%20at%208.52.24%20PM.jpeg"
                style={{ height: '60px', width: '70px', borderRadius: '50%' }}
              />
            </Col>
            <Col md={10}>
              <h1 style={{ color: 'rgba(0,0,0,.87)' }}>{event.eventName}</h1>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md={1}>
              <Calendar size={24} />
            </Col>
            <Col md={11}>
              <h5 style={{ marginLeft: '20px' }}>April 29th, 2023 to April 30th, 2023</h5>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md={1}>
              <IoLocationSharp size={24} style={{ color: '#000' }} />
            </Col>
            <Col md={11}>
              <h5 style={{ marginLeft: '20px' }}>5300 Pacific Ave SE, Lacey, Washington, 98503</h5>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md={1}>
              <BiCalendarCheck size={24} style={{ color: '#000' }} />
            </Col>
            <Col md={11}>
              <h5 style={{ marginLeft: '20px' }}>5300 Pacific Ave SE, Lacey, Washington, 98503</h5>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md={1}>
              <BsCalendarX size={20} style={{ color: '#000' }} />
            </Col>
            <Col md={11}>
              <h5 style={{ marginLeft: '20px' }}>5300 Pacific Ave SE, Lacey, Washington, 98503</h5>
            </Col>
          </Row>
        </Card>

        <Card className="p-1">
          <Row className="">
            <Col md={1}>
              <MdError size={36} />
            </Col>
            <Col md={11}>
              <h4 style={{ marginTop: '10px', color: 'rgba(0,0,0,.87)', fontWeight: 'bold' }}>
                GET READY OHIO!
              </h4>
              <p className="mt-2">
                Join us on April 15th at Canfield High School! This is the 1st year with your new
                OSTA Board of Directors since the late passing of Supreme Grand Master Joon P Choi.
              </p>
              <p className="mt-3">
                We are all committed to running the Best State Championship possible.
              </p>
            </Col>
          </Row>
        </Card>

        <Card className="p-4 ">
          <h3 style={{ color: 'rgba(0,0,0,.87)', fontWeight: 'bold' }}>Additional Information</h3>
          <Row className="mt-1">
            <Col md={4}>
              <h5 style={{ marginTop: '10px' }}>Organizer</h5>
            </Col>
            <Col md={8}>
              <h5 style={{ marginTop: '10px' }}>Justin Taylor</h5>
            </Col>
          </Row>
          <Row className="mt-1">
            <Col md={4}>
              <h5 style={{ marginTop: '10px' }}>Organizer Email</h5>
            </Col>
            <Col md={8}>
              <h5 style={{ marginTop: '10px' }}>jrtkdschool@yahoo.com</h5>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col md={7}>
        <Card className="p-2">
          <h4 style={{ color: 'rgba(0,0,0,.87)', fontWeight: 'bold' }}>Event Entry Stages</h4>
          <p className="mt-2">ENTRY STAGES</p>

          <div className="">
            <div className="event-view-verticle-line"></div>
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <div className="event-view-cricle"></div>
                <div style={{ marginLeft: '20px' }}>
                  <h6 style={{ color: 'rgba(0,0,0,.87)' }}>Athletes</h6>
                  <div className="d-flex">
                    <FaUser size={14} style={{ marginTop: '2px' }} />
                    <span style={{ marginLeft: '5px' }}>132 Complete Entries</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <span>
                  Stage closes <br /> April 24th, 2023
                </span>
              </div>
              <div>
                <button className="btn btn-primary" onClick={(e) => toggle()}>
                  Register
                </button>
              </div>
            </div>
            <div className="event-view-verticle-line"></div>
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <div className="event-view-cricle"></div>
                <div style={{ marginLeft: '20px' }}>
                  <h6 style={{ color: 'rgba(0,0,0,.87)' }}>Coach Entries</h6>
                  <div className="d-flex">
                    <FaUser size={14} style={{ marginTop: '2px' }} />
                    <span style={{ marginLeft: '5px' }}>132 Complete Entries</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <span>
                  Stage closes <br /> April 24th, 2023
                </span>
              </div>
              <div>
                <button className="btn btn-primary">Register</button>
              </div>
            </div>
            <div className="event-view-verticle-line"></div>
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <div className="event-view-cricle"></div>
                <div style={{ marginLeft: '20px' }}>
                  <h6 style={{ color: 'rgba(0,0,0,.87)' }}>Referee Entries</h6>
                  <div className="d-flex">
                    <FaUser size={14} style={{ marginTop: '2px' }} />
                    <span style={{ marginLeft: '5px' }}>132 Complete Entries</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <span>
                  Stage closes <br /> April 24th, 2023
                </span>
              </div>
              <div>
                <button className="btn btn-primary" onClick={(e) => {}}>
                  Register
                </button>
              </div>
            </div>
            <div className="event-view-verticle-line"></div>
          </div>
        </Card>
      </Col>
      <EntryFormModal
        entryModal={entryModal}
        setEntryModal={setEntryModal}
        toggleEntryModal={toggle}
        event={event}
      />
    </Row>
  );
}

export default EventViewList;
