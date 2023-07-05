import { Fragment, useState } from 'react';

import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Card,
  CardBody,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Button,
  Input,
  Spinner
} from 'reactstrap';

import QRCode from 'qrcode.react';
import * as Icon from 'react-feather';
import Nouislider from 'nouislider-react';
import wNumb from 'wnumb';
import '@src/assets/styles/setting/qrcode.scss';
// import '@src/assets/styles/nouislider.scss';
import '@styles/react/libs/noui-slider/noui-slider.scss';

const defaultQRcodeImgUrl =
  'https://storage.googleapis.com/mymember-storage/my-manager/7d1385b2-72d6-4335-8e7b-fc9f9661bd15-qr_code_barcode.jpg';

const ImageZoom = (props) => {
  const { isOpen, setIsOpen } = props;
  // const [moreZoom, setMoreZoom] = useState(false);

  const [open, setOpen] = useState('1');
  const [qrImgSize, setQrImgSize] = useState(1000);
  const [foreColor, setForeColor] = useState('#000000');
  const [backColor, setBackColor] = useState('#FFFFFF');
  const [urlInfo, setUrlInfo] = useState('https://mymanager.com');
  const [logoImg, setLogoImg] = useState(null);
  const [genQRCodeSuccess, setGenQRCodeSuccess] = useState('success');
  const [qrcodeResult, setQrcodeResult] = useState(defaultQRcodeImgUrl);

  const genQRCode = (url) => {
    // QRCode.toDataURL(url, {
    //   width: qrImgSize,
    //   margin: 1,
    //   color: { dark: foreColor, light: backColor }
    // }).then((data) => setQrcodeResult(data));

    const canvas = document.getElementById('QRCode');
    canvas.crossOrigin = 'Anonymous';
    setQrcodeResult(canvas.toDataURL('image/png'));
  };

  const downloadQR = () => {
    const pngUrl = qrcodeResult.replace('image/png', 'image/octet-stream');
    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'mymanager_qrcode.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  const cancleBtnClicked = () => {
    // Initialize the opening accodian bar
    setOpen('1');

    // Close Modal
    setIsOpen(null);
  };

  const createQRcodeBtnClicked = () => {
    setGenQRCodeSuccess('loading');
    if (urlInfo) {
      genQRCode(urlInfo);
    } else {
    }
    setTimeout(() => {
      setGenQRCodeSuccess('success');
    }, 1000);
  };

  const downloadPNGBtnClicked = () => {
    downloadQR();
  };

  const sliderValOn = (value) => {
    setQrImgSize(parseInt(value[0]));
  };

  const handleChangeForeColor = (event) => {
    setForeColor(event.target.value);
  };

  const handleChangeBackColor = (event) => {
    setBackColor(event.target.value);
  };

  function convertFile(fileRef) {
    if (fileRef) {
      const reader = new FileReader();
      reader.readAsDataURL(fileRef);
      reader.onload = (ev) => {
        setLogoImg(ev.target.result);
      };
    }
  }

  const removeLogoClicked = () => {
    setLogoImg(null);
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={() => cancleBtnClicked()}
      className="modal-dialog-centered"
      size="lg"
    >
      <ModalHeader toggle={() => cancleBtnClicked()}>
        <div style={{ fontSize: '24px' }}>QR Code Management</div>
      </ModalHeader>

      <ModalBody style={{ padding: 0 }}>
        <Fragment>
          <Row className="qrcode">
            <Col lg="8" md="12" sm="12" className="qrcode-leftside">
              <Accordion flush open={open} toggle={toggle}>
                <AccordionItem>
                  <AccordionHeader targetId="1">
                    <Icon.Globe style={{ marginInline: '0.5rem' }} />
                    ENTER CONTENT
                  </AccordionHeader>
                  <AccordionBody accordionId="1">
                    <div>
                      <div style={{ fontWeight: 800, margin: '0.5rem' }}>Your URL</div>
                      <Input value={urlInfo} onChange={(e) => setUrlInfo(e.target.value)} />
                    </div>
                  </AccordionBody>
                </AccordionItem>
                <AccordionItem>
                  <AccordionHeader targetId="2">
                    <Icon.PenTool style={{ marginInline: '0.5rem' }} />
                    SET COLORS
                  </AccordionHeader>
                  <AccordionBody accordionId="2">
                    <div className="colorBlock">
                      <div style={{ fontWeight: 800, margin: '0.5rem' }}>Foreground Color</div>
                      <div className="colorSet d-flex justify-content-start align-items-center">
                        <Input
                          id="exampleColor1"
                          name="foregroundColor"
                          className="colorPicker"
                          placeholder="color placeholder"
                          type="color"
                          value={foreColor}
                          onChange={handleChangeForeColor}
                        />
                        <Input
                          id="exampleColorText1"
                          name="foregroundColorText"
                          className="colorPickerText"
                          placeholder="color placeholder"
                          type="text"
                          value={foreColor.toUpperCase()}
                          onChange={handleChangeForeColor}
                        />
                      </div>
                    </div>
                    <div className="colorBlock">
                      <div style={{ fontWeight: 800, margin: '0.5rem' }}>Background Color</div>
                      <div className="colorSet d-flex justify-content-start align-items-center">
                        <Input
                          id="exampleColor2"
                          name="backgroundColor"
                          className="colorPicker"
                          placeholder="color placeholder"
                          type="color"
                          value={backColor}
                          onChange={handleChangeBackColor}
                        />
                        <Input
                          id="exampleColorText2"
                          name="foregroundColorText"
                          className="colorPickerText"
                          placeholder="color placeholder"
                          type="text"
                          value={backColor.toUpperCase()}
                          onChange={handleChangeBackColor}
                        />
                      </div>
                    </div>
                  </AccordionBody>
                </AccordionItem>
                <AccordionItem>
                  <AccordionHeader targetId="3">
                    <Icon.Image style={{ marginInline: '0.5rem' }} />
                    ADD LOGO IMAGE
                  </AccordionHeader>
                  <AccordionBody accordionId="3">
                    <div className="d-flex align-items-center mt-1">
                      <div
                        className="d-flex align-items-center"
                        style={{
                          border: '1px solid grey',
                          width: '100px',
                          height: '100px',
                          backgroundColor: 'white'
                        }}
                      >
                        <img
                          id="logoImg"
                          className="qrcode-logo-image"
                          src={logoImg}
                          width={'100%'}
                          // height={'100%'}
                          style={{
                            padding: '0.3rem',
                            borderRadius: '5px'
                          }}
                        />
                      </div>
                      <div
                        className="d-flex flex-column justify-content-start"
                        style={{ height: '100px', marginInline: '1rem' }}
                      >
                        <Input
                          accept="image/*"
                          id={'upload-logo-image'}
                          type="file"
                          onChange={(e) => {
                            convertFile(e?.target?.files[0]);
                          }}
                          hidden={true}
                        />
                        <Label htmlFor={'upload-logo-image'}>
                          <a className={'btn btn-success'} style={{ width: '200px' }}>
                            Upload Logo Image
                          </a>
                        </Label>
                        {logoImg && (
                          <Label onClick={removeLogoClicked}>
                            <a className={'btn btn-secondary'} style={{ width: '200px' }}>
                              Remove Logo
                            </a>
                          </Label>
                        )}
                      </div>
                    </div>
                  </AccordionBody>
                </AccordionItem>
                {/* <AccordionItem>
                  <AccordionHeader targetId="4">CUSTOMIZE DESIGN</AccordionHeader>
                  <AccordionBody accordionId="4">
                    <strong>This is the third item&#39;s accordion body.</strong>
                    You can modify any of this with custom CSS or overriding our default variables.
                    It&#39;s also worth noting that just about any HTML can go within the{' '}
                    <code>.accordion-body</code>, though the transition does limit overflow.
                  </AccordionBody>
                </AccordionItem> */}
              </Accordion>
              <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                Input title or name you wish to your QR Code.
              </div>
            </Col>
            <Col lg="4" md="12" sm="12" className="qrcode-rightside">
              <div style={{ minHeight: '239px' }}>
                {genQRCodeSuccess == 'success' ? (
                  <img
                    id="myqr"
                    className="qrcode-image"
                    src={qrcodeResult}
                    width={'100%'}
                    style={{ borderRadius: '5px' }}
                  />
                ) : (
                  <Spinner
                    style={{ margin: 'calc(50% - 2.7rem)', width: '5rem', height: '5rem' }}
                  />
                )}
              </div>
              <div
                style={{ width: '1px', height: '1px', overflow: 'scroll', visibility: 'hidden' }}
              >
                <QRCode
                  value={urlInfo}
                  id="QRCode"
                  size={qrImgSize}
                  bgColor={backColor}
                  fgColor={foreColor}
                  // includeMargin={true}
                  imageSettings={{
                    src: logoImg,
                    x: undefined,
                    y: undefined,
                    height: qrImgSize / 5,
                    width: qrImgSize / 5,
                    excavate: true
                  }}
                />
              </div>
              <div className="price-slider">
                <Nouislider
                  step={50}
                  start={1000}
                  className="mt-1 mb-3"
                  direction={'ltr'}
                  range={{
                    min: 0,
                    max: 2000
                  }}
                  // onChange={sliderValChange}
                  onSlide={sliderValOn}
                />
                <div className="qrcode-slider-description d-flex justify-content-between align-items-center">
                  <div className="ft-10">Low Quality</div>
                  <div className="ft-12 bold">{`${qrImgSize}x${qrImgSize} Px`}</div>
                  <div className="ft-10">High Quality</div>
                </div>
              </div>
              <div className="btn-array d-flex justify-content-between align-items-center mt-1 mb-1">
                <Button
                  color="success"
                  size="sm"
                  onClick={createQRcodeBtnClicked}
                  style={{ marginInline: '0.25rem' }}
                >
                  Create QR Code
                </Button>
                <Button
                  color="info"
                  size="sm"
                  style={{ marginInline: '0.25rem' }}
                  onClick={downloadPNGBtnClicked}
                >
                  Download PNG
                </Button>
              </div>
            </Col>
          </Row>
        </Fragment>
      </ModalBody>
      {/* <ModalFooter>
        <Button color="primary" onClick={confirmBtnClicked}></Button>
        <Button color="secondary" onClick={cancleBtnClicked}>
          Cancel
        </Button>
      </ModalFooter> */}
    </Modal>
  );
};

export default ImageZoom;
