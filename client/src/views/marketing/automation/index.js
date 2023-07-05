import { React, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from './Sidebar';
import Table from './Table';
import { updateAutomation, setAutomationDataList, getAllAutomations } from './store/actions';
import { v4 as uuidv4 } from 'uuid';
import ChartFlowWithProvider from './chartflow'



const Automation = () => {

  const actionsData = []
  const [isGraphShow, setIsGraphShow] = useState(false);
  const onShowToGraph = () => {
    setIsGraphShow(true);
  };
  const onGoBackToTable = () => {
    setIsGraphShow(false);
  };
  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(getAllAutomations());
    // dispatch(setAutomationDataList(AutomationDataList));
  }, []);
  const allData = useSelector((state) => state.automation);
  return (
    <div className="tasks-border" style={{ display: 'block' }}>
      {isGraphShow ? (
        <ChartFlowWithProvider goBackToTable={onGoBackToTable} />
      ) : (
        <div className='d-flex'>
          <Sidebar showGraph={onShowToGraph} allData={allData.allAutomations} />
          <Table showGraph={onShowToGraph} allData={allData.allAutomations} />
        </div>
      )}
    </div>
  );
};

export default Automation;
