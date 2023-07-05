import { getCoursesAction } from '../../../shops/store/action';
import * as api from './api';
import {
  fetchCourse,
  fetchActiveCourse,
  deleteCourseSuccess,
  deleteCourseFail,
  resetDeleteCourseStatus,
  addCourseFail,
  addCourseSuccess,
  addLessonSuccess,
  resetAddLessonStatus,
  resetAddCourseStatus,
  editCourseFail,
  editCourseSuccess,
  resetEditCourseStatus,
  fetchActiveCourseLessons,
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

} from './reducer';
//parent course
export const courseFetchAction = () => async (dispatch) => {
  try {
    const { data } = await api.fetchCourses();
    dispatch(fetchCourse(data));
  } catch (error) { }
};
export const activeCourseFetchAction = (id, reset) => async (dispatch) => {
  try {
    if (reset) {
      dispatch(fetchActiveCourse([]))
      return
    }
    const { data } = await api.fetchActiveCourse(id);
    if (data) {
      dispatch(fetchActiveCourse(data));
    }
    else {
      dispatch(fetchActiveCourse({}))
    }

  } catch (error) { }
};
export const courseAddAction = (courseData) => async (dispatch) => {
  try {
    const { data } = await api.addCourse(courseData);
    if (data.success === true) {
      dispatch(addCourseSuccess(true));
    } else {
      dispatch(addCourseFail(true));
    }
    dispatch(resetAddCourseStatus());
    dispatch(courseFetchAction());
  } catch (error) { }
};
export const courseDeleteAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteCourse(id);
    if (data.success === true) {
      dispatch(deleteCourseSuccess(true));
    } else {
      dispatch(deleteCourseFail(true));
    }
    dispatch(resetDeleteCourseStatus());
    dispatch(courseFetchAction());
  } catch (error) { }
};
export const courseEditAction = (id,payload,shopRefresh,shopId) => async (dispatch) => {
  try {
    const { data } = await api.editCourse(id,payload);
    if (data.success) {
      dispatch(editCourseSuccess(true));
      dispatch(resetEditCourseStatus())
      dispatch(fetchActiveCourse(data.data))
      if(shopRefresh)
      {
        dispatch(getCoursesAction({ shopId: shopId, permission: 'all' }))
      }
    } else {
      dispatch(editCourseFail(true));
    }
    dispatch(resetEditCourseStatus());
    dispatch(courseFetchAction());
  } catch (error) { }
};
// course Lessons
export const activeCourseLessonsFetchAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchLessons(id);

    dispatch(fetchActiveCourseLessons(data?.data));
  } catch (error) {

  }
}
export const lessonAddAction = (id, payload) => async (dispatch) => {
  const { data } = await api.addLesson(id, payload);
  if (data.success) {
    dispatch(addLessonSuccess())
  }
  dispatch(resetAddLessonStatus())
  dispatch(activeCourseLessonsFetchAction(id));
}
export const lessonDeleteAction = (chapterId, id) => async (dispatch) => {
  const { data } = await api.deleteLesson(id);
  if (data.success) {
    dispatch(deleteLessonSuccess())
  }
  dispatch(resetDeleteLessonStatus())
  dispatch(activeCourseLessonsFetchAction(chapterId))
}
export const lessonEditAction = (id, payload, chapterId) => async (dispatch) => {
  const { data } = await api.editLesson(id, payload);
  if (data.success) {
    dispatch(editLessonSuccess())
  }
  dispatch(resetEditLessonStatus())
  dispatch(activeCourseLessonsFetchAction(chapterId))
}
//couse Vidoes
export const videoAddAction = (chapterId, payLoad) => async (dispatch) => {
  const { data } = await api.addVideo(payLoad);
  if (data.success) {
    dispatch(addVideoSuccess())
  }
  dispatch(resetAddVideoStatus())
  dispatch(activeCourseLessonsFetchAction(chapterId))
}
export const videoEditAction = (chapterId, payLoad) => async (dispatch) => {
  const { data } = await api.editVideo(payLoad);
  if (data.success) {
    dispatch(editVideoSuccess())
  }
  dispatch(resetEditVideoStatus())
  dispatch(activeCourseLessonsFetchAction(chapterId))
}
export const recordWatchTimeAction = (id) => async (dispatch) => {
  const { data } = await api.recordWatchTime(id);

}
//course quiz
export const quizAddAction = (chapterId, lessonId, payLoad) => async (dispatch) => {
  const { data } = await api.addQuiz(lessonId, payLoad);
  if (data.success) {
    dispatch(addQuizSuccess())
  }
  dispatch(resetAddQuizStatus())
  dispatch(activeCourseLessonsFetchAction(chapterId))
}
export const quizEditAction = (chapterId, id, payLoad) => async (dispatch) => {
  const { data } = await api.editQuiz(id, payLoad);
  if (data.success) {
    dispatch(editQuizSuccess())
  }
  dispatch(resetEditQuizStatus())
  dispatch(activeCourseLessonsFetchAction(chapterId))
}
export const quizDeleteAction = (id, chapterId) => async (dispatch) => {
  const { data } = await api.deleteQuiz(id);
  if (data.success) {
    dispatch(deleteQuizSuccess())
  }
  dispatch(resetDeleteQuizStatus())
  dispatch(activeCourseLessonsFetchAction(chapterId))
}
export const videoDeleteAction = (id, chapterId) => async (dispatch) => {
  const { data } = await api.deleteVideo(id);
  if (data.success) {
    dispatch(deleteVideoSuccess())
  }
  dispatch(resetDeleteVideoStatus())
  dispatch(activeCourseLessonsFetchAction(chapterId))
}
