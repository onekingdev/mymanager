import { Fragment, useContext, useEffect, useState } from 'react';

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  ListGroupItem,
  CardHeader,
  ListGroup,
  CardText,
  Alert,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors';

// ** Charts
import AppexBarChartIncome from './Chart'

import StatsCard from './StatsCard';
import Earnings from './Earnings';

import PLInvoice from './Templete';

// ** Styles
import '@styles/react/libs/charts/apex-charts.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';
import { useSelector } from 'react-redux';
import moment from 'moment';

const ProfitAndLoss = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [incomeList, setIncomeList] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalAll, setTotalAll] = useState(0);
  const [totalPercent, setTotalPercent] = useState(0);
  const [kTotal, setKtotal] = useState(0);
  const [kPast, setKPast] = useState(0);
  const [upgradePercent, setUpgradePercent] = useState(0);
  const [lastTotal, setLastTotal] = useState(0);
  const [kOngoing, setKOngoing] = useState(0);
  const [categories, setCategories] = useState([]);
  const [labels,setLabels] = useState([])
  const [series,setSeries] = useState([])
  const [maxCategory,setMaxcategory] = useState();

  const [grossPerMonth,setGrossPerMonth] = useState([]);
  const [expensePerMonth,setExpensePerMonth] = useState([]);
  const [profitPerMonth,setProfitPerMonth] = useState([]);



  const store = useSelector((state) => {
    return { ...state.finance, ...state.userInvoice };
  });
  
  useEffect(()=>{
    if(categories){
      let l = [];
      let s=[];
      let max=0;
      let cat ;
      for (const item of categories) {
        l.push(item.title)
        s.push(Number(item.percent))
        if(item.amount>max){
          max = item.amount
          cat = item
        }
      }
      setMaxcategory(cat)
      setLabels(l)
      setSeries(s)
      
    }
  },[categories])
  useEffect(() => {
    if (store.IncomeList) {
      const incomes = store.IncomeList
      
      const last = incomes.filter(
        (item) =>
          moment(item.date).year() === Number(year) && moment(item.date).month() === month - 1
      );
      setIncomeList(
        incomes.filter(
          (item) => moment(item.date).year() === Number(year) && moment(item.date).month() == month
        )
      );
      const ta = incomes
        .map((item) => item.amount)
        .reduce((prev, current) => {
          return prev + current;
        }, 0);
      setTotalAll(ta);

      const t = incomes
        .filter(
          (item) => moment(item.date).year() === Number(year) && moment(item.date).month() == month
        )
        .map((item) => item.amount)
        .reduce((prev, current) => {
          return prev + current;
        }, 0);
      setTotal(t);
      setTotalPercent((t / ta)<0 ? -100 * (t / ta):100 * (t / ta));

      const up = last.length > 0 ? (incomes.length / last.length) * 100 - 100 + '%' : 'infinite';
      setUpgradePercent(up);

      const kt = t / 1000;
      setKtotal(kt);

      const lt = last
        .map((item) => item.amount)
        .reduce((prev, current) => {
          return prev + current;
        }, 0);
      setLastTotal(lt);

      const pt = incomes
        .filter((item) => moment(item.date).isSameOrBefore(moment()))
        .map((item) => item.amount)
        .reduce((prev, current) => {
          return prev + current;
        }, 0);
      setKPast(pt / 1000);

      const ot = incomes
        .filter((item) => new Date(item.date).getTime() > new Date().getTime())
        .map((item) => item.amount)
        .reduce((prev, current) => {
          return prev + current;
        }, 0);
      setKOngoing(ot / 1000);

     

    }
  }, [store.IncomeList, month, year]);

    useEffect(()=>{
      let profit = []
      let expense =[]
      let gross = []
      if(store.IncomeList && store.IncomeList.length > 0){
       
      for (let index = 0; index < 12; index++){
        const g = store.IncomeList.filter(item=>moment(item.date).year() === Number(year) &&
        moment(item.date).month() === index && item.categoryId.type==='income')
        const ta = g.map((item) => item.amount).reduce((prev, current) => {
          return prev + current;
        }, 0);
        gross.push(ta)

        const l = store.IncomeList.filter(item=>moment(item.date).year() === Number(year) &&
        moment(item.date).month() === index && item.categoryId.type==='expense')
        const tl = l.map((item) => item.amount).reduce((prev, current) => {
          return prev + current;
        }, 0);
        expense.push(-1 * tl)

        let p = ta + tl
        profit.push(p)

      }
      setProfitPerMonth(profit)
      setGrossPerMonth(gross)
      setExpensePerMonth(expense)
      }
    },[store.IncomeList,year])

  useEffect(() => {
    if (
      store.categoryList &&
      store.categoryList.length > 0 &&
      store.IncomeList &&
      store.IncomeList.length > 0
    ) {
      let cats = [];

      for (const cat of store.categoryList) {
        let amount = 0;
        
        for (const item of incomeList) {
          if (cat._id === item.categoryId._id) {
            amount = amount + item.amount;

          }
        }
        let c = { ...cat, amount: amount,percent: Number(100 * amount/total).toFixed(1) };
        cats.push(c);
      }
      setCategories(cats);
    }
  }, [store.categoryList, incomeList]);

  return (
    <div>
      <Row className="match-height">
        <Col md={3}>
          <Earnings total={total} totalAll={totalAll} totalPercent={totalPercent} labels={labels} series={series} maxCategory={maxCategory}/>
        </Col>
        <Col md={9}>
          <StatsCard kTotal = {kTotal} kOngoing={kOngoing} kPast={kPast} lastTotal={lastTotal} />
        </Col>
      </Row>
      <Row className="match-height">
        <Col md={3}>
          <AppexBarChartIncome
            subheading="P L by the Year" profit={profitPerMonth} expense={expensePerMonth} gross={grossPerMonth} year={year} setYear={setYear}
          />
        </Col>
        <Col md={9}>
          <PLInvoice store={store}/>
        </Col>
      </Row>
    </div>
  );
};

export default ProfitAndLoss;
