import moment from 'moment';
import React from 'react'
import DataTable from 'react-data-table-component'
import { RotateCcw} from 'react-feather';
import { useDispatch } from 'react-redux';
import { Card } from 'reactstrap';
import { actionPlanDeleteAction } from '../../taskngoals/store/actions';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

export default function HabitActionPlanTab({ closeMain, workspaceId, task }) {
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const handleUndo = async (row) => {
    const result = await MySwal.fire({
      title: 'Undo?',
      text: `Undo this habit ?`,
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
      //handle deleting data
      dispatch(actionPlanDeleteAction(row._id, workspaceId, true))
      closeMain()
    }
  };

  const data = task?.actionPlans || [];
  const customDateSort=(a, b)=> {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    if (dateA < dateB) {
      return -1;
    } else if (dateA > dateB) {
      return 1;
    }
  
    return 0;
  }
  const columns = [

    {
      name: 'DATE',
      selector: row=>row.date,
      sortable: true,
      sortFunction: customDateSort ,
      cell:(row)=><div>{moment(row.date).format("MM-DD-YYYY")}</div>
    },
    {
      name: 'STATUS',
      selector: (row) => row.status,
 

    },
    {
      name: "NOTES",
      selector: (row) => row.description,

    },
    {
      name: "Undo",
      cell: (row) =>
      (<div className="d-flex justify-content-start" style={{ width: "100%" }}>
        <div className="text-danger"><RotateCcw onClick={() => { handleUndo(row) }} style={{ cursor: "pointer" }} /></div>

      </div>)

    }

  ]

  return (
    <Card>
      <DataTable
        noHeader
        pagination
        responsive
        paginationPerPage={15}
        paginationRowsPerPageOptions={[5, 10, 15]}
        columns={columns}
        className="react-dataTable"
        defaultSortFieldId={1}
        data={data}
      />


    </Card>
  )
}
