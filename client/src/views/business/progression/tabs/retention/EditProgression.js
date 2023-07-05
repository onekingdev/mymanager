import React, { useEffect, useState } from 'react';
import { Edit, MoreVertical, Trash2 } from 'react-feather';
import {
  Button,
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
  UncontrolledDropdown
} from 'reactstrap';
import {
  progressionFetchAction,
  deleteSingleHistoryAction,
  progressionHistEditAction,
  GET_ALL_PROGRESSION_DATA
} from '../../../../contacts/store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { data } from 'jquery';
import { progressionCategoriesRankFetchAction } from '../../../../settings/tabs/progressiontab/store/actions';
import { Row } from '../../../../mycma/usercourses/manage/video/voice/shared';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const EditProgression = (props) => {
  const { row } = props;
  const dispatch = useDispatch();
  const [openEdit, setOpenEdit] = useState(false);
  const [progressionName, setProgressionName] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [rankName, setRankName] = useState('');
  const [currentCategories, setCurrentCategories] = useState([]);
  const toggle = () => setOpenEdit(!openEdit);

  const setProgChange = (e) => {
    e.preventDefault();
    // setChangeProgressionNameSign(true)
    setCurrentCategories(JSON.parse(e.target.value)?.categoryId);
    setProgressionName(JSON.parse(e.target.value)?.progressionName);
  };

  const setCatChange = (e) => {
    e.preventDefault();
    let valueDetail = JSON.parse(e.target.value);
    dispatch(progressionCategoriesRankFetchAction(valueDetail.id));
    setCategoryName(valueDetail?.categoryName);
  };

  const setRankChange = (e) => {
    let rankValue = JSON.parse(e.target.value);
    setRankName(rankValue?.rankName);
  };

  let ProgressionList = useSelector((state) => state?.totalContacts?.fetchProgressionData);
  const rankList = useSelector((state) => state.progression?.progressionCategoriesRank);

  const filteredProgressionData = ProgressionList.filter((data) => data._id === row?.progressionId);

  const payload = {
    progressionName: progressionName,
    categoryName: categoryName,
    currentRankName: rankName
  };

  const handleDelete = (e) => {
    e.preventDefault();

    Swal.fire({
      title: 'Delete?',
      text: 'Are you sure you want to delete this entry?',
      // icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete anyway',
      showLoaderOnConfirm: true,
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteSingleHistoryAction(row._id, row?.clientId))
          .then(() => {
            dispatch(GET_ALL_PROGRESSION_DATA());
          })
      }
    });
  };
  // useEffect(async () => {
  //   dispatch(progressionFetchAction());
  // }, []);

  return (
    <div>
      <div>
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
                setOpenEdit(true);
              }}
            >
              <Edit size={14} className="me-50" />
              <span className="align-middle">Update</span>
            </DropdownItem>
            <DropdownItem
              tag="a"
              href="/"
              className="w-100"
              onClick={handleDelete}
            >
              <Trash2 size={14} className="me-50" />
              <span className="align-middle">Delete</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
      <Modal
        isOpen={openEdit}
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
                // value={row?.progressionName}
                // value={progressionName }
                type="select"
                //  (e) => setProgressionName(e.target.value)
                onChange={setProgChange}
              >
                <option value="" className="fs-4">
                  Select Progression
                </option>
                {ProgressionList.map((item, i) => {
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
                name="category"
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
          <Button color="secondary" onClick={(e) => setOpenEdit(false)}>
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={(e) => {
              dispatch(progressionHistEditAction(row?._id, payload, row?.clientId));
              setOpenEdit(false);
            }}
          >
            Edit
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default EditProgression;
