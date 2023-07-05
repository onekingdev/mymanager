// ** React Imports
import { useContext, useEffect, useState } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// ** Reactstrap Imports
import { Row, Col, Card, Button } from 'reactstrap';
import { CornerDownLeft } from 'react-feather';
// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors';

// ** Redux Action Import
import { getEventInfo } from './store';

// ** Custom Components
import CardEvent from './CardEvent';
import GuestTracker from './guests/GuestTracker';
import CardInvite from './CardInvite';
import BreadCrumbs from './Breadcrumbs';
import AttendeesTabs from './AttendeesTabs';

// ** Styles
import '@styles/react/libs/charts/apex-charts.scss';
import '@styles/base/pages/dashboard-ecommerce.scss';

import {
  progressionListAction,
  promotedListAction,
  clientContactsAction
} from '../../contacts/store/actions';
import { contactRankListAction, progressionFetchAction } from '../../contacts/store/actions';

const EventDetails = () => {
  // ** Context
  const { colors } = useContext(ThemeColors);
  const { eventId } = useParams();
  const eventInfo = useSelector((state) => state.event.eventInfo);

  // ** Store vars
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEventInfo(eventId));
  }, [eventId]);
  useEffect(() => {
    if (eventInfo?.eventCategory === 'promotion') {
      dispatch(contactRankListAction());
      dispatch(progressionFetchAction());
    }
  }, [eventInfo]);

  return (
    <div>
      <Row>
        <Col md={12}>
          <BreadCrumbs
            breadCrumbTitle={eventInfo.title}
            breadCrumbActive={eventInfo.title}
            breadCrumbParent="Calendar"
            breadCrumbParentLink="/calendar"
            breadCrumbParent2="Event Manager"
            breadCrumbParent2Link="/calendar/2"
            isBack={false}
          />
        </Col>
      </Row>
      <Row className="match-height">
        <Col lg="4" md="6" xs="12">
          <CardEvent
            eventInfo={{
              title: eventInfo.title,
              start: eventInfo.start,
              end: eventInfo.end,
              eventAddress: eventInfo.eventAddress,
              venueName: eventInfo.venueName,
              url: eventInfo.eventBanner
            }}
          />
        </Col>
        <Col lg="4" md="6" xs="12">
          <GuestTracker
            primary={colors.primary.main}
            danger={colors.danger.main}
            data={eventInfo}
          />
        </Col>
        <Col lg="4" md="6" xs="12">
          <CardInvite eventInfo={eventInfo} />
        </Col>
      </Row>
      <Row className="match-height">
        <Col lg="12" xs="12">
          <AttendeesTabs eventInfo={eventInfo} />
        </Col>
      </Row>
    </div>
  );
};

export default EventDetails;
