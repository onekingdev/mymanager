// ** React Imports
import { Fragment, useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// ** Reactstrap Imports
import { Row, Col, Badge, Spinner } from 'reactstrap';

//** third party imports */

import { ChevronDown } from 'react-feather';
import moment from 'moment';
// ** Custom Components
import Avatar from '@components/avatar';
// ** Styles Imports
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';
import DataTable from 'react-data-table-component';
import ReactPaginate from 'react-paginate';

// ** Events Actions  Import
import StudentAttendanceAction from './StudentAttendanceAction';
import { getAttendance } from './store';
import { getAvatarColor } from './constants';

const stateNum = Math.floor(Math.random() * 6),
  states = [
    'light-success',
    'light-danger',
    'light-warning',
    'light-info',
    'light-primary',
    'light-secondary'
  ],
  color = states[stateNum];

const AttendanceList = (props) => {
  const { classId, markDate } = props;
  // ** Store vars
  const contactList = useSelector((state) => state?.totalContacts?.contactList?.list);
  const classAttendees = useSelector((state) => state?.calendar?.classAttendees);
  const filteredList = [...new Map(classAttendees.map((m) => [m.contactId, m])).values()];

  const [attendedList, setAttendedList] = useState(
    filteredList.map((x) => {
      let data = contactList.find((y) => y._id == x.contactId);

      return {
        ...x,
        rating: data.attendanceRating,
        ratingColor: data.attendanceRatingColor
      };
    })
  );

  const { selectedClass } = useSelector((state) => state?.calendar);

  // ** States
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      name: 'Full Name',
      sortable: true,
      width: '170px',
      selector: (row) => (
        <>
          {row?.image !== '' ? (
            <Avatar className="me-1" img={row?.image} width="32" height="32" initials />
          ) : (
            <Avatar
              color={getAvatarColor(row?.contactId) || 'primary'}
              className="me-1"
              content={row.fullName || 'John Doe'}
              initials
            />
          )}
          <span> {`${row?.fullName}` || 'N A'}</span>
        </>
      )
    },
    {
      name: 'Rank',
      sortable: true,
      selector: (row) => row?.rankName,
      cell: (row) => (
        <>
          {row?.rankImg !== '' ? (
            <div className="d-flex align-items-center">
              <Avatar className="mx-1" img={row?.rankImg ? row?.rankImg : ''} imgWidth="32" />
              <div className="d-flex flex-column">
                <span className="text-truncate">{row?.rankName}</span>
              </div>
            </div>
          ) : (
            <div className="d-flex align-items-center">
              <Avatar color={'light-secondary'} className="me-1" content="N/A" />
              <div className="d-flex flex-column">
                <span className="text-truncate">No Rank</span>
              </div>
            </div>
          )}
        </>
      )
    },
    {
      name: 'Program',
      sortable: true,
      width: '140px',
      selector: (row) => (
        <Badge
          color={selectedClass?.programName ? selectedClass?.programName[0]?.color : 'primary'}
        >
          {selectedClass?.programName ? selectedClass?.programName[0]?.label : ''}
        </Badge>
      )
    },
    {
      name: 'Rating',
      sortable: true,
      // width: '130px',
      selector: (row) => row.rating,
      cell: (row) => (
        <div className="d-flex flex-column">
          <div
            key={`div${row?._id}`}
            className="table-rating"
            style={{ backgroundColor: `${row?.ratingColor}34` }}
          >
            <span key={`span${row?._id}`} style={{ color: `${row?.ratingColor}f0` }}>
              {row?.rating > 1000 ? 0 : row?.rating}
            </span>
          </div>
        </div>
      )
    },
    // {
    //   name: 'Class',
    //   sortable: true,
    //   width: "130px",
    //   selector: (row) => row.className
    // },
    {
      name: 'Attended',
      sortable: true,
      width: '140px',
      selector: (row) => moment(row.attendedDateTime).format('MM/DD/YYYY')
    },
    {
      name: 'Actions',
      allowOverflow: false,
      width: '110px',
      cell: (row) => <StudentAttendanceAction classRow={row} markDate={markDate} />
    }
  ];

  const handlePagination = (page) => {
    setCurrentPage(page.selected);
  };

  // ** Effcts
  useEffect(() => {
    let newList = [...new Map(classAttendees.map((m) => [m.contactId, m])).values()];

    setAttendedList(
      newList.map((x) => {
        let data = contactList.find((y) => y._id == x.contactId);
        return {
          ...x,
          rating: data.attendanceRating,
          ratingColor: data.attendanceRatingColor
        };
      })
    );
  }, [classAttendees, contactList]);

  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=""
      nextLabel=""
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      pageCount={Math.ceil(classAttendees.length / 10) || 1}
      breakLabel="..."
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName="active"
      pageClassName="page-item"
      breakClassName="page-item"
      nextLinkClassName="page-link"
      pageLinkClassName="page-link"
      breakLinkClassName="page-link"
      previousLinkClassName="page-link"
      nextClassName="page-item next-item"
      previousClassName="page-item prev-item"
      containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
    />
  );

  useMemo(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, [classId]);

  return (
    <Fragment>
      <div className="react-dataTable border rounded-2">
        {loading ? (
          <div className="d-flex align-items-center">
            <div className="d-flex mt-1 mb-1 flex-column align-items-center w-100">
              <Spinner type="grow" color="primary" />
              <b>Loading . . .</b>
            </div>
          </div>
        ) : (
          <DataTable
            noHeader
            pagination
            columns={columns}
            paginationPerPage={10}
            className="react-dataTable"
            sortIcon={<ChevronDown size={10} />}
            paginationDefaultPage={currentPage + 1}
            paginationComponent={CustomPagination}
            data={attendedList}
          />
        )}
      </div>
    </Fragment>
  );
};
export default AttendanceList;
