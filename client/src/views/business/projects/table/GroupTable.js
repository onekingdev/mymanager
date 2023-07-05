/*    eslint-disable */

// ** React Imports
import React, { useState, useEffect, useRef } from 'react';

//** Redux Imports
import { useDispatch, useSelector } from 'react-redux';
import {
  projectActivities,
  tableDelete,
  rowsDelete,
  updatedTableColumn,
  updateRow,
  updatedColumnOrder
} from '../store/reducer';

// ** Icons Imports
import { Plus, Delete, Trash, Trash2, MoreVertical, CheckSquare } from 'react-feather';
import { FaChevronDown } from 'react-icons/fa';

// ** Third Party Components
import Select, { components } from 'react-select'; //eslint-disable-line
import styled from 'styled-components';
import { toast } from 'react-toastify';
import Flatpickr from 'react-flatpickr';
import Confetti from 'react-confetti';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// ** Utils
import { selectThemeColors } from '@utils';

// ** Reactstrap Imports
import {
  Row,
  Collapse,
  Table,
  Input,
  UncontrolledTooltip,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap';

// ** Styles
import '@styles/base/pages/page-projects.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';

// ** Comp Imports
import ProjectModal from '../modal/Modal';
import ColumnsModal from '../modal/ColumnsModal';

// ** Assignee Avatars
import img1 from '@src/assets/images/portrait/small/avatar-s-3.jpg';
import img2 from '@src/assets/images/portrait/small/avatar-s-1.jpg';
import img3 from '@src/assets/images/portrait/small/avatar-s-4.jpg';
import img4 from '@src/assets/images/portrait/small/avatar-s-6.jpg';
import img5 from '@src/assets/images/portrait/small/avatar-s-2.jpg';

//** API
import {
  addColumn,
  deleteTable,
  deleteRow,
  updateTable,
  deleteColumn,
  updateColumn,
  updateDynamicColumnFields,
  updateColumnOrder
} from '../../../../requests/projects/project';
import { BsPencil } from 'react-icons/bs';
import { MdDeleteForever } from 'react-icons/md';
import Swal from 'sweetalert2';

function GroupTable({ index, projectData, isOpen, onToggle, rotateIcon, onAddRow }) {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.userData);

  const [columnName, setColumnName] = useState('');
  const [rows, setRows] = useState([]);
  const [columnTitle, setColumnTitle] = useState([]);
  const [groupTitle, setGroupTitle] = useState(projectData.title);
  const [rowIds, setRowIds] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteGroupModal, setDeleteGroupModal] = useState(false);
  const [deleteColumnModal, setDeleteColumnModal] = useState(false);
  const [columnTypeModal, setColumnTypeModal] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [statusRowID, setStatusRowID] = useState('');
  const [projectID, setProjectID] = useState('');
  const [multipleColumnTypes, setMultipleColumnTypes] = useState([]);
  const [inputFocus, setInputFocus] = useState(false);

  const initialValue = {
    done: [],
    working: [],
    pending: [],
    stuck: []
  };

  const valuesByType = rows?.reduce((result, { status } = {}) => {
    if (status != null && status.value != null) {
      const statusValue = status.value;
      if (!result[statusValue]) {
        result[statusValue] = [];
      }
      result[statusValue].push({ status });
    }
    return result;
  }, initialValue);

  let doneStatus = valuesByType?.done.length;
  let workingStatus = valuesByType?.working.length;
  let pendingStatus = valuesByType?.pending.length;
  let stuckStatus = valuesByType?.stuck.length;
  let totalProjects = rows?.length;
  let projectRemaining = totalProjects - doneStatus - workingStatus - pendingStatus - stuckStatus;

  let projectStatusDonePercentage = parseFloat((doneStatus / totalProjects) * 100).toFixed(2);
  let projectStatusWorkingPercentage = parseFloat((workingStatus / totalProjects) * 100).toFixed(2);
  let projectStatusPendingPercentage = parseFloat((pendingStatus / totalProjects) * 100).toFixed(2);
  let projectStatusStuckPercentage = parseFloat((stuckStatus / totalProjects) * 100).toFixed(2);
  let projectRemainingPercentage = parseFloat((projectRemaining / totalProjects) * 100).toFixed(2);

  // TODO: Get manager list according to their role

  // ** Assignee Select Options
  const assigneeOptions = [
    { value: 'Pheobe Buffay', label: 'Pheobe Buffay', img: img1 },
    { value: 'Chandler Bing', label: 'Chandler Bing', img: img2 },
    { value: 'Ross Geller', label: 'Ross Geller', img: img3 },
    { value: 'Monica Geller', label: 'Monica Geller', img: img4 }
  ];

  const employeeOptions = [
    { userID: '01', value: 'Astro Kramer', label: 'Astro', img: img2 },
    { userID: '02', value: 'George Costanza', label: 'George', img: img5 },
    { userID: '03', value: 'Charlie Kelly', label: 'Charlie', img: img4 },
    { userID: '04', value: 'Dennis Reynolds', label: 'Dennis', img: img3 }
  ];

  const [options, setOptions] = useState([
    { id: 1, value: 'pending', label: 'Pending', color: '#ff9f43' },
    { id: 2, value: 'working', label: 'Working', color: '#7367f0' },
    { id: 3, value: 'stuck', label: 'Stuck', color: '#ea5455' },
    { id: 4, value: 'done', label: 'Done', color: '#28c76f' }
  ]);

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

  const AssigneeComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <div className="d-flex align-items-center">
          <img
            className="d-block rounded-circle me-50"
            src={data.img}
            height="26"
            width="26"
            alt={data.label}
          />
          <p className="mb-0">{data.value}</p>
        </div>
      </components.Option>
    );
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor:
        state.data.value === 'done'
          ? '#28c76f !important;'
          : state.data.value === 'pending'
          ? '#ff9f43  !important;'
          : state.data.value === 'working'
          ? '#7367f0  !important;'
          : state.data.value === 'stuck'
          ? '#ea5455  !important;'
          : provided.backgroundColor,
      color: state.data.value === 'done' ? '#fff !important;' : '#fff !important;'
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color:
        state.selectProps.value && state.selectProps.value.value === 'done'
          ? '#fff !important;'
          : '#fff !important;'
    }),
    control: (provided, state) => ({
      ...provided,
      backgroundColor:
        state.selectProps.value && state.selectProps.value.value === 'done'
          ? '#28c76f !important;'
          : state.selectProps.value && state.selectProps.value.value === 'pending'
          ? '#ff9f43  !important;'
          : state.selectProps.value && state.selectProps.value.value === 'working'
          ? '#7367f0  !important;'
          : state.selectProps.value && state.selectProps.value.value === 'stuck'
          ? '#ea5455  !important;'
          : provided.backgroundColor
    })
  };

  const getOptionLabel = (option) => option.label;
  const getOptionValue = (option) => option.value;

  useEffect(() => {
    let updatedRows = projectData.rowData;
    updatedRows = JSON.parse(JSON.stringify(updatedRows));
    if (updatedRows && updatedRows.length > 0) {
      setColumnTitle(projectData.mapOrder);
    } else {
      setColumnTitle([]);
    }
    setRows(updatedRows);
  }, [projectData]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(columnTitle);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    let updatedMapOrder = items.map((item, index) => ({ ...item, order: index + 1 }));
    let payload = {
      tableID: projectData._id,
      updatedMapOrder: updatedMapOrder
    };

    updateColumnOrder(payload).then((response) => {
      if (response) {
        setColumnTitle(updatedMapOrder);
        dispatch(
          updatedColumnOrder({
            workspaceID: projectData.workspaceID,
            tableID: projectData._id,
            updatedMapOrder: response?.data?.updatedMapOrder
          })
        );
      }
    });

    const newRows = [...rows];
    newRows.forEach((row, i) => {
      const cellIndex = Object.keys(row).indexOf(reorderedItem.text);
      if (cellIndex >= 0) {
        const [removed] = row[reorderedItem.text].splice(result.source.index, 1);
        row[reorderedItem.text].splice(result.destination.index, 0, removed);
      }
    });
    setRows(newRows);
  };

  let handleChangeDynamicProperty = (e, column, id) => {
    setInputFocus(true);
    const newRows = rows.map((indexRow) => {
      const updatedDynamicProperties = indexRow.dynamicProperties.map((property) => {
        if (property._id === id) {
          return { ...property, columnName: e.target.value };
        }
        return property;
      });

      return { ...indexRow, dynamicProperties: updatedDynamicProperties };
    });
    const newTitles = columnTitle.map((title) => {
      if (title.id === id) {
        return { ...title, column: e.target.value };
      }
      return title;
    });
    setRows(newRows);
    setColumnTitle(newTitles);
  };

  let trackEnterKeyDynamicProperty = (event, column, _id) => {
    if (event.key === 'Enter') {
      let payload = {
        tableID: projectData._id,
        mapOrderID: _id,
        columnName: column
      };
      updateColumn(payload).then((response) => {});
      event.target.blur();
    }
  };

  let handleChangeDynamicColumnField = (e, i, j, column) => {
    const newRows = [...rows];
    let dynamicProperties = newRows[i].dynamicProperties;
    dynamicProperties.forEach((obj) => {
      if (obj.columnName === column) {
        obj.value = e.target.value;
      }
    });
    newRows[i] = { ...newRows[i], dynamicProperties };
    setRows(newRows);
  };

  let trackEnterKeyDynamicColumnField = (event, rowID, column) => {
    if (event.key === 'Enter') {
      let payload = {
        tableID: projectData._id,
        rowID: rowID,
        columnName: column,
        value: event.target.value
      };
      updateDynamicColumnFields(payload).then((response) => {});
      event.target.blur();
    }
  };

  let onSelectHandlerDynamicDate = (data, rowID, column) => {
    let payload = {
      tableID: projectData._id,
      rowID: rowID,
      columnName: column,
      value: data
    };
    updateDynamicColumnFields(payload).then((response) => {});
  };

  const handleChangeCheckbox = (e) => {
    if (e.target.checked) {
      setRowIds((prev) => [...prev, e.target.value]);
    } else {
      removeRowIds(e);
    }
  };

  const removeRowIds = (e) => {
    setRowIds([...rowIds.filter((ids) => ids !== e.target.value)]);
  };

  const toggleDelete = () => setDeleteModal(!deleteModal);
  const toggleDeleteGroup = () => setDeleteGroupModal(!deleteGroupModal);
  const toggleColumnType = () => {
    setColumnTypeModal(!columnTypeModal);
    setProjectID(projectData?._id);
  };
  const toggleDeleteColumn = () => setDeleteColumnModal(!deleteColumnModal);

  const deleteRowHandler = (e) => {
    e.preventDefault();
    if (rowIds.length < 1) {
      toast.warning('Please select a project!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    } else {
      Swal.fire({
        title: 'Delete?',
        text: `Are you sure you want to delete this selected task(s)?`,
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Delete anyway',
        cancelButtonText: 'Cancel',
        customClass: {
          confirmButton: 'btn btn-danger',
          cancelButton: 'btn btn-outline-danger ms-1'
        },
        buttonsStyling: false
      }).then((result) => {
        if (result.isConfirmed) {
          let payload = {
            data: {
              tableID: projectData._id,
              rowIDs: rowIds,
              workspaceID: projectData.workspaceID
            }
          };
          deleteRow(payload).then((response) => {
            dispatch(
              rowsDelete({
                workspaceID: projectData.workspaceID,
                tableID: projectData._id,
                rowIDs: rowIds
              })
            );
            dispatch(projectActivities(response?.data?.latestActivitiese));
          });
          setRowIds([]);
        }
      });
    }
  };
  const addColumnHandler = () => {
    const payload = {
      tableID: projectData._id,
      columns: multipleColumnTypes
    };
    addColumn(payload).then((response) => {
      dispatch(
        updatedTableColumn({
          workspaceID: projectData.workspaceID,
          tableID: projectData._id,
          updatedTable: response?.data?.data
        })
      );
      dispatch(projectActivities(response?.data?.latestActivitiese));
      toggleColumnType();
      setMultipleColumnTypes('');
    });
  };


  const deleteColumnHanlder = () => {
    Swal.fire({
      title: 'Delete?',
        text: `Are you sure you want to delete this columns?`,
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Delete anyway',
        cancelButtonText: 'Cancel',
        customClass: {
          confirmButton: 'btn btn-danger',
          cancelButton: 'btn btn-outline-danger ms-1'
        },
        buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        let payload = {
          data: {
            tableID: projectData._id,
            columnName: columnName,
            userID: currentUser.id
          }
        };
        deleteColumn(payload).then((response) => {
          dispatch(
            updatedTableColumn({
              workspaceID: projectData.workspaceID,
              tableID: projectData._id,
              updatedTable: response.data.data
            })
          );
          dispatch(projectActivities(response?.data?.latestActivitiese));
        });
      }
    });
  };

  const deleteGroupHandler = () => {
    Swal.fire({
      title: 'Delete?',
      text: `Are you sure you want to delete this group?`,
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete anyway',
      cancelButtonText: 'Cancel',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        let payload = {
          data: {
            tableID: projectData._id,
            workspaceID: projectData.workspaceID,
          },
        };
        deleteTable(payload).then((response) => {
          if (response) {
            dispatch(tableDelete({ workspaceID: projectData.workspaceID, tableID: projectData._id }));
            dispatch(projectActivities(response?.data?.latestActivitiese));
          }
        });
      }
    });
  };

  const handleChange = (e, i, j) => {
    const newRows = [...rows];
    newRows[i] = { ...newRows[i], [columnTitle[j].column.toLowerCase()]: e.target.value };
    setRows(newRows);
  };

  let onSelectHandler = (data, rowID, column) => {
    let newData;
    if (column === 'Assignee' || column === 'Due' || column === 'Date') {
      newData = [...data];
    } else if (column === 'Manager' || column === 'Status') {
      newData = {
        userID: currentUser._id,
        value: data.value
      };
    }
    let payload = {
      tableID: projectData._id,
      rowID: rowID,
      rowData: newData,
      columnName: column
    };

    updateTable(payload).then((response) => {
      dispatch(
        updateRow({
          workspaceID: projectData.workspaceID,
          tableID: projectData._id,
          rowID: rowID,
          columnType: column,
          updatedRow: response?.data?.row
        })
      );
    });
  };

  let trackEnterKey = (event, rowID, column) => {
    if (event.key === 'Enter') {
      let rowData = event.target.value;
      let payload = {
        tableID: projectData._id,
        rowID: rowID,
        rowData: rowData,
        columnName: column
      };
      updateTable(payload).then((response) => {
        dispatch(
          updateRow({
            workspaceID: projectData.workspaceID,
            tableID: projectData._id,
            rowID: rowID,
            columnType: column,
            updatedRow: response?.data?.row
          })
        );
      });
      event.target.blur();
    }
  };

  let trackEnterKeyForTitle = (event) => {
    if (event.key === 'Enter') {
      let payload = {
        tableID: projectData._id,
        title: groupTitle
      };
      updateTable(payload).then((response) => {});
      event.target.blur();
    }
  };
  const [editMode, setEditMode] = useState(false);

  const { Menu, Control } = components;

  const handleLabelChange = (optionValue, newLabel) => {
    const updatedOptions = options.map((option) => {
      if (option.value === optionValue) {
        return { ...option, label: newLabel };
      }
      return option;
    });
    setOptions(updatedOptions);
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  const handleAddNewLabel = () => {
    const newOption = {
      value: (options.length + 1).toString(),
      label: 'New Label',
      color: getRandomColor()
    };
    setOptions([...options, newOption]);
  };

  const handleDeleteLabel = (value) => {
    const updatedOptions = options.filter((option) => option.value !== value);
    setOptions(updatedOptions);
  };

  return (
    <div>
      <Row style={{ marginBottom: '1rem' }}>
        <div className="board-wrapper">
          <div className="d-flex align-items-center justify-content-between gap-2">
            <div className="d-flex align-items-center gap-1 board-header">
              <div className="project-group" onClick={() => onToggle(index)}>
                <FaChevronDown
                  size={15}
                  className={`${
                    rotateIcon ? 'project-group-rotate-icon' : 'project-group-rotate-start'
                  }`}
                  style={{ color: '#7367f0', cursor: 'pointer' }}
                />
              </div>
              <Input
                className="group-title"
                value={groupTitle}
                onChange={(e) => setGroupTitle(e.target.value)}
                onKeyPress={trackEnterKeyForTitle}
                style={{
                  fontSize: '1rem',
                  fontWeight: '500',
                  border: '0',
                  backgroundColor: 'transparent'
                }}
              />
            </div>

            <div
              className="d-flex align-items-center justify-content-center gap-2"
              style={{ paddingRight: '1.5rem' }}
            >
              {rotateIcon && (
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    onAddRow(projectData._id);
                  }}
                  style={{ color: '#28c76f' }}
                >
                  <Plus size={20} id={'AddProject-Tooltip' + projectData._id} />
                  <UncontrolledTooltip
                    placement="top"
                    target={'AddProject-Tooltip' + projectData._id}
                  >
                    New Task
                  </UncontrolledTooltip>
                </div>
              )}

              {rotateIcon && rowIds.length > 0 ? (
                <div className="cursor-pointer" onClick={deleteRowHandler}>
                  <Delete size={20} id={'DeleteProject-Tooltip' + projectData._id} />
                  <UncontrolledTooltip
                    placement="top"
                    target={'DeleteProject-Tooltip' + projectData._id}
                  >
                    Delete Task
                  </UncontrolledTooltip>
                </div>
              ) : (
                ''
              )}

              {rotateIcon && (
                <div
                  className="cursor-pointer"
                  onClick={deleteGroupHandler}
                  style={{ color: '#ea5455' }}
                >
                  <Trash2 size={20} id={'DeleteGroup-Tooltip' + projectData._id} />
                  <UncontrolledTooltip
                    key={projectData._id}
                    placement="top"
                    target={'DeleteGroup-Tooltip' + projectData._id}
                  >
                    Delete Project
                  </UncontrolledTooltip>
                </div>
              )}
            </div>

            <ColumnsModal
              toggle={toggleColumnType}
              modal={columnTypeModal}
              onClick={addColumnHandler}
              columnType={columnName}
              multipleColumnTypes={multipleColumnTypes}
              setMultipleColumnTypes={setMultipleColumnTypes}
              projectID={projectID}
            />
          </div>
        </div>
      </Row>
      <Collapse className="project-table-collapse" isOpen={isOpen}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Table bordered>
            <thead>
              <Droppable droppableId="columns" direction="horizontal">
                {(provided) => (
                  <tr {...provided.droppableProps} ref={provided.innerRef}>
                    {columnTitle.map(({ id, column, _id }, index) =>
                      column === '_id' ? (
                        <th
                          className="project-table-select"
                          style={{ maxWidth: 'fit-content', paddingTop: '1.3rem' }}
                        >
                          <CheckSquare size={20} />
                        </th>
                      ) : column === 'Task' ||
                        column === 'Manager' ||
                        column === 'Status' ||
                        column === 'Due' ||
                        column === 'Assignee' ? (
                        <Draggable key={id} draggableId={id} index={index}>
                          {(provided) => (
                            <th
                              style={{ maxWidth: 'fit-content' }}
                              id={column}
                              scope="col"
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="text-nowrap"
                              ref={provided.innerRef}
                              key={id}
                            >
                              <div
                                className="project-column-title"
                                style={{
                                  paddingTop: '0.6rem',
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center'
                                }}
                              >
                                {column == 'Due' ? column + ' ' + 'Date' : column}
                                <UncontrolledDropdown>
                                  <DropdownToggle
                                    className="hide-arrow me-1"
                                    tag="a"
                                    href="/"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setColumnName(column.toLowerCase());
                                    }}
                                  >
                                    <MoreVertical className="text-body" size={16} />
                                  </DropdownToggle>
                                  <DropdownMenu end>
                                    <DropdownItem>
                                      <div
                                        className="cursor-pointer d-flex gap-1"
                                        onClick={deleteColumnHanlder}
                                        style={{ color: '#ea5455' }}
                                      >
                                        <Trash size={18} id={'DeleteGroup-Col'} />
                                        Delete
                                      </div>
                                    </DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              </div>
                            </th>
                          )}
                        </Draggable>
                      ) : (
                        <Draggable key={id} draggableId={id} index={index}>
                          {(provided) => (
                            <th
                              id={column}
                              scope="col"
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="text-nowrap"
                              ref={provided.innerRef}
                            >
                              <div
                                className="project-column-title"
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center'
                                }}
                              >
                                <Input
                                  className="group-title"
                                  autoFocus={inputFocus ? 'autoFocus' : null}
                                  value={column}
                                  onChange={(e) => {
                                    handleChangeDynamicProperty(e, column, id);
                                  }}
                                  onKeyPress={(event) =>
                                    trackEnterKeyDynamicProperty(event, column, _id)
                                  }
                                  style={{
                                    border: '0',
                                    backgroundColor: 'transparent',
                                    verticalAlign: 'top',
                                    textTransform: 'uppercase',
                                    fontSize: '0.857rem',
                                    fontWeight: 'bold',
                                    letterSpacing: '0.5px'
                                  }}
                                />
                                <UncontrolledDropdown>
                                  <DropdownToggle
                                    className="hide-arrow me-1"
                                    tag="a"
                                    href="/"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setColumnName(column.toLowerCase());
                                    }}
                                  >
                                    <MoreVertical className="text-body" size={16} />
                                  </DropdownToggle>
                                  <DropdownMenu end>
                                    <DropdownItem>
                                      <div
                                        className="cursor-pointer d-flex gap-1"
                                        onClick={deleteColumnHanlder}
                                        style={{ color: '#ea5455' }}
                                      >
                                        <Trash size={18} id={'DeleteGroup-Col'} />
                                        Delete
                                      </div>
                                    </DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              </div>
                            </th>
                          )}
                        </Draggable>
                      )
                    )}{' '}
                    {rows?.length > 0 && (
                      <th
                        class="ml-4"
                        style={{
                          position: 'sticky',
                          right: 0,
                          paddingTop: '1.3rem',
                          borderBottom: '1px solid #ebe9f1'
                        }}
                      >
                        <div
                          className="cursor-pointer"
                          color="primary"
                          onClick={toggleColumnType}
                          click
                          size={14}
                        >
                          <Plus size={20} id={'AddProject-Col' + projectData._id} />{' '}
                          <UncontrolledTooltip
                            placement="top"
                            target={'AddProject-Col' + projectData._id}
                          >
                            Add Column
                          </UncontrolledTooltip>
                        </div>
                      </th>
                    )}
                    {provided.placeholder}
                  </tr>
                )}
              </Droppable>
            </thead>
            <tbody>
              {rows?.map((row, i) => (
                <tr className="project-table-row" key={row._id}>
                  {columnTitle.map(({ column: column, columnType: columnType }, j) => (
                    <td className="project-table-fields" key={j} style={{ textAlign: 'center' }}>
                      {column === '_id' ? (
                        <div>
                          <Input
                            className="project-table-checkbox"
                            type="checkbox"
                            value={row._id}
                            onChange={(e) => handleChangeCheckbox(e)}
                          />
                        </div>
                      ) : column === 'Task' ? (
                        <Input
                          type="text"
                          value={row[column.toLowerCase()]}
                          onChange={(e) => handleChange(e, i, j)}
                          onKeyPress={(event) => trackEnterKey(event, row._id, column)}
                          required
                          style={{ minWidth: '10rem' }}
                        />
                      ) : columnType === 'text' ? (
                        <Input
                          type="text"
                          value={row.dynamicProperties.reduce(
                            (acc, prop) =>
                              prop.columnName.toLowerCase() === column.toLowerCase()
                                ? prop.value
                                : acc,
                            null
                          )}
                          onChange={(e) => handleChangeDynamicColumnField(e, i, j, column)}
                          onKeyPress={(event) =>
                            trackEnterKeyDynamicColumnField(event, row._id, column)
                          }
                          required
                          style={{ minWidth: '12rem' }}
                        />
                      ) : columnType === 'date' ? (
                        <Flatpickr
                          type="date"
                          options={{
                            dateFormat: 'm-d-Y'
                          }}
                          value={row.dynamicProperties.reduce(
                            (acc, prop) =>
                              prop.columnName.toLowerCase() === column.toLowerCase()
                                ? prop.value
                                : acc,
                            null
                          )}
                          onChange={(data) => {
                            onSelectHandlerDynamicDate(data, row._id, column);
                          }}
                          required
                          style={{ minWidth: '8rem', backgroundColor: '#fff' }}
                          className="form-control date-picker"
                        />
                      ) : column === 'Due' ? (
                        <Flatpickr
                          type="date"
                          options={{
                            dateFormat: 'm-d-Y'
                          }}
                          value={row[column.toLowerCase()]}
                          onChange={(data) => {
                            onSelectHandler(data, row._id, column);
                          }}
                          required
                          style={{ minWidth: '8rem', backgroundColor: '#fff' }}
                          className="form-control date-picker"
                        />
                      ) : column === 'Manager' ? (
                        <div style={{ minWidth: '12rem' }}>
                          <ReactSelect
                            value={
                              row[column.toLowerCase()]
                                ? assigneeOptions.find(
                                    (x) => x.value === row[column.toLowerCase()].value
                                  )
                                : ''
                            }
                            isClearable={false}
                            className="react-select"
                            classNamePrefix="select"
                            options={assigneeOptions}
                            theme={selectThemeColors}
                            onChange={(data) => {
                              onSelectHandler(data, row._id, column);
                            }}
                            components={{ Option: AssigneeComponent }}
                            menuPortalTarget={document.body}
                          />
                        </div>
                      ) : column === 'Assignee' ? (
                        <div style={{ minWidth: '12rem' }}>
                          <ReactSelect
                            isMulti
                            value={
                              row.hasOwnProperty(column.toLowerCase())
                                ? employeeOptions.filter((option) =>
                                    row[column.toLowerCase()].some(
                                      (rowOption) => rowOption.value === option.value
                                    )
                                  )
                                : []
                            }
                            isClearable={false}
                            className="react-select"
                            classNamePrefix="select"
                            options={employeeOptions}
                            theme={selectThemeColors}
                            onChange={(people) => {
                              const newRows = [...rows];
                              newRows[i][columnTitle[j].column.toLowerCase()] = people;
                              let data = newRows[i][columnTitle[j].column.toLowerCase()];
                              onSelectHandler(data, row._id, column);
                            }}
                            components={{ Option: AssigneeComponent }}
                            menuPortalTarget={document.body}
                          />
                        </div>
                      ) : column === 'Status' ? (
                        <div
                          className="project-status-container"
                          key={row._id}
                          style={{
                            position: 'relative',
                            cursor: 'pointer',
                            color: '#fff'
                          }}
                        >
                          {/* <ReactSelect
                            options={options}
                            value={
                              row[column.toLowerCase()]
                                ? options.find((x) => x.value === row[column.toLowerCase()].value)
                                : ''
                            }
                            onChange={(data) => {
                              onSelectHandler(data, row._id, column);
                              if (data.value === 'done') {
                                setStatusRowID(row._id);
                                setShowConfetti(true);
                              }
                            }}
                            getOptionLabel={getOptionLabel}
                            getOptionValue={getOptionValue}
                            isClearable={false}
                            className="react-select"
                            classNamePrefix="select"
                            isSearchable={true}
                            styles={customStyles}
                            menuPortalTarget={document.body}
                          /> */}

                          <ReactSelect
                            options={options}
                            value={
                              row[column.toLowerCase()]
                                ? options.find((x) => x.value === row[column.toLowerCase()].value)
                                : ''
                            }
                            onChange={(data) => {
                              onSelectHandler(data, row._id, column);
                              if (data.value === 'done') {
                                setStatusRowID(row._id);
                                setShowConfetti(true);
                              }
                            }}
                            getOptionLabel={getOptionLabel}
                            getOptionValue={getOptionValue}
                            isClearable={false}
                            className="react-select"
                            classNamePrefix="select"
                            isSearchable={true}
                            styles={customStyles}
                            menuPortalTarget={document.body}
                            isDisabled={editMode}
                            components={{
                              Menu: (props) => (
                                <Menu {...props}>
                                  {props.children}
                                  <div
                                    className={`react-select-menu-footer text-center ${
                                      editMode && columnName === column.toLowerCase()
                                        ? 'd-none'
                                        : 'active'
                                    }`}
                                  >
                                    <div className="hr"></div>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setEditMode(!editMode);
                                      }}
                                      className={`edit-label ${editMode ? 'active' : ''}`}
                                    >
                                      <BsPencil size={12} /> Edit Label
                                    </button>
                                  </div>
                                </Menu>
                              ),
                              Control: (props) => <Control {...props} />,
                              Option: (props) => (
                                <components.Option {...props} isDisabled={!editMode} />
                              )
                            }}
                          />

                          {editMode && (
                            <div
                              className="menu-tables"
                              onClick={(e) => e.stopPropagation()}
                              container="body"
                            >
                              <ul>
                                {options?.map((option) => (
                                  <li
                                    key={option.value}
                                    style={{
                                      backgroundColor: option.color,
                                      color: '#fff',
                                      display: 'flex',
                                      justifyContent: 'space-between',
                                      mixHeight: '38px',
                                      alignItems: 'center',
                                      borderWidth: '1px',
                                      borderRadius: '4px'
                                    }}
                                  >
                                    <Input
                                      type="text"
                                      value={option.label}
                                      onChange={(e) =>
                                        handleLabelChange(option.value, e.target.value)
                                      }
                                      style={{
                                        background: 'transparent',
                                        width: '80%',
                                        color: '#fff',
                                        margin: '4px',
                                        height: '30px'
                                      }}
                                    />{' '}
                                    <MdDeleteForever
                                      size={14}
                                      style={{
                                        cursor: 'pointer',
                                        position: 'relative',
                                        right: '8px'
                                      }}
                                      onClick={() => handleDeleteLabel(option.value)}
                                    />
                                  </li>
                                ))}
                                <button className="add-label" onClick={handleAddNewLabel}>
                                  + New Label
                                </button>
                                <div className="hr"></div>
                                <button
                                  className="apply-label"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setEditMode(!editMode);
                                  }}
                                >
                                  Apply
                                </button>
                              </ul>
                            </div>
                          )}

                          {showConfetti &&
                          row[column.toLowerCase()]?.value === 'done' &&
                          statusRowID === row._id ? (
                            <Confetti
                              width={200}
                              height={50}
                              recycle={false}
                              numberOfPieces={200}
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
                      ) : null}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </DragDropContext>
        {rows?.length > 0 && rows[0]?.status ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '100%',
              marginTop: '10px',
              fontWeight: 400,
              cursor: 'pointer'
            }}
          >
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #ebe9f1',
                width: '20rem',
                height: '2.5rem',
                marginLeft: 'auto',
                marginRight: 'auto'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  height: '27px',
                  width: '98%',
                  marginLeft: '3px',
                  marginRight: '3px',
                  zIndex: 0,
                  backgroundColor: '#c4c4c4'
                }}
                id="projectStatusInitial"
              ></div>
              <div
                class="project-status-wrapper"
                style={{
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  zIndex: 1,
                  width: '100%',
                  height: '100%',
                  padding: '3px'
                }}
              >
                <div
                  style={{
                    width: `${projectStatusDonePercentage}%`,
                    height: '100%',
                    backgroundColor: '#28c76f'
                  }}
                  id="projectStatusDone"
                >
                  <UncontrolledTooltip placement="top" target={'projectStatusDone'}>
                    Done {doneStatus} / {totalProjects} &nbsp; {projectStatusDonePercentage}%
                  </UncontrolledTooltip>
                </div>
                <div
                  style={{
                    width: `${projectStatusWorkingPercentage}%`,
                    height: '100%',
                    backgroundColor: '#7367f0'
                  }}
                  id="projectStatusWorking"
                >
                  <UncontrolledTooltip placement="top" target={'projectStatusWorking'}>
                    Working {workingStatus} / {totalProjects} &nbsp;{' '}
                    {projectStatusWorkingPercentage}%
                  </UncontrolledTooltip>
                </div>
                <div
                  style={{
                    width: `${projectStatusStuckPercentage}%`,
                    height: '100%',
                    backgroundColor: '#ea5455'
                  }}
                  id="projectStatusStuck"
                >
                  <UncontrolledTooltip placement="top" target={'projectStatusStuck'}>
                    Stuck {stuckStatus} / {totalProjects} &nbsp; {projectStatusStuckPercentage}%
                  </UncontrolledTooltip>
                </div>
                <div
                  style={{
                    width: `${projectStatusPendingPercentage}%`,
                    height: '100%',
                    backgroundColor: '#ff9f43'
                  }}
                  id="projectStatusPending"
                >
                  <UncontrolledTooltip placement="top" target={'projectStatusPending'}>
                    Pending {pendingStatus} / {totalProjects} &nbsp;{' '}
                    {projectStatusPendingPercentage}%
                  </UncontrolledTooltip>
                </div>
                <div
                  style={{
                    width: `${projectRemainingPercentage}%`,
                    height: '100%',
                    backgroundColor: '#c4c4c4'
                  }}
                  id="projectRemainingPercentage"
                >
                  <UncontrolledTooltip placement="top" target={'projectRemainingPercentage'}>
                    {projectRemaining} / {totalProjects} &nbsp; {projectRemainingPercentage}%
                  </UncontrolledTooltip>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </Collapse>
    </div>
  );
}

export default GroupTable;
