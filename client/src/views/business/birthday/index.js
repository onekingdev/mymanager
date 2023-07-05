/* eslint-disable no-unused-vars */
import { Fragment, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';

// ** myforms App Component Imports
import Sidebar from './components/Sidebar';

// ** Third Party Components
import '@styles/react/apps/app-email.scss';
import Table from './components/Table';

import { getAllNotesAction } from '../../contacts/store/actions';
import { getEvents } from '../../calendar/event/store';
import { getUserData } from '../../../utility/Utils';

const Birthday = ({}) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [weekArr, setWeekArr] = useState([]);
  const [monthArr, setMonthArr] = useState([]);
  const [nextMonthArr, setNextMonthArr] = useState([]);
  const [byMonth, setByMonth] = useState({ value: 'january', label: 'January' });
  const [byMonthArr, setByMonthArr] = useState([]);

  useEffect(() => {
    dispatch(getAllNotesAction());
    dispatch(getEvents(getUserData().id));
  }, []);
  return (
    <Fragment>
      <Sidebar
        sidebarOpen={false}
        title={title}
        setTitle={setTitle}
        weekArr={weekArr}
        monthArr={monthArr}
        nextMonthArr={nextMonthArr}
        byMonthArr={byMonthArr}
        byMonth={byMonth}
        setByMonth={setByMonth}
      />
      <div className="content-right">
        <div className="content-body">
          <div>
            <Table
              title={title}
              setWeekArr={setWeekArr}
              setMonthArr={setMonthArr}
              setNextMonthArr={setNextMonthArr}
              setByMonthArr={setByMonthArr}
              setByMonth={setByMonth}
              setTitle={setTitle}
              byMonthArr={byMonthArr}
              byMonth={byMonth}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Birthday;
