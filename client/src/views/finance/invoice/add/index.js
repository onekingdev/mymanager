// ** Invoice Add Components
import AddCard from './AddCard';
import AddActions from './AddActions';

// ** Reactstrap Imports
import { Row, Col, Button } from 'reactstrap';

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss';
import '@styles/base/pages/app-invoice.scss';
import { addinvoicedata, fetchinvoicedata } from '../../../../requests/invoice/invoice';
import { useEffect, useState } from 'react';
import BreadCrumbs from '../../../../@core/components/breadcrumbs';
import { useDispatch, useSelector } from 'react-redux';
import { setInvoiceListReducer } from '../store/reducer';
import { getUserData } from '../../../../auth/utils';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import { getShopByUserAction } from '../../../shops/store/action';
import { useUploadSignature } from '../../../../requests/documents/recipient-doc';
import { getFinanceCategories } from '../../store/actions';
import { toast } from 'react-toastify';

const InvoiceAdd = () => {
  const { mutate } = addinvoicedata();
  const [payUsing, setPayUsing] = useState([]);

  const dispatch = useDispatch();
  const store = useSelector((state) => {
    return { ...state.userInvoice, ...state.shops, ...state.totalContacts,...state.finance };
  });

  const [invoice, setinvoice] = useState({
    date: new Date(),
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
    // issuedDate: new Date(),
    totalAmount: 0,
    paidAmount: 0,
    bank: {},
    items: [
      {
        //itemId: '',
        description: '',
        rate: 0,
        quantity: 1
      }
    ],
    discount: 0,
    tax: 0,
    salesperson: getUserData()?.fullName,
    sendInvoice: true,
    note: 'It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance projects. Thank You!'
  });

  const handlesubmit = async () => {
    
    let payload = { ...invoice };
    if(invoice.payNow===0){
      toast.error("Please add Pay Now amount")
      return
    }
    if (invoice.sendInvoice === true) {
      payload = {
        ...payload,
        recipient: store?.contactList?.list?.find((x) => x._id === invoice.customerId).email,
      };
    }
    if(payUsing.length>0){
      let pay = payUsing.map(x=>x.value)
      payload = {...payload,acceptedPaymentMethods:pay}
    }
    if (invoice.file) {
      let formData = new FormData();
      formData.append('file', invoice?.file);
      useUploadSignature(formData).then(res=>{
        payload = {...payload,logoUrl:res.url}
        mutate(payload);
      })
    }
    else{
      mutate(payload);
    }
  };

  const history = useHistory();

  const handleBackButtonClick = () => {
    history.goBack();
  };

  const { data } = fetchinvoicedata();
  useEffect(() => {
    dispatch(setInvoiceListReducer(data?.data));
    dispatch(getShopByUserAction());
    if(store.categoryList.length === 0){
      dispatch(getFinanceCategories())
    }
  }, [data, dispatch]);

  return (
    <div className="invoice-add-wrapper">
      <Row>
        <Col md={11} className="invoice-child-header-wrapper">
          <BreadCrumbs
            breadCrumbTitle="Finance"
            breadCrumbParent="Finance"
            breadCrumbActive="Add invoice"
          />
        </Col>
        <Col md={1}>
          <Button onClick={handleBackButtonClick} className="btn-sm" outline color="primary">
            Back
          </Button>
        </Col>
      </Row>

      <Row className="invoice-add">
        <Col xl={9} md={8} sm={12}>
          <AddCard
            invoicedata={invoice}
            setinvoice={setinvoice}
            payUsing={payUsing}
            store={store}
            dispatch={dispatch}
          />
        </Col>
        <Col xl={3} md={4} sm={12}>
          <AddActions
            invoicedata={invoice}
            setPayUsing={setPayUsing}
            payUsing={payUsing}
            setinvoice={setinvoice}
            handlesubmit={handlesubmit}
            store = {store}
          />
        </Col>
      </Row>
    </div>
  );
};

export default InvoiceAdd;
