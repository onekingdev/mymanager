import React, { useEffect, useState } from 'react'
import { Mail, PhoneCall } from 'react-feather'
import { Card, CardBody, Col, Row } from 'reactstrap'

import axios from 'axios'
import Faqs from './Faqs';

export default function Faq({store,dispatch}) {
    const [data,setData] = useState(null);

    const getFAQData = query => {
        return axios.get('/faq/data', { params: { q: query } }).then(response => {
          setData(response.data)
        })
      }

      useEffect(() => {
        getFAQData('')
      }, [])
  return (
    <>
    {data !== null ? <Faqs data={data}  /> : null}
    <div className='faq-contact'>
      <Row className='mt-5 pt-75'>
        <Col className='text-center' sm='12'>
          <h2>You still have a question?</h2>
          <p className='mb-3'>
            If you cannot find a question in our FAQ, you can always contact us. We will answer to you shortly!
          </p>
        </Col>
        <Col sm='6'>
          <Card className='text-center faq-contact-card shadow-none py-1'>
            <CardBody>
              <div className='avatar avatar-tag bg-light-primary mb-2 mx-auto'>
                <PhoneCall size={18} />
              </div>
              <h4>+ (810) 2548 2568</h4>
              <span className='text-body'>We are always happy to help!</span>
            </CardBody>
          </Card>
        </Col>
        <Col sm='6'>
          <Card className='text-center faq-contact-card shadow-none py-1'>
            <CardBody>
              <div className='avatar avatar-tag bg-light-primary mb-2 mx-auto'>
                <Mail size={18} />
              </div>
              <h4>hello@help.com</h4>
              <span className='text-body'>Best way to get answer faster!</span>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
    </>
  )
}
