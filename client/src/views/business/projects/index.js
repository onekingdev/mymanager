// ** Reactst Imports
import { Fragment, useEffect } from 'react';
import { getProjects } from '../../../requests/projects/project';

// ** Redux Imports
import { useDispatch, useSelector } from 'react-redux';
// ** Component Imports
import { projectsData, projectActivities } from './store/reducer';
import ProjectWorkspace from './workspace/ProjectWorkspace';

const Projects = () => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.auth.userData.id);

  useEffect(async () => {
    try {
      getProjects(id).then((response) => {
        dispatch(projectsData(response?.data?.result));
        dispatch(projectActivities(response?.data?.latestActivitiese))
      });
    } catch (error) {
      return error;
    }
  }, []);

  return (
    <Fragment>
      <ProjectWorkspace />
    </Fragment>
  );
};

export default Projects;
