// ** Third Party Components
import Chart from 'react-apexcharts';

// ** Reactstrap Imports
import { Card, CardTitle, CardText, CardBody, Row, Col } from 'reactstrap';

import ApexDonutChart from './ApexDonutChart';
import { useEffect, useState } from 'react';

const Earnings = ({ total,totalAll,totalPercent,labels,series,maxCategory }) => {
  //donut chart data
  
 

  const donutColors = ['#ffe700', '#00d4bd', '#826bf8', '#2b9bf4', '#FFA1A1'];
  const options = {
    chart: {
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: { show: false },
    comparedResult: [2, -3, 8],
    labels: labels,
    stroke: { width: 0 },
    colors: donutColors,
    // colors: ['#28c76f66', '#28c76f33', success],
    grid: {
      padding: {
        right: -20,
        bottom: -8,
        left: -20
      }
    },
    plotOptions: {
      pie: {
        startAngle: -10,
        donut: {
          labels: {
            show: true,
            name: {
              offsetY: 15
            },
            value: {
              offsetY: -15,
              formatter(val) {
                return `${parseInt(val)} %`;
              }
            },
            total: {
              show: true,
              offsetY: 15,
              label: `${maxCategory?.percent} %`,
              formatter() {
                return maxCategory?.title
              }
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 1325,
        options: {
          chart: {
            height: 100
          }
        }
      },
      {
        breakpoint: 1200,
        options: {
          chart: {
            height: 120
          }
        }
      },
      {
        breakpoint: 1065,
        options: {
          chart: {
            height: 100
          }
        }
      },
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 120
          }
        }
      }
    ]
  };

  
  return (
    <Card className="earnings-card">
      <CardBody>
        <Row>
          <Col xs="6">
            <CardTitle className="mb-1">Profit & Loss</CardTitle>
            <div className="font-small-2">This Month</div>
            <h5 className="mb-1">${Number(total).toFixed(2)}</h5>
            <CardText className="text-muted font-small-2">
              <span className="fw-bolder">{Number(totalPercent).toFixed(2)>=0?Number(totalPercent).toFixed(2): -1 * Number(totalPercent).toFixed(2)}%</span>
              <span> more {totalPercent>=0?'profit':'expence'} than last month.</span>
            </CardText>
          </Col>
          <Col xs="6">

            <Chart options={options} series={series} type="donut" height={120} />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default Earnings;
