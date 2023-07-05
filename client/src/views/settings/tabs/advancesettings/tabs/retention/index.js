import React, { useEffect, useState } from 'react';
import ByAttendance from './ByAttendance';
import ByLastContacted from './ByLastContacted';
import { retentionFetchAction } from './store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
function Retention() {
  const dispatch = useDispatch();
  const retentionListOne = useSelector((state) => state?.retention);

  const [retentionList,setRetentionList] = useState({})

  useEffect(() => {
    dispatch(retentionFetchAction());
  }, []);
  useEffect(()=>{
    if(retentionListOne){
      setRetentionList(retentionListOne)
    }
  },[retentionListOne])
  useEffect(() => {
    retentionList.retentionAddSuccess && toast.success('Added Successfully');
    retentionList.retentionDeleteSuccess && toast.success('Deleted Successfully');
    retentionList.retentionEditSuccess && toast.success('Edited Successfully');
  }, [retentionList]);

  return (
    <>
      <ByAttendance
        dispatch={dispatch}
        retentionListByAttendence={retentionList?.retentionListByAttendence}
        key={retentionList?.retentionListByAttendence?.length}
      />
      <ByLastContacted
        dispatch={dispatch}
        retentionListByLastContacted={
          retentionList ? retentionList?.retentionListByLastContacted : []
        }
      />
    </>
  );
}

export default Retention;
