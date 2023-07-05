import React from 'react'

export default function useColumns() {
    const options = {
        chart: {
            sparkline: {
                enabled: false
            },
        },

        widht: 800,
        colors: ['#FF0000'],
        plotOptions: {
            radialBar: {
                offsetY: 0,
                startAngle: -120,
                endAngle: 200,
                hollow: {
                    size: '40%',
                },
                dataLabels: {
                    name: {
                        show: false
                    },
                    value: {
                        show: true,
                        color: 'red',
                        fontFamily: 'Montserrat',
                        fontSize: '1em',
                        fontWeight: '600',
                        offsetY: 4,
                    },

                }
            }
        },
        stroke: {
            lineCap: 'round'
        },
    }
    
    const series = [83]


  return (
    <div>useColumns</div>
  )
}
