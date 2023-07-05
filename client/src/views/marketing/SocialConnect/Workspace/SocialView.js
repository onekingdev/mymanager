import React, { useState, useEffect } from 'react';
import { ChevronLeft } from 'react-feather';
import {
  Col,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from 'reactstrap';
import { Link, useParams, useHistory } from 'react-router-dom';
import WorkspaceMain from './WorkspaceMain';
import { viewOneWorkspace, workSpaceListAll } from '../../../../requests/Planable';
import '../../../../assets/styles/socialconnect.scss';

function SocialView() {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  const [workspceName, setWorkspceName] = useState('');
  const params = useParams();
  const history = useHistory();

  const workspaceList = async () => {
    await workSpaceListAll().then((response) => {
      setData(response);
    });
  };
  useEffect(async () => {
    workspaceList();
    await handleAllData();
  }, []);

  const handleAllData = async () => {
    setLoader(true);
    await viewOneWorkspace(params.id).then((response) => {
      setWorkspceName(response.workspacename);
      setLoader(false);
    });
  };

  const handleid = (id) => {
    setLoader(true);
    viewOneWorkspace(id).then((response) => {
      setWorkspceName(response.workspacename);
      setLoader(false);
    });
  };
  return (
    <div
      className="socialViewone"
      style={{ display: 'inline', width: '100%', overflow: 'auto', padding: '0px 20px 0px 0px' }}
    >
      {loader === true ? (
        <>
          <h3>Loading...</h3>
        </>
      ) : (
        <>
          <Col xl="12">
            <div className="card  p-2 rtt-3">
              <ChevronLeft
                style={{ cursor: 'pointer' }}
                size={45}
                onClick={() => history.push('/mysocial/socialconnect')}
              ></ChevronLeft>
              <span className="wrk-right">
                <UncontrolledButtonDropdown>
                  <DropdownToggle className="dropdownmainworkspace" color="primary" caret>
                    {workspceName}
                  </DropdownToggle>
                  <DropdownMenu className="drodownworksmenu">
                    {data?.map((value) => (
                      <Link to={`/socialview/${value?._id}`}>
                        <DropdownItem
                          className="dropdownworkspacemain"
                          key={value.id}
                          onClick={() => {
                            handleid(value?._id);
                            setWorkspceName(value?.workspacename);
                          }}
                        >
                          {value?.workspacename}
                        </DropdownItem>
                      </Link>
                    ))}
                  </DropdownMenu>
                </UncontrolledButtonDropdown>
              </span>
            </div>
          </Col>
          <WorkspaceMain workspacename={workspceName} />
        </>
      )}
    </div>
  );
}

export default SocialView;
