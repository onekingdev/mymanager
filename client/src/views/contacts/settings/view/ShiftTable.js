import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import '@styles/react/apps/app-email.scss';
import { ChevronDown, MoreVertical } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import {
  Button,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Modal,
  ModalHeader,
  FormGroup,
  ModalBody,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap';
import { PenTool, Trash } from 'react-feather';
import { shiftAddAction } from '../../schedule/store/actions';
import {
  useCreateNewShift,
  useGetEmployeeShifts,
  usePutEmployeeShift,
  deleteEmployeeShiftRQ
} from '../../../../requests/contacts/employee-contacts';
import { formatAmPmTime } from '../../../../utility/Utils';
import { toast } from 'react-toastify';

function ShiftTable() {
  const dispatch = useDispatch();
  const employeeScheduleState = useSelector((state) => state?.employeeSchedule);
  const { data: shifts, refetch, isLoading: shiftsLoading } = useGetEmployeeShifts();
  const { mutate } = useCreateNewShift();
  useEffect(() => {
    refetch();
  }, [employeeScheduleState?.shifts?.shiftList]);
  // Table Header and Cells
  const positionData = [
    {
      name: 'Shift Name',
      sortable: true,
      selector: (row) => row.name
    },
    {
      name: 'Start Time',
      sortable: true,
      selector: (row) => formatAmPmTime(row.start)
    },
    {
      name: 'End Time',
      sortable: true,
      cell: (row) => formatAmPmTime(row.end)
    },
    // {
    //   name: 'Day',
    //   sortable: true,
    //   center: true,
    //   selector: (row) => row,
    //   cell: (row) => (row.weekDay !== undefined ? weekDay[row.weekDay]?.name : '')
    // },
    {
      name: 'Note',
      sortable: true,
      cell: (row) => row.note
    },
    {
      name: 'Action',
      sortable: true,
      selector: (row) => row,
      cell: (row) => {
        return (
          <div className="d-flex cursor-pointer">
            <UncontrolledDropdown>
              <DropdownToggle className="pe-" tag="span">
                <MoreVertical size={15} />
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem
                  tag="h6"
                  className="w-100"
                  onClick={(e) => openUpdateModalHandler(row)}
                >
                  <PenTool size={15} />
                  <span className="align-middle ms-50">Edit</span>
                </DropdownItem>
                <DropdownItem
                  tag="h6"
                  className="w-100"
                  onClick={(e) => handleDeletePosition(row._id)}
                >
                  <Trash size={15} />
                  <span className="align-middle ms-50">Delete</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        );
      }
    }
  ];
  const [tableData, setTableData] = useState([]);
  // ** Create Modal
  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [shiftName, setShiftName] = useState('');
  const [shiftStartTime, setShiftStartTime] = useState('09:00');
  const [shiftEndTime, setShiftEndTime] = useState('05:00');
  // const [shiftInitialWeekDay, setShiftIntialWeekDay] = useState(0);
  const [shiftNote, setShiftNote] = useState('');
  const [shiftCurIndex, setShiftCurIndex] = useState(0);

  // ** Update Modal
  const [updateShiftId, setUpdateShiftId] = useState('');
  const toggle = () => {
    setOpenModal(!openModal);
  };
  const openUpdateModalHandler = (selectedRow) => {
    setShiftName(selectedRow?.name);
    setUpdateShiftId(selectedRow?._id);
    setShiftStartTime(selectedRow?.start);
    setShiftEndTime(selectedRow?.end);
    setShiftNote(selectedRow?.note);
    setOpenUpdateModal(!openUpdateModal);
  };
  const handleDeletePosition = (id) => {
    deleteEmployeeShiftRQ(id);
    setTimeout(() => {
      refetch();
    }, 500);
  };
  const updateModalToggle = () => {
    setOpenUpdateModal(!openUpdateModal);
  };
  // const scheduleWeekdayClick = (e, index) => {
  //   e.target.closest('.schedule-weekday').classList.toggle('active');
  // };
  const saveShiftClickHandler = () => {
    // let tmp = [];
    // document.querySelectorAll('.schedule-weekday').forEach((el, elIndex) => {
    //   if (el.classList.contains('active')) {
    //     tmp.push(elIndex);
    //   } else {
    //     return;
    //   }
    // });
    if (shiftName == '') {
      toast.error('Shift Name is required');
      return;
    }
    if (shiftStartTime == '') {
      toast.error('Shift Name is required');
      return;
    }
    if (shiftEndTime == '') {
      toast.error('Shift Name is required');
      return;
    }
    const payload = {
      name: shiftName,
      start: shiftStartTime,
      end: shiftEndTime,
      weekDay: [8],
      note: shiftNote
    };
    mutate(payload);

    setTimeout(() => {
      refetch();
    }, 800);
    setOpenModal(false);
  };

  const updateShiftClickHandler = () => {
    // let tmp = [];
    // document.querySelectorAll('.schedule-weekday').forEach((el, elIndex) => {
    //   if (el.classList.contains('active')) {
    //     tmp.push(elIndex);
    //   } else {
    //     return;
    //   }
    // });
    let payload = {
      id: updateShiftId,
      start: shiftStartTime,
      end: shiftEndTime,
      weekDay: [8],
      note: shiftNote,
      isOpen: true,
      name: shiftName
    };
    usePutEmployeeShift(updateShiftId, payload);
    setTimeout(() => {
      refetch();
    }, 900);
    setOpenUpdateModal(false);
  };

  useEffect(() => {
    let tmp = [];

    shifts?.map((shift, index1) => {
      let flag = 0;
      tmp.map((subShift, index2) => {
        if (
          shift.name == subShift.name &&
          shift.start == subShift.start &&
          shift.end == subShift.end
        ) {
          flag = 1;
        }
      });
      if (flag == 0 && shift.isOpen == true) {
        tmp.push(shift);
      }
      setTableData(tmp);
    });
  }, [shifts]);
  return (
    <>
      <CardHeader>
        <CardTitle className="w-100">
          <div>
            <Button color="primary" onClick={toggle}>
              Create Shift
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <div className="react-dataTable shift-table">
        <DataTable
          className="react-dataTable"
          noHeader
          pagination
          selectableRows
          columns={positionData}
          paginationPerPage={7}
          sortIcon={<ChevronDown size={10} />}
          data={tableData}
        />
      </div>
      <Modal isOpen={openModal} toggle={toggle} centered style={{ maxWidth: '45%' }}>
        <ModalHeader toggle={toggle}>
          <h3>Create Shift</h3>
        </ModalHeader>
        <ModalBody>
          <div>
            <div>
              <div className="d-flex ">
                <div className="me-1">
                  <Label>Shift Name</Label>
                  <Input
                    type="text"
                    onChange={(e) => {
                      setShiftName(e.target.value);
                    }}
                  />
                </div>
                <div className="me-1">
                  <Label>Start Time</Label>
                  <Input
                    type="time"
                    onChange={(e) => {
                      setShiftStartTime(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <Label>End Time</Label>
                  <Input
                    type="time"
                    onChange={(e) => {
                      setShiftEndTime(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            {/* 
            <div className="mt-3">
              <h4 className="font-medium-3">Apply To</h4>
              <div className="d-flex justify-content-between mt-1">
                {weekDay.map((day, index) => {
                  return (
                    <div
                      key={'day-' + index}
                      className="schedule-weekday cursor-pointer d-flex align-items-center justify-content-center"
                      onClick={(e) => scheduleWeekdayClick(e, index)}
                    >
                      <h4 className="mb-0">{day.name}</h4>
                    </div>
                  );
                })}
              </div>
            </div> */}
            <FormGroup className="mt-2">
              <Label for="exampleText" className="font-weight-bold">
                <Label>Shift notes</Label>
              </Label>
              <Input name="text" type="textarea" onChange={(e) => setShiftNote(e.target.value)} />
              <Label className="mt-1">
                Let the employee know any important details about this shift.
              </Label>
            </FormGroup>
          </div>
          <div className="d-flex justify-content-end">
            <Button color="danger" onClick={toggle}>
              Cancel
            </Button>
            <Button
              color="primary"
              className="ms-1"
              onClick={() => {
                saveShiftClickHandler();
              }}
            >
              Save
            </Button>
          </div>
        </ModalBody>
      </Modal>
      <Modal
        isOpen={openUpdateModal}
        toggle={updateModalToggle}
        centered
        style={{ maxWidth: '45%' }}
      >
        <ModalHeader toggle={updateModalToggle}>
          <h3>Update Current Shift</h3>
        </ModalHeader>
        <ModalBody>
          <div>
            <div className="d-flex ">
              <div className="me-1">
                <Label>Shift Name</Label>
                <Input
                  type="text"
                  defaultValue={shiftName}
                  onChange={(e) => {
                    setShiftName(e.target.value);
                  }}
                />
              </div>
              <div>
                <Label>Start Time</Label>
                <Input
                  type="time"
                  value={shiftStartTime}
                  onChange={(e) => {
                    setShiftStartTime(e.target.value);
                  }}
                />
              </div>
              <div className="ms-1">
                <Label>End Time</Label>
                <Input
                  type="time"
                  value={shiftEndTime}
                  onChange={(e) => {
                    setShiftEndTime(e.target.value);
                  }}
                />
              </div>
            </div>

            {/* <div className="mt-3">
              <h4 className="font-medium-3">Apply To</h4>
              <div className="d-flex justify-content-between mt-1">
                {weekDay.map((day, index) => {
                  return (
                    <div
                      key={'day-' + index}
                      className={classnames(
                        'schedule-weekday cursor-pointer d-flex align-items-center justify-content-center',
                        {
                          active: shiftInitialWeekDay == index
                        }
                      )}
                      onClick={(e) => scheduleWeekdayClick(e, index)}
                    >
                      <h4 className="mb-0">{day.name}</h4>
                    </div>
                  );
                })}
              </div>
            </div> */}
            <FormGroup className="mt-2">
              <Label for="exampleText" className="font-weight-bold">
                <Label>Shift notes</Label>
              </Label>
              <Input
                name="text"
                type="textarea"
                defaultValue={shiftNote}
                value={shiftNote}
                onChange={(e) => setShiftNote(e.target.value)}
              />
              <Label className="mt-1">
                Let the employee know any important details about this shift.
              </Label>
            </FormGroup>
          </div>
          <div className="d-flex justify-content-end">
            <Button color="danger" onClick={updateModalToggle}>
              Cancel
            </Button>
            <Button color="primary" className="ms-1" onClick={updateShiftClickHandler}>
              Update
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

export default ShiftTable;
