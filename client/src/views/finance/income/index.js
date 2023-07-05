import { Fragment, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs';

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors';

import StatsCard from '../components/StatsCard';
import Earnings from './../components/Earnings';

import FinanceCategories from './../components/FinanceCategories';
import IncomeList from './../components/IncomeList';

// ** Styles
import '@styles/react/libs/charts/apex-charts.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';
import { IncomeFetchAction, getFinanceCategories } from '../store/actions';
import moment from 'moment';

const Income = () => {
  const dispatch = useDispatch();

  // ** Context
  const { colors } = useContext(ThemeColors);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [incomeList, setIncomeList] = useState([]);
  const [total, setTotal] = useState(0);
  const [kTotal, setKtotal] = useState(0);
  const [kPast, setKPast] = useState(0);
  const [upgradePercent, setUpgradePercent] = useState(0);
  const [lastTotal, setLastTotal] = useState(0);
  const [kOngoing, setKOngoing] = useState(0);
  const [categories, setCategories] = useState([]);
  const [pastDueTotal, setPastDueTotal] = useState(0);
  const [upcomingTotal, setUpcomingTotal] = useState(0);
  const [maxCategory,setMaxcategory] = useState();
  const [labels,setLabels] = useState([])
  const [series,setSeries] = useState([])

  const store = useSelector((state) => {
    return { ...state.finance, ...state.userInvoice };
  });
  useEffect(() => {
    if (store.IncomeList && store.IncomeList.length > 0) {
      const incomes = store.IncomeList.filter((x) => x?.categoryId?.type === 'income');
      const last = incomes.filter(
        (item) =>
          moment(item.date).year() === Number(year) && moment(item.date).month() === month - 1
      );
      setIncomeList(
        incomes.filter(
          (item) => moment(item.date).year() === Number(year) && moment(item.date).month() == month
        )
      );

      const t = incomes
        .filter(
          (item) => moment(item.date).year() === Number(year) && moment(item.date).month() == month
        )
        .map((item) => item.amount)
        .reduce((prev, current) => {
          return prev + current;
        }, 0);
      setTotal(t);

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

      //upcoming
      const upcoming = incomes
        .filter((x) => x?.invoiceId?.payNow > 0)
        .map((item) => item.amount)
        .reduce((prev, current) => {
          return prev + current;
        }, 0);
      setUpcomingTotal(upcoming);
      //due
      const due = incomes
        .filter((x) => x?.invoiceId?.status === 'DUE')
        .map((item) => item.amount)
        .reduce((prev, current) => {
          return prev + current;
        }, 0);
      setPastDueTotal(due);
    }
  }, [store.IncomeList, month, year]);

  useEffect(() => {
    if (
      store.categoryList &&
      store.categoryList.length > 0
      // && store.IncomeList &&
      // store.IncomeList.length > 0
    ) {
      let cats = [];
      for (const cat of store.categoryList.filter((x) => x.type === 'income')) {
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

  return (
    <div>
      <Row className="match-height">
        <Col xl="4" md="6" xs="12">
          <Earnings
            upgradePercent={upgradePercent}
            success={colors.success.main}
            total={total}
            filtered_list={incomeList}
            type="income"
            labels={labels} series={series} maxCategory={maxCategory}
          />
        </Col>
        <Col xl="8" md="6" xs="12">
          <StatsCard
            cols={{ xl: '3', sm: '6' }}
            lastTotal={lastTotal}
            k_total={kTotal}
            k_past={kPast}
            k_ongoing={kOngoing}
            type="income"
          />
        </Col>
      </Row>
      <Row className="match-height">
        <Col lg="4" md="6" xs="12">
          <FinanceCategories
            store={store}
            month={month}
            setMonth={setMonth}
            year={year}
            categories={categories}
            total={total}
            type="income"
            dispatch={dispatch}
          />
        </Col>
        <Col lg="8" md="6" xs="12">
          <IncomeList
            type="income"
            total={total}
            incomeList={incomeList}
            year={year}
            setYear={setYear}
            month={month}
            setMonth={setMonth}
            upcoming={upcomingTotal}
            pastDue={pastDueTotal}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Income;
