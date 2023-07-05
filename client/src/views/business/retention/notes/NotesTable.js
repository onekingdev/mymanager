import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ChevronDown } from 'react-feather';
import DataTable from 'react-data-table-component';
import Select from 'react-select';
import { Card } from 'reactstrap';
import useColumns from './useColumns';
import { selectThemeColors } from '@utils';
import { isDateInYearMonth } from '../../../../utility/Utils';

const roleOptions = [
  { value: 'This Month', label: 'This Month' },
  { value: 'Today', label: 'Today' },
  { value: 'Yesterday', label: 'Yesterday' },
  { value: 'Week', label: 'Week' },
  { value: 'Last Month', label: 'Last Month' }
];
const NotesTable = () => {
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
  // ** Years
  const today = new Date();
  let years = [];
  for (let i = today.getFullYear() - 5; i < today.getFullYear() + 5; i++) {
    years.push({ value: i, label: i });
  }
  // ** States
  const [month, setMonth] = useState(months[today.getMonth()]);
  const [year, setYear] = useState(years[5]);
  const [tableData, setTableData] = useState([]);
  // ** Redux
  const totalContacts = useSelector((state) => state.totalContacts?.contactList?.list);
  const totalNotes = useSelector((state) => state?.totalContacts?.totalNotes?.data);
  // ** Effects
  useEffect(() => {
    if (month != null || year != null) {
      let tmp = [];
      totalContacts &&
        totalContacts.map((contact, index) => {
          if (
            lastNote(contact) != 'nocontact' &&
            isDateInYearMonth(lastNote(contact).date, year.value, month.value)
          ) {
            tmp.push(contact);
          } else return;
        });
      setTableData(tmp);
    }
  }, [month, year, totalContacts]);

  // ** Handlers
  const lastNote = (row) => {
    let date = new Date('1995-01-01T00:00:00'),
      result = {};

    totalNotes &&
      totalNotes.length > 0 &&
      totalNotes.map((item, index) => {
        if (item.contactId == row._id) {
          if (date && date < new Date(item.date)) {
            date = new Date(item.date);
            result = item;
          } else return;
        }
      });

    return date.getFullYear() == 1995 ? 'nocontact' : result;
  };
  const { columns } = useColumns({ lastNote });
  return (
    <div className="email-user-list">
      <div className="d-flex align-content-center justify-content-end w-100 mt-2 mb-1">
        <Select
          theme={selectThemeColors}
          isClearable={false}
          className="p-0 me-1"
          classNamePrefix="select"
          options={months}
          value={month}
          onChange={(data) => setMonth(data)}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              minWidth: '120px'
            })
          }}
        />
        <Select
          theme={selectThemeColors}
          isClearable={false}
          className="p-0 ms-1"
          classNamePrefix="select"
          options={years}
          value={year}
          onChange={(data) => setYear(data)}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              minWidth: '120px'
            })
          }}
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
      </Card>
    </div>
  );
};

export default NotesTable;
