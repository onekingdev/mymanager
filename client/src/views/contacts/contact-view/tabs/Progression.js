// ** Reactstrap Imports
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Progress,
  UncontrolledButtonDropdown,
  UncontrolledDropdown,
  UncontrolledTooltip
} from 'reactstrap';
import moment from 'moment';

// ** Third Party Components
import {
  ChevronDown,
  Download,
  Edit,
  ExternalLink,
  Eye,
  File,
  FileText,
  MoreVertical,
  Printer,
  Send,
  Trash2
} from 'react-feather';
import DataTable from 'react-data-table-component';

// ** Custom Components
import Avatar from '@components/avatar';

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import {
  progressionHistoryAction,
  deleteSingleHistoryAction,
  progressionHistEditAction,
  promotClientAction,
  addRankHistoryAction
} from '../../../.././views/contacts/store/actions';
import {
  progressionFetchAction,
  progressionCategoriesRankFetchAction,
  progressionAddAction
} from '../../../../../src/views/settings/tabs/progressiontab/store/actions';
import { useDispatch, useSelector } from 'react-redux';
import Return from '../../../settings/tabs/advancesettings/tabs/api/stripe/Return';
import { parse } from 'path';
const CustomPagination = () => {
  // const count = Math.ceil(clientStore?.contacts?.total / rowsPerPage)
  return (
    <ReactPaginate
      previousLabel={''}
      nextLabel={''}
      pageCount={1}
      activeClassName="active"
      // forcePage={currentPage !== 0 ? currentPage - 1 : 0}
      // onPageChange={(page) => handlePagination(page)}
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

const Progression = ({ selectedUser }) => {
  const clientId = selectedUser?._id;
  const [openEdit, setOpenEdit] = useState('');
  const [ranDisable, setRanDisable] = useState(false);
  const [progressionId, setProgressionId] = useState('');
  const [categoryAddId, setCategoryAddId] = useState('');
  const dispatch = useDispatch();
  const progressionHistory = useSelector((state) => state?.totalContacts?.progressIonHistoryData);
  const projectsArr = progressionHistory ? progressionHistory : [];
  const [modal, setModal] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const progressionList = useSelector((state) => state.progression?.progressionList);
  const rankList = useSelector((state) => state.progression?.progressionCategoriesRank);
  const toggle = () => setModal(!modal);
  const toggleAdd = () => setModalAdd(!modalAdd);
  const [progressionName, setProgressionName] = useState('');
  const [currentCategories, setCurrentCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [rankName, setRankName] = useState('');
  const [rankId, setRankId] = useState('');
  const [changeProgressionNameSign, setChangeProgressionNameSign] = useState(false);
  const [clientIdMainPr, setClientIdMainPr] = useState({ clientIds: [clientId] });
  const [promoteClientParmsAdd, setPromoteClientParmsAdd] = useState({});
  const [filteredRankName, setFilteredRankName] = useState();
  const [filteredProgressionId, setFilteredProgressionId] = useState();
  const [filteredCategoryId, setFilteredCategoryId] = useState();
  const [currenCategoryListForFilterDropDown, setCurrenCategoryListForFilterDropDown] = useState(
    []
  );
  const [promoteClientParmsEdit, setPromoteClientParmsEdit] = useState({});

  const handleFilterByProgression = (e) => {
    e.preventDefault();
    // setFilteredProgressionName(JSON.parse(e.target.value)?.progressionName);
    setCurrenCategoryListForFilterDropDown(JSON.parse(e.target.value)?.categoryId);
    setFilteredProgressionId(JSON.parse(e.target.value)?._id);
    dispatch(
      progressionHistoryAction(clientId, { progressionId: JSON.parse(e.target.value)?._id })
    );
  };
  const handleFilterByCategory = (e) => {
    e.preventDefault();
    setRanDisable(true);
    setFilteredCategoryId(JSON.parse(e.target.value)?._id);
    dispatch(
      progressionHistoryAction(clientId, {
        progressionId: filteredProgressionId,
        categoryId: JSON.parse(e.target.value)?._id
      })
    );
    dispatch(progressionCategoriesRankFetchAction(JSON.parse(e.target.value)?._id));
  };
  const handleFilterByRank = (e) => {
    e.preventDefault();
    setFilteredRankName(JSON.parse(e.target.value)?.rankName);
    dispatch(
      progressionHistoryAction(clientId, {
        progressionId: filteredProgressionId,
        categoryId: filteredCategoryId,
        rankName: JSON.parse(e.target.value)?.rankName
      })
    );
  };

  useEffect(() => {
    setPromoteClientParmsAdd({
      progressionId: progressionId,
      categoryId: categoryAddId,
      rankID: rankId
    });
  }, [categoryAddId, progressionId, rankId]);
  useEffect(() => {
    setPromoteClientParmsEdit({
      progressionId: progressionId,
      categoryId: categoryAddId,
      rankName: rankName
    });
  }, [categoryAddId, progressionId, rankName]);
  let categoriesArray = [];
  for (let i = 0; i < progressionList?.length; i++) {
    for (let j = 0; j < progressionList[i]?.categoryId.length; j++) {
      categoriesArray.push({
        name: progressionList[i]?.progressionName,
        progressionId: progressionList[i]?._id,
        list: progressionList[i]?.categoryId[j],
        categoryId: progressionList[i]?.categoryId[j]?._id
      });
    }
  }
  const handleNewRank = (e) => {
    e.preventDefault();
    if (rankInputData?.rankOrder === 'select') {
      toast.error('Please select Rank Order');
    } else {
      const formData = new FormData();
      formData.append('categoryId', rankInputData.categoryId);
      formData.append('rankName', rankInputData.rankName);
      formData.append('Color', rankInputData.Color);
      formData.append('rankOrder', rankInputData.rankOrder);
      formData.append('file', rankInputData.file);
      isRankModalEditable
        ? dispatch(
            progressionCategoriesRankEditAction(
              formData,
              rankInputData?.categoryId,
              rankInputData?.id
            )
          )
        : dispatch(progressionCategoriesRankAddAction(formData, rankInputData?.categoryId));
      togglerankmodal();
    }
  };
  useEffect(() => {
    dispatch(progressionHistoryAction(clientId));
    dispatch(progressionFetchAction());
  }, []);
  const setProgChange = (e) => {
    setChangeProgressionNameSign(true);
    setProgressionId(JSON.parse(e.target.value)?._id);
    setCurrentCategories(JSON.parse(e.target.value)?.categoryId);
    setProgressionName(JSON.parse(e.target.value)?.progressionName);
  };
  const setCatChange = (e) => {
    let valueDetail = JSON.parse(e.target.value);
    setCategoryAddId(valueDetail?.id);
    dispatch(progressionCategoriesRankFetchAction(valueDetail.id));
    setChangeProgressionNameSign(true);
    setCategoryName(valueDetail?.categoryName);
  };

  const setRankChange = (e) => {
    setChangeProgressionNameSign(true);

    let rankValue = JSON.parse(e.target.value);
    setRankName(rankValue?.rankName);
    setRankId(rankValue?.id);
  };
  const columns = [
    {
      name: 'Progression Name',
      selector: (row) => row?.progressionName,
      cell: (row) => {
        return (
          <>
            <div className="d-flex justify-content-left align-items-center">
              <div className="d-flex flex-column">
                <span className="text-truncate ">{row?.progressionName}</span>
                <small className="text-muted fw-bolder">{row?.categoryName}</small>
              </div>
            </div>
          </>
        );
      }
    },
    {
      sortable: true,
      minWidth:
        '2                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            00px',
      name: 'Rank',
      selector: (row) => row?.currentRankOrder,
      cell: (row) => {
        return (
          <>
            <div className="d-flex justify-content-left align-items-center">
              <div className="avatar-wrapper">
                <Avatar
                  className="me-1"
                  img={row?.currentRankImage}
                  alt={row.title}
                  imgWidth="32"
                />
              </div>
              <div className="d-flex flex-column">
                <span className="text-truncate fw-bolder">{row?.currentRankName}</span>
                <small className="text-muted">{row?.currentRankOrder}</small>
                <div className="column-action"></div>
              </div>
            </div>
          </>
        );
      }
    },
    {
      sortable: true,
      minWidth: '200px',
      name: 'Next Rank',
      selector: (row) => row?.currentRankOrder,
      cell: (row) => {
        return (
          <>
            <div className="d-flex justify-content-left align-items-center">
              <div className="avatar-wrapper">
                <Avatar className="me-1" img={row?.nextRankImage} alt={row.title} imgWidth="32" />
              </div>
              <div className="d-flex flex-column">
                <span className="text-truncate fw-bolder">{row?.nextRankName}</span>
                <small className="text-muted">{row?.nextRankOrder}</small>
                <div className="column-action"></div>
              </div>
            </div>
          </>
        );
      }
    },
    {
      name: 'Last Promoted',
      selector: (row) => row?.date,
      cell: (row) => <span>{moment(row?.date).format('MM/DD/YYYY')}</span>
    },
    {
      name: 'Action',
      minWidth: '110px',
      cell: (row) => {
        const payload = {
          progressionName: progressionName,
          categoryName: categoryName,
          currentRankName: rankName
        };
        return (
          <>
            <div className="column-action d-flex align-items-center">
              {
                <div className="column-action">
                  <UncontrolledDropdown>
                    <DropdownToggle tag="div" className="btn btn-sm">
                      <MoreVertical size={14} className="cursor-pointer" />
                    </DropdownToggle>
                    <DropdownMenu container="body">
                      <DropdownItem
                        tag="a"
                        href="/"
                        className="w-100"
                        onClick={(e) => {
                          e.preventDefault();
                          setOpenEdit(row._id);
                          setModal(true);
                        }}
                      >
                        <Edit size={14} className="me-50" />
                        <span className="align-middle">Update</span>
                        {/* {row._id == openEdit  && openEditModal == true ? setModal(true)  : null} */}
                      </DropdownItem>

                      <DropdownItem
                        tag="a"
                        href="/"
                        className="w-100"
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(deleteSingleHistoryAction(row._id, clientId))
                            .then(() => {
                              dispatch(dispatch(progressionHistoryAction(clientId)));
                            })
                            .catch((err) => {});
                        }}
                      >
                        <Trash2 size={14} className="me-50" />
                        <span className="align-middle">Delete</span>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
              }
            </div>
            <Modal
              isOpen={modal}
              toggle={toggle}
              size="sm"
              centered={true}
              fade={true}
              backdrop={true}
            >
              <ModalHeader toggle={toggle}>Edit Rank</ModalHeader>
              <ModalBody>
                <Form>
                  <FormGroup>
                    <Label for="exampleEmail">Progression Name</Label>
                    <Input
                      id="paogrssion"
                      name="paogrssion"
                      placeholder="Enter Progression Name"
                      //  value = {row?.progressionName}
                      // value={progressionName}
                      type="select"
                      //  (e) => setProgressionName(e.target.value)
                      onChange={setProgChange}
                    >
                      <option value="" className="fs-4">
                        Select Progression
                      </option>
                      {progressionList?.map((item, i) => {
                        return (
                          <option
                            className="fs-4"
                            id={item?._id}
                            value={JSON.stringify(item)}
                            key={i}
                          >
                            {item?.progressionName}
                          </option>
                        );
                      })}
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleEmail">Category Name</Label>
                    <Input
                      id=""
                      // name="category"
                      placeholder="Enter Category Name"
                      type="select"
                      // value={categoryName}
                      onChange={setCatChange}
                    >
                      <option value="" className="fs-4">
                        Select Category
                      </option>
                      {currentCategories.map((item, i) => {
                        return (
                          <option
                            className="fs-4"
                            key={i}
                            id={item?._id}
                            value={JSON.stringify({
                              categoryName: item?.categoryName,
                              id: item?._id
                            })}
                            data={item._id}
                          >
                            {item?.categoryName}
                          </option>
                        );
                      })}
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleEmail">Rank Name</Label>
                    <Input
                      id="rankNameOne"
                      name="rankName"
                      placeholder="with a placeholder"
                      type="select"
                      // value={rankName}
                      onChange={setRankChange}
                    >
                      <option value="" className="fs-4">
                        Select Rank
                      </option>
                      {rankList.map((item) => {
                        return (
                          <option
                            value={JSON.stringify({ id: item?._id, rankName: item?.rankName })}
                            className="fs-4"
                          >
                            {item.rankName}
                          </option>
                        );
                      })}
                    </Input>
                  </FormGroup>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={(e) => setModal(false)}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onClick={(e) => {
                    dispatch(progressionHistEditAction(row?._id, promoteClientParmsEdit, clientId))
                      .then(() => dispatch(progressionHistoryAction(clientId)))
                      .then(() => setModal(false))
                      .catch((err) => {});
                  }}
                >
                  Edit
                </Button>
              </ModalFooter>
            </Modal>
          </>
        );
      }
    }
  ];
  return (
    <Card>
      <CardHeader className="py-1 d-flex justify-content-between ">
        <CardTitle tag="h4">Progression History</CardTitle>
        <div className="d-flex">
          <Input
            id="progrssion"
            name="progrssion"
            type="select"
            style={{ width: '180px' }}
            onChange={handleFilterByProgression}
          >
            {!filteredProgressionId ? <option>Select Progression</option> : ''}
            {progressionList.map((item, i) => {
              return (
                <option id={item?._id} value={JSON.stringify(item)} key={i}>
                  {item?.progressionName}
                </option>
              );
            })}
          </Input>
          <Input
            id="category"
            name="category"
            type="select"
            disabled={!currenCategoryListForFilterDropDown.length > 0}
            className="mx-2"
            style={{ width: '180px' }}
            onChange={handleFilterByCategory}
          >
            {!filteredCategoryId ? <option>Select Category</option> : ''}
            {currenCategoryListForFilterDropDown.map((item, i) => {
              return (
                <option key={i} id={item?._id} value={JSON.stringify(item)}>
                  {item?.categoryName}
                </option>
              );
            })}
          </Input>
          <Input
            id="rankNameOne"
            name="rankName"
            type="select"
            style={{ width: '180px' }}
            disabled={!ranDisable}
            onChange={handleFilterByRank}
          >
            {!ranDisable ? <option>Select Rank</option> : ''}
            {rankList.map((item, i) => {
              return (
                <option key={i} value={JSON.stringify(item)}>
                  {item.rankName}
                </option>
              );
            })}
          </Input>
          <Button color="primary" className="ms-2" onClick={() => setModalAdd(true)}>
            Add
          </Button>
        </div>

        <Modal
          isOpen={modalAdd}
          toggle={toggleAdd}
          size="md"
          centered={true}
          fade={true}
          backdrop={true}
        >
          <ModalHeader toggle={toggleAdd}>Add Progression</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="exampleEmail">Progression Name</Label>
                <Input
                  id="paogrssion"
                  name="paogrssion"
                  placeholder="Enter Progression Name"
                  //  value = {row?.progressionName}
                  // value={progressionName}
                  type="select"
                  //  (e) => setProgressionName(e.target.value)
                  onChange={setProgChange}
                >
                  <option value="" className="fs-4">
                    Select Progression
                  </option>
                  {progressionList?.map((item, i) => {
                    return (
                      <option className="fs-4" id={item?._id} value={JSON.stringify(item)} key={i}>
                        {item?.progressionName}
                      </option>
                    );
                  })}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Category Name</Label>
                <Input
                  id=""
                  // name="category"
                  placeholder="Enter Category Name"
                  type="select"
                  // value={categoryName}
                  onChange={setCatChange}
                >
                  <option value="" className="fs-4">
                    Select Category
                  </option>
                  {currentCategories.map((item, i) => {
                    return (
                      <option
                        className="fs-4"
                        key={i}
                        id={item?._id}
                        value={JSON.stringify({
                          categoryName: item?.categoryName,
                          id: item?._id
                        })}
                        data={item._id}
                      >
                        {item?.categoryName}
                      </option>
                    );
                  })}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Rank Name</Label>
                <Input
                  id="rankNameOne"
                  name="rankName"
                  placeholder="with a placeholder"
                  type="select"
                  // value={rankName}
                  onChange={setRankChange}
                >
                  <option value="" className="fs-4">
                    Select Rank
                  </option>
                  {rankList.map((item) => {
                    return (
                      <option
                        value={JSON.stringify({ id: item?._id, rankName: item?.rankName })}
                        className="fs-4"
                      >
                        {item.rankName}
                      </option>
                    );
                  })}
                </Input>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={(e) => setModalAdd(false)}>
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={(e) => {
                dispatch(addRankHistoryAction(clientId, promoteClientParmsAdd))
                  .then(() => dispatch(progressionHistoryAction(clientId)))
                  .then(() => setModalAdd(false))
                  .catch((err) => {});
              }}
            >
              Add
            </Button>
          </ModalFooter>
        </Modal>
      </CardHeader>
      <div className="react-dataTable user-view-account-projects">
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={projectsArr}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
          pagination
          paginationServer
          paginationComponent={CustomPagination}
        />
      </div>
    </Card>
  );
};

export default Progression;
