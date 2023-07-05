import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Row, Col, Modal, ModalHeader } from 'reactstrap';
import { customInterIceptors } from '../../lib/AxiosProvider';
const API = customInterIceptors();
import moment from 'moment';
import { Device } from 'twilio-client';
import { Mic, MicOff } from 'react-feather';
import TimerCountDown from './Timer';
import states from './states';

const Voice = (props) => {
  const { openCallModel, toggleModal, stateCall, setStateCall } = props;

  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  const activeContact = useSelector((state) => state.text?.ActiveContact);

  const [device, setDevice] = useState(null);
  const [token, setToken] = useState('');
  const [ciTime, setCiTime] = useState('');
  const [recording, setRecording] = useState(false);
  const [selectedPhone, setSelectedPhone] = useState('');
  const twilioFormat = (phoneNumber) => {
    if (phoneNumber.charAt(0) !== '+') {
      return '+' + phoneNumber;
    } else {
      return phoneNumber;
    }
  };

  useEffect(() => {
    activeContact && setSelectedPhone(activeContact.phone);
  }, [activeContact]);
  useEffect(() => {
    // handleCall()
    // handleClick()
    const init = async () => {
      try {
        if (token) {
          const device = new Device();
          setDevice(device);

          setStateCall(states.READY);
          device.setup(token, {
            // Set Opus as our preferred codec. Opus generally performs better, requiring less bandwidth and
            // providing better audio quality in restrained network conditions. Opus will be default in 2.0.
            codecPreferences: ['opus', 'pcmu'],
            // Use fake DTMF tones client-side. Real tones are still sent to the other end of the call,
            // but the client-side DTMF tones are fake. This prevents the local mic capturing the DTMF tone
            // a second time and sending the tone twice. This will be default in 2.0.
            fakeLocalDTMF: true,
            // Use `enableRingingState` to enable the device to emit the `ringing`
            // state. The TwiML backend also needs to have the attribute
            // `answerOnBridge` also set to true in the `Dial` verb. This option
            // changes the behavior of the SDK to consider a call `ringing` starting
            // from the connection to the TwiML backend to when the recipient of
            // the `Dial` verb answers.
            enableRingingState: true,
            allowIncomingWhileBusy: true
          });
          // device.sounds.incoming(ignore_call);
          // device.on('ready',function (device){

          // });
          device.on('ready', () => {
            var params = {
              To: twilioFormat(selectedPhone),
              //  To: '+1' + num
              user_id: userData?.id,
              recording: recording
            };
            device.connect(params);
            setStateCall(states.READY);
          });
          device.on('error', function (error) {
            setStateCall('Connection Declined');
            toast.error('Your recepitant did not receive call. Please redial later');
          });
          device.on('connect', function (conn) {
            // conn.sendDigits($(this).attr('data-digit'));
            setStateCall('On call');
          });
          device.on('disconnect', function (conn) {
            device.disconnectAll();
            setStateCall('end');
            toggleModal();
          });
          device.on('incoming', function (conn) {
            conn.accept();
            setStateCall('Incoming');
            console.log(conn);
          });
        }
      } catch (e) {}
    };
    init();
  }, [token]);

  const handleHangup = () => {
    try {
      device.disconnectAll();
      setStateCall('end');
      toggleModal();
    } catch (e) {}
  };

  const handleClick = async () => {
    try {
      if (selectedPhone == undefined) {
        toast.error('Please select contact');
        return;
      }
      var jun = moment().format('x');
      setCiTime(jun);
      const identity = 'phil';
      // setClicked(true)
      let data = await API.get(`voice/voice/token?identity=${encodeURIComponent(identity)}`);
      await API.post('voice/voice/outgoing', {
        selectedPhone: selectedPhone,
        recording: recording
      });
      setToken(data?.data?.token);
    } catch (err) {
      if (err.name == 'AxiosError') {
        toggleModal();
        toast.error('Call End');
      }
    }
  };
  const handleChangeToggle = async (event) => {
    setRecording(!recording);
  };

  return (
    <div>
      <Modal isOpen={openCallModel} toggle={() => toggleModal()}>
        <ModalHeader toggle={() => toggleModal()}>Voice Call</ModalHeader>
        <div
          style={{
            width: '500px'
          }}
          className="d-flex align-items-center justify-content-center"
        >
          <Row>
            <br />
            <br />
            {stateCall === states.INCOMING ? (
              <div className="call">
                <p style={{ color: 'white' }}>Incomming {num}</p>

                <Button
                  style={{ color: 'white' }}
                  // </div>handleClick={() => handleCall()}
                  color="green"
                >
                  Call Incomming
                </Button>
              </div>
            ) : stateCall === states.ON_CALL ? (
              <div className="call" style={{ width: '500px' }}>
                {/* <p style={{ color: 'white' }}>on Call {num}</p> */}
                {/* <br /> <br /> */}
                <div style={{ textAlign: 'center' }}>
                  <TimerCountDown ciTime={ciTime} />
                </div>

                <div className="d-flex align-items-center justify-content-between">
                  {recording && (
                    <div>
                      recording call now ..
                      <br /> <br />
                    </div>
                  )}

                  <Button
                    color="danger"
                    className="mr-1"
                    style={{ color: 'white' }}
                    onClick={() => handleHangup()}
                  >
                    Call end
                  </Button>
                </div>
              </div>
            ) : stateCall == states.Declined ? (
              <div className="call">
                <p style={{ color: 'white' }}>Call Declined </p>

                <Button
                  style={{ color: 'white' }}
                  // </div>handleClick={() => handleCall()}
                  color="green"
                >
                  Call Declined
                </Button>
              </div>
            ) : stateCall == states.callEnd ? (
              <div className="call py-1">
                <p className="mb-0">Your Call ended Successfully</p>
              </div>
            ) : (
              <div className="call" style={{ width: '500px' }}>
                <div className="d-flex align-items-center justify-content-between py-1">
                  <div>Number: {selectedPhone && twilioFormat(selectedPhone)}</div>

                  <Col>
                    <div className="d-flex justify-content-end">
                      {recording ? (
                        <Button color="link" onClick={() => handleChangeToggle()}>
                          <Mic />
                        </Button>
                      ) : (
                        <Button
                          color="link"
                          className="text-secondary"
                          onClick={() => handleChangeToggle()}
                        >
                          <MicOff />
                        </Button>
                      )}
                      <Button color="primary" className="mr-1" onClick={() => handleClick()}>
                        call
                      </Button>
                    </div>
                  </Col>
                </div>
              </div>
            )}

            <br />
            <br />
          </Row>
        </div>
      </Modal>
    </div>
  );
};
export default memo(Voice);
