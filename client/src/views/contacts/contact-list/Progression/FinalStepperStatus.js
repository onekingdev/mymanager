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
import imgDiam from '@src/assets/images/icons/brands/sketch-label.png';
import { promotedListAction, demoteClientAction } from './../../store/actions';
// ./../../store/actions

// import { log } from 'console';
import { customInterIceptors } from '@src/lib/AxiosProvider';
import { getEventInfo } from '../../../calendar/event/store';
import NoteModal from '../../Note';

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

const FinalStepperStatus = (props) => {
  const { stepper, selectedRows, selectedEventId, contactTypeTitle, setLoading } = props;
  const [currentPage, setCurrentPage] = useState(0);
  const [row, setRow] = useState({});
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [noteModal, setNoteModal] = useState(false);
  const [filterOption, setFilterOption] = useState(filterOptions[0]);
  // ** Redux Store
  const contactRankList = useSelector((state) => state?.totalContacts?.contactRankList);
  const progressionList = useSelector((state) => state.progression?.progressionList);
  const noteData = useSelector((state) => state?.totalContacts?.notes?.data);
  const [filteredArray, setFilteredArray] = useState([]);
  // ** Effect

  let promotedDataMain = promotedData?.length > 0 ? promotedData : null;

  const selectedEventInfo = useSelector((state) =>
    state?.event?.events.find((x) => x._id == selectedEventId)
  );

  const customStyles = {
    title: {
      style: {
        fontWeight: '900',
        maxHeight: '130px',
        fontSize: '40px'
      }
    },
    rows: {
      style: {
        minHeight: '72px' // override the row height
      }
    },
    headCells: {
      style: {
        paddingLeft: '8px', // override the cell padding for head cells
        paddingRight: '8px',
        width: '100%'
        // backgroundColor : '#f3f2f7',
      }
    }
  };
  const columns = [
    {
      name: 'Name',
      sortable: true,
      selector: (row) => row?.clientName,
      // style : {borderStartEndRadius  : '19px'},
      cell: (row) => {
        return <div className="fw-bolder">{row.clientName}</div>;
      }
    },
    {
      name: <p className="h4  fw-bolder">Rank</p>,
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
                marginRight: '11px'
              }}
            >
              N/A
            </div>
          )}
          <div className="d-flex flex-column  my-auto " style={{}}>
            <span className="fw-bold text-center" style={{ color: '#7d7b7a' }}>
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
      name: <p className="h4  fw-bolder">Next Rank</p>,
      selector: (row) => row?.nextRankOrder,
      width: '220px',
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
      name: <p className="h4  fw-bolder"> Last Promoted</p>,
      width: '199px',
      // sortable: true,

      selector: (row) => {
        return <div className=""> {moment(row.updatedAt).format('MM/DD/YYYY')}</div>;
      }
    },
    {
      name: <p className="h4  fw-bolder"> Status</p>,
      // sortable: true,
      selector: (row) => {
        return (
          <div style={{ marginLeft: '-2px' }}>
            <Badge className="text-capitalize  fs-5" color="light-success" pill>
              {row?.ispromoted == true ? 'Promoted' : 'Not Promoted'}
            </Badge>
          </div>
        );
      }
    },
    {
      name: <p className="h4  fw-bolder"> Actions</p>,
      allowOverflow: true,
      cell: (row) => {
        return (
          <div>
            {/* <Eye size={16} /> */}
            <Edit2 size={16} />
            <Trash2
              size={16}
              className="ms-1"
              onClick={() => {
                handleDeletePromoted(row?._id);
              }}
              style={{ cursor: 'pointer' }}
            />
          </div>
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
  const handleDeletePromoted = (id) => {
    const payload = { clientRankId: id };
    dispatch(demoteClientAction(payload));
  };

  const handlePagination = (page) => {
    setCurrentPage(page.selected);
  };
  useEffect(() => {
    dispatch(promotedListAction());
  }, []);

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

  const handleNext = async () => {
    const addGuestsData = selectedRows.map((row) => {
      return {
        id: row._id,
        name: row.fullName,
        email: row.email,
        phone: row.phone,
        category: contactTypeTitle
      };
    });
    console.log(addGuestsData);
    const response = await API.post(`event/add-guests`, {
      data: addGuestsData,
      _id: selectedEventId,
      sendEmailChecked: true
    }).catch(function (error) {
      if (error.response) {
        return error.response;
      }
    });

    if (response.status == 404) {
      toast.error(response.data.msg);
    }
    console.log('selectedEventId', selectedEventId);
    // if (response.status == 200) {
    toast.success('OK! Guests added successfully');
    dispatch(getEventInfo(selectedEventId));
    history.push(`/event-details/${selectedEventId}`);
    // }
    stepper.next();
  };

  return (
    <Fragment>
      <h5 className="mb-1">
        The Contacts below have been successfully added to the Event:{' '}
        <b>{selectedEventInfo?.title}</b>
      </h5>
      <div className="" style={{ marginTop: '-4px' }}>
        <DataTable
          noHeader
          pagination
          columns={columns}
          // paginationPerPage={7}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
          paginationDefaultPage={currentPage + 1}
          paginationComponent={CustomPagination}
          handlePerPage={handlePerPage}
          data={promotedDataMain ? promotedDataMain : []}
          customStyles={customStyles}
          // onSelectedRowsChange={handleRowSelected}
          // selectableRows
          // selectableRowsComponent={BootstrapCheckbox}
          // selectableRows
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

export default FinalStepperStatus;
