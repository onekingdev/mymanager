// ** Custom Components
import Avatar from '@components/avatar';

// ** Reactstrap Imports
import { Table, Badge } from 'reactstrap';

//** Function Imports
import activityTimeDifference from '../../../business/projects/activity/ActivityTimeDifference';

//** Redux Imports
import { useSelector } from 'react-redux';
import { getAvatarColor } from '../../../calendar/attendance/constants';

const LastSeen = (props) => {
  const { lastSeenList } = props;

  console.log('lastSeenList', lastSeenList);

  const renderAvatar = (user) => {
    return (
      <>
        {user.image ? (
          <Avatar className="me-1" img={user.image} width="32" height="32" initials />
        ) : (
          <Avatar
            color={getAvatarColor(user?.userId) || 'primary'}
            className="me-1"
            content={`${user?.firstName} ${user?.lastName}` || 'John Doe'}
            initials
          />
        )}
      </>
    );
  };

  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>Last Viewed</th>
        </tr>
      </thead>
      <tbody>
        {lastSeenList?.map((lastSeenData) => {
          const { firstName, lastName } = lastSeenData?.userInfo[0];
          const fullName = firstName + ' ' + lastName;
          return (
            <tr>
              <td>
                {renderAvatar(lastSeenData?.userInfo[0])}
                <span className="ps-1 align-middle fw-bold">{fullName}</span>
              </td>
              <td>
                {/* <Badge pill color="light-primary" className="me-1"> */}
                {activityTimeDifference(lastSeenData?.time)}
                {/* </Badge> */}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default LastSeen;
