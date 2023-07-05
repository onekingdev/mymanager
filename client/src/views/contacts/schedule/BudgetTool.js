import React, { useMemo, useState, useEffect } from 'react';
import { Input, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getBudgetAction } from './store/actions';
import { toast } from 'react-toastify';
const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const colors = ['brown', 'grey', 'orange', '#1774e7', 'brown', 'black', 'red', 'green', 'pink'];

const BudetTool = ({ openfooter, handleClickOpen }) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.employeeContact);
  const budgetStore = useSelector((state) => state.employeeSchedule);
  const [salesProjected, setSalesProjected] = useState([]);
  const [laborProjected, setLaborProjected] = useState([]);
  const [calDone, setCalDone] = useState(true);

  const budgets = budgetStore?.budgets?.salesProjected;
  useEffect(() => {
    if (budgets && budgets.length > 0) {
      setSalesProjected(budgets[budgets.length - 1].projectedSales);
      setLaborProjected(budgets[budgets.length - 1].projectedLabors);
    }
  }, [budgetStore?.budgets]);

  // ** Sales Projected
  useEffect(() => {
    dispatch(getBudgetAction());
  }, []);

  const [totalHrs, setTotalHrs] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);
  const [totalPercentage, setTotalPercentage] = useState(0);
  const [employeeCategoryList, setEmpCatList] = useState([]);
  const [dailyPercentArr, setDailyPercentArr] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [atlArr, setAtlArr] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [isActive, setIsActive] = useState(true);
  useEffect(() => {
    if (store && store.employeeCategory) {
      setEmpCatList(store?.employeeCategory?.data);
    }
  }, [store]);
  useMemo(() => {
    let tmp = new Array(7).fill(0),
      tmpTotalSpend = 0,
      tmpTotalLabor = 0,
      tmpTotalPercentage = 0;
    tmp.map((item, index) => {
      if (
        dailyPercentArr[index] !== 0 &&
        atlArr[index] !== 0 &&
        dailyPercentArr[index] &&
        atlArr[index]
      ) {
        tmpTotalSpend = tmpTotalSpend + parseFloat(atlArr[index]);
        tmpTotalPercentage = tmpTotalPercentage + parseFloat(dailyPercentArr[index]);
      } else {
        return 0;
      }
    });
    setTotalPercentage((tmpTotalPercentage / 7).toFixed(2));
    setTotalSpend(tmpTotalSpend.toFixed(2));
  }, [atlArr]);
  const handleChangeSaleActual = (e, index) => {
    let tmpPercent = [...dailyPercentArr],
      tmpValue = [...atlArr];
    tmpValue[index] = parseFloat(e.target.value);
    if (!salesProjected[index] == 0) {
      tmpPercent[index] = parseFloat(
        ((parseFloat(e.target.value) / salesProjected[index]) * 100).toFixed(2)
      );
    } else {
      tmpPercent[index] = 0;
    }
    setDailyPercentArr(tmpPercent);
    setAtlArr(tmpValue);
  };
  const handleChangeLaborActual = (e, index) => {};

  const saveClickHandler = (e) => {
    toast.success('Successfully saved');
  };
  const editClickHandler = (e) => {
    setIsActive(false);
  };

  return (
    <>
      <table className="w-100 bordered-table">
        <thead style={{ background: '#f3f2f7' }}>
          <td className="border px-3">
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
              <div className="d-flex ">
                <span
                  className="labour-header-badge d-flex h-100 align-items-center px-50 text-white font-small-1"
                  style={{ backgroundColor: colors[3] }}
                >
                  {totalPercentage}%
                </span>
                <span
                  className="font-small-2 text-end ms-1"
                  style={{
                    fontWeight: 'bold'
                  }}
                >
                  {totalHrs}Hrs, <br /> ${totalSpend}
                </span>
              </div>
            </div>
          </td>
          <td className="border" colSpan={2}>
            <div className="d-flex justify-content-around">
              <span
                className="labour-header-badge d-flex h-100 align-items-center px-50 text-white font-small-1"
                style={{ backgroundColor: colors[3] }}
              >
                {dailyPercentArr[0] ? dailyPercentArr[0] : 0}%
              </span>
              <span
                className="font-small-2 text-end ms-50 text-nowrap"
                style={{
                  fontWeight: 'bold'
                }}
              >
                0 Hrs, <br /> ${atlArr[0] ? atlArr[0] : 0}
              </span>
            </div>
          </td>
          <td className="border" colSpan={2}>
            <div className="d-flex justify-content-around">
              <span
                className="labour-header-badge d-flex h-100 align-items-center px-50 text-white font-small-1"
                style={{ backgroundColor: colors[3] }}
              >
                {dailyPercentArr[1] ? dailyPercentArr[1] : 0}%
              </span>
              <span
                className="font-small-2 text-end ms-50 text-nowrap"
                style={{
                  fontWeight: 'bold'
                }}
              >
                0 Hrs, <br /> ${atlArr[1] ? atlArr[1] : 0}
              </span>
            </div>
          </td>
          <td className="border" colSpan={2}>
            <div className="d-flex justify-content-around">
              <span
                className="labour-header-badge d-flex h-100 align-items-center px-50 text-white font-small-1"
                style={{ backgroundColor: colors[3] }}
              >
                {dailyPercentArr[2] ? dailyPercentArr[2] : 0}%
              </span>
              <span
                className="font-small-2 text-end ms-50 text-nowrap"
                style={{
                  fontWeight: 'bold'
                }}
              >
                0 Hrs, <br /> ${atlArr[2] ? atlArr[2] : 0}
              </span>
            </div>
          </td>
          <td className="border" colSpan={2}>
            <div className="d-flex justify-content-around">
              <span
                className="labour-header-badge d-flex h-100 align-items-center px-50 text-white font-small-1"
                style={{ backgroundColor: colors[3] }}
              >
                {dailyPercentArr[3] ? dailyPercentArr[3] : 0}%
              </span>
              <span
                className="font-small-2 text-end ms-50 text-nowrap"
                style={{
                  fontWeight: 'bold'
                }}
              >
                0 Hrs, <br /> ${atlArr[3] ? atlArr[3] : 0}
              </span>
            </div>
          </td>
          <td className="border" colSpan={2}>
            <div className="d-flex justify-content-around">
              <span
                className="labour-header-badge d-flex h-100 align-items-center px-50 text-white font-small-1"
                style={{ backgroundColor: colors[3] }}
              >
                {dailyPercentArr[4] ? dailyPercentArr[4] : 0}%
              </span>
              <span
                className="font-small-2 text-end ms-50 text-nowrap"
                style={{
                  fontWeight: 'bold'
                }}
              >
                0 Hrs, <br /> ${atlArr[4] ? atlArr[4] : 0}
              </span>
            </div>
          </td>
          <td className="border" colSpan={2}>
            <div className="d-flex justify-content-around">
              <span
                className="labour-header-badge d-flex h-100 align-items-center px-50 text-white font-small-1"
                style={{ backgroundColor: colors[3] }}
              >
                {dailyPercentArr[5] ? dailyPercentArr[5] : 0}%
              </span>
              <span
                className="font-small-2 text-end ms-50 text-nowrap"
                style={{
                  fontWeight: 'bold'
                }}
              >
                0 Hrs, <br /> ${atlArr[5] ? atlArr[5] : 0}
              </span>
            </div>
          </td>
          <td className="border" colSpan={2}>
            <div className="d-flex justify-content-around">
              <span
                className="labour-header-badge d-flex h-100 align-items-center px-50 text-white font-small-1"
                style={{ backgroundColor: colors[3] }}
              >
                {dailyPercentArr[6] ? dailyPercentArr[6] : 0}%
              </span>
              <span
                className="font-small-2 text-end ms-50 text-nowrap"
                style={{
                  fontWeight: 'bold'
                }}
              >
                0 Hrs, <br /> ${atlArr[6] ? atlArr[6] : 0}
              </span>
            </div>
          </td>
        </tbody>
        <tbody className="bg-dark">
          <td className="border">
            <div className="d-flex justify-content-between p-50 align-items-center font-small-2">
              <div className="text-white">Compare to actuals</div>
            </div>
          </td>
          <td className="border">
            <span className="d-flex h-100 align-items-center px-1 font-small-2 text-white">
              Projected
            </span>
          </td>
          <td className="border">
            <span className="d-flex h-100 align-items-center px-1 font-small-2 text-white">
              Actuals
            </span>
          </td>
          <td className="border">
            <span className="d-flex h-100 align-items-center px-1 font-small-2 text-white">
              Projected
            </span>
          </td>
          <td className="border">
            <span className="d-flex h-100 align-items-center px-1 font-small-2 text-white">
              Actuals
            </span>
          </td>
          <td className="border">
            <span className="d-flex h-100 align-items-center px-1 font-small-2 text-white">
              Projected
            </span>
          </td>
          <td className="border">
            <span className="d-flex h-100 align-items-center px-1 font-small-2 text-white">
              Actuals
            </span>
          </td>
          <td className="border">
            <span className="d-flex h-100 align-items-center px-1 font-small-2 text-white">
              Projected
            </span>
          </td>
          <td className="border">
            <span className="d-flex h-100 align-items-center px-1 font-small-2 text-white">
              Actuals
            </span>
          </td>
          <td className="border">
            <span className="d-flex h-100 align-items-center px-1 font-small-2 text-white">
              Projected
            </span>
          </td>
          <td className="border">
            <span className="d-flex h-100 align-items-center px-1 font-small-2 text-white">
              Actuals
            </span>
          </td>
          <td className="border">
            <span className="d-flex h-100 align-items-center px-1 font-small-2 text-white">
              Projected
            </span>
          </td>
          <td className="border">
            <span className="d-flex h-100 align-items-center px-1 font-small-2 text-white">
              Actuals
            </span>
          </td>
          <td className="border">
            <span className="d-flex h-100 align-items-center px-1 font-small-2 text-white">
              Projected
            </span>
          </td>
          <td className="border">
            <span className="d-flex h-100 align-items-center px-1 font-small-2 text-white">
              Actuals
            </span>
          </td>
        </tbody>
        {openfooter ? (
          <>
            <tbody className="pr-1 pl-1">
              <td className="border">
                <div className="d-flex justify-content-between  align-items-center p-1">
                  <span className="font-small-2">Sales</span>
                  {/* <div>$0 proj.($0 act.)</div> */}
                </div>
              </td>
              <td className="border p-50">
                <div className="cursor-pointer d-flex justify-content-end">
                  {/* <Input
                    disabled={isActive}
                  type="number"
                  placeholder="$"
                  className="text-end "
                  onChange={(e) => handleChangeSaleProjected(e, 0)}
                /> */}
                  <span className="font-small-2 text-end">${salesProjected[0]}</span>
                </div>
              </td>
              <td className="border p-50">
                <div className="cursor-pointer d-flex justify-content-center">
                  <Input
                    type="number"
                    placeholder="$"
                    className="text-end font-small-2"
                    onChange={(e) => handleChangeSaleActual(e, 0)}
                  />
                </div>
              </td>
              <td className="border p-50">
                <div className="cursor-pointer d-flex justify-content-end">
                  {/* <Input
        
                  type="number"
                  placeholder="$"
                  className="text-end "
                  onChange={(e) => handleChangeSaleProjected(e, 0)}
                /> */}
                  <span className="font-small-2 text-end">${salesProjected[1]}</span>
                </div>
              </td>
              <td className="border p-50">
                <div className="cursor-pointer d-flex justify-content-center">
                  <Input
                    type="number"
                    placeholder="$"
                    className="text-end font-small-2"
                    onChange={(e) => handleChangeSaleActual(e, 1)}
                  />
                </div>
              </td>
              <td className="border p-50">
                <div className="cursor-pointer d-flex justify-content-end">
                  {/* <Input
             
                  type="number"
                  placeholder="$"
                  className="text-end "
                  onChange={(e) => handleChangeSaleProjected(e, 0)}
                /> */}
                  <span className="font-small-2 text-end">${salesProjected[2]}</span>
                </div>
              </td>
              <td className="border p-50">
                <div className="cursor-pointer d-flex justify-content-center">
                  <Input
                    type="number"
                    placeholder="$"
                    className="text-end font-small-2"
                    onChange={(e) => handleChangeSaleActual(e, 2)}
                  />
                </div>
              </td>
              <td className="border p-50">
                <div className="cursor-pointer d-flex justify-content-end">
                  {/* <Input
          
                  type="number"
                  placeholder="$"
                  className="text-end "
                  onChange={(e) => handleChangeSaleProjected(e, 0)}
                /> */}
                  <span className="font-small-2 text-end">${salesProjected[3]}</span>
                </div>
              </td>
              <td className="border p-50">
                <div className="cursor-pointer d-flex justify-content-center">
                  <Input
                    type="number"
                    placeholder="$"
                    className="text-end font-small-2"
                    onChange={(e) => handleChangeSaleActual(e, 3)}
                  />
                </div>
              </td>
              <td className="border p-50">
                <div className="cursor-pointer d-flex justify-content-end">
                  {/* <Input
              
                  type="number"
                  placeholder="$"
                  className="text-end "
                  onChange={(e) => handleChangeSaleProjected(e, 0)}
                /> */}
                  <span className="font-small-2 text-end">${salesProjected[4]}</span>
                </div>
              </td>
              <td className="border p-50">
                <div className="cursor-pointer d-flex justify-content-center">
                  <Input
                    type="number"
                    placeholder="$"
                    className="text-end font-small-2"
                    onChange={(e) => handleChangeSaleActual(e, 4)}
                  />
                </div>
              </td>
              <td className="border p-50">
                <div className="cursor-pointer d-flex justify-content-end">
                  {/* <Input
                  
                  type="number"
                  placeholder="$"
                  className="text-end "
                  onChange={(e) => handleChangeSaleProjected(e, 0)}
                /> */}
                  <span className="font-small-2 text-end">${salesProjected[5]}</span>
                </div>
              </td>
              <td className="border p-50">
                <div className="cursor-pointer d-flex justify-content-center">
                  <Input
                    type="number"
                    placeholder="$"
                    className="text-end font-small-2"
                    onChange={(e) => handleChangeSaleActual(e, 5)}
                  />
                </div>
              </td>
              <td className="border p-50">
                <div className="cursor-pointer d-flex justify-content-end">
                  {/* <Input
          
                  type="number"
                  placeholder="$"
                  className="text-end "
                  onChange={(e) => handleChangeSaleProjected(e, 0)}
                /> */}
                  <span className="font-small-2 text-end">${salesProjected[6]}</span>
                </div>
              </td>
              <td className="border p-50">
                <div className="cursor-pointer d-flex justify-content-center">
                  <Input
                    type="number"
                    placeholder="$"
                    className="text-end font-small-2"
                    onChange={(e) => handleChangeSaleActual(e, 6)}
                  />
                </div>
              </td>
            </tbody>
            <tbody>
              <td className="border">
                <div className="d-flex justify-content-between  align-items-center p-1">
                  <span className="font-small-2">Labor</span>
                  {/* <div>$0 proj.($0 act.)</div> */}
                </div>
              </td>
              <td className="border p-50">
                <div className="cursor-pointer d-flex justify-content-end">
                  {/* <Input
         
                  type="number"
                  placeholder="$"
                  className="text-end "
                  onChange={(e) => handleChangeSaleProjected(e, 0)}
                /> */}
                  <span className="font-small-2 text-end">${laborProjected[0]}</span>
                </div>
              </td>
              <td className="border p-50">
                <div className="cursor-pointer d-flex justify-content-center">
                  <Input
                    type="number"
                    placeholder="$"
                    className="text-end font-small-2"
                    onChange={(e) => handleChangeLaborActual(e, 0)}
                  />
                </div>
              </td>
              <td className="border p-50">
                <div className="cursor-pointer d-flex justify-content-end">
                  {/* <Input
             
                  type="number"
                  placeholder="$"
                  className="text-end "
                  onChange={(e) => handleChangeSaleProjected(e, 0)}
                /> */}
                  <span className="font-small-2 text-end">${laborProjected[1]}</span>
                </div>
              </td>
              <td className="border p-50">
                <div className="cursor-pointer d-flex justify-content-center">
                  <Input
                    type="number"
                    placeholder="$"
                    className="text-end font-small-2"
                    onChange={(e) => handleChangeLaborActual(e, 1)}
                  />
                </div>
              </td>
              <td className="border p-50">
                <div className="cursor-pointer d-flex justify-content-end">
                  {/* <Input
     
                  type="number"
                  placeholder="$"
                  className="text-end "
                  onChange={(e) => handleChangeSaleProjected(e, 0)}
                /> */}
                  <span className="font-small-2 text-end">${laborProjected[2]}</span>
                </div>
              </td>
              <td className="border p-50">
                <div className="cursor-pointer d-flex justify-content-center">
                  <Input
                    type="number"
                    placeholder="$"
                    className="text-end font-small-2"
                    onChange={(e) => handleChangeLaborActual(e, 2)}
                  />
                </div>
              </td>
              <td className="border p-50">
                <div className="cursor-pointer d-flex justify-content-end">
                  {/* <Input
           
                  type="number"
                  placeholder="$"
                  className="text-end "
                  onChange={(e) => handleChangeSaleProjected(e, 0)}
                /> */}
                  <span className="font-small-2 text-end">${laborProjected[3]}</span>
                </div>
              </td>
              <td className="border p-50">
                <div className="cursor-pointer d-flex justify-content-center">
                  <Input
                    type="number"
                    placeholder="$"
                    className="text-end font-small-2"
                    onChange={(e) => handleChangeLaborActual(e, 3)}
                  />
                </div>
              </td>
              <td className="border p-50">
                <div className="cursor-pointer d-flex justify-content-end">
                  {/* <Input
         
                  type="number"
                  placeholder="$"
                  className="text-end "
                  onChange={(e) => handleChangeSaleProjected(e, 0)}
                /> */}
                  <span className="font-small-2 text-end">${laborProjected[4]}</span>
                </div>
              </td>
              <td className="border p-50">
                <div className="cursor-pointer d-flex justify-content-center">
                  <Input
                    type="number"
                    placeholder="$"
                    className="text-end font-small-2"
                    onChange={(e) => handleChangeLaborActual(e, 4)}
                  />
                </div>
              </td>
              <td className="border p-50">
                <div className="cursor-pointer d-flex justify-content-end">
                  {/* <Input
           
                  type="number"
                  placeholder="$"
                  className="text-end "
                  onChange={(e) => handleChangeSaleProjected(e, 0)}
                /> */}
                  <span className="font-small-2 text-end">${laborProjected[5]}</span>
                </div>
              </td>
              <td className="border p-50">
                <div className="cursor-pointer d-flex justify-content-center">
                  <Input
                    type="number"
                    placeholder="$"
                    className="text-end font-small-2"
                    onChange={(e) => handleChangeLaborActual(e, 5)}
                  />
                </div>
              </td>
              <td className="border p-50">
                <div className="cursor-pointer d-flex justify-content-end">
                  {/* <Input
                  
                  type="number"
                  placeholder="$"
                  className="text-end "
                  onChange={(e) => handleChangeSaleProjected(e, 0)}
                /> */}
                  <span className="font-small-2 text-end">${laborProjected[6]}</span>
                </div>
              </td>
              <td className="border p-50">
                <div className="cursor-pointer d-flex justify-content-center">
                  <Input
                    type="number"
                    placeholder="$"
                    className="text-end font-small-2"
                    onChange={(e) => handleChangeLaborActual(e, 6)}
                  />
                </div>
              </td>
            </tbody>

            {employeeCategoryList.map((categoryItem, index) => {
              return (
                <tbody>
                  <td className="border">
                    <div className="d-flex justify-content-between p-50 align-items-center">
                      <div style={{ fontWeight: 'Bold' }}>
                        <h6 className="text-capitalize font-small-2">{categoryItem.category}</h6>
                      </div>
                      <div className="d-flex ">
                        <span
                          className="labour-header-badge d-flex h-100 align-items-center px-50 text-white"
                          style={{ backgroundColor: colors[index] }}
                        >
                          0%
                        </span>
                        <span
                          className="font-small-2 text-end ms-1 text-nowrap"
                          style={{
                            fontWeight: 'bold'
                          }}
                        >
                          0 Hrs, <br /> $0
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="border px-1">
                    <div className="d-flex justify-content-between">
                      <span
                        className="labour-header-badge d-flex h-100 align-items-center px-50 text-white"
                        style={{ backgroundColor: colors[index] }}
                      >
                        0%
                      </span>
                      <span
                        className="font-small-2 text-end text-nowrap ms-1"
                        style={{
                          fontWeight: 'bold'
                        }}
                      >
                        0 Hrs, <br /> $0
                      </span>
                    </div>
                  </td>
                  <td className="border px-1">
                    <div className="d-flex justify-content-between">
                      <span
                        className="labour-header-badge d-flex h-100 align-items-center px-50 text-white"
                        style={{ backgroundColor: colors[index] }}
                      >
                        0%
                      </span>
                      <span
                        className="font-small-2 text-end text-nowrap ms-1"
                        style={{
                          fontWeight: 'bold'
                        }}
                      >
                        0 Hrs, <br /> $0
                      </span>
                    </div>
                  </td>
                  <td className="border px-1">
                    <div className="d-flex justify-content-between">
                      <span
                        className="labour-header-badge d-flex h-100 align-items-center px-50 text-white"
                        style={{ backgroundColor: colors[index] }}
                      >
                        0%
                      </span>
                      <span
                        className="font-small-2 text-end text-nowrap ms-1"
                        style={{
                          fontWeight: 'bold'
                        }}
                      >
                        0 Hrs, <br /> $0
                      </span>
                    </div>
                  </td>
                  <td className="border px-1">
                    <div className="d-flex justify-content-between">
                      <span
                        className="labour-header-badge d-flex h-100 align-items-center px-50 text-white"
                        style={{ backgroundColor: colors[index] }}
                      >
                        0%
                      </span>
                      <span
                        className="font-small-2 text-end text-nowrap ms-1"
                        style={{
                          fontWeight: 'bold'
                        }}
                      >
                        0 Hrs, <br /> $0
                      </span>
                    </div>
                  </td>
                  <td className="border px-1">
                    <div className="d-flex justify-content-between">
                      <span
                        className="labour-header-badge d-flex h-100 align-items-center px-50 text-white"
                        style={{ backgroundColor: colors[index] }}
                      >
                        0%
                      </span>
                      <span
                        className="font-small-2 text-end text-nowrap ms-1"
                        style={{
                          fontWeight: 'bold'
                        }}
                      >
                        0 Hrs, <br /> $0
                      </span>
                    </div>
                  </td>
                  <td className="border px-1">
                    <div className="d-flex justify-content-between">
                      <span
                        className="labour-header-badge d-flex h-100 align-items-center px-50 text-white"
                        style={{ backgroundColor: colors[index] }}
                      >
                        0%
                      </span>
                      <span
                        className="font-small-2 text-end text-nowrap ms-1"
                        style={{
                          fontWeight: 'bold'
                        }}
                      >
                        0 Hrs, <br /> $0
                      </span>
                    </div>
                  </td>
                  <td className="border px-1">
                    <div className="d-flex justify-content-between">
                      <span
                        className="labour-header-badge d-flex h-100 align-items-center px-50 text-white"
                        style={{ backgroundColor: colors[index] }}
                      >
                        0%
                      </span>
                      <span
                        className="font-small-2 text-end text-nowrap ms-1"
                        style={{
                          fontWeight: 'bold'
                        }}
                      >
                        0 Hrs, <br /> $0
                      </span>
                    </div>
                  </td>
                  <td className="border px-1">
                    <div className="d-flex justify-content-between">
                      <span
                        className="labour-header-badge d-flex h-100 align-items-center px-50 text-white"
                        style={{ backgroundColor: colors[index] }}
                      >
                        0%
                      </span>
                      <span
                        className="font-small-2 text-end text-nowrap ms-1"
                        style={{
                          fontWeight: 'bold'
                        }}
                      >
                        0 Hrs, <br /> $0
                      </span>
                    </div>
                  </td>
                  <td className="border px-1">
                    <div className="d-flex justify-content-between">
                      <span
                        className="labour-header-badge d-flex h-100 align-items-center px-50 text-white"
                        style={{ backgroundColor: colors[index] }}
                      >
                        0%
                      </span>
                      <span
                        className="font-small-2 text-end text-nowrap ms-1"
                        style={{
                          fontWeight: 'bold'
                        }}
                      >
                        0 Hrs, <br /> $0
                      </span>
                    </div>
                  </td>
                  <td className="border px-1">
                    <div className="d-flex justify-content-between">
                      <span
                        className="labour-header-badge d-flex h-100 align-items-center px-50 text-white"
                        style={{ backgroundColor: colors[index] }}
                      >
                        0%
                      </span>
                      <span
                        className="font-small-2 text-end text-nowrap ms-1"
                        style={{
                          fontWeight: 'bold'
                        }}
                      >
                        0 Hrs, <br /> $0
                      </span>
                    </div>
                  </td>
                  <td className="border px-1">
                    <div className="d-flex justify-content-between">
                      <span
                        className="labour-header-badge d-flex h-100 align-items-center px-50 text-white"
                        style={{ backgroundColor: colors[index] }}
                      >
                        0%
                      </span>
                      <span
                        className="font-small-2 text-end text-nowrap ms-1"
                        style={{
                          fontWeight: 'bold'
                        }}
                      >
                        0 Hrs, <br /> $0
                      </span>
                    </div>
                  </td>
                  <td className="border px-1">
                    <div className="d-flex justify-content-between">
                      <span
                        className="labour-header-badge d-flex h-100 align-items-center px-50 text-white"
                        style={{ backgroundColor: colors[index] }}
                      >
                        0%
                      </span>
                      <span
                        className="font-small-2 text-end text-nowrap ms-1"
                        style={{
                          fontWeight: 'bold'
                        }}
                      >
                        0 Hrs, <br /> $0
                      </span>
                    </div>
                  </td>
                  <td className="border px-1">
                    <div className="d-flex justify-content-between">
                      <span
                        className="labour-header-badge d-flex h-100 align-items-center px-50 text-white"
                        style={{ backgroundColor: colors[index] }}
                      >
                        0%
                      </span>
                      <span
                        className="font-small-2 text-end text-nowrap ms-1"
                        style={{
                          fontWeight: 'bold'
                        }}
                      >
                        0 Hrs, <br /> $0
                      </span>
                    </div>
                  </td>
                  <td className="border px-1">
                    <div className="d-flex justify-content-between">
                      <span
                        className="labour-header-badge d-flex h-100 align-items-center px-50 text-white"
                        style={{ backgroundColor: colors[index] }}
                      >
                        0%
                      </span>
                      <span
                        className="font-small-2 text-end text-nowrap ms-1"
                        style={{
                          fontWeight: 'bold'
                        }}
                      >
                        0 Hrs, <br /> $0
                      </span>
                    </div>
                  </td>
                </tbody>
              );
            })}
          </>
        ) : null}
      </table>
      {/* {openfooter ? (
        <div className="my-1 d-flex justify-content-end me-1" style={{ height: '38px' }}>
          <div className="position-absolute">
            <Button color="primary" onClick={(e) => editClickHandler(e)} className="me-1">
              Edit
            </Button>
            <Button color="primary" onClick={(e) => saveClickHandler(e)}>
              Save
            </Button>
          </div>
        </div>
      ) : (
        <></>
      )} */}
    </>
  );
};

export default BudetTool;
