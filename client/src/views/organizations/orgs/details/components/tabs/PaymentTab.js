import React, { useEffect, useState } from 'react';
import { getOrganizationSubscriptionAction } from '../../../../store/action';
import { Button, Card } from 'reactstrap';
import DataTable from 'react-data-table-component';
import { ChevronDown } from 'react-feather';
import { convertDate } from '../../../../../goals/helpers/converters';
import PaymentModal from '../payment/PaymentModal';

export default function PaymentTab({ dispatch, selectedOrg }) {
  const [tableData, setTableData] = useState([]);
  const [openPayment, setOpenPayment] = useState(false);

  const [plan,setPlan] = useState(selectedOrg.plan[selectedOrg.plan.length - 1])
  const [planDetails,setPlanDetails] = useState(selectedOrg.planDetails.find((x) => x._id === selectedOrg.plan[selectedOrg.plan.length - 1].planId))
  const togglePayment = () => setOpenPayment(!openPayment);

  const handlePayment = () => {};
  const columns = [
    {
      name: 'Amount',
      selector: (row) => row.amount,
      width: '15%',
      cell: (row) => (
        <span>
          {row.amount} {row.currency}
        </span>
      )
    },
    {
      name: 'Status',
      selector: (row) => row.status,
      width: '15%',
      cell: (row) => <span>{row.status} </span>
    },
    {
      name: 'Payment Method',
      selector: (row) => row.paymentMethod,
      width: '15%',
      cell: (row) => <span>{row.paymentMethod} </span>
    },
    {
      name: 'Paid By',
      selector: (row) => row.paidBy,
      width: '15%',
      cell: (row) => <span>{row?.paidBy === 'undefined' ? '' : row?.paidBy} </span>
    },
    {
      name: 'Date',
      selector: (row) => row.date,
      width: '15%',
      cell: (row) => <span>{row.date && convertDate(row?.date)} </span>
    }
  ];

  useEffect(() => {
    //select * from SubscriptionBought where organizationId === selectedOrg._id
    dispatch(getOrganizationSubscriptionAction(selectedOrg._id)).then((res) => {
      let data = [];
      for (const sub of res) {
        let x = {};
        if (sub.paymentInfo) {
          for (const pay of sub?.paymentInfo) {
            x = {
              ...x,
              amount: pay.amount,
              currency: pay.currency,
              paymentMethod:
                pay.paymentMethod === 'cash' || pay.paymentMethod === 'cheque'
                  ? pay.paymentMethod
                  : 'stripe',
              status: pay.status,
              date: pay?.date
            };
            x = { ...x, paidBy: `${sub?.user?.firstName || ''} ${sub?.user?.lastName || ''}` };
            data.push(x);
          }
        }
      }
      setTableData(data);
    });
  }, []);
  return (
    <>
      <Card>
        {planDetails.payByUser===false && (
          <div className="d-flex justify-content-end">
            <Button color="primary" onClick={togglePayment}>
              Make Payment
            </Button>
          </div>
        )}
        <DataTable
          noHeader
          pagination
          responsive
          paginationServer
          columns={columns}
          sortIcon={<ChevronDown />}
          className="react-dataTable"
          data={tableData}
        />
      </Card>
      <PaymentModal toggle={togglePayment} open={openPayment} selectedOrg={selectedOrg} plan={plan} planDetails={planDetails} dispatch={dispatch}/>
    </>
  );
}
