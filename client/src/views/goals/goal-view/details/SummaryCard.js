// ** React Imports
import { Fragment, useRef } from 'react';

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  CardBody,
  Button,
  Badge,
  Modal,
  Input,
  Label,
  ModalBody,
  ModalHeader,
  CardHeader,
  Progress
} from 'reactstrap';

// ** Icons
import { FiEdit2, FiEye } from 'react-icons/fi';

// ** Third Party Components
import Select from 'react-select';
import Flatpickr from 'react-flatpickr';
// import { Check, Briefcase, X } from 'react-feather'
import { useForm } from 'react-hook-form';
// import withReactContent from 'sweetalert2-react-content'

// ** Custom Components
import Avatar from '@components/avatar';
import { convertDate } from '../../helpers/converters';

// ** Styles
// import '@styles/react/libs/react-select/_react-select.scss';
// import '@styles/react/libs/flatpickr/flatpickr.scss';

const statusColors = {
  active: 'light-success',
  pending: 'light-warning',
  inactive: 'light-secondary'
};

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'Pending' }
];

// const MySwal = withReactContent(Swal)

const SummaryCard = ({ task }) => {
  const photoRef = useRef();
  function onChoosePhoto() {
    photoRef?.current?.click();
  }

  // ** render user img
  const renderUserImg = () => {
    const stateNum = Math.floor(Math.random() * 6),
      states = [
        'light-success',
        'light-danger',
        'light-warning',
        'light-info',
        'light-primary',
        'light-secondary'
      ],
      color = states[stateNum];
    return (
      <Avatar
        onClick={onChoosePhoto}
        initials
        color={color}
        className="rounded mt-3 mb-2"
        //content={selectedUser.fullName}
        content={'goal'}
        contentStyles={{
          borderRadius: 0,
          fontSize: 'calc(48px)',
          width: '100%',
          height: '100%'
        }}
        style={{
          height: '110px',
          width: '110px'
        }}
      />
    );
  };

  function uploadPhoto({ file, id }) {
    const form = new FormData();
    form.append('file', file);
    form.append('id', id);
    // dispatch(uploadAvatarAction(form, id))
  }

  return (
    <Fragment>
      {/* upload photo */}
      <input
        type="file"
        onChange={(e) => {
          uploadPhoto({
            file: e.target.files[0],
            id: task?._id
          });
        }}
        hidden
        ref={photoRef}
      />

      <Card>
        <CardHeader>
          <h4>{task?.name} | {task?.category}</h4>
        </CardHeader>
        <CardBody>
          <div className="user-avatar-section">
            <div className="d-flex align-items-center flex-column">{renderUserImg()}</div>
          </div>

          {/* <div className="my-2 pt-35"></div> */}
          <div className="d-flex justify-content-between">
            <h4 className='my-0'>Goal Info</h4>
            <Badge  color={statusColors[task?.status]}>
              {task?.status}
            </Badge>
          </div>
          <hr/>
          <div className="info-container mb-3">
            {task !== null ? (
              <ul className="list-unstyled">
                <li className="mb-75">
                  <span className="fw-bolder me-25">Progress:</span>
                  <Progress value={70} max={100} className="w-100">
                    70%
                  </Progress>
                  <Label>Goal measure completed. total 0 lbsfrom 170 lbs remaining</Label>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Start Date:</span>
                  <span>{task && convertDate(task?.startDate)}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">End Date:</span>
                  <span>{task && convertDate(task?.endDate)}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Time Frame:</span>
                  <span>23 days</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Tracking:</span>
                  <span>Manually</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">From:</span>
                  <span>180 lbs</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">To:</span>
                  <span>170 lbs</span>
                </li>
              </ul>
            ) : null}
          </div>

          <div className="d-flex justify-content-center pt-2">
            <Button color="primary">Edit</Button>
            <Button className="ms-1" color="primary" outline>
              Delete
            </Button>
          </div>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default SummaryCard;
