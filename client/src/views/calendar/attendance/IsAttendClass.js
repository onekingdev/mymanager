import React, { useState } from 'react';
import { GiCheckMark } from 'react-icons/gi';
import { GrClose } from 'react-icons/gr';
import { RiCloseFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import { markAttendance } from '../store';

const YesNoButton = (props) => {
  const { classRow, updateRow } = props;
  // const [selectedOption, setSelectedOption] = useState(classRow?.status ? classRow?.status : 'no');

  const { selectedClass, classAttendees } = useSelector((state) => state.calendar);
  const attendedContactIdList = classAttendees?.map((x) => x?.contactId);

  const handleOptionSelect = async (option) => {
    const markDate = new Date();

    if (attendedContactIdList?.includes(classRow?.contactId) == !option) {
      const newAttendance = {
        ...classRow,
        status: option,
        classId: selectedClass?._id,
        attendedDateTime: markDate
      };
      updateRow(newAttendance);
      // const response = await dispatch(
      //   markAttendance({
      //     ...classRow,
      //     status: 'yes',
      //     classId: selectedClass?._id,
      //     attendedDateTime: markDate
      //   })
      // );
      // if (response?.payload?.success) {
      //   success('Contact marked successfully');
      // }
    }
    // if (option !== classRow.status) {
    //   const newClassRow = {
    //     ...classRow,
    //     status: option
    //   };
    //   updateRow(newClassRow);
    // }
  };

  return (
    <>
      <Button
        style={{ borderRadius: '0px !important', padding: '5px' }}
        size="sm"
        color={attendedContactIdList?.includes(classRow?.contactId) ? 'success' : 'outline-success'}
        onClick={() => handleOptionSelect(true)}
        // disabled
      >
        <GiCheckMark size={16} />
      </Button>
      <Button
        style={{ borderRadius: '0px !important', marginLeft: '5px', padding: '3px' }}
        size="sm"
        color={!attendedContactIdList?.includes(classRow?.contactId) ? 'danger' : 'outline-danger'}
        onClick={() => handleOptionSelect(false)}
        // disabled
      >
        <RiCloseFill size={20} />
      </Button>
    </>
  );
};

export default YesNoButton;
