// ** React Imports
import { Link } from 'react-router-dom';
import { useEffect, useState, Fragment } from 'react';

// ** Third Party Components
import axios from 'axios';
import classnames from 'classnames';
import * as Icon from 'react-feather';
import PerfectScrollbar from 'react-perfect-scrollbar';
// ** Custom Components
import Avatar from '@components/avatar';

// ** Reactstrap Imports
import { InputGroup, Input, InputGroupText } from 'reactstrap';

const CourseSidebar = () => {
  // ** States
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('/blog/list/data/sidebar').then((res) => setData(res.data));
  }, []);

  const CategoryColorsArr = {
    Quote: 'light-info',
    Fashion: 'light-primary',
    Gaming: 'light-danger',
    Video: 'light-warning',
    Food: 'light-success'
  };

  const renderRecentPosts = () => {
    return data.recentPosts.map((post, index) => {
      return (
        <div
          key={index}
          className={classnames('d-flex', {
            'mb-2': index !== data.recentPosts.length - 1
          })}
        >
          <Link className="me-2" to={`/mycma/product-detail/${post.id}`}>
            <img className="rounded" src={post.img} alt={post.title} width="100" height="70" />
          </Link>
          <div>
            <h6 className="blog-recent-post-title">
              <Link className="text-body-heading" to={`/mycma/product-detail/${post.id}`}>
                {post.title}
              </Link>
            </h6>
            <div className="text-muted mb-0">{post.createdTime}</div>
          </div>
        </div>
      );
    });
  };



  return (

    <>


      <div className="blog-search " style={{height:"50vh"}}>
        {/* <InputGroup className="input-group-merge">
          <Input placeholder="Search here" />
          <InputGroupText>
            <Icon.Search size={14} />
          </InputGroupText>
        </InputGroup> */}

        {data !== null ? (
          <Fragment>
            <div className="blog-recent-posts mt-3">
              <h6 className="section-label">Related Courses</h6>
              <div className="mt-75">{renderRecentPosts()}</div>
            </div>
            {/* <div className="blog-categories mt-3">
            <h6 className="section-label">Categories</h6>
            <div className="mt-1">{renderCategories()}</div>
          </div> */}
          </Fragment>
        ) : null}
                {data !== null ? (
          <Fragment>
            <div className="blog-recent-posts mt-3">
         
              <div className="mt-75">{renderRecentPosts()}</div>
            </div>
            {/* <div className="blog-categories mt-3">
            <h6 className="section-label">Categories</h6>
            <div className="mt-1">{renderCategories()}</div>
          </div> */}
          </Fragment>
        ) : null}
      </div>
    </>

  );
};

export default CourseSidebar;
