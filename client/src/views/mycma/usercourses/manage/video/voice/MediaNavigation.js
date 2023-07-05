import React, { useEffect, useState } from 'react';
import { useSpeechRecognition } from './speech';
// import MicRecorder from 'mic-recorder-to-mp3';
import { Row, Col, Card, CardBody, Input, Button } from 'reactstrap';

const MediaNavigation = () => {
  const [isRecording, setRecording] = useState(false);
  const [blobURL, setBlobURL] = useState('');
  const [isBlocked, setBlocked] = useState(false);
  const recorder = new MicRecorder({
    bitRate: 128
  });
  const recordStart = (e) => {
    recorder
      .start()
      .then(() => {
        setRecording(true);
      })
      .catch((e) => {
        console.error(e);
      });
  };
  const recordStop = (e) => {
    recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob);
        setBlobURL(blobURL);
        setRecording(false);
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    navigator.getUserMedia(
      { audio: true },
      () => {
        console.log('Permission Granted');
        setBlocked(false);
      },
      () => {
        console.log('Permission Denied');
        setBlocked(true);
      }
    );
  }, []);

  return (
    <div>
      <Button className="start" onClick={(e) => recordStart(e)}>
        Start
      </Button>
      <Button className="stop" onClick={(e) => recordStop(e)}>
        Stop
      </Button>
      <audio src={blobURL} controls="controls" />
    </div>
  );
};

export default MediaNavigation;
