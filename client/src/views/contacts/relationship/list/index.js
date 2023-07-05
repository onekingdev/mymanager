import { Fragment } from 'react';

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs';

// ** User List Component
import Table from '../../contact-list/contactTable';
// import Table from './relationshipTable';

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap';

// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal';

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX } from 'react-feather';

// ** Styles
import '@styles/react/apps/app-users.scss';

import { useSelector } from 'react-redux';

const Relationship = () => {
  const RelationshipContactTypeTitle = useSelector((state) =>
    state?.totalContacts?.contactTypeList?.length > 2
      ? state?.totalContacts?.contactTypeList[3].name
      : ''
  );
  const store = useSelector((state) => state.totalContacts);
  const contactTypeId = useSelector(
    (state) =>
      state?.totalContacts?.contactTypeList?.filter(
        (x) => x.name == RelationshipContactTypeTitle
      )[0]?._id
  );
  const relationshipContacts = store?.contactList?.list?.filter(
    (x) => x.contactType.indexOf(contactTypeId) > -1
  );
  const coldLeadCount = relationshipContacts?.filter((x) => x.stage == 'cold')?.length;
  const warmLeadCount = relationshipContacts?.filter((x) => x.stage == 'warm')?.length;
  const hotLeadCount = relationshipContacts?.filter((x) => x.stage == 'hot')?.length;

  const relationStore = useSelector((state) => {
    return {
      ...state.relationshipContact,
      tags: state.totalContacts?.tags,
      leadSources: state.totalContacts?.leadSource
    };
  });

  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle={RelationshipContactTypeTitle}
        breadCrumbParent="Contacts"
        breadCrumbActive={RelationshipContactTypeTitle}
      />
      <div className="app-user-list">
        <Row>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="primary"
              statTitle={`Total ${RelationshipContactTypeTitle}`}
              icon={<User size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">{relationshipContacts?.length || 0}</h3>}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="danger"
              statTitle="Personal"
              icon={<UserPlus size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">{coldLeadCount || 0}</h3>}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="success"
              statTitle="Business"
              icon={<UserCheck size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">{warmLeadCount || 0}</h3>}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="warning"
              statTitle="Other"
              icon={<UserX size={20} />}
              renderStats={<h3 className="fw-bolder mb-75"> {hotLeadCount || 0}</h3>}
            />
          </Col>
        </Row>
        <Table
          store={store}
          contactTypeId={contactTypeId}
          contactTypeTitle={RelationshipContactTypeTitle}
        />
      </div>
    </Fragment>
  );
};

export default Relationship;
