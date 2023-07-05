// ** Reactstrap Imports
import moment from 'moment';
import { Card, CardBody, CardText, Row, Col, Table } from 'reactstrap';
import { convertDate } from '../../../goals/helpers/converters';
import Logo from '../../../../assets/images/logo/logo.png';

const PreviewCard = ({ data}) => {
  return data !== null ? (
    <Card className="invoice-preview-card"  id="printable" >
      <CardBody className="invoice-padding pb-0" style={{overflowY:"auto"}}>
        {/* Header */}
        <div className="d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0" >
          <div>
            <div className="logo-wrapper">
              {data?.logoUrl ? (
                <img src={data?.logoUrl} style={{ width: '45px' }} />
              ) : (
                <img src={Logo} alt="logo" />
              )}

              <h3 className="text-primary invoice-logo">{data?.companyName==='undefined'? 'MyManager': data?.companyName}</h3>
            </div>
            <CardText className="mb-25">
              {' '}
              {(data?.companyAddress?.street !== '' && data?.companyAddress?.street ) ||
                ''}
            </CardText>
            <CardText className="mb-25">
              {(data?.companyAddress?.city !== '' && data?.companyAddress?.city ) ||
                ''}{' '}
               {(data?.companyAddress?.state !== '' && data?.companyAddress?.state)  || ''}{' '}
              {(data?.companyAddress?.zipCode !== '' && data?.companyAddress?.zipCode ) || ''}{' '}
              {data?.companyAddress?.country || ''}
            </CardText>
            <CardText className="mb-0">
              {(data?.phone !== '' && data?.phone !== 'undefined' && data?.phone )  || ''}{' '}
              {((data?.alternatePhone !== '' && data?.alternatePhone !== 'undefined') && data?.alternatePhone) || ''}
            </CardText>
          </div>
          <div className="mt-md-0 mt-2">
            <h4 className="invoice-title">
              Invoice
              <span className="invoice-number">#{data?.no}</span>
            </h4>
            <div className="invoice-date-wrapper">
              <p className="invoice-date-title">Date Issued:</p>
              <p className="invoice-date">{moment(data?.date).format('MM/DD/YYYY')}</p>
            </div>
            <div className="invoice-date-wrapper">
              <p className="invoice-date-title">Due Date:</p>
              <p className="invoice-date">{moment(data?.dueDate).format('MM/DD/YYYY')}</p>
            </div>
          </div>
        </div>
        {/* /Header */}
      </CardBody>

      <hr className="invoice-spacing" />

      {/* Address and Contact */}
      <CardBody className="invoice-padding pt-0">
        <Row className="invoice-spacing">
        <Col className="p-0" xl="8">
           <h6 className="mb-2">Invoice To:</h6>
           <h6 className="mb-25">{data?.customerId?.fullName}</h6>
           <CardText className="mb-25">{data?.customerId?.company}</CardText>
           <CardText className="mb-25">{data?.customerId?.address?.street}</CardText>
           <CardText className="mb-25">{data?.customerId?.phone}</CardText>
           <CardText className="mb-0">{data?.customerId?.email}</CardText>
         </Col>
          <Col className="p-0 mt-xl-0 mt-2" xl="4">
            <h6 className="mb-2">Payment Details:</h6>
            <table>
              <tbody>
                <tr>
                  <td className="pe-1">Total Due:</td>
                  <td>
                    <span className="fw-bold">$ {parseFloat(data?.totalAmount) + parseFloat(data?.tax || 0) - parseFloat(data?.discount || 0) - parseFloat(data?.paidAmount || 0) }</span>
                  </td>
                </tr>
                <tr>
                  <td className="pe-1">PAY NOW:</td>
                  <td>
                    <span className="fw-bold">$ {data?.payNow? data?.payNow :  parseFloat(data?.totalAmount) + parseFloat(data?.tax || 0) - parseFloat(data?.discount || 0) - parseFloat(data?.paidAmount || 0) }</span>
                  </td>
                </tr>
               {
                data?.bank?.name && (
                 <>
                  <tr>
                  <td className="pe-1">Bank name:</td>
                  <td>{data?.bank?.name}</td>
                </tr>
                <tr>
                  <td className="pe-1">Country:</td>
                  <td>{data?.bank?.country}</td>
                </tr>
                {data?.bank?.routing && (
                  <tr>
                  <td className="pe-1">Routing #:</td>
                  <td>{data?.bank?.routing}</td>
                </tr>
                )}
                {data?.bank?.accountNo && (
                  <tr>
                  <td className="pe-1">Account #:</td>
                  <td>{data?.bank?.accountNo}</td>
                </tr>
                )}
                {data?.bank?.iban && (
                  <tr>
                  <td className="pe-1">IBAN:</td>
                  <td>{data?.bank?.iban}</td>
                </tr>
                )}
                {data?.bank?.swift && (
                 <tr>
                 <td className="pe-1">SWIFT code:</td>
                 <td>{data?.bank?.swift}</td>
               </tr>
                )}
                
                 </>
                )
               }
              </tbody>
            </table>
          </Col>
        </Row>
      </CardBody>
      {/* /Address and Contact */}

      {/* Invoice Description */}
      <Table responsive>
        <thead>
          <tr>
            <th className="py-1">Items</th>
            <th className="py-1">Rate</th>
            <th className="py-1">Count</th>
            <th className="py-1">Total</th>
          </tr>
        </thead>
        <tbody>
          {data?.items.map((item, i) => {
            return (
              <tr key={i}>
                <td className="py-1">
                  <p className="card-text fw-bold mb-25">{item?.name}</p>
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
      {/* /Invoice Description */}

      {/* Total & Sales Person */}
      <CardBody className="invoice-padding pb-0">
        <Row className="invoice-sales-total-wrapper">
          <Col className="mt-md-0 mt-3" md="6" order={{ md: 1, lg: 2 }}>
            <CardText className="mb-0">
              <span className="fw-bold">Salesperson:</span>{' '}
              <span className="ms-75">{data?.salesperson}</span>
             {data?.payments?.length > 0 && (<>
              <h6>Payments</h6>
                <ul>
                  {data?.payments?.map((x,idx)=>{
                 
                    return <li key={idx}>{x.currency} {x.amount} paid by {x.paymentMethod} on {convertDate(x.date)} {x.paymentMethod==='cheque' && (<span>No. ({x.chequeNo})</span>)} </li>
                  })}
                </ul>
             </>)}
            </CardText>
          </Col>
          <Col className="d-flex justify-content-end" md="6" order={{ md: 2, lg: 1 }}>
            <div className="invoice-total-wrapper">
              <div className="invoice-total-item">
                <p className="invoice-total-title">Subtotal:</p>
                <p className="invoice-total-amount">{`$ ${data?.totalAmount}`}</p>
              </div>
              <div className="invoice-total-item">
                <p className="invoice-total-title">Discount:</p>
                <p className="invoice-total-amount">{`- $ ${data?.discount}`}</p>
              </div>
              <div className="invoice-total-item">
                <p className="invoice-total-title">Tax:</p>
                <p className="invoice-total-amount">{`+ $ ${data?.tax}`}</p>
              </div>
              <hr className="my-50" />
              <div className="invoice-total-item">
                <p className="invoice-total-title">Total:</p>
                <p className="invoice-total-amount">$ {parseFloat(data?.totalAmount) + parseFloat(data?.tax || 0) - parseFloat(data?.discount || 0)  }</p>
              </div>
            </div>
          </Col>
        </Row>
      </CardBody>
      {/* /Total & Sales Person */}

      <hr className="invoice-spacing" />

      {/* Invoice Note */}
      <CardBody className="invoice-padding pt-0">
        <Row>
          <Col sm="12">
            <span className="fw-bold">Note: </span>
            <span>{data?.note}</span>
          </Col>
        </Row>
      </CardBody>
      {/* /Invoice Note */}
    </Card>
  ) : null;
};

export default PreviewCard;
