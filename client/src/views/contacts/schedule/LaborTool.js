import React, { useState, useEffect, useMemo } from 'react';
import { FaConnectdevelop } from 'react-icons/fa';
import {
  Row,
  Badge,
  Input,
  Button,
  Col,
  Label,
  FormGroup,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { saveBudgetAction, getBudgetAction } from './store/actions';
import Select from 'react-select';

const durationOptions = [
  { label: '5 Minutes Before', value: 5 },
  { label: '10 Minutes Before', value: 10 },
  { label: '15 Minutes Before', value: 15 },
  { label: '20 Minutes Before', value: 20 },
  { label: '30 Minutes Before', value: 30 },
  { label: '45 Minutes Before', value: 45 },
  { label: '1 Hours Before', value: 60 }
];

const employeeTypeOptions = [
  { label: 'Remote', value: true },
  { label: 'Inhouse', value: false },
  { label: 'All', value: 'all' }
];
const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const LaborTool = ({ openfooter, handleClickOpen }) => {
  const dispatch = useDispatch();
  const timers = [];
  // const budgetStore = useSelector((state) => state.employeeSchedule);
  const store = useSelector((state) => state.employeeContact);
  const [isActive, setIsActive] = useState(true);
  const [saleArr, setSaleArr] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [laborArr, setLaborArr] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [laborPercentArr, setLaborPercentArr] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [totalSale, setTotalSale] = useState(0);
  const [totalLabor, setTotalLabor] = useState(0);
  const [totalPercentage, setTotalPercentage] = useState(0);
  const [limitMins, setLimitMins] = useState(5);
  const [needPunch, setNeedPunch] = useState(false);
  const [faceRecog, setFaceRecog] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const deleteToggle = () => {
    setIsDeleteOpen(!isDeleteOpen);
  };
  const handleChangeSale = (e, index) => {
    let tmp = [...saleArr];
    tmp[index] = parseInt(e.target.value);
    setSaleArr(tmp);
  };

  const handleChangeLabor = (e, index) => {
    let tmpPercent = [...laborPercentArr],
      tmpValue = [...laborArr];
    if (parseFloat(e.target.value) > 100) {
      e.target.value = '100';
    }
    tmpPercent[index] = parseFloat(e.target.value).toFixed(2);
    tmpValue[index] = parseFloat(
      ((parseFloat(e.target.value) * parseInt(saleArr[index])) / 100).toFixed(2)
    );
    setLaborPercentArr(tmpPercent);
    setLaborArr(tmpValue);
  };
  useMemo(() => {
    let tmp = new Array(7).fill(0),
      tmpTotalSale = 0,
      tmpTotalLabor = 0,
      tmpTotalPercentage = 0;
    tmp.map((item, index) => {
      if (
        saleArr[index] !== 0 &&
        laborArr[index] !== 0 &&
        saleArr[index] &&
        laborArr[index] &&
        laborPercentArr[index]
      ) {
        tmpTotalSale = tmpTotalSale + saleArr[index];
        tmpTotalPercentage = tmpTotalPercentage + parseFloat(laborPercentArr[index]);
        tmpTotalLabor = tmpTotalLabor + parseFloat(laborArr[index]);
      } else {
        return 0;
      }
    });
    setTotalSale(tmpTotalSale);
    setTotalPercentage((tmpTotalPercentage / 7).toFixed(2));
    setTotalLabor(tmpTotalLabor.toFixed(2));
  }, [laborArr, saleArr]);

  // ** Handlers

  const faceRecognitionHandler = (e) => {
    setFaceRecog(e.target.checked);
  };

  const editClickHandler = (e) => {
    //setIsActive(false);
    deleteToggle();
  };
  const saveClickHandler = (e) => {
    dispatch(
      saveBudgetAction({
        totalSale: totalSale,
        totalPercentage: totalPercentage,
        totalLabor: totalLabor,
        salesProjected: saleArr,
        laborProjected: laborArr,
        faceRecog: faceRecog,
        needPunch: needPunch,
        limitMins: parseInt(limitMins)
      })
    );

    const timer1 = setTimeout(() => {
      dispatch(getBudgetAction());
    }, '600');
    timers.push(timer1);
    setIsDeleteOpen(false);
  };

  useEffect(() => {
    return () => {
      for (let i = 0; i < timers.length; i++) {
        clearTimeout(timers[i]);
      }
    };
  }, []);

  const handleSaveClick = () => {
    dispatch(
      saveBudgetAction({
        totalSale: totalSale,
        totalPercentage: totalPercentage,
        totalLabor: totalLabor,
        salesProjected: saleArr,
        laborProjected: laborArr,
        faceRecog: faceRecog,
        needPunch: needPunch,
        limitMins: parseInt(limitMins)
      })
    );

    const timer1 = setTimeout(() => {
      dispatch(getBudgetAction());
    }, '600');
    timers.push(timer1);
  };

  return (
    <>
      <table className="w-100 bordered-table">
        <thead style={{ background: '#f3f2f7' }}>
          <td className="border px-3 p-50">
            <h6 className="mb-0">Projection/Actuals</h6>
          </td>
          {weekDays.map((item) => {
            return (
              <th className="border " onClick={handleClickOpen} colspan="2">
                <div className="d-flex justify-content-around">
                  <span>{item}</span>
                </div>
              </th>
            );
          })}
        </thead>
        <tbody>
          <td className="border">
            <div className="d-flex justify-content-between p-50 align-items-center">
              <div>Total</div>
              <div className="d-flex  align-items-center">
                <span className="labour-header-badge d-flex h-100 align-items-center px-50 font-small-2">
                  {totalPercentage}%
                </span>
                <span
                  className="font-small-2 text-end ms-1"
                  style={{
                    fontWeight: 'bold'
                  }}
                >
                  ${totalSale} / ${totalLabor}
                </span>
              </div>
            </div>
          </td>
          <td className="border" colSpan={2}>
            <div className="d-flex justify-content-around align-items-center">
              <span className="labour-header-badge d-flex h-100 align-items-center ms-50 font-small-1">
                {laborPercentArr[0]}%
              </span>
              <span
                className="font-small-2 text-end ms-50 text-nowrap"
                style={{
                  fontWeight: 'bold'
                }}
              >
                ${saleArr[0] ? saleArr[0] : 0} / ${laborArr[0] ? laborArr[0] : 0}
              </span>
            </div>
          </td>
          <td className="border" colSpan={2}>
            <div className="d-flex justify-content-around align-items-center">
              <span className="labour-header-badge d-flex h-100 align-items-center ms-50 font-small-1">
                {laborPercentArr[1]}%
              </span>
              <span
                className="font-small-2 text-end ms-50 text-nowrap"
                style={{
                  fontWeight: 'bold'
                }}
              >
                {saleArr[1] ? saleArr[1] : 0}$ / {laborArr[1] ? laborArr[1] : 0}$
              </span>
            </div>
          </td>
          <td className="border" colSpan={2}>
            <div className="d-flex justify-content-around align-items-center">
              <span className="labour-header-badge d-flex h-100 align-items-center ms-50 font-small-1">
                {laborPercentArr[2]}%
              </span>
              <span
                className="font-small-2 text-end ms-50 text-nowrap"
                style={{
                  fontWeight: 'bold'
                }}
              >
                ${saleArr[2] ? saleArr[2] : 0} / ${laborArr[2] ? laborArr[2] : 0}
              </span>
            </div>
          </td>
          <td className="border" colSpan={2}>
            <div className="d-flex justify-content-around align-items-center">
              <span className="labour-header-badge d-flex h-100 align-items-center ms-50 font-small-1">
                {laborPercentArr[3]}%
              </span>
              <span
                className="font-small-2 text-end ms-50 text-nowrap"
                style={{
                  fontWeight: 'bold'
                }}
              >
                ${saleArr[3] ? saleArr[3] : 0} / ${laborArr[3] ? laborArr[3] : 0}
              </span>
            </div>
          </td>
          <td className="border" colSpan={2}>
            <div className="d-flex justify-content-around align-items-center">
              <span className="labour-header-badge d-flex h-100 align-items-center ms-50 font-small-1">
                {laborPercentArr[4]}%
              </span>
              <span
                className="font-small-2 text-end ms-50 text-nowrap"
                style={{
                  fontWeight: 'bold'
                }}
              >
                ${saleArr[4] ? saleArr[4] : 0} / ${laborArr[4] ? laborArr[4] : 0}
              </span>
            </div>
          </td>
          <td className="border" colSpan={2}>
            <div className="d-flex justify-content-around align-items-center">
              <span className="labour-header-badge d-flex h-100 align-items-center ms-50 font-small-1">
                {laborPercentArr[5]}%
              </span>
              <span
                className="font-small-2 text-end ms-50 text-nowrap"
                style={{
                  fontWeight: 'bold'
                }}
              >
                ${saleArr[5] ? saleArr[5] : 0} / ${laborArr[5] ? laborArr[5] : 0}
              </span>
            </div>
          </td>
          <td className="border" colSpan={2}>
            <div className="d-flex justify-content-around align-items-center">
              <span className="labour-header-badge d-flex h-100 align-items-center ms-50 font-small-1">
                {laborPercentArr[6]}%
              </span>
              <span
                className="font-small-2 text-end ms-50 text-nowrap"
                style={{
                  fontWeight: 'bold'
                }}
              >
                ${saleArr[6] ? saleArr[6] : 0} / ${laborArr[6] ? laborArr[6] : 0}
              </span>
            </div>
          </td>
        </tbody>
        {openfooter ? (
          <>
            <tbody className="pr-1 pl-1">
              <td className="border">
                <div className="d-flex justify-content-between  align-items-center p-1">
                  <span className="font-small-2">Sales Goal</span>
                  {/* <div>$0 proj.($0 act.)</div> */}
                </div>
              </td>
              <td className="border p-50" colSpan={2}>
                <div className="cursor-pointer d-flex justify-content-center">
                  <Input
                    type="number"
                    placeholder="$"
                    className="text-end font-small-2"
                    onChange={(e) => handleChangeSale(e, 0)}
                  />
                </div>
              </td>
              <td className="border p-50" colSpan={2}>
                <div className="cursor-pointer d-flex justify-content-center">
                  <Input
                    type="number"
                    placeholder="$"
                    className=" text-end font-small-2"
                    onChange={(e) => handleChangeSale(e, 1)}
                  />
                </div>
              </td>
              <td className="border p-50" colSpan={2}>
                <div className="cursor-pointer d-flex justify-content-center">
                  <Input
                    type="number"
                    placeholder="$"
                    className="text-end font-small-2"
                    onChange={(e) => handleChangeSale(e, 2)}
                  />
                </div>
              </td>
              <td className="border p-50" colSpan={2}>
                <div className="cursor-pointer d-flex justify-content-center">
                  <Input
                    type="number"
                    placeholder="$"
                    className="text-end font-small-2"
                    onChange={(e) => handleChangeSale(e, 3)}
                  />
                </div>
              </td>
              <td className="border p-50" colSpan={2}>
                <div className="cursor-pointer d-flex justify-content-center">
                  <Input
                    type="number"
                    placeholder="$"
                    className="text-end font-small-2"
                    onChange={(e) => handleChangeSale(e, 4)}
                  />
                </div>
              </td>
              <td className="border p-50" colSpan={2}>
                <div className="cursor-pointer d-flex justify-content-center">
                  <Input
                    type="number"
                    placeholder="$"
                    className="text-end font-small-2"
                    onChange={(e) => handleChangeSale(e, 5)}
                  />
                </div>
              </td>
              <td className="border p-50" colSpan={2}>
                <div className="cursor-pointer d-flex justify-content-center">
                  <Input
                    type="number"
                    placeholder="$"
                    className="text-end font-small-2"
                    onChange={(e) => handleChangeSale(e, 6)}
                  />
                </div>
              </td>
            </tbody>
            <tbody className="pr-1 pl-1">
              <td className="border">
                <div className="d-flex justify-content-between  align-items-center p-1">
                  <span className="font-small-2">Labor Goal</span>
                  {/* <div>$0 proj.($0 act.)</div> */}
                </div>
              </td>
              <td className="border p-50" colSpan={2}>
                <div className="cursor-pointer d-flex justify-content-center">
                  <Input
                    type="number"
                    placeholder="%"
                    className="text-end font-small-2"
                    onChange={(e) => handleChangeLabor(e, 0)}
                  />
                </div>
              </td>
              <td className="border p-50" colSpan={2}>
                <div className="cursor-pointer d-flex justify-content-center">
                  <Input
                    type="number"
                    placeholder="%"
                    className=" text-end font-small-2"
                    onChange={(e) => handleChangeLabor(e, 1)}
                  />
                </div>
              </td>
              <td className="border p-50" colSpan={2}>
                <div className="cursor-pointer d-flex justify-content-center">
                  <Input
                    type="number"
                    placeholder="%"
                    className="text-end font-small-2"
                    onChange={(e) => handleChangeLabor(e, 2)}
                  />
                </div>
              </td>
              <td className="border p-50" colSpan={2}>
                <div className="cursor-pointer d-flex justify-content-center">
                  <Input
                    type="number"
                    placeholder="%"
                    className="text-end font-small-2"
                    onChange={(e) => handleChangeLabor(e, 3)}
                  />
                </div>
              </td>
              <td className="border p-50" colSpan={2}>
                <div className="cursor-pointer d-flex justify-content-center">
                  <Input
                    type="number"
                    placeholder="%"
                    className="text-end font-small-2"
                    onChange={(e) => handleChangeLabor(e, 4)}
                  />
                </div>
              </td>
              <td className="border p-50" colSpan={2}>
                <div className="cursor-pointer d-flex justify-content-center">
                  <Input
                    type="number"
                    placeholder="%"
                    className="text-end font-small-2"
                    onChange={(e) => handleChangeLabor(e, 5)}
                  />
                </div>
              </td>
              <td className="border p-50" colSpan={2}>
                <div className="cursor-pointer d-flex justify-content-center">
                  <Input
                    type="number"
                    placeholder="%"
                    className="text-end font-small-2"
                    onChange={(e) => handleChangeLabor(e, 6)}
                  />
                </div>
              </td>
            </tbody>
          </>
        ) : null}
      </table>
      <Row className="mt-3 mx-1">
        <Col md="6" sm="12">
          <div className="d-flex align-items-center">
            <Label className="form-label" for="checkoutNumber" style={{ flex: '2' }}>
              Employee can clock in (before):
            </Label>
            <Select
              classNamePrefix="select"
              options={durationOptions}
              className="react-select select-duration"
              isClearable={false}
              defaultValue={durationOptions[0]}
              onChange={({ value }) => setLimitMins(value)}
            />
          </div>
          <div className="d-flex align-items-center justify-content-between mt-1">
            <Label className="form-label" for="checkoutNumber">
              Employees types that must clock in:
            </Label>
            <Select
              classNamePrefix="select"
              options={employeeTypeOptions}
              className="react-select select-employee-type"
              isClearable={false}
              defaultValue={employeeTypeOptions[0]}
              onChange={({ value }) => setNeedPunch(value)}
            />
          </div>
          <div className="d-flex align-items-center justify-content-between mt-1">
            <Label className="form-label" for="checkoutNumber">
              Employees can use facial recognition to clock in:
            </Label>
            <Form>
              <FormGroup switch>
                <Input
                  type="switch"
                  role="switch"
                  name="faceRecognitionEnable"
                  onChange={(e) => faceRecognitionHandler(e)}
                />
                <Label check></Label>
              </FormGroup>
            </Form>
          </div>
        </Col>
      </Row>
      {openfooter ? (
        <div className="my-1 d-flex justify-content-end me-1" style={{ height: '38px' }}>
          <div className="position-absolute">
            <Button color="primary" onClick={(e) => editClickHandler(e)} className="me-1">
              Edit
            </Button>
            {/* <Button color="primary" onClick={(e) => saveClickHandler(e)}>
              Save
            </Button> */}
          </div>
        </div>
      ) : (
        <></>
      )}
      {/* Save Modal */}
      <Modal toggle={deleteToggle} centered isOpen={isDeleteOpen}>
        <ModalBody>
          <div>
            <h3>Are you sure to Save?</h3>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button size="sm" onClick={(e) => deleteToggle()}>
            Cancel
          </Button>
          <Button
            // disabled={deleteLoading}
            size="sm"
            color="primary"
            onClick={() => {
              saveClickHandler();
            }}
          >
            Save
          </Button>{' '}
        </ModalFooter>
      </Modal>
    </>
  );
};

export default LaborTool;
