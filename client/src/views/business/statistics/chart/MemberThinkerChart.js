import React, { useRef, useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  FormGroup,
  Input,
  InputGroup,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row
} from 'reactstrap';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer
} from 'recharts';
import DataTable from 'react-data-table-component';
import { mockData } from '../mock';
import { selectThemeColors } from '../../../../utility/Utils';
import Select from 'react-select';

import moment from 'moment';

const monthOption = [
  { value: '', label: 'All' },
  { value: 'January', label: 'January' },
  { value: 'February', label: 'February' },
  { value: 'March', label: 'March' },
  { value: 'April', label: 'April' },
  { value: 'May', label: 'May' },
  { value: 'June', label: 'June' },
  { value: 'July', label: 'July' },
  { value: 'August', label: 'August' },
  { value: 'September', label: 'September' },
  { value: 'October', label: 'October' },
  { value: 'November', label: 'November' },
  { value: 'December', label: 'December' }
];

const yearOption = [
  { value: '', label: 'All' },
  { value: '2023', label: '2023' },
  { value: '2024', label: '2024' },
  { value: '2025', label: '2025' },
  { value: '2026', label: '2026' },
  { value: '2027', label: '2027' },
  { value: '2028', label: '2028' },
  { value: '2029', label: '2029' },
  { value: '2030', label: '2030' },
  { value: '2031', label: '2031' },
  { value: '2032', label: '2032' },
  { value: '2033', label: '2033' },
  { value: '2034', label: '2034' }
];

const joinOption = [
  { value: '', label: 'All' },
  { value: 'Join', label: 'Join' },
  { value: 'Not Join', label: 'Not Join' }
];

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
  const [filtervalue, setFiltervalue] = useState();
  const [lastOption, setLastOption] = useState();
  const [lastYear, setLastYear] = useState();
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
      name: 'Full Name',
      selector: 'fullName',
      sortable: false,
      minWidth: '188px',
      selector: (row) => row.firstName,
      cell: (row) => (
        <span className="text-capitalize">
          {row?.firstName} {row?.lastName}
        </span>
      )
    },
    {
      name: 'Program',
      sortable: true,
      minWidth: '138px',
      sortField: 'program',
      selector: (row) => row.program,
      cell: (row) => <span className="text-capitalize">{row?.program}</span>
    },
    {
      name: 'Join Date',
      sortable: false,
      selector: (row) => row.Date,
      cell: (row) => {
        const originalDate = row.Date;
        const date = new Date(originalDate);
        const formattedDate = date.toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric'
        });
        return <span className="text-capitalize">{formattedDate}</span>;
      }
    },
    {
      name: 'Membership Type',
      selector: 'studentType',
      sortable: false,
      minWidth: '200px',
      selector: (row) => row.studentType,
      cell: (row) => <span className="text-capitalize">{row?.studentType}</span>
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

  return (
    <Card className="overflow-hidden" style={{ height: '77vh' }}>
      <CardHeader>
        <CardTitle className="w-100">
          <div className="d-flex justify-content-between w-100">
            <div>Contact Statistics</div>
            <div>
              <InputGroup className="d-flex justify-content-end input-group-merge p-0 font-small-4">
                <Select
                  theme={selectThemeColors}
                  isClearable={false}
                  className="p-0 me-1"
                  classNamePrefix="select"
                  options={joinOption}
                  value={lastOption}
                  styles={{
                    control: (baseStyles) => ({
                      ...baseStyles,
                      minWidth: '120px'
                    })
                  }}
                />
                <Select
                  theme={selectThemeColors}
                  isClearable={false}
                  className="p-0 me-1"
                  classNamePrefix="select"
                  options={monthOption}
                  value={filtervalue}
                  styles={{
                    control: (baseStyles) => ({
                      ...baseStyles,
                      minWidth: '120px'
                    })
                  }}
                />
                <Select
                  theme={selectThemeColors}
                  isClearable={false}
                  className="p-0"
                  classNamePrefix="select"
                  options={yearOption}
                  value={lastYear}
                  styles={{
                    control: (baseStyles) => ({
                      ...baseStyles,
                      minWidth: '120px'
                    })
                  }}
                />
              </InputGroup>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardBody>
        <ResponsiveContainer>
          <BarChart
            height={500}
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
              name="Join"
              isTooltipActive={true}
              onClick={(event, payload) => {
                setSelectedDataKey('join.count');
                handleClick('join.count', payload);
                toggleModal();
              }}
            />
            <Bar
              barSize={15}
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
            />
          </BarChart>
        </ResponsiveContainer>
      </CardBody>
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
          <div className="d-flex">
            <h4 style={{ marginRight: '10px', marginTop: '5px' }}>
              {selectedDataKey?.split('.')[0].replace('_', ' ')}
              {console.log(selectedDataKey?.split('.')[0].replace('_', ' '))}
            </h4>
            <div className="table-rating">
              <span>{tableData.current.length}</span>
            </div>
          </div>
        </CardHeader>
        <ModalBody>
        <div className="react-dataTable" style={{ height: 'auto', maxHeight: "100%"}}>
            <DataTable
              columns={columns}
              data={tableData.current}
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
