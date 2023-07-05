// React Imports
import { React, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AiTwotoneEdit } from 'react-icons/ai';
import { FiMoreHorizontal } from 'react-icons/fi';
import Select from 'react-select';
import { Nav, NavItem, NavLink, Label, Input, FormGroup } from 'reactstrap';
import { Button, Col, Container, Row } from 'reactstrap';
import * as Icon from 'react-feather';
import { IoCopyOutline } from 'react-icons/io5';
import '../../../assets/styles/SocialProof.scss';
const category = [
  { value: 'Last 7 days', label: 'last 7 days' },
  { value: 'Last 30 days', label: 'last 30 days' },
  { value: 'full test', label: 'full test' }
];

const SubmitForm = () => {
  const history = useHistory();
  const [active, setActive] = useState('1');
  const [selectValue, setSelectValue] = useState('');
  const [position, setPosition] = useState('');
  const [campaignName, setCampaignName] = useState('');
  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };
  const SubmitHandler = () => {
    // alert('Publish Changes');
  };

  useEffect(() => {
    setCampaignName(localStorage.getItem('CampaignName'));
  }, []);

  return (
    <>
      <Container>
        <Row>
          <Col md="8">
            <Icon.ChevronLeft
              size={22}
              className=" fonticon-wrap"
              onClick={() => history.push('/mysocial/socialproof')}
            />
            <div className="inputMainDiv1 inputMainDiv2">
              <span className="spanData"></span>
              <Input
                type="text"
                value={campaignName}
                className="inputData d-inline-block int-sdw"
                onChange={(e) => setCampaignName(e.target.value)}
                style={{ width: `${campaignName.length}ch +2ch` }}
              />
            </div>
          </Col>

          <Col md="4">
            <div className="buttonsRight">
              <span className=" submitBtnStyle">
                <Button
                  className="btnsStyles"
                  color="primary"
                  onClick={() => history.push('/mysocial/camgaign-edit')}
                >
                  <AiTwotoneEdit size={22} className="font-medium-1 me-50 fonticon-wrap" />
                </Button>
              </span>

              <span className=" submitBtnStyle">
                <Button
                  color="primary"
                  className="btnsStyles "
                  onClick={() => history.push('/mysocial/camgaign-edit')}
                >
                  <IoCopyOutline size={22} className="font-medium-1 me-50 fonticon-wrap" />
                </Button>
              </span>
              <div style={{ padding: '0 7px' }}>
                <FiMoreHorizontal
                  size={30}
                  className=" fonticon-wrap threeDot"
                  onClick={() => SubmitHandler()}
                />
              </div>
            </div>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col lg="7" md="7" sm="12" className="card2">
            <div>Campaign Analytics</div>
          </Col>
          <Col lg="5" md="5" sm="12">
            <div className="d-flex justify-content-end">
              <Label className="pt-2">Time</Label>
              <div className="d-flex ml-2 p-1">
                <Select
                  id="task-assignee"
                  className="react-select"
                  classNamePrefix="select"
                  isClearable={false}
                  options={category}
                  onChange={(data) => {
                    setSelectValue(data.value);
                  }}
                />
              </div>
              <div className="pt-1">
                <FormGroup switch className="">
                  <Input
                    className=""
                    type="switch"
                    id="3"
                    checked={position}
                    onClick={() => {
                      setPosition(!position);
                    }}
                  />
                </FormGroup>
              </div>
            </div>
          </Col>
          <Col md="12" className="my-5">
            <Nav pills className="mb-2 tab-header headerPart borderBothSide">
              <NavItem className="">
                <NavLink
                  className="DivStyle"
                  active={active === '1'}
                  onClick={() => toggleTab('1')}
                >
                  <div className="zeroOne">
                    <span className="number">0</span>
                  </div>
                  <div className="my-1">
                    <span className="textColor">Goal Completions</span>
                  </div>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  className="DivStyle"
                  active={active === '2'}
                  onClick={() => toggleTab('2')}
                >
                  <div className="zeroOne">
                    <span className="number">0%</span>
                  </div>
                  <div className="my-1">
                    <span className="textColor">Conversion Rate</span>
                  </div>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="DivStyle"
                  active={active === '3'}
                  onClick={() => toggleTab('3')}
                >
                  <div className="zeroOne">
                    <span className="number">0</span>
                  </div>
                  <div className="my-1">
                    <span className="textColor">Visitors</span>
                  </div>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="DivStyle" active={active === '4'}>
                  <div className="zeroOne">
                    <span className="number">0</span>
                  </div>
                  <div className="my-1">
                    <span className="textColor">Clicks</span>
                  </div>
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SubmitForm;
