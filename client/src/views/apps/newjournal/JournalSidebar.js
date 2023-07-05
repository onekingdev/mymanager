import { useState, useEffect, useCallback } from 'react';
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Home,
  MoreVertical,
  Edit,
  Trash,
  Layers
} from 'react-feather';
import { useForm, Controller } from 'react-hook-form';
import {
  Badge,
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Label,
  Form,
  FormText,
  FormFeedback,
  ListGroup,
  ListGroupItem,
  UncontrolledDropdown
} from 'reactstrap';

import '../../../../src/assets/styles/jaornal.scss';
import CreateCategoryModal from './modals/CreateCategoryModal';

import DeleteConfirmModal from './modals/DeleteConfirmModal';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { deleteJournalCategoryAction } from './store/action';

const JournalSidebar = ({
  collapse,
  handleJournalCollapse,
  setSideBarUpdateData,
  store,
  dispatch,
  selectedCategory,
  setSelectedCategory
}) => {
  const [basicModal, setBasicModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editCat,setEditCat] = useState({})

  const [showActions, setShowActions] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [all, setAll] = useState({ title: 'All', count: 0 });

  // ** Handlers
  const mySwal = withReactContent(Swal)
  const handleDelete = async (id) => {
    const res = await mySwal.fire({
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
    })
    if(res.value){
      dispatch(deleteJournalCategoryAction(id))
    }
  };

  const handleSelectCategory = (id) => {
    if (id === 'all') {
      setSelectedCategory('all');
      document.title = `My Journal (${all.count})`;
    } else {
      setSelectedCategory(id);

      document.title = `My Journal - ${store?.journalCategories.find((x) => x._id === id).title}`;
    }
  };
  useEffect(() => {
    if (store.journalCategories && store.journalCategories.length > 0) {
      let cnt = 0;
      store.journalCategories.map((x) => {
        cnt = cnt + x.count;
      });
      setAll({ ...all, count: cnt });
    }
  }, [store?.journalCategories]);

  return (
    <div className="project-sidebar joru-side-height h-100" style={{ width: '260px',  }}>
      <div className="sidebar-content task-sidebar journal">
        <div className="task-app-menu"  >
          <ListGroup
            className={`sidebar-menu-list ${collapse ? 'd-none' : 'd-block'}`}
            options={{ wheelPropagation: false }}
          >
            <div className="d-flex justify-content-between align-items-center p-1  pt-2 ">
              <Home size={20} />
              <div style={{ fontSize: '18px', fontWeight: 700, cursor: 'pointer' }}>My Journal</div>
              <Button
                className="btn-icon btn-toggle-sidebar"
                color="flat-dark"
                onClick={handleJournalCollapse}
              >
                {collapse ? null : <ChevronLeft size={18} />}
              </Button>
            </div>

            <div className="jrnl_wrapper_sidebar">
              {/* ${active === i && 'active'} */}
              <ListGroupItem
                className={`ws-name list-item ps-lft ${selectedCategory === 'all' && 'active'}`}
              >
                <div>
                  <div
                    onClick={() => {
                      handleSelectCategory('all');
                    }}
                  >
                    <span
                      
                      style={{ fontWeight: '500', width: '0%'  }}
                    >
                      {all?.title}
                    </span>
                    <span className="stt-rs" style={{ width: '15%' }}>
                      <div style={{ paddingRight: '20px' }}> &nbsp;</div>
                    </span>
                    <Badge
                      className="jrnl-badge"
                      color="light-primary"
                      style={{ float: 'right', position: 'relative', left: '20px' }}
                      pill
                    >
                      {all.count}
                    </Badge>
                  </div>
                </div>
              </ListGroupItem>
              {store?.journalCategories &&
                store?.journalCategories?.map((value, i) => (
                  <ListGroupItem
                    key={i}
                    className={`ws-name list-item ps-lft ${
                      selectedCategory === value._id && 'active'
                    }`}
                    onMouseEnter={() => setShowActions(value._id)}
                          onMouseLeave={() => setShowActions(0)}
                  >
                    <div>
                      <div onClick={() => handleSelectCategory(value._id)}>
                        <span
                          style={{ fontWeight: '500', width: '0%' }}
                          
                        >
                          {value?.title}
                        </span>

                        <span className="stt-rs" style={{ width: '15%' ,  }}>
                          {i != 0 && i != 1 ? (
                            <UncontrolledDropdown >
                              <DropdownToggle
                                className={` btn btn-sm `}
                                tag="div"
                                href="/"
                                
                                
                              >
                                <MoreVertical className={`text-body ms-1 ${showActions === value._id?'d-block':'d-none'}`} size={16} />
                              </DropdownToggle>
                              <DropdownMenu end>
                                <DropdownItem
                                  tag={'span'}
                                  className="w-100"
                                  onClick={() => {
                                    setEditModal(true), setEditCat(value); setBasicModal(true)
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
                          ) : (
                            <div style={{ paddingRight: '20px' }}> &nbsp;</div>
                          )}
                        </span>
                        <Badge
                          className="jrnl-badge"
                          color="light-primary"
                          style={{ float: 'right', position: 'relative', left: '20px' }}
                          pill
                        >
                          {value.count}
                        </Badge>
                      </div>
                    </div>
                  </ListGroupItem>
                ))}
            </div>
            <div
              className="project-create-workspace-btn my-1 btn text-center"
              style={{ width: '100%' }}
            >
              <Button color="primary" outline onClick={() => {setEditModal(false); setBasicModal(true)}}>
                <Plus size={14} className="me-25" />
                New Category
              </Button>
            </div>
          </ListGroup>
        </div>
      </div>

      <CreateCategoryModal
        basicModal={basicModal}
        setBasicModal={setBasicModal}
        dispatch={dispatch}
        store={store}
        isEdit={editModal}
        selectedCategory={editCat}
      />
      
      
    </div>
  );
};

export default JournalSidebar;
