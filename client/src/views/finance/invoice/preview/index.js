// ** React Imports
import { useEffect, useRef, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';

// ** Third Party Components
import axios from 'axios';

// ** Reactstrap Imports
import { Row, Col, Alert, Button } from 'reactstrap';

// ** Invoice Preview Components
import PreviewCard from './PreviewCard';
import PreviewActions from './PreviewActions';
import AddPaymentSidebar from '../shared-sidebar/SidebarAddPayment';
import SendInvoiceSidebar from '../shared-sidebar/SidebarSendInvoice';
import { getsinsgleinvoice } from '../../../../requests/invoice/invoice';
// ** Styles
import '@styles/base/pages/app-invoice.scss';
import { data } from 'jquery';
import BreadCrumbs from '../../../../@core/components/breadcrumbs';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const InvoicePreview = () => {
  // ** HooksVars
  const { id } = useParams();
  const history = useHistory();
  const [data, setData] = useState(null);
  const [sendSidebarOpen, setSendSidebarOpen] = useState(false);
  const [addPaymentOpen, setAddPaymentOpen] = useState(false);

  // ** Functions to toggle add & send sidebar
  const toggleSendSidebar = () => setSendSidebarOpen(!sendSidebarOpen);
  const toggleAddSidebar = () => setAddPaymentOpen(!addPaymentOpen);
  const getdata = async () => {
    const data = await getsinsgleinvoice(id);
    setData(data);
  };
  // ** Get invoice on mount based on id
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

  const handleBackButtonClick = () => {
    history.goBack(); // Go back to the previous page
  };


  return (
    <>
      {data !== null ? (
        <div className="invoice-preview-wrapper w-100">
          <Row>
            <Col md={11} className='invoice-child-header-wrapper'>
              <BreadCrumbs
                breadCrumbTitle="Finance"
                breadCrumbParent="Invoice"
                breadCrumbActive="Preview Invoice"
              />
            </Col>
            <Col md={1}>
              <Button onClick={handleBackButtonClick} className='btn-sm' outline color='primary'>Back</Button>
            </Col>
          </Row>
          <Row className="invoice-preview w-100">
            <Col xl={9} md={8} sm={12}>
              <PreviewCard data={data} />
            </Col>
            <Col xl={3} md={4} sm={12}>
              <PreviewActions
                id={id}
                setSendSidebarOpen={setSendSidebarOpen}
                setAddPaymentOpen={setAddPaymentOpen}
                handleDownload={handleDownload}
                data={data}
                setData={setData}
              />
            </Col>
          </Row>
          <SendInvoiceSidebar
            toggleSidebar={toggleSendSidebar}
            open={sendSidebarOpen}
            data={data}
          />
          {/* <AddPaymentSidebar toggleSidebar={toggleAddSidebar} open={addPaymentOpen} /> */}
        </div>
      ) : (
        <Alert color="danger">
          <h4 className="alert-heading">Invoice not found</h4>
          <div className="alert-body">
            Invoice with id: {id} doesn't exist. Check list of all invoices:{' '}
            <Link to="/invoice/list">Invoice List</Link>
          </div>
        </Alert>
      )}
    </>
  );
};

export default InvoicePreview;
