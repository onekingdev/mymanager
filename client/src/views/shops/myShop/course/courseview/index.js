// ** React Imports
import { useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CourseDetails from './CourseDetails';
import { Card, CardBody,Col,Button } from 'reactstrap';
import { useDispatch, useSelector} from 'react-redux';
import '@styles/base/pages/app-ecommerce-details.scss';
import {ChevronLeft } from 'react-feather';
import { activeCourseFetchAction } from '../../../../mycma/usercourses/store/actions';
const Details = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const activeCourse = useSelector((state) => state.course.activeCourse);
  const store= useSelector((state)=>state.shops)
  const courses= useSelector((state)=>state.shops.courses)
  const coursesList=courses.filter((item)=>item._id!=params?.id)
  const details = activeCourse
  const location = window.location.href.split(window.location.origin)[1].split('/')[1]
  useEffect(() => {
    dispatch(activeCourseFetchAction(params?.id));
  }, [params?.id]);
  return (
    <Fragment>
      <Col xl="12">
        <Card clasName="my-0  ">
          <CardBody className="p-1">
          <Link to={location==="shop"?`/shop/${store.shop.shopPath}`:`/ecommerce/shop`} ><ChevronLeft size={40} className=" cursor-pointer" /></Link>
          </CardBody>
        </Card>
      </Col>
      <div className="app-ecommerce-details">
        <Card>
          <CardBody >
            <CourseDetails
              courseList={coursesList}
              details={details}
              store={store}
            />
          </CardBody>
          <hr />
        </Card>
      </div>
    </Fragment>
  );
};

export default Details;
