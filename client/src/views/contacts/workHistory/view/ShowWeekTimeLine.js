import React from 'react';

const ShowWeekTimeLine = (props) => {
  const historyData = props.data;
  const renderItem = (data) => {
    return (
      <th className="border cursor-pointer">
        <div className="text-center ">
          <small>
            {parseInt(data.tracker / 60)}h {data.tracker % 60}m/8h
          </small>
        </div>
        <div className="progress">
          <div className="progress-bar" style={{ width: `calc(100%*${data.tracker}/480)` }}></div>
        </div>
      </th>
    );
  };

  return (
    <>
      {historyData.length != 0 && historyData.map((item) => renderItem(item))}
      {historyData.length == 0 && (
        <>
          <th className="border cursor-pointer">
            <div className="text-center ">
              <small>0h 0m/8h</small>
            </div>
            <div className="progress"></div>
          </th>
          <th className="border cursor-pointer">
            <div className="text-center ">
              <small>0h 0m/8h</small>
            </div>
            <div className="progress"></div>
          </th>

          <th className="border cursor-pointer">
            <div className="text-center ">
              <small>0h 0m/8h</small>
            </div>
            <div className="progress"></div>
          </th>
          <th className="border cursor-pointer">
            <div className="text-center ">
              <small>0h 0m/8h</small>
            </div>
            <div className="progress"></div>
          </th>
          <th className="border cursor-pointer">
            <div className="text-center ">
              <small>0h 0m/8h</small>
            </div>
            <div className="progress"></div>
          </th>
          <th className="border cursor-pointer">
            <div className="text-center ">
              <small>0h 0m/8h</small>
            </div>
            <div className="progress"></div>
          </th>
          <th className="border cursor-pointer">
            <div className="text-center ">
              <small>0h 0m/8h</small>
            </div>
            <div className="progress"></div>
          </th>
        </>
      )}
    </>
  );
};

export default ShowWeekTimeLine;
