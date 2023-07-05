// ** React Imports
import { Fragment, useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// ** Third Party Components
import '@styles/react/apps/app-email.scss';
// ** myforms App Component Imports
import Sidebar from './component/TopCard';
import Breadcrumbs from '@components/breadcrumbs';

import FilterTopBar from './component/FilterTopBar';

import { getAllWorkHistory } from '../store/actions';

const WorkHistory = ({}) => {
  const [selectedValue, setSelectedValue] = useState('today');
  const [selectedFilter, setSelectedFilter] = useState('remote');

  const { totalEmployeeCount, activeEmployeeCount, internshipEmployeeCount, formerEmployeeCount } =
    useSelector((state) => state.employeeContact);

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleChangeEmployee = (event) => {
    setSelectedFilter(event.target.value);
  };
  const dispatch = useDispatch();

  useMemo(() => dispatch(getAllWorkHistory()), []);

  return (
    <Fragment>
      <Sidebar
        totalEmployeeCount={totalEmployeeCount}
        activeEmployeeCount={activeEmployeeCount}
        internshipEmployeeCount={internshipEmployeeCount}
        formerEmployeeCount={formerEmployeeCount}
      />

      <div>
        <FilterTopBar
          selectedValue={selectedValue}
          handleChangeEmployee={handleChangeEmployee}
          handleSelectChange={handleSelectChange}
          selectedFilter={selectedFilter}
        />
      </div>
    </Fragment>
  );
};

export default WorkHistory;
