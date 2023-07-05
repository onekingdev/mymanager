import React, { Fragment, useState, useEffect } from 'react';
import { CheckCircle, Clock } from 'react-feather';
import { Card, CardHeader, Col, Input, Row, Tooltip } from 'reactstrap';
import {
  getComposePost,
  getComposePostById,
  viewOneWorkspace
} from '../../../../requests/Planable';
import '../../../../assets/styles/socialconnect.scss';
import { useParams } from 'react-router-dom';
import Moment from 'react-moment';
import moment from 'moment';

import { BsCardImage, BsCheck2All } from 'react-icons/bs';
import { FaFacebookF, FaRegCheckCircle } from 'react-icons/fa';

import axios from 'axios';

import '../../../../assets/styles/socialconnect.scss';
import {
  createFacebookPagePost,
  deleteComment,
  deleteCompose,
  editComposePost,
  editWorkSpace,
  facebookSchedulePost,
  refreshPageTokenFb,
  refreshTokenFb
} from '../../../../requests/Planable';
import { toast } from 'react-toastify';

const GridView = ({ args, ResComose, setResComose }) => {
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

  const [Postid, setPostid] = useState('');

  const [postvalue, setPostValue] = useState();

  const toggle = () => setTooltipOpen(!tooltipOpen);
  const toggleone = () => setTooltipOpenone(!tooltipOpenone);
  const togglesecond = () => setTooltipOp(!tooltipOp);
  const togglesecondone = () => setTooltipOpone(!tooltipOpone);

  const params = useParams();

  useEffect(() => {
    setInterval(() => {
      setcurrentime(new Date().toLocaleString());
    }, 1000);
    // return () => clearInterval(interval);

    // if (fbpostdel === true) {
    //   GetFbPost(FBPost);
    //   setfbpostdel(false);
    // }
  }, [fbpostdel]);

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
  useEffect(() => {
    if (postvalue) {
      getOneComment(postvalue, index);
    }
  }, [Postid, delcomm]);

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
  const GetFbPost = (value) => {
    // console.log(value);
    setFBpost(value);
    const pageaccesstoken = value?.facebookData[0]?.accessToken;
    axios
      .get(
        `https://graph.facebook.com/me/posts?access_token=${pageaccesstoken}&fields=id,message,created_time,picture,comments{from,message,created_time,comments{from,message,created_time}}`
      )
      .then((response) => {
        // console.log(response.data.data);
        setFbPagesData(response.data.data);
      })
      .catch((error) => console.log(error));
  };

  const handleSyncNow = (value, i) => {
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
  const handlePostNow = (value) => {
    setpostLoader(true);
    let editcompose = {
      post_status: true
    };

    console.log(value);
    let PostData = {
      page_id: FbViewOne?.pageId,
      access_token: FbViewOne?.accessToken,
      message: value?.desc,
      publish: false
    };

    facebookSchedulePost(PostData)
      .then((res) => {
        console.log(res);
        if (res.status === true) {
          editComposePost(value._id, editcompose)
            .then((res) => {
              console.log(res);
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
        setpostLoader(false);
        toast.error('something went wrong ');

        // console.log(err);
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
        // console.log(res);
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
  const handleDeletePostCompose = (id) => {
    deleteCompose(id).then((res) => {
      // console.log(res);
      getCompose();
    });
  };
  const GetOneWorkSpace = async () => {
    setLoader(true);
    await viewOneWorkspace(params.id).then((response) => {
      // console.log(response);
      if (response?.facebookData.length > 0) {
        setLoader(false);
        GetFbPost(response);
        // EditWorkSpace(response);
        setFbViewOne(response?.facebookData[0]);
        setViewOne(response?.facebookData[0]);
      } else if (response?.googleData.length > 0) {
        setLoader(false);
        setViewOne(response.googleData[0]);
      }
    });
  };
  const getCompose = async () => {
    // await getComposePost().then((response) => {
    //   setData(response);
    // });
    await getComposePostById(params.id).then((res) => {
      console.log(res);
      setData(res);
    });
  };

  return (
    <Fragment>
      <Row>
        {data ? (
          <>
            {data?.map((value, i) => (
              <Col sm={3} md={3} lg={3}>
                <Card className="p-1">
                  <Row>
                    <Col lg="6" md="6" sm="6">
                      <h4 className="gridview">{value?.desc?.slice(0, 10)}</h4>
                    </Col>
                    <Col lg="6" md="6" sm="6">
                      <h4 className=" datashow">
                        {value.date !== '' && value.time !== '' ? (
                          <>
                            <Moment format="MMM Do YYYY">{value?.date}</Moment>
                          </>
                        ) : (
                          <>
                            <Input
                              style={{ cursor: 'pointer', border: 'none' }}
                              // data-date-format="dd-mm-yy"
                              data-date-format="yyyy-mm-dd"
                              size="sm"
                              id=""
                              min={moment(currentime).format().split('+')[0]}
                              // max="2023-04-28T00:00"
                              className="form-control customedatatim"
                              placeholder="dssdsdjl"
                              type="datetime-local"
                              onChange={(e) => {
                                handleSetDateTime(e, value);
                              }}
                            />
                          </>
                        )}
                      </h4>
                    </Col>
                  </Row>

                  <div className="">
                    <div className="gd-view">
                      <div className="gd-view">
                        {value?.media_img.length > 0 ? (
                          <>
                            <img
                              width="250px"
                              height="220px"
                              src={value?.media_img[0]}
                              alt="post4"
                              // width="100%"
                            />
                          </>
                        ) : (
                          <BsCardImage
                            fill="#3b13ebcc"
                            className="cscardimage"
                            size={220}
                            width="250px"
                            height="20px"
                          />
                        )}
                      </div>
                    </div>
                    <div className="grid-icon">
                      <button
                        style={{
                          // background: `${value?.post_status === true ? 'blue' : '#d5d5d5'}`,

                          cursor: 'pointer'
                        }}
                        target="_blank"
                        placement="bottom"
                        rel="noreferre"
                        id="TooltipExampstatus"
                        disabled={
                          value?.post_status === true
                            ? true
                            : false || value?.sync_status === true
                            ? true
                            : false
                        }
                        onClick={() => {
                          setActive(value, i);
                          handlePostNow(value);
                        }}
                        onDoubleClick={() => setActive(null)}
                        className=""
                      >
                        <Tooltip
                          {...args}
                          placement="bottom"
                          isOpen={tooltipOp}
                          target="TooltipExampstatus"
                          toggle={togglesecond}
                        >
                          {value?.post_status === true ? 'Posted' : 'Post Now'}
                        </Tooltip>
                        <FaRegCheckCircle
                          // onClick={() => {
                          //   setActive(value, i);
                          //   handlePostNow(value);
                          // }}
                          // style={
                          // {
                          // background: 'blue'
                          // }
                          // }
                          fill={`${value?.post_status === true ? 'blue' : '#0000007a'}`}
                          className="  customclassfb"
                          size="24px"
                        />
                      </button>
                      <button
                        style={{
                          // background: `${value?.sync_status === true ? 'green' : '#d5d5d5'}`,
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
                        id="TooltipExampsync"
                        placement="bottom"
                        onClick={() => {
                          setActivecheck(value, i);
                          // setActivecheck(value, i);
                          handleSyncNow(value);
                        }}
                        onDoubleClick={() => setActivecheck(null)}
                        className=""
                      >
                        <Clock
                          // onClick={() => {
                          //   setActivecheck(value, i);
                          //   // setActivecheck(value, i);
                          //   handleSyncNow(value);
                          // }}
                          size="24px"
                          color={`${value?.sync_status === true ? '#03813b' : '#9c9c9d'}`}
                          style={{ cursor: 'pointer' }}
                        />
                        {/* 
                        <BsCheck2All
                          size="20px"
                        /> */}

                        <Tooltip
                          {...args}
                          placement="bottom"
                          isOpen={tooltipOpen}
                          target="TooltipExampsync"
                          toggle={toggle}
                        >
                          Sync Now
                        </Tooltip>
                      </button>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </>
        ) : (
          <>
            <h3>Loading...</h3>
          </>
        )}
        {FbPagesData !== '' ? (
          <>
            {FbPagesData?.map((value, i) => (
              <Col sm={3} md={3} lg={3}>
                <Card className="p-1">
                  <Row>
                    <Col lg="6" md="6" sm="6">
                      <h4 className="gridview">{value?.message?.slice(0, 10)}</h4>
                    </Col>
                    <Col lg="6" md="6" sm="6">
                      <h4 className=" datashow">
                        {value.created_time !== '' ? (
                          <>
                            <Moment format="MMM Do YYYY">{value?.createdAt}</Moment>
                          </>
                        ) : null}
                      </h4>
                    </Col>
                  </Row>

                  <div className="">
                    <div className="gd-view">
                      {value?.picture ? (
                        <>
                          <img
                            width="250px"
                            height="220px"
                            src={value?.picture}
                            alt="post4"
                            // width="100%"
                          />
                        </>
                      ) : (
                        <BsCardImage
                          fill="#3b13ebcc"
                          className="cscardimage"
                          size={220}
                          width="250px"
                          height="20px"
                        />
                      )}
                    </div>
                    <div className="grid-icon">
                      <span className=" ">
                        <button
                          target="_blank"
                          rel="noreferrerr"
                          id="TooltipExamplegrid"
                          placement="left"
                          // onClick={() => {
                          //   setActive(value, i);
                          //   handlePostNow(value);
                          // }}
                          className=""
                        >
                          <FaRegCheckCircle size={24} fill="blue" className="me-1" />

                          <Tooltip
                            {...args}
                            placement="bottom"
                            isOpen={tooltipOpone}
                            target="TooltipExamplegrid"
                            toggle={togglesecondone}
                          >
                            Posted
                          </Tooltip>
                        </button>
                      </span>

                      <Clock color="#9c9c9d" style={{ cursor: 'pointer' }} size={25} />
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </>
        ) : null}
      </Row>
    </Fragment>
  );
};
export default GridView;
