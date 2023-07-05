// ** React Imports
import { Fragment, useState, useEffect, useRef } from 'react';
// ** Components
import Flatpickr from 'react-flatpickr';
// ** Icons Impots
import { GiNotebook } from 'react-icons/gi';
import { FaGraduationCap } from 'react-icons/fa';
import { VscTypeHierarchy } from 'react-icons/vsc';
import { BsCalendar2Date, } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import {
  Plus,
  Youtube,
  Video,
  CheckSquare,
  Edit,
  Trash,
  MoreVertical,
} from 'react-feather';
// ** Utils
// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Label,
  Button,
  CardBody,
  CardText,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
} from 'reactstrap';
// ** Styles
import '@styles/base/pages/page-blog.scss';
// ** Images
import cmtImg from '@src/assets/images/portrait/small/avatar-s-6.jpg';
import { AiOutlineDelete } from 'react-icons/ai';
import { progressionFetchAction } from '../../../settings/tabs/progressiontab/store/actions';
import { activeCourseLessonsFetchAction, lessonAddAction, lessonDeleteAction, videoAddAction, quizAddAction, courseEditAction, lessonEditAction, videoEditAction, quizDeleteAction, videoDeleteAction, quizEditAction } from '../store/actions';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import YouTube from 'react-youtube';
import { toast } from 'react-toastify';

const Course = (props) => {
  const formRef = useRef();
  const imageForCourse = useRef();
  const animatedComponents = makeAnimated();
  const MySwal = withReactContent(Swal);
  //for redux
  const dispatch = useDispatch();
  const progressionListData = useSelector((state) => state.progression.progressionList);
  const lessonList = useSelector((state) => state.course.activeCourseLessons);
  //state
  const [itemmodal, setItemmodal] = useState(false);
  const toggleitemmodal = () => setItemmodal(!itemmodal);
  const [deleteModal, setDeleteModal] = useState({ id: "", show: false });
  const [lessonModal, setLessonModal] = useState(false);
  const toggleLessonModal = () => setLessonModal(!lessonModal);
  const [modal, setModal] = useState(false);
  const [editable, setEditable] = useState(false)
  const [editableData, setEditableData] = useState()
  const [progressionCategories, setProgressionCategories] = useState([]);
  const [progressionList, setProgressionList] = useState();
  const [progressionItem, setProgressionItem] = useState({})
  const [active, setActive] = useState('2');
  const [open, setOpen] = useState('');
  const [lessonName, setLessonName] = useState({ lessonName: "lesson2" })
  const [videoPayload, setVideoPayload] = useState({})
  // const [questionCount, setQuestionsCount] = useState([{ label: "1", value: 1 }])
  const [quizPayload, setQuizPayload] = useState()
  let [quiz, setQuiz] = useState([])
  // ** Props
  const { details, shopStore } = props;
  //for accessiblity
  const generateProgressionCategories = (item) => {
    const filteredCategory = progressionListData?.filter(category => category.progressionName === item)
    const categories = filteredCategory[0]?.categoryId;
    let options = []
    categories.map((item) => {
      const categoryId = item._id
      const categoryName = item.categoryName
      options.push({ value: categoryId, label: categoryName })
    })
    setProgressionCategories(options)
  }
  const handleAddProgresson = () => {
    const includes = ['progression', 'category', 'rankFrom', 'rankTo', 'categoryId'].every(item => Object.keys(progressionItem).includes(item))
    const hasSelectedAsAOption = Object.values(progressionItem).includes("Select")
    if (includes && !hasSelectedAsAOption) {
      const duplicate = progressionList.filter(item => item.category === progressionItem.category && item.progression === progressionItem.progression)
      if (duplicate.length) {
        toast.warning("Progression with same Category already Exists")
        return
      }
      if (parseInt(progressionItem?.rankFrom) > parseInt(progressionItem?.rankTo)) {
        toast.warning("Rank-From can't be greater than Rank-To")
        return
      }
      setProgressionList([...progressionList, progressionItem])
      setProgressionItem({ progression: "Select", category: "Select", rankFrom: "Select", rankTo: "Select" })
      setProgressionCategories([])
    }
    else {
      toast.warning("Please Select All Options")
    }
  }
  const handleDelete = (item) => {
    let a = [...progressionList];
    a.splice(item, 1)
    setProgressionList([...a])
  }
  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };
  const toggleDeleteModal = () => {
    setDeleteModal({ "show": !deleteModal.show })
  }
  const [isQuizBeingEdited, setIsQuizBeingEdited] = useState(false)

  const togglequiz = () => setModal(!modal);
  const toggleAccordion = (id) => {
    open === id ? setOpen() : setOpen(id);
  };
  const handleLessonAdd = (e) => {
    e.preventDefault();
    lessonName.type === "Edit" ? dispatch(lessonEditAction(lessonName?.lessonToEdit, { lessonName: lessonName?.lessonName }, details?._id)) : dispatch(lessonAddAction(details?._id, lessonName))
    toggleLessonModal();
  }
  const handleVideoAdd = (e) => {
    e.preventDefault();
    videoPayload.type === "Edit" ? dispatch(videoEditAction(details._id, videoPayload)) : dispatch(videoAddAction(details._id, videoPayload))
    toggleitemmodal();
  }
  const [srNumber, setSrNumber] = useState(1);
  const videoIdGenerate = (item) => {
    const iOfEqualTo = item.lastIndexOf('=');
    const videoId = item.substring(iOfEqualTo + 1);
    return videoId
  }
  const [lessonId, setLessonId] = useState()
  const handleQuizInput = (e) => {
    setQuizPayload({ ...quizPayload, [e.target.name]: e.target.value })
  }
  const handleQuizSubmit = () => {
    const result = { "quiz": quiz }
    quiz?.length < 1 ?
      toast.error("No Questions to Submit") :
      isQuizBeingEdited ?
        dispatch(quizEditAction(details._id, lessonId, result)) :
        dispatch(quizAddAction(details._id, lessonId, result))
    quiz?.length > 0 && (togglequiz(), setIsQuizBeingEdited(false))
  }
  const ammendQuestionsArray = (indexOfItem) => {
    const questionsArray = [...quiz]
    const myObj = {}
    myObj.question = quizPayload.question;
    myObj.options = [quizPayload.A, quizPayload.B, quizPayload.C, quizPayload.D];
    myObj.solution = quizPayload.solution;
    questionsArray.splice(indexOfItem, 1, myObj)
    setQuiz(questionsArray)
  }
  const handleQuizOrVideoDelete = async (id, entity) => {
    const result = await MySwal.fire({
      title: `Are you sure to Delete this ${entity} ?`,
      text: ``,
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    });
    if (result.value) {
      //handle deleting data
      entity === "quiz" && dispatch(quizDeleteAction(id, details._id));
      entity === "video" && dispatch(videoDeleteAction(id, details._id));
    }
  };
  const handleNextQuestion = (e) => {
    e.preventDefault()
    if (!((quiz[srNumber - 1]?.question === quizPayload?.question) && (quiz[srNumber - 1]?.options[0] === quizPayload?.A) && (quiz[srNumber - 1]?.options[1] === quizPayload?.B) && (quiz[srNumber - 1]?.options[2] === quizPayload?.C) && (quiz[srNumber - 1]?.options[3] === quizPayload?.D) && (quiz[srNumber - 1]?.solution === quizPayload?.solution))) {
      ammendQuestionsArray(srNumber - 1)
    }
    if (srNumber === quiz.length) {
      setQuizPayload({ question: "", A: "", B: "", C: "", D: "", solution: "" })
      setSrNumber(srNumber + 1)
    }
    if (srNumber < quiz.length) {
      const question = quiz[srNumber]
      setQuizPayload({ "question": question.question, "A": question.options[0], "B": question.options[1], "C": question.options[2], "D": question.options[3], "solution": question.solution })
      setSrNumber(srNumber + 1)
      return
    }
    if (srNumber === quiz.length + 1) {
      if (quizPayload.solution === undefined || quizPayload.solution === "select") {
        toast.error("please select solution")
      }
      else {
        const myObj = {}
        myObj.question = quizPayload.question;
        myObj.options = [quizPayload.A, quizPayload.B, quizPayload.C, quizPayload.D];
        myObj.solution = quizPayload.solution;
        setQuiz([...quiz, myObj])
        setQuizPayload({ question: "", A: "", B: "", C: "", D: "", solution: "" });
        setSrNumber(srNumber + 1);
      }
    }
  }
  const handlePreviousQuestion = () => {
    if (!((quiz[srNumber - 1]?.question === quizPayload?.question) && (quiz[srNumber - 1]?.options[0] === quizPayload?.A) && (quiz[srNumber - 1]?.options[1] === quizPayload?.B) && (quiz[srNumber - 1]?.options[2] === quizPayload?.C) && (quiz[srNumber - 1]?.options[3] === quizPayload?.D) && (quiz[srNumber - 1]?.solution === quizPayload?.solution))) {
      srNumber <= quiz.length && ammendQuestionsArray(srNumber - 1)
    }
    const question = quiz[srNumber - 2]
    setQuizPayload({ "question": question.question, "A": question.options[0], "B": question.options[1], "C": question.options[2], "D": question.options[3], "solution": question.solution })
    setSrNumber(srNumber - 1)
  };
  const handleQuizModalClose = () => {
    setQuizPayload({})
    setQuiz([])
    setSrNumber(1);
  }
  useEffect(() => {
    dispatch(activeCourseLessonsFetchAction(details._id),
      dispatch(progressionFetchAction())
    )
    setProgressionList(props?.details.courseAccess || []);
    setEditableData(details)
  }, [details])
  const handleEditCourse = () => {
    let formData = new FormData()
    let payload = { ...editableData };
    const isEveryFieldIncluded = ["courseName", "courseType", "startDate", "endDate", "coursePrice"].every(item => Object.keys(payload).includes(item))
    const isAnyFieldEmpty = Object.values(payload).some(item => item === "")
    if (isEveryFieldIncluded && isAnyFieldEmpty) {
      toast.warning("All Fields Required")
      return
    }
    if (payload.courseType === "Included") {
      payload.courseAccess = [...progressionList];
      formData.append('progression', JSON.stringify(progressionList))
    }
    else {
      formData.append('progression', JSON.stringify([]))
    }
    formData.append('courseName', payload.courseName)
    formData.append('courseType', payload.courseType)
    formData.append('startDate', payload.startDate)
    formData.append('endDate', payload.endDate)
    formData.append('coursePrice', payload.coursePrice)
    payload.file && formData.append('file', payload.file)
    dispatch(courseEditAction(details._id, formData, true, shopStore.shop._id))
  }
  return (
    <>
      {/* Quiz modal */}
      <Modal onClosed={() => handleQuizModalClose()} isOpen={modal} toggle={togglequiz} centered={true} size="lg">
        <ModalHeader toggle={togglequiz}>{isQuizBeingEdited ? "Edit Quiz" : "Create Quiz"}</ModalHeader>
        <ModalBody>
          <Row className="mb-2">
            <form ref={formRef} onSubmit={(e) => handleNextQuestion(e)}>
              <Row >
                <Col md={12}>
                  <Row className="mt-1">
                    <Col md={1}>
                      <Label for="q1">
                        Q:{srNumber}
                      </Label></Col>
                    <Col md={11}>  <Input
                      name="question"
                      placeholder={"Enter Question "}
                      onChange={(e) => handleQuizInput(e)}
                      type="text"
                      value={quizPayload?.question}
                      required
                    /></Col>
                  </Row>
                </Col>
                <Row className="mt-1">
                  <Col md={1}>
                    <Label for="q1">
                      A
                    </Label></Col>
                  <Col md={5}>    <Input
                    name="A"
                    onChange={(e) => { handleQuizInput(e) }}
                    type="text"
                    value={quizPayload?.A}
                    required
                  /></Col>
                  <Col md={1}>
                    <Label for="q1">
                      B
                    </Label>
                  </Col>
                  <Col md={5}>    <Input
                    name="B"
                    onChange={(e) => { handleQuizInput(e) }}
                    value={quizPayload?.B}
                    type="text"
                    required
                  /></Col>
                </Row>
                <Row className="my-1">
                  <Col md={1}>
                    <Label for="q1">
                      C
                    </Label>
                  </Col>
                  <Col md={5}>    <Input
                    name="C"
                    onChange={(e) => { handleQuizInput(e) }}
                    type="text"
                    value={quizPayload?.C}
                    required
                  /></Col>
                  <Col md={1}>
                    <Label for="q1">
                      D
                    </Label>
                  </Col>
                  <Col md={5}>    <Input
                    name="D"
                    onChange={(e) => { handleQuizInput(e) }}
                    type="text"
                    value={quizPayload?.D}
                    required
                  /></Col>
                </Row>
                <Col xl={1}><p className="fw-bold">Answer:</p></Col>
                <Col xl={2}>
                  <Label for="exampleSelect">Solution</Label>
                  <Input type="select" name="solution" id="exampleSelect" value={quizPayload?.solution}
                    onChange={(e) => { handleQuizInput(e) }}
                  >
                    <option value={"select"}>Select</option>
                    {quizPayload?.B != undefined &&
                      <>
                        <option value={quizPayload?.A}>{quizPayload?.A}</option>
                        <option value={quizPayload?.B}>{quizPayload?.B}</option>
                        <option value={quizPayload?.C}>{quizPayload?.C}</option>
                        <option value={quizPayload?.D}>{quizPayload?.D}</option>
                      </>}
                  </Input>
                </Col>
              </Row>
              <Col xl="12">
                <div className=" mt-3 d-flex justify-content-between">
                  <Button disabled={srNumber <= 1} onClick={handlePreviousQuestion} >Previous</Button>
                  <Button >Next</Button>
                </div>
              </Col>
            </form>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={togglequiz}>
            Cancel
          </Button>
          <Button disabled={quiz?.length > srNumber - 1} color="primary" onClick={handleQuizSubmit}>
            Create  {quiz?.length} Question Quiz
          </Button>{' '}
        </ModalFooter>
      </Modal>
      {/* Edit Video/ Add Video Modal */}
      <Modal isOpen={itemmodal} toggle={toggleitemmodal} centered={true} size="lg">
        <ModalHeader toggle={toggleitemmodal}>
          {videoPayload.type === "Edit" ? "Edit Video" : "Add Video"}
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={(e) => { handleVideoAdd(e) }}>
            <FormGroup>
              <Label for="videoLink">Video Title</Label>
              <Input
                onChange={(e) => setVideoPayload({ ...videoPayload, [e.target.name]: e.target.value })}
                type="text"
                value={videoPayload?.videoName}
                name="videoName"
                placeholder=""
                required />
            </FormGroup>
            <div className="d-flex justify-content-center my-2">
              {videoPayload?.videoUrl &&
                <div>
                  <YouTube
                    opts={{ playerVars: { controls: false } }}
                    videoId={videoIdGenerate(videoPayload?.videoUrl)}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                    onReady={(e) => setVideoPayload({ ...videoPayload, "videoDuration": e.target.getDuration() })}
                  />
                </div>
              }
            </div>
            <FormGroup>
              <Label for="videoLink">Video Link</Label>
              <Input
                onChange={(e) => setVideoPayload({ ...videoPayload, [e.target.name]: e.target.value })}
                type="text"
                name="videoUrl"
                value={videoPayload?.videoUrl}
                placeholder="eg:- https://www.youtube.com/watch?v=BywDOO99Ia0"
                required
              />
            </FormGroup>
            <Button color="btn btn-outline-danger" onClick={toggleitemmodal}>
              Cancel
            </Button>{' '}
            <Button type="submit" color="btn btn-primary">
              {videoPayload.type === "Edit" ? "Edit Video" : "Add Video"}
            </Button>
          </Form>
        </ModalBody>
      </Modal>
      {/* delete Modal */}
      <Modal isOpen={deleteModal.show} toggle={toggleDeleteModal} centered={true} size="md">
        <ModalHeader toggle={toggleDeleteModal}>
          Delete
        </ModalHeader>
        <ModalBody>
          Are You Sure to Delete?
        </ModalBody>
        <ModalFooter>
          <Button color="btn btn-outline-danger" onClick={toggleDeleteModal}>
            Cancel
          </Button>{' '}
          <Button color="btn btn-danger" onClick={() => { toggleDeleteModal(), dispatch(lessonDeleteAction(details._id, deleteModal.id)) }}>
            Delete
          </Button>
        </ModalFooter>
      </Modal>
      {/* lesson edit add modal */}
      <Modal isOpen={lessonModal} toggle={toggleLessonModal} centered={true} size="md">
        <ModalHeader toggle={toggleLessonModal}>
          {lessonName?.type == "Edit" ? "Edit Lesson" : "Add Lesson"}
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={(e) => handleLessonAdd(e)}>
            <FormGroup>
              <Label for="videoLink">Lesson Name</Label>
              <Input
                onChange={(e) => setLessonName({ ...lessonName, "lessonName": e.target.value })}
                type="text"
                value={lessonName.lessonName}
                name="videoLink"
                placeholder=""
                required
              />
            </FormGroup>
            <Button color="btn btn-outline-danger" onClick={toggleLessonModal}>
              Cancel
            </Button>{' '}
            <Button type="submit" color="btn btn-primary">
              Save Lesson
            </Button>
          </Form>
        </ModalBody>
      </Modal>
      <Fragment>
        <Card className="mb-0">
          <CardBody>
            <Row>
              <Row >
                <h1>{details?.courseName} <Badge color={details.permission==='public'?'light-success':'light-danger'}>{details?.permission}</Badge></h1>

                <Col xl="6">

                  <img className="mt-2 img-fluid " src={editableData?.file ? URL.createObjectURL(editableData?.file) : editableData?.courseImage} />
                </Col>
                <Col xl="6">
                  <ul className="product-features list-unstyled">
                    <li className="d-flex justify-content-between mb-1 py-1">
                      <FormGroup switch>
                        <Label check className="me-1">Edit Course Details</Label>
                        <Input
                          type="switch"
                          onChange={() => { setEditable(!editable); setEditableData(details) }}
                          value={editable}
                        />
                      </FormGroup>
                      <Button disabled={!editable} onClick={handleEditCourse} color="primary" >Save</Button>
                    </li>
                    <Row className="mt-1" >
                      <Col>  <span className="d-flex align-items-center">
                        <VscTypeHierarchy className="me-1" /> Course Name
                      </span></Col>
                      <Col><Input disabled={!editable} value={editableData?.courseName} onChange={(e) => setEditableData({ ...editableData, courseName: e.target.value })}></Input></Col>


                    </Row>
                    <Row className="mt-1" >
                      <Col>
                        <span className="d-flex align-items-center">
                          <VscTypeHierarchy className="me-1" /> Category
                        </span>
                      </Col>
                      <Col>
                        <Input disabled={!editable} type="select" value={editableData?.courseType} name="courseType" onChange={(e) => { setEditableData({ ...editableData, "courseType": e.target.value }) }}>
                          <option value="">Select</option>
                          <option >Included</option>
                          <option>Purchased</option>
                        </Input>
                      </Col>
                    </Row>
                    <Row className="mt-1" >
                      <Col>
                        <span className="d-flex align-items-center">
                          <BsCalendar2Date className="me-1" />  Start Date
                        </span>
                      </Col>
                      <Col>
                        <span><Flatpickr
                          name="startDate"
                          className="form-control"
                          value={editableData?.startDate}
                          disabled={!editable}
                          onChange={(date, dateStr) => setEditableData({ ...editableData, startDate: dateStr })}
                          options={{
                            dateFormat: "m-d-Y",
                          }}
                          id="default-picker"
                        /></span>
                      </Col>


                    </Row>
                    <Row className="mt-1" >
                      <Col>
                        <span className="d-flex align-items-center">
                          <BsCalendar2Date className="me-1" />  Expiration Date
                        </span>
                      </Col>
                      <Col>

                        <span>
                          <Flatpickr
                            name="endDate"
                            className="form-control"
                            value={editableData?.endDate}
                            disabled={!editable}
                            onChange={(date, dateStr) => setEditableData({ ...editableData, endDate: dateStr })}
                            options={{
                              dateFormat: "m-d-Y",
                            }}
                            id="default-picker"
                          />
                        </span>
                      </Col>

                    </Row>
                    <Row className="mt-1" >
                      <Col>
                        <span className="d-flex align-items-center">
                          <FaGraduationCap className="me-1" /> Price
                        </span>
                      </Col>
                      <Col>
                        {editable ? <Input disabled={!editable} onChange={(e) => setEditableData({ ...editableData, coursePrice: e.target.value })} value={editableData?.coursePrice}></Input> : <Input disabled={!editable} value={"$ " + editableData?.coursePrice}></Input>}
                      </Col>
                    </Row>
                    <Row className="mt-1" >
                      <Col>
                        <span className="d-flex align-items-center">
                          <FaGraduationCap className="me-1" />Image
                        </span>
                      </Col>
                      <Col>
                        <Input type="file" disabled={!editable} onChange={(e) => setEditableData({ ...editableData, file: e.target.files[0] })} ref={imageForCourse}></Input>
                      </Col>
                    </Row>
                  </ul>
                </Col>

                {editable && editableData.courseType === "Included" ?
                  <div className="bg-light-warning p-1 mb-1">
                    <Row >
                      <Col xl="12" className="fw-bold">Accessibility</Col>
                      <Col xl="6">
                        <Label for="progression">Progression Name</Label>
                        <Input type="select" name="progression" value={progressionItem?.progression} onChange={(e) => { generateProgressionCategories(e.target.value), setProgressionItem({ ...progressionItem, [e.target.name]: e.target.value }) }}>
                          <option >Select</option>
                          {progressionListData?.map((item, index) =>
                            (<option key={index}>{item?.progressionName}</option>)
                          )}
                        </Input>
                      </Col>
                      <Col xl="6">
                        <Label for="category">Progression Category</Label>
                        <Select
                          closeMenuOnSelect
                          value={{ label: progressionItem?.category, value: progressionItem?.categoryId }}
                          components={animatedComponents}
                          onChange={(e) => { setProgressionItem({ ...progressionItem, "categoryId": e.value, "category": e.label }) }}
                          options={progressionCategories}
                        />
                      </Col>
                      <Col xl="12" className="mt-2">
                        <Label for="Rank">Accessible to Rank </Label>
                        <Row className="mb-1">
                          <Col xl="6">
                            <Label for="exampleSelect">Rank From</Label>
                            <Input type="select" value={progressionItem?.rankFrom} name="rankFrom" onChange={(e) => { setProgressionItem({ ...progressionItem, [e.target.name]: e.target.value }) }}  >
                              <option>Select</option>
                              {[...Array(100)].map((_, index) => {
                                return <option>{index + 1}</option>
                              })}
                            </Input></Col>
                          <Col xl="6">
                            <Label for="rankTo">Rank To</Label>
                            <Input type="select" name="rankTo" value={progressionItem?.rankTo} onChange={(e) => { setProgressionItem({ ...progressionItem, [e.target.name]: e.target.value }) }}  >
                              <option>Select</option>
                              {[...Array(100)].map((_, index) => {
                                return <option>{index + 1}</option>
                              })}
                            </Input></Col>
                        </Row>
                      </Col>
                      <Col xl="2">
                        <Button className=" " onClick={handleAddProgresson} color="primary"> Add </Button>
                      </Col>
                    </Row>
                    {progressionList.length > 0 ?
                      <div className=" bg-light-secondary my-2 p-1 text-center">
                        <Row className=" text-secondary">
                          <Col className="text-black fs-5" xl="1">Sr.</Col>
                          <Col className="text-black fs-5" xl="3">Progression</Col>
                          <Col className="text-black fs-5" xl="3">Category</Col>
                          <Col className="text-black fs-5" xl="2">Rank From</Col>
                          <Col className="text-black fs-5" xl="2">Rank To</Col>
                        </Row>
                        {progressionList?.map((item, index) =>
                        (
                          <Row className="mt-1 text-secondary">
                            <Col xl="1" key={index}>{index + 1}</Col>
                            <Col xl="3" key={index}>{item?.progression}</Col>
                            <Col xl="3" key={index}>{item?.category}</Col>
                            <Col xl="2" key={index}>{item?.rankFrom}</Col>
                            <Col xl="2" key={index}>{item?.rankTo}</Col>
                            <Col xl="1" key={index} onClick={() => handleDelete(index)} className="cursor-pointer text-danger">X</Col>
                          </Row>
                        )
                        )}
                      </div>
                      : ""}
                  </div>
                  : ""}

              </Row>
              <hr />
              <div className="mt-1">
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      active={active === '2'}
                      onClick={() => {
                        toggle('2');
                      }}
                    >
                      <GiNotebook size={16} />
                      <span className="align-middle">Edit Course Content</span>
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent className="py-50" activeTab={active}>
                  <TabPane tabId="2">
                    <div className="d-flex justify-content-between">
                    </div>
                    <Button color="" onClick={() => { toggleLessonModal(), setLessonName({}) }} className="bg-light-success"><Plus />Add Lesson</Button>
                    <Accordion open={open} toggle={toggleAccordion}>
                      {lessonList?.map((item, index) =>
                      (
                        <div className="d-flex justify-content-between mt-2">
                          <Col xl="9">
                            <AccordionItem>
                              <AccordionHeader targetId={index + 1} >
                                <Col xl="12" className="d-flex justify-content-between">
                                  <h4>{index + 1 + ". "}{item?.lessonName}</h4>
                                </Col>
                              </AccordionHeader>
                              <AccordionBody accordionId={index + 1}>
                                {item?.videoId?.map((item, index) =>
                                (
                                  <Card className="my-1 bg-light-secondary "
                                  >
                                    <CardBody className="p-1">
                                      <CardText tag="h5">
                                        <div className="d-flex align-items-center justify-content-between ">
                                          <div className="d-flex align-items-center">
                                            <Youtube size={30} className="me-1" />
                                            <span className="text-secondary">{index + 1 + '.  '}{item?.videoName}</span>
                                          </div>
                                          <div className="d-flex align-items-center cursor-pointer" >
                                            {/* <AiFillLock size={18} className="me-2" /> */}
                                            {/* <Edit onClick={() => { toggleitemmodal(); setVideoPayload({ type: "Edit", "id": item._id, "videoUrl": item.videoUrl, "videoName": item.videoName, "videoDuration": item.videoDuration }) }} size={18} className="me-2" />
                                            <Trash className="text-danger" onClick={() => handleQuizOrVideoDelete(item._id, "video")} size={18} /> */}
                                            <span>{item?.videoDuration ? (parseInt(item?.videoDuration / 60, 10) + " mins") : ""}</span>
                                            <div className="column-action">
                                              <UncontrolledDropdown>
                                                <DropdownToggle tag="div" className="btn btn-sm">
                                                  <MoreVertical size={14} className="cursor-pointer" />
                                                </DropdownToggle>
                                                <DropdownMenu container="body">
                                                  <DropdownItem onClick={() => { toggleitemmodal(); setVideoPayload({ type: "Edit", "id": item._id, "videoUrl": item.videoUrl, "videoName": item.videoName, "videoDuration": item.videoDuration }) }}
                                                  >
                                                    <Edit size={18} className="me-1" />
                                                    <span className="align-middle">Edit</span>
                                                  </DropdownItem>
                                                  <DropdownItem onClick={() => handleQuizOrVideoDelete(item._id, "video")}>
                                                    <Trash className="text-danger me-1" size={18} />
                                                    <span className="align-middle">Delete</span>
                                                  </DropdownItem>
                                                </DropdownMenu>
                                              </UncontrolledDropdown>
                                            </div>
                                          </div>
                                        </div>
                                      </CardText>
                                    </CardBody>
                                  </Card>
                                ))}
                                {item?.quiz.map((item, index) => (
                                  <Card className="my-1 bg-light-secondary " >
                                    <CardBody className="p-1">
                                      <CardText tag="h5">
                                        <div className="d-flex align-items-center justify-content-between ">
                                          <div className="d-flex align-items-center">
                                            <CheckSquare size={30} className="me-1" />
                                            <span className="text-secondary">Quiz{index + 1}</span>
                                          </div>
                                          <div className="d-flex align-items-center">
                                            <span className="  me-2 bg-light rounded" ><span className="m-1">Questions-{item?.quiz.length}</span></span>
                                            <div className="d-flex align-items-center cursor-pointer" >
                                              {/* <AiFillLock size={18} className="me-2" /> */}
                                              {/* <Edit onClick={() => { toggleitemmodal(); setVideoPayload({ type: "Edit", "id": item._id, "videoUrl": item.videoUrl, "videoName": item.videoName, "videoDuration": item.videoDuration }) }} size={18} className="me-2" />
                                            <Trash className="text-danger" onClick={() => handleQuizOrVideoDelete(item._id, "video")} size={18} /> */}
                                              <span>{item?.videoDuration ? (parseInt(item?.videoDuration / 60, 10) + " mins") : ""}</span>
                                              <div className="column-action">
                                                <UncontrolledDropdown>
                                                  <DropdownToggle tag="div" className="btn btn-sm">
                                                    <MoreVertical size={14} className="cursor-pointer" />
                                                  </DropdownToggle>
                                                  <DropdownMenu container="body">
                                                    <DropdownItem onClick={() => handleQuizOrVideoDelete(item._id, "quiz")} size={18}>
                                                      <Trash className="text-danger me-1" />
                                                      <span className="align-middle">Delete</span>
                                                    </DropdownItem>
                                                    <DropdownItem onClick={() => { togglequiz(), setLessonId(item._id), setIsQuizBeingEdited(true), setQuiz(item.quiz), setQuizPayload({ question: item.quiz[0].question, A: item.quiz[0].options[0], B: item.quiz[0].options[1], C: item.quiz[0].options[2], D: item.quiz[0].options[3], solution: item.quiz[0].solution }) }} size={18}>
                                                      <Edit className="me-1" />
                                                      <span className="align-middle">Edit</span>
                                                    </DropdownItem>
                                                  </DropdownMenu>
                                                </UncontrolledDropdown>
                                              </div>
                                            </div>
                                            {/* <span className=" bg-warning rounded text-white"><span className="m-1">- min</span></span> */}
                                          </div>
                                        </div>
                                      </CardText>
                                    </CardBody>
                                  </Card>
                                ))
                                }
                                <div className="d-flex align-items-center justify-content-start  ">
                                  <div className="d-flex     rounded align-items-center ">
                                    <Button outline color="success" onClick={() => { toggleitemmodal(); setVideoPayload({ "id": item._id }) }} className="ms-1  rounded cursor-pointer">
                                      <Video size={15} className="me-1"></Video>
                                      <span>Add Video</span>
                                    </Button>
                                    <Button outline color="success" onClick={() => { togglequiz(), setLessonId(item._id) }} className=" ms-1  rounded cursor-pointer">
                                      <CheckSquare size={15} className="me-1" ></CheckSquare>
                                      <span>Add Quiz</span>
                                    </Button>
                                  </div>
                                </div>
                              </AccordionBody>
                            </AccordionItem>
                          </Col>
                          <Col xl="3">
                            <div className="d-flex justify-content-center ">
                              <p className="mt-1"><span><Edit size="20" onClick={() => { toggleLessonModal(); setLessonName({ lessonName: item?.lessonName, lessonToEdit: item?._id, type: "Edit" }) }} className=" mx-2 cursor-pointer" /></span></p>
                              <p className="mt-1"><span><AiOutlineDelete size="20" onClick={() => { setDeleteModal({ "id": item._id, "show": !deleteModal.show }) }} className="text-danger mx-2 cursor-pointer" /></span></p>
                            </div>
                          </Col>
                        </div>
                      ))}
                    </Accordion>
                  </TabPane>
                </TabContent>
              </div>
            </Row>
          </CardBody>
        </Card>
      </Fragment>
    </>
  );
};
export default Course;
