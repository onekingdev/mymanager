import React, { Fragment, useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'react-feather';

import { Button, Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap';
import img1 from '@src/assets/images/goals/g1.png';
import img3 from '@src/assets/images/goals/g3.png';

import { addClientProgressionAction, progressionListAction } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
// src/views/contacts/store/actions.js
import { toast } from 'react-toastify';

const ProgressionTemplate = (props) => {
  const { stepper, setRSelected, rSelected, userIdSelected, setLoading } = props;
  const [payloadRedux, setPayloadRedux] = useState({});
  // const [eventClicked, setEventClicked] = useState(false);
  useEffect(() => {
    setPayloadRedux({ clientIds: userIdSelected });
  }, [userIdSelected]);
  const dispatch = useDispatch();

  // ** Handlers
  const handleProgressionClick = () => {
    setRSelected(1);
  };

  const handleNextClick = () => {
    if (rSelected == 2) {
      setLoading(true);
    }
    stepper.next();
  };
  return (
    <Fragment>
      {/* <Card className="p-2"> */}
      <div className="d-flex mt-0 bg-transparent">
        <div className="m-1">
          <Card className="mb-3">
            <CardImg top src={img1} alt="card-top" />
            <CardBody>
              <CardTitle tag="h4">Progression</CardTitle>
              <CardText>
                <small className="text-muted">
                  Add contacts selected to a progression list to promote their ranks.
                </small>
              </CardText>
              <Button
                onClick={() => handleProgressionClick()}
                active={rSelected === 1}
                color="primary"
                block
                outline
              >
                Select
              </Button>
            </CardBody>
          </Card>
        </div>
        <div className="m-1">
          <Card className="mb-3">
            <CardImg top src={img3} alt="card-top" />
            <CardBody>
              <CardTitle tag="h4">Add to Event</CardTitle>
              <CardText>
                <small className="text-muted">
                  Add the Selected individuals to an event progression .
                </small>
              </CardText>
              <Button
                onClick={() => {
                  setRSelected(2);
                }}
                active={rSelected === 2}
                color="primary"
                block
                outline
              >
                Select
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
      {/* </Card > */}

      <div className="d-flex justify-content-between">
        <Button color="primary" className="btn-prev" disabled>
          <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
          <span className="align-middle d-sm-inline-block d-none">Previous</span>
        </Button>
        <Button
          color={payloadRedux?.clientIds?.length == 0 ? 'secondary' : 'primary'}
          className="btn-next"
          onClick={() => {
            handleNextClick();
          }}
          disabled={rSelected == null}
        >
          <span className="align-middle d-sm-inline-block d-none">Next</span>
          <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
        </Button>
      </div>
    </Fragment>
  );
};
export default ProgressionTemplate;
