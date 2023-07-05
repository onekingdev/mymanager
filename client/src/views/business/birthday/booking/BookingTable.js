import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DataTable from 'react-data-table-component';
import { ChevronDown } from 'react-feather';
import Select from 'react-select';
import { Card } from 'reactstrap';

import useColumns from './useColumns';
import NoteModal from '../../../contacts/Note';
import AddBookingModal from './add/AddBookingModal';
import EditBookingModal from './edit/EditBookingModal';
import {
  isToday,
  selectThemeColors,
  isDateInCurMonth,
  isIntervalInCurMonth
} from '../../../../utility/Utils';
import BackgroundColor from '../../../formBuilder/edit/styles/properties/BackgroundColor';

const BookingTable = () => {
  // ** Constants
  const months = [
    { value: 'jan', label: 'January' },
    { value: 'feb', label: 'Febrary' },
    { value: 'mar', label: 'March' },
    { value: 'apr', label: 'April' },
    { value: 'may', label: 'May' },
    { value: 'jun', label: 'June' },
    { value: 'jul', label: 'July' },
    { value: 'aug', label: 'August' },
    { value: 'sep', label: 'September' },
    { value: 'oct', label: 'October' },
    { value: 'nov', label: 'November' },
    { value: 'dec', label: 'December' }
  ];
  const bookedOptions = [
    { value: 'all', label: 'All' },
    { value: 'booked', label: 'Booked' },
    { value: 'notbooked', label: 'Not Booked' }
  ];
  // ** Years
  const today = new Date();
  let years = [];
  for (let i = today.getFullYear() - 5; i < today.getFullYear() + 5; i++) {
    years.push({ value: i, label: i });
  }

  const dispatch = useDispatch();
  // ** States
  const [tableData, setTableData] = useState([]);
  // ** Notes
  const [row, setRow] = useState({});
  const [curNote, setCurNote] = useState([]);
  const [noteModal, setNoteModal] = useState(false);
  const [editBooking, setEditBooking] = useState(false);
  const [addBooking, setAddBooking] = useState(false);
  const [eventInfo, setEventInfo] = useState({});
  const [month, setMonth] = useState(months[today.getMonth()]);
  const [booked, setBooked] = useState(bookedOptions[0]);
  const [year, setYear] = useState({ value: today.getFullYear(), label: today.getFullYear() });
  const [deleteModal, setDeleteModal] = useState({
    id: '',
    show: false
  });
  // ** Redux
  const totalContacts = useSelector((state) => state.totalContacts?.contactList?.list);
  const totalContactTypes = useSelector((state) => state.totalContacts?.contactTypeList);
  const totalNotes = useSelector((state) => state?.totalContacts?.totalNotes?.data);
  const notes = useSelector((state) => state?.totalContacts?.notes?.data);
  const events = useSelector((state) => state?.event?.events);
  // ** Effects
  useEffect(() => {
    let tmp = [],
      tmpBookedArr = [],
      tmpNotBookedArr = [];
    if (totalContacts) {
      if (month?.value && year.value) {
        totalContacts.map((item1, index) => {
          let event = events.find((item2) => item2.hostEmail == item1.email);
          if (event && isIntervalInCurMonth(event.start, event.end, year, month)) {
            tmpBookedArr.push(item1);
          } else {
            tmpNotBookedArr.push(item1);
          }
        });
      }
      if (booked.value == 'all') {
        tmp = totalContacts;
      } else if (booked.value == 'booked') {
        tmp = tmpBookedArr;
      } else if (booked.value == 'notbooked') {
        tmp = tmpNotBookedArr;
      }
      setTableData(tmp);
    }
  }, [totalContacts, month, year, events, booked]);
  // ** Handlers
  const toggle = () => {
    setNoteModal(!noteModal);
  };
  const handleYearChange = (data) => {
    setYear(data);
  };
  const handleMonthChange = (data) => {
    setMonth(data);
  };
  const { columns } = useColumns({
    setRow,
    toggle,
    row,
    notes: totalNotes,
    setCurNote,
    events,
    setEditBooking,
    setAddBooking,
    setEventInfo
  });

  return (
    <div className="email-user-list">
      <div className="d-flex align-content-center w-100 my-1">
        <Select
          theme={selectThemeColors}
          isClearable={false}
          className="p-0"
          classNamePrefix="select"
          options={months}
          value={month}
          onChange={(data) => handleMonthChange(data)}
        />
        <Select
          theme={selectThemeColors}
          isClearable={false}
          className="p-0 ms-1"
          classNamePrefix="select"
          options={years}
          value={year}
          onChange={(data) => handleYearChange(data)}
        />
        <Select
          theme={selectThemeColors}
          isClearable={false}
          className="p-0 ms-1"
          classNamePrefix="select"
          options={bookedOptions}
          value={booked}
          onChange={(data) => setBooked(data)}
        />
      </div>
      <Card className="overflow-hidden">
      <div className="react-dataTable" style={{ height: 'auto', maxHeight: "100%"}}>
          <DataTable
            className="react-dataTable"
            noHeader
            pagination
            selectableRows
            columns={columns}
            paginationPerPage={7}
            sortIcon={<ChevronDown size={10} />}
            data={tableData}
          />
        </div>
        {row !== null && (
          <NoteModal
            toggle={toggle}
            isOpen={noteModal}
            row={row}
            notes={notes || []}
            dispatch={dispatch}
            setDeleteModal={setDeleteModal}
          />
        )}
        {row !== null && (
          <AddBookingModal addBooking={addBooking} setAddBooking={setAddBooking} row={row} />
        )}
        {row !== null && (
          <EditBookingModal
            editBooking={editBooking}
            setEditBooking={setEditBooking}
            eventInfo={eventInfo}
          />
        )}
      </Card>
    </div>
  );
};

export default BookingTable;
