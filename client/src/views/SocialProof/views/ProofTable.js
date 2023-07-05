import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { ChevronDown, MoreVertical } from 'react-feather';
import { getCampaignList, deleteCampaign } from '../../../requests/userproof';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  Modal,
  ModalBody,
  ModalFooter,
  Button
} from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import '../../../assets/styles/SocialProof.scss';
function ProofTable() {
  const [CampaignData, setCampListData] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [getId, setGetId] = useState();
  const history = useHistory();

  const handleDeleteCampaign = (id) => {
    setDeleteModal(!deleteModal);
    setGetId(id);
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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    getCampaignList().then((resp) => {
      setCampListData(resp?.data);
    });
  };

  const columns = [
    {
      name: 'CAMPAIGN NAME',
      sortable: true,
      cell: (row) => {
        return (
          <Link
            to={`/submit/${row?._id}`}
            style={{ color: '#000' }}
          >{`${row?.campaign_name}`}</Link>
        );
      }
    },
    {
      name: 'STATUS',
      selector: (row) => row.status,
      sortable: true
    },

    {
      name: 'POSITION',
      selector: (row) => row.position,
      sortable: true
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
              <DropdownMenu end>
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

  return (
    <>
      <DataTable
        noHeader
        subHeader
        sortServer
        pagination
        responsive
        columns={columns}
        sortIcon={<ChevronDown size={14} />}
        className="react-dataTable"
        paginationPerPage={10}
        data={CampaignData}
        selectableRows
        style={{ cursor: 'pointer' }}
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
  );
}
export default ProofTable;
