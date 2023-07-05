import moment from 'moment';
import React, { useState } from 'react';
import { Calendar } from 'react-calendar';
import { BsFillTicketDetailedFill } from 'react-icons/bs';
import { FaCompress, FaEnvelope, FaSearchPlus } from 'react-icons/fa';
import { GoPrimitiveDot } from 'react-icons/go';
import { HiPrinter } from 'react-icons/hi';
import { ImDownload3 } from 'react-icons/im';
import { IoChatbubbles } from 'react-icons/io5';
import {
  Badge,
  Button,
  Card,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Table,
  UncontrolledDropdown
} from 'reactstrap';

function Schedule() {
  const [filter, setFilter] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleDateChange = (selectedDate) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(selectedDate);
      setEndDate(null);
    } else if (selectedDate >= startDate) {
      setEndDate(selectedDate);
      setModalOpen(false);
    }
  };

  const handleDropdownItemClick = (selectedOption) => {
    if (selectedOption === 'Today') {
      const today = moment();
      setStartDate(today.startOf('day'));
      setEndDate(today.endOf('day'));
    } else if (selectedOption === 'Yesterday') {
      const yesterday = moment().subtract(1, 'day');
      setStartDate(yesterday.startOf('day'));
      setEndDate(yesterday.endOf('day'));
    } else if (selectedOption === 'Last Month') {
      // Handle 'Last Month' option selection
    } else if (selectedOption === 'Custom Range') {
      handleCustomRangeClick();
    }
  };

  const handleCustomRangeClick = () => {
    setModalOpen(true);
  };

  return (
    <Card className="p-2">
      <div>
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <BsFillTicketDetailedFill size={24} style={{ color: '#174ae7' }} />
            <h4 style={{ marginLeft: '10px', fontWeight: 'bold' }}>My Units</h4>
          </div>
          <div className="">{/* <Button className="btn btn-sm">Filter</Button> */}</div>
          <div className="">
            <h4>$74,152.28</h4>
          </div>
        </div>
        <Table striped className="dashboard-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Bayside</td>
              <td>$8,79.87</td>
            </tr>
            <tr>
              <td>Forest Hill</td>
              <td>$8,79.87</td>
            </tr>
            <tr>
              <td>Flushing</td>
              <td>$8,79.87</td>
            </tr>
            <tr>
              <td>Sunnyside New</td>
              <td>$8,79.87</td>
            </tr>
            <tr>
              <td>Plainview</td>
              <td>$8,79.87</td>
            </tr>
            <tr>
              <td>Rockville Center</td>
              <td>$8,79.87</td>
            </tr>
            <tr>
              <td>Astoria</td>
              <td>$8,79.87</td>
            </tr>
            <tr>
              <td>Easr Meadow</td>
              <td>$8,79.87</td>
            </tr>
            <tr>
              <td>Brooklyn</td>
              <td>$8,79.87</td>
            </tr>
            <tr>
              <td>Chelsea</td>
              <td>$8,79.87</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              <td>$8,79.87</td>
            </tr>
          </tfoot>
        </Table>
        <div className="d-flex justify-content-between mt-2">
          <div className="d-flex dashboard-table-icons">
            <ImDownload3 size={22} />
            <HiPrinter size={22} />
            <IoChatbubbles size={22} />
            <FaEnvelope size={22} />
          </div>
          <div>
            {/* <Input
              type="date"
              value={filter}
              onChange={handleFilterChange}
              placeholder="Filter by date"
            /> */}
            <UncontrolledDropdown className="me-2" direction="down" container="body">
              <DropdownToggle caret color="primary">
                {startDate && endDate && startDate.isSame(endDate, 'day')
                  ? startDate.format('MM/DD/YYYY')
                  : startDate && endDate
                  ? `${startDate.format('MM/DD/YYYY')} to ${endDate.format('MM/DD/YYYY')}`
                  : 'Custom Range'}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => handleDropdownItemClick('Today')}>Today</DropdownItem>
                <DropdownItem onClick={() => handleDropdownItemClick('Yesterday')}>
                  Yesterday
                </DropdownItem>
                <DropdownItem onClick={() => handleDropdownItemClick('Last Month')}>
                  Last Month
                </DropdownItem>
                <DropdownItem onClick={() => handleDropdownItemClick('Custom Range')}>
                  Custom Range
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
      </div>
      <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)} centered>
        <ModalHeader toggle={() => setModalOpen(!modalOpen)}>Select Date Range</ModalHeader>
        <ModalBody>
          <Calendar
            onChange={handleDateChange}
            value={startDate && endDate ? [startDate, endDate] : null}
            selectRange={true}
          />
        </ModalBody>
      </Modal>
    </Card>
  );
}

export default Schedule;
