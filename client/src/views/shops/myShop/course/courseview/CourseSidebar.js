// ** React Imports
import { Link } from 'react-router-dom';
import {Fragment } from 'react';
import classnames from 'classnames';
const CourseSidebar = ({ courseList,store }) => {
  const location = window.location.href.split(window.location.origin)[1].split('/')[1]
  const renderRecentPosts = () => {
    return courseList.map((course, index) => {
      return (
        <Link to={location==="shop"?`/shop/${store.shop.shopPath}/course/${course._id}`:`/ecommerce/${store.shop.shopPath}/course/${course._id}`}>
          <div
            key={index}
            className={classnames('d-flex bg-light-secondary p-1', {
              'mb-1': index !== courseList.length - 1
            })}
          >
            <img className="rounded me-1" src={course.courseImage} width="100" height="70" />
            <div>
              <h6 className="blog-recent-post-title">
                {course.courseName}
              </h6>
            </div>
          </div>
        </Link>
      );
    });
  };

  return (
    <div className="sidebar-detached sidebar-right">
      <div className="sidebar">
        <div className="blog-sidebar right-sidebar my-2 my-lg-0">
          <div className="right-sidebar-content">
            {courseList !== undefined ? (
              <Fragment>
                <div className="blog-recent-posts mt-3">
                  <h6 className="section-label">Other Courses</h6>
                  <div className="mt-75">{renderRecentPosts()}</div>
                </div>
              </Fragment>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSidebar;
