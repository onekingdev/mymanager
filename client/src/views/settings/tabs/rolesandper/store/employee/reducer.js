import { createSlice } from "@reduxjs/toolkit";

export const employeeTasks = createSlice({
    name:'employeeTasks',
    initialState:{
        taskList:[],
        employeeTaskList:[],
        selectedTask:{
            _id:'0',
            createdAt:'',
            description:'',
            title:'',
            type:'',
            empRoleId:'',
            documentUrl:'',
            documentId:'',
            
            empList:[],
            board:[],
            empTaskStatus:[],
            status:''
        },
        currentBoard:[],
        board:[],
        currentPage:1,
        redoList:[],
        undoList:[],
        isUndoRedo:false,
        selectedItem:{},
        role:{},
        zoom:1,
        openProbs:false,
        mine:{
            isMine: false,
            color:'#c9fadf',
            _id:0
        },
    },
    reducers:{
        setTaskListReducer:(state,action) =>{
            state.taskList = action?.payload
        },
       
        getTasksByRolesReducer:(state,action) =>{

            state.taskList = action?.payload
        },
        getTasksForUserReducer:(state,action) =>{
            state.taskList = action?.payload
        },
        setSelectedTaskReducer:(state,action) =>{
            state.selectedTask = action?.payload
        },
        setCurrentBoardReducer:(state,action)=>{
            state.currentBoard = action?.payload
        },
        setBoardReducer:(state,action)=>{
            state.board = action?.payload
            
        },
        setRedoListReducer:(state,action)=>{
            state.redoList = action?.payload
        },
        setUndoListReducer:(state,action)=>{
            state.undoList = action?.payload
        },
        setIsUndoRedoReducer:(state,action)=>{
            state.isUndoRedo = action?.payload
        },
        setSelectedItemReducer:(state,action)=>{
            state.selectedItem = action?.payload

        },
        setSelectedRoleReducer:(state,action)=>{
            state.role = {...action?.payload, color:'#9f99e8'}
        },
        setIsMineReducer:(state,action)=>{
            state.selectedTask = {...state.selectedTask,mine:{
                isMine:action?.payload,
                color:"#c9fadf"
            }}
        },
        setZoomReducer:(state,action)=>{
            state.zoom = action?.payload
        },
        setOpenPropsReducer:(state,action)=>{

            state.openProbs = action?.payload
        },
        setCurrentPageReducer:(state,action) =>{
            state.currentPage = action?.payload
        },
        setToDefaultReducer:(state,action)=>{
            state.selectedItem = {};
            state.selectedTask={
                _id:'0',
                createdAt:'',
                description:'',
                title:'',
                type:'',
                empRoleId:'',
                documentUrl:'',
                documentId:'',
                isNewUser:true,
                mine:{
                    isMine: false,
                    color:'#c9fadf'
                },
                empId:[],
                board:[],
                empTaskStatus:[]
            };
            state.currentBoard=[];
            state.board=[]; // for edit / create
            state.currentPage=1;
            state.redoList=[];
            state.undoList=[];
            state.role = {};
            state.isUndoRedo=false;
            state.zoom=1;
            state.openProbs=false;
        },
        setViewPdfReducer:(state,action) =>{
  
            state.selectedTask = action?.payload;
            // state.selectedTask = {
            //     _id:action?.payload?._id,
            //     createdAt:action?.payload?.createdAt,
            //     description:action?.payload?.description,
            //     title:action?.payload?.title,
            //     type:action?.payload?.type,
            //     empRoleId:action?.payload?.empRoleId,
            //     documentUrl:action?.payload?.documentUrl,
            //     documentId:action?.payload?.documentId,
            //     isAllCurrent:action?.payload?.isNewUser,
            //     status:action?.payload?.status,
            //     mine:{
            //         isMine: false,
            //         color:'#c9fadf'
            //     },
            //     empId:action?.payload?.empId
            // }
            // state.board = action?.payload?.board
            // state.currentBoard=[];
            // state.currentPage=1;
            // state.redoList=[];
            // state.undoList=[];
            // state.role = action?.payload?.role;
            // state.isUndoRedo=false;
            // state.openProbs=false;
        },
        setPropertiesReducer:(state,action)=>{
            state.board = action?.payload.board
            state.selectedItem = action?.payload.selectedItem
      
            state.openProbs = action?.payload.openProps
        },
        setEmployeeTasksByIdReducer:(state,action)=>{
            const empData = state?.taskList?.employeeList?.data?.list;
            const tableData = empData?.map(x=>{
              const approved = state?.taskList?.data?.approvedEmployee.find(y=>y._id===x._id)?.approved || 0
              const total = state?.taskList?.data?.employeeTasks.find(y=>y._id===x._id).tasks.length
              const series = parseInt((approved/total) * 100)
        
              return {...x,approved:approved,total:total,series:[series]}
            })
            state.employeeTaskList = tableData
        }
        
    }
})
export const {
    getTasksByRolesReducer,
    getTasksForUserReducer,
    setSelectedTaskReducer,
    setCurrentBoardReducer,
    setBoardReducer,
    setRedoListReducer,
    setUndoListReducer,
    setIsUndoRedoReducer,
    setSelectedItemReducer,
    setSelectedRoleReducer,
    setIsMineReducer,
    setZoomReducer,
    setOpenPropsReducer,
    setCurrentPageReducer,
    setToDefaultReducer,
    setViewPdfReducer,
    setPropertiesReducer,
    setEmployeeTasksByIdReducer,

    setTaskListReducer
} = employeeTasks.actions;

export default employeeTasks.reducer;