// ** React Imports
import { Fragment, useEffect } from 'react';
// ** Product components
import CourseCards from './CourseCards';
import { useDispatch, useSelector } from 'react-redux';
// ** Third Party Components
import { courseFetchAction } from './store/actions';
// ** Reactstrap Imports
import EmptyPage from "../../../assets/images/pages/error.svg"
const CoursesPage = (props) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.course);
  // ** Props
  const {
    activeView,
  } = props;
  useEffect(() => {
    dispatch(courseFetchAction())
  }, [])
  return (
    <div >
      {/* <CoursesSearchbar dispatch={dispatch} getProducts={getProducts} store={store} /> */}
      {store.courseList.length ? (
        <Fragment>
          <CourseCards
            activeView={activeView}
            products={store?.courseList}
          />
        </Fragment>
      ) : (
        <>
          <div className="d-flex justify-content-center mt-5">
            <img src={EmptyPage}></img>
          </div>
          <h2 className="text-center mt-3">NO COURSES FOUND</h2>
        </>
      )}
    </div>
  );
};

export default CoursesPage;
