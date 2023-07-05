import { useState, useEffect, useCallback } from 'react';
import {
  Plus,
  ChevronLeft,
  Trash,
  MoreVertical,
  Edit,
  Home
} from 'react-feather';
import {
  Badge,
  Button,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap';
import '../../../../src/assets/styles/jaornal.scss';
import CreateCategoryModal from './modals/CreateCategoryModal';
import EditCategoryModal from './modals/EditCategoryModal';
import { deleteFormCategory } from '../../../requests/formCategory/formCategory';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const CategorySidebar = ({
  collapse,
  handleCategoryCollapse,
  setSideBarUpdateData,
  categoryData,
  checkedCategoryData,
  categoryUpdate,
  setCategoryUpdate,
  setCheckedCategoryData
}) => {
  const [editModal, setEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [basicModal, setBasicModal] = useState(false);

  const handleSelect = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;
 
    if (isChecked) {
      setCheckedCategoryData([...checkedCategoryData, value]);
    } else {
      const filteredList = checkedCategoryData.filter((item) => item !== value);
      setCheckedCategoryData(filteredList);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Delete?',
      text: 'Are you sure you want to delete this journal category?',
      // icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete anyway',
      cancelButtonText: 'Cancel',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteConfirmation(id);
      }
    });
  };

  const handleDeleteConfirmation = async (id) => {
    try{
      await deleteFormCategory(id);
      const update = categoryUpdate + 1;
      setCategoryUpdate(update);
      setSideBarUpdateData(true);
      Swal.fire({
        title: 'Success',
        text: 'Journal category deleted successfully!',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
    } catch {
      toast.error('Error deleting email template category!');
    }

  };

  return (
    <div className="project-sidebar joru-side-height h-100 content-left" style={{ width: '260px' }}>
      <div className="sidebar-content task-sidebar h-100">
        <div className="task-app-menu h-100 d-flex flex-column">
          <ListGroup
            className={`sidebar-menu-list ${collapse ? 'd-none' : 'd-block'}`}
            options={{ wheelPropagation: false }}
          >
            <div className="d-flex justify-content-between align-items-center px-1 py-2 ">
              <Home size={20} />
              <div style={{ fontSize: '18px', fontWeight: 700, cursor: 'pointer' }}>CATEGORIES</div>
              <Button
                className="btn-icon btn-toggle-sidebar"
                color="flat-dark"
                onClick={handleCategoryCollapse}
              >
                {collapse ? null : <ChevronLeft size={18} />}
              </Button>
            </div>

            <div className="jrnl_wrapper_sidebar">
              {Array.isArray(categoryData) &&
                categoryData.map((value, i) => (
                  <ListGroupItem
                    key={'email-category-' + value?._id}
                    className={`ws-name list-item ps-lft`}
                  >
                    <div className='d-flex align-items-center'>
                      <div className="action-left form-check flex-1">
                        <Input
                          type="checkbox"
                          id={value?._id}
                          value={value?._id}
                          // checked={checkedCategoryData.includes(value._id)}
                          onChange={handleSelect}
                        />
                        <Label 
                          className="form-check-label fw-bolder ps-25 mb-0" 
                          htmlFor={value?._id}
                        >
                          {value?.name}
                        </Label>
                      </div>
                      <Badge
                        className="jrnl-badge me-1 d-flex align-items-center"
                        color="light-primary"
                        style={{ float: 'right', position: 'relative', left: '20px' }}
                        pill
                      >
                        {value.count}
                      </Badge>
                      <span className="" style={{ width: '15%' }}>
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn btn-sm py-0"
                            tag="div"
                            href="/"
                            style={{ width: '20px', position: 'relative', left: '10px' }}
                          >
                            <MoreVertical className="text-body" size={16} />
                          </DropdownToggle>
                          <DropdownMenu end>
                            <DropdownItem
                              tag={'span'}
                              className="w-100"
                              onClick={() => {
                                setEditModal(!editModal), setSelectedCategory(value);
                              }}
                            >
                              <Edit size={'14px'} style={{ marginRight: '10px' }} />
                              Edit
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => handleDelete(value?._id)}
                              tag={'span'}
                              className="w-100"
                            >
                              <Trash size={'14px'} style={{ marginRight: '10px' }} />
                              Delete
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </span>
                    </div>
                  </ListGroupItem>
                ))}
            </div>
          </ListGroup>
          <div
            className="project-create-workspace-btn my-1 btn text-center"
            style={{ width: '100%' }}
          >
            <Button color="primary" className='m-auto' outline onClick={() => setBasicModal(true)}>
              <Plus size={14} className="me-25" />&nbsp;&nbsp;New Category
            </Button>
          </div>
        </div>
      </div>
      <CreateCategoryModal
        basicModal={basicModal}
        setBasicModal={setBasicModal}
        categoryUpdate={categoryUpdate}
        setCategoryUpdate={setCategoryUpdate}
        categoryData={categoryData}
      />
      <EditCategoryModal
        editModal={editModal}
        setEditModal={setEditModal}
        selectedCategory={selectedCategory}
        categoryData={categoryData}
        categoryUpdate={categoryUpdate}
        setCategoryUpdate={setCategoryUpdate}
      />
    </div>
  );
};

export default CategorySidebar;
