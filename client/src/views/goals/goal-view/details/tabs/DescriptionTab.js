import React from 'react'
import { Card, CardBody, Input, Label } from 'reactstrap'

export default function DescriptionTab() {
  return (
    <Card>
        <CardBody>
            <Label>Vision</Label>
            <Input type='text' disabled />
            <Label>Purpose</Label>
            <Input type='text' disabled />
            <Label>Obstacles</Label>
            <Input type='text' disabled />
            <Label>Resources</Label>
            <Input type='text' disabled />
        </CardBody>
    </Card>
  )
}
