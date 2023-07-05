import { Fragment } from 'react';

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs';

// ** User List Component
// import Table from './vendorTable';
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

const VendorContact = () => {
  const VendorContactTypeTitle = useSelector((state) =>
    state?.totalContacts?.contactTypeList?.length > 3
      ? state?.totalContacts?.contactTypeList[4].name
      : ''
  );
  const store = useSelector((state) => state.totalContacts);

  const contactTypeId = useSelector(
    (state) =>
      state?.totalContacts?.contactTypeList?.filter((x) => x.name == VendorContactTypeTitle)[0]?._id
  );
  const partContacts = store?.contactList?.list?.filter(
    (x) => x.contactType.indexOf(contactTypeId) > -1
  );
  const coldLeadCount = partContacts?.filter((x) => x.stage == 'cold')?.length;
  const warmLeadCount = partContacts?.filter((x) => x.stage == 'warm')?.length;
  const hotLeadCount = partContacts?.filter((x) => x.stage == 'hot')?.length;

  const vendorStore = useSelector((state) => {
    return {
      ...state.vendorContact,
      tags: state.totalContacts.tags,
      leadSources: state.totalContacts?.leadSource
    };
  });

  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle={VendorContactTypeTitle}
        breadCrumbParent="Contacts"
        breadCrumbActive={VendorContactTypeTitle}
      />
      <div className="app-user-list">
        <Row>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="primary"
              statTitle={`Total ${VendorContactTypeTitle}`}
              icon={<User size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">{partContacts?.length}</h3>}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="danger"
              statTitle="Retail"
              icon={<UserPlus size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">{coldLeadCount || 0}</h3>}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="success"
              statTitle="Online"
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
          contactTypeTitle={VendorContactTypeTitle}
        />
      </div>
    </Fragment>
  );
};

export default VendorContact;
