import React, { useState, useEffect } from 'react';
import { Card, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import { Menu } from 'react-feather';
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Trash } from 'react-feather';
import Retention from './tabs/retention';
import axios from 'axios';
import {
  ListGroup,
  ListGroupItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Label,
  Input,
  Col
} from 'reactstrap';
import Filter from './tabs/retention/Filter';
import GroupNumber from './tabs/retention/GroupNumber';
import FacebookLogin from '@greatsumini/react-facebook-login';

const Sidebar = (props) => {
  const { sidebarOpen, setSidebarOpen } = props;
  const [active, setActive] = useState(0);
  const [pagesData, setPagesData] = useState([]);
  const [modalnewsmartlist, setModalnewsmartlist] = useState(false);
  const [pages, setPages] = useState([]);
  const [pagePostToken, setPagesPostToken] = useState('');
  const [pagePostImage, setPagesPostImage] = useState('');
  const [pagePostName, setPagesPostName] = useState('');
  const togglemodalnewsmartlist = () => setModalnewsmartlist(!modalnewsmartlist);
  const [facebookResponseValue, setFacebookResponseValue] = useState('');
  const toggleTab = (tab, token, image, name) => {
    setPagesPostName(name);
    setPagesPostImage(image);
    setPagesPostToken(token);
    axios
      .get(
        `https://graph.facebook.com/${tab}/posts?access_token=${token}&fields=id,message,created_time,picture`
      )
      .then((response) => {
        setPagesData(response.data.data);
      })
      .catch((error) => {});
  };
  useEffect(() => {
    axios
      .get(
        `https://graph.facebook.com/me/accounts?fields=access_token,id,name,picture{url}&access_token=${facebookResponseValue}`
      )
      .then((response) => {
        setPages(response.data.data);
      })
      .catch((error) => {});
  }, [facebookResponseValue]);

  const deletePage = (page_id, page_access_token) => {
    axios
      .delete(`https://graph.facebook.com/${page_id}?access_token=${page_access_token}`)
      .then((response) => {})
      .catch((error) => {});
  };

  return (
    <>
      <Modal centered={true} isOpen={modalnewsmartlist} toggle={togglemodalnewsmartlist} size="md">
        <ModalHeader toggle={togglemodalnewsmartlist}> Client Check In</ModalHeader>
        <ModalBody className="p-2">
          <FormGroup row>
            <Label for="Smartlistname" sm={12}>
              customer Name
            </Label>
            <Col sm={12}>
              <Input
                id="smartlistfolder"
                name=" Smartlistname"
                placeholder="Custmer Name"
                type="text"
                // size = '38'
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="Smartlistname" sm={12}>
              customer Email or Phone
            </Label>
            <Col sm={12}>
              <Input
                id="smartlistfolder"
                name=" Smartlistname"
                placeholder="Email or Phone"
                type="text"
              />
            </Col>
          </FormGroup>
        </ModalBody>
        <ModalFooter className="d-flex">
          <Button color="btn btn-outline-danger" onClick={togglemodalnewsmartlist}>
            Cancel
          </Button>
          {'  '}
          <Button color="btn btn-primary" onClick={togglemodalnewsmartlist}>
            Save
          </Button>
        </ModalFooter>
      </Modal>

      <div
        className={classnames('sidebar-left', {
          show: sidebarOpen
        })}
      >
        <div className="sidebar">
          <div className="sidebar-content email-app-sidebar">
            <div className="email-app-menu">
              <div className="form-group-compose text-center compose-btn">
                <FacebookLogin
                  style={{
                    border: '1px solid transparent',
                    padding: '0.786rem 1.5rem',
                    borderRadius: '0.358rem',
                    borderColor: '#174ae7 !important',
                    backgroundColor: '#174ae7',
                    color: 'white',
                    fontWeight: '500'
                  }}
                  // appId="126819523670562"
                  appId="310109620967829"
                  onSuccess={(response) => {
                    setFacebookResponseValue(response.accessToken);
                  }}
                  onFail={(error) => {}}
                  onProfileSuccess={(response) => {}}
                  autoLoad={false}
                />
                <hr className="mb-0" />
              </div>
              <PerfectScrollbar className="sidebar-menu-list" options={{ wheelPropagation: false }}>
                <ListGroup tag="div" className="list-group-messages">
                  {pages?.map((ele, i) => {
                    return (
                      <ListGroupItem
                        tag={NavLink}
                        onClick={() => {
                          toggleTab(ele?.id, ele?.access_token, ele?.picture.data.url, ele?.name);
                          setActive(ele?.id);
                        }}
                        active={active.id === ele?.id}
                        action
                        className="mt-1"
                      >
                        <img
                          alt="images"
                          style={{ width: '40px', borderRadius: '12px' }}
                          src={ele?.picture.data.url}
                        />
                        <span className="align-middle" style={{ marginLeft: '10px' }}>
                          {ele?.name.slice(0, 15)}...
                        </span>
                        {/* <Trash
                          onClick={() => deletePage(ele?.id, ele?.access_token)}
                          className="float-end"
                          style={{ marginTop: '10px' }}
                          size={18}
                        /> */}
                      </ListGroupItem>
                    );
                  })}
                </ListGroup>
              </PerfectScrollbar>
            </div>
          </div>
        </div>
      </div>

      <div className="content-right">
        <div className="content-body">
          <div
            className={classnames('body-content-overlay', {
              show: sidebarOpen
            })}
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="email-app-list">
            <div className="app-fixed-search d-flex d-lg-none align-items-center">
              <div
                className="sidebar-toggle d-block d-lg-none ms-1"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu size="21" />
              </div>
            </div>
            <Card className="m-2">
              <GroupNumber groupNumber={pagePostName} />
            </Card>
            <Card className="m-2">
              <Row spacing={2} container>
                <Col item sm={8} md={8} lg={8}>
                  <TabContent activeTab={active}>
                    <Retention
                      pageName={pagePostName}
                      pageAccessToken={pagePostToken}
                      groupImage={pagePostImage}
                      pagesData={pagesData}
                    />
                  </TabContent>
                </Col>
                <Col item sm={4} md={4} lg={4}>
                  <Card>
                    <Filter />
                  </Card>
                </Col>
              </Row>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
