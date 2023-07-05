import React, { Fragment, useEffect, useState } from 'react';
import '@styles/react/libs/react-select/_react-select.scss';
import DataTable from 'react-data-table-component';
import { ChevronDown } from 'react-feather';
import ReactPaginate from 'react-paginate';
import { Button, Card, Col, Row, Table } from 'reactstrap';
import Logo from '../../../../assets/images/logo/logo.png';
import { Link, useParams } from 'react-router-dom';
import { getsinsgleinvoice } from '../../../../requests/invoice/invoice';
import moment from 'moment';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { convertDate } from '../../../goals/helpers/converters';


const OpenInvoice = () => {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const handlePagination = (page) => {
    setCurrentPage(page.selected);
  };

  const { id } = useParams();

  const getdata = async () => {
    const fetdata = await getsinsgleinvoice(id);
    
    setData(fetdata);
  };

  useEffect(() => {
    if (id) {
      getdata();
    }
  }, [id]);

  const handleDownload = () => {
    html2canvas(document.querySelector('#printable')).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      var imgWidth = 210;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;
      var doc = new jsPDF('p', 'mm');
      var position = 10; // give some top padding to first page

      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position += heightLeft - imgHeight; // top padding for other pages
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      doc.save(`invoice-${data?.no}.pdf`);
    });
  };

  return (
    <Fragment>
      <div className="">
        <Card>
          <Row className="">
            <Col sm={4} md={4} lg={4}>
              <div className="ms-1 pb-1">
                <img src={Logo} style={{ width: '250px' }} alt="logo" />
              </div>
            </Col>
            <Col sm={4} md={4} lg={4}>
              <div className="pt-2">
                <h3>This invoice is powered by mymanager.com</h3>
              </div>
            </Col>
            <Col sm={4} md={4} lg={4}>
              <div className="pt-2 d-flex justify-content-end ">
                <Button outline>Login</Button>
                <Button outline className="mx-1">
                  Sign Up
                </Button>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
      {data && (
        <div className="p-2" >
        <Row className="mx-2">
          <Col sm={9} md={9} lg={9} id='printable'>
            <Card className="p-2 mb-4">
              <div style={{ borderBottom: '1px solid #ebe9f1' }}>
                <Row className="mb-1">
                  <Col sm={6} md={6} lg={6}>
                    <div className="ms-1 d-flex justify-content-start">
                      {data?.logoUrl ? (
                        <img src={data?.logoUrl} style={{ width: '45px' }} />
                      ) : (
                        <img src={Logo} alt="logo" />
                      )}
                      <h3 className="text-primary invoice-logo my-auto ms-50">
                        {data?.companyName === 'undefined' ? 'MyManager' : data?.companyName}
                      </h3>
                    </div>
                    <div className="ms-2 mt-1">
                      <p className="mb-25">
                        {(data?.companyAddress?.street !== '' && data?.companyAddress?.street) ||
                          ''}
                      </p>
                      <p className="mb-25">
                        {(data?.companyAddress?.city !== '' && data?.companyAddress?.city) ||
                          ''}{' '}
                     
                        {(data?.companyAddress?.state !== '' && data?.companyAddress?.state) ||
                          ''}{' '}
                        {(data?.companyAddress?.zipCode !== '' && data?.companyAddress?.zipCode) ||
                          ''}
                         {data?.companyAddress?.country || ''}
                      </p>
                      <p className="mb-0">
                        {(data?.phone !== '' && data?.phone !== 'undefined' && data?.phone) ||
                          ''}
                        {' '}
                        {(data?.alternatePhone !== '' &&
                          data?.alternatePhone !== 'undefined' &&
                          data?.alternatePhone) ||
                          ''}
                      </p>
                    </div>
                  </Col>
                  <Col sm={6} md={6} lg={6}>
                    <div className="d-flex justify-content-end mt-4">
                      <div className="ms-2 mt-2">
                        <h4 className="fw-bold text-end mb-1">INVOICE #{data?.no}</h4>
                        <div className="invoice-date-wrapper mb-50">
                          <span className="invoice-date-title">Date Issued:</span>
                          <span className="fw-bold">
                            {' '}
                            {moment(data?.date).format('MM/DD/YYYY')}
                          </span>
                        </div>
                        <div className="invoice-date-wrapper">
                          <span className="invoice-date-title">Due Date:</span>
                          <span className="fw-bold ms-2">
                            {moment(data?.dueDate).format('MM/DD/YYYY')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className=" ms-2 mt-3">
                <Row className="pb-2">
                  <Col sm="6">
                    <h6 className="mb-1">Invoice To:</h6>
                    <p className="mb-25">{data?.customerId?.fullName}</p>
                    <p className="mb-25">{data.customerId?.company}</p>
                    <p className="mb-25">{data.customerId?.address?.street}</p>
                    <p className="mb-25">{data.customerId?.phone}</p>
                    <p className="mb-0">{data.customerId?.email}</p>
                  </Col>
                  <Col className="mt-sm-0 mt-2" sm="6">
                    <div className="d-flex justify-content-center">
                      <div>
                        <h6 className="mb-1">Payment Details:</h6>
                        <table>
                          <tbody>
                            <tr>
                              <td className="pe-1">Total Due:</td>
                              <td>
                                <strong>
                                  ${' '}
                                  {parseFloat(data?.totalAmount) +
                                    parseFloat(data?.tax || 0) -
                                    parseFloat(data?.discount || 0) -
                                    parseFloat(data?.paidAmount || 0)}
                                </strong>
                              </td>
                            </tr>
                            <tr>
                              <td className="pe-1">PAY NOW:</td>
                              <td>
                                <span className="fw-bold">
                                  ${' '}
                                  {data?.payNow
                                    ? data?.payNow
                                    : parseFloat(data?.totalAmount) +
                                      parseFloat(data?.tax || 0) -
                                      parseFloat(data?.discount || 0) -
                                      parseFloat(data?.paidAmount || 0)}
                                </span>
                              </td>
                            </tr>
                            {data?.bank?.name && (
                              <>
                                <tr>
                                  <td className="pe-1">Bank name:</td>
                                  <td>{data?.bank?.name}</td>
                                </tr>
                                <tr>
                                  <td className="pe-1">Country:</td>
                                  <td>{data?.bank?.country}</td>
                                </tr>
                                <tr>
                                  <td className="pe-1">IBAN:</td>
                                  <td>{data?.bank?.iban}</td>
                                </tr>
                                <tr>
                                  <td className="pe-1">SWIFT code:</td>
                                  <td>{data?.bank?.swift}</td>
                                </tr>
                              </>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="mx-2">
                <Table responsive>
                  <thead>
                    <tr>
                      <th className="py-1">Items</th>
                      <th className="py-1">Rate</th>
                      <th className="py-1">Quantity</th>
                      <th className="py-1">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.items.map((item, i) => {
                      return (
                        <tr key={i}>
                          <td className="py-1">
                            <p className="card-text fw-bold mb-25">
                              {item?.name}
                            </p>
                            <p className="card-text text-nowrap">{item?.description}</p>
                          </td>
                          <td className="py-1">
                            <span className="fw-bold">{item?.rate}</span>
                          </td>
                          <td className="py-1">
                            <span className="fw-bold">{item?.quantity}</span>
                          </td>
                          <td className="py-1">
                            <span className="fw-bold">{item?.rate * item?.quantity}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
              <div className="mx-2">
                <Row className="mt-3">
                  <Col className="mt-3">
                    <p className="mb-0">
                      <span className="fw-bold">Salesperson:</span>{' '}
                      <span className="ms-75">{data?.salesperson}</span>
                    </p>
                    {data?.payments?.length > 0 && (<>
              <h6>Payments</h6>
                <ul>
                  {data?.payments?.map((x,idx)=>{
                 
                    return <li key={idx}>{x.currency} {x.amount} paid by {x.paymentMethod} on {convertDate(x.date)} {x.paymentMethod==='cheque' && (<span>No. ({x.chequeNo})</span>)} </li>
                  })}
                </ul>
             </>)}
                  </Col>
                  <Col className="d-flex justify-content-center">
                    <div className="mb-2">
                      <div className="d-flex ps-1 ">
                        <p className=" my-0">Subtotal:</p>
                        <p className="ms-1 my-0">{`$ ${data?.totalAmount}`}</p>
                      </div>
                      <div className="d-flex ps-1 my-0">
                        <p className=" my-0">Discount:</p>
                        <p className="ms-1 my-0">{`- $ ${data?.discount}`}</p>
                      </div>
                      <div className="d-flex ps-1 my-0">
                        <p className="me-1 mt-0">Tax:</p>
                        <p className=" ms-3 mt-0">{`+ $ ${data?.tax}`}</p>
                      </div>
                      {/* <hr className="my-50" /> */}
                      <div style={{ borderTop: '1px solid #ebe9f1' }} className="d-flex ps-1">
                        <strong className=" mt-1">Total:</strong>
                        <strong className="ms-1 mt-1">$ {parseFloat(data?.totalAmount) + parseFloat(data?.tax || 0) - parseFloat(data?.discount || 0) }</strong>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              <div style={{ borderTop: '1px solid #ebe9f1' }}>
                <div className="mt-2 ms-2">
                  <span className="fw-bold">Note:</span>
                  <span>
                  {data?.note}
                  </span>
                </div>
              </div>
            </Card>
          </Col>
          <Col sm={3} md={3} lg={3}>
            <Card className="p-2">
              <Button outline onClick={handleDownload}>Download</Button>
              <Button outline className="my-1" to={`/invoice/print/${id}`} target="_blank" tag={Link}>
                Print
              </Button>
              
              {data?.payNow>0 && (<Button color="success" tag={Link} to={`/payment/invoice/${id}`}>Pay Now</Button>)}
            </Card>
          </Col>
        </Row>
      </div>
      )}
    </Fragment>
  );
};
export default OpenInvoice;
