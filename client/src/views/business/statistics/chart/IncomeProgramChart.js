import React, { useState } from 'react';
import { useRef } from 'react';
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
  Row
} from 'reactstrap';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

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

// const CustomTooltip = ({ active, payload, label, tableData }) => {
//   if (active && payload && payload.length) {
//     const dataKey = payload[0].dataKey;
//     if (dataKey === 'join.count') {
//       const data = mockData.filter((d) => d.join.count > 0 && d.month === label + 1);
//       const joinData = data?.flatMap((d) => d.join.data);
//       tableData.current = joinData;
//     } else if (dataKey === 'quite.count') {
//       const data = mockData.filter((d) => d.quite.count > 0 && d.month === label + 1);
//       const quiteData = data.flatMap((d) => d.quite.data);
//       tableData.current = quiteData;
//     }
//   }
//   return null;
// };

const IncomeProgramChart = () => {
  const [filtervalue, setFiltervalue] = useState();
  const [lastOption, setLastOption] = useState();
  const [lastYear, setLastYear] = useState();
  const tableData = useRef([]);

  const data = [
    { key: 1, name: 'BeltOne', uv: 100, pv: 100, amt: 100 },
    { key: 2, name: 'BeltTwo', uv: 180, pv: 180, amt: 180 },
    { key: 3, name: 'BeltThree', uv: 110, pv: 110, amt: 100 },
    { key: 4, name: 'BeltFour', uv: 110, pv: 110, amt: 100 },
    { key: 5, name: 'BeltFive', uv: 110, pv: 110, amt: 100 },
    { key: 6, name: 'BeltSix', uv: 110, pv: 110, amt: 100 },
    { key: 7, name: 'BeltSeven', uv: 110, pv: 110, amt: 100 },
    { key: 8, name: 'BeltEight', uv: 110, pv: 110, amt: 100 }
  ];

  return (
    <Card className="overflow-hidden" style={{ height: '77vh' }}>
      <CardHeader>
        <CardTitle className="w-100">
          <div className="d-flex justify-content-between w-100">
            <div>Program Statistics</div>
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
      <BarChart width={1000} height={520} data={data}>
          <XAxis dataKey="name" stroke="#8884d8" />
          <YAxis />
          <Tooltip cursor={{ fill: 'transparent' }} />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Bar dataKey="uv" fill="#8884d8" barSize={30} />
        </BarChart>
      </CardBody>
    </Card>
  );
};

export default IncomeProgramChart;
