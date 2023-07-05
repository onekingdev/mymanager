// ** React Imports
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, ArrowRight, ChevronDown, Eye } from 'react-feather';
import { Button, Input, Badge, UncontrolledTooltip } from 'reactstrap';
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';
import { useHistory, Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Select from 'react-select';
import moment from 'moment';
// ** Styles Imports
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';

// import Avatar from '../../../components/avatar';
import { selectThemeColors } from '@utils';
import Avatar from '@components/avatar';
import { customInterIceptors } from '@src/lib/AxiosProvider';
import { promotedListAction, demoteClientAction } from '../../../store/actions';
import { getEventInfo } from '../../../../calendar/event/store';
import NoteModal from '../../../Note';

const filterOptions = [
  { value: 'all', label: 'All' },
  { value: 'promoted', label: 'Promoted' },
  { value: 'notpromoted', label: 'Not Promoted' }
];

const orderColors = [
  'light-success',
  'light-danger',
  'light-warning',
  'light-info',
  'light-primary',
  'light-secondary'
];

const FinalStatus = (props) => {
  const { stepper, contactRankList, clientContactList, noteData } = props;
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const [row, setRow] = useState({});
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [noteModal, setNoteModal] = useState(false);
  const [filterOption, setFilterOption] = useState(filterOptions[0]);
  const [filteredArray, setFilteredArray] = useState([]);
  const [tableData, setTableData] = useState([]);
  // ** Redux Store
  const progressionList = useSelector((state) => state.progression?.progressionList);

  // ** Effect
  useEffect(() => {
    let tmp = [];
    clientContactList?.length > 0 &&
      clientContactList.map((selected) => {
        let filteredContactList = contactRankList.filter(
          (promoted) => promoted.contactId == selected?._id
        );
        filteredContactList.length > 0
          ? tmp.push({
              ...filteredContactList[0],
              fullName: selected.fullName,
              email: selected.email
            })
          : tmp.push({ ...selected, contactId: selected._id });
      });
    setTableData(tmp);
  }, [contactRankList]);

  useEffect(() => {
    let tmp = [];
    if (filterOption?.value == 'all') {
      tmp = tableData;
    } else {
      tableData?.length > 0 &&
        tableData.map((contact, index) => {
          if (filterOption?.value == 'promoted' && contact.ispromoted) {
            tmp.push(contact);
          } else if (filterOption?.value == 'notpromoted' && !contact.ispromoted) {
            tmp.push(contact);
          }
        });
    }
    setFilteredArray(tmp);
  }, [tableData, filterOption]);

  const columns = [
    {
      name: 'Full Name',
      sortable: true,
      minWidth: '217px',
      sortField: 'fullName',
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          <div className="d-flex flex-column">
            <Link className="user_name text-truncate text-body">
              {row?.clientName ? row.clientName : row?.fullName ? row.fullName : ''}
            </Link>
            <small className="text-truncate text-muted mb-0">{row?.email}</small>
          </div>
        </div>
      )
    },
    {
      name: 'Progression',
      width: '250px',
      selector: (row) => row?.clieId,
      cell: (row) => {
        return (
          <Input
            key={row._id}
            id="exampleSelect"
            name={row?._id}
            type="select"
            onChange={(e) => changeProgression(e)}
            disabled
            value={JSON.stringify({
              id: row?.contactId,
              email: row?.email,
              categoryId: row?.categoryId,
              progressionId: row?.progressionId,
              progressionName: row?.progressionName,
              rowCategoryId: row?.categoryId,
              nextRankName: row?.nextRankName
            })}
          >
            <option value="" className="" style={{ marginBottom: '15px', marginTop: '15px' }}>
              Select Progression
            </option>
            {categoriesArray?.map((progressionItem, i) => {
              return (
                <option
                  value={JSON.stringify({
                    id: row?.contactId,
                    email: row?.email,
                    categoryId: progressionItem.categoryId,
                    progressionId: progressionItem.progressionId,
                    progressionName: row?.progressionName,
                    rowCategoryId: row?.categoryId,
                    nextRankName: row?.nextRankName
                  })}
                  style={{ padding: '5px' }}
                  key={i}
                >
                  {progressionItem?.name + ' - ' + progressionItem?.list?.categoryName}
                </option>
              );
            })}
          </Input>
        );
      }
    },
    {
      name: 'Rank',
      sortable: true,
      selector: (row) => row?.currentRankName,
      minWidth: '230px',
      cell: (row) => (
        <div
          className="d-flex justify-content-start align-items-start"
          style={{ marginLeft: '-15px' }}
        >
          {row?.currentRankImage ? (
            <Avatar className="me-1" img={row.currentRankImage} imgWidth="42" imgHeight="42" />
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
                marginRight: '11px'
              }}
            >
              N/A
            </div>
          )}
          <div className="my-auto">
            <span
              className="fw-bolder fs-5 text-center d-block mb-25 text-nowrap"
              style={{ color: '#7d7b7a' }}
            >
              {row?.currentRankName ? row?.currentRankName : 'No Belt'}
            </span>
            <Badge
              color={
                orderColors[row?.currentRankOrder]
                  ? orderColors[row.currentRankOrder]
                  : 'light-success'
              }
              pill
            >
              {row?.currentRankOrder ? row.currentRankOrder : 0}
            </Badge>
          </div>
        </div>
      )
    },
    {
      name: 'Next-Rank',
      sortable: true,
      selector: (row) => row?.name,
      minWidth: '230px',
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
                marginRight: '11px'
              }}
            >
              N/A
            </div>
          )}
          <div className="my-auto">
            <span
              className="fw-bolder fs-5 text-center d-block mb-25 text-nowrap"
              style={{ color: '#7d7b7a' }}
            >
              {row?.nextRankName ? row.nextRankName : 'No Belt'}
            </span>
            <Badge
              color={
                orderColors[row?.nextRankOrder] ? orderColors[row?.nextRankOrder] : 'light-success'
              }
              pill
            >
              {row?.nextRankOrder ? row?.nextRankOrder : 0}
            </Badge>
          </div>
        </div>
      )
    },
    {
      name: 'Last Promoted',
      sortable: true,
      selector: (row) => {
        return (
          <div>
            {' '}
            {contactRankList.filter((x) => x?._id == row?._id).length > 0 ? (
              moment(row.updatedAt).format('MMMM  DD  YYYY')
            ) : (
              <Badge color="light-warning">Never</Badge>
            )}
          </div>
        );
      }
    },
    {
      name: 'Note',
      sortable: true,
      sortField: 'note',
      cell: (row) => (
        <>
          <Eye
            size={20}
            className="cursor-pointer"
            id="detail"
            onClick={(e) => handleEyeClick(row)}
          />
          <UncontrolledTooltip placement="left" target="detail">
            Guest Detail
          </UncontrolledTooltip>
        </>
      )
    },
    {
      name: 'Status',
      width: '150px',
      // allowOverflow: true,
      cell: (row) => {
        return (
          <Badge color={row?.ispromoted ? 'light-success' : 'light-info'}>
            {row?.ispromoted ? 'Promoted' : 'Not Promoted'}
          </Badge>
        );
      }
    }
  ];
  let categoriesArray = [];
  for (let i = 0; i < progressionList.length; i++) {
    for (let j = 0; j < progressionList[i]?.categoryId.length; j++) {
      categoriesArray.push({
        name: progressionList[i]?.progressionName,
        progressionId: progressionList[i]?._id,
        list: progressionList[i]?.categoryId[j],
        categoryId: progressionList[i]?.categoryId[j]?._id
      });
    }
  }
  // ** Handlers

  const handlePagination = (page) => {
    setCurrentPage(page.selected);
  };
  const toggle = () => {
    setNoteModal(!noteModal);
  };

  const CustomPagination = () => {
    const count = Math.ceil(contactRankList?.length / rowsPerPage);
    return (
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
    );
  };
  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
  };
  const handleEyeClick = (row) => {
    if (row) {
      setRow(row);
      toggle();
    } else return;
  };

  return (
    <Fragment>
      <div className="d-flex justify-content-end mb-1">
        <Select
          isClearable={false}
          options={filterOptions}
          className="react-select"
          classNamePrefix="select"
          theme={selectThemeColors}
          value={filterOption}
          onChange={(data) => setFilterOption(data)}
        />
      </div>
      <div className="" style={{ marginTop: '-4px' }}>
        <DataTable
          noHeader
          pagination
          columns={columns}
          className="data_tables_wrapper_audio"
          sortIcon={<ChevronDown size={10} />}
          paginationDefaultPage={currentPage + 1}
          paginationComponent={CustomPagination}
          handlePerPage={handlePerPage}
          data={filteredArray}
        />
      </div>
      {row !== null && (
        <NoteModal
          toggle={toggle}
          isOpen={noteModal}
          row={row}
          notes={noteData || []}
          dispatch={dispatch}
        />
      )}

      <div className="d-flex justify-content-between">
        <Button
          color="primary"
          className="btn-prev"
          onClick={() => {
            stepper.previous();
          }}
        >
          <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
          <span className="align-middle d-sm-inline-block d-none">Previous</span>
        </Button>
        <Button color="primary" className="btn-next" onClick={() => handleNext()}>
          <span className="align-middle d-sm-inline-block d-none">Close</span>
          <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
        </Button>
      </div>
    </Fragment>
  );
};

export default FinalStatus;
