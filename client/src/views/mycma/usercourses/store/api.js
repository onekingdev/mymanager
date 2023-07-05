import { id } from 'react-scroll-calendar';
import { customInterIceptors } from '../../../../lib/AxiosProvider';

const API = customInterIceptors();

export const addCourse = (courseData) => {
  return API.post('/course/create', courseData);
};
export const fetchCourses = () => {
  return API.get('/course/');
};
export const fetchActiveCourse=(id)=>{
  return API.get('/course/courseId/'+id);
}
export const fetchSingleCourse = () => {
  return API.get('/course/courseId/:id');
};
export const deleteCourse = (id) => {
  return API.delete('/course/courseId/'+ id);
};
export const editCourse = (id,payload) => {
  return API.put('/course/courseId/'+id, payload);
};
export const fetchLessons=(id)=>{
  return API.get('/course/lesson/'+id)
}
export const addLesson=(id,payload)=>{
  return API.post('/course/lesson/'+id,payload)
}
export const deleteLesson=(id)=>{
  return API.delete('course/lessonId/'+id)
}
export const editLesson=(id,payload)=>{
  return API.put('course/lesson/'+id,payload)
}
//course videos
export const addVideo=(payload)=>
{
  return API.post('course/coursevideo/'+payload.id,payload)
}
export const editVideo=(payload)=>
{
  return API.put('course/coursevideo/'+payload.id,payload)
}
export const deleteVideo=(id)=>
{
  return API.delete('course/coursevideo/'+id)
}
export const addQuiz=(lessonId,payLoad)=>
{
  return API.post('/course/quiz/'+lessonId,payLoad)
}
export const editQuiz=(id,payLoad)=>
{
  return API.put('/course/quiz/'+id,payLoad)
}
export const deleteQuiz=(id)=>
{
  return API.delete('course/quiz/'+id)
}
export const recordWatchTime=(id)=>
{
  return API.post("/course/coursevideo/recordWatchTime/"+id)
}
