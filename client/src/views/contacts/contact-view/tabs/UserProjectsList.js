// ** React Imports
import { useEffect, useState } from 'react';

// ** Table columns & Expandable Data
import ExpandableTable, { data, columns } from './data';

// ** Third Party Components
import ReactPaginate from 'react-paginate';
import { ChevronDown } from 'react-feather';
import DataTable from 'react-data-table-component';

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { getContactMembershipContractsAction } from '../../store/actions';

const DataTableWithButtons = ({dispatch}) => {
  // ** State
  const [currentPage, setCurrentPage] = useState(0);
  const [contracts, setContracts] = useState([]);

  // ** Function to handle filter
  const handlePagination = (page) => {
    setCurrentPage(page.selected);
  };
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getContactMembershipContractsAction(id)).then(res=>{
        setContracts(res)
      })
    }
  }, [id]);
  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel={''}
      nextLabel={''}
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      pageCount={10}
      breakLabel={'...'}
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName="active"
      pageClassName="page-item"
      breakClassName="page-item"
      nextLinkClassName="page-link"
      pageLinkClassName="page-link"
      breakLinkClassName="page-link"
      previousLinkClassName="page-link"
      nextClassName="page-item next-item"
      previousClassName="page-item prev-item"
      containerClassName={
        'pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1'
      }
    />
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Client Contracts</CardTitle>
      </CardHeader>
      <div className="react-dataTable" style={{ height: 'auto', maxHeight: "100%"}}>
        <DataTable
          noHeader
          pagination
          data={contracts}
          expandableRows
          columns={columns}
          expandOnRowClicked
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
          paginationComponent={CustomPagination}
          paginationDefaultPage={currentPage + 1}
          paginationRowsPerPageOptions={[10, 25, 50, 100]}
          expandableRowsComponent={ExpandableTable}
        />
      </div>
    </Card>
  );
};

export default DataTableWithButtons;
