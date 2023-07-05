// ** React Imports
import { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';

// ** Custom Components
import DataTable from 'react-data-table-component';

// ** Third Party Components
import { ReactSortable } from 'react-sortablejs';
import habit from '../../../assets/images/banner/habit.png'
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Menu,
  Search,
  MoreVertical,
  ChevronDown,
  Edit,
  Trash2,
  Star,
  Copy,
  Trash,
  Info,
  Share2,
  Plus,
  Filter,
  Users,
  Columns,
  Calendar,
  List,
  CheckCircle,
  Image,
  Edit2
} from 'react-feather';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// ** Reactstrap Imports
import {
  Input,
  Button,
  Badge,
  InputGroup,
  InputGroupText,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Form,
} from 'reactstrap';

// ** Import Components
import NewModal from './NewModal';
import HabitDetails from './../habit-view/HabitDetails';
import CreateNewModal from '../createNew/CreateNewModal';
import useColumns from './useColumns';

// ** Styles
import '@styles/react/libs/drag-and-drop/drag-and-drop.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';

// ** HANDLING DATA
import { useDispatch, useSelector } from 'react-redux';
import { setGoalsReducer } from '../store/reducer';
import EditHabitModal from '../habit-view/EditHabitModal';

import img from './../../../assets/images/banner/banner-20.jpg';
import AddGoalModal from '../goal-view/AddGoalModal';
import { goalsFetchAction, goalsDeleteAction, goalsEditAction, setGoalAction } from '../../taskngoals/store/actions';
import { isDayPassed } from '../helpers/compareDate';
import { BiExpand } from 'react-icons/bi';
import ExpandedGoalInfo from '../goal-view/ExpandedGoalInfo';

const ExpandedComponent = ({ data, store,setGoalInfo,toggleGoalInfoModal }) => {
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
    dispatch(goalsEditAction(data._id, data.workSpace, payload))

  }
  const handleExpandGoalInfo=(data)=>
{
   setGoalInfo(data)
   toggleGoalInfoModal()
}
  const imageRef = useRef();
  return (
    <>
      <div className="container pb-1">
        <Row>
          <Col md="3" className="mt-auto mb-0">
          <span className="cursor-pointer" onClick={()=>handleExpandGoalInfo(data)} ><BiExpand size={20}></BiExpand></span>
            <div>
                 
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
                  onClick={()=>handleExpandGoalInfo(data)}
                  className="w-100 img-thumbnail img-fluid"
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
                <div>
                  <Button type="submit" color="outline-primary" className="mt-1">
                    Save
                  </Button>
                </div>
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
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};

const TaskList = (props) => {
  // ** Props
  const {
    store,
    collapse,
    labelColors,
    dispatch,
    goalsList,
    workspaceId,
    getTasks,
    updateTask,
    selectedWorkspace,
    selectTask,
    // reOrderTasks,
    handleTaskSidebar,
    handleMainSidebar,
    handleWorkspaceCollapse
  } = props;

  // ** States
  const [newGoalModal, setNewGoalModal] = useState(false);
  const [goalInfo,setGoalInfo]=useState({})
  const [goalInfoModal,setGoalInfoModal]=useState(false)
  const toggleGoalInfoModal=()=>{
    goalInfoModal&&setGoalInfo({})
    setGoalInfoModal(!goalInfoModal)
  }
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('');
  const [taskSearchResult, setTaskSearchResult] = useState([]);
  const [deleteTaskArr, setDeleteTaskArr] = useState([]);
  const [modalType, setModalType] = useState(0);
  const [openHabitDetails, setOpenHabitDetails] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});
  const [openAddSubHabit, setOpenAddSubHabit] = useState(false);
  const [openEditHabit, setOpenEditHabit] = useState(false);
  const [type, setType] = useState('sub'); //sub || origin
  const paramsURL = useParams();
  const primaryGoal = useSelector((state) => state.goals.selectedGoal);
  const MySwal = withReactContent(Swal);
  const scrollRef = useRef(null);
  // ** TOGGLERS
  const toggleNewGoalModal = () => setNewGoalModal(!newGoalModal);
  const toggleHabitDetails = (task) => {
    setSelectedTask(task);
    setOpenHabitDetails(!openHabitDetails);
    openHabitDetails && dispatch(goalsFetchAction(workspaceId._id))
    !openHabitDetails && dispatch(setGoalAction(task))
  };
  const handleOpenAddSubHabit = (row, type) => {
    openAddSubHabit ? setOpenAddSubHabit(false) :
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
  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  };
  const handleOpenDelete = async (row) => {
    const result = await MySwal.fire({
      title: 'Delete?',
      text: `Are you sure you want to delete this ${row.type} ?`,
      // icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Delete anyway',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    });
    if (result.value) {
      //handle deleting data
      dispatch(goalsDeleteAction(row?.workSpace, row?._id))
    }
  };

  useEffect(() => {
    setTaskSearchResult(goalsList);
  }, [goalsList]);
  var params = {
    filter: paramsURL.filter || '',
    q: '',
    sortBy: '',
    tag: paramsURL.tag || ''
  };

  // ** Function to selectTask on click
  const handleTaskClick = (obj) => {
    //handleTaskSidebar();
  };
  useEffect(() => {
    dispatch(goalsFetchAction(workspaceId?._id, "reset"));
  }, [workspaceId?._id])

  // ** Search Tasks
  const taskSearch = (searchParams) => {
    let resultData = goalsList;
    if (searchParams.q) {
      resultData = goalsList.filter((x) => {
        let searchTxt = `${x.name}`;
        // x.assignedTo.forEach((element) => {
        //   searchTxt += element.name;
        // });
        return searchTxt.toLowerCase().indexOf(searchParams.q) > -1;
      });
    }
    setTaskSearchResult(resultData);
  };

  const { columns } = useColumns(
    { toggleHabitDetails },
    { handleOpenAddSubHabit },
    { handleOpenEdit },
    { handleOpenDelete }
  );
  const conditionalRowStyles = [
    // {
    //   when: row => row.status === "Completed" || isHabitComplete(row) || parseInt(row.measureTo) <= parseInt(row.currentProgress),
    //   style: {
    //     backgroundColor: "#dfffde",
    //   },
    // },
    {
      when: row => isDayPassed(row.endDate),
      style: {
        backgroundColor: "#f2f2f2"
      }
    },
  ];
  // ** Render Goals
  const renderListTasks = () => {

    return (
      <div className="list-group task-task-list-wrapper">
      
        {taskSearchResult.length ? (
          <ReactSortable
            tag="ul"
            list={taskSearchResult}
            handle=".drag-icon"
            className="task-task-list media-list"
            setList={(newState) => handleSetList(newState)}
            overFlow="auto"
          >
            <PerfectScrollbar 
            containerRef={(ref) => (scrollRef.current = ref)}  
            style={{ height: "52vh" }} 
            options={{ wheelPropagation: false }}>
              <DataTable
                className="react-dataTable"

                columns={columns}
                data={taskSearchResult}
                //onRowClicked={handleTaskClick}
                style={{ cursor: "pointer" }}

                sortIcon={<ChevronDown size={14} />}
                expandableRows
                expandableRowsComponent={ExpandedComponent}
                conditionalRowStyles={conditionalRowStyles}
                customStyles={{ rows: { style: { cursor: "pointer" } } }}
                expandableRowsComponentProps={{ store: store,setGoalInfo:setGoalInfo,toggleGoalInfoModal:toggleGoalInfoModal }}
                onRowClicked={(row) => toggleHabitDetails(row)}
                pagination
                onChangePage={scrollToTop}
              />
            </PerfectScrollbar>
          </ReactSortable>
        ) : (
          <div className="no-results show">
            <h5>No Items Found</h5>
          </div>
        )}
      </div>
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


  const handleSetList = (e) => { };
  return (
    <div className="task-app-list">

      <div className="app-fixed-search d-flex align-items-center">
        <div
          className="sidebar-toggle cursor-pointer d-block d-lg-none ms-1"
          onClick={handleMainSidebar}
        >
          <Menu size={21} />
        </div>
        <div className="d-flex align-content-center justify-content-between w-100">
          <InputGroup className="input-group-merge">
            <InputGroupText>
              <Search className="text-muted" size={14} />
            </InputGroupText>
            <Input placeholder="Search Goals" value={query} onChange={handleFilter} />
          </InputGroup>
        </div>
        <div className="d-flex">

          <Button.Ripple
            className="btn-icon me-1"
            outline
            color="primary"
            onClick={toggleNewGoalModal}
          >
            <Plus size={16} />
          </Button.Ripple>

        </div>
        <NewModal
          store={store}
          dispatch={dispatch}
          modalType={modalType}
          deleteTaskArr={deleteTaskArr}
          setDeleteTaskArr={setDeleteTaskArr}
          setModalType={setModalType}
        />
        <CreateNewModal open={newGoalModal} workspaceId={workspaceId?._id} toggle={toggleNewGoalModal} />
        {store && (
          <HabitDetails
            open={openHabitDetails}
            toggle={toggleHabitDetails}
            subHabit={handleOpenAddSubHabit}
            task={primaryGoal}
            closeMain={setOpenHabitDetails}
            dispatch={dispatch}
            store={store}
            workspaceId={workspaceId}
            toggleGoalInfoModal={toggleGoalInfoModal}
            setGoalInfo={setGoalInfo}
          />
        )}
        {selectedTask && (
          <AddGoalModal
            toggle={handleOpenAddSubHabit}
            open={openAddSubHabit}
            workspaceId={workspaceId?._id}
            task={selectedTask}
            type={type}
          />
        )}
        {selectedTask && (
          <EditHabitModal
            toggle={handleOpenEdit}
            open={openEditHabit}
            task={selectedTask}
            type={type}
          />
        )}
          <ExpandedGoalInfo defaultImage={habit} componentData={goalInfo}  open={goalInfoModal} toggle={toggleGoalInfoModal} />

   

      </div>


      <PerfectScrollbar
        className="list-group task-list-wrapper bg-opacity-10"
        options={{ wheelPropagation: false }}
      >
        {renderListTasks()}
      </PerfectScrollbar>


    </div>
  );
};

export default TaskList;
