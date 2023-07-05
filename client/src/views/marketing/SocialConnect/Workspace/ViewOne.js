import React, { Fragment, useState, useEffect } from 'react';
import { ChevronLeft, PlusCircle, Trash } from 'react-feather';
import '../../../../assets/styles/socialconnect.scss';

import {
  Card,
  CardFooter,
  Col,
  Row,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from 'reactstrap';
import BreadCrumbs from '@components/breadcrumbs';
import { Link } from 'react-router-dom';
import WorkspaceMain from './Workspace/WorkspaceMain';
import axios from 'axios';
import Moment from 'react-moment';
function ViewOne() {
  const [workplace, showWorkplace] = useState(false);
  const [data, setData] = useState([]);
  const [datadelete, setDatadelete] = useState(false);
  const [workspaceid, setworkspaceid] = useState('');
  const [workspceName, setWorkspceName] = useState();

  return (
    <div>
      <Col xl="12">
        <div className="card  p-2 rtt-3">
          <ChevronLeft size={45} onClick={() => showWorkplace(!workplace)}></ChevronLeft>
          <span>workspceName</span>
          <span className="wrk-right">
            <UncontrolledButtonDropdown>
              <DropdownToggle color="primary" caret>
                All Workspaces
              </DropdownToggle>
              <DropdownMenu>
                {data?.map((value) => (
                  <DropdownItem
                    className="dropdowcustom"
                    key={value.id}
                    //  onClick={e => e.preventDefault()}
                    //  onClick={(e)=>handleSwitchworkspace(e,value?._id)}
                    onClick={() => handleid(value?._id)}
                  >
                    {value?.workspacename.slice(0, 12)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </UncontrolledButtonDropdown>
          </span>
        </div>
      </Col>
      <WorkspaceMain workspaceid={workspaceid} />
    </div>
  );
}

export default ViewOne;
