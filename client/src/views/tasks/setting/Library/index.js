import { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Card,
  CardTitle,
  CardSubtitle,
  CardBody,
  CardText,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Badge,
  Button,
  Input,
  InputGroup,
  InputGroupText,
  Spinner,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from 'reactstrap';
import { Search, Trash } from 'react-feather';
import {
  AiOutlineFilePdf,
  AiOutlineLayout,
  AiFillPicture,
  AiOutlineScan,
  AiOutlineLink,
  AiOutlineClockCircle,
  AiOutlineFall,
  AiOutlineEye
} from 'react-icons/ai';

import AutosizeInput from 'react-input-autosize';

// * Styles
import '@src/assets/styles/setting/library.scss';
import '@src/assets/styles/setting/toggle-switch.scss';

// * Components
import CodeCard from './CodeCard';

// * Action and APIs
import { fetchQRCodeApi, deleteQRCode } from '../store';
import Swal from 'sweetalert2';

const CodeLibrary = () => {
  const [searchVal, setSearchVal] = useState(undefined);
  const [searchResult, setSearchResult] = useState([]);
  const [deleteAllQRCodeModal, setDeleteQRCodeModal] = useState(false);
  const [toggleIsQRCode, setToggleIsQRCode] = useState(true);

  const dispatch = useDispatch();

  const store = useSelector((state) => state.qrcode);

  useEffect(() => {
    dispatch(fetchQRCodeApi());
  }, [dispatch]);

  useEffect(() => {
    const tmpArr = store?.qrcodeList?.filter(
      (code) => code.qrcodeName.toLowerCase().indexOf(searchVal) > -1
    );
    setSearchResult(tmpArr);
  }, [searchVal]);

  const deleteAllQRCode = () => {
    Swal.fire({
      title: 'Delete?',
      text: `Are you sure you want to delete all QR Codes?`,
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete anyway',
      cancelButtonText: 'Cancel',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteQRCode({ qrcodes: store?.qrcodeList }));
        toast.success('Successfully Deleted');
      }
    });
  };

  const deleteAllQRCodeToggle = () => {
    setDeleteQRCodeModal(!deleteAllQRCodeModal);
  };

  const handleKeyPress = (e) => {
    if (e.keyCode !== 32) return;

    e.preventDefault();
    setToggle(!toggleIsQRCode);
  };

  const id = 'toggle-switch-library';
  const name = 'toggle-switch-library';
  const optionLabels = ['QRCode', 'Barcode'];

  return (
    <Fragment>
      <Row className="library">
        <div className="d-flex justify-content-between" style={{ padding: 0, margin: 0 }}>
          <div className="fs-2 code-title">Library</div>
          <div className="d-flex align-items-center" style={{ padding: '1rem', width: '50%' }}>
            <InputGroup
              className="input-group-merge"
              style={{ width: '100%', marginRight: '1rem' }}
            >
              <InputGroupText>
                <Search className="text-muted" size={14} />
              </InputGroupText>
              <Input
                placeholder="Search"
                value={searchVal}
                onChange={(e) => {
                  e.preventDefault();
                  setSearchVal(e.target.value.toLowerCase());
                }}
              />
            </InputGroup>
            <div className="toggle-switch-code">
              <input
                type="checkbox"
                name={name}
                className="toggle-switch-code-checkbox"
                id={id}
                checked={toggleIsQRCode}
                onChange={(e) => setToggleIsQRCode(e.target.checked)}
              />
              {id ? (
                <label
                  className="toggle-switch-code-label"
                  // tabIndex={disabled ? -1 : 1}
                  onKeyDown={(e) => handleKeyPress(e)}
                  htmlFor={id}
                >
                  <span
                    className="toggle-switch-code-inner"
                    data-yes={optionLabels[0]}
                    data-no={optionLabels[1]}
                    tabIndex={-1}
                  />
                  <span className="toggle-switch-code-switch" tabIndex={-1} />
                </label>
              ) : null}
            </div>
            <Button.Ripple
              className="btn-icon me-1"
              color="flat-dark"
              onClick={(e) => {
                e.preventDefault();
                deleteAllQRCode()
              }}
              disabled={!store?.qrcodeList?.length}
            >
              <Trash size={16} />
            </Button.Ripple>
            <Modal isOpen={deleteAllQRCodeModal} toggle={() => deleteAllQRCodeToggle()}>
              <ModalHeader toggle={() => deleteAllQRCodeToggle()}>Delete QR Code</ModalHeader>
              <ModalBody>
                <div>Really delete all QR Codes?</div>
              </ModalBody>
              <ModalFooter>
                <Button.Ripple
                  color="danger"
                  onClick={(e) => {
                    e.preventDefault();
                    deleteAllQRCode();
                  }}
                >
                  Delete
                </Button.Ripple>
                <Button.Ripple
                  color="secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    deleteAllQRCodeToggle();
                  }}
                >
                  Cancel
                </Button.Ripple>
              </ModalFooter>
            </Modal>
          </div>
        </div>
        <Row className="code-list">
          {searchVal == undefined
            ? store?.qrcodeList
                ?.filter((x) => (toggleIsQRCode ? x.codeType == '1' : x.codeType == '2'))
                .map((codeInfo, index) => {
                  return (
                    <Col
                      key={`qrcode_col_${Math.floor(Math.random() * 1000 + Math.random() * 1000)}`}
                      md="12"
                      className="code-info-area"
                    >
                      <CodeCard codeInfo={codeInfo} index={index} />
                    </Col>
                  );
                })
            : searchResult
                ?.filter((x) => (toggleIsQRCode ? x.codeType == '1' : x.codeType == '2'))
                .map((codeInfo, index) => {
                  return (
                    <Col md="12" className="code-info-area">
                      <CodeCard codeInfo={codeInfo} index={index} />
                    </Col>
                  );
                })}
        </Row>
      </Row>
    </Fragment>
  );
};

export default CodeLibrary;
