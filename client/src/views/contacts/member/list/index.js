import { Fragment } from 'react';

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs';

// ** User List Component
// import Table from './memberTable';
import Table from '../../contact-list/contactTable';

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap';

// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal';

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX } from 'react-feather';

// ** Styles
import '@styles/react/apps/app-users.scss';
import { useSelector } from 'react-redux';

const Members = () => {
  const MembersContactTypeTitle = useSelector((state) =>
    state?.totalContacts?.contactTypeList?.length > 4
      ? state?.totalContacts?.contactTypeList[5].name
      : ''
  );
  const store = useSelector((state) => state?.totalContacts);
  const contactTypeId = useSelector(
    (state) =>
      state?.totalContacts?.contactTypeList?.filter((x) => x.name == MembersContactTypeTitle)[0]
        ?._id
  );
  const memberStore = useSelector((state) => {
    return {
      ...state.memberContact,
      tags: state.totalContacts.tags,
      leadSources: state.totalContacts?.leadSource
    };
  });

  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle={MembersContactTypeTitle}
        breadCrumbParent="Contacts"
        breadCrumbActive={MembersContactTypeTitle}
      />
      <div className="app-user-list">
        <Row>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="primary"
              statTitle={`Total ${MembersContactTypeTitle}`}
              icon={<User size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">{memberStore?.totalCount}</h3>}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="danger"
              statTitle={`Active ${MembersContactTypeTitle}`}
              icon={<UserPlus size={20} />}
              renderStats={<h3 className="fw-bolder mb-75"> {memberStore?.activeCount}</h3>}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="success"
              statTitle={`Past Due ${MembersContactTypeTitle}`}
              icon={<UserCheck size={20} />}
              renderStats={<h3 className="fw-bolder mb-75"> {memberStore?.pastDueCount}</h3>}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="warning"
              statTitle={`Former ${MembersContactTypeTitle}`}
              icon={<UserX size={20} />}
              renderStats={<h3 className="fw-bolder mb-75"> {memberStore?.formerCount}</h3>}
            />
          </Col>
        </Row>
        <Table
          store={store}
          contactTypeId={contactTypeId}
          contactTypeTitle={MembersContactTypeTitle}
        />
      </div>
    </Fragment>
  );
};

export default Members;
