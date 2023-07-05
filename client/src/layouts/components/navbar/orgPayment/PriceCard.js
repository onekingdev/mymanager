import React from 'react'
import { Button, Card, CardBody, CardText, Col, ListGroup, ListGroupItem } from 'reactstrap'

export default function PriceCard({item,isYearly,CreateSubscription}) {
  return (
    <Col>
        <Card>
           <CardBody>
           <h3>{item.name}</h3>
            <CardText>{item.description}</CardText>
            <ListGroup tag='ul' className='list-group-circle text-start mb-2'>
                {item.benefits.map((benefit, i) => (
                  <ListGroupItem key={i} tag='li'>
                    {benefit}
                  </ListGroupItem>
                ))}
              </ListGroup>
              <small className='text-muted'>USD {isYearly? `${item.pricePerYear} /Year`:`${item.pricePerMonth} /Month`} </small>
              <Button block outline color='primary' onClick={()=>CreateSubscription(isYearly)}>
                Select
              </Button>
           </CardBody>
        </Card>
    </Col>
  )
}
