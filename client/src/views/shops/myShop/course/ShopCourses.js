import React from 'react'
import CourseCards from './components/CourseCards'
import { Col, Row } from 'reactstrap'

export default function ShopCourses({ store,courses, dispatch }) {
    return (
        <>

            <Row className='ecommerce-application'>
                {courses?.map((x, idx) => {
                    return (
                        <Col md="4" key={idx} >
                            <CourseCards store={store} item={x} />
                        </Col>
                    )
                })}

            </Row>
        </>
    )
}
