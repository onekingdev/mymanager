import React, { useState, useEffect } from 'react';
import { Input, Row, Button, Col } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

const FaceRecognition = () => {
  const dispatch = useDispatch();
  // ** States
  const [attendanceList, setAttendanceList] = useState([]);

  let faceio;
  // ** Selectors
  const attendanceStore = useSelector((state) => state.totalContacts.employeeAttance);
  // ** Effects
  useEffect(() => {
    setAttendanceList(attendanceStore?.data);
  }, [attendanceStore?.data]);

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

  useEffect(() => {
    faceio = new faceIO('fioa6862');
  }, []);

  const handleLogIn = async () => {
    try {
      let response = await faceio.authenticate({
        locale: 'auto'
      });
      console.log('res', response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Row
        className="d-flex mt-5 justify-content-center font-large-1 px-2 text-center"
        style={{ fontWeight: 'bold', color: 'white' }}
      >
        Face Recognition
      </Row>
      <Row className="px-2">
        <p className="mt-2 mb-4 text-body text-center">
          To start face recognition, please click the start button
        </p>
        <Button color="primary" id="check" className="rounded-50" onClick={(e) => handleLogIn(e)}>
          Start
        </Button>
      </Row>
    </div>
  );
};

export default FaceRecognition;
