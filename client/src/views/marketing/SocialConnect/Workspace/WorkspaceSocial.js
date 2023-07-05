/* eslint-disable no-unused-vars */

import { Linkedin, Twitter } from 'react-feather';
import '../../../../assets/styles/socialconnect.scss';
import FacebookLogin from 'react-facebook-login';
import { useLinkedIn } from 'react-linkedin-login-oauth2';
import InstagramLogin from 'react-instagram-login';
import {
  LoginSocialGoogle,
  LoginSocialInstagram,
  LoginSocialLinkedin,
  LoginSocialTwitter,
  LoginSocialTiktok
} from 'reactjs-social-login';

const REDIRECT_URI = window.location.href;
import { Row, Col, Card, CardTitle, CardSubtitle, Button } from 'reactstrap';
import { ModalHeader, ModalBody, ModalFooter, Modal } from 'reactstrap';
import React, { useCallback, useState, useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { BsInstagram } from 'react-icons/bs';
import { SiTiktok } from 'react-icons/si';
import { BsFlag, BsYoutube } from 'react-icons/bs';
import { AiOutlineCloseCircle, AiOutlineHome } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { createWorkSpace, facebookUserLongToken } from '../../../../requests/Planable';

const WorkspaceSocial = ({ workspacename, timezone, isVisible, setIsVisible }) => {
  const name = workspacename;
  const time = timezone;
  const history = useHistory();
  const [provider, setProvider] = useState('');
  const [profile, setProfile] = useState();

  const [modal, setModal] = useState(false);
  const [modalOne, setModalOne] = useState(false);
  const [modalTwo, setModalTwo] = useState(false);
  const [modalLinkdin, setModalLinkdin] = useState(false);
  const [modalInstagram, setModalInstagram] = useState(false);
  const [modalYoutube, setModalYoutube] = useState(false);
  const [modalTiktok, setModalTiktok] = useState(false);
  const [numberofpage, setNumberofpage] = useState([]);

  const [active, setActive] = useState(null);
  const [activefbpage, setActivefbpage] = useState(false);
  const [facebookresponse, setFacebookResponse] = useState({});

  const [Selectedfblogindata, setSelectedfblogindata] = useState({});
  const [loader, setLoader] = useState(false);
  const [userData, setuserData] = useState();

  const toggle = () => setModal(!modal);
  const toggleOne = () => setModalOne(!modalOne);
  const toggleTwo = () => setModalTwo(!modalTwo);
  const toggleLinkdin = () => setModalLinkdin(!modalLinkdin);
  const toggleInstagram = () => setModalInstagram(!modalInstagram);
  const toggleYoutube = () => setModalYoutube(!modalYoutube);
  const toggleTiktok = () => setModalTiktok(!modalTiktok);

  const closeBtn = (
    <Button onClick={toggle} color="link">
      <AiOutlineCloseCircle size="30" />
    </Button>
  );
  const closeBtnOne = (
    <Button onClick={toggleOne} color="link">
      <AiOutlineCloseCircle size="30" />
    </Button>
  );

  const closeBtnTwo = (
    <Button onClick={toggleTwo} color="link">
      <AiOutlineCloseCircle size="30" />
    </Button>
  );

  const closeBtnLinkdin = (
    <Button onClick={toggleLinkdin} color="link">
      <AiOutlineCloseCircle size="30" />
    </Button>
  );

  const closeBtnInstagram = (
    <Button onClick={toggleInstagram} color="link">
      <AiOutlineCloseCircle size="30" />
    </Button>
  );

  const closeBtnYoutube = (
    <Button onClick={toggleYoutube} color="link">
      <AiOutlineCloseCircle size="30" />
    </Button>
  );

  const closeBtnTiktok = (
    <Button onClick={toggleTiktok} color="link">
      <AiOutlineCloseCircle size="30" />
    </Button>
  );
  const onLoginStart = useCallback(() => {}, []);

  const onLogoutSuccess = useCallback(() => {
    setProfile(null);
    setProvider('');
    alert('logout success');
  }, []);

  const handleSucess = (data) => {
    // console.log(data);
  };

  const { linkedInLogin } = useLinkedIn({
    clientId: '77gjlb9q0zg0o1',
    returnScopes: true,
    scope: 'r_emailaddress r_liteprofile',
    redirectUri: 'http://localhost:3000/mysocial/createworkspace',
    onSuccess: { handleSucess },
    onError: (error) => {
      console.log(error);
    }
  });

  useEffect(() => {
    setuserData(JSON.parse(localStorage.getItem('userData')));
  }, []);

  const handleLogin = (provider, data) => {
    if (provider == 'google') {
      const payloadgoggle = {
        workspacename: name,
        timezone: time,
        userId: userData?.id,
        googleData: [
          {
            profileName: data.name,
            email: data.email,
            userId: data.sub,
            accessToken: data.access_token,
            profileImg: data.picture
          }
        ]
      };
      setLoader(true);
      createWorkSpace(payloadgoggle)
        .then((response) => {
          // console.log(response);
          if (response.message == 'success') {
            setLoader(false);
            toast.success('Created succesfully');
            toggle();
            history.push('/mysocial');
          }
        })
        .catch((err) => setLoader(false));
    }
  };

  const geFbPageDummy = (accesstoken) => {
    axios
      .get(
        `https://graph.facebook.com/me/accounts?fields=access_token,id,name,picture{url}&access_token=${accesstoken}`
      )
      .then((resp) => {
        console.log(resp);
        if (resp?.data?.data?.length > 0) {
          setNumberofpage(resp.data.data);
        } else {
          return <span>No Pages Found</span>;
        }
      })
      .catch((error) => {
        // console.log('Error', error);
      });
  };

  const responseFacebook = (response) => {
    if (response?.accessToken) {
      let payload = {
        fb_exchange_token: response.accessToken
      };

      facebookUserLongToken(payload)
        .then((res) => {
          console.log(res);
          geFbPageDummy(res.access_token);
        })
        .catch((err) => console.log(err));
    }
    setFacebookResponse(response);

    localStorage.setItem('facebookimage', response?.picture?.data?.url);
    localStorage.setItem('fbemail', response.email);
    localStorage.setItem('fbename', response.name);
  };
  const componentClicked = (data) => {
    // console.log(data);
  };

  const responseInstagram = (response) => {
    // console.log(response);
  };
  const handleConnect = (fbdata) => {
    // console.log(fbdata);
    if (fbdata) {
      setActivefbpage(true);
      setSelectedfblogindata(fbdata);
    }
  };
  // console.log(userData?.id);
  const payload = {
    workspacename: name,
    timezone: time,
    userId: userData?.id,
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
      // console.log(payload);
      createWorkSpace(payload).then((response) => {
        // console.log(response);
        setLoader(false);
        if (response.msg == 'Workspace created successfully') {
          toast.success('Created succesfully');
          setSelectedfblogindata('');
          toggle();
          history.push('/mysocial/');
          // history.push(`/socialview/${response._id}`);
        }
      });
    } else toast.error('Select any one page to Complete');
  };

  return (
    <>
      <div className="w-90% shadow bg-white rounded connectsocialmediprofile">
        <span className="custmbackbtncnpose ">
          <Button color="primary" className="mt-1 mx-1" onClick={() => setIsVisible(true)}>
            Back
          </Button>
        </span>
        <div className="p-2" style={{ textAlign: 'center' }}>
          <h1>
            <b>{name.toUpperCase()}</b> - Connect With Social Profile
          </h1>
        </div>

        <Row className="allSocialmediamodla">
          <Col md="3">
            <Card className="py-3 mb-2">
              <div
                style={{ cursor: 'pointer' }}
                className="d-flex justify-content-center align-items-center h-100 w-100"
                onClick={toggle}
              >
                <div>
                  <div className="d-flex justify-content-center mb-1">
                    <FaFacebook size={40} color="blue" />
                  </div>
                  <div className="d-flex justify-content-center mb-1">
                    <CardTitle tag="h5">Facebook</CardTitle>
                  </div>
                  <div className="d-flex justify-content-center ">
                    <CardSubtitle className="mb-1 text-muted" tag="h6">
                      Page or Group
                    </CardSubtitle>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
          <Col md="3">
            <Card className="py-3 mb-2" onClick={toggleOne}>
              <div
                style={{ cursor: 'pointer' }}
                className="d-flex justify-content-center align-items-center h-100 w-100"
              >
                <div>
                  <div className="d-flex justify-content-center mb-1">
                    <FcGoogle size={40} color="blue" />
                  </div>
                  <div className="d-flex justify-content-center mb-1">
                    <CardTitle tag="h5">Google </CardTitle>
                  </div>
                  <div className="d-flex justify-content-center ">
                    <CardSubtitle className="mb-1 text-muted" tag="h6">
                      Buisiness Location
                    </CardSubtitle>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
          <Col md="3">
            <Card className="py-3 mb-2" onClick={toggleTwo}>
              <div
                style={{ cursor: 'pointer' }}
                className="d-flex justify-content-center align-items-center h-100 w-100"
              >
                <div>
                  <div className="d-flex justify-content-center mb-1">
                    <Twitter size={40} color="#00acee" />
                  </div>
                  <div className="d-flex justify-content-center mb-1">
                    <CardTitle tag="h5">Twitter </CardTitle>
                  </div>
                  <div className="d-flex justify-content-center ">
                    <CardSubtitle className="mb-1 text-muted" tag="h6">
                      Buisiness Location
                    </CardSubtitle>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
          <Col md="3">
            <Card className="py-3 mb-2" onClick={toggleLinkdin}>
              <div
                style={{ cursor: 'pointer' }}
                className="d-flex justify-content-center align-items-center h-100 w-100"
              >
                <div>
                  <div className="d-flex justify-content-center mb-1">
                    <Linkedin size={40} color="#0A66C2" />
                  </div>
                  <div className="d-flex justify-content-center mb-1">
                    <CardTitle tag="h5">Linkedin </CardTitle>
                  </div>
                  <div className="d-flex justify-content-center ">
                    <CardSubtitle className="mb-1 text-muted" tag="h6">
                      Buisiness Location
                    </CardSubtitle>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
          <Col md="3">
            <Card className="py-3 mb-2" onClick={toggleInstagram}>
              <div
                style={{ cursor: 'pointer' }}
                className="d-flex justify-content-center align-items-center h-100 w-100"
              >
                <div>
                  <div className="d-flex justify-content-center mb-1">
                    <BsInstagram size={40} color="#E1306C" />
                  </div>
                  <div className="d-flex justify-content-center mb-1">
                    <CardTitle tag="h5">Instagram </CardTitle>
                  </div>
                  <div className="d-flex justify-content-center ">
                    <CardSubtitle className="mb-1 text-muted" tag="h6">
                      Buisiness Location
                    </CardSubtitle>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
          <Col md="3">
            <Card className="py-3 mb-2" onClick={toggleYoutube}>
              <div
                style={{ cursor: 'pointer' }}
                className="d-flex justify-content-center align-items-center h-100 w-100"
              >
                <div>
                  <div className="d-flex justify-content-center mb-1">
                    <BsYoutube size={40} color="#c4302b" />
                  </div>
                  <div className="d-flex justify-content-center mb-1">
                    <CardTitle tag="h5">Youtube </CardTitle>
                  </div>
                  <div className="d-flex justify-content-center ">
                    <CardSubtitle className="mb-1 text-muted" tag="h6">
                      Buisiness Location
                    </CardSubtitle>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
          <Col md="3">
            <Card className="py-3 mb-2" onClick={toggleTiktok}>
              <div
                style={{ cursor: 'pointer' }}
                className="d-flex justify-content-center align-items-center h-100 w-100"
              >
                <div>
                  <div className="d-flex justify-content-center mb-1">
                    <SiTiktok size={40} color="#EE1D52" />
                  </div>
                  <div className="d-flex justify-content-center mb-1">
                    <CardTitle tag="h5">Tiktok </CardTitle>
                  </div>
                  <div className="d-flex justify-content-center ">
                    <CardSubtitle className="mb-1 text-muted" tag="h6">
                      Buisiness Location
                    </CardSubtitle>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
          {/* <div className="d-flex justify-content-end  mt-3 p-4">
            <Button
              color="primary"
              className="btn-next  "
              onClick={() => history.push('/mysocial/socialconnect')}
            >
              <span className="align-end d-sm-inline-block d-none">Submit</span>
            </Button>
          </div> */}
        </Row>

        <Modal
          isOpen={modal}
          toggle={toggle}
          fullscreen="xl"
          size="lg"
          centered="true"
          scrollable="true"
        >
          <ModalHeader toggle={toggle} close={closeBtn}>
            <div className="d-flex">
              <div className="fbicon ">
                <FaFacebook
                  style={{ marginTop: '14px' }}
                  className=" fbiconmain"
                  size={45}
                  color="blue"
                />
              </div>
              <div className="p-1">
                <h3>Connect page</h3>
                <p>Select what type of page you want to connect</p>
              </div>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className=" ">
              <div className=" ">
                <Row>
                  {numberofpage && (
                    <>
                      {numberofpage?.map((value) => (
                        <Col key={value?.id} lg="4" md="4" sm="6">
                          <Card
                            onClick={() => {
                              setActive(value);
                              handleConnect(value);
                            }}
                            className={`list-group-item ${active == value && 'active'} `}
                            style={{
                              height: '14rem',
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
                      <Col lg="4" md="4" sm="6">
                        <Card
                          style={{
                            height: '14rem'
                          }}
                          className=""
                          onClick={componentClicked}
                          callback={responseFacebook}
                        >
                          <div className="d-flex justify-content-center align-items-center">
                            <div>
                              <div className="d-flex justify-content-center mt-3">
                                <BsFlag size={40} color="#6464dd" />
                              </div>

                              <div className="d-flex justify-content-center mb-1">
                                <FacebookLogin
                                  returnScopes="true"
                                  // appId="126819523670562"
                                  appId="310109620967829" //ankit sir business account
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
              </div>
            </div>
          </ModalBody>
          <ModalFooter className="mb-1">
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
                  </>
                )}
              </>
            )}
          </ModalFooter>
        </Modal>
        <Modal
          isOpen={modalOne}
          toggle={toggleOne}
          // fullscreen="xl"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          // size="md"
          // centered="true"
          scrollable="false"
        >
          <ModalHeader toggle={toggleOne} close={closeBtnOne}>
            <div className="d-flex">
              <div className="p-2">
                <FcGoogle size={45} color="blue" />
              </div>
              <div className="p-1">
                <h3>Connect Google</h3>
                <p>Select what type of page you want to connect</p>
              </div>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="d-flex justify-content-center ">
              <div className=" d-flex">
                <Card
                  style={{
                    width: '18rem',
                    height: '18rem'
                  }}
                  className="p-2  m-2 "
                >
                  <div className="d-flex justify-content-center align-items-center h-100 w-100">
                    <div>
                      <div className="d-flex justify-content-center mb-1">
                        <AiOutlineHome size={40} color="#6464dd" />
                      </div>
                      <div className="d-flex justify-content-center mb-1">
                        {loader === true ? (
                          <>
                            <h5 style={{ color: '#907e01' }}>Connecting...</h5>
                          </>
                        ) : (
                          <>
                            <LoginSocialGoogle
                              redirect_uri="http://localhost:3000/createworkspace"
                              scope="email profile"
                              client_id="963260624795-hmneh782u004sl7o10eflmmqtiuu2h7t.apps.googleusercontent.com"
                              client_secret="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"
                              // redirect_uri="https://mymanager.com"
                              // scope="email profile"
                              // client_id="194928094285-8pbjlhcaal8ilj07lmkcbcd5pv1ghv7j.apps.googleusercontent.com"
                              // client_secret="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"
                              onLoginStart={onLoginStart}
                              onResolve={({ provider, data }) => {
                                handleLogin(provider, data);
                                setProvider(provider);
                                setProfile(data);
                              }}
                              onReject={(err) => {}}
                            >
                              <span className="txt">Login With google</span>
                            </LoginSocialGoogle>
                          </>
                        )}
                      </div>
                      <div className="d-flex justify-content-center ">
                        <CardSubtitle className="mb-1 text-muted" tag="h6">
                          Buisiness Profile
                        </CardSubtitle>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </ModalBody>
        </Modal>
        <Modal
          isOpen={modalTwo}
          toggle={toggleTwo}
          fullscreen="xl"
          size="md"
          centered="true"
          scrollable="false"
        >
          <ModalHeader toggle={toggleTwo} close={closeBtnTwo}>
            <div className="d-flex">
              <div className="p-2">
                {' '}
                <Twitter size={40} color="#00acee" />
              </div>
              <div className="p-1">
                <h3>Connect Twitter</h3>
                <p>Select what type of page you want to connect</p>
              </div>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="d-flex justify-content-center ">
              <div className=" d-flex">
                <Card
                  style={{
                    width: '18rem',
                    height: '18rem'
                  }}
                  className="p-2  m-2 "
                >
                  <div className="d-flex justify-content-center align-items-center h-100 w-100">
                    <div>
                      <div className="d-flex justify-content-center mb-1">
                        <AiOutlineHome size={40} color="#6464dd" />
                      </div>
                      <div className="d-flex justify-content-center mb-1">
                        {/* <TwitterLogin
                          authCallback={authHandler}
                          consumerKey="OJW2dPMR1yUBuosKxMYfwi4pc"
                          consumerSecret="xosmBnv31qBe26OEpc0ePBIPQllfJiOXBDQntDMS1oLT3hTlTf"
                          cssClass=""
                        /> */}
                        <LoginSocialTwitter
                          // isOnlyGetToken
                          consumerSecret="xosmBnv31qBe26OEpc0ePBIPQllfJiOXBDQntDMS1oLT3hTlTf"
                          client_id="OJW2dPMR1yUBuosKxMYfwi4pc"
                          // client_id={process.env.REACT_APP_TWITTER_V2_APP_KEY || ''}
                          redirect_uri={REDIRECT_URI}
                          onLoginStart={onLoginStart}
                          onResolve={({ provider, data }) => {
                            setProvider(provider);
                            setProfile(data);
                          }}
                          onReject={(err) => {
                            // console.log(err);
                          }}
                        >
                          <span className="">Login With Twittor</span>
                        </LoginSocialTwitter>
                        {/* <CardTitle tag="h5">Add Twitter</CardTitle> */}
                      </div>
                      <div className="d-flex justify-content-center ">
                        <CardSubtitle className="mb-1 text-muted" tag="h6">
                          Buisiness Profile
                        </CardSubtitle>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggleTwo}>
              Connect Page
            </Button>{' '}
          </ModalFooter>
        </Modal>
        <Modal
          isOpen={modalLinkdin}
          toggle={toggleLinkdin}
          fullscreen="xl"
          size="md"
          centered="true"
          scrollable="false"
        >
          <ModalHeader toggle={toggleLinkdin} close={closeBtnLinkdin}>
            <div className="d-flex">
              <div className="p-2">
                {' '}
                <Linkedin size={40} color="#0A66C2" />
              </div>
              <div className="p-1">
                <h3>Connect Linkedin</h3>
                <p>Select what type of page you want to connect</p>
              </div>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="d-flex justify-content-center ">
              <div className=" d-flex">
                <Card
                  style={{
                    width: '18rem',
                    height: '18rem'
                  }}
                  className="p-2  m-2 "
                >
                  <div className="d-flex justify-content-center align-items-center h-100 w-100">
                    <div>
                      <div className="d-flex justify-content-center mb-1">
                        <AiOutlineHome size={40} color="#6464dd" />
                      </div>
                      <div className="d-flex justify-content-center mb-1">
                        <CardTitle>
                          <LoginSocialLinkedin
                            client_id="77gjlb9q0zg0o1"
                            client_secret="9alhNVMNJySCjDct"
                            // client_id="785keg02x0py91"
                            // client_secret="lrOCXYnzetACKPBj"
                            // client_id="772q3ncn5fxbar"
                            // client_secret="XG0SS75zNtubiBKG"
                            // redirect_uri={REDIRECT_URI}
                            redirect_uri="http://localhost:3000/mysocial/createworkspace"
                            // redirect_uri="http://localhost:3001"
                            // redirect_uri="https://192.168.1.4:3000/createworkspace"
                            onLoginStart={onLoginStart}
                            returnScopes="true"
                            onResolve={({ provider, data }) => {
                              setProvider(provider);
                              setProfile(data);
                            }}
                            onReject={(err) => {
                              // console.log(err);
                            }}
                          >
                            <span className="txt">Login With linkedin</span>
                          </LoginSocialLinkedin>
                          <h2 onClick={linkedInLogin}>new login</h2>
                        </CardTitle>
                      </div>
                      <div className="d-flex justify-content-center ">
                        <CardSubtitle className="mb-1 text-muted" tag="h6">
                          Buisiness Profile
                        </CardSubtitle>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggleLinkdin}>
              Connect Page
            </Button>{' '}
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={modalInstagram}
          toggle={toggleInstagram}
          fullscreen="xl"
          size="md"
          centered="true"
          scrollable="false"
        >
          <ModalHeader toggle={toggleInstagram} close={closeBtnInstagram}>
            <div className="d-flex">
              <div className="p-2">
                {' '}
                <BsInstagram size={40} color="#E1306C" />
              </div>
              <div className="p-1">
                <h3>Connect Instagram</h3>
                <p>Select what type of page you want to connect</p>
              </div>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="d-flex justify-content-center ">
              <div className=" d-flex">
                <Card
                  style={{
                    width: '18rem',
                    height: '18rem'
                  }}
                  className="p-2  m-2 "
                >
                  <div className="d-flex justify-content-center align-items-center h-100 w-100">
                    <div>
                      <div className="d-flex justify-content-center mb-1">
                        <AiOutlineHome size={40} color="#6464dd" />
                      </div>
                      <div className="d-flex justify-content-center mb-1">
                        <InstagramLogin
                          clientId="552952820005332"
                          buttonText="Login"
                          scope="user_profile,user_media"
                          onSuccess={responseInstagram}
                          onFailure={responseInstagram}
                        />
                        <LoginSocialInstagram
                          client_id="552952820005332"
                          scope="user_profile,user_media"
                          // client_id={process.env.REACT_APP_INSTAGRAM_APP_ID || ''}
                          // client_secret={process.env.REACT_APP_INSTAGRAM_APP_SECRET || ''}
                          client_secret="ef6d1470e7451d2105903fa797c80e6a"
                          redirect_uri="https://mymanager.com/"
                          // redirect_uri={REDIRECT_URI}
                          onLoginStart={onLoginStart}
                          onResolve={({ provider, data }) => {
                            // onResolve={({ provider, data }: IResolveParams) => {
                            // console.log(provider, data);
                            setProvider(provider);
                            setProfile(data);
                            // console.log(IResolveParams);
                          }}
                          onReject={(err) => {
                            // console.log(err);
                          }}
                        >
                          <span className="txt">Login With instagram</span>
                        </LoginSocialInstagram>
                      </div>
                      <div className="d-flex justify-content-center "></div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </ModalBody>
        </Modal>

        <Modal
          isOpen={modalYoutube}
          toggle={toggleYoutube}
          fullscreen="xl"
          size="md"
          centered="true"
          scrollable="false"
        >
          <ModalHeader toggle={toggleYoutube} close={closeBtnYoutube}>
            <div className="d-flex">
              <div className="p-2">
                {' '}
                <BsYoutube size={40} color="#c4302b" />
              </div>
              <div className="p-1">
                <h3>Connect Youtube</h3>

                <p>Select what type of page you want to connect</p>
              </div>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="d-flex justify-content-center ">
              <div className=" d-flex">
                <Card
                  style={{
                    width: '18rem',
                    height: '18rem'
                  }}
                  className="p-2  m-2 "
                >
                  <div className="d-flex justify-content-center align-items-center h-100 w-100">
                    <div>
                      <div className="d-flex justify-content-center mb-1">
                        <AiOutlineHome size={40} color="#6464dd" />
                      </div>
                      <div className="d-flex justify-content-center mb-1">
                        <LoginSocialGoogle
                          redirect_uri="http://localhost:3001"
                          // isOnlyGetToken
                          client_id="194928094285-8pbjlhcaal8ilj07lmkcbcd5pv1ghv7j.apps.googleusercontent.com"
                          client_secret="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"
                          // client_id={process.env.REACT_APP_GG_APP_ID || ''}
                          onLoginStart={onLoginStart}
                          onResolve={({ provider, data }) => {
                            handleLogin(provider, data);
                            setProvider(provider);
                            setProfile(data);
                          }}
                          onReject={(err) => {
                            // console.log(err);
                          }}
                        >
                          <span className="txt">Login With google</span>
                        </LoginSocialGoogle>
                      </div>
                      <div className="d-flex justify-content-center ">
                        <CardSubtitle className="mb-1 text-muted" tag="h6">
                          Buisiness Profile
                        </CardSubtitle>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </ModalBody>
        </Modal>
        <Modal
          isOpen={modalTiktok}
          toggle={toggleTiktok}
          fullscreen="xl"
          size="md"
          centered="true"
          scrollable="false"
        >
          <ModalHeader toggle={toggleTiktok} close={closeBtnTiktok}>
            <div className="d-flex">
              <div className="p-2">
                {' '}
                <SiTiktok size={40} color="#EE1D52" />
              </div>
              <div className="p-1">
                <h3>Connect Tiktok</h3>

                <p>Select what type of page you want to connect</p>
              </div>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="d-flex justify-content-center ">
              <div className=" d-flex">
                <Card
                  style={{
                    width: '18rem',
                    height: '18rem'
                  }}
                  className="p-2  m-2 "
                >
                  <div className="d-flex justify-content-center align-items-center h-100 w-100">
                    <div>
                      <div className="d-flex justify-content-center mb-1">
                        <AiOutlineHome size={40} color="#6464dd" />
                      </div>
                      <div className="d-flex justify-content-center mb-1">
                        <CardTitle>
                          <LoginSocialTiktok
                            client_key={process.env.REACT_APP_TIKTOK_CLIENT_KEY}
                            redirect_uri={REDIRECT_URI}
                            onLoginStart={onLoginStart}
                            onResolve={({ provider, data }) => {
                              setProvider(provider);
                              setProfile(data);
                            }}
                            onReject={(err) => {
                              // `console`.log(err);
                            }}
                            className="pinterest-btn"
                          >
                            <span className="txt">Login With Tiktok</span>
                          </LoginSocialTiktok>
                        </CardTitle>
                      </div>
                      <div className="d-flex justify-content-center ">
                        <CardSubtitle className="mb-1 text-muted" tag="h6">
                          Buisiness Profile
                        </CardSubtitle>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggleTiktok}>
              Connect Page
            </Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
};
export default WorkspaceSocial;
