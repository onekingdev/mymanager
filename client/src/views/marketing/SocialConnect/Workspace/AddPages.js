import '../../../../assets/styles/socialconnect.scss';
import FacebookLogin from 'react-facebook-login';

const REDIRECT_URI = window.location.href;
import { Row, Col, Card, CardTitle, CardSubtitle, Button, ModalFooter } from 'reactstrap';
import React, { useCallback, useState } from 'react';
import { BsFlag, BsYoutube } from 'react-icons/bs';
import axios from 'axios';
import { toast } from 'react-toastify';
import { createWorkSpace } from '../../../../requests/Planable';

export const AddPages = ({ args, viewOne }) => {
  const view = viewOne;
  // console.log(view);
  const [numberofpage, setNumberofpage] = useState([]);
  const [accessToken, setAccessToken] = useState('');
  const [active, setActive] = useState(null);
  const [activefbpage, setActivefbpage] = useState(false);
  const [facebookresponse, setFacebookResponse] = useState({});
  const [Selectedfblogindata, setSelectedfblogindata] = useState({});
  const [loader, setLoader] = useState(false);

  const geFbPageDummy = (accesstoken) => {
    axios
      .get(
        `https://graph.facebook.com/me/accounts?fields=access_token,id,name,picture{url}&access_token=${accesstoken}`
      )
      .then((resp) => {
        // console.log(resp);
        if (resp?.data?.data?.length > 0) {
          setNumberofpage(resp.data.data);
        } else {
          return <span>No Pages Found</span>;
        }
      })
      .catch((error) => {
      });
  };

  const responseFacebook = (response) => {
    // console.log(response);
    setFacebookResponse(response);
    setAccessToken(response.accessToken);
    geFbPageDummy(response.accessToken);
    localStorage.setItem('facebookimage', response?.picture?.data?.url);
    localStorage.setItem('fbemail', response.email);
    localStorage.setItem('fbename', response.name);
  };
  const componentClicked = (data) => {
    // console.log(data);
  };
  const handleConnect = (fbdata) => {
    // console.log(fbdata);
    if (fbdata) {
      setSelectedfblogindata(fbdata);
      setActivefbpage(true);
    }
  };
  const payload = {
    facebookData: [
      {
        profileName: facebookresponse.name,
        email: facebookresponse.email,
        userId: facebookresponse.userID,
        accessToken: Selectedfblogindata.access_token,
        pageId: Selectedfblogindata.id,
        pageName: Selectedfblogindata.name,
        profileImg: Selectedfblogindata?.picture?.data?.url
      }
    ]
  };
  const handleConnectPage = () => {
    if (activefbpage === true) {
      setLoader(true);
      createWorkSpace(payload).then((response) => {
        setLoader(false);
        if (response.message == 'success') {
          toast.success('Created succesfully');
          setSelectedfblogindata('');
          toggle();
          history.push('/mysocial/');
        }
      });
    } else toast.error('Select any one page to Complete');
  };

  return (
    <div className="addfbpage">
      <div className="addfbpagemain ">
        <div className=" ">
          <Row>
            {numberofpage && (
              <>
                {numberofpage?.map((value) => (
                  <Col key={value?.id} lg="3" md="3" sm="6">
                    <Card
                      onClick={() => {
                        setActive(value);
                        handleConnect(value);
                      }}
                      className={`list-group-item ${active == value && 'active'} `}
                      style={{
                        height: '11rem',
                        borderRadius: '10px'
                      }}
                    >
                      <div className="d-flex justify-content-center align-items-center h-100 w-100">
                        <div>
                          <div className="d-flex justify-content-center">
                            <img
                              style={{ borderRadius: '12px' }}
                              width={50}
                              src={value?.picture?.data?.url}
                              alt="image"
                            />
                          </div>
                          <div className="d-flex justify-content-center ">
                            <h4 className="facebookpagename">{value?.name.slice(0, 15)}</h4>
                          </div>

                          <a>
                            <div
                              onClick={() => handleConnect(value)}
                              className="d-flex justify-content-center"
                            >
                              + Connect Page
                            </div>
                          </a>
                        </div>
                      </div>
                    </Card>
                  </Col>
                ))}
              </>
            )}
            {numberofpage == '' ? (
              <>
                <Col lg="3" md="3" sm="6">
                  <Card
                    style={{
                      height: '11rem'
                    }}
                    className=""
                    onClick={componentClicked}
                    callback={responseFacebook}
                  >
                    <div className="d-flex justify-content-center align-items-center">
                      <div>
                        <div className="d-flex justify-content-center mt-1">
                          <BsFlag size={40} color="#6464dd" />
                        </div>

                        <div className="d-flex justify-content-center ">
                          <FacebookLogin
                            returnScopes="true"
                            appId="126819523670562"
                            // appId="310109620967829" //ankit sir business account
                            autoLoad={false}
                            scope="pages_manage_engagement,pages_read_engagement,pages_manage_posts"
                            fields="name,email,picture"
                            onClick={componentClicked}
                            callback={responseFacebook}
                          />
                        </div>

                        <div className="d-flex justify-content-center ">
                          <CardSubtitle className="mb-1 text-muted" tag="h6">
                            Pages
                          </CardSubtitle>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Col>
              </>
            ) : null}
          </Row>
          <div className="d-flex justify-content-end">
            {numberofpage == '' ? (
              <>
                <Button>Connect Page</Button>
              </>
            ) : (
              <>
                {loader === true ? (
                  <>
                    <buttton className="btn btn-warning">Connecting...</buttton>
                  </>
                ) : (
                  <>
                    <div className="d-flex justify-content-end">
                      {activefbpage === true ? (
                        <>
                          <buttton
                            onClick={handleConnectPage}
                            className="btn btn-primary"
                            color="primary"
                          >
                            Connect Page
                          </buttton>
                        </>
                      ) : (
                        <>
                          <Button>Connect Page</Button>
                        </>
                      )}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
        <hr />
        <Row>
          {view !== '' ? (
            <>
              <Col lg="3" md="3" sm="6">
                <Card
                  //   onClick={() => {
                  //     setActive(value);
                  //     handleConnect(value);
                  //   }}
                  // className={`list-group-item ${active == value && 'active'} `}
                  className="mt-1 mainconnected"
                  style={{
                    height: '11rem',
                    borderRadius: '10px'
                  }}
                >
                  <div className="d-flex justify-content-center align-items-center h-100 w-100">
                    <div>
                      <div className="d-flex justify-content-center">
                        <img
                          style={{ borderRadius: '12px' }}
                          width={50}
                          src={view?.facebookData[0].profileImg}
                          alt="ima"
                        />
                      </div>
                      <div className="d-flex justify-content-center ">
                        <span className="facebookpagenam">{view?.facebookData[0].pageName}</span>
                      </div>

                      <a>
                        <div
                          onClick={() => handleConnect()}
                          className="d-flex justify-content-center connedtedpage"
                        >
                          Connected Page
                        </div>
                      </a>
                    </div>
                  </div>
                </Card>
              </Col>
            </>
          ) : null}
        </Row>
      </div>
    </div>
  );
};
