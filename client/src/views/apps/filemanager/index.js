// ** React Imports
import { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// ** Third Party Components
import classnames from 'classnames';

// ** Todo App Components
import Tasks from './Tasks';
import Sidebar from './Sidebar';
import TaskSidebar from './TaskSidebar';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import {
  getTasks,
  updateTask,
  selectTask,
  addTask,
  deleteTask,
  reOrderTasks,
  getFileAndFolders
} from './store';

import Breadcrumbs from '@components/breadcrumbs';

// ** Styles
import '@styles/react/apps/app-todo.scss';
import { Col, Row } from 'reactstrap';

const TODO = () => {
  // ** States
  const drivers = [
    {
      id: 1,
      driverName: 'Google drive',
      totalStore: 50,
      usedStore: 35,
      img: require('@src/assets/images/icons/drive.png').default
    },
    {
      id: 2,
      driverName: 'Dropbox',
      totalStore: 2,
      usedStore: 1.2,
      img: require('@src/assets/images/icons/dropbox.png').default
    },
    {
      id: 3,
      driverName: 'OneDrive',
      totalStore: 2,
      usedStore: 1.6,
      img: require('@src/assets/images/icons/onedrivenew.png').default
    },
    {
      id: 4,
      driverName: 'iCloud',
      totalStore: 3,
      usedStore: 1.8,
      img: require('@src/assets/images/icons/icloud-1.png').default
    }
  ];

  
  const [sort, setSort] = useState('');
  const [query, setQuery] = useState('');
  const [mainSidebar, setMainSidebar] = useState(false);
  const [openTaskSidebar, setOpenTaskSidebar] = useState(false);

  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.todo);

  // ** URL Params
  const paramsURL = useParams();
  const params = {
    filter: paramsURL.filter || '',
    q: query || '',
    sortBy: sort || '',
    tag: paramsURL.tag || ''
  };

  // ** Function to handle Left sidebar & Task sidebar
  const handleMainSidebar = () => setMainSidebar(!mainSidebar);
  const handleTaskSidebar = () => setOpenTaskSidebar(!openTaskSidebar);

  // ** Get Tasks on mount & based on dependency change
  useEffect(() => {
    dispatch(
      getTasks({
        filter: paramsURL.filter || '',
        q: query || '',
        sortBy: sort || '',
        tag: paramsURL.tag || ''
      })
    );
    dispatch(getFileAndFolders('/'));
  }, [store.tasks.length, paramsURL.filter, paramsURL.tag, query, sort]);

  return (
    <Fragment>
      <Row>
        <Col md={12} className="invoice-child-header-wrapper">
          <Breadcrumbs
            breadCrumbTitle={'File Manager'}
            breadCrumbParent="File Manager"
            breadCrumbActive={'Folder & Files'}
          />
        </Col>

        <Col md={12}>
          <Sidebar
            store={store}
            params={params}
            getTasks={getTasks}
            dispatch={dispatch}
            mainSidebar={mainSidebar}
            urlFilter={paramsURL.filter}
            setMainSidebar={setMainSidebar}
            handleTaskSidebar={handleTaskSidebar}
          />
          <div className="content-right">
            <div className="content-wrapper">
              <div className="content-body">
                <div
                  className={classnames('body-content-overlay', {
                    show: mainSidebar === true
                  })}
                  onClick={handleMainSidebar}
                ></div>

                {store ? (
                  <Tasks
                    cols={{ md: '3', sm: '6', xs: '12' }}
                    store={store}
                    drivers={drivers}
                    tasks={store.tasks}
                    sort={sort}
                    query={query}
                    params={params}
                    setSort={setSort}
                    setQuery={setQuery}
                    dispatch={dispatch}
                    getTasks={getTasks}
                    paramsURL={paramsURL}
                    updateTask={updateTask}
                    selectTask={selectTask}
                    reOrderTasks={reOrderTasks}
                    handleMainSidebar={handleMainSidebar}
                    handleTaskSidebar={handleTaskSidebar}
                  />
                ) : null}

                <TaskSidebar
                  store={store}
                  params={params}
                  addTask={addTask}
                  dispatch={dispatch}
                  open={openTaskSidebar}
                  updateTask={updateTask}
                  selectTask={selectTask}
                  deleteTask={deleteTask}
                  handleTaskSidebar={handleTaskSidebar}
                />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

export default TODO;
