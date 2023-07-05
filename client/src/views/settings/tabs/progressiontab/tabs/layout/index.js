// ** React Imports
import { Fragment, useEffect, useState } from 'react';
// ** Custom Components
// ** User List Component
import DataTable from 'react-data-table-component';
import { MoreVertical, Edit, Eye, Trash, Lock } from 'react-feather';
import AvatarGroup from '../../../../../../@core/components/avatar-group';
import { toast } from 'react-toastify';
import PerfectScrollbar from 'react-perfect-scrollbar';
// ** Reactstrap Imports
import {
  Button,
  Modal,
  ModalHeader,
  Row,
  Col,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form
} from 'reactstrap';
import '@styles/react/apps/app-kanban.scss';
//redux imports
import { useDispatch } from 'react-redux';
import {
  progressionCategoriesAddAction,
  progressionCategoriesRankFetchAction,
  progressionCategoriesRankAddAction,
  progressionCategoriesDeleteAction,
  progressionCategoriesEditAction,
  progressionCategoriesRankResetAction,
  progressionCategoriesRankDeleteAction,
  progressionCategoriesRankEditAction
} from '../../store/actions';
import Swal from 'sweetalert2';
import { getUserData } from '../../../../../../auth/utils';

const Layout = (props) => {
  const dispatch = useDispatch();

  const user = getUserData()
  // raw data
  const { progressionId, categories, tabelData, activecard, setActivecard } = props;
  const columns = [
    {
      name: 'Rank Color',
      selector: (row) => row.Color,
      cell: (row) => <div className="m-1 p-1 rounded" style={{ backgroundColor: row.Color }}></div>
    },
    {
      name: 'Rank Name',
      selector: (row) => row.rankName
    },
    {
      name: 'Rank Order',
      selector: (row) => row.rankOrder,
      sortable: true
    },
    {
      name: 'Rank Image',
      selector: (row) => row.rankImage,
      cell: (row) => <img height="40" width="40" src={row.rankImage} />
    },
    {
      name: 'Manage',
      cell: (row) => (
        <>
        {user.id===row.userId ? (<div className="column-action">
          <Edit
            size={16}
            className=" cursor-pointer me-50"
            onClick={() => {
              setIsRankModalEditable(true);
              setRankInputData({
                id: row._id,
                categoryId: row?.categoryId,
                rankName: row?.rankName,
                rankOrder: row?.rankOrder,
                Color: row?.Color
              });
              togglerankmodal();
            }}
          />
          <Trash
            size={16}
            onClick={() =>
              Swal.fire({
                title: 'Delete?',
                text: 'Are you sure you want to delete this progression data?',
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
              }).then((result) => {
                if (result.isConfirmed) {
                  dispatch(progressionCategoriesRankDeleteAction(row._id, row?.categoryId));
                }
              })
            }
            className="cursor-pointer"
          ></Trash>

       
        </div>):(<Lock className="text-muted" size={14}/>) }
        </>
      )
    }
  ];

  let uniqueRankOrder = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
    27, 28, 29, 30
  ];

  for (let i = 0; i < tabelData?.length; i++) {
    const element = uniqueRankOrder.indexOf(tabelData[i]?.rankOrder);
    if (element != -1) {
      uniqueRankOrder.splice(element, 1);
    }
  }

  // const rankorders = [
  //   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
  //   27, 28, 29, 30
  // ];

  //for category add modal
  const avatarGroupArr = [
    {
      imgWidth: 25,
      imgHeight: 25,
      title: 'Billy Hopkins',
      placement: 'bottom',
      img: require('@src/assets/images/portrait/small/avatar-s-9.jpg').default
    }
  ];
  const handleOpenModal = (item) => {
    toggleitemmodal();
    setIsModalEditable(true);
    setFlexibleModalData({ id: item?._id, categoryName: item?.categoryName });
  };
  const [itemmodal, setItemmodal] = useState(false);
  const toggleitemmodal = () => setItemmodal(!itemmodal);
  const [isRankModalEditable, setIsRankModalEditable] = useState(false);
  //for rank add modal
  const [rankmodal, setRankmodal] = useState(false);
  const [flexibleModalData, setFlexibleModalData] = useState();
  const togglerankmodal = () => {
    setRankmodal(!rankmodal);
  };
  // hooks regarding category add form

  const handleCategoryInput = (e) => {
    e.preventDefault();
    dispatch(progressionCategoriesRankResetAction());
    setActivecard('');
    if (flexibleModalData?.categoryName === undefined || flexibleModalData?.categoryName === '') {
      toast.error('Please Enter Category Name');
    } else {
      isModalEditable
        ? dispatch(progressionCategoriesEditAction(flexibleModalData))
        : dispatch(progressionCategoriesAddAction(flexibleModalData));
      toggleitemmodal();
    }
  };
  //regarding add rank form
  const [rankInputData, setRankInputData] = useState({
    rankName: '',
    categoryName: '',
    Color: '#000000'
  });
  const handleRankInput = (e) => {
    if (e.target.name != 'rankImage') {
      setRankInputData({ ...rankInputData, [e.target.name]: e.target.value }, []);
    }
    if (e.target.name === 'rankImage') {
      setRankInputData({ ...rankInputData, file: e.target.files[0] });
    }
  };
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
  // for selecting category card
  const handleCategoryClick = (i, item) => {
    setActivecard(i);
    setRankInputData({ categoryId: item?._id, Color: '#000000', rankOrder: 'select' });
    dispatch(progressionCategoriesRankFetchAction(item?._id));
    dispatch(progressionCategoriesRankResetAction());
  };
 

  const handleDeleteRequest = (id) => {
    Swal.fire({
      title: 'Delete?',
      text: 'Are you sure you want to delete this progression?',
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
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(progressionCategoriesDeleteAction(id));
        dispatch(progressionCategoriesRankResetAction());
      }
    });
  };

  const [isModalEditable, setIsModalEditable] = useState(false);

  return (
    <div className="m-1">
      <div className="">
        <Modal centered={true} isOpen={itemmodal} toggle={toggleitemmodal} size="md">
          <Form onSubmit={handleCategoryInput} encType="multipart/form-data">
            <ModalHeader toggle={toggleitemmodal}>
              {isModalEditable ? 'Edit Category' : 'Add Category'}
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="categoryName">
                  {isModalEditable ? 'Category Name' : 'Enter Category Name'}
                </Label>
                <Input
                  type="text"
                  name="categoryName"
                  id="categoryName"
                  placeholder=""
                  value={flexibleModalData?.categoryName}
                  onChange={(e) => {
                    setFlexibleModalData({
                      ...flexibleModalData,
                      categoryName: e.target.value
                      // id: progressionId,
                      // [e.target.name]: e.target.value
                    });
                  }}
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="btn btn-outline-danger" onClick={toggleitemmodal}>
                Cancel
              </Button>{' '}
              <Button type="submit" color="btn btn-primary">
                {isModalEditable ? 'Edit' : 'Add'}
              </Button>
            </ModalFooter>
          </Form>
        </Modal>

        <Modal centered={true} isOpen={rankmodal} toggle={togglerankmodal} size="sm">
          <ModalHeader toggle={togglerankmodal}>
            {isRankModalEditable ? 'Edit Rank' : 'Add Rank'}{' '}
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={handleNewRank}>
              <FormGroup>
                <Label for="rankName">Rank Name</Label>
                <Input
                  type="text"
                  name="rankName"
                  id="categoryName"
                  placeholder=""
                  value={rankInputData?.rankName}
                  onChange={handleRankInput}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="order">Rank Order</Label>
                <Input
                  type="select"
                  defalutValue={1}
                  required
                  name="rankOrder"
                  id="order"
                  value={rankInputData?.rankOrder}
                  onChange={handleRankInput}
                >
                  <option value="select">Select</option>
                  {isRankModalEditable ? (
                    <option value={rankInputData?.rankOrder}>
                      {rankInputData?.rankOrder + ' current rank'}
                    </option>
                  ) : (
                    ''
                  )}
                  {uniqueRankOrder?.map((item) => (
                    <option value={item}>{item}</option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label>Color</Label>
                <Input
                  name="Color"
                  type="color"
                  value={rankInputData.Color}
                  onChange={handleRankInput}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label for="exampleFile">
                  {isRankModalEditable ? 'Change Image' : 'Upload Image'}
                </Label>
                <Input id="exampleFile" name="rankImage" onChange={handleRankInput} type="file" />
              </FormGroup>
              <Button color="btn btn-outline-danger" onClick={togglerankmodal}>
                Cancel
              </Button>{' '}
              <Button type="submit" color="btn btn-primary">
                {isRankModalEditable ? 'Edit Rank' : 'Save Rank'}
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
      <Fragment>
        <div className="app-user-list">
          <Row>
            {categories?.map((item, i) => (
              <>
                <Col lg="4" sm="6">
                  <div
                    className={`card border ${activecard === i ? 'border border-primary' : ''}`}
                    onClick={() => handleCategoryClick(i, item)}
                  >
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <AvatarGroup data={avatarGroupArr} size="sm" />
                        <div>
                          <h3>{item?.categoryName}</h3>{' '}
                        </div>
                      </div>
                      <div className="d-flex justify-content-between py-1">
                        <div></div>
                        <div>Total ranks data</div>
                      </div>
                      <div className="d-flex justify-content-between ">
                        {item.userId===user.id?( <div>
                          <h6
                            className="text-primary cursor-pointer"
                            onClick={() => {
                              handleOpenModal(item);
                            }}
                          >
                            <Edit size={20} />
                          </h6>
                        </div>):null}
                       
                        <div>
                          {item.userId===user.id? (<Trash
                            className="cursor-pointer"
                            size={15}
                            onClick={() => handleDeleteRequest(item._id)}
                          ></Trash>):(<Lock className='text-muted' size={14}/>)}
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </>
            ))}
            <Col lg="4">
              <div className="card p-3">
                <Button
                  onClick={() => {
                    toggleitemmodal();
                    setIsModalEditable(false);
                    setFlexibleModalData({ id: progressionId });
                  }}
                  width="2"
                  color="primary"
                >
                  Add Category
                </Button>
              </div>
            </Col>
          </Row>
          <Col xl={12}>
            <div className="react-dataTable user-view-account-projects">
              <div className=" m-0 rounded-0 p-2">
                <div className="d-flex justify-content-between">
                  <div>{/* Programme{'>' + activecard} */}</div>
                  <div>
                    <Button
                      color="primary"
                      disabled={activecard === '' ? true : false}
                      onClick={() => {
                        togglerankmodal();
                        setIsRankModalEditable(false);
                        setRankInputData({ ...rankInputData, rankName: '', rankOrder: 'select' });
                      }}
                    >
                      Add new Rank
                    </Button>
                  </div>
                </div>
              </div>
              <DataTable
                noHeader
                responsive
                columns={columns}
                data={tabelData}
                className="react-dataTable"
              />
            </div>
          </Col>
        </div>
      </Fragment>
    </div>
  );
};

export default Layout;
