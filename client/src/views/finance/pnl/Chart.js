// ** Third Party Components
import Chart from 'react-apexcharts';

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardSubtitle, Input } from 'reactstrap';

const ApexBarChart = ({  direction, subheading,profit,expense,gross,year,setYear }) => {
  // ** Chart Options
  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '80%',
        borderRadius: [10]
      }
    },
    grid: {
      xaxis: {
        lines: {
          show: false
        }
      }
    },
    colors: ['#00bd54', '#DA291A', '#00800000'],
    dataLabels: {
      enabled: false
    },
    tooltip: {
      shared: true,
      intersect: false
    },

    xaxis: {
      categories: [
        'JANUARY',
        'FEBRUARY',
        'MARCH',
        'APRIL',
        'MAY',
        'JUNE',
        'JULY',
        'AUGUST',
        'SEPTEMBER',
        'OCTOBER',
        'NOVEMBER',
        'DECEMBER'
      ]
    },
    yaxis: {
      opposite: direction === 'rtl'
    }
  };

  const years = ['Year', 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];

  // ** Chart Series
  const series = [
    {
      name: 'Gross',
      data: gross
    },
    {
      name: 'Expense',
      data: expense
    },
    {
      name: 'Profit',
      data: profit
    }
  ];

  return (
    <Card>
      <div className="d-flex align-items-center justify-content-between p-1">
        <h5>{subheading}</h5>
        <Input type="select" style={{ height: '35px', width: '100px' }} onChange={(e)=>setYear(e.target.value)} value={year}>
          {years.map((item) => {
            return <option value={item}>{item}</option>;
          })}
        </Input>
      </div>
      <div>
        <Chart options={options} series={series} type="bar" height={450} />
      </div>
    </Card>
  );
};

export default ApexBarChart;
