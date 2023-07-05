// ** React Imports
import { Fragment, useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BiBorderRadius, BiUser } from 'react-icons/bi';
import { BiCalendarEvent } from 'react-icons/bi';

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

// ** Events Actions  Imports
import BookAttendanceAction from '../BookAttendanceAction';
import IsAttendClass from '../IsAttendClass';
import { updateBookClass } from '../../store';
import { Badge, Spinner } from 'reactstrap';
import { formatDate, getAvatarColor } from '../constants';
import StudentList from './StudentList';

const states = [
  'light-success',
  'light-danger',
  'light-warning',
  'light-info',
  'light-primary',
  'light-secondary'
];

const TimeScheduleList = (props) => {
  const { classId, type } = props;
  const dispatch = useDispatch();
  const [bookingData, setBookingData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const classBookingsList = useSelector((state) => state.calendar?.classBookings);
  const { selectedClass } = useSelector((state) => state?.calendar);

  const coloumns = [
    {
      name: 'Duration',
      sortable: true,
      width: '170px',
      selector: (row) => (
        <>
          <span>
            {' '}
            {`${formatDate(row?.classStartTime)} - ${formatDate(row?.classEndTime)}` || 'N A'}
          </span>
        </>
      )
    },
    {
      name: 'Days',
      sortable: true,
      selector: (row) => row.status,
      cell: (row) => {
        return (
          <>
            {row.classDays.map((x) => (
              <Badge
                key={`badge_day_${x}_${Math.floor(Math.random() * 1000)}`}
                color={x == 'Sunday' ? 'light-danger' : 'light-primary'}
                style={{ marginRight: '0.2rem' }}
              >
                {x.slice(0, 3)}
              </Badge>
            ))}
          </>
        );
      }
    },
    {
      name: 'Total Students',
      sortable: true,
      cell: (row) => {
        let count = classBookingsList?.filter(
          (x) =>
            // x?.days?.map((day) => day.index).includes(row.index)
            (x.bookingType == 'Ongoing' && x?.days?.map((day) => day.index).includes(row.index)) ||
            (x.bookingType == 'One Time' && selectedClass.startDate == x.bookingDate)
        ).length;
        return (
          <div className="w-100">
            <div className="table-rating ">
              <span>{count}</span>
            </div>
          </div>
        );
      }
    }
  ];

  useEffect(() => {
    if (classBookingsList !== undefined && classBookingsList.length > 0) {
      const bookingDatalist = classBookingsList?.map((booking) => {
        return { ...booking, action: 'none', value: booking._id, label: booking.fullName };
      });
      setBookingData(bookingDatalist);
    } else {
      setBookingData([]);
    }
  }, [classBookingsList]);

  const handlePagination = (page) => {
    setCurrentPage(page.selected);
  };

  const updateRow = (newRowData) => {
    dispatch(updateBookClass(newRowData));
  };

  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=""
      nextLabel=""
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      pageCount={Math.ceil(selectedClass?.schedule?.length / 10) || 1}
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
            columns={coloumns}
            paginationPerPage={10}
            className="react-dataTable"
            sortIcon={<ChevronDown size={10} />}
            paginationDefaultPage={currentPage + 1}
            paginationComponent={CustomPagination}
            data={selectedClass?.schedule}
            expandableRows
            // expandableRowExpanded={(row) => {
            //   return row === currentRow;
            // }}
            expandableRowsComponent={(row) => {
              return <StudentList index={row.data?.index} type={type} />;
            }}
            onRowExpandToggled={(bool, row) => setCurrentRow(row)}
          />
        )}
      </div>
    </Fragment>
  );
};
export default TimeScheduleList;
