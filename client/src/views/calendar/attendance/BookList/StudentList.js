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
import { markAttendance, updateBookClass } from '../../store';
import { Badge, Spinner } from 'reactstrap';
import { getAvatarColor } from '../constants';
import { success } from '../../../ui-elements/response-popup';
import { weekDays } from '../../../../utility/Utils';

const states = [
  'light-success',
  'light-danger',
  'light-warning',
  'light-info',
  'light-primary',
  'light-secondary'
];

const StudentList = (props) => {
  const { index, type } = props;
  const dispatch = useDispatch();
  const [bookingData, setBookingData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const classBookingsList = useSelector((state) => state.calendar?.classBookings);
  const { selectedClass } = useSelector((state) => state.calendar);

  const expandColumns = [
    {
      name: 'Full Name',
      sortable: true,
      width: '180px',
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
      width: '135px',
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

          {/* {row?.rankImg !== '' ? (
            <Avatar className="me-1" img={row?.rankImg} width="32" height="32" initials />
          ) : (
            <Avatar color={color || 'primary'} className="me-1" />
          )} */}
        </>
      )
    },
    {
      name: 'Days',
      sortable: true,
      width: '170px',
      selector: (row) => row.status,
      cell: (row) => {
        if (row.days?.length) {
          return (
            <div>
              {row?.days
                ?.filter((day) => day?.index == index)[0]
                ?.days?.map((x, index) => (
                  <Badge
                    key={`booked_days_${x}_${index}`}
                    color={x == 'Sunday' ? 'light-danger' : 'light-primary'}
                    style={{ marginRight: '0.2rem' }}
                  >
                    {x.slice(0, 3)}
                  </Badge>
                ))}
            </div>
          );
        }
      }
    },
    {
      name: 'Type',
      width: '90px',
      selector: (row) => row.status,
      cell: (row) => {
        return (
          <>
            {row.bookingType === 'Ongoing' ? (
              <Badge className="text-capitalize" color="light-success" pill>
                Ongoing
              </Badge>
            ) : row.bookingType === 'One Time' ? (
              <Badge className="text-capitalize" color="light-danger" pill>
                <b>One Time</b>
              </Badge>
            ) : (
              ''
            )}
          </>
        );
      }
    },
    {
      name: 'Attended',
      width: '115px',
      selector: (row) => row.status,
      cell: (row) => <IsAttendClass classRow={row} updateRow={updateRow} />
    },
    {
      name: 'Actions',
      allowOverflow: false,
      width: '110px',
      cell: (row) => <BookAttendanceAction bookingRow={row} />
      // selector: (row) => row.action
    }
  ];

  useEffect(() => {
    if (classBookingsList !== undefined && classBookingsList.length > 0) {
      const bookingDatalist =
        type == 'bookingDetails'
          ? classBookingsList?.filter(
              (x) =>
                (x.bookingType == 'Ongoing' && x?.days?.map((day) => day.index).includes(index)) ||
                (x.bookingType == 'One Time' && selectedClass.startDate == x.bookingDate)
            )
          : classBookingsList?.filter(
              (x) =>
                (x.bookingType == 'Ongoing' &&
                x?.days?.filter((day) => day?.index == index)?.length > 0
                  ? x?.days
                      ?.filter((day) => day?.index == index)[0]
                      ?.days.includes(weekDays[new Date(selectedClass.startDate).getDay()])
                  : false) ||
                (x.bookingType == 'One Time' &&
                  selectedClass.startDate == x.bookingDate &&
                  x?.days?.map((day) => day.index).includes(index))
            );
      setBookingData(bookingDatalist);
    } else {
      setBookingData([]);
    }
  }, [index, classBookingsList]);

  const handlePagination = (page) => {
    setCurrentPage(page.selected);
  };

  const updateRow = (newRowData) => {
    dispatch(markAttendance(newRowData)).then((response) => {
      if (response?.payload?.success) {
        success(response?.payload?.msg);
      }
    });
  };

  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=""
      nextLabel=""
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      pageCount={Math.ceil(bookingData.length / 10) || 1}
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
            columns={expandColumns}
            paginationPerPage={10}
            className="react-dataTable"
            sortIcon={<ChevronDown size={10} />}
            paginationDefaultPage={currentPage + 1}
            paginationComponent={CustomPagination}
            data={bookingData}
          />
        )}
      </div>
    </Fragment>
  );
};
export default StudentList;
