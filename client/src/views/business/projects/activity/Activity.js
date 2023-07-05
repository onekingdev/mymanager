// ** React Imports
import { Fragment } from 'react';

//** Component Imports
import NoProjectLayout from '../noprojectlayout/NoProjectLayout';

// ** Custom Components
import Avatar from '@components/avatar';

//** Function Imports
import activityTimeDifference from './ActivityTimeDifference';
import dateFormatter from '../resources/dateFormatter';

//** Redux Imports
import { useSelector } from 'react-redux';

// ** Icons Imports
import { Clock } from 'react-feather';

// ** Reactstrap Imports
import { Table, Badge, UncontrolledTooltip } from 'reactstrap';

const Activity = () => {
  let projectActivitiesData = useSelector((state) => state.projectManagement.projectActivities);

  return (
    <Fragment>
      <Table responsive>
        <thead>
          <tr>
            <th style={{ width: '12rem' }}>Time & User</th>
            <th style={{ width: '13rem' }}>Project / Task</th>
            <th style={{ width: '15rem' }}>Activity</th>
            <th style={{ width: '4rem' }}>Category</th>
            <th style={{ width: '11rem' }}>Transition</th>
          </tr>
        </thead>
        <tbody>
          {projectActivitiesData?.map((activities) => {
            return (
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="d-flex align-items-center">
                      <Clock className="font-medium-1 me-25" />
                      <Badge pill color="light-primary" className="me-2">
                        <span>{activityTimeDifference(activities?.timestamp)}</span>
                      </Badge>
                    </div>
                    <Fragment>
                      <Avatar
                        color="light-primary"
                        icon={`${activities?.userName.slice(0, 1).toUpperCase()}`}
                        id={`project-activity-tooltip-${activities._id}`}
                      />
                      <UncontrolledTooltip
                        placement="top"
                        target={`project-activity-tooltip-${activities._id}`}
                      >
                        <span className="fw-bold">{activities?.userName}</span>
                      </UncontrolledTooltip>
                    </Fragment>
                  </div>
                </td>
                <td>
                  {activities?.tableTitle
                    ? activities?.tableTitle?.toUpperCase()
                    : activities?.task?.toUpperCase()}
                </td>
                <td>{activities?.activity?.toUpperCase()}</td>
                <td>
                  {activities?.column?.toUpperCase()}
                  {activities?.column === 'Assignee' ? (
                    <>
                      <br />
                      <span style={{ color: 'green' }}>
                        {activities?.added ? (activities?.added).split(' ')[0] : null}
                      </span>
                      <span style={{ color: 'red' }}>
                        {activities?.deleted ? (activities?.deleted).split(' ')[0] : null}
                      </span>
                    </>
                  ) : null}
                </td>
                <td>
                  {activities?.current && activities?.previous ? (
                    activities?.column === 'Date' || activities?.column === 'Due' ? (
                      <>
                        <span style={{ color: 'red' }}>{dateFormatter(activities?.previous)}</span>{' '}
                        {`>`} <br />
                        <span style={{ color: 'green' }}>{dateFormatter(activities?.current)}</span>
                      </>
                    ) : (
                      <>
                        <span style={{ color: 'red' }}>
                          {activities?.previous
                            ? activities?.previous?.charAt(0).toUpperCase() +
                              activities.previous.slice(1)
                            : null}
                        </span>{' '}
                        {`>`} <br />
                        <span style={{ color: 'green' }}>
                          {activities?.current
                            ? activities?.current?.charAt(0).toUpperCase() +
                              activities.current.slice(1)
                            : null}
                        </span>
                      </>
                    )
                  ) : null}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {projectActivitiesData?.length === 0 && <NoProjectLayout message="No Activity Available" />}
    </Fragment>
  );
};

export default Activity;
