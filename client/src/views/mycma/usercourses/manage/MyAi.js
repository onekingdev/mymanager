import { useDispatch, useSelector } from 'react-redux';
import { Fragment, useState, useContext, useEffect } from 'react';
import { Row, Col, Card, CardBody, Input, Button, Modal, Spinner } from 'reactstrap';
import { AiOutlineEdit, AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { getUserData } from '../../../../auth/utils';
import { getVideos } from '../store';
import VideoModal from './video/VideoModal';
import EditModal from './video/EditModal';
import axios from 'axios';

const MyAi = () => {
  const dispatch = useDispatch();
  const [videos, setVideos] = useState([]);
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [isLoading, setLoading] = useState(false);
  // const [currentDownload, setCurrentDownLoad] = useState({});
  const [video, setVideo] = useState({});
  const store = useSelector((state) => state.course);

  const toggle = (video) => {
    setVideo(video);
    setModal(!modal);
  }

  const handleDelete = (video_id) => {
    const options = {
      method: 'DELETE',
      headers: {'accept': 'application/json', 'authorization': '9fce07dd3513a2db4560776814221276'},
    };
    fetch(`https://api.synthesia.io/v2/videos/${video_id}`, options)
    .then(res => {
      getVideos();
      success('Video Deleted Successfuly');
    })
    .catch(function (error) {
      console.error(error);
    });
  }

  const handleEdit = (video_id) => {
    setVideoId(video_id);
    setEditModal(!editModal);
  }
  const VideoCard = ({ video }) => {
    return (
      <Card key={video._id}>
        <CardBody>
          <Row className="align-items-center">
            <Col md="2">
              <img
                src={video.eventBanner ? video.eventBanner : 'https://mymanager.com/assets/images/photo.png'}
                height="70"
                Width="70"
                alt="Event Image"
                key={video._id}
              />
            </Col>
            <Col md="3">
              <div className="d-flex flex-column">
                <span className="h4">{video.title}</span>
                <span>
                  {video.eventAddress}
                </span>
              </div>
            </Col>
            <Col md="5">
              <div className="d-flex flex-column">
                <span className="text-nowrap">
                  From <b>{formatDate(getEventStartTime(video))}</b> -{' '}<br />               </span>
                <span className="text-nowrap">
                  To <b>{formatDate(getEventEndTime(video))}</b>
                </span>
              </div>
            </Col>
            <Col md="2" className="d-flex justify-content-end">
              <div>
                <AiOutlineDelete
                  className="fs-2 me-1 cursor-pointer"
                  onClick={(e) => handleDelete(video._id)}
                />
                <Link to={`/edit-event/${video._id}`}>
                  <AiOutlineEdit className="fs-2 me-1 cursor-pointer" />
                </Link>
                <Link to={`/event-details/${video._id}`}>
                  <AiOutlineEye className="fs-2 cursor-pointer" />
                </Link>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  };

  const getVideos = () => {
    const options = {
      method: 'GET',
      headers: {'accept': 'application/json', 'authorization': '9fce07dd3513a2db4560776814221276'},
    };
    setLoading(true);
    fetch('https://api.synthesia.io/v2/videos', options)
    .then(res => res.json())
    .then(result => {
      setLoading(false);
      setVideos(result.videos);
    })
    .catch(function (error) {
      console.error(error);
    });
  }

  useEffect(() => {
    // dispatch(getVideos(getUserData().id));
    getVideos();
  }, []);

  return (
    <div>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
                  <label className="mb-0" htmlFor="search-invoice">
                    Search:
                  </label>
                  <Input
                    id="search-invoice"
                    className="ms-50 w-100"
                    type="text"
                  // value={searchTerm}
                  // onChange={(e) => handleFilter(e.target.value)}
                  />
                </div>
                <div>
                  <Link to="/manage-usercourses/myai">
                    <Button color="primary">Add New AI</Button>
                  </Link>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        {/* {store.videos.map((video) => {
            return <VideoCard video={video} />;
          })} */
        }
        {
          !isLoading ? videos.map((item) => {
            console.log("item", item);
            return (
              <div>
                <Card key={item.id}>
                  <CardBody>
                    <Row className="align-items-center">
                      <Col md="2">
                        <video width="70px" height="70px" controls>
                          <source src={item.download} type="video/mp4" />
                        </video>
                      </Col>
                      <Col md="2">
                        <div className="d-flex flex-column">
                          <span className="h4">{item.title}</span>
                        </div>
                      </Col>
                      <Col md="3">
                        <div>
                          <span>
                            {item.description}
                          </span>
                        </div>
                      </Col>
                      <Col md="1"></Col>
                      <Col md="2">
                        <div>
                          <AiOutlineDelete
                            className="fs-2 me-1 cursor-pointer"
                            onClick={() => handleDelete(item.id)}
                          />
                          <AiOutlineEdit className="fs-2 me-1 cursor-pointer" onClick={() => handleEdit(item.id)}/>
                        </div>
                      </Col>
                      <Col md="2" className="d-flex justify-content-end">
                        <div>
                          <Button color="primary" onClick={() => toggle(item)}>View Detail</Button>
                        </div>
                      </Col>
                      <Col>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </div>
            )
          })  : <div className="row">
                  <div style={{ display: 'block', width: 700, padding: 30, position: 'absolute'}} 
                       className="d-flex justify-content-center l-20px">
                    <Spinner style={{ width: '2rem', height: '2rem'}} 
                             children={false} />
                  </div>
                </div>
        }
      </Row>
      <VideoModal modal={modal} toggle={toggle} video={video} />
      <EditModal modal={editModal} handleEdit={handleEdit} videoId={videoId} getVideos={getVideos} />
    </div>
  );
};

export default MyAi;