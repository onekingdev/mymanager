import { Card } from 'reactstrap';

// ** Styles
import '@styles/react/apps/app-invoice.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';
import ToggleableView from './ToggleSwitch';


const IncomeList = ({incomeList,year,setYear,month,setMonth,type,total,upcoming,pastDue}) => {

  return (
    <Card>
      <ToggleableView
        type={type}
        incomeList={incomeList}
        month={month}
        year={year}
        setYear={setYear}
        setMonth={setMonth}
        total={total}
        upcoming={upcoming}
        pastDue={pastDue}
      />
    </Card>
  );
};

export default IncomeList;
