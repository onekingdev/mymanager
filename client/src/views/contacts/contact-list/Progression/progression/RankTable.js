import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import ReactPaginate from 'react-paginate';
import { Check, Send, Printer, Trash, Eye, TrendingUp, ArrowLeft, ArrowRight } from 'react-feather';

import { BsSend } from 'react-icons/bs';
import { Form, Button, Input, Badge, UncontrolledTooltip } from 'reactstrap';
import useMessage from '../../../../../lib/useMessage';
import Avatar from '@components/avatar';
import {
  progressionCategoriesRankFetchAction,
  progressionFetchAction
} from '../../../../settings/tabs/progressiontab/store/actions';
import { progressionListAction, promotedListAction } from '../../../store/actions';
import * as api from '../../../../contacts/store/api';
import { contactRankListAction } from '../../../store/actions';

import NoteModal from '../../../Note';
import NoRankModal from '../../../../calendar/event/NoRankModal';
import ConfirmPromoteModal from '../../../../calendar/event/ConfirmPromoteModal';

import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';
import moment from 'moment';
const RankTable = (props) => {
  const { stepper, userIdSelected, selectedRows, inviteeList, setInviteeList } = props;

  const dispatch = useDispatch();

  // ** Constants
  const { error, success } = useMessage();
  const orderColors = [
    'light-success',
    'light-danger',
    'light-warning',
    'light-info',
    'light-primary',
    'light-secondary'
  ];

  // ** States
  const [pendingSign, setPendingSign] = useState(false);
  const [toggledClearRows, setToggleClearRows] = useState(false);
  const [isBulk, setIsBulk] = useState(false);
  const [promoteBulk, setPromoteBulk] = useState({});
  const [isButtonShow, setIsButtonShow] = useState(false);

  // ** Note
  const [row, setRow] = useState({});
  const [noteModal, setNoteModal] = useState(false);
  const [noRankModal, setNoRankModal] = useState(false);
  const [confirmPromoteModal, setConfirmPromoteModal] = useState(false);
  const [checkClickedProgression, setCheckClickedProgression] = useState(true);

  const [editableRows, setEditableRows] = useState([]);
  const [promoteSingle, setPromoteSingle] = useState({});
  const [search, setSearch] = useState('');

  const [selectedCategoryInfo, setSelectedCategoryInfo] = useState({});

  // ** Redux Store
  const progressionList = useSelector((state) => state.progression?.progressionList);

  const progressionCategoriesRank = useSelector(
    (state) => state?.progression?.progressionCategoriesRank
  );
  const contactRankList = useSelector((state) => state?.totalContacts?.contactRankList);
  const noteData = useSelector((state) => state?.totalContacts?.notes?.data);
  // ** Effects
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

  // ** Effects
  useEffect(() => {
    dispatch(progressionFetchAction());
    dispatch(progressionListAction());
  }, []);

  useEffect(() => {
    let tmp = [];
    selectedRows?.length > 0 &&
      selectedRows.map((selected) => {
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
    setInviteeList(tmp);
  }, [selectedRows, contactRankList]);

  useEffect(() => {
    let tmp = [];
    if (selectedCategoryInfo?.categoryId) {
      inviteeList?.length > 0 &&
        inviteeList.map((selected) => {
          let filteredContactList = contactRankList.filter((promoted) => {
            if (selectedCategoryInfo.id == selected?.contactId) {
              return (
                promoted.contactId == selected?.contactId &&
                promoted.categoryId == selectedCategoryInfo.categoryId
              );
            } else
              return (
                promoted.contactId == selected?.contactId &&
                promoted.categoryId == selected?.categoryId
              );
          });
          filteredContactList.length > 0
            ? tmp.push({
                ...filteredContactList[0],
                fullName: selected.fullName,
                email: selected.email
              })
            : tmp.push(selected);
        });
      setInviteeList(tmp);
    }
  }, [contactRankList, selectedCategoryInfo]);

  const handleEyeClick = (row) => {
    if (row) {
      setRow(row);
      toggle();
    } else return;
  };

  const changeProgression = async (e) => {
    let jsonProgressionValue = JSON.parse(e.target.value);
    let clientProgressions = [];
    setSelectedCategoryInfo(jsonProgressionValue);

    clientProgressions.push({
      categoryId: jsonProgressionValue?.categoryId,
      progressionId: jsonProgressionValue?.progressionId,
      contactId: jsonProgressionValue?.id
    });

    let payload = {
      clientProgressions: clientProgressions
    };
    api
      .getClientRankApi(payload)
      .then((value) => {
        if (
          value?.data?.updatedClientRanks?.length > 0 &&
          value.data.updatedClientRanks[0].nextRankName != ''
        ) {
          dispatch(contactRankListAction());
        } else {
          dispatch(contactRankListAction());
          toggleNoRankModal();
          error('Sorry! There is no available rank in this category');
        }
        setToggleClearRows(!toggledClearRows);
      })
      .catch((err) => {
        dispatch(contactRankListAction());
        setToggleClearRows(!toggledClearRows);
        error('Something went wrong');
      });
  };

  const handleRowSelected = ({ selectedRows }) => {
    if (selectedRows.length > 0) {
      setCheckClickedProgression(false);
      setIsButtonShow(true);
      setEditableRows(selectedRows);
    }
    let clientProgressions = [];
    selectedRows.map((selected, index) => {
      if (selected.nextRankName != '') {
        {
          clientProgressions.push({
            categoryId: selected?.categoryId,
            progressionId: selected?.progressionId,
            contactId: selected?.contactId
          });
        }
      }
    });

    let payload = {
      clientProgressions: clientProgressions
    };
    setPromoteBulk(payload);
  };

  const promoteClientBulk = () => {
    setIsBulk(true);
    setRow({});
    togglePromoteModal();
  };
  const promotClientSingle = (row) => {
    if (row?.categoryId) {
      let clientProgressions = {
        clientProgressions: [
          {
            categoryId: row?.categoryId,
            progressionId: row?.progressionId,
            contactId: row?.contactId
          }
        ]
      };
      setPromoteSingle(clientProgressions);
      setRow(row);
      setIsBulk(false);
      togglePromoteModal();
    } else {
      toast.error('Please select progression/category before promote');
    }
  };
  const togglePromoteModal = () => {
    setConfirmPromoteModal(!confirmPromoteModal);
  };
  const toggle = () => {
    setNoteModal(!noteModal);
  };

  const toggleNoRankModal = () => {
    setNoRankModal(!noRankModal);
  };

  const handleGotoClick = () => {
    history.push('/setting/4');
  };

  const handleNextClick = () => {
    let clientProgressions = [];
    inviteeList.map((selected, index) => {
      if (selected.nextRankName != '' && selected?.categoryId) {
        {
          clientProgressions.push({
            categoryId: selected?.categoryId,
            progressionId: selected?.progressionId,
            contactId: selected?.contactId
          });
        }
      }
    });
    if (clientProgressions.length === 0) {
      stepper.next();
    } else {
      let payload = {
        clientProgressions: clientProgressions
      };
      setIsBulk(true);
      setPromoteBulk(payload);
      togglePromoteModal();
    }
  };

  const tableColumns = [
    {
      name: 'Full Name',
      sortable: true,
      minWidth: '217px',
      sortField: 'fullName',
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          <div className="d-flex flex-column">
            <Link className="user_name text-truncate text-body">
              <span className="fw-bolder">
                {row?.clientName ? row.clientName : row?.fullName ? row.fullName : ''}
              </span>
            </Link>
            <small className="text-truncate text-muted mb-0">{row?.email}</small>
          </div>
        </div>
      )
    },
    {
      name: 'Progression',
      width: '250px',
      selector: (row) => row?.contactId,
      cell: (row) => {
        return categoriesArray?.length > 0 ? (
          <Input
            key={row._id}
            id="exampleSelect"
            name={row?._id}
            type="select"
            onChange={(e) => changeProgression(e)}
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
        ) : (
          <div>
            <Button
              size="sm"
              color="primary"
              onClick={() => {
                handleGotoClick();
              }}
            >
              Create category
            </Button>
          </div>
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
              {row?.currentRankName ? row?.currentRankName : 'None'}
            </span>
            <Badge color={orderColors[row?.currentRankOrder]} pill>
              {row?.currentRankOrder}
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
              {row?.nextRankName ? row?.nextRankName : 'None'}
            </span>
            <Badge color={orderColors[row?.nextRankOrder]} pill>
              {row?.nextRankOrder}
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
      cell: (row) => {
        return (
          <div className="">
            <Button
              color="primary"
              className=""
              onClick={(e) => promotClientSingle(row)}
              size="sm"
              disabled={!row.nextRankName}
            >
              <span className="">{'promote'}</span>
            </Button>
          </div>
        );
      }
    }
  ];
  const filteredGuestArray = inviteeList.filter((item) => {
    if (search) {
      return item.clientName
        ? item.clientName.toLowerCase().includes(search.toLowerCase())
        : item.fullName.toLowerCase().includes(search.toLowerCase());
    } else return true;
  });

  return (
    <Fragment>
      <div className="d-flex justify-content-between mb-1">
        <div className="d-flex align-items-center">
          <Input
            id="search-invoice"
            placeholder="Search Attendees"
            type="text"
            className="w-100 me-50"
            style={{ maxWidth: '200px' }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Button
            size={'sm'}
            className="ms-1 d-flex align-items-center"
            color="primary"
            style={{ borderRadius: '20px' }}
            onClick={() => {
              promoteClientBulk();
            }}
          >
            <TrendingUp className="me-1" size={16} />
            <span>Submit</span>
          </Button>
        </div>
        <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
          <Button
            size={'sm'}
            className="ms-1"
            color="primary"
            style={{ borderRadius: '20px' }}
            disabled={editableRows.length == 0}
            onClick={() => {
              promoteClientBulk();
            }}
          >
            <TrendingUp className="me-1" size={16} />
            Promote
          </Button>

          <Button.Ripple
            className="ms-1"
            color="success"
            size={'sm'}
            style={{ borderRadius: '20px' }}
            disabled={editableRows.length == 0}
          >
            <Printer className="me-1" size={16} />
            Print
          </Button.Ripple>
        </div>
      </div>

      <div className="react-dataTable">
        <DataTable
          noHeader
          pagination
          responsive
          selectableRows
          onSelectedRowsChange={handleRowSelected}
          paginationServer
          columns={tableColumns}
          data={filteredGuestArray}
          clearSelectedRows={toggledClearRows}
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
      <NoRankModal noRankModal={noRankModal} toggle={toggleNoRankModal} />
      <ConfirmPromoteModal
        confirmPromoteModal={confirmPromoteModal}
        toggle={togglePromoteModal}
        promoteBulk={promoteBulk}
        promoteSingle={promoteSingle}
        toggledClearRows={toggledClearRows}
        setToggleClearRows={setToggleClearRows}
        isBulk={isBulk}
        setPendingSign={setPendingSign}
        stepper={stepper}
      />
      <div className="d-flex justify-content-between">
        <Button color="primary" className="btn-prev" onClick={() => stepper.previous()}>
          <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
          <span className="align-middle d-sm-inline-block d-none">Previous</span>
        </Button>
        <Button
          color="primary"
          // disabled={!enablePromote}
          className="btn-next"
          onClick={() => handleNextClick()}
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
