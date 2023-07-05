import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button, Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { getFormDataAction, getFormEntryDetailsAction } from '../../../store/action';

export default function ContactDetails({ row, open, toggle }) {

  return (
    <Modal isOpen={open} toggle={toggle} size="xl">
      <ModalHeader>Form Details</ModalHeader>
      <ModalBody>
        <Row>
          <Col md="4">
            <div className="d-flex justify-content-between">
              <span>Name</span>
              <span>{row?.formData?.fullName}</span>
            </div>
          </Col>
          <Col md="4" className="border-start border-end">
            <div className="d-flex justify-content-between">
              <span>Email</span>
              <span>{row?.formData?.email}</span>
            </div>
          </Col>
          <Col md="4">
            <div className="d-flex justify-content-between">
              <span>Phone</span>
              <span>{row?.formData?.phone}</span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md="4">
            <div className="d-flex justify-content-between">
              <span>Date Of Birth</span>
              <span>{row?.formData?.dob}</span>
            </div>
          </Col>
          <Col md="4" className="border-start border-end">
            {row?.formData?.survey && row?.formData?.survey.length > 0 && (
              <div className="d-flex justify-content-between">
                <span>Suevey</span>
                <span>{row?.formData?.survey[0]?.value}</span>
              </div>
            )}
          </Col>
          <Col md="4">
            {/* show waiver */}

            {row?.formData?.sugnature && row?.formData?.sugnature.length > 0 && (
              <div className="d-flex justify-content-between">
                <span>Signature</span>

                <img src={row?.formData?.signature[0]?.url} className="w-75" />
              </div>
            )}
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <div className="d-flex justify-content-between">
              <span>Address</span>
              <span>
                {row?.formData?.address?.street},{row?.formData?.address?.city},
                {row?.formData?.address?.state},{row?.formData?.address?.country},
                {row?.formData?.address?.zipCode}
              </span>
            </div>
          </Col>
          <Col md="6" className="border-start border-end">
            <div className="d-flex justify-content-between">
              <span>Shipping Address</span>
              <span>
                {row?.formData?.shippingAddress?.street},{row?.formData?.shippingAddress?.city},
                {row?.formData?.shippingAddress?.state},{row?.formData?.shippingAddress?.country},
                {row?.formData?.shippingAddress?.zip}
              </span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <div className="d-flex justify-content-between">
              <span>Contact Address</span>

              <span>
                {row?.formData?.contactAddress?.street},{row?.formData?.contactAddress?.city},
                {row?.formData?.contactAddress?.state},{row?.formData?.contactAddress?.country},
                {row?.formData?.contactAddress?.zip}
              </span>
            </div>
          </Col>
          <Col md="6">
            <div className="d-flex justify-content-between">
              <span>Billing Address</span>

              <span>
                {row?.formData?.billingAddress?.street},{row?.formData?.billingAddress?.city},
                {row?.formData?.billingAddress?.state},{row?.formData?.billingAddress?.country},
                {row?.formData?.billingAddress?.zip}
              </span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <span>Payment Method</span>
            <span>{row?.formData?.paymentMethod?.cardType}</span>
            <br />
            <span>{row?.formData?.paymentMethod?.isPrimary}</span>
            <br />
            <span>{row?.formData?.paymentMethod?.cardHolder}</span>
            <br />
            <span>{row?.formData?.paymentMethod?.cardNumber}</span>
            <br />
            <span>{row?.formData?.paymentMethod?.expiryDate}</span>
          </Col>
          <Col md="6"></Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <div className="d-flex justify-content-end">
          <Button color="primary">Download</Button>
        </div>
      </ModalFooter>
    </Modal>
  );
}
