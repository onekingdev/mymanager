// ** React Imports
import jsPDF from 'jspdf';
import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';


// ** Reactstrap Imports
import { Card, CardBody, Button } from 'reactstrap';
import EditDrawer from './EditDrawer';
import PaymentModal from '../payment/PaymentModal';
import { useDispatch } from 'react-redux';

const PreviewActions = ({ id, setSendSidebarOpen, setAddPaymentOpen ,handleDownload,data,setData}) => {
  const [openEditSidebar, setOpenEditSidebar] = useState(false);
  const [openPayment,setOpenPayment] = useState(false)

  const togglePayment = ()=>setOpenPayment(!openPayment)

  const dispatch = useDispatch()
  
  return (
    <Fragment>
      <Card className="invoice-action-wrapper">
        <CardBody>
          <Button color="primary" block className="mb-75" onClick={() => setSendSidebarOpen(true)}>
            Send Invoice
          </Button>
          <Button color="secondary" block outline className="mb-75" onClick={handleDownload}>
            Download
          </Button>
          <Button
            color="secondary"
            tag={Link}
            to={`/invoice/print/${id}`}
            target="_blank"
            block
            outline
            className="mb-75"
    
          >
            Print
          </Button>
         
          <Button
            // tag={Link}
            // to={`/invoice/preview/${id}`}
            onClick={() => setOpenEditSidebar(true)}
            color="secondary"
            block
            outline
            className="mb-75"
          >
            Edit
          </Button>
          <Button
             tag={Link}
            to={`/invoice-preview/${id}`}
            target="_blank"
            //onClick={() => setOpenEditSidebar(true)}
            color="primary"
            block
            outline
            className="mb-75"
          >
            Preview
          </Button>
         {data?.payNow>0 &&  <Button
           
           //onClick={() => setOpenEditSidebar(true)}
           color="success"
           block
           
           className="mb-75"
           onClick={togglePayment}
         >
           Pay Now
         </Button>}
        </CardBody>
      </Card>
      <PaymentModal open={openPayment} toggle={togglePayment} invoice={data} dispatch={dispatch}/>
      <EditDrawer openEditSidebar={openEditSidebar} setOpenEditSidebar={setOpenEditSidebar} data={data} setData={setData}/>
    </Fragment>
  );
};

export default PreviewActions;
