// ** React Imports
import { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  InputGroup,
  InputGroupText,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

// ** Icons Import
import { Calendar, MoreVertical } from 'react-feather';

// ** Third Party Components
import Flatpickr from 'react-flatpickr';

// ** Components
import ListTabs from './ListTabs';
import BasicTimeline from './BasicTimeline';
import { useDispatch, useSelector } from 'react-redux';

// ** Style
import '@src/assets/styles/task-reporting.scss';
import ChartView from './ChartView';
import QRcode from './QRcode';
// ** Action
// import { fetchTaskListAction } from './store/action';

const Tasks = (props) => {
  const [selectedWorkingCheckList, setSelectedWorkingCheckList] = useState(null);
  const [taskTab, setTaskTab] = useState('today');
  const [openQrcodeModal, setOpenQrcodeModal] = useState(false);
  const [openBarcodeModal, setOpenBarcodeModal] = useState(false);

  const today = new Date().toLocaleDateString();
  const [datePicker, setDatePicker] = useState(today);

  // const dispatch = useDispatch();

  const buildProps = {
    ...props,
    selectedWorkingCheckList,
    setSelectedWorkingCheckList,
    setTaskTab,
    taskTab,
    selectDate: datePicker,
    today
  };

  useEffect(() => {
    setSelectedWorkingCheckList(null);
  }, [datePicker]);

  const { userData } = useSelector((state) => state.auth);

  return (
    <Fragment>
      <Row className="task-report">
        <Col xl={{ order: 0, size: 3 }} lg="3" md="4" sm="12" className="leftside">
          <Row>
            <Col xl="6" lg="10" md="10" sm="10" xs="10" style={{ marginTop: '5px' }}>
              <h3>Task Reporting</h3>
            </Col>
            <Col xl="6" lg="12" md="12" sm="6" className="d-flex justify-content-end">
              {userData?.role !== 'employee' && (
                // <Link to="/manage-task">
                <Link className="task-reporting-link" to="/manage-task" color="#555555">
                  <Button color="primary">Manage Tasks</Button>
                </Link>
              )}
            </Col>

            <Col>
              <div style={{ padding: '0.5rem' }}>Select Date</div>
              <InputGroup
                className="d-flex input-group-merge select-day-checklist"
                style={{ float: 'right', minWidth: '145px' }}
              >
                <Flatpickr
                  value={datePicker}
                  data-enable-time
                  id="date-time-picker"
                  className="form-control"
                  onChange={(date) => {
                    setDatePicker(date[0].toLocaleDateString());
                  }}
                  options={{
                    // mode: 'range',
                    dateFormat: 'm-d-Y',
                    // maxDate: 'today',
                    enableTime: false
                  }}
                />
                <InputGroupText>
                  <Calendar size={16} />
                </InputGroupText>
              </InputGroup>
            </Col>
          </Row>
          <Row className="list-tabs">
            <ListTabs {...buildProps} />
          </Row>
        </Col>
        <Col
          xl={{ order: 1, size: 6 }}
          lg="6"
          md="8"
          sm="12"
          style={{ padding: 0, height: '100%' }}
        >
          <BasicTimeline {...buildProps} />
        </Col>
        <Col xl={{ order: 2, size: 3 }} lg="3" md="12" sm="12" className="rightside">
          <ChartView {...buildProps} />
        </Col>
        <QRcode isOpen={openQrcodeModal} setIsOpen={setOpenQrcodeModal} />
        {/* <div className="leftside">
        <div className="mb-2 d-flex justify-content-end align-items-center">
          {userData?.role !== 'employee' && (
            <Link to="/manage-task">
              <Button color="primary" style={{ width: '150px', marginInlineEnd: '60px' }}>
                Manage Tasks
              </Button>
            </Link>
          )}
          <div>
            <InputGroup
              className="d-flex input-group-merge select-day-checklist"
              style={{ float: 'right', maxWidth: '145px' }}
            >
              <Flatpickr
                value={datePicker}
                data-enable-time
                id="date-time-picker"
                className="form-control"
                onChange={(date) => {
                  setDatePicker(date[0].toLocaleDateString());
                }}
                options={{
                  // mode: 'range',
                  dateFormat: 'm-d-Y',
                  maxDate: 'today',
                  enableTime: false
                }}
              />
              <InputGroupText>
                <Calendar size={16} />
              </InputGroupText>
            </InputGroup>
          </div>
        </div>
        <div className="list-tabs">
          <ListTabs {...buildProps} />
        </div>
      </div>
      <div className="basic-time-line">
        <BasicTimeline {...buildProps} />
      </div>
      <div className="rightside">
        <ChartView {...buildProps} />
      </div> */}

        {/* <Fragment>
        <Row style={{ padding: '1rem 0 0 0' }}>
          <Col lg="4" md="4" sm="12" style={{ margin: 0 }}>
            {userData?.role !== 'employee' && (
              <div className="mb-2 d-flex justify-content-between align-items-center">
                <Link to="/manage-task">
                  <Button color="primary">Manage Tasks</Button>
                </Link>
                <MoreVertical className="cursor-pointer" size={16} />
              </div>
            )}
            <div className="list-tabs">
              <ListTabs {...buildProps} />
            </div>
          </Col>
          <Col lg="8" md="8" sm="12" style={{ margin: 0 }}>
            <div className="basic-time-line">
              <BasicTimeline {...buildProps} />
            </div>
          </Col>
        </Row>
      </Fragment> */}
      </Row>
    </Fragment>
  );
};

export default Tasks;
