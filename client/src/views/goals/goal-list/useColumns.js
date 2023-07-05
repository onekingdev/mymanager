import { useEffect, useState } from 'react';
import { Edit2, Plus, Trash } from 'react-feather';
import { useHistory } from 'react-router-dom';
import { Badge, Button,Row,Col, Progress } from 'reactstrap';
import { setGoalsReducer } from '../store/reducer';
import { isDayPassed } from '../helpers/compareDate';
import { generateMaxValueOfCurrentProgress, generateProgressOfCurrentProgress, renderStatus } from '../helpers/renderProgressData';
import { currentStatusCalculator } from '../helpers/habitCalculation';

const useColumns = ({ toggleHabitDetails },
  { handleOpenAddSubHabit },
  { handleOpenEdit },
  { handleOpenDelete }, { handleAccomplishClicked }, { toggleRecordProgress },endDate) => {
  // ** STATES

  const [hoveredRow, setHoveredRow] = useState(null);

  // ** TOGGLERS
  const handleShowButtons = (rowId) => {
    setHoveredRow(rowId);
  };
  const handleNoButtons = () => {
    setHoveredRow('');
  };

  const checker = (goal) => {
    if (goal.progressType === "CompletedTasks" || goal.progressType === "SubGoals") {
      return (false)
    }
    if (goal.progressType === "AllTasks" || goal.progressType === "CurrentProgress") {
      return (true)
    }
    return(null)
  }

  // ** FUNCTIONS
  const convertDate = (date) => {
    const d = new Date(date);
    return (
      <span>
        {d.getUTCMonth() + 1}/{d.getDate()}/{d.getUTCFullYear()}
      </span>
    );
  };


  const columns = [
    {
      name: 'GOAL',
      sortable: true,
      width:"35%",
      center:true,
      sortField: 'name',
      selector: (row) => row.name,
      cell: (row) => (
        <div
          style={{ cursor: 'pointer', width: "100%" }}
          // onClick={() => toggleRecordProgress(row)}
        >
          <Row
            className="d-flex justify-content-between "
            onMouseEnter={() => handleShowButtons(row._id)}
            onMouseLeave={handleNoButtons}
          >
            <Col sm={9} >
              <div className="my-1">
                <span className="fw-bolder ">{row.name}</span>
                <p className="m-0 secondary">Start:-{row?.type === "target" ? convertDate(row.startDate) : convertDate(row.startDate)}</p>
                <span className="secondary">End:-{row?.type === "target" ? convertDate(row.endDate) : generateDate(row.startDate, row.repetition, row.frequency)}</span>
                {/* <small className="text-truncate text-muted mb-0">{row.target}</small> */}
              </div>
            </Col>
            <Col sm={3} >
              <div className="mt-1"
              >
                <Button
                  color="link"

                  className={` p-0 ${hoveredRow === row._id ? '' : 'd-none'
                    }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenDelete(row);
                  }}
                >
                  <Badge color="danger">
                    <Trash size={14} />
                  </Badge>
                </Button>
              </div>
            </Col>
          </Row>
        </div>
 
      )
    },
   
    {
      name: 'PROGRESS',
      center:true,
      sortable: true,
      sortField: 'progress',
      selector: (row) => row.progress,
      cell: (row) => (
        <div className='w-100'>
          {row.progressType === "CurrentProgress" ?
            <>
              <span className='text-center d-block'>{row.measureLabel==="$"?row?.measureLabel+" "+ row?.currentProgress+"/"+row.measureTo:row?.currentProgress+"/"+row?.measureTo+" "+ row?.measureLabel}</span>
              <Progress className="w-100" value={generateProgressOfCurrentProgress(row)} max={generateMaxValueOfCurrentProgress(row)} />
            </>
            :
            <>
              <span className='text-center d-block'>{row.status === 'Completed' ? 100 : 0} %</span>
              <Progress className="w-100" value={row.status === 'Completed' ? 100 : 0} max={100} />
            </>
          }
        </div>
      )
    },
    {
      name: 'ACTION',
      center: true,
      selector: (row) => row.status,
      cell: (row) =>
        row && checker(row) ? (
          
          <Button color="warning"  disabled={renderStatus(row,currentStatusCalculator)==="Completed"} size="lg" onClick={() => toggleRecordProgress(row)}>
            <span className="text-small" style={{ fontSize: '11px' }}>
              {isDayPassed(row.endDate)?"Expired":renderStatus(row,currentStatusCalculator)}
            </span>
          </Button>
        ) : (
          <Button disabled={row?.status === "Completed"||isDayPassed(row.endDate)} color="primary" size="lg" onClick={() => toggleRecordProgress(row)}>
            <span style={{ fontSize: '11px' }}>{isDayPassed(row.endDate)?"Expired":row?.status === "Completed"?"Completed":"Complete"}</span>
          </Button>
        )
    }
  ];
  return {
    columns
  };
};
export default useColumns;
