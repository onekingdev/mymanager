import { createSlice } from '@reduxjs/toolkit';
import { number } from 'prop-types';

export const course = createSlice({
  name: 'course',
  initialState: {
    // Course
    courseList: [],
    activeCourse:{},
    activeCourseLessons:[],
    activeCourseQuiz:[],
    currentWatchTime:{},
    courseListSuccess: false,
    courseListFail: false,
    isCourseLoading: false,
    // Add Course
    courseAddSuccess: false,
    courseAddFail: false,
    // Delete Course
    courseDeleteSuccess: false,
    courseDeleteFail: false,
    //Edit Course
    courseEditSuccess: false,
    courseEditFail: false,
    lessonAddSuccess:false,
    lessonAddFail:false,
    lessonDeleteSuccess:false,
    lessonDeleteFail:false,
    lessonEditSuccess:false,
    quizAddSuccess:false,
    quizDeleteSuccess:false,
    quizEditSuccess:false,
    videoAddSuccess:false,
    videoDeleteSuccess:false,
    videoEditSuccess:false,
  },
  reducers: {
    // fetching course
    fetchCourse: (state, action) => {
      state.courseList = action?.payload;
    },
    fetchActiveCourse:(state,action)=>{
      state.activeCourse=action?.payload;
    },
    fetchCourseSuccess: (state, action) => {
      state.courseListSuccess = action?.payload;
    },
    fetchCourseFail: (state, action) => {
      state.courseListFail = action?.payload;
    },
    fetchCourseStatusReset: (state, action) => {
      state.courseListSuccess = false;
      state.courseListSuccess = false;
    },
    //addin course
    addCourseSuccess: (state, action) => {
      state.courseAddSuccess = action?.payload;
    },
    addCourseFail: (state, action) => {
      state.courseAddFail = action?.payload;
    },
    resetAddCourseStatus: (state, action) => {
      state.courseAddSuccess = false;
      state.courseAddFail = false;
    },
    //delete course
    deleteCourseSuccess: (state, action) => {
      state.courseDeleteSuccess = action?.payload;
    },
    deleteCourseFail: (state, action) => {
      state.courseDeleteFail = action?.payload;
    },
    resetDeleteCourseStatus: (state) => {
      state.courseDeleteSuccess = false;
      state.courseDeleteFail = false;
    },
    //edit course
    editCourseSuccess: (state, action) => {
      state.courseEditSuccess = action?.payload;
    },
    editCourseFail: (state, action) => {
      state.courseEditFail = action?.payload;
    },
    resetEditCourseStatus: (state) => {
      state.courseEditSuccess = false;
      state.courseEditFail = false;
    },
    // course lesson
    //fetchactivecourselessons
    fetchActiveCourseLessons:(state,action)=>{
      state.activeCourseLessons=action?.payload;
    },
    addLessonSuccess:(state)=>{
      state.lessonAddSuccess=true;
    },
    addLessonFail:(state)=>{
      state.lessonAddFail=true;
    },
    resetAddLessonStatus:(state)=>
    {
      state.lessonAddSuccess=false;
      state.lessonAddFail=false;
    },
    deleteLessonSuccess:(state)=>{
      state.lessonDeleteSuccess=true;
    },
    deleteLessonFail:(state)=>{
      state.lessonDeleteFail=true;
    },
    resetDeleteLessonStatus:(state)=>
    {
      state.lessonDeleteSuccess=false;
    },
    editLessonSuccess:(state)=>
    {
      state.lessonEditSuccess=true
    },
    resetEditLessonStatus:(state)=>
    {
      state.lessonEditSuccess=false
    },
    addQuizSuccess:(state)=>{
      state.quizAddSuccess=true;
    },
    resetAddQuizStatus:(state)=>
    {
      state.quizAddSuccess=false;
    },
    deleteQuizSuccess:(state)=>{
      state.quizDeleteSuccess=true;
    },
    resetDeleteQuizStatus:(state)=>
    {
      state.quizDeleteSuccess=false;
    },
    editQuizSuccess:(state)=>
    {
      state.quizEditSuccess=true
    },
    resetEditQuizStatus:(state)=>
    {
      state.quizEditSuccess=false
    },
    
    addVideoSuccess:(state)=>{
      state.videoAddSuccess=true;
    },
    resetAddVideoStatus:(state)=>
    {
      state.videoAddSuccess=false;
    },
    deleteVideoSuccess:(state)=>{
      state.videoDeleteSuccess=true;
    },
    resetDeleteVideoStatus:(state)=>
    {
      state.videoDeleteSuccess=false;
    },
    editVideoSuccess:(state)=>
    {
      state.videoEditSuccess=true
    },
    resetEditVideoStatus:(state)=>
    {
      state.videoEditSuccess=false
    },
  

  }
});

export const {
  // course
  fetchCourse,
  fetchActiveCourse,
  fetchActiveCourseLessons,
  fetchCourseFail,
  fetchCourseSuccess,
  fetchCourseStatusReset,
  addCourseFail,
  addLessonSuccess,
  addCourseSuccess,
  resetAddCourseStatus,
  deleteCourseFail,
  deleteCourseSuccess,
  resetDeleteCourseStatus,
  editCourseFail,
  editCourseSuccess,
  resetEditCourseStatus,
  resetAddLessonStatus,
  resetEditQuizStatus,
  editQuizSuccess,
  resetDeleteQuizStatus,
  deleteQuizSuccess,
  resetAddQuizStatus,
  addQuizSuccess,
  resetEditLessonStatus,
  editLessonSuccess,
  resetDeleteLessonStatus,
  deleteLessonSuccess,
  resetEditVideoStatus,
  editVideoSuccess,
  resetDeleteVideoStatus,
  deleteVideoSuccess,
  resetAddVideoStatus,
  addVideoSuccess,
} = course.actions;

export default course.reducer;
