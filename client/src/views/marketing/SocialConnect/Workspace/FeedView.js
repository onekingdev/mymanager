import React, { useState, useEffect } from 'react';
import {
  Badge,
  Button,
  Card,
  CardBody,
  Col,
  Input,
  Row,
  Spinner,
  Toast,
  UncontrolledPopover
} from 'reactstrap';
import banner1 from '../../../../assets/images/banner/default.png';
import '@styles/react/libs/flatpickr/flatpickr.scss';

import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { AiFillDelete, AiOutlineDown } from 'react-icons/ai';
import { AiOutlineCheckCircle, AiOutlineArrowDown } from 'react-icons/ai';
import { BsFacebook, BsCheck2All } from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa';
import Moment from 'react-moment';
import moment from 'moment';

import '../../../../assets/styles/socialconnect.scss';
import {
  createFacebookPagePost,
  deleteComment,
  deleteCompose,
  editComposePost,
  editWorkSpace,
  facebookSchedulePost,
  getComposePost,
  getComposePostById,
  refreshPageTokenFb,
  refreshTokenFb,
  viewOneWorkspace
} from '../../../../requests/Planable';
import { Tooltip } from 'reactstrap';
import { toast } from 'react-toastify';
import axios from 'axios';

const MySwal = withReactContent(Swal);

const FeedView = ({ args, ResComose, setResComose }) => {
  const ResComoseprop = ResComose;
  const setResComoseprop = setResComose;

  const [active, setActive] = useState(null);
  const [activecheck, setActivecheck] = useState(null);
  const [data, setData] = useState([]);
  const [text, setText] = useState('');
  const [FbComment, setFbComment] = useState([]);
  const [date, setDate] = useState(new Date());
  const [postLoader, setpostLoader] = useState(false);
  const [syncloader, setSyncLoader] = useState(false);

  const [viewOne, setViewOne] = useState({});
  const [ShowComment, setShowComment] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipOpenone, setTooltipOpenone] = useState(false);
  const [tooltipOp, setTooltipOp] = useState(false);
  const [tooltipOpone, setTooltipOpone] = useState(false);
  const [loader, setLoader] = useState(false);
  const [delcomm, setDelcomm] = useState('');
  const [fbpostdel, setfbpostdel] = useState(false);
  const [currentime, setcurrentime] = useState('');

  const [FBPost, setFBpost] = useState();
  const [indexofPost, setindexofPost] = useState('');
  const [index, setindex] = useState('');
  const [DateTime, setDateTime] = useState('');
  const [DateShow, setDateShow] = useState(false);
  const [FbPagesData, setFbPagesData] = useState([]);
  const [FbViewOne, setFbViewOne] = useState([]);
  const [postingid, setpostingid] = useState({ postngid: '', index: '' });
  const [Postid, setPostid] = useState('');
  const [LoadingCom, setLoadingCom] = useState(false);
  const [coverid, setcoverid] = useState('');
  const [postvalue, setPostValue] = useState();
  const [loaderindex, setloaderindex] = useState('');

  const params = useParams();
  const toggle = () => setTooltipOpen(!tooltipOpen);
  const toggleone = () => setTooltipOpenone(!tooltipOpenone);
  const togglesecond = () => setTooltipOp(!tooltipOp);
  const togglesecondone = () => setTooltipOpone(!tooltipOpone);

  const onChange = (value, dateString) => {
  };
  const onOk = (value) => {
    // console.log('onOk: ', value);
  };
  useEffect(() => {
    setInterval(() => {
      setcurrentime(new Date().toLocaleString());
    }, 1000);

    if (fbpostdel === true) {
      GetFbPost(FBPost);
      setfbpostdel(false);
    }
  }, [fbpostdel]);

  useEffect(() => {
    if (postvalue) {
      getOneComment(postvalue, index);
    }
  }, [Postid, delcomm]);

  const handlePost = (value) => {
    const data = {
      message: text,
      access_token: viewOne?.accessToken
    };
    axios
      .post(`https://graph.facebook.com/${value.id}/comments`, data)
      .then((res) => {
        setText('');
        if (res.data.id) {
          setPostid(res.data.id);
          toast.success('Commented succesfully');
        }
      })
      .catch((err) => console.log(err));

    //   .post(
    //     `https://graph.facebook.com/v16.0/${commentId}/comments?message=${replyText}&access_token=${pageAccessToken}&parent_comment_id=${commentId}`
    //   )

    // createFacebookPagePost(fbpost).then((response) => {});
  };

  const getFbCoverImage = (viewonepage) => {
    // console.log(viewonepage.accessToken);
    // console.log(viewonepage.pageId);
    axios
      .get(
        `https://graph.facebook.com/${viewonepage.pageId}?fields=cover&access_token=${viewonepage.accessToken}`
      )
      .then((response) => {
        // console.log(response);
        setcoverid(response.data.id);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get(
        `https://graph.facebook.com/${coverid}?fields=images&access_token=${viewonepage.accessToken}`
      )
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        // console.log(err);
      });
    axios
      .get(
        `https://graph.facebook.com/${coverid}fields=images&access_token=${viewonepage.accessToken}`
      )
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const GetOneWorkSpace = async () => {
    setLoader(true);
    await viewOneWorkspace(params.id).then((response) => {
      // console.log(response);
      if (response?.facebookData.length > 0) {
        setLoader(false);
        GetFbPost(response);
        EditWorkSpace(response);
        setFbViewOne(response?.facebookData[0]);
        setViewOne(response?.facebookData[0]);
        getFbCoverImage(response?.facebookData[0]);
      } else if (response?.googleData.length > 0) {
        setLoader(false);
        setViewOne(response.googleData[0]);
      }
    });
  };
  const EditWorkSpace = (value) => {
    // console.log(value);
    let accesstoken = value.facebookData[0].accessToken;
    let pageId = value.facebookData[0].pageId;

    // const refreshtoken = {
    //   access_token: accesstoken,
    //   page_id: pageId
    // };
    axios
      .get(
        `https://graph.facebook.com/v13.0/${pageId}?fields=access_token&access_token=${accesstoken}`
      )
      .then((res) => {
        // console.log(res.data.access_token);
        const newaccesstoken = res.data.access_token;
        let payload = {
          facebookData: [
            {
              accessToken: newaccesstoken
            }
          ]
        };
        // editWorkSpace(params.id, payload).then((res) => {
        //   console.log(res);
        // });
      });
  };
  const handleSetDateTime = (e, value) => {
    const date = new Date(e.target.value);
    const newdate = date.toISOString().split('T');
    // setDateTime(newdate);
    // console.log(newdate[0]);
    // console.log('time', newdate[1].split('.')[0]);
    if (date && newdate) {
      console.log(value._id);

      let payload = {
        date: newdate[0],
        time: newdate[1].split('.')[0]
      };
      editComposePost(value._id, payload).then((response) => {
        // console.log('dd', response);
        getCompose();
      });
    }
  };

  const HandleEditCompose = (value) => {
    let payload = {
      date: DateTime[0],
      time: DateTime[1].split('.')[0]
    };
    editComposePost(value._id, payload).then((response) => {
      getCompose();
    });
  };
  const handleSyncNow = (value, i) => {
    setloaderindex(i);
    // console.log('handlesync', value?.media_img[0]);
    let editcompose = {
      sync_status: true
    };
    let PostData = {
      page_id: FbViewOne?.pageId,
      access_token: FbViewOne?.accessToken,
      message: value?.desc,
      date: value?.date,
      time: value?.time,
      publish: true,
      image_url: value?.media_img[0]
    };
    if (value?.date !== '' && value?.time !== '' && value?.post_status === false) {
      setSyncLoader(true);
      facebookSchedulePost(PostData)
        .then((res) => {
          // console.log(res);
          if (res.status === true) {
            toast.success('Post has been Schedule');
            editComposePost(value._id, editcompose)
              .then((res) => {
                getCompose();
                GetFbPost(FBPost);
                setSyncLoader(false);
                // console.log(res);
              })
              .catch((err) => {
                setSyncLoader(false);
                console.log(err);
              });
          }
        })
        .catch((err) => {
          setSyncLoader(false);
          toast.error('something went wrong ');
          console.log(err);
        });
    } else {
      if (value?.post_status === true) {
        toast.error('already posted ');
      } else toast.error('please Select date and time');
    }
  };
  const handlePostNow = (value, i) => {
    setloaderindex(i);
    let editcompose = {
      post_status: true
    };
    // console.log(value._id);
    // console.log(value);
    // console.log(value?.media_img[0]);
    let PostData = {
      page_id: FbViewOne?.pageId,
      access_token: FbViewOne?.accessToken,
      message: value?.desc,
      publish: false,
      image_url: value?.media_img[0]
    };
    setpostLoader(true);

    facebookSchedulePost(PostData)
      .then((res) => {
        // console.log(res);
        if (res.status === true) {
          editComposePost(value._id, editcompose)
            .then((res) => {
              // console.log(res);
              GetFbPost(FBPost);
              getCompose();
              setpostLoader(false);
            })
            .catch((err) => {
              setpostLoader(false);

              // console.log(err);
            });
          toast.success('Posted ');
        }
      })
      .catch((err) => {
        console.log(err);
        setpostLoader(false);
        toast.error('something went wrong ');
      });
  };
  const handleDeletePostCompose = (id) => {
    deleteCompose(id).then((res) => {
      // console.log(res);
      getCompose();
    });
  };
  const handleDeletePost = (value, i) => {
    setindexofPost(i);
    // console.log(i);
    axios
      .delete(`https://graph.facebook.com/${value.id}?access_token=${FbViewOne.accessToken}`)
      .then((res) => {
        // console.log(res);
        if (res.data.success === true) {
          setfbpostdel(true);
          toast.success('Post Deleted');
          i.remove();
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const handleDelete = async (value) => {
    axios
      .delete(`https://graph.facebook.com/${value.id}?access_token=${FbViewOne.accessToken}`)
      .then((res) => {
        console.log(res);
        if (res.data.success === true) {
          setDelcomm(res.data.success);
          toast.success('Comment Deleted sucessfully');
        }
      })
      .catch((err) => {
        // console.log(err);
      });
    // delete method
    // await deleteComment(id).then((res) => {
    //   getOneComment(Id, index);
    // });
  };

  const getOneComment = async (value, i) => {
    setPostValue(value);
    setFbComment('');
    // console.log(value.id, i);
    setpostingid({ postngid: value.id, index: i });
    setShowComment(true);
    // console.log(FbViewOne.accessToken);
    setindex(i);
    setLoadingCom(true);
    axios
      .get(`https://graph.facebook.com/${value.id}/comments?access_token=${FbViewOne.accessToken}`)
      .then((response) => {
        console.log(response?.data?.data);
        setLoadingCom(false);
        setFbComment(response?.data?.data);
      })
      .catch((error) => console.log(error));
  };

  const getCompose = async () => {
    await getComposePostById(params.id).then((res) => {
      console.log(res);
      setData(res);
    });
    // await getComposePost().then((resp) => {
    //   console.log('compose', resp);
    //   setData(resp);
    // });
  };

  const GetFbPost = (value) => {
    // console.log(value);
    setFBpost(value);
    const pageaccesstoken = value?.facebookData[0]?.accessToken;
    axios
      .get(
        `https://graph.facebook.com/me/posts?access_token=${pageaccesstoken}&fields=id,message,created_time,picture,comments{from,message,created_time,comments{from,message,created_time}}`
      )
      .then((response) => {
        console.log(response.data.data);
        setFbPagesData(response.data.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (ResComoseprop === true) {
      getCompose();
      setResComoseprop(false);
    }
  }, [ResComoseprop === true]);

  useEffect(() => {
    getCompose();
    GetOneWorkSpace();
  }, [params]);

  return (
    <>
      {loader === true ? (
        <>
          <h3>Loading...</h3>
        </>
      ) : (
        <div className="userimageworkspce">
          <Row className="userimagemainrow">
            <Col sm={3} md={3} lg={3} className="text-center">
              <Card className="cardmainuserfeed">
                <CardBody className="userimagemain">
                  <img
                    className="mb-1"
                    alt="profile"
                    src={viewOne?.profileImg}
                    style={{
                      border: '1px solid',
                      borderRadius: '50%',
                      width: '134px',
                      height: '125px'
                    }}
                  />
                  <span className="useremail">{viewOne?.email}</span>
                  <h5 className="usernamefeed">{viewOne?.profileName}</h5>
                  <h5 className="usrpagename">{viewOne?.pageName}</h5>
                </CardBody>
              </Card>
            </Col>
            <Col sm={9} md={9} lg={9}>
              <Card>
                <CardBody>
                  <div>
                    <img
                      alt="banner"
                      className="headerimage_user"
                      src={banner1}
                      style={{ height: '200px', width: '100%' }}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            {data?.map((value, i) => (
              <>
                <Col key={value} lg="3" className="mt-14">
                  <Row>
                    <Col lg="4"></Col>
                    <Col lg="8" md="8" sm="8" className="mt-1 iconssidebar">
                      <Row>
                        {syncloader === true && loaderindex === i ? (
                          <>
                            <Col>
                              <div className="d-flex justify-content-end">
                                <Spinner className=" spinnercustom" size="lg">
                                  Loading...
                                </Spinner>
                              </div>
                            </Col>
                          </>
                        ) : (
                          <>
                            <Col>
                              {' '}
                              <span className=" d-flex justify-content-end">
                                <button
                                  style={{
                                    background: `${
                                      value?.sync_status === true ? 'green' : '#d5d5d5'
                                    }`,
                                    cursor: 'pointer'
                                  }}
                                  target="_blank"
                                  disabled={
                                    value?.post_status === true
                                      ? true
                                      : false || value?.sync_status === true
                                      ? true
                                      : false
                                  }
                                  rel="noreferrer"
                                  id="TooltipExample"
                                  placement="left"
                                  onClick={() => {
                                    setActivecheck(value, i);
                                    // setActivecheck(value, i);
                                    handleSyncNow(value, i);
                                  }}
                                  onDoubleClick={() => setActivecheck(null)}
                                  className="circle-bx"
                                >
                                  <BsCheck2All
                                    fill={`${value?.sync_status === true ? 'white' : 'white'}`}
                                    size="18px"
                                  />

                                  <Tooltip
                                    {...args}
                                    placement="left"
                                    isOpen={tooltipOpen}
                                    target="TooltipExample"
                                    toggle={toggle}
                                  >
                                    Sync Now
                                  </Tooltip>
                                </button>
                              </span>
                            </Col>
                          </>
                        )}
                      </Row>
                      <Row>
                        {postLoader === true && loaderindex === i ? (
                          <>
                            <Col>
                              <div className="d-flex justify-content-end">
                                <Spinner className="mt-1 spinnercustom" size="lg">
                                  Loading...
                                </Spinner>
                              </div>
                            </Col>
                          </>
                        ) : (
                          <>
                            <Col>
                              <span className=" d-flex justify-content-end mt-1">
                                <button
                                  style={{
                                    background: `${
                                      value?.post_status === true ? 'blue' : '#d5d5d5'
                                    }`,

                                    cursor: 'pointer'
                                  }}
                                  target="_blank"
                                  placement="left"
                                  rel="noreferre"
                                  id="TooltipExamp"
                                  disabled={
                                    value?.post_status === true
                                      ? true
                                      : false || value?.sync_status === true
                                      ? true
                                      : false
                                  }
                                  onClick={() => {
                                    setActive(value, i);
                                    handlePostNow(value, i);
                                  }}
                                  onDoubleClick={() => setActive(null)}
                                  className="circle-bx"
                                >
                                  <Tooltip
                                    {...args}
                                    placement="left"
                                    isOpen={tooltipOp}
                                    target="TooltipExamp"
                                    toggle={togglesecond}
                                  >
                                    {value?.post_status === true ? 'Posted' : 'Post Now'}
                                  </Tooltip>
                                  <FaFacebookF
                                    style={
                                      {
                                        // background: 'blue'
                                      }
                                    }
                                    fill={`${value?.post_status === true ? 'white' : 'white'}`}
                                    className="mb-1 customclassfb"
                                    size="18px"
                                  />
                                </button>
                              </span>
                            </Col>
                          </>
                        )}
                      </Row>
                      <Row>
                        <Col>
                          <span className=" d-flex justify-content-end mt-1 mb-1">
                            <button
                              style={{
                                background: '#d5d5d5',
                                cursor: 'pointer'
                              }}
                              onClick={() => handleDeletePostCompose(value?._id)}
                              className="circle-bx deletebuttoncompose"
                            >
                              <AiFillDelete
                                className="aifilldelete"
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleDeletePostCompose(value?._id)}
                                fill="red"
                                size="18px"
                              />
                            </button>
                          </span>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col sm={5} md={5} lg={5} className="mt-1">
                  <div className="post-main " key={value._id}>
                    <Card>
                      <CardBody className="datamaincopose">
                        <div className="post-box">
                          <Row>
                            <Col lg="7" md="7" sm="7">
                              {value?.date == '' ||
                              (value?.time == '' && value?.post_status === false) ? (
                                <>
                                  <Input
                                    style={{ cursor: 'pointer' }}
                                    // data-date-format="dd-mm-yy"
                                    data-date-format="yyyy-mm-dd"
                                    size="sm"
                                    id="customcalenderdta"
                                    min={moment(currentime).format().split('+')[0]}
                                    // max="2023-04-28T00:00"
                                    className="form-control customedatatime mt-1 mb-1"
                                    placeholder="dssdsdjl"
                                    type="datetime-local"
                                    onChange={(e) => {
                                      handleSetDateTime(e, value);
                                    }}
                                  />
                                </>
                              ) : null}
                            </Col>
                            <Col lg="5" md="7" sm="5" className="d-flex justify-content-end">
                              {/* <span className="">
                                <AiFillDelete
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => handleDeletePostCompose(value?._id)}
                                  fill="red"
                                  size="18px"
                                />
                              </span> */}
                            </Col>
                          </Row>
                          <div className="post-header ">
                            <div className="d-flex">
                              <img
                                className="mb-1"
                                alt="profile"
                                src={viewOne?.profileImg}
                                // src={value?.media_img[0]}
                                style={{
                                  border: '1px solid',
                                  borderRadius: '50%',
                                  width: '40px',
                                  height: '40px'
                                }}
                              />

                              <div className="ml-1 profilename">
                                <h5 className="">
                                  {viewOne?.profileName}
                                  <p className="font-s momentdate">
                                    <Moment format="MMM Do YYYY">{value?.createdAt}</Moment>
                                  </p>
                                </h5>
                              </div>
                            </div>

                            <p style={{ fontSize: '16px' }}>{value?.desc?.slice(0, 35)}</p>
                          </div>
                          <div className="post-content">
                            {value?.media_img.length > 0 ? (
                              <>
                                <img
                                  className="mb-1"
                                  alt=""
                                  src={value?.media_img[0]}
                                  style={{
                                    width: '100%'
                                  }}
                                />
                              </>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                </Col>
                <Col lg="4" sm="4" xs="4"></Col>
              </>
            ))}
            {FbPagesData !== '' ? (
              <>
                {FbPagesData?.map((value, i) => (
                  <>
                    <Col key={i} lg="3" sm={3} md="3" className="mt-14">
                      <Row>
                        <Col lg="8"></Col>
                        <Col lg="4" md="4" sm="4" className="mt-1">
                          <Row>
                            <span className=" d-flex justify-content-right circlecheckdata">
                              <div
                                style={{ cursor: 'pointer' }}
                                target="_blank"
                                rel="noreferrer"
                                id="TooltipExamplesync"
                                placement="left"
                                // onClick={() => {
                                //   setActivecheck(value, i);
                                //   handleSyncNow(value);
                                // }}
                                // onDoubleClick={() => setActivecheck(null)}
                                className="circle-bx"
                              >
                                <BsCheck2All
                                  fill="gery"
                                  className="mb-1 aioutlinecheck"
                                  size="18px"
                                />
                              </div>
                            </span>
                          </Row>
                          <Row>
                            <span className=" d-flex justify-content-right mt-1">
                              <div
                                style={{ cursor: 'pointer' }}
                                className="posteddatafb circle-bx fbbtn"
                                target="_blank"
                                placement="left"
                                rel="noreferre"
                                id="TooltipExampposted"
                                // onClick={() => {
                                //   setActive(value, i);
                                //   handlePostNow(value);
                                // }}
                                // onDoubleClick={() => setActive(null)}
                              >
                                <Tooltip
                                  {...args}
                                  placement="left"
                                  isOpen={tooltipOpone}
                                  target="TooltipExampposted"
                                  toggle={togglesecondone}
                                >
                                  Posted
                                </Tooltip>
                                <FaFacebookF className=" facebookicon" fill="white" size="18px" />
                              </div>
                            </span>
                          </Row>
                          <Row>
                            <Col>
                              <span className=" d-flex justify-content-end mt-1 mb-1">
                                <button
                                  style={{
                                    background: '#d5d5d5',
                                    cursor: 'pointer'
                                  }}
                                  onClick={() => handleDeletePost(value, i)}
                                  className="circle-bx deletebuttoncompose"
                                >
                                  <AiFillDelete
                                    className="aifilldelete"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleDeletePost(value, i)}
                                    fill="red"
                                    size="18px"
                                  />
                                </button>
                              </span>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                    <Col key={i} sm={5} md={5} lg={5} className="">
                      <div className="post-main" key={value.id}>
                        <Card>
                          <CardBody>
                            <div className="post-box">
                              <Row>
                                <Col lg="7">
                                  {value?.date == '' ? (
                                    <>
                                      <Input
                                        size="sm"
                                        id="customcalenderdta"
                                        min="2023-03-07T00:00"
                                        max="2023-04-28T00:00"
                                        className="form-control customedatatime mt-1"
                                        placeholder="time placeholder"
                                        type="datetime-local"
                                        onChange={handleSetDateTime}
                                      />
                                    </>
                                  ) : null}
                                </Col>
                                <Col lg="5" className="d-flex justify-content-end">
                                  <span className="">
                                    {/* <AiFillDelete
                                      style={{ cursor: 'pointer' }}
                                      onClick={() => handleDeletePost(value, i)}
                                      fill="red"
                                      size="16px"
                                    /> */}
                                  </span>
                                </Col>
                              </Row>
                              <div className="post-header ">
                                <div className="d-flex">
                                  <img
                                    className="mb-1 mr-1"
                                    alt="profile"
                                    src={viewOne?.profileImg}
                                    // src={value?.media_img[0]}
                                    style={{
                                      border: '1px solid',
                                      borderRadius: '50%',
                                      width: '42px',
                                      height: '42px'
                                    }}
                                  />
                                  {/* {value?.media_img?.length == 0 ? null : (
                                    <>
                                      <div className="mr-1">
                                        <img
                                          className="mb-1 mr-1"
                                          alt="profile"
                                          src={viewOne?.profileImg}
                                          // src={value?.media_img[0]}
                                          style={{
                                            border: '1px solid',
                                            borderRadius: '50%',
                                            width: '42px',
                                            height: '42px'
                                          }}
                                        />
                                      </div>
                                    </>
                                  )} */}
                                  <div className="ml-1 profilename">
                                    <h5 className="">
                                      {viewOne?.profileName}
                                      <p className="font-s momentdate">
                                        {/* <Moment format="DD/MM/YYYY">{value?.createdAt}</Moment> */}
                                        <Moment format="MMM Do YYYY">{value?.created_time}</Moment>
                                      </p>
                                    </h5>
                                  </div>
                                </div>

                                <p style={{ fontSize: '18px' }}>{value?.message?.slice(0, 35)}</p>
                              </div>
                              <div className="post-content">
                                {value?.picture !== '' ? (
                                  <>
                                    <img
                                      className="mb-1"
                                      alt=""
                                      src={value?.picture}
                                      style={{
                                        width: '100%'
                                      }}
                                    />
                                  </>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </div>
                    </Col>
                    <Col key={i} sm={4} md={4} lg={4} className="">
                      <Col key={value?.id}>
                        <Card>
                          <div className="mt-1 mb-1 comments">
                            <a
                              onClick={() => {
                                getOneComment(value, i);
                              }}
                              className="commenttext"
                            >
                              <img
                                className="customcommetimage"
                                alt="profile"
                                src={viewOne?.profileImg}
                                style={{
                                  border: '1px solid',
                                  borderRadius: '50%',
                                  width: '25px',
                                  height: '25px'
                                }}
                              />
                              <span className="mx-1"> Comments</span>
                            </a>
                          </div>
                          {ShowComment === true && index == i ? (
                            <>
                              <div>
                                <CardBody className="comment textbox">
                                  <div className="comment-box ">
                                    <div className="comt-list">
                                      <ul>
                                        <div className="comt-form">
                                          <textarea
                                            value={text}
                                            onChange={(e) => setText(e.target.value)}
                                            className="form-control"
                                            placeholder="Comment...."
                                          ></textarea>
                                          {text.length > 1 ? (
                                            <>
                                              <Badge
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => handlePost(value)}
                                                className=" postbtn"
                                                color="primary"
                                              >
                                                <span
                                                  className=" d-flex postcommentbtn"
                                                  style={{ fontSize: '10px' }}
                                                >
                                                  Post
                                                </span>
                                              </Badge>
                                              {/* <button
                                                  size="sm"
                                                  // onClick={(e) => handlePost(e, value?._id)}
                                                  className="btn btn-primary mt-2 mr-2 postbtn"
                                                >
                                                  
                                                </button> */}
                                            </>
                                          ) : (
                                            <>
                                              <Badge
                                                style={{ cursor: 'pointer' }}
                                                color="secondary"
                                                className=" postbtn"
                                              >
                                                <span
                                                  className="d-flex postcommentbtn"
                                                  style={{ fontSize: '10px' }}
                                                >
                                                  Post
                                                </span>
                                              </Badge>
                                              {/* <Button className="secondary mt-2 mr-2 postbtn">
                                                  Post
                                                </Button> */}
                                            </>
                                          )}
                                        </div>
                                        {ShowComment === true && index == i ? (
                                          <>
                                            {LoadingCom === true ? (
                                              <>
                                                <p style={{ fontSize: '11px' }} className="mt-1">
                                                  Loading comments..
                                                </p>
                                              </>
                                            ) : (
                                              <>
                                                {FbComment !== '' ? (
                                                  <>
                                                    {FbComment?.map((value) => (
                                                      <>
                                                        {/* <div className="commetsnow">
                                                          <Row className="rowofcomment">
                                                            <div className="nameofpersone ">
                                                              <div className="d-flex ">
                                                                <span className="companyname justify-content-start ">
                                                                  sveltose technology
                                                                </span>
                                                                <div className="deletebuttonmain">
                                                                  <span className="commethere  justify-content-end">
                                                                    hello
                                                                  </span>
                                                                </div>
                                                              </div>
                                                              <span className="commetnshereyour">
                                                                comment
                                                              </span>
                                                            </div>
                                                          </Row>
                                                        </div> */}
                                                        <li key={value?.id}>
                                                          <div className=" d-flex justify-content-end deletecoment mt-1">
                                                            <div className="deletecoment">
                                                              <AiFillDelete
                                                                style={{ cursor: 'pointer' }}
                                                                onClick={() => handleDelete(value)}
                                                                fill="red"
                                                                size="15px"
                                                              />
                                                            </div>
                                                          </div>
                                                          <div className="d-flex">
                                                            {/* <img
                                                              className="mb-1"
                                                              alt="profile"
                                                              src={viewOne?.profileImg}
                                                              style={{
                                                                border: '1px solid',
                                                                borderRadius: '50%',
                                                                width: '30px',
                                                                height: '30px'
                                                              }}
                                                            /> */}

                                                            {/* <h5 className="mr-1">You</h5> */}

                                                            {/* <h5
                                                              style={{ fontSize: '13px' }}
                                                              className="createdtimeworkapce"
                                                            >
                                                              <p>
                                                                {' '}
                                                                <Moment format="MMM Do YYYY">
                                                                  {value?.created_time}
                                                                </Moment>
                                                              </p>
                                                            </h5> */}
                                                          </div>
                                                          <div
                                                            style={{ fontSize: '12px' }}
                                                            className="commet-msg"
                                                          >
                                                            <span>
                                                              <b>
                                                                <Moment format="MMM Do YYYY">
                                                                  {value?.created_time}
                                                                </Moment>
                                                              </b>
                                                            </span>
                                                            <p
                                                              className="messagefrom"
                                                              style={{ marginBottom: '0px' }}
                                                            >
                                                              {value?.message}
                                                            </p>

                                                            <p
                                                              style={{ fontSize: '12px' }}
                                                              className=""
                                                            >
                                                              {value?.from?.name != '' &&
                                                              value?.from ? (
                                                                <>
                                                                  from-
                                                                  {value?.from?.name}
                                                                </>
                                                              ) : null}
                                                            </p>
                                                          </div>
                                                        </li>
                                                      </>
                                                    ))}
                                                  </>
                                                ) : null}
                                              </>
                                            )}
                                          </>
                                        ) : null}
                                      </ul>
                                    </div>
                                  </div>
                                </CardBody>
                              </div>
                            </>
                          ) : null}
                        </Card>
                      </Col>
                    </Col>
                  </>
                ))}
              </>
            ) : null}
          </Row>
        </div>
      )}
    </>
  );
};
export default FeedView;
