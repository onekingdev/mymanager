// ** React Imports
import { Fragment, useState, useEffect, useRef } from 'react';
// ** Components
import Sidebar from './CourseSidebar';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import {
  Youtube, CheckSquare
} from 'react-feather';
import YouTube from 'react-youtube';
// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
// ** Styles
import '@styles/base/pages/page-blog.scss';
// ** Images
import { progressionFetchAction } from '../../../../settings/tabs/progressiontab/store/actions';
import { activeCourseLessonsFetchAction, recordWatchTimeAction, } from '../../../../mycma/usercourses/store/actions';
import CourseQuiz from './CourseQuiz';
import { toast } from 'react-toastify';
import { AiFillLock } from 'react-icons/ai';
const Course = (props) => {
  //for redux
  const dispatch = useDispatch();
  const lessonList = useSelector((state) => state.course.activeCourseLessons);
  //state
  const [videoModal, setVideoModal] = useState(false);
  const toggleVideoModal = () => {
    if (videoModal) {
      dispatch(activeCourseLessonsFetchAction(details._id));
    }
    setVideoModal(!videoModal)
  }
  const handleQuizClick=(subItem)=>
  {
    if(subItem.quiz!=undefined)
    {
      togglequiz(), 
      setActiveQuizData(subItem?.quiz)
    }
    else
    {
      toast.warning("You don't have access to take this Quiz")
    }
    
  }
  const [lessonModal, setLessonModal] = useState(false);
  const toggleLessonModal = () => setLessonModal(!lessonModal);
  const [modal, setModal] = useState(false);
  const [open, setOpen] = useState('');
  const [videoLink, setVideoLink] = useState()
  const player = useRef();
  // ** Props
  const { details,courseList,store} = props;
  // toggels
  const togglequiz = () => setModal(!modal);
  const toggleAccordion = (id) => {
    open === id ? setOpen() : setOpen(id);
  };
  const handleVideoPlay = (item, chapter) => {
    const iOfEqualTo = item.videoUrl.lastIndexOf('=');
    const videoId = item.videoUrl.substring(iOfEqualTo + 1);
    setVideoLink({ videoLink: videoId, id: item._id, name: item.videoName, chapter: chapter })
    if (!videoModal) {
      toggleVideoModal();
    }
  }
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [activeQuizData, setActiveQuizData] = useState([])
  const checkPlayerState = (e) => {
    if (e.target.getPlayerState() === 1) {
      setVideoPlaying(true);
    }
    else {
      setVideoPlaying(false);
      dispatch(activeCourseLessonsFetchAction(details._id));
    }
  }
  const renderCourseContent = () => {
    return (
      <div className="mt-1">
        <div className=" p-1 bg-light-primary rounded mb-3">
          <h3>Course Content</h3>
        </div>
        <Accordion open={open} toggle={toggleAccordion}>
          {lessonList?.length > 0 ? lessonList?.map((item, index) =>
          (
            <div className="d-flex justify-content-between">
              <Col xl="12">
                <AccordionItem>
                  <AccordionHeader targetId={index + 1} >
                    <Col xl="12" className="d-flex justify-content-between">
                      <h4>{index + 1 + ". "}{item?.lessonName}</h4>
                    </Col>
                  </AccordionHeader>
                  <AccordionBody accordionId={index + 1}>
                    {item.videoId?.length > 0 ? item?.videoId?.map((subItem, index) =>
                    (
                      <div className={`my-1 ${subItem.videoWatchTime >= subItem.videoDuration ? "bg-light-success" : "bg-light-secondary"} cursor-pointer`} onClick={() => subItem.videoUrl!=undefined?handleVideoPlay(subItem, item?.lessonName):toast.warning("You dont' have access to this Video")}>
                        <CardBody className="p-1">
                          <CardText tag="h5">
                            <div className="d-flex align-items-center justify-content-between ">
                              <div className="d-flex align-items-center">
                                <Youtube size={30} className="me-1" />
                                <span className="text-secondary">{index + 1 + '.  '}{subItem?.videoName}</span>
                              </div>
                              <div className="d-flex align-items-center">
                                {subItem?.videoDuration ? <span className="me-2">{parseInt(subItem.videoWatchTime / 60, 10) + "/" + parseInt(subItem.videoDuration / 60, 10)} mins</span> : <span>-</span>}
                                {subItem.videoUrl===undefined&&  <AiFillLock size={18} className="me-2" />}
                              </div>
                            </div>
                          </CardText>
                        </CardBody>
                      </div>
                    )) : <div className="text-center">No Lessons</div>}
                    {item?.quiz.map((subItem, index) => (
                      <div className="my-1 bg-light-secondary " onClick={() => {handleQuizClick(subItem)}}>
                        <CardBody className="p-1">
                          <CardText tag="h5">
                            <div className="d-flex align-items-center justify-content-between ">
                              <div className="d-flex align-items-center">
                                <CheckSquare size={30} className="me-1" />
                                <span className="text-secondary">Quiz{index + 1}</span>
                              </div>
                              <div className="d-flex align-items-center">
                               
                                {subItem.quiz===undefined?<AiFillLock size={18} className="me-2" />: <span className="  me-2 bg-light rounded" ><span className="m-1">Questions-{subItem?.quiz.length}</span></span>}
                                {/* <span className=" bg-warning rounded text-white"><span className="m-1">- min</span></span> */}
                              </div>
                            </div>
                          </CardText>
                        </CardBody>
                      </div>
                    ))
                    }
                  </AccordionBody>
                </AccordionItem>
              </Col>
            </div>
          )) : <h6>No Content</h6>}
        </Accordion>
      </div>
    )
  }
  useEffect(() => {
    const interval = setInterval(() => {
      if (videoPlaying && videoModal) {
        dispatch(recordWatchTimeAction(videoLink.id))
      } else {
        clearInterval(interval);
      }
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [videoPlaying, videoModal]);
  useEffect(() => {
    dispatch(activeCourseLessonsFetchAction(details._id),
      dispatch(progressionFetchAction())
    )
  }, [details])
  return (
    <>
      <Modal isOpen={modal} toggle={togglequiz} centered={true} size="lg">
        <ModalHeader toggle={togglequiz}>Take Quiz</ModalHeader>
        <CourseQuiz activeQuizData={activeQuizData} />
      </Modal>
      <Modal isOpen={videoModal} toggle={toggleVideoModal} scrollable={false} fullscreen>
        <ModalHeader toggle={toggleVideoModal}>
        </ModalHeader>
        <ModalBody>
          <div >
            <Row>
              <Col xl="12">
                <div className="bg-light-secondary p-1 rounded my-1">
                  <h3>{videoLink?.chapter}{" > "}{videoLink?.name}</h3>
                </div>
              </Col>
              <Col style={{ height: "85vh" }} xl="12" className='d-flex justify-content-center '>
                <YouTube
                  style={{ width: "100%" }}
                  ref={player}
                  videoId={videoLink?.videoLink}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  opts={{ width: "100%", height: "100%", playerVars: { controls: false } }}
                  title="Embedded youtube"
                  onStateChange={checkPlayerState}
                />
              </Col>
              <Col xl="12">
                {renderCourseContent()}
              </Col>
            </Row>
          </div>
        </ModalBody>
      </Modal>
      <Fragment>
        <div className="blog-wrapper">
          <div className="content-detached content-left">
            <div className="content-body">
              <Row>
                <Col sm="12">
                  <Card className="mb-0">
                    <CardBody>
                      <CardTitle  >
                        <div className="d-flex justify-content-between p-2 bg- ">
                          <Col xl="6">
                            <div > <img width="300" className=" img-fluid " src={details?.courseImage} /></div>
                          </Col>
                          <Col xl="3">
                            <div><h4>{details?.courseName}</h4>
                              <p className="text-gray fs-6">{details?.description === "undefined" ? "No Description" : details?.description}</p>
                              <p className="text-danger fs-6">Expiry Date:-{moment(details?.endDate).format("MM/DD/YYYY")}</p>
                              <p className="text-success fs-6">Purchased On:-{moment(details?.startDate).format("MM/DD/YYYY")}</p>
                            </div>
                          </Col>
                        </div>
                      </CardTitle>
                      <hr />
                      {renderCourseContent()}
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
          <Sidebar store={store} courseList={courseList} />
        </div>
      </Fragment>
    </>
  );
};

export default Course;
