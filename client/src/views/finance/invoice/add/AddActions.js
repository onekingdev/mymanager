// ** React Imports
import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// ** Reactstrap Imports
import { Card, CardBody, Button, Input, Label } from 'reactstrap';
import ChangeTemplate from './ChangeTemplate';
import EditPayment from './EditPayment';
import Select, { components } from 'react-select';
import { selectThemeColors } from '@utils';

const paymentOptions = [
  { value: 'Credit Card', label: 'Credit Card' },
  { value: 'Debit Card', label: 'Debit Card' },
  { value: 'Wire Transfer', label: 'Wire Transfer' },
  { value: 'PayPal', label: 'PayPal' },
];

const AddActions = ({handlesubmit, invoicedata, setinvoice, payUsing, setPayUsing, store}) => {
  const [categoryOptions,setcategoryOptions] = useState([])
  useEffect(()=>{
    if(store.categoryList.length>0){
      let cats = store.categoryList.map(x=>{
        let c = {value:x._id,label:x.title, cat:x}
        return c
      })
      setcategoryOptions(cats)
      setinvoice({...invoicedata,itemType:cats[0].value})
    }
  },[store.categoryList])
  return (
    <Fragment>
      <Card className="invoice-action-wrapper">
        <CardBody>
          
           <div className="form-switch mb-2 ps-0">
              <div className="d-flex">
                <p className="fw-bold me-auto mb-0">Send Invoice after saving</p>
                <Input
                  type="switch"
                  name="sendInvoice"
                  checked={invoicedata.sendInvoice}
                  onChange={(e)=>{setinvoice({...invoicedata,sendInvoice:e.target.checked})}}
                />
              </div>
            </div>
          {/* <Button tag={Link} to={`/invoice-preview/${}`} target="_blank" color="primary" block outline className="mb-75">
            Preview
          </Button> */}
         
          <EditPayment invoicedata={invoicedata} setinvoice={setinvoice} />
          <Button className="mb-75" color="success" block onClick={handlesubmit}>
            Save
          </Button>
        </CardBody>
      </Card>
      <div className="mt-2">
        <div className="invoice-payment-option">
          <p className="mb-50">Accept payments via</p>
          <Select
            theme={selectThemeColors}
            defaultValue={payUsing}
            isMulti
            className="react-select"
            classNamePrefix="select"
            options={paymentOptions}
            isClearable={false}
            name="acceptPayments"
            onChange={(data) => { setPayUsing(data);}}
          />
        </div>
      </div>
      <div className="mt-2">
        <div className="invoice-payment-option">
          <p className="mb-50">Finance Category</p>
          <Select
            theme={selectThemeColors}
            defaultValue={categoryOptions[0]}
            className="react-select"
            classNamePrefix="select"
            options={categoryOptions}
            isClearable={false}
            name="financeCategory"
            onChange={(data) => { setinvoice({...invoicedata,itemType:data.value})}}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default AddActions;
