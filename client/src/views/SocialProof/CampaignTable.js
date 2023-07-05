import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { ChevronDown, Edit, Eye, MoreVertical, Trash } from 'react-feather';
import { useHistory, Link } from 'react-router-dom';
import {
  Badge,
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  Modal,
  ModalBody,
  ModalFooter,
  Input
} from 'reactstrap';

import { getCampaignList, deleteCampaign } from '../../requests/userproof';
import ReactPaginate from 'react-paginate';
import Swal from 'sweetalert2';

export default function CampaignTable({ setTakeCampaign }) {
  // ** STATES
  const [CampaignData, setCampListData] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [getId, setGetId] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const history = useHistory();

  // const handleDeleteCampaign = (id) => {
  //   setDeleteModal(!deleteModal);
  //   setGetId(id);
  // };

  const handleDeleteCampaign = (id) => {
    Swal.fire({
      title: 'Delete?',
      text: 'Are you sure you want to delete this campaign?',
      // icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete anyway',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteCampaign(id).then(() => {
          fetchData();
        });
      }
    });
  };

  const deletedCampaign = async () => {
    await deleteCampaign(getId).then((response) => {
      fetchData();
    });
    setDeleteModal(!deleteModal);
  };

  const handleEditCampaign = (row) => {
    history.push(`/camgaign-edit/${row?._id}`);
  };
  const handleCampaignDetails = (row) => {
    history.push(`/camgaign-edit/${row?._id}`);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    getCampaignList().then((resp) => {
      setCampListData(resp?.data);
      setTakeCampaign(resp?.data);
    });
  };

  // ** FUNCTIONSrow
  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
  };

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const columns = [
    {
      name: 'CAMPAIGN NAME',
      sortable: true,
      cell: (row) => <span onClick={() => handleCampaignDetails(row)}>{row.campaign_name}</span>
    },
    {
      name: 'STATUS',
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => <span onClick={() => handleCampaignDetails(row)}>{row.status}</span>
    },

    {
      name: 'POSITION',
      selector: (row) => row.position,
      sortable: true,
      cell: (row) => <span onClick={() => handleCampaignDetails(row)}>{row.status}</span>
    },
    {
      name: 'ACTION',
      sortable: true,
      selector: (row) => row,
      cell: (row) => {
        return (
          <div className="d-flex cursor-pointer">
            <UncontrolledDropdown>
              <DropdownToggle className="pe-" tag="span">
                <MoreVertical size={15} />
              </DropdownToggle>
              <DropdownMenu end container='body'>
                <DropdownItem tag="h6" className="w-100" onClick={(e) => handleEditCampaign(row)}>
                  <span className="align-middle ms-50">Edit</span>
                </DropdownItem>
                <DropdownItem
                  tag="h6"
                  className="w-100"
                  onClick={(e) => handleDeleteCampaign(row._id)}
                >
                  <span className="align-middle ms-50">Delete</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        );
      }
    }
  ];

  const CustomPagination = () => {
    const count = Math.ceil(CampaignData.length / rowsPerPage);

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
    <div className="employee-list-table">
      <div className="content-body">
        {CampaignData && CampaignData?.length ? (
          <>
            <DataTable
              noHeader
              className="react-dataTable"
              responsive
              data={CampaignData}
              style={{ cursor: 'pointer' }}
              sortIcon={<ChevronDown size={14} />}
              columns={columns}
              // onRowClicked={handleDetails}
              pagination
              pointerOnHover="cursor"
              selectableRows
              paginationComponent={CustomPagination}
            />
            <Modal
              toggle={() => {
                setDeleteModal(!deleteModal);
              }}
              centered
              isOpen={deleteModal}
            >
              <ModalBody>
                <div>
                  <h3>Are you sure to Delete ?</h3>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  size="sm"
                  onClick={() => {
                    setDeleteModal(false);
                  }}
                >
                  No
                </Button>
                <Button size="sm" color="primary" onClick={deletedCampaign}>
                  {deleteModal === false ? 'Deleting' : 'Yes'}
                </Button>
              </ModalFooter>
            </Modal>
          </>
        ) : (
          <div className="no-results show mx-auto">
            <h5>No Items Found</h5>
          </div>
        )}
      </div>
    </div>
  );
}
