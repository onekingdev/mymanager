import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Badge,
  Button,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Collapse,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col
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

import { fetchQRCodeApi } from '../../setting/store';

const CodeCard = (props) => {
  const { code, index, selectedIndex, setSelectedIndex } = props;
  const [viewDetail, setViewDetail] = useState(false);
  const [getFocus, setGetFocus] = useState(false);

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

  const renderTitle = (codeInfo) => {
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

  const borderColor = () => {
    if (selectedIndex == index) return '1px solid #0dd50d';
    if (getFocus) {
      return selectedIndex == index ? '1px solid #0dd50d' : '1px solid grey';
    } else {
      return '1px solid transparent';
    }
  };

  return (
    <Card
      className="code-card"
      onMouseEnter={(e) => {
        e.preventDefault();
        setGetFocus(true);
      }}
      onClick={(e) => {
        e.preventDefault();
        setSelectedIndex(index);
      }}
      onMouseLeave={(e) => {
        e.preventDefault();
        setGetFocus(false);
      }}
      style={{ border: borderColor() }}
    >
      <CardBody>
        <Row>
          <Col md="12">
            <CardTitle tag="h5" style={{ marginBottom: 0 }}>
              {renderTitle(code)}
            </CardTitle>
          </Col>
          <Collapse isOpen={viewDetail}>
            <Row>
              <Col md="9">
                <CardSubtitle className="mt-2 mb-2 text-muted" tag="h6">
                  <AiOutlineClockCircle size={20} style={{ marginRight: '0.5rem' }} />
                  Created: {new Date(code.createdAt).toLocaleString()}
                </CardSubtitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  <AiOutlineLink size={20} style={{ marginRight: '0.5rem' }} />
                  <a href={code.qrcodeInfo} className="text-muted">
                    {code.qrcodeInfo.slice(0, 55)}
                    {code.qrcodeInfo.length > 55 && '...'}
                  </a>
                </CardSubtitle>
                <CardSubtitle className="text-muted" tag="h6">
                  <AiOutlineFall size={20} style={{ marginRight: '0.5rem' }} />
                  <a href={code?.contentURL} className="text-muted">
                    {code?.contentURL?.slice(0, 55)} {code?.contentURL?.length > 55 && '...'}
                  </a>
                </CardSubtitle>
              </Col>
              <Col md="3" style={{ marginTop: '-3rem' }}>
                <img
                  id={`qrcodeImg${index}`}
                  src={code.qrcodeImgURL}
                  width="100%"
                  style={{ paddingInline: '5%' }}
                />
              </Col>
            </Row>
          </Collapse>
        </Row>
      </CardBody>
    </Card>
  );
};

export default CodeCard;
