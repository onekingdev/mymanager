// ** React Imports
import { useEffect, useState } from 'react';
import moment from 'moment';

// ** Reactstrap Imports
import { Row, Col, Table } from 'reactstrap';

// ** Styles
import '@styles/base/pages/app-invoice-print.scss';
import { useParams } from 'react-router-dom';
import { getsinsgleinvoice } from '../../../../requests/invoice/invoice';


const Print = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  const getdata = async () => {
    const fetdata = await getsinsgleinvoice(id);
    setData(fetdata?.data);
  };

  // ** Print on mount
  useEffect(() => {
    if(id){
      getdata();
    }
  }, [id]);
  useEffect(() => {
    if (data !== null) {
      setTimeout(() => window.print(), 100);
    }
  }, [data]);


  return (
    <>
      {data !== null && (
        <div className="invoice-print p-3" id="pageContainer">
          <div className="d-flex justify-content-between flex-md-row flex-column pb-2">
            <div>
              <div className="d-flex mb-1">
                {data?.logoUrl ? (
                  <img src={data?.logoUrl} style={{ width: '45px' }} />
                ) : (
                  <svg viewBox="0 0 139 95" version="1.1" height="24">
                    <defs>
                      <linearGradient
                        id="invoice-linearGradient-1"
                        x1="100%"
                        y1="10.5120544%"
                        x2="50%"
                        y2="89.4879456%"
                      >
                        <stop stopColor="#000000" offset="0%"></stop>
                        <stop stopColor="#FFFFFF" offset="100%"></stop>
                      </linearGradient>
                      <linearGradient
                        id="invoice-linearGradient-2"
                        x1="64.0437835%"
                        y1="46.3276743%"
                        x2="37.373316%"
                        y2="100%"
                      >
                        <stop stopColor="#EEEEEE" stopOpacity="0" offset="0%"></stop>
                        <stop stopColor="#FFFFFF" offset="100%"></stop>
                      </linearGradient>
                    </defs>
                    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                      <g transform="translate(-400.000000, -178.000000)">
                        <g transform="translate(400.000000, 178.000000)">
                          <path
                            className="text-primary"
                            d="M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z"
                            style={{ fill: 'currentColor' }}
                          ></path>
                          <path
                            d="M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z"
                            fill="url(#invoice-linearGradient-1)"
                            opacity="0.2"
                          ></path>
                          <polygon
                            fill="#000000"
                            opacity="0.049999997"
                            points="69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325"
                          ></polygon>
                          <polygon
                            fill="#000000"
                            opacity="0.099999994"
                            points="69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338"
                          ></polygon>
                          <polygon
                            fill="url(#invoice-linearGradient-2)"
                            opacity="0.099999994"
                            points="101.428699 0 83.0667527 94.1480575 130.378721 47.0740288"
                          ></polygon>
                        </g>
                      </g>
                    </g>
                  </svg>
                )}

                <h3 className="text-primary fw-bold ms-1">
                  {data?.companyName === 'undefined' ? 'MyManager' : data?.companyName}
                </h3>
              </div>
              <p className="mb-25">
                {(data?.companyAddress?.street !== '' && data?.companyAddress?.street) ||
                  ''}
              </p>
              <p className="mb-25">
                {(data?.companyAddress?.city !== '' && data?.companyAddress?.city) ||
                  ''}{' '}
                {(data?.companyAddress?.state !== '' && data?.companyAddress?.state) || ''}
                {(data?.companyAddress?.zipCode !== '' && data?.companyAddress?.zipCode) || ''}
               {data?.companyAddress?.country || ''}
              </p>
              <p className="mb-0">
                {(data?.phone !== '' && data?.phone) || ''}
                {(data?.alternatePhone !== '' && data?.alternatePhone) || ''}
              </p>
            </div>
            <div className="mt-md-0 mt-2">
              <h4 className="fw-bold text-end mb-1">INVOICE #{data?.no}</h4>
              <div className="invoice-date-wrapper mb-50">
                <span className="invoice-date-title">Date Issued:</span>
                <span className="fw-bold"> {moment(data?.date).format('MM/DD/YYYY')}</span>
              </div>
              <div className="invoice-date-wrapper">
                <span className="invoice-date-title">Due Date:</span>
                <span className="fw-bold">{moment(data?.dueDate).format('MM/DD/YYYY')}</span>
              </div>
            </div>
          </div>

          <hr className="my-2" />
          <div className='d-flex justify-content-between'>
            <div>
            <h6 className="mb-1">Invoice To:</h6>
              <p className="mb-25">{data?.customerId?.fullName}</p>
              <p className="mb-25">{data?.customerId?.company}</p>
              <p className="mb-25">{data?.customerId?.address?.street}</p>
              <p className="mb-25">{data?.customerId?.contact}</p>
              <p className="mb-0">{data?.customerId?.email}</p>
            </div>
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
                      <strong>$ {parseFloat(data?.payNow)}</strong>
                    </td>
                  </tr>
                  {data?.bank && (<>
                    <tr>
                    <td className="pe-1">Bank name:</td>
                    <td>{data?.bank?.name}</td>
                  </tr>
                  <tr>
                    <td className="pe-1">Country:</td>
                    <td>{data?.companyAddress?.country}</td>
                  </tr>
                  <tr>
                    <td className="pe-1">IBAN:</td>
                    <td>{data?.bank?.iban}</td>
                  </tr>
                  <tr>
                    <td className="pe-1">Routing #:</td>
                    <td>{data?.bank?.routing}</td>
                  </tr>
                  <tr>
                    <td className="pe-1">Account No:</td>
                    <td>{data?.bank?.accountNo}</td>
                  </tr>
                  </>)}
                </tbody>
              </table>
            </div>
          </div>
          

          <Table className="mt-2 mb-0" responsive>
            <thead>
              <tr>
                <th className="py-1 ps-4">Items</th>
                <th className="py-1">Rate</th>
                <th className="py-1">Count</th>
                <th className="py-1">Total</th>
              </tr>
            </thead>
            <tbody>
              {data?.items.map((item, i) => {
                return (
                  <tr key={i}>
                    <td className="py-1 ps-4">
                      <p className="fw-semibold mb-25">
                        {item?.name}
                      </p>
                      <p className="text-muted text-nowrap">{item?.description}</p>
                    </td>
                    <td className="py-1">
                      <strong>{item?.rate}</strong>
                    </td>
                    <td className="py-1">
                      <strong>{item?.quantity}</strong>
                    </td>
                    <td className="py-1">
                      <strong>{parseFloat(item?.rate) * parseFloat(item?.quantity)}</strong>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>

          <Row className="invoice-sales-total-wrapper mt-3">
            <Col className="mt-md-0 mt-3" md="6" order={{ md: 1, lg: 2 }}>
              <p className="mb-0">
                <span className="fw-bold">Salesperson:</span>{' '}
                <span className="ms-75">{data?.salesperson}</span>
              </p>
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
                  <p className="invoice-total-amount">
                    ${' '}
                    {parseFloat(data?.totalAmount) +
                      parseFloat(data?.tax || 0) -
                      parseFloat(data?.discount || 0) -
                      parseFloat(data?.paidAmount || 0)}
                  </p>
                </div>
              </div>
            </Col>
          </Row>

          <hr className="my-2" />

          <Row>
            <Col sm="12">
              <span className="fw-bold">Note:</span>
              <span>{data?.note}</span>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default Print;
