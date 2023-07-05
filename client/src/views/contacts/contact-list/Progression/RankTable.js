import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import ReactPaginate from 'react-paginate';
import { ArrowLeft, ArrowRight, ChevronDown, Eye, TrendingUp, Printer } from 'react-feather';
import { Form, Button, Input, Badge, UncontrolledTooltip } from 'reactstrap';

import Avatar from '@components/avatar';
import {
  progressionCategoriesRankFetchAction,
  progressionFetchAction
} from '../../../settings/tabs/progressiontab/store/actions';
import { progressionListAction, promotedListAction } from './../../store/actions';

import NoteModal from '../../Note';
import ConfirmPromoteModal from '../../../calendar/event/ConfirmPromoteModal';
import DeleteConfirmModal from '../../../calendar/event/DeleteConfirmModal';

import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';
import { toast } from 'react-toastify';
import * as api from './../../store/api';
import moment from 'moment';
const RankTable = (props) => {
  const { stepper, userIdSelected, selectedRows } = props;

  const dispatch = useDispatch();

  const orderColors = [
    'light-success',
    'light-danger',
    'light-warning',
    'light-info',
    'light-primary',
    'light-secondary'
  ];

  // ** States
  const [clientProgressionData, setClientProgressionData] = useState([]);
  const [pendingSign, setPendingSign] = useState(false);
  const [toggledClearRows, setToggleClearRows] = useState(false);
  const [isBulk, setIsBulk] = useState(false);
  const [singleClientId, setSingleClientId] = useState('');
  const [promoteBulk, setPromoteBulk] = useState({});
  const [tableData, setTableData] = useState([]);

  // ** Note
  const [row, setRow] = useState({});
  const [noteModal, setNoteModal] = useState(false);
  const [confirmPromoteModal, setConfirmPromoteModal] = useState(false);

  const [editableRows, setEditableRows] = useState([]);
  const [promoteSingle, setPromoteSingle] = useState({});
  const [checkClickedProgression, setCheckClickedProgression] = useState(true);

  // ** Redux Store
  const progressionList = useSelector((state) => state.progression?.progressionList);

  const progressionCategoriesRank = useSelector(
    (state) => state?.progression?.progressionCategoriesRank
  );
  const contactRankList = useSelector((state) => state?.totalContacts?.contactRankList);
  const noteData = useSelector((state) => state?.totalContacts?.notes?.data);
  const [progressionValue, setProgressionValue] = useState({});

  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState('');

  // ** Effects
  useEffect(() => {
    let tmp = [];
    contactRankList?.length > 0 &&
      contactRankList.map((item, index) => {
        if (userIdSelected?.includes(item.clientId)) {
          const contact = selectedRows.find((row) => row._id == item.clientId);
          tmp.push({ ...item, email: contact.email });
        } else return;
      });
    setTableData(tmp);
  }, [contactRankList, userIdSelected]);

  useEffect(() => {
    let tmp = [];
    if (promoteSingle?.clientProgressions) {
      if (progressionCategoriesRank.length > 0) {
        let firstRank = {};
        contactRankList.map((item, index) => {
          if (
            promoteSingle.clientProgressions?.length > 0 &&
            item.clientId == promoteSingle.clientProgressions[0].clientId
          ) {
            firstRank = item;
          }
        });
        tableData.map((item, index) => {
          if (
            promoteSingle.clientProgressions?.length > 0 &&
            item.clientId == promoteSingle.clientProgressions[0].clientId
          ) {
            if (firstRank.categoryId == promoteSingle.clientProgressions[0].categoryId) {
              item.currentRankImage = firstRank.currentRankImage;
              item.currentRankName = firstRank.currentRankName;
              item.currentRankOrder = firstRank.currentRankOrder;
              item.nextRankImage = firstRank.nextRankImage;
              item.nextRankName = firstRank.nextRankName;
              item.nextRankOrder = firstRank.nextRankOrder;
              item.categoryId = firstRank?.categoryId;
            } else {
              item.currentRankName = '';
              item.currentRankOrder = 0;
              item.nextRankName = progressionCategoriesRank[0]
                ? progressionCategoriesRank[0].rankName
                : '';
              item.nextRankOrder = progressionCategoriesRank[0]
                ? progressionCategoriesRank[0].rankOrder
                : 0;
              item = { ...item, categoryId: progressionCategoriesRank[0].categoryId };
            }
          }
          item = { ...item, hasRink: true };
          tmp.push(item);
        });
      } else {
        if (promoteSingle?.clientProgressions?.length) {
          tableData.map((item, index) => {
            if (item.clientId == promoteSingle.clientProgressions[0].clientId) {
              item = {
                ...item,
                currentRankName: '',
                currentRankOrder: 0,
                nextRankName: '',
                nextRankOrder: 0,
                hasRink: false
              };
            }
            tmp.push(item);
          });
        }
      }
      setTableData(tmp);
    }
  }, [progressionCategoriesRank, promoteSingle]);

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
  const [enablePromote, setEnablePromote] = useState(false);
  const handleRowSelected = ({ selectedRows }) => {
    console.log(selectedRows);
    if (selectedRows.length > 0) {
      setCheckClickedProgression(false);
      setEditableRows(selectedRows);
    }
    if (selectedRows.length > 1) {
      const clientIdsMain = [];
      selectedRows.map((item, i) => {
        // console.log('item',item?.clientId);
        clientIdsMain.push({
          clientId: item?.clientId,
          categoryId: item?.categoryId,
          progressionId: item?.progressionId
        });

        // setClientProgressionsMainId({

        // })

        //  { clientId: item?.clientId }
      });

      setClientProgressionsMainId({
        clientProgressions: clientIdsMain
      });
    } else {
      if (clientId.length > 0) {
        if (selectedRows.length === 0) {
          setClientProgressionsMainId({ clientProgressions: [] });
          setClientId([]);
        } else if (clientId.includes(selectedRows[0]?.clientId)) {
          setClientProgressionsMainId({
            clientProgressions: [
              ...clientProgressionsMainId.clientProgressions.filter((el) => {
                return el.clientId !== selectedRows[0]?.clientId;
              })
            ]
          });
          setClientId(clientId.filter((el) => el !== selectedRows[0]?.clientId));
        } else {
          setClientProgressionsMainId({
            clientProgressions: [
              ...clientProgressionsMainId.clientProgressions,
              {
                clientId: selectedRows[0]?.clientId,
                progressionId: firstClickProgressionData?.progressionId,
                categoryId: firstClickProgressionData?.categoryId
              }
            ]
          });
          setClientId([...clientId, selectedRows[0].clientId]);
        }
      } else {
        if (firstClickProgressionData?.id == selectedRows[0]?.clientId) {
          setClientProgressionsMainId({
            clientProgressions: [
              ...clientProgressionsMainId.clientProgressions,
              {
                clientId: selectedRows[0]?.clientId,
                progressionId: firstClickProgressionData?.progressionId,
                categoryId: firstClickProgressionData?.categoryId
              }
            ]
          });
        } else {
          setClientProgressionsMainId({
            clientProgressions: [
              ...clientProgressionsMainId.clientProgressions,
              {
                clientId: selectedRows[0]?.clientId,
                progressionId: selectedRows[0]?.progressionId,
                categoryId: selectedRows[0]?.categoryId
              }
            ]
          });
        }
      }
    }

    let payload = {
      clientProgressions: clientProgressions
    };
    setPromoteBulk(payload);
  };
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
        width: '100%',
        backgroundColor: '#e5e1f2',
        fontSize: '18px'
        // , padding : '10px'
        // borderRadiusTop : '13px'
        // borderStartEndRadius  : '19px'
      }
    },
    cells: {
      style: {}
    }
  };
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
              <span className="fw-bolder">{row?.clientName ? row.clientName : row?.name}</span>
            </Link>
            <small className="text-truncate text-muted mb-0">{row?.email}</small>
          </div>
        </div>
      )
    },
    {
      name: 'Progression',
      width: '257px',
      selector: (row) => row?.clientId,
      cell: (row) => {
        // console.log('row>>',row.clientId);
        if (
          clientProgressionsMainId?.clientProgressions.length == progressionListSecond?.length &&
          row?.progressionId
        ) {
          const index = clientProgressionsMainId?.clientProgressions.indexOf(
            (clientProgressionsMainId?.clientProgressions.filter(
              (item) => item.clientId === row.clientId
            ))[0]
          );
        }
        return (
          <Input
            key={row._id}
            id="exampleSelect"
            name={row?._id}
            type="select"
            onChange={changeProgression}
            style={{ marginLeft: '-15px' }}
            defaultValue={null}
            className=""
            value={
              Object.keys(progressionValue).includes(row._id)
                ? progressionValue[row._id]
                : JSON.stringify({
                    categoryId: row?.categoryId,
                    progressionId: row?.progressionId,
                    id: row?.clientId,
                    progressionName: row?.progressionName
                  })
            }
          >
            <option value="" className="" style={{ marginBottom: '15px', marginTop: '15px' }}>
              Select Progression
            </option>
            {categoriesArray?.map((progressionItem, i) => {
              return (
                <option
                  value={JSON.stringify({
                    categoryId: progressionItem.categoryId,
                    progressionId: progressionItem.progressionId,
                    id: row?.clientId,
                    progressionName: row?.progressionName
                  })}
                  key={i}
                  className=""
                  style={{ marginBottom: '15px' }}
                >
                  {progressionItem?.list?.categoryName} | {progressionItem?.name}
                </option>
              );
            })}
          </Input>
        );
      }
    },
    {
      name: 'Rank',
      width: '207px',
      selector: (row) => row?.currentRankImage,
      cell: (row) => {
        return (
          <div
            className="d-flex justify-content-start align-items-center"
            style={{ marginLeft: '-13px', marginTop: '16px', marginBottom: '16px' }}
          >
            {row?.clientId == currentRankPr?.clientId ? (
              currentRankPr?.currentRankImagePrCh ? (
                <Avatar
                  className="me-1"
                  img={currentRankPr?.currentRankImagePrCh}
                  imgWidth="42"
                  imgHeight="42"
                />
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
              )
            ) : row?.currentRankImage ? (
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
              <span className="fw-bold text-center">
                {row?.clientId == currentRankPr?.clientId
                  ? currentRankPr?.currentRankPrCh
                  : row?.currentRankName
                  ? row?.currentRankName
                  : 'None'}
              </span>
              <span className=" text-muted fs-5   text-center" style={{ marginTop: '3px' }}>
                {row?.clientId == currentRankPr?.clientId
                  ? currentRankPr?.currentRankOrderPrCh
                  : row?.currentRankOrder}
              </span>
            </div>
          </div>
        );
      }
    },
    {
      name: 'Next Rank',
      selector: (row) => row?.nextRankOrder,
      width: '207px',
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
          <div className="d-flex flex-column  my-auto " style={{}}>
            <span className="fw-bold  text-center">
              {row?.clientId == currentRankPr?.clientId
                ? currentRankPr?.nextRankPrCh
                : row?.nextRankName
                ? row?.nextRankName
                : 'None'}
            </span>
            <span className=" text-muted fs-5   text-center" style={{ marginTop: '3px' }}>
              {row?.clientId == currentRankPr?.clientId
                ? currentRankPr?.nextRankOrderPrCh
                : row?.nextRankOrder}
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
      name: 'Actions',
      width: '150px',
      // allowOverflow: true,
      cell: (row) => {
        return (
          <div className="">
            <Button
              color="primary"
              className=""
              onClick={(e) => promotClientSingle(row)}
              size="sm"
              disabled={row.nextRankName == ''}
            >
              <span className="">{'promote'}</span>
            </Button>
          </div>
        );
      }
    }
  ];

  const handlePagination = (page) => {
    setCurrentPage(page.selected);
  };
  const promotClient = () => {
    console.log('clientProgressionsMainId>>', clientProgressionsMainId);
    setPendingSign(true);
    api
      .promoteClientProgressionApi(clientProgressionsMainId)
      .then((value) => {
        if (value?.data?.updatedClientRanks?.length > 0) {
          const clientIdsInMainId = new Set(
            clientProgressionsMainId.clientProgressions.map((cp) => cp.clientId)
          );
          let clientIds = progressionRemove.clientIds.filter((cid) => !clientIdsInMainId.has(cid));
          setProgressionRemove({ clientIds });
          dispatch(removeIdReducer({ clientIds }));
          setPendingSign(false);
          try {
            dispatch(promotedListAction());
          } catch (err) {}
          toast.success('Client is   promoted');
          stepper.next();
        } else {
          setPendingSign(false);
          dispatch(promotedListAction());
          toast.error('Sorry! There is no rank in this  category');
        }
      })
      .catch((err) => {
        setPendingSign(false);
        dispatch(promotedListAction());
        toast.error(err.response.data.error);
      });
  };
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=""
      nextLabel=""
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      pageCount={Math.ceil(clientProgressionData.length / 7) || 1}
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

  // ** Effects
  useEffect(() => {
    dispatch(progressionFetchAction());
    dispatch(progressionListAction());
  }, []);
  // ** Handlers
  const changeProgression = (e) => {
    console.log('JSON.parse(e.target.value)', JSON.parse(e.target.value));
    if (checkClickedProgression) {
      let jsonProgressionValue = JSON.parse(e.target.value);
      let clientProgressions = {
        clientProgressions: [
          {
            categoryId: jsonProgressionValue?.categoryId,
            progressionId: jsonProgressionValue?.progressionId,
            clientId: jsonProgressionValue?.id
          }
        ]
      };
      setPromoteSingle(clientProgressions);
    }
    dispatch(progressionCategoriesRankFetchAction(JSON.parse(e.target.value)?.categoryId));
    setProgressionValue({ ...progressionValue, [e.target.name]: e.target.value });
  };

  const promoteClientBulk = () => {
    setIsBulk(true);
    setRow({});
    togglePromoteModal();
  };
  const promotClientSingle = (row) => {
    if (row) {
      setRow(row);
      setSingleClientId(row?.clientId);
      setIsBulk(false);
      togglePromoteModal();
    } else return;
  };
  const togglePromoteModal = () => {
    setConfirmPromoteModal(!confirmPromoteModal);
  };
  const toggle = () => {
    setNoteModal(!noteModal);
  };
  const filteredAttendArray = tableData.filter((item) =>
    item.clientName
      ? item.clientName.toLowerCase().includes(search.toLowerCase())
      : item.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <Fragment>
      <div className="react-dataTable" style={{ height: '80vh', maxHeight: '100%' }}>
        <DataTable
          noHeader
          pagination
          columns={columns}
          // paginationPerPage={7}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
          paginationDefaultPage={currentPage + 1}
          paginationComponent={CustomPagination}
          data={filteredAttendArray}
          onSelectedRowsChange={handleRowSelected}
          selectableRows
          // selectableRowsComponent={BootstrapCheckbox}
          // selectableRows
        />
      </div>

      <ConfirmPromoteModal
        confirmPromoteModal={confirmPromoteModal}
        toggle={togglePromoteModal}
        setPendingSign={setPendingSign}
        singleClientId={singleClientId}
        promoteBulk={promoteBulk}
        promoteSingle={promoteSingle}
        toggledClearRows={toggledClearRows}
        setToggleClearRows={setToggleClearRows}
        tableData={tableData}
        isBulk={isBulk}
      />
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
        <Button color="primary" className="btn-prev" onClick={() => stepper.previous()}>
          <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
          <span className="align-middle d-sm-inline-block d-none">Previous</span>
        </Button>
        <Button
          color="primary"
          // disabled={!enablePromote}
          className="btn-next"
          onClick={() => stepper.next()}
        >
          <span className="align-middle d-sm-inline-block d-none">
            {pendingSign ? 'Promoting...' : 'Next'}
          </span>
          <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
        </Button>
      </div>
    </Fragment>
  );
};

export default RankTable;
