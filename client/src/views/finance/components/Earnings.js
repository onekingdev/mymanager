// ** Third Party Components
import Chart from 'react-apexcharts'
import { useSelector } from 'react-redux'
// ** Reactstrap Imports
import { Card, CardTitle, CardText, CardBody, Row, Col } from 'reactstrap'

import ApexDonutChart from '../income/ApexDonutChart'

const Earnings = ({ type, total, filtered_list, upgradePercent,labels,series,maxCategory  }) => {
    const colorData = [
        { hex: '#7367f0', color: 'primary' },
        { hex: '#82868b', color: 'secondary' },
        { hex: '#28c76f', color: 'success' },
        { hex: '#ea5455', color: 'danger' },
        { hex: '#ff9f43', color: 'warning' },
        { hex: '#00cfe8', color: 'info' },
        { hex: '#a0a0d0', color: 'light-primary' },
        { hex: '#a0a0a0', color: 'light-secondary' },
        { hex: '#90d0b0', color: 'light-success' },
        { hex: '#d08080', color: 'light-danger' },
        { hex: '#ffc0a0', color: 'light-warning' },
        { hex: '#40e0ff', color: 'light-info' }
    ];

    const allCategoryLists = useSelector((state) => state.finance.categoryList ?? []);
    const allCategoryByIncome = allCategoryLists.filter((ca) => ca.type === "income").map((item) => {
        if (filtered_list.filter((li) => li.categoryId._id === item._id).length) {
        return  { ...item, amount: filtered_list.filter((li) => li.categoryId._id === item._id)
            .map((list) => list.amount)
            .reduce((prev, current) => {
            return prev + current;
        }, 0)}
        }
        return { ...item, amount: 0}
    });

    //donut chart data

    const donutColors = allCategoryByIncome.map((item) => item.labelColor).map((li) => colorData.filter((list) => list.color === li)[0].hex);
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
        labels: allCategoryByIncome.map((item) => item.title),
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
                                return `${parseInt(val)} %`
                            }
                        },
                        total: {
                            show: true,
                            offsetY: 15,
                            label: `${maxCategory?.percent || 0} %`,
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
    }

    return (
        <Card
         className="earnings-card">
            <CardBody>
                <Row>
                    <Col xs="6">
                        <CardTitle className="mb-1">{type==='income'?'Income':'Expense'}</CardTitle>
                        <div className="font-small-2">This Month</div>
                        <h5 className="mb-1">${total}</h5>
                        <CardText className="text-muted font-small-2">
                            <span className="fw-bolder">{upgradePercent}</span>
                            <span> more {type==='income'?'incomes':'expense'} than last month.</span>
                        </CardText>
                    </Col>
                    <Col xs="6">
                        {/* <ApexDonutChart
                            heading="Expense Proportion"
                            subheading="Total Expenses - $1234"
                            label={donutlabel}
                            data={donutdata}
                        /> */}

                        <Chart options={options} series={allCategoryByIncome.map((item) => item.amount)} type='donut' height={120} />
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}

export default Earnings
