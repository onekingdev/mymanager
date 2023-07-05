import React from 'react'
import ProductCard from './components/ProductCard'
import { Col, Row } from 'reactstrap'

export default function ShopProducts({products,store,dispatch}) {
  return (
    <>
    
    <Row className='ecommerce-application'>
    {products?.map((x,idx)=>{
      return (
        <Col md="4" key={idx} >
        <ProductCard item={x} store={store} dispatch={dispatch}/>
        </Col>
      )
    })}
     
    </Row>
    </>
  )
}
