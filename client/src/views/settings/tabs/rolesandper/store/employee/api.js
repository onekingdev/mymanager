import { customInterIceptors } from "../../../../../../lib/AxiosProvider";

const API = customInterIceptors();

export const addTasks = (payload) =>{
    return API.post('/employee-task/',payload)
}

export const getTasksByEmployee = () =>{
    return API.get('/employee-task/employee/task')
}

export const getTasksByUser = (payload) =>{
    
    return API.get('/employee-task/user/'+payload)
}

export const updateTaskByUser = (id,payload)=>{
    return API.patch('/employee-task/'+id,payload)
}

export const updateTaskByEmployee = (taskId,payload)=>{
    return API.patch('/employee-task/employee/task/'+taskId,payload)
}

export const updateTaskStatusUser = (taskId,payload)=>{
    return API.patch('/employee-task/mark-status/'+taskId,payload)
}



