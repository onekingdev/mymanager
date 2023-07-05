import { Row, Col, Card, CardBody, Input, Button, Form } from 'reactstrap';
import { Link } from 'react-router-dom';
import React, { useCallback, useRef, useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { createVideo, setErrors } from '../../store';
import { ArrowLeft, ArrowRight } from 'react-feather';
import Webcam from "react-webcam";
import useMessage from '../../../../../lib/useMessage';
import axios from 'axios';

const CreateVideo = ({ stepper, type, eventForm, eventInfo }) => {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const { success, error } = useMessage();
  const history = useHistory();
  const dispatch = useDispatch();
  const defaultValues = {};

  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues });

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable]);

  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, setCapturing]);

  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = "react-webcam-stream-capture.webm";
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  const videoConstraints = {
    width: 420,
    height: 420,
    facingMode: "user",
  };

  const handleCreate = () => {
    let title = eventForm.get('title');
    let description = eventForm.get('description');
    let text = eventForm.get('text');
    let modelType = eventForm.get('modelType');
    let voiceType = eventForm.get('voiceType');
    let backgroundType = eventForm.get('backgroundType');
    const options = {
      method: 'POST',
      headers: {'authorization': '9fce07dd3513a2db4560776814221276', 'Content-Type': 'application/json' },
      body: JSON.stringify({"test": true, "title": title, "description": description, "visibility": "public", "ctaSettings": { "label": "Click me!", "url": "https://www.synthesia.io" }, "callbackId": "rich.swift426@gmail.com", "input": [ { "scriptText": text, "avatar": modelType, "avatarSettings": { "voice": voiceType, "horizontalAlign": "center", "scale": 1.0, "style": "rectangular" },  "background": backgroundType } ], "soundtrack": "urban"})
    };

    dispatch(createVideo(eventForm));
    success('New video created');
    history.push('/manage-usercourses');
    fetch('https://api.synthesia.io/v2/videos', options)
    .then(res => res.json())
    .then(result => {
      console.log('here is test', result);
    })
    .catch(function (error) {
      console.error(error);
    });
  }

  const handleFileSelected = (e) => {
    let tmp;
    var r = new FileReader();
    r.onload = function(){ tmp = r.result };
    r.readAsBinaryString(file);
    console.log(e.target.files[0].getAsBinary());
    const options = {
      mode: 'no-cors',
      method: 'POST',
      headers: {'accpet': 'application/json', 'content-type': 'application/json', 'authorization': '9fce07dd3513a2db4560776814221276'},
      data: {
        RAW_BODY: e.target.files[0].getAsBinary()
      }
    };

    fetch('https://upload.api.synthesia.io/v2/assets', options)
    .then(res => res.json())
    .then(result => {
      console.log('here is file', result);
    })
  }


  return (
    <Form onSubmit={handleSubmit(handleCreate)}>
      <div className="Container">
        <Webcam
          height={400}
          width={400}
          audio={false}
          mirrored={true}
          ref={webcamRef}
          videoConstraints={videoConstraints}
          border={2}
        />
        {capturing ? (
          <Button color="primary" onClick={handleStopCaptureClick}>Stop Capture</Button>
        ) : (
          <Button color="primary" onClick={handleStartCaptureClick}>Start Capture</Button>
        )}
        {recordedChunks.length > 0 && (
          <Button color="primary" onClick={handleDownload}>Download</Button>
        )}
      </div>
      <div>
        <Input color="primary" onChange={handleFileSelected} type="file" />
      </div>
      <div className="d-flex justify-content-between">
        <Button
          color="primary"
          className="btn-prev"
          onClick={() => stepper.previous()}
        >
          <ArrowLeft
            size={14}
            className="align-middle me-sm-25 me-0"
          ></ArrowLeft>
          <span className="align-middle d-sm-inline-block d-none">
            Previous
          </span>
        </Button>
        <Button
          color="primary"
          className="btn-next"
          type="submit"
        >
          <span className="align-middle d-sm-inline-block d-none">
            Create
          </span>
          <ArrowRight
            size={14}
            className="align-middle ms-sm-25 ms-0"
          ></ArrowRight>
        </Button>
      </div>
    </Form>
  );
};

export default CreateVideo;