import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import { ChevronDown, Search } from 'react-feather';
import { InputGroup, Card, CardHeader, CardTitle, Badge, Input } from 'reactstrap';
import Select from 'react-select';

import useColumns from './useColumns';
import NoteModal from '../../../contacts/Note';

import {
  selectThemeColors,
  isDobInThisWeek,
  isDateInThisMonth,
  isDateInNextMonth,
  isDateInCurMonth,
  toCapitalize
} from '../../../../utility/Utils';
import ReactPaginate from 'react-paginate';

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

const roleOptions = [
  { value: 'Client', label: 'Clients' },
  { value: 'Employee', label: 'Employee' },
  { value: 'Lead', label: 'Leads' },
  { value: 'Relationship', label: 'Relationship' },
  { value: 'Vendor', label: 'Vendors' }
];

const Table = (props) => {
  const dispatch = useDispatch();
  const {
    title,
    setWeekArr,
    setMonthArr,
    setNextMonthArr,
    setByMonthArr,
    byMonth,
    byMonthArr,
    setByMonth,
    setTitle
  } = props;
  // ** States
  const [filtervalue, setFiltervalue] = useState(roleOptions[0]);
  const [tableData, setTableData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  // ** Notes
  const [row, setRow] = useState({});
  const [curNote, setCurNote] = useState([]);
  const [noteModal, setNoteModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState({
    id: '',
    show: false
  });
  // ** Redux Store
  const totalContacts = useSelector((state) => state.totalContacts?.contactList?.list);
  const totalContactTypes = useSelector((state) => state.totalContacts?.contactTypeList);
  const totalNotes = useSelector((state) => state?.totalContacts?.totalNotes?.data);
  const notes = useSelector((state) => state?.totalContacts?.notes?.data);
  const events = useSelector((state) => state?.event?.events);

  // ** Effect
  useEffect(() => {
    let tmp = [],
      tmpTypeArr = [],
      tmpWeekArr = [],
      tmpMonthArr = [],
      tmpNextMonthArr = [],
      tmpByMonthArr = [],
      clientId = '',
      relationshipId = '',
      employeeId = '',
      vendorId = '',
      leadId = '';
    totalContactTypes.map((contactType, index) => {
      if (contactType.name == 'Client') {
        clientId = contactType._id;
      } else if (contactType.name == 'Employee') {
        employeeId = contactType._id;
      } else if (contactType.name == 'Relationship') {
        relationshipId = contactType._id;
      } else if (contactType.name == 'Lead') {
        leadId = contactType._id;
      } else if (contactType.name == 'Vendor') {
        vendorId = contactType._id;
      } else return;
    });
    if (totalContacts) {
      if (filtervalue?.value) {
        totalContacts.map((item, index) => {
          if (filtervalue.value == 'Client') {
            if (item.contactType.includes(clientId)) {
              tmpTypeArr.push(item);
            } else return;
          } else if (filtervalue.value == 'Employee') {
            if (item.contactType.includes(employeeId)) {
              tmpTypeArr.push(item);
            } else return;
          } else if (filtervalue.value == 'Relationship') {
            if (item.contactType.includes(relationshipId)) {
              tmpTypeArr.push(item);
            } else return;
          } else if (filtervalue.value == 'Lead') {
            if (item.contactType.includes(leadId)) {
              tmpTypeArr.push(item);
            } else return;
          } else if (filtervalue.value == 'Vendor') {
            if (item.contactType.includes(vendorId)) {
              tmpTypeArr.push(item);
            } else return;
          }
        });
        tmp = tmpTypeArr;
      }

      tmpTypeArr.map((item, index) => {
        if (isDobInThisWeek(new Date(item.dob))) {
          tmpWeekArr.push(item);
        } else if (isDateInThisMonth(item.dob)) {
          tmpMonthArr.push(item);
        } else if (isDateInNextMonth(item.dob)) {
          tmpNextMonthArr.push(item);
        }
      });
      tmpTypeArr.map((item, index) => {
        if (isDateInCurMonth(item.dob, byMonth.value)) {
          tmpByMonthArr.push(item);
        }
      });
      if (byMonth?.label) {
        tmp = tmpByMonthArr;
      } else {
        if (title === 'This Week') {
          tmp = tmpWeekArr;
        } else if (title === 'This Month') {
          tmp = tmpMonthArr;
        } else if (title === 'Next Month') {
          tmp = tmpNextMonthArr;
        }
      }
      setByMonthArr(tmpByMonthArr);
      setWeekArr(tmpWeekArr);
      setMonthArr(tmpMonthArr);
      setNextMonthArr(tmpNextMonthArr);

      setTableData(tmp);
    } else return;
  }, [totalContacts, totalContactTypes, filtervalue, title, byMonth]);

  // ** Handlers
  const handleByMonthChange = (data) => {
    setByMonth(data);
    setTitle('');
  };

  const toggle = () => {
    setNoteModal(!noteModal);
  };

  const { columns } = useColumns({ setRow, toggle, row, notes: totalNotes, setCurNote, events });

 

const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
  };

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const CustomPagination = () => {
    const count = Math.ceil(tableData.length / rowsPerPage);


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
    <div className="email-user-list">
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="w-100">
            <div className="d-flex justify-content-between w-100">
              <div>Birthdays {byMonth?.value ? `in ${toCapitalize(byMonth.label)}` : title}</div>
              <div className="d-flex align-items-center">
                {/* <ListGroupItem action className="cursor-pointer" active={isActiveItem('By Month')}> */}

                <div
                  className="d-flex align-items-center me-1 by-month-filter"
                  style={{ minWidth: '160px' }}
                >
                  <Select
                    theme={selectThemeColors}
                    isClearable={false}
                    className="p-0"
                    classNamePrefix="select"
                    options={months}
                    value={byMonth}
                    onChange={(data) => handleByMonthChange(data)}
                    styles={{
                      control: (baseStyles) => ({
                        ...baseStyles,
                        minWidth: '120px'
                      })
                    }}
                  />
                </div>

                <InputGroup className="d-flex justify-content-end input-group-merge p-0 font-small-4">
                  <Select
                    theme={selectThemeColors}
                    isClearable={false}
                    className="p-0"
                    classNamePrefix="select"
                    options={roleOptions}
                    value={filtervalue}
                    onChange={(data) => setFiltervalue(data)}
                  />
                </InputGroup>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <div className="react-dataTable" style={{ height: 'auto', maxHeight: "100%"}}>
          <DataTable
            className="react-dataTable"
            noHeader
            pagination
            selectableRows
            columns={columns}
            // paginationPerPage={7}
            paginationComponent={CustomPagination}
            sortIcon={<ChevronDown size={10} />}
            data={tableData}
          />
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
        </div>
      </Card>
    </div>
  );
};

export default Table;
