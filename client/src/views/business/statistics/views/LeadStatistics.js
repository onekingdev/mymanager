import React, { useState } from 'react';
import { Card, CardBody, CardHeader, CardTitle, InputGroup, Table } from 'reactstrap';
import SampleData from '../SampleData';
import LeadProgramStatistics from '../chart/LeadProgramChart';
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


const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec'
];

function DataTables(props) {
  const [filtervalue, setFiltervalue] = useState();
  const [lastYear, setLastYear] = useState();
  const totalMonthlyCounts = new Array(13).fill(0);

  return (
    <>
      <Card className="mb-2">
        <CardHeader>
          <CardTitle className="w-100">
            <div className="d-flex justify-content-between w-100">
              <div>Lead Statistics</div>
              <div>
                <InputGroup className="d-flex justify-content-end input-group-merge p-0 font-small-4">
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
          <LeadProgramStatistics />
          <Table bordered className="main-table-wrapper mt-1">
            <tbody>
              <tr>
                <th>Source</th>
                {months?.map((month) => {
                  return <th key={month}>{month}</th>;
                })}
                <th>Total</th>
              </tr>
              {SampleData.map((row) => (
                <tr key={row.id}>
                  <td style={{ background: 'rgb(115, 103, 240)', color: '#fff' }}>{row.name}</td>
                  {months.map((month) => (
                    <td key={month}>{row[month.toLowerCase()]}</td>
                  ))}
                  <td>
                    {Object.values(row)
                      .slice(2)
                      .reduce((a, b) => a + b, 0)}
                  </td>
                </tr>
              ))}

              <tr>
                <th style={{ background: 'rgb(115, 103, 240)', color: '#fff' }}>Total</th>
                {months?.map((month, index) => {
                  const columnTotal = SampleData.reduce(
                    (total, row) => total + row[month.toLowerCase()],
                    0
                  );
                  totalMonthlyCounts[index] = columnTotal;
                  return <td key={month}>{columnTotal}</td>;
                })}
                <td>{totalMonthlyCounts.reduce((acc, count) => acc + count, 0)}</td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </>
  );
}

export default DataTables;
