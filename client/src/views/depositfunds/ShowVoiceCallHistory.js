import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardHeader, CardTitle, Col, Row } from 'reactstrap';
import Select from 'react-select';
import { GetCallHistory, GetBalanceInfo } from './store';
import { customInterIceptors } from '../../lib/AxiosProvider';
import { selectThemeColors } from '@utils';
import DataTable from 'react-data-table-component';
import { ArrowDown } from 'react-feather';
import { toast } from 'react-toastify';
const API = customInterIceptors();

function VoiceCallHistory() {
  const dispatch = useDispatch();
  let { userData } = useSelector((state) => state.auth);
  let { callHistory, balanceInfo } = useSelector((state) => state.deposit);

  useEffect(() => {
    dispatch(GetCallHistory(userData?.id));
    const init = async () => {
      dispatch(GetBalanceInfo(userData?.id));
    };
    init();
  }, []);

  //credits table data
  const [data, setData] = useState([
    {
      dollar: '$8.40',
      minutes: '60 MIN',
      inbound: '0.085/min',
      outbound: '0.140/min'
    },
    {
      dollar: '$13.80',
      minutes: '100 MIN',
      inbound: '0.080/min',
      outbound: '0.138/min'
    },
    {
      dollar: '$40.50',
      minutes: '300 MIN',
      inbound: '0.075/min',
      outbound: '0.135/min'
    },
    {
      dollar: '$54.00',
      minutes: '500 MIN',
      inbound: '0.044/min',
      outbound: '0.108/min'
    },
    {
      dollar: '$106.00',
      minutes: '1000 MIN',
      inbound: ' 0.035/min',
      outbound: '0.106/min'
    },
    {
      dollar: '$204.00',
      minutes: '2000 MIN',
      inbound: ' 0.030/min',
      outbound: ' 0.102/min'
    }
  ]);

  const [currentPlan, setCurrentPlan] = useState({
    value: '8.40',
    label: '60 MIN'
  });
  // handel loading
  const [loader, setLoader] = useState(false);
  // get balance info

  const planOptions = [
    { value: 0.84, label: '60 MIN' },
    { value: 1.38, label: '100 MIN' },
    { value: 4.05, label: '300 MIN' },
    { value: 5.4, label: '500 MIN' },
    { value: 10.6, label: '1000 MIN' },
    { value: 20.4, label: '2000 MIN' }
  ];

  const minsBuyCreditsBtn = async () => {
    try {
      if (!currentPlan.value) {
        toast.error('Please select funds for Buy minutes of voice call');
      } else if (!balanceInfo?.data?.wallet > 0) {
        toast.error('No Enough Balance in  Wallet ');
      } else if (+balanceInfo?.data?.wallet <= +currentPlan?.value) {
        toast.error('Please Deposit Funds First');
      } else {
        const DepositAmount = async () => {
          let newData = {
            wallet: +currentPlan?.value,
            minutes: +parseInt(currentPlan?.label.split(' ')[0]),
            user_id: userData?.id
          };
          return await API.post(`/deposit/withdrawMinsAmount`, newData);
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
            console.log(e);
            toast.error('Something Went Wrong');
          });
      }
    } catch (e) {}
  };

  const historycolumns = [
    {
      name: 'Date',
      selector: (row) => row.Date,
      sortable: false,
      cell: (params) => {
        return (
          <>
            <span>{moment(params?.date).format('MM/DD/YYYY')}</span>
          </>
        );
      }
    },
    {
      selector: (row) => row.num,
      name: 'Number',
      sortable: true
    },

    {
      selector: (row) => row.duration + ' sec',
      name: 'Duration',
      sortable: true
    },
    {
      selector: (row) => row.recording_url,
      name: 'Recording',
      sortable: true,
      cell: (params) => {
        return (
          <>
            <div className="text">
              <audio controls>
                <source src={params?.recording_url} type="audio/mpeg" />
              </audio>
            </div>
          </>
        );
      }
    }
  ];
  return (
    <div>
      {callHistory.length > 0 ? (
        <DataTable
          responsive={true}
          columns={historycolumns}
          data={callHistory || []}
          noHeader
          defaultSortDirection={'asc'}
          defaultSortField="firstName"
          defaultSortAsc={true}
          pagination
          sortIcon={<ArrowDown style={{ color: '#bababa' }} />}
          highlightOnHover
          customStyles={customStyles}
        />
      ) : (
        <Card>
          <CardHeader className="border-bottom">
            <CardTitle>Voice</CardTitle>
          </CardHeader>
          <Row>
            <Col md="6" className="d-flex flex-column justify-content-center border-end">
              <div className="d-flex flex-column text-center pt-2">
                <h3>How many minutes would you like to purchase?</h3>
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
                  value={currentPlan}
                  onChange={(data) => {
                    setCurrentPlan(data);
                  }}
                />
                <p className="m-0">minutes</p>
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
                    onClick={() => minsBuyCreditsBtn()}
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
                      name: 'Minutes',
                      selector: 'minutes'
                    },
                    {
                      name: 'INBOUND',
                      selector: 'inbound'
                    },
                    {
                      name: 'OUTBOUND',
                      selector: 'outbound'
                    }
                  ]}
                  data={data}
                />
              </div>
            </Col>
          </Row>
        </Card>
      )}
    </div>
  );
}
export default memo(VoiceCallHistory);
