// ** Reactst Imports
import { Fragment, useEffect, useState } from 'react';

// ** Component Imports
import ProjectTable from '../table/ProjectTable';
import WorkspaceSidebar from './WorkspaceSidebar';

// ** Redux Imports
import { Collapse, Button } from 'reactstrap';
import { ChevronRight } from 'react-feather';

const ProjectWorkspace = () => {
  const [collapse, setCollapse] = useState(false);

  const handleWorkspaceCollapse = () => setCollapse(!collapse);

  return (
    <div className="project-right" style={{ float: 'left !important' }}>
      <div className="content-wrapper">
        <div className="content-body">
          <div style={{ display: 'flex', height: 'calc(100vh - 12rem)' }}>
            <div className={`${collapse ? null : 'project-workspace-container'}`}>
              <Collapse isOpen={!collapse} horizontal={true} delay={{ show: 200, hide: 500 }}>
                <WorkspaceSidebar
                  collapse={collapse}
                  handleWorkspaceCollapse={handleWorkspaceCollapse}
                />
              </Collapse>
              <div className={`${collapse ? 'project-collapse-inactive' : 'tasks-area '}`}>
                <div className="workspace-title">
                  {collapse ? (
                    <Button
                      className="btn-icon"
                      color="flat-dark"
                      onClick={handleWorkspaceCollapse}
                    >
                      <ChevronRight size={14} />
                    </Button>
                  ) : null}
                </div>
              </div>
            </div>
            <ProjectTable collapseWorkspaceSidebar={collapse} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectWorkspace;
