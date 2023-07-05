import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Input,
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap';
import { ArrowLeft, ArrowRight, ChevronDown, MoreVertical } from 'react-feather';
import { AiOutlineDelete } from 'react-icons/ai';
import DataTable from 'react-data-table-component';
import 'react-tagsinput/react-tagsinput.css';
import '../../../assets/styles/SocialProof.scss';
import { addDisplayUrl, getDisplayUrlList, deleteDisplay } from '../../../requests/userproof';

const CaptureData = ({ stepper }) => {
  const [modal, setModal] = useState(false);
  const [getData, setGetData] = useState([]);
  const [url, setUrl] = useState([]);
  const [displayUrl, setDisplayUrl] = useState();
  const [leads, setLeads] = useState([]);
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    let payload = {
      displayUrl
    };
    addDisplayUrl(payload).then((response) => {
      setLeads(response.data.data);
      setDisplayUrl('');
      setModal(!modal);
    });
  };

  const handleDeleteDisplay = async (id) => {
    await deleteDisplay(id).then((response) => {
      console.log('deleteDis', response);
      DisplayURl();
    });
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const DisplayURl = () => {
    getDisplayUrlList().then((resp) => {
      setUrl(resp?.data);
    });
  };
  useEffect(() => {
    DisplayURl();
  }, [leads]);
  const handleRowSelected = async ({ selectedRows }) => {
    console.log('first', selectedRows[0]?._id);

    await deleteDisplay(selectedRows._id).then((response) => {
      DisplayURl();
    });
    // if (selectedRows.length > 0) {
    //   setShowDeleteBtn(true);
    // } else {
    //   setShowDeleteBtn(false);
    // }
  };
  const columns = [
    {
      name: 'URL',
      selector: (row) => row.displayUrl,
      sortable: true
      // cell: (row) => {
      //   return (
      //     <Link to={`/submit/${row?._id}`} className="hovertext">{`${row?.campaign_name}`}</Link>
      //   );
      // }
    },
    {
      name: 'Verification',
      selector: (row) => row.verification,
      sortable: true
    },
    {
      name: 'SYNC',
      selector: (row) => row.sync,
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
                <DropdownItem
                  tag="h6"
                  className="w-100"
                  // onClick={(e) => handleEditDisplay(row)}
                >
                  <span className="align-middle ms-50">Edit</span>
                </DropdownItem>
                <DropdownItem
                  tag="h6"
                  className="w-100"
                  onClick={(e) => handleDeleteDisplay(row._id)}
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
      <div className="AddUrlBtn">
        <Button
          className="btn-icon me-1"
          outline
          color="primary"
          // onClick={() => toggle ((p) => !p)}
        >
          <AiOutlineDelete size={16} />
        </Button>

        <Button color="primary" onClick={toggleModal} className="btn-block">
          <Modal isOpen={modal} toggle={() => setModal(!modal)} centered>
            <ModalHeader toggle={() => setModal(!modal)} className="">
              Auto Lead Capture
            </ModalHeader>
            <ModalBody>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md="12">
                    <Input
                      value={displayUrl}
                      onChange={(e) => setDisplayUrl(e.target.value)}
                      name="url"
                      placeHolder="Enter Display Url"
                    />
                  </Col>
                  <Col>
                    <div className="add-task">
                      <Button block className="btn-block my-1" color="primary">
                        Add Url
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </ModalBody>
          </Modal>
          Auto Lead Capture
        </Button>
      </div>
      <DataTable
        className="react-dataTable"
        pagination
        selectableRows
        paginationPerPage={7}
        sortIcon={<ChevronDown size={10} />}
        data={url}
        columns={columns}
        noHeader
        onSelectedRowsChange={handleRowSelected}
      />
      <Row>
        <div className="d-flex justify-content-between mt-3 ">
          <Button color="primary" className="btn-prev" outline onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">Previous</span>
          </Button>
          <Button color="primary" className="btn-next" onClick={() => stepper.next()}>
            <span className="align-middle d-sm-inline-block d-none">Next</span>
            <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
          </Button>
        </div>
      </Row>
    </>
  );
};
export default CaptureData;
