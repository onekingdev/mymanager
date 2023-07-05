import { useState } from 'react';
import { Trash } from 'react-feather';
import { Badge, Button, Progress, Row, Col } from 'reactstrap';
import { convertDate } from '../helpers/converters';
import { renderStatus, renderProgress, completedSubGoals, totalSubGoals, generatePercentageForCurrentProgress } from '../helpers/renderProgressData';
import { currentStatusCalculator } from '../helpers/habitCalculation';
import Confetti from 'react-confetti';
import { generateDate } from '../helpers/generate';
import { generateProgressOfCurrentProgress, generateMaxValueOfCurrentProgress, percentageOfSubgoals } from '../helpers/renderProgressData';

const useColumns = (
  { toggleHabitDetails },
  { handleOpenAddSubHabit },
  { handleOpenEdit },
  { handleOpenDelete }
) => {
  // ** STATES
  const [hoveredRow, setHoveredRow] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  // ** TOGGLERS
  const handleShowButtons = (rowId) => {
    setHoveredRow(rowId);
  };
  const handleNoButtons = () => {
    setHoveredRow('');
  };
  // ** FUNCTIONS
  const columns = [
    {
      name: 'GOAL NAME',
      sortable: true,
      width: '22%',
      sortField: 'name',
      selector: (row) => row.name,
      cell: (row) => (
        <div
          style={{ cursor: 'pointer', width: "100%" }}
          onClick={() => toggleHabitDetails(row)}
        >
          <Row
            className="d-flex justify-content-between "
            onMouseEnter={() => handleShowButtons(row._id)}
            onMouseLeave={handleNoButtons}
          >
            <Col sm={9} >
              <div className="my-1">
                <span className="fw-bolder ">{row.name}</span>
                <p>{row?.type === "target" ? convertDate(row.startDate) : convertDate(row.startDate)} - {row?.type === "target" ? convertDate(row.endDate) : generateDate(row.startDate, row.repetition, row.frequency)}</p>
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
      name: 'TYPE',
      maxWidth: '12%',
      center: true,
      selector: (row) => row.type,
      cell: (row) => <div onClick={() => toggleHabitDetails(row)} style={{ padding: '6px' }} className={`d-flex justify-content-center align-items-center text-center rounded ${row.type === "habit" ? "bg-light-warning" : "bg-light-primary"}`}><span className="text-center fw-bolder">{row.type.toUpperCase()}</span></div>
    },
    {
      name: 'METHOD',
      maxWidth: '12%',
      center: true,
      selector: (row) => row.type,
      cell: (row) => <div onClick={() => toggleHabitDetails(row)} style={{ padding: '6px' }} className="d-flex text-center rounded">
        {row?.type === "habit" ? (row?.frequency === "Every day" ?
          <span style={{ padding: "7px",color:"#5B7C99" }} className=" rounded fw-bolder ">Mark Daily</span> :
          <span style={{ padding: "7px" }} className=" rounded fw-bolder text-warning text-opacity-75">Weekly</span>) :
          row?.progressType === "CurrentProgress" ?
            <span style={{ padding: "7px",color:"#7F58AF" }} className=" rounded fw-bolder  ">Record Progress</span> :
            <span style={{ padding: "7px" }} className=" rounded fw-bolder text-primary text-opacity-75">Complete Sub Goals</span>}
      </div>
    },
    {
      name: 'STATUS',
      maxWidth: '18%',
      center: true,
      selector: (row) => row.subGoals,
      cell: (row) => <>
        <span onClick={() => toggleHabitDetails(row)} >{(row.type != "habit" && row.progressType != "CurrentProgress") ? (row?.status || 0) : row.type === "target" && (row.measureLabel === "$" ? row.measureLabel + " " + row.currentProgress + "/" + row.measureTo : row.currentProgress + "/" + row.measureTo + row.measureLabel)} </span>
        <span onClick={() => toggleHabitDetails(row)} >{row.type === "habit" && currentStatusCalculator(row) + " " + row?.frequency.split(' ')[1]} </span>
      </>
    },
    {
      name: 'PROGRESS',
      width: '22%',
      center: true,
      sortable: true,
      sortField: 'progress',
      selector: (row) => row.progress,
      cell: (row) => (
        <div onClick={() => toggleHabitDetails(row)} className="w-100">
          {row.type === "target" && row.progressType === "CurrentProgress" &&
            <>
              <span className='text-center d-block'>{generatePercentageForCurrentProgress(row)}%</span>
              <Progress className="w-100" value={generateProgressOfCurrentProgress(row)} max={generateMaxValueOfCurrentProgress(row)} />

            </>
          }
          {row.type === "target" && row.progressType != "CurrentProgress" &&
            <>
              <span className='text-center d-block'>{percentageOfSubgoals(row.status) || 0}%</span>
              <Progress className="w-100" value={completedSubGoals(row.status)} max={totalSubGoals(row.status)} />
            </>
          }
          {
            row.type === 'habit' &&
            <>
              <span className='text-center d-block'>{renderProgress(row, currentStatusCalculator)}%</span>
              <Progress className="w-100" value={renderProgress(row, currentStatusCalculator)} max={100} />
            </>
          }
        </div>
      )
    },
    {
      name: 'ACHIEVEMENT',
      width: '15%',
      sortable: true,
      center: true,
      sortField: 'status',
      selector: (row) => row.status,
      cell: (row) => (
        <>
          <div onClick={() => toggleHabitDetails(row)} className={`d-flex justify-content-center align-items-center ${renderStatus(row, currentStatusCalculator) === "Completed" ? "bg-success" : "bg-light-warning"} `} style={{ height: "40px", width: " 100%" }}>
            <span className="fw-bolder  p-1">{renderStatus(row, currentStatusCalculator) || "Pending"}</span></div>
          {renderStatus(row, currentStatusCalculator) === "Completed" &&
            <Confetti
              height={50}
              width={120}
              recycle={false}
              numberOfPieces={80}
              gravity={0.2}
              initialVelocityX={{ min: -10, max: 10 }}
              initialVelocityY={{ min: -10, max: 10 }}
              onConfettiComplete={() => setShowConfetti(false)}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            />
          }

        </>
      )
    },

  ];
  return {
    columns
  };
};
export default useColumns;
