import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import { Card } from 'reactstrap'
import moment from 'moment'
import { RotateCcw } from 'react-feather'
import { actionPlanDeleteAction, fetchGoal, goalsEditAction, subGoalsEditAction } from '../../../../taskngoals/store/actions'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';



export default function ActionPlanTab({ task, closeMain }) {
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const subGoalsList = useSelector((state) => state.goals.subGoalsList);
  const handleOpenUndoConfirm = async (row) => {
    const result = await MySwal.fire({
     
      text: `Are you sure to undo?`,
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Undo',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    });
    if (result.value) {
      task?.progressType==="CurrentProgress"?
      handleUndoHabit(row):
      handleUndoGoal(row)
    }
  };
  const handleUndoHabit = (record) => {
    if (record.type === "decrease") {
      const progress = parseInt(record?.recordedValue) + parseInt(task?.currentProgress)
  
      dispatch(goalsEditAction(task?._id, task?.workSpace, { currentProgress: progress }))
      dispatch(actionPlanDeleteAction(record?._id, task?.workSpace, false))
      closeMain(false)

    }
    if (record.type === "increase") {
      const progress = parseInt(task?.currentProgress) - parseInt(record?.recordedValue)
      dispatch(goalsEditAction(task?._id, task?.workSpace, { currentProgress: progress }))
      dispatch(actionPlanDeleteAction(record?._id, task?.workSpace, false))
      closeMain(false)

    }

  
  }
  const handleUndoGoal = (record) => {
    const filteredGoal = subGoalsList.filter(goal => goal._id === record.parentGoalId)
    if (filteredGoal.length) {
      
      const currentProgress = filteredGoal[0]?.currentProgress;
      const measureTo = filteredGoal[0]?.measureTo;
      if (record.type === "decrease") {
        const progress = parseInt(record?.recordedValue) + parseInt(currentProgress)
        progress <= parseInt(measureTo)?
        dispatch(subGoalsEditAction(record.parentGoalId,  { currentProgress: progress },task?._id)):
        dispatch(subGoalsEditAction(record.parentGoalId,  { currentProgress: progress,status:"" },task?._id))
        dispatch(actionPlanDeleteAction(record?._id, task?.workSpace, false))
        
             
      }
      if (record.type === "increase") {
        const progress = parseInt(currentProgress) - parseInt(record?.recordedValue)
        progress >= parseInt(measureTo)?
        dispatch(subGoalsEditAction(record.parentGoalId,  { currentProgress: progress },task?._id)):
        dispatch(subGoalsEditAction(record.parentGoalId, { currentProgress: progress,status:"" },task?._id))
        dispatch(actionPlanDeleteAction(record?._id, task?.workSpace, false))
     
      }
      if (record.type === "completion") {
        dispatch(subGoalsEditAction(record?.parentGoalId, { status: "" },task?._id))
        dispatch(actionPlanDeleteAction(record?._id, task?.workSpace, false))
      }
    }
    else {
      toast.error("Failed to find the goal")
    }
  }
  const customDateSort=(a, b)=> {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    if (dateA < dateB) {
      return -1;
    } else if (dateA > dateB) {
      return 1;
    }
  
    return 0;
  }
  const conditionalRowStyles = [
    // {
    //   when: row => row.status === "Completed" || isHabitComplete(row) || parseInt(row.measureTo) <= parseInt(row.currentProgress),
    //   style: {
    //     backgroundColor: "#dfffde",
    //   },
    // },
    {
      when: row => row.isDelete === true,
      style: {
        backgroundColor: "#f0eded"
      }
    },
  ];
  const columns = [
    {
      name: 'DATE',
      center: true,
      selector: row => row.createdAt,
      sortable: true,
      sortFunction: customDateSort ,
      cell: (row) => <>
        <div>{moment(row.createdAt).format("MM/DD/YYYY h:mm a")}</div>

      </>
    },
    {
      name: 'RECORDED',
      center: true,
      selector: (row) => row.recordedValue + row.label,
    },
    {
      name: "OUTCOME",
      center: true,
      selector: (row) => row.outcome + row.label,
    },
    {
      name: "UNDO",
      center: true,
      cell: (row) => <div><RotateCcw className="text-danger" onClick={() => handleOpenUndoConfirm(row)} size={18} /></div>
    }
  ];
  const columnsForCurrentProgress = [
    {
      name: 'DATE',
      center: true,
      selector: row => row.createdAt,
      sortable: true,
      sortFunction: customDateSort ,
      cell: (row) => <>
        <div>
          <div>{moment(row.createdAt).format("MM/DD/YYYY")}</div>
          <div>{moment(row.createdAt).format("h:mm a")}</div>
        </div>
      </>
    },
    {
      name: 'NAME',
      center: true,
      selector: (row) => row.title,
    },
    {
      name: 'RECORDED',
      center: true,
      selector: (row) => row.recordedValue + row.label,
    },
    {
      name: 'OUTCOME',
      center: true,
      selector: (row) => row.outcome + row.label,
    },

    {
      name: 'UNDO',
      center: true,
      cell: (row) => <div className="text-danger">{!row.isDelete ? <RotateCcw onClick={() => handleOpenUndoConfirm(row)} className="text-danger" size={18} /> : "Deleted"}</div>
    }
  ];
  return (
  
    <Card>
      <DataTable
        noHeader
        pagination
        paginationPerPage={15}
        paginationRowsPerPageOptions={[5, 10, 15]}
        responsive
        columns={task.progressType === "CurrentProgress" ? columns : columnsForCurrentProgress}
        className="react-dataTable"
        conditionalRowStyles={conditionalRowStyles}
        defaultSortFieldId={1}
        data={task?.actionPlans || []}
      />
      <div className="d-flex justify-content-end p-1">
        {/* <Button color="primary" className=" me-1" outline onClick={handleAddSubGoal}>
            <span className="align-middle d-sm-inline-block d-none ">Add Sub Goal</span>
          </Button>
          <Button color="primary" onClick={handleAddHabit}>
            <span className="align-middle d-sm-inline-block d-none">Add Habit</span>          
          </Button> */}
      </div>
    </Card>
  )
}
