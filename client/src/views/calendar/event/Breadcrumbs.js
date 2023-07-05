// ** React Imports
import { Link, useHistory } from 'react-router-dom';

// ** Third Party Components
import { LogOut, CheckSquare, ArrowLeft } from 'react-feather';

// ** Reactstrap Imports
import {
  Button,
  Breadcrumb,
  DropdownMenu,
  DropdownItem,
  BreadcrumbItem,
  DropdownToggle,
  UncontrolledButtonDropdown
} from 'reactstrap';

const BreadCrumbs = (props) => {
  // ** Props
  const {
    breadCrumbTitle,
    breadCrumbParent,
    breadCrumbParentLink,
    breadCrumbParent2,
    breadCrumbParent2Link,
    breadCrumbParent3,
    breadCrumbActive,
    isBack
  } = props;
  const history = useHistory();
  // ** Handlers
  const handleBackClick = () => {
    if (isBack) {
      history.goBack();
    } else {
      history.push('/calendar/2');
    }
  };
  return (
    <div className="content-header row">
      <div className="content-header-left col-md-9 col-12 mb-2">
        <div className="row breadcrumbs-top">
          <div className="col-12">
            {breadCrumbTitle ? (
              <h2 className="content-header-title float-start mb-0 ps-1">{breadCrumbTitle}</h2>
            ) : (
              ''
            )}
            <div className="breadcrumb-wrapper vs-breadcrumbs d-sm-block d-none col-12">
              <Breadcrumb>
                <BreadcrumbItem tag="li">
                  <Link to="/">Home</Link>
                </BreadcrumbItem>
                <BreadcrumbItem tag="li" className="text-primary">
                  <Link to={breadCrumbParentLink}>{breadCrumbParent}</Link>
                </BreadcrumbItem>
                {breadCrumbParent2 ? (
                  <BreadcrumbItem tag="li" className="text-primary">
                    <Link to={breadCrumbParent2Link}>{breadCrumbParent2}</Link>
                  </BreadcrumbItem>
                ) : (
                  ''
                )}
                {breadCrumbParent3 ? (
                  <BreadcrumbItem tag="li" className="text-primary">
                    {breadCrumbParent3}
                  </BreadcrumbItem>
                ) : (
                  ''
                )}
                <BreadcrumbItem tag="li" active>
                  {breadCrumbActive}
                </BreadcrumbItem>
              </Breadcrumb>
            </div>
          </div>
        </div>
      </div>
      <div className="content-header-right text-md-end col-md-3 col-12 d-md-block d-none">
        <div className="d-flex justify-content-end pe-1">
          <Button
            color="primary"
            size="sm"
            outline
            className="btn-round d-flex align-items-center"
            onClick={(e) => handleBackClick()}
          >
            <ArrowLeft size={18} />
            <span className="ms-25">Back</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default BreadCrumbs;
