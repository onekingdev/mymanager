// ** React Imports
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// ** Custom Components
import Avatar from '@components/avatar';

// ** Third Party Component
import { Eye } from 'react-feather';
import Chart from 'react-apexcharts';
import Confetti from 'react-confetti';

// ** Store & Actions
import { store } from '@store/store';
import { getUser, deleteUser } from '../store';
import {
  contactsAction,
  selectContactAction,
  updateFieldValueContactAction
} from '../store/actions';
import { updateContactsRQ } from '@src/requests/contacts/contacts';

// ** Icons Imports
import { MoreVertical, FileText, Trash2, Archive, Edit } from 'react-feather';
import { selectThemeColors } from '@utils';

import Select, { components, StylesConfig } from 'react-select';
import styled from 'styled-components';

// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Tooltip,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Button,
  Table,
  UncontrolledTooltip
} from 'reactstrap';

// import Note from '../Note';

import ViewTask from '../contact-view/tabs/viewTask/ViewTask';

import { cvtColor } from './constants';

import '@src/assets/styles/contact/lead-table.scss';
import { success } from '../../ui-elements/response-popup';

const ReactSelect = styled(Select)`
  .Select-control {
    height: 26px;
    font-size: small;
    .Select-placeholder {
      line-height: 26px;
      font-size: small;
    }

    .Select-value {
      line-height: 26px;
    }

    .Select-input {
      height: 26px;
      font-size: small;
    }
  }
`;

export const useColumns = ({
  store,
  setDeleteModal,
  toggle,
  toggleSidebar,
  setRow,
  fetchNotes,
  orderContactType,
  ratingType,
  handleDeleteConfirmation
}) => {
  const dispatch = useDispatch();
  const statusObj = {
    active: 'light-success',
    inactive: 'light-dark'
  };
  // ** States
  const [showConfetti, setShowConfetti] = useState(false);
  const [statusRowID, setStatusRowID] = useState('');
  const [columns, setColumns] = useState([]);
  const [newFieldValue, setNewFieldValue] = useState(null);
  // ** Redux Store
  const activeContactTypeFields = useSelector((state) => state.totalContacts.contactField.data);
  // ** Renders Client Columns
  const renderClient = (row) => {
    let tmpValue = 0;
    Array.from(row?._id).forEach((x, index) => {
      tmpValue += x.codePointAt(0) * (index + 1);
    });
    const stateNum = tmpValue % 6,
      states = [
        'light-success',
        'light-danger',
        'light-warning',
        'light-info',
        'light-primary',
        'light-secondary'
      ],
      color = states[stateNum];

    if (row?.photo) {
      return (
        <Link
          to={`/contacts/view/${row._id}/${orderContactType}`}
          onClick={() => {
            dispatch(getUser(row.id));
            fetchNotes(row._id);
          }}
        >
          <Avatar className="me-1" img={row?.photo} width="32" height="32" />
        </Link>
      );
    } else {
      return (
        <Link
          to={`/contacts/view/${row._id}/${orderContactType}`}
          onClick={() => {
            dispatch(getUser(row.id));
            fetchNotes(row._id);
          }}
        >
          <Avatar
            color={color || 'primary'}
            className="me-1"
            content={row.fullName || 'John Doe'}
            initials
          />
        </Link>
      );
    }
  };

  const dot = (color = 'transparent') => ({
    alignItems: 'center',
    minWidth: '140px'
  });

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: `${cvtColor[statusObj[state.data?.value]]} !important;`,
      color: statusObj[state.data?.value] == 'light' ? '#333 !important;' : '#fff !important;'
    }),

    input: (styles) => ({ ...styles, ...dot() }),
    singleValue: (provided, state) => ({
      ...provided,
      color: state.selectProps.value?.value === 'done' ? '#fff !important;' : '#fff !important;'
    }),
    control: (provided, state) => ({
      ...provided,
      backgroundColor: `${cvtColor[statusObj[state.selectProps.value?.value]]} !important;`
    })
  };

  const getOptionLabel = (option) => option.label;
  const getOptionValue = (option) => option.value;

  const tagLabelOptions = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <Badge color={statusObj[data.label]}>{data.label}</Badge>
      </components.Option>
    );
  };

  store?.stages?.map((x) => {
    statusObj[x.value] = x.color;
  });

  const stageOptions = store.stages.map((x) => {
    return {
      value: x.value,
      label: x.value
    };
  });

  const options = {
    chart: {
      sparkline: {
        enabled: false
      }
    },

    widht: 800,
    colors: ['#FF0000'],
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: -120,
        endAngle: 200,
        hollow: {
          size: '40%'
        },
        dataLabels: {
          name: {
            show: false
          },
          value: {
            show: true,
            color: 'red',
            fontFamily: 'Montserrat',
            fontSize: '1em',
            fontWeight: '600',
            offsetY: 4
          }
        }
      }
    },
    stroke: {
      lineCap: 'round'
    }
  };

  function PrintAddress({ address }) {
    let fullAddress = '';

    if (!address) {
      return <></>;
    }

    const reorderedAddress = {
      city: null,
      state: null,
      country: null,
      street: null,
      zipCode: null
    };
    const newAddressData = Object.assign(reorderedAddress, address);
    const addressValues = Object.values(newAddressData);
    const displayableAddress = addressValues.slice(0, 3);

    fullAddress = displayableAddress
      .filter((x) => typeof x === 'string' && x.length > 0)
      .join(', ');

    return <>{fullAddress}</>;
  }

  const isShownField = (title) => {
    let flag = false;
    if (activeContactTypeFields) {
      activeContactTypeFields.map((field) => {
        if (field.title === title) {
          flag = field.isShown;
        }
      });
    }
  };

  // ** Default Columns for all kinds of contacts
  const defaultColumns = [
    {
      name: 'FullName',
      sortable: true,
      reorder: true,
      minWidth: '240px',
      selector: (row) => row.fullName,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          {renderClient(row)}
          <div className="d-flex flex-column">
            <Link
              to={`/contacts/view/${row._id}/${orderContactType}`}
              className="user_name text-truncate text-body"
              onClick={() => {
                dispatch(getUser(row.id));
                fetchNotes(row._id);
              }}
            >
              <span className="fw-bolder">{row.fullName}</span>
            </Link>
            <small className="text-truncate fw-bolder text-muted mb-0 cursor-pointer">
              {row.company}
            </small>
            <small className="text-truncate text-muted mb-0 cursor-pointer">{row.email}</small>
          </div>
        </div>
      )
    },
    {
      name: 'Status',
      width: '120px',
      sortable: true,
      reorder: true,
      selector: (row) => row.status,
      cell: (row) => (
        <Badge className="text-capitalize" color={statusObj[row.status]} pill>
          {row.status === true ? 'Former' : 'Active'}
        </Badge>
      )
    },
    {
      name: 'Phone',
      sortable: true,
      reorder: true,
      width: '130px',
      selector: (row) => row.phone,
      cell: (row) => <span>{row.phone}</span>
    },
    {
      name: 'Position',
      sortable: true,
      reorder: true,
      width: '130px',
      sortField: 'role',
      selector: (row) => row.company,
      cell: (row) => <span>{row?.position}</span>
    },

    {
      name: 'Address',
      sortable: true,
      reorder: true,
      minWidth: '172px',
      selector: (row) => row.country,
      cell: (row) => {
        return (
          <>
            <PrintAddress address={row?.address} />
          </>
        );
      }
    },
    {
      name: 'Rating',
      width: '120px',
      sortable: true,
      reorder: true,
      center: true,
      selector: (row) =>
        ratingType?.value == 1 ? row?.attendanceRating : row?.lastContactedRating,
      cell: (row) => {
        const rating = ratingType?.value == 1 ? row?.attendanceRating : row?.lastContactedRating;
        const ratingColor =
          ratingType?.value == 1
            ? row?.attendanceRatingColor || '#2e2e2e'
            : row?.lastContactedRatingColor;
        return (
          <div className="d-flex flex-column w-100 align-items-center">
            <div
              key={`div${row?._id}_ratingType${ratingType?.value}`}
              id={`div${row?._id}_ratingType`}
              className="table-rating"
              style={{ backgroundColor: `${ratingColor}34`, cursor: 'pointer' }}
            >
              <span
                key={`span${row?._id}_ratingType${ratingType?.value}`}
                style={{ color: `${ratingColor}f0`, cursor: 'pointer' }}
              >
                {rating > 1000 ? 0 : rating}
              </span>
            </div>
          </div>
        );
      }
    },
    {
      name: 'Tag',
      minWidth: '120px',
      sortable: true,
      reorder: true,
      selector: (row) => row.billing,
      cell: (row) => {
        return row?.tags?.length
          ? row.tags.map((src) => (
              <Badge
                className="text-capitalize ms-50"
                color={store?.tags?.find((x) => x.value === src.value)?.color}
              >
                {src.value}
              </Badge>
            ))
          : null;
      }
    },
    {
      name: 'Note',
      width: '80px',
      center: true,
      sortable: true,
      reorder: true,
      selector: (row) => row.note,
      cell: (row) => (
        <Eye
          onClick={() => {
            setRow(row);
            fetchNotes(row._id);
            toggle();
          }}
          style={{ cursor: 'pointer' }}
        />
      )
    },
    {
      name: 'Actions',
      minWidth: '80px',
      cell: (row) => (
        <div className="column-action">
          <UncontrolledDropdown>
            <DropdownToggle tag="div" className="btn btn-sm">
              <MoreVertical size={14} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu container="body">
              <DropdownItem
                tag={Link}
                className="w-100"
                to={`/contacts/view/${row._id}/${orderContactType}`}
                onClick={() => {
                  dispatch(getUser(row._id));
                  fetchNotes(row._id);
                }}
              >
                <FileText size={14} className="me-50" />
                <span className="align-middle">Details</span>
              </DropdownItem>

              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => {
                  e.preventDefault();
                  // dispatch(deleteUser(row.id))
                  dispatch(selectContactAction(row));
                  toggleSidebar();
                }}
              >
                <Edit size={14} className="me-50" />
                <span className="align-middle">Edit</span>
              </DropdownItem>

              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => {
                  e.preventDefault();
                  // dispatch(deleteUser(row.id))
                  handleDeleteConfirmation({
                    ids: [row._id],
                    show: true
                  });
                }}
              >
                <Trash2 size={14} className="me-50" />
                <span className="align-middle">Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      )
    }
  ];

  const company = {
    name: 'Company',
    // sortable: true,
    minWidth: '180px',
    // sortField: 'role',
    selector: (row) => row.company,
    cell: (row) => <span>{row?.company}</span>
  };
  const leadSource = {
    name: 'Lead Source',
    minWidth: '140px',
    // sortable: true,
    sortField: 'leadSource',
    // selector: (row) => row?.leadSource,
    cell: (row) =>
      row?.leadSource &&
      row?.leadSource?.map((src) => (
        <Badge
          className="text-capitalize ms-50"
          color={store?.leadSource?.find((x) => x.title === src.value)?.color}
        >
          {src.value}
        </Badge>
      ))
    // <Badge
    //   pill
    //   color={store?.leadSource?.find((y) => y.title === row?.leadSource)?.color}
    //   className="me-50"
    // >
    //   {row?.leadSource}
    // </Badge>
  };
  const onBoard = {
    name: 'Onboard',
    width: '130px',
    selector: (row) => row?.salary,
    center: true,
    cell: (row) => (
      <div className="p-1">
        <Chart options={options} series={row.series || [0]} type="radialBar" height={100} />
      </div>
    )
  };
  const type = {
    name: 'Type',
    width: '110px',
    sortable: true,
    // sortField: 'currentPlan',
    selector: (row) => row.currentPlan,
    cell: (row) => <span className="text-capitalize">{row?.type}</span>
  };
  const stage = {
    name: 'Stage',
    minWidth: '170px',
    selector: (row) => row.stage,
    cell: (row) => {
      return (
        <div
          className="project-status-container"
          style={{
            position: 'relative',
            cursor: 'pointer',
            color: '#fff'
          }}
        >
          <ReactSelect
            options={stageOptions}
            value={stageOptions.find((x) => x.value == row.stage)}
            onChange={(data) => {
              const newContact = {
                ...row,
                stage: data.value
              };
              updateContactsRQ(newContact).then((res1) => {
                if (res1) {
                  success('Stage updated');
                  dispatch(contactsAction());
                  if (data.value == 'done') {
                    setShowConfetti(true);
                    setStatusRowID(row._id);
                  }
                }
              });
            }}
            getOptionLabel={getOptionLabel}
            getOptionValue={getOptionValue}
            isClearable={false}
            className="react-select"
            classNamePrefix="select"
            isSearchable={true}
            styles={customStyles}
            menuPortalTarget={document.body}
            isDisabled={row.stage.toLowerCase() == 'lost' || row.stage.toLowerCase() == 'win'}
          />
          {}
          {showConfetti && statusRowID === row._id ? (
            <Confetti
              width={200}
              height={50}
              recycle={false}
              numberOfPieces={500}
              gravity={0.2}
              initialVelocityX={{ min: -10, max: 10 }}
              initialVelocityY={{ min: -10, max: 10 }}
              onConfettiComplete={() => setShowConfetti(false)}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            />
          ) : null}
        </div>
      );
    }
  };

  switch (orderContactType) {
    case 0:
      // columns.splice(5, 1, rating);
      break;
    case 1:
      columns.splice(3, 0, onBoard);
      break;
    case 2:
      columns.splice(1, 1);
      columns.splice(2, 2, stage, leadSource);
      columns.splice(5, 1);

      break;
    case 3:
      columns.splice(2, 0, type);
      columns.splice(4, 0, company);
      columns.splice(6, 1);
      break;
    case 4:
      columns.splice(2, 0, type);
      columns.splice(4, 0, company);
      columns.splice(6, 1);
      break;
    default:
      break;
  }
  // ** Handle input change for new created fields
  const handleInputChange = (e, rowId, fieldId) => {
    setNewFieldValue({
      contactId: rowId,
      fieldId: fieldId,
      value: e.target.value
    });
  };
  // ** Handle Enter Press
  const handleEnterPress = (e, rowId, fieldId) => {
    if (e.key === 'Enter') {
      dispatch(
        updateFieldValueContactAction({
          contactId: rowId,
          fieldId: fieldId,
          value: e.target.value
        })
      );
    }
  };
  const handleBlur = (e, rowId, fieldId) => {
    dispatch(
      updateFieldValueContactAction({ contactId: rowId, fieldId: fieldId, value: e.target.value })
    );
  };
  // ** Effect
  useEffect(() => {
    // Show only isShown: true columns
    let tmp = [];
    activeContactTypeFields.map((item1) => {
      if (item1.isShown) {
        let existedCol = defaultColumns.find((item2) => item2.name == item1.title);
        if (existedCol) {
          tmp.push({ ...existedCol, order: item1.order });
        } else {
          tmp.push({
            name: item1.title,
            sortable: true,
            width: '100px',
            order: item1.order,
            // selector: (row) => row[item1.title].toString(),
            cell: (row) => {
              return row[item1.title] ? (
                <span>{row[item1.title].toString()}</span>
              ) : (
                <Input
                  name={item1.title}
                  type={eval(item1.type)}
                  value={newFieldValue?.value}
                  onChange={(e) => handleInputChange(e, row._id, item1._id)}
                  onKeyDown={(e) => handleEnterPress(e, row._id, item1._id)}
                  onBlur={(e) => handleBlur(e, row._id, item1._id)}
                />
              );
            }
          });
        }
      }
    });
    if (tmp?.length > 0) {
      tmp.push(
        {
          name: 'Rating',
          width: '120px',
          center: true,
          order: 100,
          selector: (row) =>
            ratingType?.value == 1 ? row?.attendanceRating : row?.lastContactedRating,
          cell: (row) => {
            const rating =
              ratingType?.value == 1 ? row?.attendanceRating : row?.lastContactedRating;
            const ratingColor =
              ratingType?.value == 1
                ? row?.attendanceRatingColor || '#2e2e2e'
                : row?.lastContactedRatingColor;
            return (
              <div className="d-flex flex-column w-100 align-items-center">
                <div
                  key={`div${row?._id}_ratingType${ratingType?.value}`}
                  id={`div${row?._id}_ratingType`}
                  className="table-rating"
                  style={{ backgroundColor: `${ratingColor}34`, cursor: 'pointer' }}
                >
                  <span
                    key={`span${row?._id}_ratingType${ratingType?.value}`}
                    style={{ color: `${ratingColor}f0`, cursor: 'pointer' }}
                  >
                    {rating > 1000 ? 0 : rating}
                  </span>
                </div>
              </div>
            );
          }
        },
        {
          name: 'Actions',
          minWidth: '80px',
          order: 101,
          cell: (row) => (
            <div className="column-action">
              <UncontrolledDropdown>
                <DropdownToggle tag="div" className="btn btn-sm">
                  <MoreVertical size={14} className="cursor-pointer" />
                </DropdownToggle>
                <DropdownMenu container="body">
                  <DropdownItem
                    tag={Link}
                    className="w-100"
                    to={`/contacts/view/${row._id}/${orderContactType}`}
                    onClick={() => {
                      dispatch(getUser(row._id));
                      fetchNotes(row._id);
                    }}
                  >
                    <FileText size={14} className="me-50" />
                    <span className="align-middle">Details</span>
                  </DropdownItem>

                  <DropdownItem
                    tag="a"
                    href="/"
                    className="w-100"
                    onClick={(e) => {
                      e.preventDefault();
                      // dispatch(deleteUser(row.id))
                      dispatch(selectContactAction(row));
                      toggleSidebar();
                    }}
                  >
                    <Edit size={14} className="me-50" />
                    <span className="align-middle">Edit</span>
                  </DropdownItem>

                  <DropdownItem
                    tag="a"
                    href="/"
                    className="w-100"
                    onClick={(e) => {
                      e.preventDefault();
                      // dispatch(deleteUser(row.id))
                      handleDeleteConfirmation({
                        ids: [row._id],
                        show: true
                      });
                    }}
                  >
                    <Trash2 size={14} className="me-50" />
                    <span className="align-middle">Delete</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          )
        }
      );
    }
    // Insert rating column and action column as default

    tmp.sort((a, b) => {
      if (a.order < b.order) {
        return -1;
      } else if (a.order > b.order) {
        return 1;
      } else {
        return 0;
      }
    });

    setColumns(tmp);
  }, [activeContactTypeFields]);

  return {
    columns
  };
};

export const ExpandableTable = ({ data }) => {
  const taskStore = useSelector((state) => state.employeeTasks);
  let empTasks = taskStore?.taskList?.data?.employeeTasks?.find((x) => x._id === data._id)?.tasks;

  const [selectedTask, setSelectedTask] = useState({});
  const dispatch = useDispatch();
  const [openViewModal, setOpenViewModal] = useState(false);
  const toggleViewModal = (item) => {
    setSelectedTask(item);
    dispatch(setSelectedTaskReducer(item));
    setOpenViewModal(!openViewModal);
  };

  //const employeeId =
  const [tooltipColors, setTooltipColors] = useState({
    deny: 'red',
    remind: 'blue',
    complete: 'green'
  });
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipOpens, setTooltipOpens] = useState(false);
  const [tooltipOpens1, setTooltipOpens1] = useState(false);
  const [modal, setModal] = useState(false);

  const [isReminded, setIsReminded] = useState(false);
  const [isCompleted, setIsCompleted] = useState(null);
  const [isDenied, setIsDenied] = useState(false);

  const [note, setNote] = useState('');

  const toggle = () => setTooltipOpen(!tooltipOpen);
  const toggle1 = () => setTooltipOpens(!tooltipOpens);
  const toggle2 = () => setTooltipOpens1(!tooltipOpens1);

  const handleNotes = () => setModal(!modal);

  const handleNoteChanged = (e) => {
    setNote(e.target.value);
  };
  // const [status, setStatus] = useState('Active');

  // function handleStatusClick() {
  //   setStatus(status === 'Active' ? 'Inactive' : 'Active');
  // }

  function handleRemindClick(item) {
    setIsReminded(true);
    //handle status remind
    dispatch(updateTaskStatusUserAction(item._id, { status: 'remind', empId: item.empId }));
  }

  function handleDenyClick(item) {
    setIsDenied(true);
    //set status declined

    dispatch(
      updateTaskStatusUserAction(item._id, { status: 'declined', empId: item.empId, note: note })
    );
  }

  function handleCheckboxChange(item) {
    setIsCompleted(item._id);
    //set status completed

    dispatch(updateTaskStatusUserAction(item._id, { status: 'approved', empId: item.empId }));
  }
  return (
    <div className="expandable-content" style={{ marginLeft: '5%', marginRight: '10%' }}>
      <Table className="employee-sub-menu-table">
        <thead>
          <tr style={{ height: '10px !important' }}>
            <th>Task Name</th>
            <th>Type</th>
            <th>Task</th>
            <th>Description</th>
            <th>Note</th>
            <th>Action</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {empTasks &&
            empTasks?.map((item) => {
              return (
                <tr>
                  <th>
                    <p style={{ fontSize: '13px', fontWeight: '600' }}>
                      {item.originTask[0].title}
                    </p>
                  </th>
                  <th style={{ fontSize: '13px', fontWeight: '400' }}>
                    {item.originTask[0].type ? item.originTask[0].type : 'Sign'}
                  </th>
                  <th>
                    <Button
                      color="primary"
                      outline
                      className="btn btn-sm"
                      style={{ marginLeft: '-10px' }}
                      onClick={() => toggleViewModal(item)}
                    >
                      View
                    </Button>
                  </th>
                  <th>
                    <p className="desEmpText">{item.originTask[0].description}</p>
                  </th>
                  <th style={{ fontSize: '13px', fontWeight: '400' }}>
                    {item?.history[item.history.length - 1].note}
                  </th>
                  <th>
                    <div className="column-action emp-column-action">
                      <ArrowUpRight
                        size={22}
                        className="arrow-up-right-icon"
                        id="remind"
                        onClick={() => handleRemindClick(item)}
                      />
                      <Tooltip
                        isOpen={tooltipOpen}
                        target="remind"
                        toggle={toggle}
                        className={`tooltip-${tooltipColors.remind}`}
                      >
                        <div>Remind</div>
                      </Tooltip>

                      <Input
                        type="checkbox"
                        style={{ fontSize: '14px', marginLeft: '10px', marginRight: '10px' }}
                        id="complete"
                        checked={isCompleted === item._id}
                        onChange={() => handleCheckboxChange(item)}
                      />
                      <Tooltip
                        isOpen={tooltipOpens}
                        target="complete"
                        toggle={toggle1}
                        className={`tooltip-${tooltipColors.complete}`}
                      >
                        Completed
                      </Tooltip>

                      <X className="x-icon" size={22} onClick={handleNotes} id="deny" />
                      <Tooltip
                        isOpen={tooltipOpens1}
                        target="deny"
                        toggle={toggle2}
                        className={`tooltip-${tooltipColors.deny}`}
                      >
                        Deny
                      </Tooltip>

                      <Modal isOpen={modal} toggle={handleNotes} centered>
                        <ModalHeader toggle={handleNotes}>Reason</ModalHeader>
                        <ModalBody>
                          <FormGroup>
                            <Label for="exampleText">Reason</Label>
                            <Input
                              id="exampleText"
                              name="text"
                              type="textarea"
                              onChange={handleNoteChanged}
                            />
                          </FormGroup>
                        </ModalBody>
                        <div className="d-flex justify-content-end p-1">
                          <Button color="primary" onClick={() => handleDenyClick(item)}>
                            Submit
                          </Button>
                        </div>
                      </Modal>
                    </div>
                  </th>
                  <th>
                    <Badge color={`${status[item.status].color}`} pill>
                      {status[item.status].title}
                    </Badge>
                  </th>
                </tr>
              );
            })}
        </tbody>
      </Table>

      <ViewTask toggle={toggleViewModal} open={openViewModal} empTask={selectedTask} />
    </div>
  );
};

// export default useColumns;
