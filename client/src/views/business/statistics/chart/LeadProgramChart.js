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
import { leadMockData } from '../mock';

const CustomTooltip = ({ active, payload, label, tableData }) => {
  if (active && payload && payload.length) {
    const dataKey = payload[0].dataKey;
    if (dataKey === 'count') {
      const data = leadMockData.filter((d) => d.count > 0 && d.month === label + 1);
      const joinData = data?.flatMap((d) => d.data);
      tableData.current = joinData;
    }
  }
  return null;
};

const Chart = ({ active, payload, label }) => {
  const [filteredData, setFilteredData] = useState(leadMockData);
  const [selectedDataKey, setSelectedDataKey] = useState(null);
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
      selector: 'name',
      sortable: false,
      minWidth: '188px',
      selector: (row) => row.name,
      cell: (row) => <span className="text-capitalize">{row?.name}</span>
    },
    {
      name: 'Contact',
      sortable: true,
      minWidth: '138px',
      sortField: 'phone',
      selector: (row) => row.phone,
      cell: (row) => <span className="text-capitalize">{row?.phone}</span>
    },
    {
      name: 'Lead Date',
      sortable: false,
      selector: (row) => row.leadDate,
      cell: (row) => {
        const originalDate = row.leadDate;
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
      name: 'Lead Type',
      selector: 'leadName',
      sortable: false,
      minWidth: '200px',
      selector: (row) => row.leadName,
      cell: (row) => <span className="text-capitalize">{row?.leadName}</span>
    }
  ];

  const handleClick = (dataKey, label) => {
    setSelectedDataKey(dataKey);
    setSelectedMonths(monthName[label]);

    // Filter data based on selected data key and month
    let filteredData = [];
    if (dataKey === 'count') {
      filteredData = leadMockData.filter((d) => d.count > 0 && d.month === label + 1);
      const joinData = filteredData?.flatMap((d) => d.data);
      const joinYear = joinData.length > 0 ? joinData[0].year : '';
      tableData.current = joinData;
      setSelectedYears(joinYear);
    }
  };

  return (
    <>
      <BarChart
        width={1020}
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
          dataKey="data.length"
          fill="#0184ff"
          fillOpacity={1}
          name="Lead"
          isTooltipActive={true}
          onClick={(event, payload) => {
            setSelectedDataKey('count');
            handleClick('count', payload);
            toggleModal();
          }}
        />
      </BarChart>
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
    </>
  );
};

export default Chart;
