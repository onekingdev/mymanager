// ** React Imports
import { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// ** Third Party Components
import classnames from 'classnames';

// import Flatpickr from 'react-flatpickr'
import { ChevronDown, MessageCircle, MessageSquare, X } from 'react-feather';
import moment from 'moment';
import Select, { components } from 'react-select';
import PerfectScrollbar from 'react-perfect-scrollbar';

// ** Reactstrap Imports
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Input,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
  Col,
  CardHeader,
  CardTitle,
  ButtonGroup,
  Spinner,
  Label
} from 'reactstrap';

// ** Utils
import { selectThemeColors } from '@utils';

// ** Styles Imports
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';
import DataTable from 'react-data-table-component';
import ReactPaginate from 'react-paginate';
import AttendanceAction from './AttendanceAction';
import { getUserData } from '../../../auth/utils';
import AttendanceList from './AttendanceList';
import BookingList from './BookingList';
import { endOfToday, format, isToday, startOfDay } from 'date-fns';
import StudentAttendanceAction from './StudentAttendanceAction';
import BookList from './BookList/StudentList';
import { fetchClasses, fetchPrograms, getAttendance, selectClass } from '../store';
import TimeScheduleList from './BookList/TimeScheduleList';
import { IoSettingsOutline } from 'react-icons/io5';
import AddProgram from './AddProgram';
import { customInterIceptors } from '../../../lib/AxiosProvider';
import { cvtColor } from '../../contacts/contact-list/constants';
const API = customInterIceptors();

const ViewAttendance = (props) => {
  const convertDateTimezone = (date, timezone) => {
    var diff = 0;
    if (timezone) {
      let originDate = new Date(
        date.toLocaleString('en-US', {
          timeZone: timezone
        })
      );
      diff = originDate.getTime() - date.getTime();
    }
    let originDate = new Date(date.getTime() + diff);
    return originDate;
  };
  const convertDate = (date, timezone) => {
    return moment(convertDateTimezone(new Date(date), timezone)).format('MM/DD/YYYY');
  };

  const convertTime = (date, timezone) => {
    return moment(convertDateTimezone(new Date(date), timezone)).format('LT');
  };

  const columns = [
    {
      name: 'Class',
      sortable: true,
      minWidth: '240px',
      sortField: 'startDate',
      cell: (row) => {
        const dateStr = row.startDate;
        const date = new Date(dateStr);

        const classEndTime = row.classEndTime;
        const classStartTime = row.classStartTime;

        const endTime = new Date();
        endTime.setHours(parseInt(classEndTime.split(':')[0]));
        endTime.setMinutes(parseInt(classEndTime.split(':')[1]));
        const endTimeString = endTime.toLocaleString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        });

        const startTime = new Date();
        startTime.setHours(parseInt(classStartTime.split(':')[0]));
        startTime.setMinutes(parseInt(classStartTime.split(':')[1]));
        const startTimeString = startTime.toLocaleString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        });

        return (
          <div>
            <b> {`${row?.classTitle}` || 'N A'}</b>

            <br />
            <span>
              {startTimeString} ~ {endTimeString}{' '}
            </span>
          </div>
        );
      }
    },

    {
      name: 'Total',
      sortable: true,
      width: '120px',
      selector: (row) => row.programName[0]?.label,
      cell: (row) => (
        <div className="table-rating">
          <span>{row?.count?.attended}</span>
        </div>
      )
    },

    // {
    //   name: 'Program',
    //   sortable: true,
    //   width: '150px',
    //   selector: (row) => row.programName[0]?.label
    // },
    {
      name: 'Actions',
      allowOverflow: false,
      width: '130px',
      // style: {
      //     display: "flex", justifyContent: "center"
      // },
      cell: (row) => <AttendanceAction classRow={row} />
    }
  ];

  const dispatch = useDispatch();
  // **  Props
  const { viewAttendanceOpen, setViewAttendanceOpen } = props;
  const [currentRow, setCurrentRow] = useState(null);

  const { classes } = useSelector((state) => state.calendar?.classes);

  const classBookingsList = useSelector((state) => state.calendar?.classBookings);
  const programList = useSelector((state) => state.calendar?.programs);
  const [classesBySeries, setClassesBySeries] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [programName, setProgramName] = useState([
    {
      value: 'Little Tiger',
      label: 'Little Tiger',
      color: 'primary'
    }
  ]);

  // ** Program Setting Modal Open State
  const [programSettingOpen, setProgramSettingOpen] = useState(false);

  const options = programList?.map((x) => ({
    ...x,
    value: x.title,
    label: x.title,
    color: x.color
  }));

  const OptionComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <span
          className={`bullet bullet-${data.color.replace('light-', '')} bullet-sm me-50`}
          style={{ opacity: data.color.includes('light') ? 0.2 : 1 }}
        ></span>
        {data.label}
      </components.Option>
    );
  };

  // classEndTime
  // classStartTime

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  // ** States
  const [currentPage, setCurrentPage] = useState(0);
  // const [active, setActive] = useState('1');
  const [activeTab, setActiveTab] = useState('attendance');

  const bookingColumns = [
    {
      name: 'Class',
      sortable: true,
      minWidth: '180px',
      sortField: 'startDate',
      cell: (row) => {
        const dateStr = row.startDate;
        const date = new Date(dateStr);

        const classEndTime = row.classEndTime;
        const classStartTime = row.classStartTime;

        const endTime = new Date();
        endTime.setHours(parseInt(classEndTime.split(':')[0]));
        endTime.setMinutes(parseInt(classEndTime.split(':')[1]));
        const endTimeString = endTime.toLocaleString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        });

        const startTime = new Date();
        startTime.setHours(parseInt(classStartTime.split(':')[0]));
        startTime.setMinutes(parseInt(classStartTime.split(':')[1]));
        const startTimeString = startTime.toLocaleString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        });

        return (
          <div>
            <b> {`${row?.classTitle}` || 'N A'}</b>

            <br />
            {/* <span>
              {startTimeString} ~ {endTimeString}{' '}
            </span> */}
          </div>
        );
      }
    },
    {
      name: 'Days',
      // sortable: true,
      minWidth: '250px',
      cell: (row) => {
        let classDays = [];
        row?.schedule?.map((schedule) => {
          schedule?.classDays?.map((x) => {
            if (!classDays.includes(x)) {
              classDays = [...classDays, x];
            }
          });
        });
        return (
          <div>
            <ButtonGroup>
              <Button
                color="danger"
                style={{ padding: '7px 10px', fontSize: '12px' }}
                outline={!classDays.includes('Sunday')}
                disabled
              >
                S
              </Button>
              <Button
                color="primary"
                style={{ padding: '7px 10px', fontSize: '12px' }}
                outline={!classDays.includes('Monday')}
                disabled
              >
                M
              </Button>
              <Button
                color="primary"
                style={{ padding: '7px 10px', fontSize: '12px' }}
                outline={!classDays.includes('Tuesday')}
                disabled
              >
                T
              </Button>
              <Button
                color="primary"
                style={{ padding: '7px 10px', fontSize: '12px' }}
                outline={!classDays.includes('Wednesday')}
                disabled
              >
                w
              </Button>
              <Button
                color="primary"
                style={{ padding: '7px 10px', fontSize: '12px' }}
                outline={!classDays.includes('Thursday')}
                disabled
              >
                T
              </Button>
              <Button
                color="primary"
                style={{ padding: '7px 10px', fontSize: '12px' }}
                outline={!classDays.includes('Friday')}
                disabled
              >
                F
              </Button>
              <Button
                color="primary"
                style={{ padding: '7px 10px', fontSize: '12px' }}
                outline={!classDays.includes('Saturday')}
                disabled
              >
                S
              </Button>
            </ButtonGroup>
          </div>
        );
      }
    },
    {
      name: 'Total',
      width: '90px',
      selector: (row) => row.programName[0]?.label,
      cell: (row) => (
        <div className="w-100">
          {/* <div className="d-flex flex-column align-items-end"> */}
          <div className="table-rating ">
            <span>
              {activeTab == 'attendance'
                ? row?.attendedStudentCountBySeries
                : row?.schedule?.length}
            </span>
          </div>
          {/* </div> */}
        </div>
      )
    },
    {
      name: 'Actions',
      allowOverflow: false,
      width: '102px',
      cell: (row) => <AttendanceAction classRow={row} />
    }
  ];

  useEffect(() => {
    if (viewAttendanceOpen) {
      dispatch(fetchClasses(getUserData()?.id));
      dispatch(fetchPrograms());
    }
  }, [viewAttendanceOpen]);

  const handlePagination = (page) => {
    setCurrentPage(page.selected);
  };

  // ** Close BTN
  const CloseBtn = (
    <X
      className="cursor-pointer"
      size={15}
      onClick={() => setViewAttendanceOpen(!viewAttendanceOpen)}
    />
  );

  useEffect(() => {
    const uniqueClasses = [...new Map(classes?.map((m) => [m.seriesId, m])).values()];
    setClassesBySeries(uniqueClasses);
  }, [classes]);
  useEffect(() => {
    if (classesBySeries) {
      setFilterData(
        classesBySeries
          .filter((x) =>
            selectedYear ? new Date(x.wholeSeriesStartDate).getFullYear() == selectedYear : true
          )
          .filter((x) =>
            selectedMonth ? new Date(x.wholeSeriesStartDate).getMonth() + 1 == selectedMonth : true
          )
          .filter((x) => x.programName[0]?.value == programName[0].value)
        // .filter((x) => (selectedDate ? new Date(x.startDate).getDate() == selectedDate : true))
      );
    }
  }, [programName, selectedMonth, selectedYear, classes]);

  console.log('filterData', filterData);

  useEffect(() => {
    dispatch(selectClass(currentRow));
    dispatch(
      getAttendance({
        // classId: currentRow?._id,
        seriesId: currentRow?.seriesId,
        startDate: new Date(`${selectedMonth}/1/${selectedYear}`).toLocaleDateString(),
        endDate: new Date(
          `${selectedMonth !== 12 ? selectedMonth + 1 : 1}/1/${
            selectedMonth !== 12 ? selectedYear : selectedYear + 1
          }`
        ).toLocaleDateString()
      })
    );
  }, [currentRow]);

  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=""
      nextLabel=""
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      pageCount={Math.ceil(filterData.length / 10) || 1}
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

  const toggleProgramModal = () => {
    setProgramSettingOpen(false);
  };

  const programSettingClicked = () => {
    setProgramSettingOpen(true);
  };

  return (
    <Modal
      isOpen={viewAttendanceOpen}
      // className="sidebar-xl"
      style={{ width: '850px' }}
      toggle={() => {
        setActiveTab('attendance');
        dispatch(selectClass(null));
        setViewAttendanceOpen(!viewAttendanceOpen);
      }}
      contentClassName="p-0 overflow-hidden"
      modalClassName="modal-slide-in event-sidebar"
    >
      <ModalHeader
        className="mb-1"
        toggle={() => {
          setActiveTab('attendance');
          setViewAttendanceOpen(!viewAttendanceOpen);
        }}
        close={CloseBtn}
        tag="div"
      >
        <Nav pills>
          <NavItem className="attendance-booking">
            <NavLink
              className={classnames({
                active: activeTab === 'attendance'
              })}
              onClick={() => {
                setActiveTab('attendance');
              }}
            >
              <h5 className="modal-title">Attendance</h5>
            </NavLink>
          </NavItem>
          <NavItem className="attendance-booking">
            <NavLink
              className={classnames({
                active: activeTab === 'booked'
              })}
              onClick={() => {
                setActiveTab('booked');
              }}
            >
              <h5 className="modal-title">Booking</h5>
            </NavLink>
          </NavItem>
        </Nav>
        {/* <h5 className="modal-title">Attendance</h5> */}
      </ModalHeader>
      <PerfectScrollbar options={{ wheelPropagation: false }}>
        <div className="flex-grow-1 ">
          <div
            className="d-flex justify-content-between align-items-center pb-1 border-bottom"
            style={{ paddingLeft: '20px', paddingRight: '20px' }}
          >
            {/* <h4 className="m-0">{format(new Date(), 'MMMM dd yyyy')}</h4> */}
            <div className="mb-0 mt-0">
              <Label className="form-label" for="label">
                Program Name
              </Label>
              <div className="d-flex align-items-center" style={{ minWidth: '250px' }}>
                <Select
                  id="label"
                  value={programName}
                  options={options}
                  theme={selectThemeColors}
                  className="react-select w-100 me-1"
                  classNamePrefix="select"
                  isClearable={false}
                  onChange={(data) => setProgramName([data])}
                  components={{
                    Option: OptionComponent
                  }}
                />
                <Button color="flat-secondary" className="p-0" onClick={programSettingClicked}>
                  <IoSettingsOutline size={24} />
                </Button>
              </div>
            </div>
            <Row>
              <Col md={6}>
                <Label className="form-label" for="label">
                  Month
                </Label>
                <Input
                  type="select"
                  value={selectedMonth || new Date().getMonth() + 1}
                  onChange={handleMonthChange}
                >
                  <option value={0}>Month</option>
                  <option value={1}>January</option>
                  <option value={2}>February</option>
                  <option value={3}>March</option>
                  <option value={4}>April</option>
                  <option value={5}>May</option>
                  <option value={6}>June</option>
                  <option value={7}>July</option>
                  <option value={8}>August</option>
                  <option value={9}>September</option>
                  <option value={10}>October</option>
                  <option value={11}>November</option>
                  <option value={12}>December</option>
                </Input>
              </Col>
              <Col md={6}>
                <Label className="form-label" for="label">
                  Year
                </Label>
                <Input type="select" value={selectedYear} onChange={handleYearChange}>
                  <option value={0}>Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </Input>
              </Col>
            </Row>
          </div>
          <div className="react-dataTable m-1 border rounded-2 book-react-datatable">
            <TabContent className="w-100" activeTab={activeTab}>
              <TabPane tabId="attendance">
                <DataTable
                  noHeader
                  pagination
                  columns={bookingColumns}
                  paginationPerPage={7}
                  className="react-dataTable"
                  sortIcon={<ChevronDown size={10} />}
                  paginationDefaultPage={currentPage + 1}
                  paginationComponent={CustomPagination}
                  data={filterData}
                  expandableRows
                  expandableRowExpanded={(row) => {
                    return row === currentRow;
                  }}
                  expandableRowsComponent={(row) => (
                    <AttendanceList
                      classId={row?.data?._id}
                      seriesId={row?.data?.seriesId}
                      classBookingsList={classBookingsList}
                    />
                  )}
                  onRowExpandToggled={(bool, row) => setCurrentRow(row)}
                />
              </TabPane>
              <TabPane tabId="booked">
                <DataTable
                  noHeader
                  pagination
                  columns={bookingColumns}
                  paginationPerPage={7}
                  className="react-dataTable"
                  sortIcon={<ChevronDown size={10} />}
                  paginationDefaultPage={currentPage + 1}
                  paginationComponent={CustomPagination}
                  data={filterData}
                  expandableRows
                  expandableRowExpanded={(row) => {
                    return row === currentRow;
                  }}
                  expandableRowsComponent={(row) => {
                    return <TimeScheduleList classId={row?.data?._id} type={'bookingDetails'} />;
                  }}
                  onRowExpandToggled={(bool, row) => setCurrentRow(row)}
                />
              </TabPane>
            </TabContent>
          </div>
        </div>
      </PerfectScrollbar>
      <AddProgram
        open={programSettingOpen}
        dispatch={dispatch}
        programs={options}
        toggle={toggleProgramModal}
      />
    </Modal>
  );
};

export default ViewAttendance;
const years = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035];
