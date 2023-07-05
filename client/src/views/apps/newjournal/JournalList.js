import React, { useState, useEffect } from 'react';
import { Input, Button } from 'reactstrap';
import Moment from 'react-moment';
import { ChevronRight } from 'react-feather';
import ReactHtmlParser from 'react-html-parser';
import NotFound from '@src/assets/img/notfound.png';
import { getJournalListById } from '../../../requests/myJournal/getMyJournal';
import '../../../../src/assets/styles/jaornal.scss';
import JournalCalender from './JournalCalender';
import CalendarHeader from './CalendarHeader';

export default function JournalList({
  setViewDetailsId,
  setStatusOpen,
  viewDetailsId,
  collapse,
  handleJournalCollapse,
  store
}) {
 
  const [viewType, setViewType] = useState('List View');
  const [active, setActive] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [date, setDate] = useState(new Date());
  const [filteredData, setFilteredData] = useState([]);
  const handleViewType = (e) => {
    setViewType(e.target.value);
  };

  

  useEffect(() => {
    if(store.journalList && store.journalList.length > 0){
      let tmp = [];
      store.journalList.map((entry) => {
        if (
          entry?.title?.toLowerCase().includes(searchQuery?.toLowerCase()) &&
          new Date(entry.date).getFullYear() === date.getFullYear() &&
          new Date(entry.date).getMonth() === date.getMonth()
        ) {
          tmp.push(entry);
        }
      });
      setFilteredData(tmp);
    }
  }, [store?.journalList, date]);

 
  // if (JournallistData.length < 1) {
  //   props.setStatusOpen('new');
  // }

  return (
    <>
      <div className="top-jurl-search-view">
        <div className="d-flex justify-content-between align-items-center">
          {collapse && (
            <div className="btn-collapse-wrapper">
              <Button
                className="btn-icon btn btn-flat-dark btn-sm btn-toggle-sidebar"
                color="flat-dark"
                onClick={handleJournalCollapse}
              >
                <ChevronRight size={18} />
              </Button>
            </div>
          )}
          <div className="d-flex justify-content-end">
            <Input
              type="text"
              placeholder="Search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ marginRight: '5px', maxWidth: '180px' }}
            />
            <Input
              type="select"
              onChange={handleViewType}
              value={viewType}
              style={{ maxWidth: '180px' }}
            >
              <option value="List View">List View</option>
              <option value="Calendar View">Calendar View</option>
            </Input>
          </div>
        </div>
      </div>
      <div className="mb-4 jrnl-view">
        <CalendarHeader date={date} setDate={setDate} />
        {viewType === 'List View' && filteredData?.length > 0 ? (
          filteredData.map((data, i) => {
            const createdAt = data?.updatedAt;
            const dateObj = new Date(createdAt);
            const hours = dateObj.getHours();
            const minutes = dateObj.getMinutes();
            const amPm = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = hours % 12 || 12;
            const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
            const formattedTime = `${formattedHours}:${formattedMinutes} ${amPm}`;
            const cleanText = data?.desc.replace(/(<([^>]+)>)/gi, '');
            const date = new Date(createdAt);
            const month = date.toLocaleString('default', { month: 'long' });

            return (
              <>
                <div
                  style={{ cursor: 'pointer' }}
                  key={i}
                  onClick={() => {
                    setViewDetailsId(data?._id);
                    setStatusOpen('open');
                    setActive(i);
                  }}
                  className={`d-flex justify-content-between jour-1 list-item list-item-wrapper ${
                    active == i && 'active'
                  }`}
                >
                  <div className="d-flex">
                    <div className={`jour-lf ${active == i && 'active'}`}>
                      <p className="dayofcard">
                        <Moment format="ddd ">{data?.createdAt}</Moment>
                      </p>
                      <h1 className="dateincard font-weight-bold">
                        <Moment format=" D ">{data?.createdAt}</Moment>
                      </h1>
                    </div>
                    <div className="jour-md">
                      <h5>{data?.title}</h5>
                      <span className="customhmlyext">{cleanText}</span>
                      <p className="timeincard">
                        {month} {formattedTime}
                      </p>
                    </div>
                  </div>

                  <div className="jour-rg">
                    <img src={data?.jrnl_img} className="app-img" alt="" />
                  </div>
                </div>
              </>
            );
          })
        ) : viewType === 'Calendar View' ? (
          <JournalCalender
            setViewType={setViewType}
            setViewDetailsId={setViewDetailsId}
            viewDetailsId={viewDetailsId}
            setStatusOpen={(status) => setStatusOpen(status)}
            setActive={setActive}
          />
        ) : (
          <>
            <div className="text-center mt-5">
              <img
                src={NotFound}
                style={{ maxHeight: '300px', height: 'auto', width: '100%', maxWidth: '300px' }}
              />
              <h3 className="mt-2">No Data Found This Month!</h3>
            </div>
          </>
        )}
      </div>
    </>
  );
}
