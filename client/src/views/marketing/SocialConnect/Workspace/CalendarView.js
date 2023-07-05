// import React, { Fragment } from "react"

// const CalendarView = () => {
//     return (
//         <Fragment>
//             This is Calendar View
//         </Fragment>
//     )
// }
// export default CalendarView

import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Card } from 'reactstrap';
import '@styles/react/apps/app-calendar.scss';
import '../../../../assets/styles/socialconnect.scss';
import {
  getComposePost,
  getComposePostById,
  viewOneWorkspace
} from '../../../../requests/Planable';
import { useParams } from 'react-router-dom';

const CalendarView = () => {
  const handleEventDrop = (info) => {};
  const [data, setData] = useState([]);
  const [Postfilterdata, setPostfilterdata] = useState([]);
  const [syncfilterdata, setsyncfilterdata] = useState([]);

  const params = useParams();

  useEffect(() => {
    getCompose();
    GetOneWorkSpace();
  }, [params]);
  const GetOneWorkSpace = async () => {
    // setLoader(true);
    await viewOneWorkspace(params.id).then((response) => {
      // console.log(response);
      if (response?.facebookData.length > 0) {
        // setLoader(false)
        // GetFbPost(response);
        // EditWorkSpace(response);
        // setFbViewOne(response?.facebookData[0]);
        // setViewOne(response?.facebookData[0]);
      } else if (response?.googleData.length > 0) {
        // setLoader(false);
        // setViewOne(response.googleData[0]);
      }
    });
  };
  const getCompose = async () => {
    // await getComposePost().then((resp) => {
    //   setData(resp);
    // });
    await getComposePostById(params.id).then((res) => {
      console.log(res);
      setData(res);
    });
  };
  function renderEventContent(postdata) {
    // console.log(postdata);

    return (
      <>
        {postdata?.event?.url !== 'undefined' ? (
          <>
            <img
              style={{ borderRadius: '10px' }}
              width="25px"
              height="25px"
              src={postdata?.event?.url}
            />
          </>
        ) : null}
        <b className="titleofevent">{postdata?.event.title?.slice(0, 18)}</b>
      </>
    );
  }
  return (
    <Card className="px-2">
      <div className="calendar my-2">
        <FullCalendar
          initialView="dayGridMonth"
          plugins={[interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin]}
          headerToolbar={{
            start: 'sidebarToggle, prev,next, title',
            end: 'dayGridMonth,timeGridWeek'
          }}
          events={
            data.map((value) => ({
              url: `${value?.media_img !== '' ? value?.media_img[0] : null}`,
              id: value?._id,
              title: value?.desc,
              date: `${value?.date !== '' ? value?.date : null}`
            }))
            // syncfilterdata.map((value) => ({
            //   url: `${value?.media_img !== '' ? value?.media_img[0] : null}`,
            //   id: value?._id,
            //   title: value?.desc,
            //   date: `${value?.date !== '' ? value?.date : null}`
            // }))
          }
          // selectable={true}
          eventContent={renderEventContent}
          eventDrop={handleEventDrop}
        />
      </div>
    </Card>
  );
};

export default CalendarView;
