import { memo, useState, useEffect } from 'react';
import React from 'react';
import {
  Input,
  CardText,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CardHeader,
  CardTitle,
  Badge,
  Row,
  Col,
  Card,
  NavItem,
  NavLink,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledTooltip,
  UncontrolledDropdown
} from 'reactstrap';

import * as Icon from 'react-feather';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

// ** Custom Components
import { Hash, XCircle } from 'react-feather';
import Select from 'react-select';
// ** Utils
import { selectThemeColors } from '@utils';
import { customInterIceptors } from '../../lib/AxiosProvider';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import { GetBalanceInfo } from './store';
import { toast } from 'react-toastify';
import { number } from 'prop-types';

const API = customInterIceptors();

function BuyNum(props) {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  const { balanceInfo } = useSelector((state) => state.deposit);

  const [currentPlan, setCurrentPlan] = useState({
    value: '',
    label: 'Select Type'
  });
  // handel loading
  const [loader, setLoader] = useState(false);
  const [region, setRegion] = useState('');
  const [selectNum, setSelectNum] = useState(false);
  const [NumList, setNumList] = useState([]);
  const { selectedNum, setSelectedNum } = props;

  const [modal, setModal] = useState(false);
  const planOptions = [
    { value: 'US', label: 'United States' },
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'DC', label: 'District Of Columbia' },

    { value: 'GA', label: 'Georgia' },
    { value: 'HI', label: 'Hawaii' },
    { value: 'ID', label: 'Idaho' },
    { value: 'IL', label: 'Illinois' },
    { value: 'IN', label: 'Indiana' },
    { value: 'IA', label: 'Iowa' },

    { value: 'KY', label: 'Kentucky' },
    { value: 'LA', label: 'Louisiana' },
    { value: 'ME', label: 'Maine' },
    { value: 'MD', label: 'Maryland' },
    { value: 'MA', label: 'Massachusetts' },
    { value: 'MI', label: 'Michigan' },
    { value: 'MN', label: 'Minnesota' },
    { value: 'MS', label: 'Mississippi' },
    { value: 'MO', label: 'Missouri' },
    { value: 'MT', label: 'Montana' },
    { value: 'NE', label: 'Nebraska' },
    { value: 'NV', label: 'Nevada' },
    { value: 'NH', label: 'New Hampshire' },
    { value: 'NJ', label: 'New Jersey' },
    { value: 'NM', label: 'New Mexico' },
    { value: 'NY', label: 'New York' },
    { value: 'NC', label: 'North Carolina' },
    { value: 'ND', label: 'North Dakota' },
    { value: 'OH', label: 'Ohio' },
    { value: 'OK', label: 'Oklahoma' },
    { value: 'OR', label: 'Oregon' },
    { value: 'PA', label: 'Pennsylvania' },
    { value: 'RI', label: 'Rhode Island' },
    { value: 'SC', label: 'South Carolina' },
    { value: 'SD', label: 'South Dakota' },
    { value: 'TN', label: 'Tennessee' },
    { value: 'TX', label: 'Texas' },
    { value: 'UT', label: 'Utah' },
    { value: 'VT', label: 'Vermont' },
    { value: 'VA', label: 'Virginia' },
    { value: 'WA', label: 'Washington' },
    { value: 'WV', label: 'West Virginia' },
    { value: 'WI', label: 'Wisconsin' },
    { value: 'WY', label: 'Wyoming' },
    { value: 'CA_AB', label: 'Alberta' },
    { value: 'CA_BC', label: 'British Columbia' },
    { value: 'CA_MB', label: 'Manitoba' },
    { value: 'CA_NB', label: 'New Brunswick' },
    { value: 'CA_NL', label: 'Newfoundland' },
    { value: 'CA_NS', label: 'Nova Scotia' },
    { value: 'CA_ON', label: 'Ontario' },
    { value: 'CA_PE', label: 'Prince Edward Island' },
    { value: 'CA_QC', label: 'Quebec' },
    { value: 'CA_SK', label: 'Saskatchewan' }
  ];
  const handleEventType = (data) => {
    setRegion(data.value);
  };
  const SmsBuyCreditsBtn = async () => {
    try {
      if (!currentPlan.value) {
        toast.error('Please select funds for buy number');
      } else if (!balanceInfo?.data?.wallet > 0) {
        toast.error('No Enough Balance in  Wallet ');
      } else if (+balanceInfo?.data?.wallet <= +10) {
        toast.error('Please Deposit Funds First');
      } else {
        const DepositAmount = async () => {
          let newData = {
            wallet: +10,
            // cretits: +currentPlan?.value == 5 ? 300 : +currentPlan?.value == 10 ? 700 : 1500,
            user_id: userData?.id
          };

          return await API.post(`/deposit/withdrawAmount`, newData);
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
  useEffect(() => {
    balanceInfo.data?.purchased_Num && setSelectedNum(balanceInfo.data.purchased_Num);
  }, [balanceInfo.data?.purchased_Num]);
  useEffect(() => {
    const init = async () => {
      try {
        setLoader(true);
        let data = await API.post(`/deposit/availablePhoneNumbers`, {
          value: region
        });

        setNumList(data?.data?.data);
        setLoader(false);
        setSelectNum(true);
      } catch (error) {
        setLoader(false);
      }
    };
    if (region) {
      init();
    }
  }, [region]);
  const NumberBuyCreditsBtn = async () => {
    let bal = +balanceInfo?.data?.wallet ? +balanceInfo?.data?.wallet : 0;

    try {
      if (!selectedNum) {
        toast.error('Please select Phone Number ');
      } else if (10 > bal) {
        toast.error('Please Deposit Funds First ');
      } else {
        setLoader(true);
        const DepositAmount = async () => {
          let newData = {
            wallet: balanceInfo?.data?.is_Already_Purchase ? 10 : 0,
            // cretits: +SmsBuyCredits == 5 ? 300 : +SmsBuyCredits == 10 ? 700 : 1500,
            user_id: userData?.id
          };

          return await API.post(`/deposit/withdrawAmountForBuyingNumber`, newData);
        };
        const PurchaseNum = async () => {
          let ndata = {
            purchased_Num: selectedNum,
            is_Already_Purchase: true
          };

          return await API.put(`/deposit/purchase_num/${userData?.id}`, ndata);
        };

        Promise.all([DepositAmount(), PurchaseNum()])
          .then(function (results) {
            const data = results[0];
            const data1 = results[1];
            toast.success('Transaction Successfully');

            setLoader(false);
            setModal(!modal);
            dispatch(GetBalanceInfo(userData?.id));
            //  window.location.reload()
          })
          .catch((e) => {
            setLoader(false);
            setLoader(false);
            setModal(!modal);
            toast.error('Something Went Wrong');
          });
      }
    } catch (e) {}
  };

  const phoneNumberChange = (number) => {
    setSelectedNum(number);
  };

  return (
    <>
      {/* modal start here */}

      <Modal isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader toggle={() => setModal(!modal)}>Buy Number : {selectedNum}</ModalHeader>
        <ModalBody>Buy Your Number for one time fees of $10</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => NumberBuyCreditsBtn()}>
            Buy
          </Button>{' '}
          <Button color="secondary" onClick={() => setModal(!modal)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      {/* modal end here  */}
      <div>
        <Card className="mx-1">
          <CardHeader className="border-bottom justify-content-start cursor-pointer">
            {balanceInfo?.data?.purchased_Num2 ? (
              <UncontrolledDropdown>
                <DropdownToggle tag="span">
                  <span className="fw-bolder">MY NUMBER {selectedNum}</span>
                  <Icon.ChevronDown size={15} className="ficon" />
                  <Badge color="primary" className="ms-1" pill>
                    2
                  </Badge>
                </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem
                    className="mx-auto"
                    onClick={(e) => phoneNumberChange(balanceInfo?.data?.purchased_Num)}
                  >
                    <span className="align-middle">{balanceInfo?.data?.purchased_Num}</span>
                  </DropdownItem>
                  <DropdownItem
                    className="mx-auto"
                    onClick={(e) => phoneNumberChange(balanceInfo?.data?.purchased_Num2)}
                  >
                    <span className="align-middle">{balanceInfo?.data?.purchased_Num2}</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            ) : balanceInfo?.data?.purchased_Num ? (
              <CardTitle className="d-flex gap-2">
                MY NUMBER : {balanceInfo?.data?.purchased_Num}
                <Badge color="warning" pill>
                  1
                </Badge>
              </CardTitle>
            ) : (
              <CardTitle>MY NUMBER : NONE</CardTitle>
            )}
          </CardHeader>
          <Row className="p-2">
            <Col>
              <CardText className="despost-text-main mt-3">
                <div className="d-flex flex-column text-center">
                  <h3>
                    {balanceInfo?.data?.purchased_Num
                      ? 'The above phone number is your active phone number. If you want to add a new one or change phone number, then select the type of phone below and choose one to buy it.'
                      : "You don't any active phone number. If you want to buy a new one, then please select the type of phone and choose one to buy it."}
                  </h3>
                  <h5 className="py-1">
                    *You are required to have a data plan associatated with your number to use text
                    and voice credits
                  </h5>
                </div>
              </CardText>
              <div className="deposit-input px-5">
                <Select
                  theme={selectThemeColors}
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={planOptions}
                  value={currentPlan}
                  onChange={(data) => {
                    handleEventType(data), setCurrentPlan(data);
                  }}
                />
              </div>
              <div className="deposit-amount py-1">
                <h1>$10</h1>
                <p>per month</p>
                <p>Up to 5 phone numbers.</p>
                <p>100 text/voice CREDITS per month</p>
              </div>
            </Col>
            <Col className="border-start">
              <div className="overflow-y">
                <div className="d-flex justify-content-center align-items-center ps-2 mt-3">
                  <h3>Buy Number</h3>
                </div>
                {selectNum ? (
                  <DataTable
                    columns={[
                      {
                        name: 'Number List',
                        selector: 'phoneNumber',
                        sortable: true
                      },
                      {
                        name: 'Buy Number',
                        selector: 'credit',
                        // sortable: true,
                        cell: (item) => (
                          <Button
                            color="primary"
                            className="add-todo-item me-1"
                            onClick={() => {
                              setSelectedNum(item.phoneNumber);
                              setModal(!modal);
                            }}
                          >
                            Select
                          </Button>
                        )
                      }
                    ]}
                    data={NumList}
                    pagination
                    paginationPerPage={8}
                    paginationRowsPerPageOptions={[8, 15, 20]}
                    paginationComponentOptions={{
                      rowsPerPageText: 'Rows per page:',
                      rangeSeparatorText: 'of'
                    }}
                  />
                ) : (
                  <DataTable
                    columns={[
                      {
                        name: 'Number List',
                        selector: 'phoneNumber',
                        sortable: true
                      },
                      {
                        name: 'Buy Number',
                        selector: 'credit',
                        cell: (item) => (
                          <Button
                            color="primary"
                            className="add-todo-item me-1"
                            onClick={() => {
                              setSelectedNum(item.phoneNumber);
                              setModal(!modal);
                            }}
                          >
                            Select
                          </Button>
                        )
                      }
                    ]}
                    data={NumList}
                    pagination
                    paginationPerPage={8}
                    paginationRowsPerPageOptions={[8, 15, 20]}
                    paginationComponentOptions={{
                      rowsPerPageText: 'Rows per page:',
                      rangeSeparatorText: 'of'
                    }}
                  />
                )}
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
}
export default memo(BuyNum);
