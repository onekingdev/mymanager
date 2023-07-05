// ** Third Party Components
import classnames from 'classnames'
import { TrendingUp, Box, DollarSign, FileText } from 'react-feather'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    CardText,
    Row,
    Col
} from 'reactstrap'
import { Fragment } from 'react'

export default function StatsCard({cols}) {
   
  return (
   
    <Fragment>
        <Row>
            <Col {...cols}>
            <Card>
                <CardBody className="statistics-body text-center">
                    <Avatar
                    color='light-primary'
                    content={<TrendingUp size={24}/>}
                    />
                
                        <div className="my-auto">
                            <h4 className="fw-bolder mb-0">5</h4>
                            <CardText className="font-small-3 mb-0">
                            Sub Goals
                            </CardText>
                        </div>
                </CardBody>
            </Card>
            </Col>
            <Col {...cols}>
            <Card>
                <CardBody className="statistics-body text-center">
                <Avatar
                    color='light-primary'
                    content={<FileText size={24}/>}
                    />
                        <div className="my-auto">
                            <h4 className="fw-bolder mb-0">5/45</h4>
                            <CardText className="font-small-3 mb-0">
                            STREAK
                            </CardText>
                        </div>
                </CardBody>
            </Card>
            </Col>
           <Col {...cols}>
           <Card>
                <CardBody className="statistics-body text-center">
                <Avatar
                    color='light-danger'
                    content={<Box size={24}/>}
                    />
                        <div className="my-auto">
                            <h4 className="fw-bolder mb-0">70%</h4>
                            <CardText className="font-small-3 mb-0">
                            Current Streak
                            </CardText>
                        </div>
                </CardBody>
            </Card>
           </Col>
            <Col {...cols}>
            <Card>
                <CardBody className="statistics-body text-center">
                <Avatar
                    color='light-success'
                    content={<DollarSign size={24}/>}
                    />
                        <div className="my-auto">
                            <h4 className="fw-bolder mb-0">44</h4>
                            <CardText className="font-small-3 mb-0">
                            Best Streak
                            </CardText>
                        </div>
                </CardBody>
            </Card>
            </Col>
        </Row>
    </Fragment>
  )
}
