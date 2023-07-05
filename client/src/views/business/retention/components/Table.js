import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DataTable from 'react-data-table-component';
import { ChevronDown, Search } from 'react-feather';
import { InputGroup, InputGroupText, Input, Card, CardHeader, CardTitle } from 'reactstrap';
import Select from 'react-select';

import useColumns from './useColumns';
import { selectThemeColors, calculatePassedDays } from '../../../../utility/Utils';
import NoteModal from '../../../contacts/Note';
import ReactPaginate from 'react-paginate';

const roleOptions = [
  { value: 'Client', label: 'Clients' },
  { value: 'Employee', label: 'Employee' },
  { value: 'Lead', label: 'Leads' },
  { value: 'Relationship', label: 'Relationship' },
  { value: 'Vendor', label: 'Vendor' }
];

const lastOptions = [
  { value: true, label: 'Last Attended' },
  { value: false, label: 'Last Contacted' }
];
const Table = (props) => {
  const {
    title,
    setFirstArrNum,
    setSecondArrNum,
    setThirdArrNum,
    setFourthArrNum,
    setFifthArrNum
  } = props;
  const dispatch = useDispatch();
  // ** States
  const [row, setRow] = useState({});

  const [filtervalue, setFiltervalue] = useState(roleOptions[0]);
  const [noteModal, setNoteModal] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [lastOption, setLastOption] = useState(lastOptions[0]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState({
    id: '',
    show: false
  });
  // ** Redux Store
  const totalContacts = useSelector((state) => state.totalContacts?.contactList?.list);
  const totalContactTypes = useSelector((state) => state.totalContacts?.contactTypeList);
  const totalNotes = useSelector((state) => state?.totalContacts?.totalNotes?.data);
  const notes = useSelector((state) => state?.totalContacts?.notes?.data);
  const totalAttendance = useSelector((state) => state.attendance?.totalClassAttendees);
  const totalRetention = useSelector((state) => state.retention);
  // ** Effect
  useEffect(() => {
    let tmp = [],
      tmpTypeArr = [],
      tmpFirstArr = [],
      tmpSecondArr = [],
      tmpThirdArr = [],
      tmpFourthArr = [],
      tmpFifthArr = [],
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
      if (lastOption.value) {
        tmpTypeArr.map((item, index) => {
          if (
            lastAttend(item) != 'nocontact' &&
            0 < calculatePassedDays(lastAttend(item)) &&
            calculatePassedDays(lastAttend(item)) < 7
          ) {
            tmpFirstArr.push(item);
          } else if (
            lastAttend(item) != 'nocontact' &&
            6 < calculatePassedDays(lastAttend(item)) &&
            calculatePassedDays(lastAttend(item)) < 15
          ) {
            tmpSecondArr.push(item);
          } else if (
            lastAttend(item) != 'nocontact' &&
            14 < calculatePassedDays(lastAttend(item)) &&
            calculatePassedDays(lastAttend(item)) < 31
          ) {
            tmpThirdArr.push(item);
          } else if (
            lastAttend(item) != 'nocontact' &&
            30 < calculatePassedDays(lastAttend(item)) &&
            calculatePassedDays(lastAttend(item)) < 61
          ) {
            tmpFourthArr.push(item);
          } else if (
            lastAttend(item) != 'nocontact' &&
            60 < calculatePassedDays(lastAttend(item))
          ) {
            tmpFifthArr.push(item);
          } else return;
        });
      } else {
        tmpTypeArr.map((item, index) => {
          if (
            lastContact(item) != 'nocontact' &&
            0 < calculatePassedDays(lastContact(item)) &&
            calculatePassedDays(lastContact(item)) < 7
          ) {
            tmpFirstArr.push(item);
          } else if (
            lastContact(item) != 'nocontact' &&
            6 < calculatePassedDays(lastContact(item)) &&
            calculatePassedDays(lastContact(item)) < 15
          ) {
            tmpSecondArr.push(item);
          } else if (
            lastContact(item) != 'nocontact' &&
            14 < calculatePassedDays(lastContact(item)) &&
            calculatePassedDays(lastContact(item)) < 31
          ) {
            tmpThirdArr.push(item);
          } else if (
            lastContact(item) != 'nocontact' &&
            30 < calculatePassedDays(lastContact(item)) &&
            calculatePassedDays(lastContact(item)) < 61
          ) {
            tmpFourthArr.push(item);
          } else if (
            lastContact(item) != 'nocontact' &&
            60 < calculatePassedDays(lastContact(item))
          ) {
            tmpFifthArr.push(item);
          } else return;
        });
      }

      if (title === '0-6 Days') {
        tmp = tmpFirstArr;
      } else if (title === '7-14 Days') {
        tmp = tmpSecondArr;
      } else if (title === '15-30 Days') {
        tmp = tmpThirdArr;
      } else if (title === '31-60 Days') {
        tmp = tmpFourthArr;
      } else if (title === '60+ Days') {
        tmp = tmpFifthArr;
      }
      setFirstArrNum(tmpFirstArr.length);
      setSecondArrNum(tmpSecondArr.length);
      setThirdArrNum(tmpThirdArr.length);
      setFourthArrNum(tmpFourthArr.length);
      setFifthArrNum(tmpFifthArr.length);
      setTableData(tmp);
    } else return;
  }, [totalContacts, totalContactTypes, totalNotes, filtervalue, title, lastOption]);

  // ** Handlers
  const lastContact = (row) => {
    let result = new Date('1995-01-01T00:00:00');
    totalNotes &&
      totalNotes.length > 0 &&
      totalNotes.map((item, index) => {
        if (item.contactId == row._id) {
          if (result && result < new Date(item.date)) {
            result = new Date(item.date);
          } else return;
        }
      });
    return result.getFullYear() == 1995 ? 'nocontact' : result;
  };
  const lastAttend = (row) => {
    let result = new Date('1995-01-01T00:00:00');
    totalAttendance &&
      totalAttendance.length > 0 &&
      totalAttendance.map((item, index) => {
        if (item.contactId == row._id) {
          if (result && result < new Date(item.attendedDateTime)) {
            result = new Date(item.attendedDateTime);
          } else return;
        }
      });

    return result.getFullYear() == 1995 ? 'nocontact' : result;
  };

  const toggleNoteModal = () => {
    setNoteModal(!noteModal);
  };
  const { columns } = useColumns({
    setRow,
    row,
    toggle: toggleNoteModal,
    notes: totalNotes,
    totalAttendance,
    totalRetention,
    lastOption,
    lastAttend,
    lastContact
  });

  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
  };

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const CustomPagination = () => {
    const count = Math.ceil(tableData?.length / rowsPerPage);

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
              <div>Retention ({title})</div>
              <div>
                <InputGroup className="d-flex justify-content-end input-group-merge p-0 font-small-4">
                  <Select
                    theme={selectThemeColors}
                    isClearable={false}
                    className="p-0 me-1"
                    classNamePrefix="select"
                    options={lastOptions}
                    value={lastOption}
                    onChange={(data) => setLastOption(data)}
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
                    className="p-0"
                    classNamePrefix="select"
                    options={roleOptions}
                    value={filtervalue}
                    onChange={(data) => setFiltervalue(data)}
                    styles={{
                      control: (baseStyles) => ({
                        ...baseStyles,
                        minWidth: '120px'
                      })
                    }}
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
            paginationComponent={CustomPagination}
            paginationPerPage={7}
            sortIcon={<ChevronDown size={10} />}
            data={tableData}
          />
        </div>
      </Card>
      {row !== null && (
        <NoteModal
          toggle={toggleNoteModal}
          isOpen={noteModal}
          row={row}
          notes={notes || []}
          dispatch={dispatch}
          setDeleteModal={setDeleteModal}
        />
      )}
    </div>
  );
};

export default Table;
