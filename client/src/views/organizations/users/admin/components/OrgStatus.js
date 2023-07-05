import React from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle } from 'reactstrap'

import Chart from 'react-apexcharts'

export default function OrgStatus({cols}) {


const options = {
    chart: {
      sparkline: {
        enabled: false
      },
    },
    colors: ['#51e5a8'],
    plotOptions: {
      radialBar: {
        offsetY: -20,
        startAngle: -180,
        endAngle: 180,
        hollow: {
          size: '60%',
        },
        dataLabels: {
          name: {
            show: false
          },
          value: {
            color: 'red',
            fontFamily: 'Montserrat',
            fontSize: '1.5rem',
            fontWeight: '600',
            offsetY: 0,
          },
  
        }
      }
    },
    stroke: {
      lineCap: 'round'
    },
  },
  series = [83]
  return (
    <Card className="card-statistics">
    <CardHeader>
      <CardTitle tag="h4">Organization Status</CardTitle>
    </CardHeader>
    <CardBody className="statistics-body">
      <div className='d-flex justify-content-between'>
        <div>
          <Button color='danger'>{'DeActivate'}</Button>
        </div>
        <Chart options={options} series={series} type='radialBar' height={150} />
      </div>
    </CardBody>
  </Card>
  )
}
