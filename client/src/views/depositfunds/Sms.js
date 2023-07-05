import React, { memo, useEffect, useState } from 'react';
import {
  Input,
  Label,
  Button,
  Card,
  CardText,
  CardTitle,
  CardBody,
  Row,
  Col,
  CardHeader
} from 'reactstrap';

// ** Custom Components
import { MessageSquare } from 'react-feather';
import Select from 'react-select';
// ** Utils
import { selectThemeColors } from '@utils';
import { useSelector, useDispatch } from 'react-redux';
import { GetBalanceInfo } from './store';
import { customInterIceptors } from '../../lib/AxiosProvider';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
const API = customInterIceptors();

function Sms() {
  const dispatch = useDispatch();
  let { userData } = useSelector((state) => state.auth);
  let { balanceInfo } = useSelector((state) => state.deposit);

  //credits table data
  const [data, setData] = useState([
    { dollar: '$12.97', credit: '250 credits', perSMS: '$0.079' },
    { dollar: '$26.50', credit: '500 credits', perSMS: '$0.053' },
    { dollar: '$32.00', credit: '1000 credits', perSMS: '$0.032' },
    { dollar: '$52.50', credit: '2500 credits', perSMS: '$0.021' },
    { dollar: '$80.00', credit: '5000 credits', perSMS: '$0.016' },
    { dollar: '$110.00', credit: '10000 credits', perSMS: '$0.011' },
    { dollar: '$200.00', credit: '40000 credits', perSMS: '$0.005' }
  ]);

  const [currentPlan, setCurrentPlan] = useState({
    value: '12.97',
    label: '250 credits'
  });
  // handel loading
  const [loader, setLoader] = useState(false);
  // get balance info

  useEffect(() => {
    const init = async () => {
      dispatch(GetBalanceInfo(userData?.id));
    };
    init();
  }, []);
  const planOptions = [
    { value: '12.97', label: '250 credits' },
    { value: '26.50', label: '500 credits' },
    { value: '32.00', label: '1000 credits' },
    { value: '52.50', label: '2500 credits' },
    { value: '80.00', label: '5000 credits' },
    { value: '110.00', label: '10000 credits' },
    { value: '200.00', label: '20000 credits' }
  ];
  const handleEventType = (data) => {};
  const SmsBuyCreditsBtn = async () => {
    try {
      if (!currentPlan.value) {
        toast.error('Please select funds for Buy Sms credits ');
      } else if (!balanceInfo?.data?.wallet > 0) {
        toast.error('No Enough Balance in  Wallet ');
      } else if (+balanceInfo?.data?.wallet <= +currentPlan?.value) {
        toast.error('Please Deposit Funds First');
      } else {
        const DepositAmount = async () => {
          let newData = {
            wallet: +currentPlan?.value,
            cretits: +parseInt(currentPlan?.label.split(' ')[0]),
            user_id: userData?.id
          };

          return await API.post(`/deposit/withdrawSMSAmount`, newData);
        };
        Promise.all([DepositAmount()])
          .then(function (results) {
            const data = results[0];
            toast.success('Transaction Successfully');

            setLoader(false);
            dispatch(GetBalanceInfo(userData?.id));
            // window.location.reload()
          })
          .catch((e) => {
            setLoader(false);

            toast.error('Something Went Wrong');
          });
      }
    } catch (e) {}
  };
  return (
    <Card>
      <CardHeader className="border-bottom">
        <CardTitle>SMS</CardTitle>
      </CardHeader>
      <Row>
        <Col md="6" className="d-flex flex-column justify-content-center border-end">
          <div className="d-flex flex-column text-center pt-2">
            <h3>How many credits would you like to purchase?</h3>
            <p className="pt-1 pb-25 d-block mb-0">Calculate your credit cost</p>
            <p className="pb-1">Funds will be used from your wallet</p>
          </div>
          <div className="deposit-input gap-2 d-flex justify-content-center align-items-center">
            <Select
              theme={selectThemeColors}
              isClearable={false}
              className="react-select"
              classNamePrefix="select"
              options={planOptions}
              defaultValue={planOptions[0]}
              value={currentPlan}
              onChange={(data) => {
                setCurrentPlan(data), handleEventType(data);
              }}
            />
            <p className="m-0">credits</p>
          </div>
          <div className="deposit-amount py-1">
            <h1>$ {currentPlan.value ? currentPlan.value : 0}</h1>
          </div>
          <div className="text-center pb-3">
            {loader ? (
              <Button color="success" className="add-todo-item me-1">
                Loading
              </Button>
            ) : (
              <Button
                color="warning"
                className="add-todo-item me-1"
                onClick={() => SmsBuyCreditsBtn()}
              >
                Buy Credits
              </Button>
            )}
          </div>
        </Col>
        <Col md="6">
          <div>
            <DataTable
              columns={[
                {
                  name: 'Dollar',
                  selector: 'dollar'
                },
                {
                  name: 'Credit',
                  selector: 'credit'
                },
                {
                  name: '$ per msg',
                  selector: 'perSMS'
                }
              ]}
              data={data}
            />
          </div>
        </Col>
      </Row>
    </Card>
  );
}
export default memo(Sms);
