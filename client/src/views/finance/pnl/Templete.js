import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Download } from 'react-feather';
import { BiChevronDown } from 'react-icons/bi';
import {
  MdDownload,
  MdMailOutline,
  MdOutlineDownloadForOffline,
  MdOutlineGetApp,
  MdPrint
} from 'react-icons/md';
import Select from 'react-select';
import '../../../assets/scss/style.css';

import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown
} from 'reactstrap';
import moment from 'moment';
import SendSidebar from './SendSidebar';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ReactToPrint from 'react-to-print';

const customStyles = {
  control: (provided) => ({
    ...provided,
    width: 120, // set the width to 200px
    height: '30px',
    margin: '5px'
  })
};

function Templete({ store }) {
  const [month1, setMonth1] = useState(moment().add(-1, 'month').month());
  const [month2, setMonth2] = useState(moment().month());
  const [year1, setYear1] = useState(moment().year());
  const [year2, setYear2] = useState(moment().year());
  const [ytd, setYtd] = useState(moment().year());

  const [month1TotalIncome, setMonth1TotalIncome] = useState(0);
  const [month2TotalIncome, setMonth2TotalIncome] = useState(0);
  const [yearTotalIncome, setYearTotalIncome] = useState(0);

  const [month1TotalExpense, setMonth1TotalExpense] = useState(0);
  const [month2TotalExpense, setMonth2TotalExpense] = useState(0);
  const [yearTotalExpense, setYearTotalExpense] = useState(0);

  const [incomeListByCategory, setIncomeListByCategory] = useState([]);

  const [openSend, setOpenSend] = useState(false);

  const printRef = useRef();

  const toggleOpenSend = () => setOpenSend(!openSend);

  const monthOptions = [
    { value: 0, label: 'January' },
    { value: 1, label: 'February' },
    { value: 2, label: 'March' },
    { value: 3, label: 'April' },
    { value: 4, label: 'May' },
    { value: 5, label: 'June' },
    { value: 6, label: 'July' },
    { value: 7, label: 'August' },
    { value: 8, label: 'September' },
    { value: 9, label: 'October' },
    { value: 10, label: 'November' },
    { value: 11, label: 'December' }
  ];

  // Define options for year dropdown
  const yearOptions = [
    { value: '2021', label: '2021' },
    { value: '2022', label: '2022' },
    { value: '2023', label: '2023' },
    { value: '2024', label: '2024' },
    { value: '2025', label: '2025' }
  ];

  useEffect(() => {
    if (store.IncomeList) {
      //month 1 total
      const t1 = store.IncomeList.filter(
        (item) =>
          moment(item.date).year() === Number(year1) && moment(item.date).month() === Number(month1)
        //item.categoryId.type === 'income'
      );
      const ta1 = t1
        .filter((x) => x.categoryId.type === 'income')
        .map((item) => item.amount)
        .reduce((prev, current) => {
          return prev + current;
        }, 0);
      setMonth1TotalIncome(ta1);
      const ta1Expense = t1
        .filter((x) => x.categoryId.type === 'expense')
        .map((item) => item.amount)
        .reduce((prev, current) => {
          return prev + current;
        }, 0);
      setMonth1TotalExpense(-1 * ta1Expense);

      //month2 total
      const t2 = store.IncomeList.filter(
        (item) =>
          moment(item.date).year() === Number(year2) && moment(item.date).month() === Number(month2)
        //item.categoryId.type === 'income'
      );
      const ta2 = t2
        .filter((x) => x.categoryId.type === 'income')
        .map((item) => item.amount)
        .reduce((prev, current) => {
          return prev + current;
        }, 0);
      setMonth2TotalIncome(ta2);

      const ta2Expense = t2
        .filter((x) => x.categoryId.type === 'expense')
        .map((item) => item.amount)
        .reduce((prev, current) => {
          return prev + current;
        }, 0);
      setMonth2TotalExpense(-1 * ta2Expense);
      //year total
      const t3 = store.IncomeList.filter(
        (item) => moment(item.date).year() === Number(ytd)
        //&& item.categoryId.type === 'income'
      );

      let itemsByCat = [];
      for (const item of store.categoryList) {
        let c1 = t1.filter((x) => x.categoryId._id === item._id);
        let c2 = t2.filter((x) => x.categoryId._id === item._id);
        let c3 = t3.filter((x) => x.categoryId._id === item._id);
        let rows = { catId: item._id, values: [], totalMonth1: 0, totalMonth2: 0, totalYear: 0 };
        for (const y of c1) {
          if (y.invoiceId) {
            let items = y.invoiceId.items;
            let tax = 0; // tax in percent
            let discount = 0; // discount in percent
            if (y.invoiceId.tax > 0) {
              tax = y.invoiceId.tax / y.invoiceId.totalAmount;
            }
            if (y.invoiceId.discount > 0) {
              discount = y.invoiceId.discount / y.invoiceId.totalAmount;
            }
            for (const i of items) {
              let exists = rows.values.filter((x) => x.name === i.name);
              if (exists.length > 0) {
                if (exists[0].invoiceId !== y.invoiceId._id) {
                  let index = rows.values.indexOf(exists[0]);
                  let p = Number(i.rate || 0) * Number(i.quantity || 0);
                  let price =
                    Number(rows.values[index].totalMonth1 || 0) + p - p * discount + p * tax;
                  rows.values[index] = {
                    ...rows.values[index],
                    quantity: Number(rows.values[index].quantity) + Number(i.quantity),
                    totalMonth1: price
                  };
                }
              } else {
                let p = Number(i.rate || 0) * Number(i.quantity || 0);
                rows.values.push({
                  ...i,
                  totalMonth1: p - discount * p + tax * p,
                  invoiceId: y.invoiceId._id
                });
              }
            }
          } else {
            let exists = rows.values.filter((x) => x.name === y.name);
            if (exists.length > 0) {
              let index = rows.values.indexOf(exists[0]);
              rows.values[index] = {
                ...rows.values[index],
                totalMonth1: (rows.values[index].totalMonth1 || 0) + Number(y.amount),
                quantity: rows.values[index].quantity + 1
              };
            } else {
              rows.values.push({ name: y.name, totalMonth1: y.amount, quantity: 1 });
            }
          }
        }

        for (const y of c2) {
          if (y.invoiceId) {
            let items = y?.invoiceId?.items;
            for (const i of items) {
              let exists = rows.values.filter((x) => x.name === i.name);
              let tax = 0; // tax in percent
              let discount = 0; // discount in percent
              if (y.invoiceId.tax > 0) {
                tax = Number(y.invoiceId.tax) / Number(y.invoiceId.totalAmount);
              }
              if (y.invoiceId.discount > 0) {
                discount = Number(y.invoiceId.discount) / Number(y.invoiceId.totalAmount);
              }
              if (exists.length > 0) {
                if (exists[0].totalMonth2 === undefined) {
                  let index = rows.values.indexOf(exists[0]);
                  let p = Number(i.rate || 0) * Number(i.quantity || 0);
                  let price =
                    Number(rows.values[index].totalMonth2 || 0) + p - p * discount + p * tax;
                  rows.values[index] = {
                    ...rows.values[index],
                    quantity: Number(rows.values[index].quantity) + Number(i.quantity),
                    totalMonth2: price
                  };
                } else {
                  if (exists[0].invoiceId !== y.invoiceId._id) {
                    let index = rows.values.indexOf(exists[0]);
                    let p = Number(i.rate || 0) * Number(i.quantity || 0);
                    let price =
                      Number(rows.values[index].totalMonth2 || 0) + p - p * discount + p * tax;
                    rows.values[index] = {
                      ...rows.values[index],
                      quantity: Number(rows.values[index].quantity) + Number(i.quantity),
                      totalMonth2: price
                    };
                  }
                }
              } else {
                let p = Number(i.rate || 0) * Number(i.quantity || 0);
                rows.values.push({
                  ...i,
                  totalMonth2: p - discount * p + tax * p,
                  invoiceId: y.invoiceId._id
                });
              }
            }
          } else {
            let exists = rows.values.filter((x) => x.name === y.name);
            if (exists.length > 0) {
              let index = rows.values.indexOf(exists[0]);
              rows.values[index] = {
                ...rows.values[index],
                totalMonth2: (rows.values[index].totalMonth2 || 0) + Number(y.amount || 0),
                quantity: rows.values[index].quantity + 1
              };
            } else {
              rows.values.push({ name: y.name, totalMonth2: Number(y.amount || 0), quantity: 1 });
            }
          }
        }
        for (const y of c3) {
          if (y.invoiceId) {
            let items = y?.invoiceId?.items;
            for (const i of items) {
              let exists = rows.values.filter((x) => x.name === i.name);
              let tax = 0; // tax in percent
              let discount = 0; // discount in percent
              if (y.invoiceId.tax > 0) {
                tax = Number(y.invoiceId.tax) / Number(y.invoiceId.totalAmount);
              }
              if (y.invoiceId.discount > 0) {
                discount = Number(y.invoiceId.discount) / Number(y.invoiceId.totalAmount);
              }
              if (exists.length > 0) {
                if (exists[0].ytd === undefined) {
                  let index = rows.values.indexOf(exists[0]);
                  let p = Number(i.rate || 0) * Number(i.quantity || 0);
                  let price = Number(rows.values[index].ytd || 0) + p - p * discount + p * tax;
                  rows.values[index] = {
                    ...rows.values[index],
                    ytd: price,
                    quantity: rows.values[index].quantity + Number(i.quantity)
                  };
                } else {
                  if (exists[0].invoiceId !== y.invoiceId._id) {
                    let index = rows.values.indexOf(exists[0]);
                    let p = Number(i.rate || 0) * Number(i.quantity || 0);

                    let price = Number(rows.values[index].ytd || 0) + p - p * discount + p * tax;
                    rows.values[index] = {
                      ...rows.values[index],
                      ytd: price,
                      quantity: rows.values[index].quantity + Number(i.quantity)
                    };
                  }
                }
              } else {
                let p = Number(i.rate || 0) * Number(i.quantity || 0);

                let price = p - p * discount + p * tax;
                rows.values.push({ ...i, ytd: price });
              }
            }
          } else {
            let exists = rows.values.filter((x) => x.name === y.name);
            if (exists.length > 0) {
              let index = rows.values.indexOf(exists[0]);
              rows.values[index] = {
                ...rows.values[index],
                ytd: (rows.values[index].ytd || 0) + Number(y.amount),
                quantity: rows.values[index].quantity + 1
              };
            } else {
              rows.values.push({ name: y.name, ytd: Number(y.amount || 0), quantity: 1 });
            }
          }
        }
        rows.totalYear = rows.values
          .map((item) => item.ytd)
          .reduce((prev, current) => {
            return Number(prev || 0) + Number(current || 0);
          }, 0);
        rows.totalMonth1 = rows.values
          .map((item) => item.totalMonth1)
          .reduce((prev, current) => {
            return Number(prev || 0) + Number(current || 0);
          }, 0);
        rows.totalMonth2 = rows.values
          .map((item) => item.totalMonth2)
          .reduce((prev, current) => {
            return Number(prev || 0) + Number(current || 0);
          }, 0);

        itemsByCat.push(rows);
      }
      setIncomeListByCategory(itemsByCat);
    }
  }, [month1, year1, month2, year2, ytd, store.IncomeList]);

  useEffect(() => {
    if (store.IncomeList) {
      const t = store.IncomeList.filter((item) => moment(item.date).year() === Number(ytd));
      const ta = t
        .filter((item) => item.categoryId.type === 'income')
        .map((item) => item.amount)
        .reduce((prev, current) => {
          return prev + current;
        }, 0);
      setYearTotalIncome(ta);

      const taExpense = t
        .filter((item) => item.categoryId.type === 'expense')
        .map((item) => item.amount)
        .reduce((prev, current) => {
          return prev + current;
        }, 0);
      setYearTotalExpense(-1 * taExpense);
    }
  }, [ytd, store.IncomeList]);

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
      doc.save(`profitLoss-${moment().format('MMDDYYYY')}.pdf`);
    });
  };
  const handlePrint = () => {};
  const handleSend = () => {
    toggleOpenSend();
  };

  return (
    <Row>
      <Col md="12" xs="12">
        <Card>
          <CardHeader>
            <div className="pl-title">
              <h4>P&amp;L Statements</h4>
              <span className="pl-subtitle">Profit &amp; Loss by Period</span>
            </div>
            <div className="pl-subtitle-area">
              <div>
                <span>
                  <Download
                    style={{
                      fontSize: '2em',
                      color: '#555555',
                      marginRight: '20px',
                      cursor: 'pointer'
                    }}
                    onClick={handleDownload}
                  />
                </span>

                {/* <a>
                  <MdMailOutline
                    style={{
                      fontSize: '2em',
                      color: '#0184FF',
                      marginRight: '20px',
                      cursor: 'pointer'
                    }}
                    onClick={handleSend}
                  />
                </a> */}

                <span>
                  <ReactToPrint
                    trigger={() => (
                      <MdPrint
                        style={{
                          fontSize: '2em',
                          color: '#403F90',
                          cursor: 'pointer'
                        }}
                      />
                    )}
                    content={() => printRef.current}
                  />
                </span>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <div className="">
              <div>
                <Row>
                  <Col md={3}></Col>
                  <Col md={3} className="mb-1">
                    <h4 className="d-flex justify-content-center">
                      {monthOptions.find((x) => x.value === month1).label} {year1}
                    </h4>
                    <div className="d-flex justify-content-center">
                      <Select
                        styles={customStyles}
                        options={monthOptions}
                        onChange={(val) => {
                          setMonth1(val.value);
                        }}
                        value={monthOptions.find((x) => x.value === month1)}
                      />
                      <Select
                        styles={customStyles}
                        options={yearOptions}
                        onChange={(val) => setYear1(val.value)}
                        value={yearOptions.find((x) => x.value === year1)}
                      />
                    </div>
                  </Col>
                  <Col md={3}>
                    <h4 className="d-flex justify-content-center">
                      {monthOptions.find((x) => x.value === month2).label} {year2}
                    </h4>
                    <div className="d-flex justify-content-center">
                      <Select
                        styles={customStyles}
                        options={monthOptions}
                        onChange={(val) => setMonth2(val.value)}
                        value={monthOptions.find((x) => x.value === month2)}
                      />
                      <Select
                        styles={customStyles}
                        options={yearOptions}
                        onChange={(val) => setYear2(val.value)}
                        value={yearOptions.find((x) => x.value === year2)}
                      />
                    </div>
                  </Col>
                  <Col md={3}>
                    <h4 className="d-flex justify-content-around ">YTD</h4>
                    <div className="d-flex justify-content-center">
                      <Select
                        styles={customStyles}
                        options={yearOptions}
                        onChange={(val) => setYtd(val.value)}
                        value={yearOptions.find((x) => x.value === ytd)}
                      />
                    </div>
                  </Col>
                </Row>
              </div>
              <div id="printable" ref={printRef}>
                {/* PL Table Header Starts Here */}

                <table className="w-100">
                  <tr style={{ background: '#e7e3e3', height: '40px' }}>
                    <td style={{ width: '150px' }}>
                      <h4> Total Income</h4>
                    </td>
                    <td>
                      <h4 style={{ color: '#0eb73e' }} className="text-center">
                        ${month1TotalIncome}
                      </h4>
                    </td>
                    <td>
                      <h4 style={{ color: '#0eb73e' }} className="text-center">
                        ${month2TotalIncome}
                      </h4>
                    </td>
                    <td>
                      {' '}
                      <h4 style={{ color: '#0eb73e' }} className="text-center">
                        ${yearTotalIncome}
                      </h4>
                    </td>
                  </tr>
                </table>
                {/* PL Category */}

                {store?.categoryList &&
                  store.categoryList
                    .filter((x) => x.type === 'income')
                    .map((x, idx) => {
                      return (
                        <div key={idx}>
                          <div
                            style={{
                              borderRight: '1px solid lightgray',
                              borderLeft: '1px solid lightgray',
                              paddingLeft: '5px'
                            }}
                          >
                            <Row>
                              <Col md={3}>
                                <h5>{x.title}</h5>
                              </Col>
                              <Col md={3}></Col>
                              <Col md={3}></Col>
                              <Col md={3}></Col>
                            </Row>
                            {incomeListByCategory
                              .find((j) => j.catId === x._id)
                              ?.values.map((y, id) => {
                                return (
                                  <Row key={id}>
                                    <Col md={3}>
                                      <div>{y.name}</div>
                                    </Col>
                                    <Col md={3}>
                                      <Row>
                                        <Col md="8">${y.totalMonth1 || 0}</Col>
                                        <Col md="4">
                                          {month1TotalIncome > 0
                                            ? ` ${
                                                100 *
                                                (
                                                  Number(y.totalMonth1) / Number(month1TotalIncome)
                                                ).toFixed(1)
                                              } %`
                                            : '0 %'}
                                        </Col>
                                      </Row>
                                    </Col>
                                    <Col md={3}>
                                      <Row>
                                        <Col md="8">${y.totalMonth2 || 0}</Col>
                                        <Col md="4">
                                          {month2TotalIncome > 0
                                            ? ` ${
                                                100 *
                                                (
                                                  Number(y.totalMonth2) / Number(month2TotalIncome)
                                                ).toFixed(1)
                                              } %`
                                            : '0 %'}
                                        </Col>
                                      </Row>
                                    </Col>
                                    <Col md={3}>
                                      <Row>
                                        <Col md="8">${y.ytd || 0}</Col>
                                        <Col md="4">
                                          {yearTotalIncome > 0
                                            ? ` ${
                                                100 *
                                                (Number(y.ytd) / Number(yearTotalIncome)).toFixed(1)
                                              } %`
                                            : '0 %'}
                                        </Col>
                                      </Row>
                                    </Col>
                                  </Row>
                                );
                              })}
                          </div>

                          <div
                            style={{
                              borderRight: '1px solid lightgray',
                              borderLeft: '1px solid lightgray',
                              paddingLeft: '5px'
                            }}
                          >
                            <Row>
                              <Col md={3}>
                                <h6>Total {x.title}</h6>
                              </Col>
                              <Col md={3}>
                                <Row>
                                  <Col md="10">
                                    $
                                    {incomeListByCategory.find((j) => j.catId === x._id)
                                      ?.totalMonth1 === NaN
                                      ? 0
                                      : incomeListByCategory.find((j) => j.catId === x._id)
                                          ?.totalMonth1}
                                  </Col>
                                  <Col md="2"></Col>
                                </Row>
                              </Col>
                              <Col md={3}>
                                <Row>
                                  <Col md="10">
                                    $
                                    {incomeListByCategory.find((j) => j.catId === x._id)
                                      ?.totalMonth2 === NaN
                                      ? 0
                                      : incomeListByCategory.find((j) => j.catId === x._id)
                                          ?.totalMonth2}
                                  </Col>
                                  <Col md="2"></Col>
                                </Row>
                              </Col>
                              <Col md={3}>
                                <Row>
                                  <Col md="10">
                                    $
                                    {incomeListByCategory.find((j) => j.catId === x._id)
                                      ?.totalYear === NaN
                                      ? 0
                                      : incomeListByCategory.find((j) => j.catId === x._id)
                                          ?.totalYear}
                                  </Col>
                                  <Col md="2"></Col>
                                </Row>
                              </Col>
                            </Row>
                          </div>
                        </div>
                      );
                    })}

                {/* PL Table Header Starts Here */}
                <div
                  style={{
                    borderRight: '1px solid lightgray',
                    borderLeft: '1px solid lightgray',
                    paddingLeft: '15px',
                    paddingRight: '15px'
                  }}
                ></div>
                <table className="w-100">
                  <tr style={{ background: '#e7e3e3', height: '40px' }}>
                    <td style={{ width: '150px' }}>
                      <h4> Total Expense</h4>
                    </td>

                    <td>
                      <h4 style={{ color: '#ff2c2c', marginTop: '10px' }}>${month1TotalExpense}</h4>
                    </td>
                    <td>
                      <h4 style={{ color: '#ff2c2c', marginTop: '10px' }}>${month2TotalExpense}</h4>
                    </td>
                    <td>
                      {' '}
                      <h4 style={{ color: '#ff2c2c', marginTop: '10px' }}>${yearTotalExpense}</h4>
                    </td>
                  </tr>
                </table>
                {/* PL Table Header Ends here */}

                {/* Category, Sub Category & Total Set Starts Here */}
                <div
                  style={{
                    borderRight: '1px solid lightgray',
                    borderLeft: '1px solid lightgray',
                    paddingLeft: '5px'
                  }}
                >
                  <Row>
                    <Col md={3} className="mt-1">
                      <h5>Expense</h5>
                    </Col>
                    <Col md={3}></Col>
                    <Col md={3}></Col>
                    <Col md={3}></Col>
                  </Row>
                </div>

                {/* EXPENSES */}
                {store?.categoryList &&
                  store.categoryList
                    .filter((x) => x.type === 'expense')
                    .map((x, idx) => {
                      return (
                        <div key={idx}>
                          <div
                            style={{
                              borderRight: '1px solid lightgray',
                              borderLeft: '1px solid lightgray',
                              paddingLeft: '5px'
                            }}
                          >
                            <Row>
                              <Col md={3}>
                                <h5>{x.title}</h5>
                              </Col>
                              <Col md={3}></Col>
                              <Col md={3}></Col>
                              <Col md={3}></Col>
                            </Row>
                            {incomeListByCategory
                              .find((j) => j.catId === x._id)
                              ?.values.map((y, id) => {
                                return (
                                  <Row key={id}>
                                    <Col md={3}>
                                      <div>{y.name}</div>
                                    </Col>
                                    <Col md={3}>
                                      <Row>
                                        <Col md="8">${y.totalMonth1 || 0}</Col>
                                        <Col md="4">
                                          {month1TotalExpense > 0
                                            ? ` ${
                                                100 *
                                                (
                                                  Number(y.totalMonth1) / Number(month1TotalExpense)
                                                ).toFixed(1)
                                              } %`
                                            : '0 %'}
                                        </Col>
                                      </Row>
                                    </Col>
                                    <Col md={3}>
                                      <Row>
                                        <Col md="8">${y.totalMonth2 || 0}</Col>
                                        <Col md="4">
                                          {month2TotalExpense > 0
                                            ? ` ${
                                                100 *
                                                (
                                                  Number(y.totalMonth2) / Number(month2TotalExpense)
                                                ).toFixed(1)
                                              } %`
                                            : '0 %'}
                                        </Col>
                                      </Row>
                                    </Col>
                                    <Col md={3}>
                                      <Row>
                                        <Col md="8">${y.ytd || 0}</Col>
                                        <Col md="4">
                                          {yearTotalExpense > 0
                                            ? ` ${
                                                100 *
                                                (Number(y.ytd) / Number(yearTotalExpense)).toFixed(
                                                  1
                                                )
                                              } %`
                                            : '0 %'}
                                        </Col>
                                      </Row>
                                    </Col>
                                  </Row>
                                );
                              })}
                          </div>

                          <div
                            style={{
                              borderRight: '1px solid lightgray',
                              borderLeft: '1px solid lightgray',
                              paddingLeft: '5px'
                            }}
                          >
                            <Row>
                              <Col md={3}>
                                <h6>Total {x.title}</h6>
                              </Col>
                              <Col md={3}>
                                <Row>
                                  <Col md="10">
                                    $
                                    {incomeListByCategory.find((j) => j.catId === x._id)
                                      ?.totalMonth1 === NaN
                                      ? 0
                                      : incomeListByCategory.find((j) => j.catId === x._id)
                                          ?.totalMonth1}
                                  </Col>
                                  <Col md="2"></Col>
                                </Row>
                              </Col>
                              <Col md={3}>
                                <Row>
                                  <Col md="10">
                                    $
                                    {incomeListByCategory.find((j) => j.catId === x._id)
                                      ?.totalMonth2 === NaN
                                      ? 0
                                      : incomeListByCategory.find((j) => j.catId === x._id)
                                          ?.totalMonth2}
                                  </Col>
                                  <Col md="2"></Col>
                                </Row>
                              </Col>
                              <Col md={3}>
                                <Row>
                                  <Col md="10">
                                    $
                                    {incomeListByCategory.find((j) => j.catId === x._id)
                                      ?.totalYear === NaN
                                      ? 0
                                      : incomeListByCategory.find((j) => j.catId === x._id)
                                          ?.totalYear}
                                  </Col>
                                  <Col md="2"></Col>
                                </Row>
                              </Col>
                            </Row>
                          </div>
                        </div>
                      );
                    })}

                <table className="w-100">
                  <tr style={{ background: '#e7e3e3', height: '40px' }}>
                    <td style={{ width: '150px' }}>
                      {' '}
                      <h4>Net Income</h4>
                    </td>

                    <td>
                      {' '}
                      <h4 style={{ color: '#174ae7', marginTop: '10px' }}>
                        {month1TotalIncome - month1TotalExpense}
                      </h4>
                    </td>
                    <td>
                      {' '}
                      <h4 style={{ color: '#174ae7', marginTop: '10px' }}>
                        {month2TotalIncome - month2TotalExpense}
                      </h4>
                    </td>
                    <td>
                      {' '}
                      <h4 style={{ color: '#174ae7', marginTop: '10px' }}>
                        {yearTotalIncome - yearTotalExpense}
                      </h4>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
      <SendSidebar toggle={toggleOpenSend} open={openSend} />
    </Row>
  );
}

export default Templete;
