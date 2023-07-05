import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  InputGroup,
  InputGroupText,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  ModalFooter
} from 'reactstrap';
import { ChevronDown, MoreVertical, ArrowRight } from 'react-feather';
import Select from 'react-select';
import DataTable from 'react-data-table-component';
import {
  createMyGoal,
  getMyGoalsCategory,
  getMyGoalList,
  deleteGoal,
  viewOnegoal,
  editGoalData
} from '../../../requests/userproof';
import '../../../assets/styles/SocialProof.scss';
import { Link } from 'react-router-dom';
const GoalCategory = [
  { value: 'Lead', label: 'Lead' },
  { value: 'Purchase', label: 'Purchase' },
  { value: 'Schedule', label: 'Schedule' },
  { value: 'Subscribe', label: 'Subscribe' },
  { value: ' Start Trial', label: ' Start Trial' },
  { value: ' View Content', label: ' View Content' },
  { value: 'Complete Registration', label: ' Complete Registration' }
];

const SetGoal = ({ stepper }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goal_name, setGoalName] = useState('');
  const [value, setConversionValue] = useState();
  const [url, setUrl] = useState('');
  const [category_goal, setCategoryGoal] = useState();
  const [goalData, setGoalData] = useState([]);
  const [dropDownSelect, setDropDownSelect] = useState([]);
  const [Reload, setReload] = useState([]);
  const [deleteGoalModal, setDeleteGoalModal] = useState(false);
  const [goalId, setGoalId] = useState();
  const [editModal, setEditModal] = useState(true);
  const [editId, setEditId] = useState();

  const handleDeleteGoal = (id) => {
    setDeleteGoalModal(!deleteGoalModal);
    setGoalId(id);
  };

  const DeleteGoal = async () => {
    await deleteGoal(goalId).then((response) => {
      GetAllData();
      setDeleteGoalModal(!deleteGoalModal);
    });
  };

  const handleEditGoal = async (id) => {
    setEditId(id);
    await viewOnegoal(id).then((response) => {
      setCategoryGoal(response.category_goal),
        setGoalName(response.goal_name),
        setConversionValue(response.value),
        setUrl(response.url);
      setEditModal(!editModal);
    });
  };

  const UpdateGoals = async (e) => {
    let payload = {
      category_goal,
      goal_name,
      value,
      url
    };
    e.preventDefault();
    await editGoalData(payload, editId).then((response) => {
      console.log(response);
      GetAllData();
      setEditModal(!editModal);
    });
  };
  const columns = [
    {
      name: 'GOALS',
      selector: (row) => row.goal_name,
      sortable: true,
      cell: (row) => {
        return (
          <Link to={`/submit/${row?._id}`} style={{ color: '#000' }}>{`${row?.goal_name}`}</Link>
        );
      }
    },

    {
      name: 'CONVERTIONS',
      selector: (row) => row.category_goal,
      sortable: true
    },
    {
      name: 'VALUE',
      selector: (row) => row.value,
      sortable: true
    },
    {
      name: 'URL',
      selector: (row) => row.url,
      sortable: true
    },
    {
      name: 'ACTIONS',
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
                <DropdownItem tag="h6" className="w-100" onClick={() => handleEditGoal(row._id)}>
                  <span className="align-middle ms-50">Edit</span>
                </DropdownItem>
                <DropdownItem tag="h6" className="w-100" onClick={() => handleDeleteGoal(row._id)}>
                  <span className="align-middle ms-50">Delete</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        );
      }
    }
  ];
  const handleSubmit = (e) => {
    console.log('value', value);
    e.preventDefault();
    let formData = {
      category_goal,
      goal_name,
      value,
      url
    };
    createMyGoal(formData).then((response) => {
      setReload(response);
      setIsModalOpen(!isModalOpen);
      setCategoryGoal('');
      setGoalName('');
      setConversionValue('');
      setUrl('');
    });
  };

  let newArray = [];
  for (let key in dropDownSelect) {
    if (dropDownSelect.hasOwnProperty(key)) {
      newArray.push({
        value: dropDownSelect[key]._id,
        label: dropDownSelect[key].name
      });
    }
  }

  const GetAllData = () => {
    getMyGoalList().then((resp) => {
      setGoalData(resp?.data);
      setCategoryGoal('');
      setGoalName('');
      setConversionValue('');
      setUrl('');
    });
  };

  useEffect(() => {
    GetAllData();
  }, [Reload]);

  useEffect(() => {
    async function fetchData() {
      await getMyGoalsCategory().then((response) => {
        setDropDownSelect(response.data);
      });
    }
    fetchData();
  }, []);
  const defaultValue = { value: category_goal, label: category_goal };

  return (
    <>
      <div className="btnposition">
        <Button
          color="primary"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          <Modal isOpen={isModalOpen} toggle={() => setIsModalOpen(!isModalOpen)} centered>
            <ModalHeader toggle={() => setIsModalOpen(!isModalOpen)}>Create your goal</ModalHeader>
            <ModalBody>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col lg="12" md="12" sm="12">
                    <FormGroup className="mb-1">
                      <Label for="Category">Goal Category*</Label>
                      <Select
                        required
                        options={GoalCategory}
                        className="react-select"
                        isClearable={false}
                        value={category_goal}
                        onChange={(e) => {
                          setCategoryGoal(e.value);
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="12" md="12" sm="12">
                    <FormGroup className="mb-1">
                      <Label for="goal_name">Name your Goal*</Label>
                      <Input
                        type="text"
                        required
                        placeholder="Ex:signed up for basic plan"
                        onChange={(e) => {
                          setGoalName(e.target.value);
                        }}
                        value={goal_name}
                        id="goal_name"
                        name="goal_name"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="12" md="12" sm="12" className="mb-2">
                    <Label for="firstName">Set conversion value</Label>
                    <InputGroup>
                      <InputGroupText>$</InputGroupText>
                      <Input
                        required
                        className="form-control"
                        mask="$9999"
                        placeholder="100"
                        value={value}
                        onChange={(e) => {
                          setConversionValue(e.target.value);
                        }}
                      />
                    </InputGroup>
                  </Col>

                  <Col md="12" sm="12" className="">
                    <FormGroup>
                      <Label for="url">Set goal completion URL*</Label>
                      <Input
                        type="text"
                        required
                        placeholder="URL"
                        onChange={(e) => {
                          setUrl(e.target.value);
                        }}
                        value={url}
                        id="url"
                        name="url"
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <div className="add-task">
                      <Button block className="btn-block my-1 text-right" color="primary">
                        Create Goal
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </ModalBody>
          </Modal>
          Create Goal
        </Button>
      </div>

      <DataTable
        noHeader
        sortServer
        pagination
        responsive
        columns={columns}
        sortIcon={<ChevronDown />}
        className="react-dataTable "
        paginationPerPage={10}
        data={goalData}
        // onSelectedRowsChange={handleRowSelected}
        selectableRows
      />
      <Modal
        toggle={() => {
          setDeleteGoalModal(!deleteGoalModal);
        }}
        centered
        isOpen={deleteGoalModal}
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
              setDeleteGoalModal(false);
            }}
          >
            No
          </Button>
          <Button size="sm" color="primary" onClick={DeleteGoal}>
            {deleteGoalModal === false ? 'Deleting' : 'Yes'}
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={!editModal} toggle={() => setEditModal(!editModal)} centered>
        <ModalHeader toggle={() => setEditModal(!editModal)}>Edit your goal</ModalHeader>
        <ModalBody>
          <Form onSubmit={UpdateGoals}>
            <Row>
              <Col lg="12" md="12" sm="12">
                <FormGroup className="mb-1">
                  <Label for="Category">Goal Category*</Label>
                  <Select
                    required
                    className="react-select"
                    options={GoalCategory}
                    defaultValue={defaultValue}
                    onChange={(e) => {
                      console.log(e.value);
                      setCategoryGoal(e.value);
                    }}
                  />
                </FormGroup>
              </Col>

              <Col lg="12" md="12" sm="12">
                <FormGroup className="mb-1">
                  <Label for="goal_name">Name your Goal*</Label>
                  <Input
                    type="text"
                    required
                    placeholder="Ex:signed up for basic plan"
                    onChange={(e) => {
                      setGoalName(e.target.value);
                    }}
                    value={goal_name}
                    id="goal_name"
                    name="goal_name"
                  />
                </FormGroup>
              </Col>
              <Col lg="12" md="12" sm="12" className="mb-2">
                <Label for="firstName">Set conversion value</Label>
                <InputGroup>
                  <InputGroupText>$</InputGroupText>
                  <Input
                    required
                    className="form-control"
                    mask="$9999"
                    placeholder="100"
                    value={value}
                    onChange={(e) => {
                      setConversionValue(e.target.value);
                    }}
                  />
                </InputGroup>
              </Col>

              <Col md="12" sm="12" className="">
                <FormGroup>
                  <Label for="url">Set goal completion URL*</Label>
                  <Input
                    type="text"
                    required
                    placeholder="URL"
                    onChange={(e) => {
                      setUrl(e.target.value);
                    }}
                    value={url}
                    id="url"
                    name="url"
                  />
                </FormGroup>
              </Col>
              <Col>
                <div className="add-task">
                  <Button block className="btn-block my-1 text-right" color="primary">
                    Edit Goal
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
      <Row>
        <Col md="12">
          <div className="float-end">
            <Button color="primary" className="btn-next" onClick={() => stepper.next()}>
              <span className="align-middle d-sm-inline-block d-none">Next</span>
              <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
};
export default SetGoal;
