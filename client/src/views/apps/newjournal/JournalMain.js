import { useEffect, useState } from 'react';
import { Collapse, Button, Card, CardBody } from 'reactstrap';

import JournalSidebar from './JournalSidebar';
import JournalList from './JournalList';
import JournalDetail from './JournalDetail';
import '../../../../src/assets/styles/jaornal.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getJournalCategoriesAction, getJournalListAction } from './store/action';

export default function JournalMain() {
  // ** States
  const [collapse, setCollapse] = useState(false);
  const [sideBarUpdateData, setSideBarUpdateData] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [detailsSelectedItem, setDetailsSelectedItem] = useState(null);

  const [selectedCategory,setSelectedCategory] = useState('all')

  const [statusOpen, setStatusOpen] = useState('new');
  const [viewDetailsId, setViewDetailsId] = useState();
  const [JournallistData, setJournalData] = useState([]);

  const dispatch = useDispatch()
  const store = useSelector(state=>state.journal)

  // ** Handlers
  const handleJournalCollapse = () => setCollapse(!collapse);


  useEffect(()=>{
    dispatch(getJournalCategoriesAction())
    dispatch(getJournalListAction())
  },[dispatch])

  useEffect(()=>{
    if(selectedCategory==='all'){
      setJournalData(store?.journalList)
    }
    else{
      setJournalData(store?.journalList?.filter(x=>x?.journalCategory?._id===selectedCategory))
    }
  },[selectedCategory])

  return (
    <div>
      <div className="project-right" style={{ float: 'left !important' }}>
        <div className="content-wrapper">
          <div className="content-body">
            <div style={{ display: 'flex', height: 'calc(100vh - 16rem)' }}>
              <div
                className={`${collapse ? null : 'project-workspace-container'} set-collapse`}
                style={{ borderright: '1px solid #cccccc8f' }}
              >
                <Collapse
                  isOpen={!collapse}
                  horizontal={true}
                  className="h-100"
                  delay={{ show: 200, hide: 500 }}
                >
                  <JournalSidebar
                    collapse={collapse}
                    handleJournalCollapse={handleJournalCollapse}
                    store={store}
                    dispatch = {dispatch}
                    selectedCategory={selectedCategory}
                    setSelectedCategory = {setSelectedCategory}
                  />
                </Collapse>
              </div>
              <div class="cus-container">
                <div class="row h-100 m-0">
                  <div
                    class="col-5 cus-child-container pt-1"
                    style={{ borderRight: '1px solid #ebe9f1' }}
                  >
                    <JournalList
                      collapse={collapse}
                      handleJournalCollapse={handleJournalCollapse}
                      
                      setStatusOpen={setStatusOpen}
                      setViewDetailsId={setViewDetailsId}
                      viewDetailsId={viewDetailsId}
                      sideBarUpdateData={sideBarUpdateData}
                      setSideBarUpdateData={setSideBarUpdateData}
                      selectedItem={selectedItem}
                      setDetailsSelectedItem={setDetailsSelectedItem}
                      JournallistData={JournallistData}
                      setJournalData={setJournalData}
                      store = {store}
                    />
                  </div>
                  <div class="col-7 mt-2 cus-child-container">
                    <JournalDetail
                      statusOpen={statusOpen}
                      setStatusOpen={setStatusOpen}
                      viewDetailsId={viewDetailsId}
                      setSideBarUpdateData={setSideBarUpdateData}
                      detailsSelectedItem={detailsSelectedItem}
                      setJournalData={setJournalData}
                      selectedCategory={selectedCategory}
                      dispatch={dispatch}
                      store = {store}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
