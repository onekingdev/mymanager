// ** React Imports
import { Fragment, useState} from 'react';
// ** Shop Components
import CoursesPage from './Courses';
// ** Custom Components
// ** Styles
import '@styles/react/apps/app-ecommerce.scss';

const Courses = () => {
  // ** States
  const [activeView, setActiveView] = useState('grid');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // ** Vars

  // ** Get products

  return (
    <Fragment>
      <CoursesPage
        activeView={activeView}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
    </Fragment>
  );
};
export default Courses;
