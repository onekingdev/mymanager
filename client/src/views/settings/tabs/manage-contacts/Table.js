import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Input, UncontrolledTooltip } from 'reactstrap';
import { Edit2, Trash } from 'react-feather';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';
import ReactPaginate from 'react-paginate';
import AddContactColumnModal from './AddContactColumnModal';
import { deleteContactFieldAction } from '../../../contacts/store/actions';
const Table = ({ contactType }) => {
  const dispatch = useDispatch();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isNew, setIsNew] = useState(false);
  const [addColumnModal, setAddColumnModal] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [tableData, setTableData] = useState([]);

  // ** Redux Store
  const activeTypeFields = useSelector((state) => state.totalContacts.contactField.data);

  // ** Effect
  useEffect(() => {
    if (activeTypeFields?.length > 0) {
      setTableData(
        activeTypeFields.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
      );
    } else {
      setTableData([]);
    }
  }, [activeTypeFields, currentPage, rowsPerPage]);
  const handleEditClick = (e, row) => {
    setIsNew(false);
    setSelectedColumn(row);
    setAddColumnModal(true);
  };
  const handleTrashClick = async (e, id) => {
    const result = await Swal.fire({
      title: 'Delete?',
      text: 'Are you sure you want to delete this coljumn?',
      // icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Confirm',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    });

    if (result.isConfirmed) {
      dispatch(deleteContactFieldAction({ contactType, fieldId: id }));
    }
  };
  const toggleAddContactColumnModal = () => {
    setAddColumnModal(!addColumnModal);
  };
  // ** Function in get data on rows per page
  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
  };
  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };
  // ** Table
  const tableColumns = [
    {
      name: 'Field Name',
      sortable: true,
      minWidth: '220px',
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          <div className="d-flex flex-column">
            <Link className="user_name text-truncate text-body">
              <span className="fw-bolder">{row?.title}</span>
            </Link>
          </div>
        </div>
      )
    },
    {
      name: 'Actions',
      cell: (row) => (
        <>
          <Button
            color="primary"
            id="edit"
            className="cursor-pointer me-50 d-flex align-items-center"
            lg
            onClick={(e) => handleEditClick(e, row)}
          >
            <Edit2 size={18} />
            <span className="ms-1">Edit</span>
          </Button>
          <UncontrolledTooltip placement="left" target="edit">
            Edit Field
          </UncontrolledTooltip>
          <Button
            color="danger"
            id="delete"
            className="cursor-pointer me-50 d-flex align-items-center"
            lg
            onClick={(e) => handleTrashClick(e, row._id)}
          >
            <Trash size={18} />
            <span className="ms-1">Delete</span>
          </Button>
          <UncontrolledTooltip placement="left" target="delete">
            Delete Field
          </UncontrolledTooltip>
        </>
      )
    }
  ];

  const CustomPagination = () => {
    const count = Math.ceil(activeTypeFields?.length / rowsPerPage);
    return (
      <div className="d-flex justify-content-end">
        <div className="d-flex align-items-center justify-content-end">
          {/* <label htmlFor="rows-per-page">Show</label> */}
          <Input
            className="mx-50"
            type="select"
            id="rows-per-page"
            value={rowsPerPage}
            onChange={handlePerPage}
            style={{ width: '5rem' }}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </Input>
          <label htmlFor="rows-per-page" style={{ marginRight: '1rem' }}>
            Per Page
          </label>
        </div>
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
      </div>
    );
  };
  const filteredTableData = tableData.filter(
    (item) => item.title && item.title.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="react-dataTable react-dataTable-selectable-rows px-1">
      <div className="d-flex justify-content-end p-2">
        <Input
          id="search-invoice"
          placeholder="Search Fields"
          type="text"
          className="w-100 me-50"
          style={{ maxWidth: '200px' }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          color="primary"
          className=""
          onClick={() => {
            setAddColumnModal(true);
            setIsNew(true);
          }}
        >
          Add New Column
        </Button>
      </div>
      <DataTable
        noHeader
        pagination
        responsive
        paginationComponent={CustomPagination}
        paginationServer
        columns={tableColumns}
        data={filteredTableData}
      />
      <AddContactColumnModal
        isNew={isNew}
        toggle={toggleAddContactColumnModal}
        open={addColumnModal}
        contactType={contactType}
        selectedColumn={selectedColumn}
        activeTypeFields={activeTypeFields}
      />
    </div>
  );
};

export default Table;
