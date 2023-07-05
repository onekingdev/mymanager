import { Fragment, useState, useEffect, useRef } from 'react';
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
  Spinner,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Collapse
} from 'reactstrap';

import {
  AiOutlineFilePdf,
  AiOutlineLayout,
  AiFillPicture,
  AiOutlineScan,
  AiOutlineLink,
  AiOutlineClockCircle,
  AiOutlineFall,
  AiOutlineEye,
  AiOutlineDelete,
  AiOutlinePrinter,
  AiOutlineBarcode
} from 'react-icons/ai';

import AutosizeInput from 'react-input-autosize';
import ReactToPrint from 'react-to-print';

// ** Styles
import '@src/assets/styles/setting/library.scss';

// ** Components
import ComponentToPrint from './Print';

// ** Action and APIs
import { fetchQRCodeApi, deleteQRCode } from '../store';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const CodeCard = (props) => {
  var componentRef = useRef(null);

  const { codeInfo, index } = props;

  const dispatch = useDispatch();

  const [viewDetail, setViewDetail] = useState(true);
  const [deleteQRCodeModal, setDeleteQRCodeModal] = useState(false);
  const [getFocus, setGetFocus] = useState(false);

  const downloadQR = async (data) => {
    const image = await fetch(data);
    const imageBlog = await image.blob();
    const imageURL = URL.createObjectURL(imageBlog);

    let downloadLink = document.createElement('a');
    downloadLink.href = imageURL;
    downloadLink.download = 'mymanager_qrcode.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const renderViewDetailButton = () => {
    return (
      <Button
        color="flat"
        style={{ width: '3rem', height: '3rem', cursor: 'pointer' }}
        onClick={(e) => {
          e.preventDefault();
          setViewDetail(!viewDetail);
        }}
      >
        <AiOutlineEye
          size={20}
          style={{ marginLeft: '-0.8rem' }}
          color={viewDetail ? '#174ae7' : '#6e6b7b'}
        />
      </Button>
    );
  };

  const renderTitle = (codeInfo, index) => {
    switch (codeInfo.contentType) {
      case '1':
        return (
          <div className="d-flex align-items-center">
            <AiOutlineLayout size={25} style={{ marginLeft: '-0.2rem', marginRight: '0.5rem' }} />
            <div name="form-field-name">{codeInfo.qrcodeName}</div>
            <Badge
              key={`badge_${Math.floor(Math.random() * 1000 + Math.random() * 1000)}`}
              pill
              color="light-danger"
              style={{ fontSize: '14px', marginInline: '0.5rem' }}
            >
              Website
            </Badge>
            {renderViewDetailButton()}
          </div>
        );
      case '2':
        return (
          <div className="d-flex align-items-center">
            <AiOutlineFilePdf size={25} style={{ marginLeft: '-0.2rem', marginRight: '0.5rem' }} />
            {/* <AutosizeInput name="form-field-name" value={codeInfo.qrcodeName} /> */}
            <div name="form-field-name">{codeInfo.qrcodeName}</div>

            <Badge
              key={`badge_${Math.floor(Math.random() * 1000 + Math.random() * 1000)}`}
              pill
              color="light-success"
              style={{ fontSize: '14px', marginInline: '0.5rem' }}
            >
              PDF
            </Badge>
            {renderViewDetailButton()}
          </div>
        );
      case '3':
        return (
          <div className="d-flex align-items-center">
            <AiFillPicture size={25} style={{ marginLeft: '-0.2rem', marginRight: '0.5rem' }} />
            {/* <AutosizeInput name="form-field-name" value={codeInfo.qrcodeName} /> */}
            <div name="form-field-name">{codeInfo.qrcodeName}</div>

            <Badge
              key={`badge_${Math.floor(Math.random() * 1000 + Math.random() * 1000)}`}
              pill
              color="light-primary"
              style={{ fontSize: '14px', marginInline: '0.5rem' }}
            >
              Image
            </Badge>
            {renderViewDetailButton()}
          </div>
        );
      default:
        return (
          <div className="d-flex align-items-center">
            <AiOutlineBarcode size={25} style={{ marginLeft: '-0.2rem', marginRight: '0.5rem' }} />
            {/* <AutosizeInput name="form-field-name" value={codeInfo.qrcodeName} /> */}
            <div name="form-field-name">{codeInfo.qrcodeName}</div>

            <Badge
              key={`badge_${Math.floor(Math.random() * 1000 + Math.random() * 1000)}`}
              pill
              color="light-primary"
              style={{ fontSize: '14px', marginInline: '0.5rem' }}
            >
              Image
            </Badge>
            {renderViewDetailButton()}
          </div>
        );
    }
  };

  const editQRCode = () => {};

  const printQRCode = () => {};

  const deleteOneQRCode = () => {
    Swal.fire({
      title: 'Delete?',
      text: `Are you sure you want to delete this  QR code?`,
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
        dispatch(deleteQRCode({ qrcodes: [codeInfo] }));
        toast.success('Successfully Deleted');
      }
    });
  };

  const deleteOneQRCodeToggle = () => {
    setDeleteQRCodeModal(!deleteQRCodeModal);
  };

  return (
    <Card
      className="code-card"
      onMouseEnter={(e) => {
        e.preventDefault();
        setGetFocus(true);
      }}
      onMouseLeave={(e) => {
        e.preventDefault();
        setGetFocus(false);
      }}
    >
      <CardBody>
        <Row>
          <Col md="12">
            <CardTitle tag="h5" style={{ marginBottom: 0 }}>
              {renderTitle(codeInfo, index)}
            </CardTitle>
          </Col>
          <Collapse isOpen={viewDetail}>
            <Row>
              <Col md="8">
                <CardSubtitle className="mt-2 mb-2 text-muted" tag="h6">
                  <AiOutlineClockCircle size={20} style={{ marginRight: '0.5rem' }} />
                  Created: {new Date(codeInfo.createdAt).toLocaleString()}
                </CardSubtitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  <AiOutlineLink size={20} style={{ marginRight: '0.5rem' }} />
                  <a href={codeInfo.qrcodeInfo} className="text-muted">
                    {codeInfo.qrcodeInfo}
                  </a>
                </CardSubtitle>
                {codeInfo?.contentURL && (
                  <CardSubtitle className="text-muted" tag="h6">
                    <AiOutlineFall size={20} style={{ marginRight: '0.5rem' }} />
                    <a href={codeInfo?.contentURL} className="text-muted">
                      {codeInfo?.contentURL?.slice(0, 65)}{' '}
                      {codeInfo?.contentURL?.length > 65 && '...'}
                    </a>
                  </CardSubtitle>
                )}
              </Col>
              <Col className="d-flex align-items-center" md="2" style={{ marginTop: '-3rem' }}>
                <img
                  id={`qrcodeImg${index}`}
                  src={codeInfo.qrcodeImgURL}
                  width="100%"
                  style={{ paddingInline: '5%' }}
                />
              </Col>
              <Col
                md="2"
                className="d-flex flex-column align-items-center justify-content-between"
                style={{ marginTop: '-1rem' }}
              >
                <Button.Ripple
                  color="success"
                  style={{ width: '100%' }}
                  onClick={(e) => {
                    e.preventDefault();
                    downloadQR(codeInfo.qrcodeImgURL);
                  }}
                >
                  Download
                </Button.Ripple>
                {getFocus && (
                  <div className="d-flex align-items-center ">
                    {/* <Button
                      color="flat-dark"
                      style={{ width: '3.5rem', height: '3.5rem' }}
                      onClick={(e) => {
                        e.preventDefault();
                        editQRCode();
                      }}
                    >
                      <AiOutlineEdit
                        size={20}
                        style={{ marginLeft: '-0.5rem' }}
                        // color={viewDetail ? '#174ae7' : '#6e6b7b'}
                      />
                    </Button> */}
                    <div style={{ width: '1px', height: '1px', visibility: 'hidden' }}>
                      <ComponentToPrint
                        ref={(el) => (componentRef = el)}
                        qrcodeImgURL={codeInfo.qrcodeImgURL}
                      />
                    </div>

                    <ReactToPrint
                      trigger={() => (
                        <Button.Ripple
                          color="flat-dark"
                          style={{ width: '3.5rem', height: '3.5rem' }}
                          onClick={(e) => {
                            e.preventDefault();
                            printQRCode();
                          }}
                        >
                          <AiOutlinePrinter
                            size={20}
                            style={{ marginLeft: '-0.5rem' }}
                            // color={viewDetail ? '#174ae7' : '#6e6b7b'}
                          />
                        </Button.Ripple>
                      )}
                      content={() => componentRef}
                    />
                    {/* <ComponentToPrint ref={(el) => (this.componentRef = el)} /> */}
                    <Button.Ripple
                      color="flat-dark"
                      style={{ width: '3.5rem', height: '3.5rem' }}
                      onClick={(e) => {
                        e.preventDefault();
                        deleteOneQRCode()
                      }}
                    >
                      <AiOutlineDelete
                        size={20}
                        style={{ marginLeft: '-0.5rem' }}
                        // color={viewDetail ? '#174ae7' : '#6e6b7b'}
                      />
                    </Button.Ripple>
                    
                    <Modal isOpen={deleteQRCodeModal} toggle={() => deleteOneQRCodeToggle()}>
                      <ModalHeader toggle={() => deleteOneQRCodeToggle()}>
                        Delete QR Code
                      </ModalHeader>
                      <ModalBody>
                        <div>Really delete this QR Code?</div>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="danger"
                          onClick={(e) => {
                            e.preventDefault();
                            deleteOneQRCode();
                          }}
                        >
                          Delete
                        </Button>
                        <Button
                          color="secondary"
                          onClick={(e) => {
                            e.preventDefault();
                            deleteOneQRCodeToggle();
                          }}
                        >
                          Cancel
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </div>
                )}
              </Col>
            </Row>
          </Collapse>
        </Row>
      </CardBody>
    </Card>
  );
};

export default CodeCard;
