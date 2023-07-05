// ** React Imports
import { Link } from 'react-router-dom';

// ** Third Party Components
import classnames from 'classnames';
import moment from 'moment';
import { Star, ShoppingCart, Heart } from 'react-feather';

// ** Reactstrap Imports
import { Card, CardBody, CardText, Button, Badge } from 'reactstrap';

// ** Icons Impots
import { GiNotebook } from 'react-icons/gi';
import { FaChalkboardTeacher, FaGraduationCap } from 'react-icons/fa';
import { VscTypeHierarchy } from 'react-icons/vsc';
import { BsCalendar2Date } from 'react-icons/bs';
import { MdOutlineWatchLater } from 'react-icons/md';

const CourseCards = (props) => {
  // ** Props
  const {
    // store,
    products,
    activeView,
  } = props;

  // ** Renders products
  const renderProducts = () => {
    if (products.length) {
      return products.map((item) => {
        const CartBtnTag = item.isInCart ? Link : 'button';

        return (
          <Link to={`/mycma/mycourse/${item._id}`}>
          <Card className="ecommerce-card" key={item.name}>
            <div className="item-img text-center mx-auto">
              {/* <Link to={`/mycma/product-detail/${item.slug}`}> */}
                <img width="300" height="200" className="card-img-top" src={item.courseImage}   />
              {/* </Link> */}
            </div>
            <CardBody>
              <div className="item-wrapper">
                <div className="item-rating">
                  <ul className="unstyled-list list-inline">
                    {new Array(5).fill().map((listItem, index) => {
                      return (
                        <li key={index} className="ratings-list-item me-25">
                          <Star
                            className={classnames({
                              'filled-star': index + 1 <= item.rating,
                              'unfilled-star': index + 1 > item.rating
                            })}
                          />
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="item-cost">
                  <h6 className="item-price">${item.coursePrice}</h6>
                </div>
              </div>
              <h6 className="item-name">
                <Link className="text-body" to={`/mycma/product-detail/${item.slug}`}>
                  {item.name}
                </Link>
                <CardText tag="span" className="item-company">
                  By{' '}
                  <a className="company-name" href="/" onClick={(e) => e.preventDefault()}>
                    {item.brand}
                  </a>
                </CardText>
              </h6>
              <CardText className="item-description">{item.description}</CardText>
              <h6 className="d-flex justify-content-between mb-1">
                <span className="d-flex align-items-center">
                  <FaChalkboardTeacher className="me-1" /> Course Name
                </span>
                <span>{item?.courseName}</span>
              </h6>
              {/* <h6 className="d-flex justify-content-between mb-1">
                <span className="d-flex align-items-center">
                  <VscTypeHierarchy className="me-1" /> Type
                </span>
                <span>{item?.courseType}</span>
              </h6>
              <h6 className="d-flex justify-content-between mb-1">
                <span className="d-flex align-items-center">
                  <BsCalendar2Date className="me-1" /> Start Date
                </span>
                <span>{moment(item?.startDate).format("MM/DD/YYYY")}</span>
              </h6>
              <h6 className="d-flex justify-content-between mb-1">
                <span className="d-flex align-items-center">
                  <BsCalendar2Date className="me-1" /> End Date
                </span>
                <span>{moment(item?.endDate).format("MM/DD/YYYY")}</span>
              </h6>

              <h6 className="d-flex justify-content-between mb-1">
                <span className="d-flex align-items-center">
                  <MdOutlineWatchLater className="me-1" /> Duration
                </span>
                <span>{item.courseDuration}Mins</span>
              </h6> */}
              {/* <h6 className="d-flex justify-content-between mb-1">
                <span className="d-flex align-items-center">
                  <GiNotebook className="me-1" /> Curriculum
                </span>
                <span>{item?.curriculamType}</span>
              </h6> */}
            </CardBody>
          </Card>
          </Link>
        );
      });
    }
  };
  return (
    <div
      className={classnames({
        'grid-view': activeView === 'grid',
        'list-view': activeView === 'list'
      })}
    >
      {renderProducts()}
    </div>
  );
};

export default CourseCards;
