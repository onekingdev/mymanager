import React, { useState, useRef, useEffect } from 'react';

import { sendCodeAction } from '../../../../store/action';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Table,
  Form
} from 'reactstrap';

import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import useMessage from '../../../../../../lib/useMessage';
import { FaPaperPlane } from 'react-icons/fa';
import { convertToPlain } from '../../../../../../utility/Utils';
const SendCodeModal = ({
  sendCodeModalOpen,
  setSendCodeModalOpen,
  toggle,
  code,
  setCode,
  devs,
  setDevs
}) => {
  const dispatch = useDispatch();
  // Click Handler
  const handleYesClick = () => {
    let tmp = document.querySelector('#sendingCode').innerHTML;
    setCode(convertToPlain(tmp));
    dispatch(
      sendCodeAction({
        devs,
        code
      })
    );
    toggle();
  };
  const handleNoClick = () => {
    setCode('');
    toggle();
  };

  const onChangeDevs = (e) => {
    setDevs(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key == 'Enter' || e.key == ',') {
      let isVaildEmail = true;
      let devEmailArr = [];
      if (devs != '') {
        devEmailArr = devs.split(',').map((item) => item.trim());
        let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        devEmailArr.map((item) => {
          if (!item.match(validRegex)) {
            isVaildEmail = false;
          }
        });
      }

      if (isVaildEmail == false) {
        toast.error('Invalid Email');
      } else {
        setDevs(devEmailArr);
      }
    }
  };

  return (
    <form>
      <Modal isOpen={sendCodeModalOpen} toggle={toggle} centered>
        <ModalHeader>
          <div>
            <h3 className="d-flex align-items-center">
              <FaPaperPlane size={20} className="me-1" /> Confirm To Send?
            </h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <h6>Send To:</h6>
          <Input
            type="textarea"
            name="text"
            id="exampleText"
            rows="3"
            value={devs}
            onChange={onChangeDevs}
            onKeyPress={handleKeyPress}
            placeholder="Seperated By Commas Ex. example1@gmail.com, example2@gmail.com ..."
          />
        </ModalBody>
        <ModalFooter>
          <Button
            size="sm"
            onClick={(e) => {
              handleNoClick(e);
            }}
          >
            No
          </Button>
          <Button
            // disabled={deleteLoading}
            size="sm"
            color="primary"
            onClick={(e) => {
              handleYesClick(e);
            }}
          >
            Yes
          </Button>
        </ModalFooter>
      </Modal>
    </form>
  );
};

export default SendCodeModal;
