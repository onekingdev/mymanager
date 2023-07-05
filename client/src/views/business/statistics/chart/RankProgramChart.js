import React, { useRef, useState } from 'react';
import {
  Card,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row
} from 'reactstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';
import DataTable from 'react-data-table-component';
import { mockData } from '../mock';
import moment from 'moment';

const CustomTooltip = ({ active, payload, label, tableData }) => {
  if (active && payload && payload.length) {
    const dataKey = payload[0].dataKey;
    if (dataKey === 'join.count') {
      const data = mockData.filter((d) => d.join.count > 0 && d.month === label + 1);
      const joinData = data?.flatMap((d) => d.join.data);
      tableData.current = joinData;
    } else if (dataKey === 'quite.count') {
      const data = mockData.filter((d) => d.quite.count > 0 && d.month === label + 1);
      const quiteData = data.flatMap((d) => d.quite.data);
      tableData.current = quiteData;
    }
  }

  return null;
};
const Chart = ({ active, payload, label }) => {
  const [state, setState] = useState(false);
  const [filteredData, setFilteredData] = useState(mockData);
  const [selectedJoinOption, setSelectedJoinOption] = useState('All');
  const [selectedMonthOption, setSelectedMonthOption] = useState('All');
  const [selectedYearOption, setSelectedYearOption] = useState('All');
  const [selectedDataKey, setSelectedDataKey] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const tableData = useRef([]);

  const monthName = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const [selectedMonths, setSelectedMonths] = useState();
  const [selectYears, setSelectedYears] = useState();

  const columns = [
    {
      name: 'Program Name',
      selector: 'pName',
      sortable: false,
      minWidth: '188px',
      selector: (row) => row.pName,
      cell: (row) => <span className="text-capitalize">{row?.pName}</span>
    },
    {
      name: 'Category',
      sortable: true,
      minWidth: '138px',
      sortField: 'category',
      selector: (row) => row.category,
      cell: (row) => <span className="text-capitalize">{row?.category}</span>
    },
    {
      name: 'Quantity',
      sortable: false,
      selector: (row) => row.qty,
      cell: (row) => <span className="text-capitalize">{row.qty}</span>
    }
  ];

  const handleClick = (dataKey, label) => {
    setSelectedDataKey(dataKey);
    setSelectedMonths(monthName[label]);

    // Filter data based on selected data key and month
    let filteredData = [];
    if (dataKey === 'join.count') {
      filteredData = mockData.filter((d) => d.join.count > 0 && d.month === label + 1);
      const joinData = filteredData?.flatMap((d) => d.join.data);
      const joinYear = joinData.length > 0 ? joinData[0].year : '';
      tableData.current = joinData;
      setSelectedYears(joinYear);
    } else if (dataKey === 'quite.count') {
      filteredData = mockData.filter((d) => d.quite.count > 0 && d.month === label + 1);
      const quiteData = filteredData.flatMap((d) => d.quite.data);
      const quoteYear = quiteData.length > 0 ? quiteData[0].year : '';
      tableData.current = quiteData;
      setSelectedYears(quoteYear);
    }
  };

  const toggleModal = (dataKey, payload, label) => {
    setIsOpen(!isOpen);
    if (payload) {
      setSelectedMonths(monthName[payload.payload.month]);
      setSelectedYears(payload.payload.join?.data[0]?.year);
    }
  };

  const handleJoinOptionChange = (event) => {
    const selectedOption = event.target.value;
    let filteredData = [];

    if (selectedOption === 'All') {
      filteredData = mockData;
    } else if (selectedOption === 'Join') {
      filteredData = mockData.filter((d) => d.join.count > 0);
    } else if (selectedOption === 'Not Join') {
      filteredData = mockData.filter((d) => d.quite.count > 0);
    }

    if (selectedMonthOption !== 'All') {
      filteredData = filteredData.filter((d) => d.month === selectedMonthOption);
    }

    if (selectedYearOption !== 'All') {
      filteredData = filteredData.filter((d) => d.year === selectedYearOption);
    }

    setFilteredData(filteredData);
    setSelectedJoinOption(selectedOption);
  };

  const handleMonthOptionChange = (event) => {
    const selectedOption = event.target.value;
    let filteredData = [];

    if (selectedOption === 'All') {
      filteredData = mockData;
    } else {
      filteredData = mockData.filter((d) => d.month === selectedOption);
    }

    if (selectedJoinOption !== 'All') {
      if (selectedJoinOption === 'Join') {
        filteredData = filteredData.filter((d) => d.join.count > 0);
      } else if (selectedJoinOption === 'Not Join') {
        filteredData = filteredData.filter((d) => d.quite.count > 0);
      }
    }

    if (selectedYearOption !== 'All') {
      filteredData = filteredData.filter((d) => d.year === selectedYearOption);
    }

    setFilteredData(filteredData);
    setSelectedMonthOption(selectedOption);
  };

  const handleYearOptionChange = (event) => {
    const selectedOption = event.target.value;
    let filteredData = [];

    if (selectedOption === 'All') {
      filteredData = mockData;
    } else {
      filteredData = mockData.filter((d) => d.year === selectedOption);
    }

    if (selectedJoinOption !== 'All') {
      if (selectedJoinOption === 'Join') {
        filteredData = filteredData.filter((d) => d.join.count > 0);
      } else if (selectedJoinOption === 'Not Join') {
        filteredData = filteredData.filter((d) => d.quite.count > 0);
      }
    }

    if (selectedMonthOption !== 'All') {
      filteredData = filteredData.filter((d) => d.month === selectedMonthOption);
    }

    setFilteredData(filteredData);
    setSelectedYearOption(selectedOption);
  };

  return (
    <Card className="p-1 mb-0" style={{ height: '77vh' }}>
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <div>
            <h5 style={{ marginTop: '10px' }}>Rank Statistics</h5>
          </div>
          {/* <div style={{ marginLeft: '20px' }}>
            <Input
              id="exampleSelect"
              name="select"
              type="select"
              value={selectedJoinOption}
              onChange={handleJoinOptionChange}
            >
              <option value="All">All</option>
              <option value="Join">Join</option>
              <option value="Not Join">Not Join</option>
            </Input>
          </div>
          <div style={{ marginLeft: '10px' }}>
            <Input
              id="exampleSelect"
              name="select"
              type="select"
              value={selectedMonthOption}
              onChange={handleMonthOptionChange}
            >
              <option value="All">All</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </Input>
          </div> */}
          {/* <div style={{ marginLeft: '10px' }}>
            <Input
              id="exampleSelect"
              name="select"
              type="select"
              value={selectedYearOption}
              onChange={handleYearOptionChange}
            >
              <option value="All">All</option>
              <option value="2021">2023</option>
              <option value="2021">2024</option>
              <option value="2021">2025</option>
            </Input>
          </div> */}
        </div>
        <div className="d-flex justify-content-end">
          <div>
            <FormGroup switch>
              <Input
                type="switch"
                checked={state}
                onClick={() => {
                  setState(!state);
                }}
              />
              <Label check>Enable Table view</Label>
            </FormGroup>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <BarChart
          width={1020}
          height={520}
          data={filteredData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            height={40}
            type="category"
            dataKey="month"
            tickFormatter={(month) => {
              const monthNames = [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
              ];
              return monthNames[month - 1];
            }}
            angle={-40}
            interval={0}
            textAnchor="end"
            axisLine={false}
            offset={4}
            tickMargin={1}
          >
            <Label position="insideBottom" offset={-10}>
              <span style={{ fontSize: '0.8em' }}>Month</span>
            </Label>
          </XAxis>
          <YAxis />
          <Tooltip
            eventTypes={['click']}
            content={
              <CustomTooltip
                onClick={(dataKey, label) => {
                  setSelectedDataKey(dataKey);
                  setSelectedMonths(label);
                }}
                tableData={tableData}
              />
            }
            cursor={{ fill: 'transparent' }}
          />
          <Legend />
          <Bar
            barSize={15}
            dataKey="join.data.length"
            fill="#0184ff"
            fillOpacity={1}
            name="Lead"
            isTooltipActive={true}
            onClick={(event, payload) => {
              setSelectedDataKey('join.count');
              handleClick('join.count', payload);
              toggleModal();
            }}
          />
          {/* <Bar
            barSize={10}
            dataKey="quite.data.length"
            fill="#ff2929"
            fillOpacity={1}
            name="Not Join"
            isTooltipActive={true}
            onClick={(event, payload) => {
              setSelectedDataKey('quite.count');
              handleClick('quite.count', payload);
              toggleModal();
            }}
          /> */}
        </BarChart>
      </div>
      <Modal
        isOpen={selectedDataKey !== null}
        toggle={() => {
          setSelectedDataKey(null);
          setSelectedMonths(null);
          setSelectedYears(null);
          tableData.current = [];
        }}
        size={'lg'}
        centered
      >
        <CardHeader className="d-flex justify-content-between">
          <h4>
            {selectedMonths} {selectYears}
          </h4>
          {/* <div className="d-flex">
            <h4 style={{ marginRight: '10px', marginTop: '5px' }}>
              {selectedDataKey?.split('.')[0].replace('_', ' ')}
              {console.log(selectedDataKey?.split('.')[0].replace('_', ' '))}
            </h4>
            <div className="table-rating">
              <span>{tableData.current.length}</span>
            </div>
          </div> */}
        </CardHeader>
        <ModalBody>
        <div className="react-dataTable" style={{ height: 'auto', maxHeight: "100%"}}>
            <DataTable
              columns={columns}
            //   data={tableData.current}
              pagination
              className="react-dataTable"
              paginationResetDefaultPage={true}
              paginationPerPage={5}
              paginationRowsPerPageOptions={[5, 10, 15]}
              noHeader
            />
          </div>
        </ModalBody>
      </Modal>
    </Card>
  );
};

export default Chart;
