import React, { useState, useEffect } from 'react';
import { Input, Row, Button, Col } from 'reactstrap';
import { useBarcode } from '@createnextapp/react-barcode';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';

import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  saveAttendEmployeeAction,
  getEmployeeAttendanceAction
} from '../../contacts/store/actions';

const BarCode = (props) => {
  const dispatch = useDispatch();
  const { attendEmpArr, setAttendEmpArr } = props;

  const [data, setData] = useState('Not Found');
  const employeeStore = useSelector((state) => state.employeeContact);
  const attendanceStore = useSelector((state) => state.employeeContact.employeeAttance);
  const [attendanceList, setAttendanceList] = useState([]);
  const [barcodeInfo, setBarcodeInfo] = useState('123 45678');

  useEffect(() => {
    setAttendanceList(attendanceStore?.data);
  }, [attendanceStore?.data]);
  useEffect(() => {
    dispatch(getEmployeeAttendanceAction());
  }, []);
  useEffect(() => {
    return () => {
      // var cameraStream = stream;
      // video.src = window.URL.createObjectURL(stream);
      // video.pause();
      // cameraStream.stop();
      const video = document.querySelector('video');

      // A video's MediaStream object is available through its srcObject attribute
      const mediaStream = video.srcObject;

      if (mediaStream) {
        // Through the MediaStream, you can get the MediaStreamTracks with getTracks():
        const tracks = mediaStream?.getTracks();

        // Tracks are returned as an array, so if you know you only have one, you can stop it with:
        tracks.length > 0 && tracks[0].stop();
      }
    };
  }, []);

  const handleCheckInClick = (e) => {
    let today = new Date().getDay();
    let current = new Date();
    if (employeeStore.employeeList) {
      if (employeeStore.employeeList.data.list.find((item) => item.punchId == data)) {
        employeeStore.employeeList.data.list.map((employee, index) => {
          if (employee.punchId == data) {
            let canAttend = false,
              shiftId = 0;
            employee.shift.map((perShift, index) => {
              if (perShift.weekDay == today) {
                canAttend = true;
                shiftId = perShift._id;
              } else return;
            });
            if (canAttend == true) {
              if (attendanceList.find((item) => item.employeeId[0]._id == employee._id)) {
                toast.error('You already punch in');
                return;
              } else {
                toast.success('You successfully punch in');
                dispatch(
                  saveAttendEmployeeAction({
                    employeeId: employee._id,
                    shiftId: shiftId,
                    actualStart: current
                  })
                );
                if (!isFullScreen) {
                  setSidebarOpen(false);
                }
                history.push('/contacts/employee/info');
                return;
              }
            } else {
              toast.error('Today is not your work day.');
              return;
            }
          } else return;
        });
      } else {
        toast.error('Invalid Punch ID');
      }
    } else {
      return;
    }
  };

  return (
    <div>
      <Row
        className="d-flex mb-4 mt-5 justify-content-center font-large-1 px-2"
        style={{ fontWeight: 'bold', color: 'white' }}
      >
        Card Barcode
      </Row>
      <Row className="mb-4 px-2">
        <Col lg="12" md="12" sm="12" className="h-100 barcode-scanner-wrapper">
          <BarcodeScannerComponent
            onUpdate={(err, result) => {
              if (result) setData(result.text);
              else setData('Not Found');
            }}
          />
          <div className="mt-25">
            <p className="text-white mb-0">{data}</p>
          </div>
        </Col>
      </Row>
      <Row className="mt-3 px-2">
        <Button
          color="primary"
          id="check"
          className="rounded-50"
          onClick={(e) => handleCheckInClick(e)}
        >
          Check In
        </Button>
      </Row>
    </div>
  );
};

export default BarCode;
