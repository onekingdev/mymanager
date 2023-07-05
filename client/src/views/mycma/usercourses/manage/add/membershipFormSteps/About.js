// ** React Imports
import { Fragment, useState, useEffect } from 'react';
// ** Third Party Components
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Flatpickr from 'react-flatpickr';
import { Editor } from 'react-draft-wysiwyg';
// ** Icons Imports
// ** Reactstrap Imports
import { Label, Row, Col, Input, Form, Button } from 'reactstrap';
// ** Utils
import { selectThemeColors } from '@utils';
import { courseAddAction } from '../../../store/actions';
import { progressionFetchAction } from '../../../../../settings/tabs/progressiontab/store/actions';
import { useDispatch, useSelector } from 'react-redux';
// ** Styles
import '@styles/react/libs/editor/editor.scss';
import { toast } from 'react-toastify';
const curriculumOptions = [
  { value: 'Online Exam', label: 'Online Exam' },
  { value: 'Online Course', label: 'Online Course' },
];
const About = ({ centeredModal, setCenteredModal, shopStore }) => {
  const animatedComponents = makeAnimated();
  const store = useSelector((state) => state.progression);
  const progressionListData = store?.progressionList;
  const rankList = store?.progressionCategoriesRank;
  // ** State
  const [progressionList, setProgressionList] = useState([]);
  const [progressionItem, setProgressionItem] = useState({});
  const [courseData, setCourseData] = useState({});
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [progressionCategories, setProgressionCategories] = useState([]);
  const [showAccessibility, setShowAccessibility] = useState(false);
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
  const dispatch = useDispatch();
  const handleFormInput = (e) => {
    if (e.target.name != 'image') {
      setCourseData({ ...courseData, [e.target.name]: e.target.value })
    }
    if (e.target.name === 'image') {
      setCourseData({ ...courseData, file: e.target.files[0] });
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const isEveryFieldIncluded = ["courseName", "permission", "courseType", "startDate", "endDate", "coursePrice", "file"].every(item => Object.keys(courseData).includes(item))
    const isFieldEmpty = Object.values(courseData).includes("")
    if (isEveryFieldIncluded && !isFieldEmpty) {
      formData.append('courseName', courseData?.courseName)
      formData.append('courseType', courseData?.courseType)
      formData.append('startDate', courseData?.startDate)
      if (courseData.courseType === "Included") {
        formData.append('progression', JSON.stringify(progressionList));
      }
      formData.append('endDate', courseData?.endDate)
      formData.append('coursePrice', courseData?.coursePrice)
      courseData?.description && formData.append('description', courseData?.description)
      formData.append('file', courseData.file)
      formData.append('shopId', shopStore.shop._id)
      formData.append('permission', courseData.permission)
      dispatch(courseAddAction(formData))
      setCenteredModal(!centeredModal);
    }
    else {
      toast.warning("Please Select all Required fields")
    }
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
    let a = progressionList
    a.splice(item, 1)
    setProgressionList([...a])
  }
  useEffect(() => {
    dispatch(progressionFetchAction())
  }, [])
  return (
    <Fragment >

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xl="12" className="mb-1">
            <Label className="form-label" for="nameMulti">
              Course Title
            </Label>
            <Input onChange={handleFormInput} type="text" name="courseName" id="nameMulti" placeholder="Course Title" required value={courseData?.courseName} />
          </Col>
          <Col xl="6" sm="12" className="mb-1">
            <Label for="exampleSelect">Course Type</Label>
            <Input type="select" name="courseType" onChange={(e) => { e.target.value === "Included" ? setShowAccessibility(true) : e.target.value === "Purchased" ? setShowAccessibility(false) : setShowAccessibility(false), setCourseData({ ...courseData, "courseType": e.target.value }) }}>
              <option value="">Select</option>
              <option >Included</option>
              <option>Purchased</option>
            </Input></Col>
          <Col xl="6" sm="12" className="mb-1">
            <Label for="exampleSelect">Permission</Label>
            <Input type="select" name="permission" onChange={handleFormInput}>
              <option value="">Select</option>
              <option value="private" >Private</option>
              <option value="public">Public</option>
            </Input>
          </Col>
          {/* <Col md="6" sm="12" className="mb-1">
            <Label className="form-label" for="mtype">
              Category
            </Label>
            <Select
              name="courseCategory"
              theme={selectThemeColors}
              className="react-select"
              classNamePrefix="select"
              defaultValue={curriculumOptions[0]}
              options={curriculumOptions}
              isClearable={false}
              onChange={(e) => setCourseData({ ...courseData, "courseCategory": e.value })}
            />
          </Col> */}
        </Row>
        {showAccessibility ?
          <div className="bg-light-warning p-1 mb-1">
            <Row >
              <Col xl="12" className="fw-bold">Accessibility</Col>
              <Col xl="6">
                <Label for="progression">Progression Name</Label>
                <Input type="select" name="progression" value={progressionItem?.progression} onChange={(e) => { generateProgressionCategories(e.target.value), setProgressionItem({ ...progressionItem, [e.target.name]: e.target.value }) }}>
                  <option >Select</option>
                  {progressionListData?.map((item) =>
                    (<option>{item?.progressionName}</option>)
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
        <Row>
          <Col md="6" sm="12" className="mb-1">
            <Label className="form-label" for="nameMulti">
              Start Date
            </Label>
            <Flatpickr
              name="startDate"
              className="form-control"
              value={startDate}
              defaultValue={startDate}
              onChange={(date, dateStr) => setCourseData({ ...courseData, startDate: dateStr })}
              options={{
                dateFormat: "m-d-Y",
              }}
              placeholder='MM/DD/YYYY'
              id="default-picker"
            />
          </Col>
          <Col md="6" sm="12" className="mb-1">
            <Label className="form-label" for="nameMulti">
              Expiration Date
            </Label>
            <Flatpickr
              name="endDate"
              className="form-control"
              value={endDate}
              defaultvalue={endDate}
              onChange={(date, dateStr) => setCourseData({ ...courseData, endDate: dateStr })}
              placeholder='DD/MM/YYYY'
              options={{

                dateFormat: "m-d-Y",
              }}
              id="default-picker"
            />
          </Col>
        </Row>
        <Row>
          <Col md="6" sm="12" className="mb-1">
            <Label className="form-label" for="duration">
              Price $
            </Label>
            <Input onChange={handleFormInput} type="number" name="coursePrice" id="duration" placeholder="$" required />
          </Col>
          <Col md="6" sm="12" className="mb-1">
            <Label className="form-label" for="image">
              Course Cover
            </Label>
            <Input type="file" id="image" onChange={handleFormInput} name="image" required />
          </Col>
        </Row>
        <Col md="12" sm="12" className="mb-1">
          <Label className="form-label" for="description">
            Description
          </Label>
          <Editor onContentStateChange={(contentState) => setCourseData({ ...courseData, "description": contentState?.blocks[0]?.text })} name="description" />
        </Col>
        <div className="d-flex justify-content-between">
          <Button color="primary" onClick={() => setCenteredModal(!centeredModal)} className="btn-next" >
            <span className="align-middle d-sm-inline-block d-none">Cancel</span>
          </Button>
          <Button color="primary" className="btn-next" >
            <span className="align-middle d-sm-inline-block d-none">Create</span>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default About;
