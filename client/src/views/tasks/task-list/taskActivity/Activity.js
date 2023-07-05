// ** React Imports
import { Fragment, useEffect, useState } from 'react';

// ** Custom Components
import Avatar from '@components/avatar';
import DataTable from 'react-data-table-component';

//** Function Imports
import activityTimeDifference from '../../../business/projects/activity/ActivityTimeDifference';

//** Redux Imports
import { useSelector } from 'react-redux';

// ** Icons Imports
import { ChevronDown, Clock } from 'react-feather';
import { getAvatarColor } from '../../../calendar/attendance/constants';
import { TbNewSection, TbStatusChange } from 'react-icons/tb';
import { FiEdit3 } from 'react-icons/fi';
import { CgRowFirst } from 'react-icons/cg';
import { cvtColor } from '../../../contacts/contact-list/constants';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { AiOutlineDelete } from 'react-icons/ai';

// ** Reactstrap Imports

const Activity = (props) => {
  const { activityList } = props;

  const [dataList, setDataList] = useState(activityList);

  useEffect(() => {
    setDataList(activityList);
  }, [activityList]);

  const columns = [
    {
      name: 'TIME',
      minWidth: '90px',
      cell: (row) => {
        return (
          <div>
            <Clock size={16} style={{ marginInlineEnd: '5px' }} />
            {activityTimeDifference(row?.createdAt)}
          </div>
        );
      }
    },
    {
      name: 'USER',
      width: '70px',
      cell: (row) => {
        return (
          <>
            {row?.userInfo[0]?.image ? (
              <Avatar
                className="me-1"
                img={row?.userInfo[0]?.image}
                width="32"
                height="32"
                initials
              />
            ) : (
              <Avatar
                color={getAvatarColor(row?.userId) || 'primary'}
                className="me-1"
                content={`Clinton Oh` || 'John Doe'}
                initials
              />
            )}
          </>
        );
      }
    },
    {
      name: 'TYPE',
      minWidth: '165px',
      cell: (row) => {
        return <div>{renderActivity(row?.activity)}</div>;
      }
    },
    {
      name: 'DATA',
      minWidth: '300px',
      cell: (row) => {
        return (
          <div>
            {row?.prev ? (
              <div className="d-flex align-items-center">
                <div
                  style={{
                    backgroundColor: cvtColor[row?.prevColor || 'secondary'],
                    color: row?.prevColor?.includes('light')
                      ? cvtColor[row?.prevColor?.slice(6)]
                      : '#fff',
                    padding: '8px',
                    borderRadius: '5px',
                    textAlign: 'center',
                    fontWeight: 500
                  }}
                >
                  {row?.prev}
                </div>
                <div style={{ paddingInline: '2px' }}>
                  <MdOutlineKeyboardArrowRight size={18} />
                </div>
                <div
                  style={{
                    backgroundColor: cvtColor[row?.currentColor || 'secondary'],
                    color: row?.currentColor.includes('light')
                      ? cvtColor[row?.currentColor?.slice(6)]
                      : '#fff',
                    padding: '8px',
                    borderRadius: '5px',
                    textAlign: 'center',
                    fontWeight: 500
                  }}
                >
                  {row?.current}
                </div>
              </div>
            ) : row?.currentColor ? (
              <div
                style={{
                  backgroundColor: cvtColor[row?.currentColor || 'secondary'],
                  color: row?.currentColor.includes('light')
                    ? cvtColor[row?.currentColor?.slice(6)]
                    : '#fff',
                  padding: '8px',
                  borderRadius: '5px',
                  textAlign: 'center',
                  fontWeight: 500
                }}
              >
                {row?.current}
              </div>
            ) : (
              <b>{row?.current}</b>
            )}
          </div>
        );
      }
    }
  ];

  const renderActivity = (activity) => {
    switch (activity) {
      case 'Task Created':
        return (
          <>
            <TbNewSection size={16} style={{ marginInlineEnd: '5px' }} />
            {activity}
          </>
        );
      case 'Task Updated':
        return (
          <>
            <FiEdit3 size={16} style={{ marginInlineEnd: '5px' }} />
            {activity}
          </>
        );
      case 'Task Status':
        return (
          <>
            <TbStatusChange size={16} style={{ marginInlineEnd: '5px' }} />
            {activity}
          </>
        );
      case 'Status Created':
        return (
          <>
            <TbNewSection size={16} style={{ marginInlineEnd: '5px' }} />
            {activity}
          </>
        );
      case 'Status Updated':
        return (
          <>
            <FiEdit3 size={16} style={{ marginInlineEnd: '5px' }} />
            {activity}
          </>
        );
      case 'Status Removed':
        return (
          <>
            <AiOutlineDelete size={16} style={{ marginInlineEnd: '5px' }} />
            {activity}
          </>
        );
      default:
        return (
          <>
            <CgRowFirst size={16} style={{ marginInlineEnd: '5px' }} />
            {activity}
          </>
        );
    }
  };

  return (
    <Fragment>
      {/* <th style={{ width: '12rem' }}>Time & User</th>
      <th style={{ width: '13rem' }}>Project / Task</th>
      <th style={{ width: '15rem' }}>Activity</th>
      <th style={{ width: '4rem' }}>Category</th>
      <th style={{ width: '11rem' }}>Transition</th> */}
      {activityList?.length > 0 && (
        <DataTable
          className="react-dataTable"
          noHeader
          responsive
          pagination
          columns={columns}
          data={dataList}
          // onRowClicked={handleTaskClick}
          style={{ cursor: 'pointer' }}
          sortIcon={<ChevronDown size={14} />}
        />
      )}
    </Fragment>
  );
};

export default Activity;
