// ** React Imports
import { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// ** Product detail components
import CourseDetails from './CourseDetails';
// ** Custom Components

// ** Reactstrap Imports
import { Card, CardBody, Col } from 'reactstrap';
// ** Store & Actions
import '@styles/base/pages/app-ecommerce-details.scss';
import { ChevronLeft } from 'react-feather';
import { activeCourseFetchAction } from '../store/actions';
const Details = (props) => {
  const dispatch = useDispatch();
  const { details, setDetails,shopStore } = props;
  const store = useSelector((state) => state.course.activeCourse);
  const data = store;
  useEffect(() => {
    dispatch(activeCourseFetchAction(details.details._id));
  }, []);
  return (
    <Fragment>
      
      <Col xl="12">
        <Card clasName="my-0  ">
          <CardBody className="p-1">
            <ChevronLeft size={40} className=" cursor-pointer" onClick={() => {setDetails({ show: !details.show });dispatch(activeCourseFetchAction(details.details._id,true))}} />
          </CardBody>
        </Card>
      </Col>
      <div className="app-ecommerce-details">
        {/* {Object.keys(store.productDetail).length ? ( */}
        <Card>
          <CardBody >
            <CourseDetails
              details={data}
              shopStore={shopStore}
            />
          </CardBody>
          <hr />
        </Card>
      </div>
    </Fragment>
  );
};

export default Details;
