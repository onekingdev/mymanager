import React, { useEffect, useState } from 'react';
// ** Reactstrap Imports
import { Card, CardHeader, Progress } from 'reactstrap';

import { GrReactjs } from 'react-icons/gr';

// ** Third Party Components
import { ChevronDown, Trash2 } from 'react-feather';
import DataTable from 'react-data-table-component';

// ** Custom Components
import Avatar from '@components/avatar';
import PerfectScrollbar from 'react-perfect-scrollbar';

// ** User List Component
// import Table from './retentionTable'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap';

// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal';

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX } from 'react-feather';

// redux
import { useDispatch, useSelector } from 'react-redux';

// ** Styles
import '@styles/react/apps/app-users.scss';

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss';

//**timeline component
import AvatarGroup from '@components/avatar-group';

// ** Reactstrap Imports
import { UncontrolledTooltip } from 'reactstrap';
import { CardBody } from 'reactstrap';
import { CardTitle } from 'reactstrap';
import { CardText } from 'reactstrap';
import { Label, Input } from 'reactstrap';
//react router
import { Link } from 'react-router-dom'

// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import {
  MoreVertical,
  Edit,
  FileText,
  Archive,
  Trash,
  Send,
  Save,
  Info,
  PieChart,
  Download,
  TrendingUp,
  CheckCircle,
  ArrowDownCircle
} from 'react-feather';
import ReactPaginate from 'react-paginate';
import {
  promotedListAction,
  GET_ALL_PROGRESSION_DATA
} from '../../../../../../src/views/contacts/store/actions';
import moment from 'moment';
import EditProgression from './EditProgression';

const avatarGroupArr = [
  {
    imgWidth: 25,
    imgHeight: 25,
    title: 'Progression ',
    placement: 'bottom',
    img: require('@src/assets/images/portrait/small/avatar-s-9.jpg').default
  },
  {
    imgWidth: 25,
    imgHeight: 25,
    title: 'Amy Carson',
    placement: 'bottom',
    img: require('@src/assets/images/portrait/small/avatar-s-6.jpg').default
  },
  {
    imgWidth: 25,
    imgHeight: 25,
    title: 'Brandon Miles',
    placement: 'bottom',
    img: require('@src/assets/images/portrait/small/avatar-s-8.jpg').default
  },
  {
    imgWidth: 25,
    imgHeight: 25,
    title: 'Daisy Weber',
    placement: 'bottom',
    img: require('@src/assets/images/portrait/small/avatar-s-7.jpg').default
  },
  {
    imgWidth: 25,
    imgHeight: 25,
    title: 'Jenny Looper',
    placement: 'bottom',
    img: require('@src/assets/images/portrait/small/avatar-s-20.jpg').default
  }
];

const projectsArr = [
  {
    progress: '1/1/2023',
    stripe: '1',
    hours: '210:30h',
    progressColor: 'info',
    totalTasks: ' Korrie O Crevy',
    subtitle: 'React Project',
    title: 'BBC ',
    img: require('@src/assets/images/icons/brands/react-label.png').default
  },
  {
    hours: '89h',
    stripe: '1',
    progress: '1/1/2023',
    totalTasks: ' Korrie O Crevy',
    progressColor: 'danger',
    subtitle: 'UI/UX Project',
    title: ' LC',
    img: require('@src/assets/images/icons/brands/xd-label.png').default
  },
  {
    progress: '1/1/2023',
    stripe: '1',
    hours: '129:45h',
    totalTasks: ' Korrie O Crevy',
    progressColor: 'success',
    subtitle: 'Vuejs Project',
    title: ' MC',
    img: require('@src/assets/images/icons/brands/vue-label.png').default
  },
  {
    hours: '45h',
    progress: '1/1/2023',
    stripe: '1',
    totalTasks: ' Korrie O Crevy',
    progressColor: 'warning',
    subtitle: 'iPhone Project',
    title: ' BBC',
    img: require('@src/assets/images/icons/brands/sketch-label.png').default
  },

  {
    progress: '1/1/2023',
    stripe: '1',
    hours: '67:10h',
    totalTasks: ' Korrie O Crevy',
    progressColor: 'info',
    subtitle: 'React Project',
    title: ' MC',
    img: require('@src/assets/images/icons/brands/react-label.png').default
  },
  {
    progress: '1/1/2023',
    stripe: '1',
    hours: '108:39h',
    totalTasks: ' Korrie O Crevy',
    title: ' BC',
    progressColor: 'success',
    subtitle: 'Crypto Website',
    img: require('@src/assets/images/icons/brands/html-label.png').default
  },
  {
    progress: '1/1/ 2023',
    stripe: '1',
    hours: '88:19h',
    totalTasks: ' Korrie O Crevy',
    progressColor: 'success',
    subtitle: 'Vuejs Project',
    title: ' BBC',
    img: require('@src/assets/images/icons/brands/vue-label.png').default
  }
];
const customStyles = {
  title: {
    style: {
      // fontWeight: "900",
      maxHeight: '130px'
      // fontSize : '40px',
    }
  },
  rows: {
    style: {
      minHeight: '72px' // override the row height
    }
  },
  headCells: {
    style: {
      // paddingLeft: '8px', // override the cell padding for head cells
      // paddingRight: '8px',
      width: '100%',
      // backgroundColor : '#f3f2f7',
      backgroundColor: '#f3f2f7',

      fontSize: '15px',
      fontWeight: '400'
      // borderRadiusTop : '13px'
      // borderStartEndRadius  : '19px'
    }
  },
  cells: {
    style: {
      // paddingLeft: '8px', // override the cell padding for data cells
      // paddingRight: '8px',
      fontSize: '16px'
    }
  }
};
const columns = [
  {
    name: 'Name',
    // width: '20%',
    sortable: true,
    selector: (row) => row.clientName,
    minWidth: '197px',

    // width: "18%",
    cell: (row) => {
      return <div className="fw-bolder">{row.clientName}</div>;
    }
  },
  {
    name: 'Category',
    sortable: true,
    selector: (row) => row.categoryName,
    minWidth: '200px',
    // width: "14%",
  },

  {
    name: 'Rank',
    sortable: true,
    minWidth: '230px',
    // width: '20%',

    selector: (row) => row?.currentRankImage,
    cell: (row) => (
      <div
        className="d-flex justify-content-start align-items-start"
        style={{ marginLeft: '-15px' }}
      >
        {row?.currentRankImage ? (
          <Avatar className="me-1" img={row?.currentRankImage} imgWidth="42" imgHeight="42" />
        ) : (
          <div
            style={{
              background: '#9e9d9b',
              borderRadius: '50%',
              height: '42px',
              width: '42px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: '14px'
            }}
          >
            N/A
          </div>
        )}
        <div className="d-flex flex-column  my-auto " style={{}}>
          <span className="fw-bold  text-center" style={{ color: '#7d7b7a' }}>
            {row?.currentRankName ? row?.currentRankName : 'None'}
          </span>

          <span className=" text-muted fs-5   text-center" style={{ marginTop: '3px' }}>
            {row?.currentRankOrder}
          </span>
        </div>
      </div>
    )
  },
  {
    name: 'Next Rank',
    sortable: true,

    selector: (row) => row?.nextRankOrder,
    minWidth: '230px',
    // width: "19%",
    cell: (row) => (
      <div
        className="d-flex justify-content-start align-items-start"
        style={{ marginLeft: '-15px' }}
      >
        {row?.nextRankImage ? (
          <Avatar className="me-1" img={row?.nextRankImage} imgWidth="42" imgHeight="42" />
        ) : (
          <div
            style={{
              background: '#9e9d9b',
              borderRadius: '50%',
              height: '42px',
              width: '42px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: '14px'
            }}
          >
            N/A
          </div>
        )}
        <div className="d-flex flex-column  my-auto " style={{}}>
          <span className="fw-bold text-center" style={{ color: '#7d7b7a' }}>
            {row?.nextRankName ? row?.nextRankName : 'None'}
          </span>
          <span className=" text-muted fs-5   text-center" style={{ marginTop: '3px' }}>
            {row?.nextRankOrder}
          </span>
        </div>
      </div>
    )
  },

  {
    name: 'Last Promoted',
    // sortable: true,
    // selector: (row) => row?.updatedAt.split('T')[0]
    // width: "18%",
    minWidth: '200px',
    // sortable: true,
    selector: (row) => {
      return <div className="fs-5"> {moment(row.updatedAt).format('MM/DD/YYYY')}</div>;
    }
  },
  {
    name: 'Action',
    // width: "17%",
    minWidth: '60px',
    selector: (row) => {
      return (
        <div>
          <EditProgression row={row} />
        </div>
      );
    }
  }
];
function Retention({ ProgressionAllData, progressionId }) {

  const dispatch = useDispatch();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const handlePagination = async (page) => {
    setCurrentPage(page.selected + 1);
  };
  // ** Function in get data on rows per page
  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
  };


  let promotedDataMain = ProgressionAllData.filter((data) => data?.progressionId === progressionId);

  useEffect(() => {
    dispatch(promotedListAction());
  }, []);

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Math.ceil(promotedDataMain.length / rowsPerPage);

    return (
      <div className="d-flex justify-content-end">
        <div className="d-flex align-items-center justify-content-end">
          {/* <label htmlFor="rows-per-page">Show</label> */}
          <Input
            className="mx-50"
            type="select"
            id="rows-per-page"
            value={rowsPerPage}
            onChange={handlePerPage}
            style={{ width: '5rem' }}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </Input>
          <label htmlFor="rows-per-page" style={{ marginRight: '1rem' }}>
            Per Page
          </label>
        </div>
        <ReactPaginate
          previousLabel={''}
          nextLabel={''}
          pageCount={count || 1}
          activeClassName="active"
          forcePage={currentPage !== 0 ? currentPage - 1 : 0}
          onPageChange={(page) => handlePagination(page)}
          pageClassName={'page-item'}
          nextLinkClassName={'page-link'}
          nextClassName={'page-item next'}
          previousClassName={'page-item prev'}
          previousLinkClassName={'page-link'}
          pageLinkClassName={'page-link'}
          containerClassName={'pagination react-paginate justify-content-end my-2 pe-1'}
        />
      </div>
    );
  };
  return (
    <Card>
      <div class="d-flex justify-content-between align-items-center pb-1 mt-1">
        <div>
          <div class=" mx-2">
            <span className="fs-4  fw-bold">
              Promoted Client Report
          
            </span>
          </div>
        </div>
        <div class="d-flex justify-content-between align-items-center mx-2">
          <div class="mx-1">
            <Col>
              <Input id="exampleSelect" name="select" type="select" placeholder="Select Notes" style={{width: '130px'}}>
                <option selected>Category</option>
                <option>Category 1</option>
                <option>Category 2</option>
                <option>Category 3</option>
              </Input>
            </Col>
          </div>
          <div class="me-1">
            <Col>
              <Input id="exampleSelect" name="select" type="select" placeholder="Select Notes"   style={{width: '140px'}}>
                <option selected>Progression</option>
                <option>Progresson 1</option>
                <option>Progresson 2</option>
                <option>Progresson 3</option>
              </Input>
            </Col>
          </div>
          <button class="rounded btn btn-primary text-white customFilterBtn" disabled="">
            Filter
          </button>
        </div>
      </div>
      <div style={{ marginLeft: '20px', marginRight: '20px' }}>
        <div className="react-dataTable ">
          {promotedDataMain?.length > 0 ? (
            <DataTable
              noHeader
              responsive
              columns={columns}
              data={promotedDataMain ? promotedDataMain : []}
              className="react-dataTable "
              pagination
              paginationPerPage={7}
             
              paginationComponent={CustomPagination}
              sortIcon={<ChevronDown size={10} />}
            />
          ) : (
            <center>
              <h3>NO Records to Display</h3>
            </center>
          )}
        </div>
      </div>
    </Card>
  );
}
export default Retention;
