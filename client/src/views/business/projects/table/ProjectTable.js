/*    eslint-disable */

// ** React Imports
import React, { useEffect, useState } from 'react';

//** Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { projectActivities, addTable, rowAdd, workspaceUpdateName } from '../store/reducer';

// ** Icons Imports
import { Plus, Search } from 'react-feather';

// ** Reactstrap Imports
import { Button, Input, InputGroup, InputGroupText, UncontrolledTooltip } from 'reactstrap';

// ** Third Party Components
import ReactPaginate from 'react-paginate';

// ** Styles
import '@styles/base/pages/page-projects.scss';

// ** Component Imports
import GroupTable from './GroupTable';
import ProjectModal from '../modal/Modal';
import NoProjectLayout from '../noprojectlayout/NoProjectLayout';
import ProjectActivity from '../activity/ProjectActivity';

//** API
import { createNewTable, addRow, updateProject } from '../../../../requests/projects/project';

const ProjectTable = ({ collapseWorkspaceSidebar }) => {
  let workspaceData = useSelector((state) => state.projectManagement.projectsData);
  const currentUser = useSelector((state) => state.auth.userData);
  const projectData = useSelector((state) => state.projectManagement.getProjects);

  const [modal, setModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [tables, setTables] = useState({});
  const [itemOffset, setItemOffset] = useState(0);
  const [projectTitle, setProjectTitle] = useState();
  const toggle = () => setModal(!modal);
  const dispatch = useDispatch();
  const [updatedProjectsData, setUpdatedProjectsData] = useState(
    projectData?.tables?.map((tablesData) => tablesData)
  );

  const pageCount = Math.ceil(projectData?.tables?.length / 5);

  useEffect(() => {
    if (projectData && projectData?.tables?.length >= 0) {
      const newOffset = itemOffset % projectData?.tables?.length;
      setUpdatedProjectsData(projectData?.tables?.slice(newOffset, newOffset + 5));
      setProjectTitle(projectData?.name);
    }

    const currentData = projectData?.tables?.slice(itemOffset, itemOffset + 5);
    if (currentData?.length === 0 && itemOffset > 0) {
      const newOffset = itemOffset - 5;
      setItemOffset(newOffset);
    }
  }, [projectData, itemOffset]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 5) % projectData?.tables?.length;
    setItemOffset(newOffset);
  };

  const handleAddRow = (tableID) => {
    let payload = { tableID: tableID, userID: currentUser.id };
    addRow(payload).then((response) => {
      if (response?.data.success === true) {
        dispatch(
          rowAdd({ workspaceID: projectData._id, tableID: tableID, data: response?.data?.data })
        );
        dispatch(projectActivities(response.data.latestActivitiese));
      }
    });
  };

  const handleTableToggle = (index) => {
    setTables({ ...tables, [index]: !tables[index] });
  };

  const saveGroup = (e) => {
    e.preventDefault();

    if (newGroupName) {
      toggle();
      let payload = {
        workspaceID: projectData._id,
        userID: currentUser.id,
        title: newGroupName
      };
      createNewTable(payload).then((response) => {
        let newTable = response?.data?.data;
        dispatch(addTable({ workspaceID: projectData._id, newTable: newTable }));
        dispatch(projectActivities(response?.data?.latestActivitiese));
        setNewGroupName('');
      });
    }
  };
  let trackEnterKey = (event) => {
    if (event.key === 'Enter') {
      let payload = {
        workspaceID: projectData._id,
        projectTitle: projectTitle
      };
      updateProject(payload).then((response) => {
        dispatch(workspaceUpdateName(payload));
      });
      event.target.blur();
    }
  };

  return (
    <div
      className={`project-table w-full ${collapseWorkspaceSidebar ? 'ps-0' : 'ps-1'}`}
      style={{ width: '100%' }}
    >
      {workspaceData?.length > 0 ? (
        <div className="project-table-top mb-1" style={{ marginLeft: '-1rem' }}>
          <div
            className={`d-flex gap-2 ${collapseWorkspaceSidebar ? 'ps-4' : null}`}
            style={{ borderBottom: '1px solid #ebe9f1' }}
          >
            <div className="app-workspace-wrapper" style={{ width: '100%' }}>
              <Input
                id="selWorkspaceTitle"
                key="selWorkspaceTitle"
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 800,
                  spellCheck: false,
                  dir: 'auto',
                  borderColor: 'transparent',
                  backgroundColor: 'transparent',
                  width: '100%'
                }}
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                onKeyPress={trackEnterKey}
              />
            </div>
          </div>

          <div
            className="app-fixed-search d-flex align-items-center"
            style={{ padding: '0.4215rem 0.5rem' }}
          >
            <div className="sidebar-toggle cursor-pointer d-block d-lg-none ms-1"></div>
            <div className="project-workspace-search-container d-flex align-content-center justify-content-between w-100">
              <InputGroup className="input-group-merge">
                <InputGroupText size={14} style={{ border: 0 }}>
                  <Search className="text-muted" />
                </InputGroupText>
                <Input
                  className="project-workspace-search"
                  placeholder="Search"
                  style={{ border: 0 }}
                />
              </InputGroup>
            </div>
            <div className="d-flex">
              <Button.Ripple
                className="btn-icon me-1"
                outline
                color="primary"
                onClick={toggle}
                disabled={!workspaceData.length}
              >
                <Plus size={16} id="AddProject-Group" />
                <UncontrolledTooltip placement="top" target={'AddProject-Group'}>
                  Add New Project
                </UncontrolledTooltip>
              </Button.Ripple>

              <ProjectActivity workspaceID={projectData?._id} />
            </div>
          </div>
        </div>
      ) : null}

      <ProjectModal
        title="Create New Project"
        toggle={toggle}
        modal={modal}
        label="Project Name"
        labelFor="projectName"
        fieldName="projectName"
        fieldId="projectName"
        saveButtonText="Save"
        saveButtonColor="primary"
        value={newGroupName}
        onChange={(e) => setNewGroupName(e.target.value)}
        onClick={saveGroup}
        addBody={true}
      />

      {projectData?.tables?.length > 0 ? (
        <>
          {updatedProjectsData?.map((table, index) => (
            <GroupTable
              key={table._id}
              index={index}
              projectData={table}
              itemOffset={itemOffset}
              isOpen={!tables[index] || false}
              onToggle={handleTableToggle}
              rotateIcon={!tables[index] || false}
              onAddRow={handleAddRow}
            />
          ))}

          <div className="project-reactPaginate">
            <ReactPaginate
              nextLabel=""
              breakLabel="..."
              previousLabel=""
              pageCount={pageCount}
              activeClassName="active"
              breakClassName="page-item"
              pageClassName={'page-item'}
              breakLinkClassName="page-link"
              nextLinkClassName={'page-link'}
              pageLinkClassName={'page-link'}
              nextClassName={'page-item next'}
              previousLinkClassName={'page-link'}
              previousClassName={'page-item prev'}
              onPageChange={handlePageClick}
              containerClassName={'pagination react-paginate justify-content-end p-1'}
            />
          </div>
        </>
      ) : (
        <NoProjectLayout message="No Active Project" />
      )}
    </div>
  );
};

export default ProjectTable;
