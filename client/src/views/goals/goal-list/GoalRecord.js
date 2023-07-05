// ** React Imports
import { useEffect, useState,useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// ** Custom Components
import DataTable from 'react-data-table-component';

// ** Third Party Components
import { ReactSortable } from 'react-sortablejs';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  ChevronDown,
  Plus,
  Edit2,
} from 'react-feather';
import Swal from 'sweetalert2';

// ** Reactstrap Imports
import {
  Input,
  Button,
  Row,
  Col,
  InputGroup,
  InputGroupText,
  Badge,
  Form,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,

} from 'reactstrap';

// ** Import Components
import NewModal from './NewModal';

// ** Styles
import '@styles/react/libs/drag-and-drop/drag-and-drop.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';

import useColumns from './useColumns';
import { useSelector } from 'react-redux';
import { setGoalsReducer } from '../store/reducer';
import CreateNewModal from '../createNew/CreateNewModal';
import habit from '../../../assets/images/banner/habit.png'

import AddGoalModal from '../goal-view/AddGoalModal';
import EditGoalModal from '../goal-view/EditGoalModal';
import withReactContent from 'sweetalert2-react-content';
import { actionPlanAddAction, goalsEditAction, goalsEditActionMuted, subGoalsDeleteAction, subGoalsEditAction, subGoalsFetchAction } from '../../taskngoals/store/actions';
import { generateProgressOfCurrentProgress, renderStatus } from '../helpers/renderProgressData';
import RecordSubGoalModal from './RecordSubGoalModal';
import { isGoalCompleted } from '../helpers/mirrorSubGoalsStatusToGoals';
import { isDayPassed } from '../helpers/compareDate';
import { toast } from 'react-toastify'
import { BiExpand } from 'react-icons/bi';
const badgeColor = ['danger', 'primary', 'success', 'warning', 'info', 'secondary'];

// ** EXPANDED COMPONENT
const ExpandedComponent = ( {data},taskId,toggleGoalInfoModal,setGoalInfo) => {
  const imageRef=useRef();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('1');
  //const dispatch = useDispatch();
  const [showEditImage, setShowEditImage] = useState(false);
  const [componentData, setComponentData] = useState({ vision: data?.vision, purpose: data?.purpose, obstacle: data?.obstacle, resource: data?.resource })
  const handleInput = (e) => {
    if (e.target.name === "file") {
      setComponentData({ ...componentData, file: e.target.files[0] });
    }
    else {
      setComponentData({ ...componentData, [e.target.name]: e.target.value })
    }
  }
  const handleEdit = (e) => {
    e.preventDefault()
    const payload = new FormData();
    componentData.vision != undefined && payload.append('vision', componentData?.vision)
    componentData.purpose != undefined && payload.append('purpose', componentData?.purpose)
    componentData.obstacle != undefined && payload.append('obstacle', componentData?.obstacle)
    componentData.resource != undefined && payload.append('resource', componentData?.resource)
    componentData?.file != undefined && payload.append('file', componentData?.file)
    dispatch(subGoalsEditAction(data._id,payload,taskId))

  }
  const handleExpandGoalInfo=(data)=>
  {
    setGoalInfo(data)
     toggleGoalInfoModal()
  }
  return (
    <div className="p-2 bg-light-secondary">
      {data.progressType != "CurrentProgress" ? data?.status === "Completed" ?
        <Row className="text-center p-1 fs-3 bg-light-success">
          <Col >Completed</Col>
        </Row> :
        <Row className="text-center p-1 fs-3 bg-light-warning">
          <Col>Pending</Col>
        </Row> :

        <div>
          <Row className="bg-light-warning p-1">
            <Col><div className="fw-bold text-center">Current Progress: {data.measureLabel === "$" ? data.measureLabel + data.currentProgress : data.currentProgress + data.measureLabel}</div></Col>
            <Col><div className="fw-bold text-center">Goal: {data.measureLabel === "$" ? data.measureLabel + data.measureTo : data.measureTo + data.measureLabel}</div></Col>
          </Row>
        </div>
      }
      <>

        <div className=" pb-1">
          <Row>
            <Col sm="" md="3" className="mt-2 mb-0 ">
              <div>
              <div onClick={()=>handleExpandGoalInfo(data)} className="cursor-pointer d-flex justify-content-end"><BiExpand size={20}/></div>
                <div>
                  <Badge
                    color="primary"
                    style={{
                      position: 'absolute',
                      cursor: 'pointer',
                      display: `${showEditImage ? 'block' : 'none'}`
                    }}
                    className="ms-50 mt-50"
                    onMouseEnter={() => setShowEditImage(true)}
                    onClick={() => imageRef.current.click()}
                  >
                    <Edit2 size={14} />
                  </Badge>
                  <img
                    src={componentData.file === undefined ? data?.pictureUrl || habit : URL.createObjectURL(componentData?.file)}
                    className="w-100 img-thumbnail img-fluid"
                    onClick={()=>handleExpandGoalInfo(data)}
                    style={{ height: '100px' }}
                    onMouseEnter={() => setShowEditImage(true)}
                    onMouseLeave={() => setShowEditImage(false)}
                  />
                </div>
              </div>
            </Col>
            <Col md="9">
              <Form onSubmit={handleEdit}>
                <div className="d-flex justify-content-between">
                  <Nav tabs>
                    <NavItem>
                      <NavLink active={activeTab === '1'} onClick={() => setActiveTab('1')}>
                        Vision
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink active={activeTab === '2'} onClick={() => setActiveTab('2')}>
                        Purposes
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink active={activeTab === '3'} onClick={() => setActiveTab('3')}>
                        Obstacles
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink active={activeTab === '4'} onClick={() => setActiveTab('4')}>
                        Resources
                      </NavLink>
                      
                    </NavItem>
                  </Nav>
              
                </div>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                    <Input
                      type="textarea"
                      onChange={handleInput}
                      name="vision"
                      value={componentData?.vision}
                      placeholder='What is your vision in this Goal?'
                    />
                  </TabPane>
                  <TabPane tabId="2">
                    <Input
                      type="textarea"
                      onChange={handleInput}
                      name="purpose"
                      value={componentData?.purpose}
                      placeholder='What is the purpose of this Goal?'
                    />
                  </TabPane>
                  <TabPane tabId="3">
                    <Input
                      type="textarea"
                      name="obstacle"
                      onChange={handleInput}
                      value={componentData?.obstacle}
                      placeholder='What is the obstacle you must overcome to achieve this Goal?'
                    />
                  </TabPane>
                  <TabPane tabId="4">
                    <Input
                      type="textarea"
                      onChange={handleInput}
                      name="resource"
                      value={componentData?.resource}
                      placeholder='Who should you seek to help you achieve this Goal?'
                    />
                  </TabPane>
                </TabContent>
                <input onChange={handleInput} name="file" ref={imageRef} type="file" accept="image/*" className="d-none"></input>
                <div className="d-flex justify-content-end">
                    <Button type="submit" color="outline-primary" className="mt-1">
                      Save
                    </Button>
                  </div>
              </Form>
            </Col>
          </Row>
        </div>
      </>
      
    </div>
  );
};


const GoalRecord = (props) => {
  // ** Props
  const {
    store,
    dispatch,
    workspaceId,
    task,
    row,
    subHabit,
    closeMain,
    toggleGoalInfoModal,
    setGoalInfo
  } = props;
  // ** States

  const [modalType, setModalType] = useState();
  const [newGoalModal, setNewGoalModal] = useState(false);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('');
  const [taskSearchResult, setTaskSearchResult] = useState([]);
  const [deleteTaskArr, setDeleteTaskArr] = useState([]);
  const [openHabitDetails, setOpenHabitDetails] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});
  const [openAddSubHabit, setOpenAddSubHabit] = useState(false);
  const [openEditHabit, setOpenEditHabit] = useState(false);
  const [openRecordProgress, setOpenRecordProgress] = useState(false);
  const [subGoal, setSubGoal] = useState({})
  const [type, setType] = useState('sub'); //sub || origin
  const [newProgress, setNewProgress] = useState({ currentProgress: task?.currentProgress });

  const paramsURL = useParams();

  const MySwal = withReactContent(Swal);
  const subGoalsList = useSelector((state) => state.goals.subGoalsList);

  // ** TOGGLERS
  const toggleNewGoalModal = () => setNewGoalModal(!newGoalModal);
  const toggleHabitDetails = (task) => {
    setSelectedTask(task);
    setOpenHabitDetails(!openHabitDetails);
  };
  const toggleRecordProgress = (row) => {
    setOpenRecordProgress(!openRecordProgress);
    setSubGoal(row);
  }
  const handleOpenAddSubHabit = (row, type) => {
    setSelectedTask(row);
    setType(type);
    setOpenAddSubHabit(!openAddSubHabit);
  };
  //{handleOpenAddSubHabit},{handleOpenEdit},{handleOpenDelete}
  const handleOpenEdit = (row, type) => {
    setSelectedTask(row);
    setType(type);
    setOpenEditHabit(!openEditHabit);
  };

  const handleOpenDelete = async (row) => {
    const result = await MySwal.fire({
      title: 'Delete?',
      text: 'Are you sure you want to delete the Goal?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    });
    if (result.value) {
      //handle deleting data
      dispatch(subGoalsDeleteAction(row._id, task._id))
    }
  };
  useEffect(() => {
    // setTaskSearchResult(row.subGoals);
  }, [row]);
  var params = {
    filter: paramsURL.filter || '',
    q: '',
    sortBy: '',
    tag: paramsURL.tag || ''
  };

  const taskSearch = (searchParams) => {
    let resultData = row.subGoals;
    if (searchParams.q) {
      resultData = store.tasks.filter((x) => {
        let searchTxt = `${x.title}${x.description}${x.labels}`;
        x.assignedTo.forEach((element) => {
          searchTxt += element.title;
        });
        return searchTxt.toLowerCase().indexOf(searchParams.q) > -1;
      });
    }
    setTaskSearchResult(resultData);
  };

  const handleAccomplishClicked = (data) => {
    const temp = row?.subGoals?.map((x) => {
      let t = x;
      if (t._id === data._id) {
        t = { ...t, status: 'done' };
      }
      return t;
    });
    const goals = store?.goals?.map((x) => {
      let t = x;
      if (x._id === row?._id) {
        t = { ...t, subGoals: temp };
      }
      return t;
    });
    setSelectedTask(goals.find((x) => x._id === row._id));
    dispatch(setGoalsReducer(goals));
  };
  const { columns } = useColumns(
    { toggleHabitDetails },
    { handleOpenAddSubHabit },
    { handleOpenEdit },
    { handleOpenDelete },
    { handleAccomplishClicked },
    { toggleRecordProgress },
  );
  const handleSave = () => {
    if (generateProgressOfCurrentProgress(task, "check")) {
      const progress = parseInt(task?.currentProgress) - parseInt(newProgress.currentProgress);
      if (progress < (task?.measureTo - 10)) {
        toast.error("Please Enter a Valid Input");
        return;
      }
      dispatch(goalsEditAction(task?._id, workspaceId, { currentProgress: progress }));
      dispatch(actionPlanAddAction(task?._id, workspaceId, { action: "record", recordedValue: newProgress.currentProgress, outcome: progress.toString(), label: task?.measureLabel, type: "decrease" }));
    }
    else {
      const progress = parseInt(task?.currentProgress) + parseInt(newProgress.currentProgress);
      dispatch(goalsEditAction(task?._id, workspaceId, { currentProgress: progress }));
      dispatch(actionPlanAddAction(task?._id, workspaceId, { action: "record", recordedValue: newProgress.currentProgress, outcome: progress.toString(), label: task?.measureLabel, type: "increase" }));
    }


    closeMain(false);
  }
  useEffect(() => {
    dispatch(subGoalsFetchAction(task._id))
  }, [])
  useEffect(() => {

    if (Array.isArray(subGoalsList)) {
      const completed = subGoalsList.filter(item => item.status === "Completed");
      const notCompleted = subGoalsList.filter(item => item.status != "Completed");
      const newList = [...notCompleted, ...completed]
      setTaskSearchResult(newList)
    }
    // isGoalCompleted(subGoalsList) === "Completed" ?
    //   dispatch(goalsEditActionMuted(task?._id, { status: "Completed" })) :
    dispatch(goalsEditActionMuted(task?._id, { status: isGoalCompleted(subGoalsList) }))
  }, [subGoalsList])


  // ** Render Goals
  const renderListTasks = () => {
    return (
      <>
        {taskSearchResult.length ? (
          <ReactSortable
            tag="ul"
            list={taskSearchResult}
            handle=".drag-icon"
            className="task-task-list media-list p-0 m-0"
            setList={(newState) => handleSetList(newState)}
            overFlow="auto"

          >
            <DataTable
              className="react-dataTable"
              responsive
              columns={columns}
              data={taskSearchResult}
              //onRowClicked={()=>handleTaskClick}
              style={{ cursor: 'pointer', }}
              sortIcon={<ChevronDown size={14} />}
              expandableRows
              fixedHeaderScrollHeight="300px"
              expandableRowsComponent={(row)=>ExpandedComponent(row,task?._id,toggleGoalInfoModal,setGoalInfo)}
              expandableRowsComponentProps={{ store: store }}
              paginationPerPage={5}
              paginationRowsPerPageOptions={[2, 5, 10]}
              // onRowClicked={(row) => toggleRecordProgress(row)}
              // conditionalRowStyles={conditionalRowStyles}
              pagination
            />
          </ReactSortable>
        ) : (
          row?.progressType === "CurrentProgress" ?
            <div className={`${renderStatus(task) === "Completed" ? "bg-light-success" : "bg-light-primary"} p-2 `} >
              <p>Record Your Progress:-</p>
              <div className=" mt-3 d-flex justify-content-between">
                <h5>Goal: {(task?.measureLabel === "$" || task?.measureLabel === " ") ? task?.measureLabel + task?.measureTo : task?.measureTo + " " + task?.measureLabel}  </h5>
                {(task?.measureLabel === "$" || task?.measureLabel === " ") ? renderStatus(task) === "Completed" ? <p>Completed</p> : <h5>Remaining: {task?.measureLabel}{parseInt(task.measureTo) - parseInt(task.currentProgress)}</h5> : <h5>From: {task?.measureFrom} {task?.measureLabel} </h5>}
              </div>
              <h5 className="mt-1">Current Progress: {(task?.measureLabel === "$" || task?.measureLabel === " ") ? task?.measureLabel + task?.currentProgress : task?.currentProgress + " " + task?.measureLabel}</h5>
              {renderStatus(task) === "Completed" ?
                <Row>
                  <Col className="bg-success p-1 mt-2"><p className="text-white text-center fs-3 fw-bold my-auto">Completed</p></Col>
                </Row> :
                <div className="d-flex justify-content-end mt-3 ">

                  <div className="me-1  my-auto fs-3">{task?.measureLabel}</div>

                  <div className="">
                    <Input type="number" className="rounded-0 rounded-start" placeholder={(generateProgressOfCurrentProgress(task, "check")) ? "Record Weight Loss" : (task.measureLabel === "lbs" || task.measureLabel === "kg" ? "Record Weight Gain" : "Record Progress")} onChange={(e) => setNewProgress({ currentProgress: e.target.value })} max={row?.measureTo}>
                    </Input>
                  </div>

                  <div className="ms-">
                    <Button className="rounded-0 rounded-end" color={`${renderStatus(task) === "Completed" ? "success" : "primary"}`} onClick={handleSave} >Record</Button>
                  </div>
                </div>
              }
            </div>
            :
            <div className="border  p-1 ">
              <h5>Add Your Sub Goal using <Plus size={16} /> icon</h5>
            </div>
        )}
      </>
    );
  };

  // ** Function to taskSearch based on search query
  const handleFilter = (e) => {
    setQuery(e.target.value);
    params.q = e.target.value;
    params.sortBy = sort;
    taskSearch(params);
  };

  // ** Function to taskSearch based on sort
  const handleSort = (e, val) => {
    e.preventDefault();
    setSort(val);
    params.query = query;
    params.sortBy = val;
    taskSearch(params);
  };

  const handleSetList = (e) => { };
  return (
    <div className="tasks-area">
      <div className="content-body">
        <div className="task-app-list">
          <div className="app-fixed-search d-flex align-items-center">
            <div className="d-flex align-content-center justify-content-between m-1 w-100">
              <InputGroup className="input-group-merge py-50">
                <InputGroupText style={{ borderRadius: '0', border: 'none' }}>
                  {/* <Search className="text-muted" size={14} /> */}
                </InputGroupText>
                {/* <Input
                  placeholder="Search Goal"
                  value={query}
                  onChange={handleFilter}
                  style={{ borderRadius: '0', border: 'none' }}
                /> */}
              </InputGroup>
            </div>
            <div className="d-flex">

              <Button.Ripple
                className="btn-icon me-1"
                outline
                color="primary"
                onClick={() => subHabit(task, "sub")}
                disabled={task.progressType === "CurrentProgress" || isDayPassed(task?.endDate)}
              >
                <Plus size={16} />
              </Button.Ripple>
            </div>
            <CreateNewModal open={newGoalModal} toggle={toggleNewGoalModal} />
            <RecordSubGoalModal parentId={task?._id} goal={subGoal} toggle={toggleRecordProgress} modal={openRecordProgress} workspaceId={workspaceId} />
            {selectedTask && (
              <AddGoalModal
                toggle={handleOpenAddSubHabit}
                open={openAddSubHabit}
                task={selectedTask}
                type={type}
              />
            )}
            {selectedTask && (
              <EditGoalModal
                toggle={handleOpenEdit}
                open={openEditHabit}
                task={selectedTask}
                type={type}
              />
            )}
          </div>


          {renderListTasks()}

        </div>
      </div>
    </div>
  );
};

export default GoalRecord;
