// ** React Imports
import { Link } from 'react-router-dom';

// ** Third Party Components
import classnames from 'classnames';
import { Eye, ShoppingBag, Star } from 'react-feather';
// ** Reactstrap Imports
import { Card, CardBody, CardText, Button,Badge } from 'reactstrap';
// ** Icons Impots
import { FaChalkboardTeacher } from 'react-icons/fa';
const CourseCards = ({ item, store }) => {
  const location = window.location.href.split(window.location.origin)[1].split('/')[1]
  // ** Renders products
  return (

    <Card className="ecommerce-card" key={item.name}>
      <div className="item-img text-center mx-auto">
        {/* <Link to={`/mycma/product-detail/${item.slug}`}> */}
        <img width="300" height="200" className="card-img-top" src={item.courseImage} />
        {/* </Link> */}
      </div>
      <CardBody>
        <div className="d-flex justify-content-between">
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
            <Badge color={item.permission==='public'?'light-success':'light-danger'}>{item.permission}</Badge>
          </div>
        </div>
        <h6 className="item-name">

          {item.courseName}

          {/* <CardText tag="span" className="item-company">
            By{' '}
            <a className="company-name" href="/" onClick={(e) => e.preventDefault()}>
              {item.brand}
            </a>
          </CardText> */}
        </h6>


        <p className="text-secondary mt-2">{item?.description ? item.description : "No Description"}</p>
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
      <div className="item-options text-center">
        <Link to={location === "shop" ? `/shop/${store.shop.shopPath}/course/${item._id}` : `/ecommerce/${store.shop.shopPath}/course/${item._id}`}>
          <Button
            className="btn-wishlist w-50"
            style={{
              borderTopLeftRadius: '0px',
              borderTopRightRadius: '0px',
              borderBottomRightRadius: '0px'
            }}
            color="light"
          >
            <Eye className="me-50" size={14}></Eye>
            <span>View Course</span>
          </Button>
        </Link>
        <Button
          color="primary"
          className="btn-cart w-50"
          style={{
            borderTopLeftRadius: '0px',
            borderTopRightRadius: '0px',
            borderBottomLeftRadius: '0px'
          }}
        >
          <ShoppingBag className="me-50" size={14} />
          Get Course
        </Button>
      </div>
    </Card>

  );

};

export default CourseCards;
