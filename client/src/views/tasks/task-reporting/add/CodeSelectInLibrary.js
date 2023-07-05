import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { fetchQRCodeApi } from '../../setting/store';
import useMessage from '../../../../lib/useMessage';

import CodeCard from './CodeCard';

const CodeSelInLib = (props) => {
  const { open, setOpen, codeData, selectedIndex, todos, setTodos } = props;
  const data = codeData.filter((x) =>
    todos[selectedIndex]?.proofType == 'qrCode' ? x.codeType == '1' : x.codeType == '2'
  );
  const [selectedCodeIndex, setSelectedCodeIndex] = useState(-1);

  const { success, error } = useMessage();

  const dispatch = useDispatch();

  const confirmBtnClicked = () => {
    if (selectedCodeIndex < 0) {
      error('Please select the code');
      return;
    } else {
      setTodos((p) => {
        p[selectedIndex].codeURL = data[selectedCodeIndex]?.qrcodeImgURL;
        return [...p];
      });
      setOpen(false);
    }
  };

  const cancleBtnClicked = () => {
    setOpen(false);
    setSelectedCodeIndex(-1);
  };

  const handleCodeSelected = () => {};

  const getCodeIndex = () => {
    if (selectedCodeIndex >= 0) return selectedCodeIndex;
    for (let i = 0; i < data.length; i++) {
      if (data[i].qrcodeImgURL == todos[selectedIndex]?.codeURL) {
        return i;
      }
    }
    return -1;
  };

  return (
    <Modal
      isOpen={open}
      toggle={() => cancleBtnClicked()}
      className="modal-dialog-centered"
      size="lg"
    >
      <ModalHeader toggle={() => cancleBtnClicked()}>
        {todos[selectedIndex]?.proofType == 'qrCode' ? 'Select QR Code' : 'Select Barcode'}
      </ModalHeader>
      <ModalBody>
        {data?.map((code, index) => {
          return (
            <CodeCard
              key={`codecard_${index}`}
              code={code}
              index={index}
              handleCodeSelected={handleCodeSelected}
              selectedIndex={getCodeIndex()}
              setSelectedIndex={setSelectedCodeIndex}
            />
          );
        })}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={confirmBtnClicked}>
          OK
        </Button>
        <Button color="secondary" onClick={cancleBtnClicked}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CodeSelInLib;
