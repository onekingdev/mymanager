import { Fragment } from 'react';

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs';

// ** User List Component
// import Table from './employeeTable';
import Table from '../../contact-list/contactTable';

// ** Reactstrap Imports
import { Row, Col, InputGroupText, Input } from 'reactstrap';

// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal';

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX } from 'react-feather';

// redux
import { useSelector } from 'react-redux';

// ** Styles
import '@styles/react/apps/app-users.scss';

const Employee = () => {
  const EmployeeContactTypeTitle = useSelector((state) =>
    state?.totalContacts?.contactTypeList?.length > 1
      ? state?.totalContacts?.contactTypeList[1]?.name
      : ''
  );
  const store = useSelector((state) => state?.totalContacts);
  const contactTypeId = useSelector(
    (state) =>
      state?.totalContacts?.contactTypeList?.filter((x) => x?.name == EmployeeContactTypeTitle)[0]
        ?._id
  );

  const employeeContacts = store?.contactList?.list?.filter(
    (x) => x.contactType.indexOf(contactTypeId) > -1
  );
  const activeEmployeeCnt = employeeContacts?.filter((x) => x?.status == 'active')?.length;
  const internshipEmployeeCnt = employeeContacts?.filter((x) => x?.isInternship)?.length;
  const formerEmployeeCnt = employeeContacts?.filter((x) => x?.isFormer)?.length;
  return (
    <Fragment>
      <div className="app-user-list">
        <Row>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="primary"
              statTitle={`Total ${EmployeeContactTypeTitle}`}
              icon={<User size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">{employeeContacts?.length || 0}</h3>}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="danger"
              statTitle={`Active ${EmployeeContactTypeTitle}`}
              icon={<UserPlus size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">{activeEmployeeCnt || 0}</h3>}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="success"
              statTitle="Active Internships"
              icon={<UserCheck size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">{internshipEmployeeCnt || 0}</h3>}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="warning"
              statTitle={`Former ${EmployeeContactTypeTitle}`}
              icon={<UserX size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">{formerEmployeeCnt || 0}</h3>}
            />
          </Col>
        </Row>
        {/* <Table empStore={store} /> */}
        <Table
          store={store}
          contactTypeId={contactTypeId}
          contactTypeTitle={EmployeeContactTypeTitle}
        />
      </div>
    </Fragment>
  );
};

export default Employee;
