import * as api from './api';
import {
  fetchRetentionByAttendance,
  fetchRetentionByLastContacted,
  deleteRetentionSuccess,
  deleteRetentionFail,
  resetDeleteRetentionStatus,

  addRetentionFail,
  addRetentionSuccess,
  resetAddRetentionStatus,
  editRetentionFail,
  editRetentionSuccess,
  resetEditRetentionStatus,

} from './reducer';
//parent retention
const initialRetentionData = [
  { lowerLimit: 0, upperLimit: 20, type: "Attendance", colorCode: "#75f542" },
  { lowerLimit: 20, upperLimit: 40, type: "Attendance", colorCode: "#f5ad42" },
  { lowerLimit: 40, upperLimit: 80, type: "Attendance", colorCode: "#f54e42" },
  { lowerLimit: 0, upperLimit: 20, type: "LastContacted", colorCode: "#75f542" },
  { lowerLimit: 20, upperLimit: 40, type: "LastContacted", colorCode: "#f5ad42" },
  { lowerLimit: 40, upperLimit: 80, type: "LastContacted", colorCode: "#f54e42" },

]
export const retentionFetchAction = () => async (dispatch) => {
  try {
    const { data } = await api.fetchRetention();
    if (data.success === true) {
      dispatch(fetchRetentionByAttendance(data.data.Attendance));
      dispatch(fetchRetentionByLastContacted(data.data.LastContacted));
    }
    else {
      dispatch(fetchRetentionByLastContacted([]));
      dispatch(fetchRetentionByAttendance([]));
    }
  } catch (error) { }
};
export const initialRetentinAddAction = () => async (dispatch) => {
  try {
    const { data } = await api.fetchRetention();
    const fireAdd = () => {
      initialRetentionData.map((item) => (
        dispatch(retentionAddAction(item,"mute"))
      ))
    }
    if (data.message === "No ranges found") {
      fireAdd();
    }
  }
  catch(error){  }
  
};
export const retentionAddAction = (retentionData,ismuted) => async (dispatch) => {
  try {
    const { data } = await api.addRetention(retentionData);
    if (data.success === true) {
      ismuted!="mute"&&dispatch(addRetentionSuccess(true));
    } else {
      dispatch(addRetentionFail(true));
    }
    dispatch(resetAddRetentionStatus());
    dispatch(retentionFetchAction());
  } catch (error) { }
};
export const retentionDeleteAction = (rule) => async (dispatch) => {
  try {
    const { data } = await api.deleteRetention(rule);
    if (data.success === true) {
      dispatch(deleteRetentionSuccess(true));
    } else {
      dispatch(deleteRetentionFail(true));
    }
    dispatch(resetDeleteRetentionStatus());
    dispatch(retentionFetchAction());
  } catch (error) { }
};

// export const retentionDeleteAction = (id) => async (dispatch) => {
//   try {
//     const { data } = await api.deleteRetention(id);
//     if (data.success === true) {
//       dispatch(deleteRetentionSuccess(true));
//     } else {
//       dispatch(deleteRetentionFail(true));
//     }
//     dispatch(resetDeleteRetentionStatus());
//     dispatch(retentionFetchAction());
//   } catch (error) { }
// };
export const retentionEditAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.editRetention(payload);
    if (data.success === true) {
      dispatch(editRetentionSuccess(true));
    } else {
      dispatch(editRetentionFail(true));
    }
    dispatch(resetEditRetentionStatus());
    dispatch(retentionFetchAction());
  } catch (error) { }
};

