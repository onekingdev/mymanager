import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  UncontrolledDropdown
} from 'reactstrap';
import AddElementModal from './create/AddElementModal';
import { getDefaultElementsAction } from '../store/action';
import DataTable from 'react-data-table-component';
import { ChevronDown, Edit2, MoreVertical } from 'react-feather';
import EditElementModal from './EditElementModal';
import ReactPaginate from 'react-paginate';

export default function Elements({ dispatch, store }) {
  const [openAddElement, setOpenAddElement] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleOpenAddElement = () => setOpenAddElement(!openAddElement);
  const toggleOpenEditElement = () => setOpenEditModal(!openEditModal);
  const handleOpenEdit = (row) => {
    setSelectedRow(row);
    toggleOpenEditElement();
  };
  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
  };

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  useEffect(() => {
    dispatch(getDefaultElementsAction());
  }, []);
  const columns = [
    {
      name: 'Title',
      selector: (row) => row?.elementTitle,
      width: '14%',
      cell: (row) => <span style={{ cursor: 'pointer' }}>{row.elementTitle}</span>
    },
    {
      name: 'Resource',
      selector: (row) => row?.id,
      width: '14%',
      cell: (row) => <span style={{ cursor: 'pointer' }}>{row.id}</span>
    },
    {
      name: 'Navigation Link',
      selector: (row) => row?.navLink,
      width: '14%',
      cell: (row) => <span style={{ cursor: 'pointer' }}>{row.navLink}</span>
    },
    {
      name: 'Actions',
      selector: (row) => row?._id,
      width: '14%',
      cell: (row) => (
        <>
          <div className="column-action">
            <UncontrolledDropdown style={{ cursor: 'pointer' }}>
              <DropdownToggle tag="div" className="btn btn-sm">
                <MoreVertical size={14} className="cursor-pointer" />
              </DropdownToggle>
              <DropdownMenu container="body">
                <DropdownItem tag="span" onClick={() => handleOpenEdit(row)} className="w-100">
                  <Edit2 className="mx-50 text-primary" size={18} style={{ cursor: 'pointer' }} />
                  <span className="align-middle">Edit</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </>
      )
    }
  ];

  const CustomPagination = () => {
    const count = Math.ceil(store.elements.length / rowsPerPage);

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
  return (
    <>
      <Card>
        <div className="d-flex justify-content-between m-1">
          <p className="my-auto">Here you can edit or add default elements. </p>
          <Button color="primary" onClick={toggleOpenAddElement}>
            Add new element
          </Button>
        </div>
        <div className="react-dataTable" style={{ height: 'auto', maxHeight: "100%"}}>
          {store.elements && (
            <DataTable
              noHeader
              pagination
              responsive
              paginationComponent={CustomPagination}
              columns={columns}
              sortIcon={<ChevronDown />}
              className="react-dataTable"
              data={store.elements}
            />
          )}
        </div>
      </Card>
      {store && (
        <AddElementModal
          toggle={toggleOpenAddElement}
          open={openAddElement}
          store={store}
          dispatch={dispatch}
        />
      )}
      {selectedRow && (
        <EditElementModal
          toggle={toggleOpenEditElement}
          open={openEditModal}
          element={selectedRow}
          dispatch={dispatch}
        />
      )}
    </>
  );
}
