import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import ReactPaginate from 'react-paginate';
import { Button, Card, Progress } from 'reactstrap';

export default function HabitsTab() {
    const [currentPage, setCurrentPage] = useState(1);
    const handlePagination = async (page) => {
        setCurrentPage(page.selected + 1);
      };
  const columns = [
    {
      name: 'Habit',
      selector: (row) => row.habit,
    
    },
    {
      name: 'Frequency',
      selector: (row) => row.frequesncy,
 
    },
    {
      name: 'Repetition',
      selector: (row) => row.repetition,
      
    },
    {
      name: 'Strength',
      width:"200px",
      selector: (row) => row.strength,
      cell: (row) => <Progress value={row.strength} className="w-100">{row.strength} %</Progress>
    },
    {
      name: 'Checks',
      selector: (row) => row.checks
    }
  ];
  const data = [
    {
      habit: 'sleep 7 hours per day',
      repetition: 30,
      frequesncy: 'every day',
      strength: 30,
      checks: 0,
      goal: 'this goal',
      category: 'Personal'
    }
  ];
  const CustomPagination = () => {
    const count = Math.ceil(data.length / 5);
    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        pageCount={count || 1}
        activeClassName="active"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={(page) => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        containerClassName={'pagination react-paginate justify-content-end my-2 pe-1'}
      />
    );
  };
  return (
    <Card>
      <DataTable
        noHeader
        sortServer
        pagination
        responsive
        paginationServer
        columns={columns}
        // onSort={handleSort}
        // sortIcon={<ChevronDown />}
        className="react-dataTable"
        paginationComponent={CustomPagination}
        data={data}
      />
       <div className="d-flex justify-content-end p-1">
          
          <Button color="primary"  >
            <span className="align-middle d-sm-inline-block d-none">Add Habit</span>
            
          </Button>
        </div>
    </Card>
  );
}
