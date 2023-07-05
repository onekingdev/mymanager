import { Card, CardHeader, CardBody, Label, Row, Col } from 'reactstrap';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  LabelList,
  ReferenceLine,
  Cell
} from 'recharts';
import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import Avatar from '../../../../@core/components/avatar';
import { DollarSign, Plus } from 'react-feather';
import { Media, MediaObject } from 'reactstrap';
import { FaChartBar, FaChartPie, FaDollarSign, FaShoppingCart } from 'react-icons/fa';
import { selectThemeColors } from '@utils';
import Select from 'react-select';

const TabCategory = ['orders', 'sales', 'profit', 'income'];

const tabData = [
  {
    type: 'Income',
    avatarIcon: 'tabler:shopping-cart',
    backgroundColor: 'light-warning',
    color: 'warning',
    series: [{ data: [28, 10, 45, 38, 15, 30, 35, 28, 8, 0, 0, 0] }]
  },
  {
    type: 'Leads',
    avatarIcon: 'tabler:chart-bar',
    backgroundColor: 'light-success',
    color: 'success',
    series: [{ data: [35, 25, 15, 40, 42, 25, 48, 8, 30, 0, 0, 0] }]
  },
  {
    type: 'Clients',
    avatarIcon: 'tabler:currency-dollar',
    backgroundColor: 'light-primary',
    color: 'primary',
    series: [{ data: [10, 22, 27, 33, 42, 32, 27, 22, 8, 0, 0, 0] }]
  },
  {
    type: 'Contracts',
    avatarIcon: 'tabler:chart-pie-2',
    backgroundColor: 'light-danger',
    color: 'danger',
    series: [{ data: [5, 9, 12, 18, 20, 25, 30, 36, 48, 0, 0, 0] }]
  }
];

const hexToRGBA = (hex, alpha) => {};

const renderTabs = (value, handleChange) => {
  return tabData.map((item, index) => {
    let icon;
    switch (item.avatarIcon) {
      case 'tabler:shopping-cart':
        icon = <FaShoppingCart style={{ color: 'warning' }} size={18} />;
        break;
      case 'tabler:chart-bar':
        icon = <FaChartBar style={{ color: 'success' }} size={18} />;
        break;
      case 'tabler:currency-dollar':
        icon = <FaDollarSign style={{ color: 'primary' }} size={18} />;
        break;
      case 'tabler:chart-pie-2':
        icon = <FaChartPie style={{ color: 'danger' }} size={18} />;
        break;
      default:
        icon = null;
    }
    const RenderAvatar = item.type === value ? Avatar : Avatar;

    return (
      <div>
        <NavItem key={index} className="dashboard-earning-tab">
          <NavLink
            className={item.type === value ? 'active' : ''}
            onClick={() => handleChange(item.type)}
          >
            <div
              style={{
                width: 110,
                height: 94,
                borderWidth: 1,
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                borderRadius: '10px',
                justifyContent: 'center',
                borderStyle: item.type === value ? 'solid' : 'dashed'
                // borderColor: item.type === value ? 'primary' : 'divider'
              }}
            >
              <div
                style={{
                  marginBottom: 2,
                  backgroundColor: `${item.backgroundColor} !important`,
                  color: `${item.color} !important`,
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {React.cloneElement(icon, { style: { color: item.color } })}
              </div>
              <div
                style={{
                  fontWeight: 500,
                  color: 'text.secondary',
                  textTransform: 'capitalize'
                }}
              >
                {item.type}
              </div>
            </div>
          </NavLink>
        </NavItem>
      </div>
    );
  });
};

const renderTabPanels = (value) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const isMobile = window.innerWidth <= 768; // Check if the screen size is mobile

  return tabData.map((item, index) => {
    const max = Math.max(...item.series[0].data);
    const seriesIndex = item.series[0].data.indexOf(max);

    const finalColors = item.series[0].data.map((data, i) =>
      seriesIndex === i ? '#8884d8' : '#82ca9d'
    );

    const chartData = item.series[0].data.map((value, index) => ({
      month: getMonthLabel(index),
      value
    }));

    const chartWidth = isMobile ? window.innerWidth - 40 : 600;
    const chartHeight = isMobile ? 250 : 325;

    return (
      <TabPane key={index} tabId={item.type}>
        <BarChart width={chartWidth} height={chartHeight} data={chartData}>
          <CartesianGrid
            stroke="rgb(218 218 218)"
            strokeDasharray="0"
            horizontal={true}
            vertical={false}
          />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip cursor={{ fill: 'transparent' }} />
          {/* <Legend /> */}
          <Bar dataKey="value" barSize={30}>
            {chartData.map((entry, index) => (
              <Cell
                key={index}
                fill={entry.month === getMonthLabel(new Date().getMonth()) ? '#8696FE' : '#E3F4F4'}
              />
            ))}
            <LabelList
              dataKey="value"
              fill="#000"
              position="top"
              formatter={(value) => `${value}K`}
            />
          </Bar>
        </BarChart>
      </TabPane>
    );
  });
};

const getMonthLabel = (index) => {
  const monthLabels = [
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
  return monthLabels[index];
};

const CrmEarningReportsWithTabs = () => {
  const [value, setValue] = useState('Income');

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const colors = Array(9).fill(hexToRGBA());

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        distributed: true,
        columnWidth: '35%',
        startingShape: 'rounded',
        dataLabels: { position: 'top' }
      }
    },
    legend: { show: false },
    tooltip: { enabled: false },
    dataLabels: {
      offsetY: -15,
      formatter: (val) => `${val}k`
    },
    colors,
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    grid: {
      show: false,
      padding: {
        top: 20,
        left: -5,
        right: -8,
        bottom: -12
      }
    },
    xaxis: {
      axisTicks: { show: false },
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      labels: {}
    },
    yaxis: {
      labels: {
        offsetX: -15,
        formatter: (val) => `$${val}k`
      }
    },
    responsive: [
      {
        options: {
          plotOptions: {
            bar: { columnWidth: '60%' }
          },
          grid: {
            padding: { right: 20 }
          }
        }
      }
    ]
  };

  return (
    <Card>
      <div className="d-flex justify-content-between m-2">
        <div>
          <h4>Business Report</h4>
          <span>Yearly Business Overview</span>
        </div>
        <div>
          <div style={{ minWidth: '150px' }}>
            <Select
              className="react-select ms-1"
              classNamePrefix="select"
              theme={selectThemeColors}
              options={[
                { value: 'This Year', label: 'This Year' },
                { value: 'Last Year', label: 'Last Year' },
                { value: 'This Month', label: 'This Month' },
                { value: 'Last Month', label: 'Last Month' },
                { value: 'Yesterday', label: 'Yesterday' },
                { value: 'Today', label: 'Today' }
              ]}
            />
          </div>
        </div>
      </div>
      <CardHeader className="mb-0 mt-0">
        <Nav tabs>
          {renderTabs(value, setValue, handleChange)}
          <NavItem>
            <NavLink>
              <div
                style={{
                  width: 110,
                  height: 94,
                  borderWidth: 1,
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: '10px',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  borderStyle: 'solid'
                  // borderColor: item.type === value ? 'primary' : 'divider'
                }}
              >
                <div
                  style={{
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Plus size={18} />
                </div>
              </div>
            </NavLink>
          </NavItem>
        </Nav>
      </CardHeader>
      <CardBody className="d-flex flex-column flex-md-row justify-content-between">
        <Row>
          <Col md={9}>
            <TabContent activeTab={value}>{renderTabPanels(value, options, colors)}</TabContent>
          </Col>
          <Col md={3}>
          <Card className="border p-1" style={{ height: '120px', minWidth: '160px' }}>
            <h4 className="text-primary">Annual Income</h4>
            <h5 className="mt-1">Total</h5>
            <span>$12,200.451</span>
          </Card>
          </Col>
        </Row>
        {/* <div className="flex-grow-1 mb-3 mb-md-0"></div>{' '} */}
        {/* <div className="flex-shrink-0">
          
        </div> */}
      </CardBody>
    </Card>
  );
};

export default CrmEarningReportsWithTabs;
