// ** React Imports
import { useEffect, useState, useMemo } from 'react';

// ** Third Party Components
import axios from 'axios';
import Chart from 'react-apexcharts';
import { HelpCircle } from 'react-feather';
import { Circle } from 'react-feather';
import PerfectScrollbar from 'react-perfect-scrollbar';

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Row,
  Col,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap';
import { BsBookmarkFill, BsCircleFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { allDayTaskListAction } from './store/action';

const allChartOptions = {
  labels: ['Completed', 'Past Due', 'In Progress'],
  colors: ['#7367F0E0', '#EA5455E0', '#82868BE0'],
  plotOptions: {
    pie: {
      expandOnClick: false
    }
  },
  dataLabels: {
    enabled: false
  }
};
const allSeries = [63, 22, 15];
const individualChartOptions = {
  labels: ['All Tasks', 'All Check Lists', 'Current Task'],
  //   plotOptions: {
  //     radialBar: {
  //       size: 150,
  //       hollow: {
  //         size: '20%'
  //       },
  //       track: {
  //         strokeWidth: '100%',
  //         margin: 15
  //       },
  //       dataLabels: {
  //         value: {
  //           fontSize: '1rem',
  //           colors: '#5e5873',
  //           fontWeight: '500',
  //           offsetY: 5
  //         }
  //         // total: {
  //         //   show: true,
  //         //   label: 'Total',
  //         //   fontSize: '1.286rem',
  //         //   colors: '#5e5873',
  //         //   fontWeight: '500',

  //         //   formatter() {
  //         //     // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
  //         //     return 42459;
  //         //   }
  //         // }
  //       }
  //     }
  //   },
  colors: ['#00CFE8', '#28C76F', '#FF9F43'],
  stroke: {
    lineCap: 'round'
  }
  //   chart: {
  //     height: 355,
  //     dropShadow: {
  //       enabled: true,
  //       blur: 3,
  //       left: 1,
  //       top: 1,
  //       opacity: 0.1
  //     }
  //   }
};
const individualSeries = [70, 52, 26];

const ChartView = (props) => {
  // ** State
  //   const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const [allTaskData, setAllTaskData] = useState([0, 0, 0]);
  const [allTaskValue, setAllTaskValue] = useState([0, 0, 0]);
  const [dailyTaskData, setDailyTaskData] = useState([0, 0, 0]);
  const { selectedWorkingCheckList, setSelectedWorkingCheckList, taskTab, selectDate } = props;
  const { workingTaskList, allDayTaskList } = useSelector((state) => state.tasks);

  useMemo(() => {
    if (selectedWorkingCheckList && selectedWorkingCheckList.completedEditor) {
      return;
    }
    let completeTask = 0;
    let notCompleteTask = 0;
    let completeSubTask = 0;
    let allSubTask = 0;
    let selectCompleteTask = selectedWorkingCheckList?.schedule[0]?.checkList?.length;
    let selectAllTask = selectedWorkingCheckList?.checkList?.length;
    if (workingTaskList && workingTaskList?.list?.length > 0)
      for (let task of workingTaskList?.list) {
        const checkListLength = task?.checkList?.length;
        const completedTodosLength = task?.schedule[0]?.checkList?.length;
        completedTodosLength >= checkListLength
          ? (completeTask++,
            (completeSubTask += completedTodosLength),
            (allSubTask += checkListLength))
          : (notCompleteTask++,
            (completeSubTask += completedTodosLength),
            (allSubTask += checkListLength));
      }

    const allTaskValue =
      completeTask + notCompleteTask
        ? Math.round((completeTask / (completeTask + notCompleteTask)) * 100)
        : 0;
    const subTaskValue = allSubTask ? Math.round((completeSubTask / allSubTask) * 100) : 0;
    const selectTaskValue = selectAllTask
      ? Math.round((selectCompleteTask / selectAllTask) * 100)
      : 0;
    setDailyTaskData([allTaskValue, subTaskValue, selectTaskValue]);

    let allCompleteTask = 0;
    let pastTask = 0;
    let todayTask = 0;
    const today = new Date();
    const todayDate =
      today.getFullYear().toString() +
      '/' +
      (today.getMonth() + 1).toString() +
      '/' +
      today.getDate().toString();

    if (allDayTaskList && allDayTaskList?.list?.length > 0) {
      for (let task of allDayTaskList?.list) {
        const checkListLength = task?.checkList?.length;
        for (let day of task?.schedule) {
          const scheduleDate =
            day.year.toString() + '/' + day.month.toString() + '/' + day.day.toString();

          const completedTodosLength = day?.checkList?.length;
          if (completedTodosLength >= checkListLength) {
            allCompleteTask++;
          } else {
            scheduleDate === todayDate ? todayTask++ : pastTask++;
          }
        }
      }
    }
    const allTask = allCompleteTask + todayTask + pastTask;
    allTask
      ? setAllTaskData([
          Math.round((allCompleteTask / allTask) * 100),
          Math.round((pastTask / allTask) * 100),
          100 -
            Math.round((allCompleteTask / allTask) * 100) -
            Math.round((pastTask / allTask) * 100)
        ])
      : setAllTaskData([0, 0, 0]);
    setAllTaskValue([allCompleteTask, pastTask, todayTask]);
  }, [workingTaskList, selectedWorkingCheckList, allDayTaskList]);

  useEffect(() => {
    dispatch(allDayTaskListAction());
  }, [selectedWorkingCheckList]);

  return (
    <PerfectScrollbar
      className="checklist-scroll"
      // options={{ wheelPropagation: false }}
      containerRef={(ref) => {
        if (ref) {
          ref._getBoundingClientRect = ref.getBoundingClientRect;

          ref.getBoundingClientRect = () => {
            const original = ref._getBoundingClientRect();

            return {
              ...original,
              height: Math.floor(original.height)
            };
          };
        }
      }}
    >
      <div>
        <div>
          <div className="fw-bolder py-1 px-1">Task Overview</div>
          {/* <HelpCircle size={18} className="text-muted cursor-pointer" /> */}
        </div>
        <div className="mt-2 mb-2">
          <Chart options={allChartOptions} series={allTaskData} type="donut" height={200} />
        </div>
        <div className="border-top text-center mx-0">
          <div className="border-bottom mt-1 col-4" style={{ float: 'left', paddingLeft: '5px' }}>
            <div className="radius-square" style={{ backgroundColor: '#7367F0' }} />
            <div className="text-muted mb-half" style={{ fontSize: '12px', fontWeight: 'bold' }}>
              Completed
            </div>
            <h3 className="mb-half">{allTaskData[0] + ' %'}</h3>
            <h5 className="fw-bolder text-muted mb-half">{allTaskValue[0] + ' tasks'}</h5>
          </div>
          <div className="border-bottom mt-1 col-4" style={{ float: 'left', paddingLeft: '5px' }}>
            <div className="radius-square" style={{ backgroundColor: '#EA5455' }} />
            <div className="text-muted mb-half" style={{ fontSize: '12px', fontWeight: 'bold' }}>
              Past Due
            </div>
            <h3 className=" mb-half">{allTaskData[1] + ' %'}</h3>
            <h5 className="fw-bolder text-muted mb-half ">{allTaskValue[1] + ' tasks'}</h5>
          </div>
          <div className="mt-1 border-bottom col-4" style={{ float: 'left', paddingLeft: '5px' }}>
            <div className="radius-square" style={{ backgroundColor: '#82868B' }} />
            <div className="text-muted mb-half" style={{ fontSize: '12px', fontWeight: 'bold' }}>
              In Progress
            </div>
            <h3 className=" mb-half">{allTaskData[2] + '%'}</h3>
            <h5 className="fw-bolder text-muted mb-half">{allTaskValue[2] + ' tasks'}</h5>
          </div>
        </div>
      </div>
      <div>
        <div>
          <div className="fw-bolder py-1 px-1" style={{ marginTop: '10px' }}>
            Daily Overview
          </div>
          {/* <UncontrolledDropdown className="chart-dropdown">
            <DropdownToggle color="" className="bg-transparent btn-sm border-0 p-50">
              Last 7 days
            </DropdownToggle>
            <DropdownMenu end>
              {data.last_days.map((item) => (
                <DropdownItem className="w-100" key={item}>
                  {item}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown> */}
        </div>
        <div>
          <div className="px-3">
            <Chart
              options={individualChartOptions}
              series={dailyTaskData}
              type="radialBar"
              height={240}
              width={240}
            />
          </div>
          <div className="d-flex justify-content-between mb-1 px-1">
            <div className="d-flex align-items-center">
              <BsCircleFill size={15} style={{ color: '#00CFE8' }} />
              <span className="fw-bold ms-75">All Tasks</span>
            </div>
            <span>{dailyTaskData[0] + ' %'}</span>
          </div>
          <div className="d-flex justify-content-between mb-1 px-1">
            <div className="d-flex align-items-center">
              <BsCircleFill size={15} style={{ color: '#28C76F' }} />
              <span className="fw-bold ms-75">All Check Lists</span>
            </div>
            <span>{dailyTaskData[1] + ' %'}</span>
          </div>
          <div className="d-flex justify-content-between px-1">
            <div className="d-flex align-items-center">
              <BsCircleFill size={15} style={{ color: '#FF9F43' }} />
              <span className="fw-bold ms-75">Current Task</span>
            </div>
            <span>{dailyTaskData[2] + ' %'}</span>
          </div>
        </div>
      </div>
    </PerfectScrollbar>
  );
};
export default ChartView;
