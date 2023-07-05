// ** React Imports
import { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import PerfectScrollbar from 'react-perfect-scrollbar';
import { ChevronLeft, ChevronRight, Filter, Home } from 'react-feather';
// ** Reactstrap Imports
import { ListGroup, ListGroupItem, Badge, Button } from 'reactstrap';
// import '@src/assets/scss/style.css';
import '@src/assets/styles/contact/lead-side-filter.scss';
import Select from 'react-select';
import { belongsToIngerval } from '../utility';
import { TbInfoHexagon } from 'react-icons/tb';
import { FaCircle } from 'react-icons/fa';
import { BsPlusLg } from 'react-icons/bs';
import AddNewStage from './AddNewStage';
import WinLostList from './WinLostList';

import { FiSettings } from 'react-icons/fi';
import { cvtColor } from '../constants';

const WorkspaceSidebar = (props) => {
  const {
    active,
    store,
    collapse,
    leadStore,
    contactTypeId,
    selectedLeadSource,
    setSelectedLeadSource,
    selectedStage,
    handleWorkspaceCollapse,
    setSelectedStage,
    activeSidebar,
    setActiveSidebar
  } = props;

  const [activeDaySidebar, setActiveDaySidebar] = useState('1');

  const toggleTab = (tab) => {
    if (activeSidebar !== tab) {
      setActiveSidebar(tab);
    } else {
      setActiveSidebar(null);
    }
  };
  const toggleTabs = (tab) => {
    if (tab?.stageNum == selectedStage?.stageNum) {
      setSelectedStage(null);
    } else {
      setSelectedStage(tab);
    }

    // if (activeDaySidebar !== tab) {
    //   setActiveDaySidebar(tab);
    // }
  };

  // const [selectedLeadSource, setSelectedLeadSource] = useState(null);
  // const [selectedStage, setSelectedStage] = useState(null);
  const [filterByMonths, setFilterByMonths] = useState(null);
  const [filterByDays, setFilterByDays] = useState(null);
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(true);
  };
  const [winLostOpen, setWinLostOpen] = useState(false);

  const monthOptions = [
    { value: 'This Week', label: 'This Week' },
    { value: 'This Month', label: 'This Month' },
    { value: 'Past 30 Days', label: 'Past 30 Days' },
    { value: 'Past 60 Days', label: 'Past 60 Days' },
    { value: 'Past 90 Days', label: 'Past 90 Days' },
    { value: '+ 90 Days', label: '+ 90 Days' }
  ];

  const leadsourceOptions = leadStore?.leadSources?.map((stage) => {
    return {
      value: stage?.title,
      label: (
        <div>
          {stage?.title}
          {/* <Badge className="float-end" color="light-primary" pill>
            {'0'}
          </Badge> */}
        </div>
      )
    };
  });

  const stageOptions = leadStore?.stages?.map((stage) => {
    return {
      value: stage?.value,
      label: (
        <div>
          <span className={`bullet bullet-sm bullet-${stage.color} me-1`}></span>
          {stage?.value}
          <Badge className="float-end" color="light-primary" pill>
            {/* {'0'} */}
          </Badge>
        </div>
      )
    };
  });

  // ** Effects
  useEffect(() => {
    if (
      !winLostOpen &&
      (selectedStage?.stage?.value.toLowerCase() == 'win' ||
        selectedStage?.stage?.value.toLowerCase() == 'lost')
    ) {
      setWinLostOpen(true);
    }
  }, [selectedStage]);

  // Handle select change

  const handleSelectDayChange = (selectedOption) => {
    setSelectedStage(selectedOption);
  };
  const handleSelectLeadChange = (selectedOption) => {
    setSelectedLeadSource(selectedOption);
  };

  const getPeriodCount = (tabNum) => {
    return store?.contactList?.list?.filter(
      (x) => x?.contactType.indexOf(contactTypeId) > -1 && belongsToIngerval(tabNum, x?.updatedAt)
    ).length;
  };

  const getStageCount = (value) => {
    return store?.contactList?.list?.filter(
      (x) => x?.contactType.indexOf(contactTypeId) > -1 && x.stage == value
    ).length;
  };

  return (
    <div className="project-sidebar joru-side-height h-100" style={{ width: '260px' }}>
      <div className="sidebar-content task-sidebar journal">
        <div className="task-app-menu">
          <ListGroup
            className={`sidebar-menu-list ${collapse ? 'd-none' : 'd-block'}`}
            options={{ wheelPropagation: false }}
          >
            <div
              className="ps-1 d-flex justify-content-between align-items-center"
              style={{ marginLeft: '0.5rem', marginTop: 10 }}
            >
              <div style={{ fontSize: '18px', fontWeight: 700, cursor: 'pointer' }}>Filter</div>
              <Button className="btn-icon me-1" color="flat-dark" onClick={handleWorkspaceCollapse}>
                {collapse ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
              </Button>
            </div>
            <div className="leadsources">
              <div className="source">
                <div className="no-bullets">
                  {monthOptions.map((stage, index) => {
                    const tabNumber = (index + 1).toString();
                    return (
                      <ListGroupItem
                        style={{ cursor: 'pointer' }}
                        active={activeSidebar === tabNumber}
                        onClick={() => toggleTab(tabNumber)}
                        action
                      >
                        {stage?.value}
                        <Badge className="float-end" color="light-primary" pill>
                          {getPeriodCount(tabNumber)}
                        </Badge>
                      </ListGroupItem>
                    );
                  })}
                </div>
              </div>
              <div className="mt-2">
                <Select
                  styles={{ zIndex: '2' }}
                  className="react-select-container ms-1 mt-0 mb-0 me-1"
                  classNamePrefix="react-select"
                  options={leadsourceOptions}
                  value={selectedLeadSource}
                  onChange={handleSelectLeadChange}
                  isClearable
                  placeholder="Select Source"
                />
              </div>
              <div className="lead-stages" style={{ marginTop: '10px' }}>
                <div className="d-flex justify-content-between">
                  <h5
                    className="section-label px-1"
                    style={{ marginTop: '12px', marginLeft: '5px' }}
                  >
                    Stage
                  </h5>
                  <button
                    className="btn-icon me-1 btn float-end"
                    style={{
                      cursor: 'pointer',
                      border: 'none !important',
                      background: 'transparent !important'
                    }}
                    onClick={handleToggle}
                  >
                    <FiSettings color="secondary" size={15} />
                  </button>
                </div>
                <div className="month mb-3">
                  {leadStore?.stages?.map((stage, i) => {
                    const stageNum = (i + 1).toString();
                    return (
                      <ListGroupItem
                        style={{ cursor: 'pointer' }}
                        active={selectedStage?.stageNum === stageNum}
                        onClick={() => toggleTabs({ stageNum, stage })}
                        action
                      >
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center">
                            <div
                              className="color-bullet me-1"
                              style={{ backgroundColor: cvtColor[stage.color] }}
                            ></div>
                            {stage?.value.toUpperCase()}
                          </div>
                          <Badge className="float-end" color="light-primary" pill>
                            {getStageCount(stage.value)}
                          </Badge>
                        </div>
                      </ListGroupItem>
                    );
                  })}
                </div>
              </div>
            </div>
          </ListGroup>
        </div>
      </div>
      <AddNewStage modalType={toggle} leadStore={leadStore} setModalType={setToggle} />
      <WinLostList
        isOpen={winLostOpen}
        setIsOpen={setWinLostOpen}
        store={store}
        selectedStage={selectedStage}
        setSelectedStage={setSelectedStage}
        contactTypeId={contactTypeId}
      />
    </div>
  );
};

export default WorkspaceSidebar;
