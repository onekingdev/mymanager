import { Fragment, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
  Spinner,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  UncontrolledAccordion
} from 'reactstrap';

import {
  AiOutlineQrcode,
  AiOutlineBarcode,
  AiOutlineUnorderedList,
  AiOutlineScan,
  AiOutlineAppstoreAdd,
  AiOutlineSave,
  AiOutlineDownload,
  AiOutlineEye
} from 'react-icons/ai';

import QRCode from 'qrcode.react';
import * as Icon from 'react-feather';
import Nouislider from 'nouislider-react';

// * Styles
import '@src/assets/styles/setting/qrcode.scss';
import '@styles/react/libs/noui-slider/noui-slider.scss';

// * Components
import useMessage from '../../../../lib/useMessage';
import PDFView from './PDFView';
import ImageViewer from './ImageViewer';
import WebsiteURL from './WebsiteURL';
import { fileUpload, saveQRCode } from '../store';

const defaultQRcodeImgUrl =
  'https://storage.googleapis.com/mymember-storage/my-manager/7d1385b2-72d6-4335-8e7b-fc9f9661bd15-qr_code_barcode.jpg';

const initialPDFImgURL =
  'https://storage.googleapis.com/mymember-storage/my-manager/ba09c6fc-5501-4abe-b1df-a2754b1278b7-initial-pdf.jpg';

const designColorList = [
  { primary: '#da5167', button: '#464154' },
  { primary: '#45606f', button: '#0288d1' },
  { primary: '#704b4b', button: '#d72feb' },
  { primary: '#4caf50', button: '#e04712' },
  { primary: '#e6c026', button: '#12bce0' }
];

const QRCodeSetting = () => {
  const [open, setOpen] = useState('1');
  const [qrcodeContentIndex, setQRcodeContentIndex] = useState('1');
  const [qrImgSize, setQrImgSize] = useState(1000);
  const [foreColor, setForeColor] = useState('#000000');
  const [backColor, setBackColor] = useState('#FFFFFF');

  const [primaryColor, setPrimaryColor] = useState('#da5167');
  const [buttonColor, setButtonColor] = useState('#464154');

  const [contentTitle, setContentTitle] = useState('');
  const [contentDescription, setContentDescription] = useState('');

  const [qrcodeUUID, setQRCodeUUID] = useState(null);
  const [qrcodeName, setQRCodeName] = useState('My QR Code');
  const [qrcodeInfo, setQRcodeInfo] = useState(null);
  const [urlInfo, setUrlInfo] = useState('https://mymanager.com');
  const [loadedFileURL, setLoadedFileURL] = useState(null);

  const [logoImg, setLogoImg] = useState(null);
  const [genQRCodeSuccess, setGenQRCodeSuccess] = useState('success');
  const [qrcodeResult, setQrcodeResult] = useState(defaultQRcodeImgUrl);
  const [qrcodeImgURL, setQRCodeImgURL] = useState(null);
  const [pdfviewImgURL, setPDFviewImgURL] = useState(null);

  // ** Reference
  const canvasRef = useRef(null);

  const dispatch = useDispatch();

  const { success, error } = useMessage();

  const genQRCode = () => {
    const qrcode_canvas = document.getElementById('QRCode');
    qrcode_canvas.crossOrigin = 'Anonymous';
    const imgData = qrcode_canvas.toDataURL('image/png');
    setQrcodeResult(imgData);

    // QR Code Image Upload
    qrcode_canvas.toBlob((blob1) => {
      const formData1 = new FormData();
      formData1.append('file', blob1, 'qrcode-image.png');
      dispatch(fileUpload(formData1))
        .then((res1) => {
          if (res1.payload) {
            setQRCodeImgURL(res1.payload.data.url);
            success('QRCode upload success');

            // PDF view Img Upload
            if (qrcodeContentIndex == '2' && loadedFileURL) {
              const smartphone_canvas = document.getElementById('smartphone-preview');
              smartphone_canvas.toBlob((blob2) => {
                const formData2 = new FormData();
                formData2.append('file', blob2, 'phone-preview-image.png');
                dispatch(fileUpload(formData2)).then((res2) => {
                  if (res2.payload) {
                    setPDFviewImgURL(res2.payload.data.url);
                    success('Phone View image upload success');
                  } else {
                    error('Phone View image upload failed');
                  }
                });
              });
            }
          } else {
            error('QRCode upload failed');
          }
        })
        .catch((err) => {
          error('QRCode upload failed');
          console.log(err);
        });
    });
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
    const uuid = crypto.randomUUID().replace(/-/g, '');
    const tmpLink = `https://mymanager.com/qrcodelink/${uuid}`;
    setQRCodeUUID(uuid);
    switch (qrcodeContentIndex) {
      case '1':
        if (urlInfo) {
          setQRcodeInfo(tmpLink);
          setTimeout(() => {
            genQRCode();
          }, 500);
        } else {
          error('Please input your website url');
          return;
        }
        break;
      case '2':
        if (loadedFileURL) {
          setQRcodeInfo(tmpLink);
          setTimeout(() => {
            genQRCode();
          }, 500);
        } else {
          error('Please input your website url');
        }
        break;
      case '3':
        if (loadedFileURL) {
          setQRcodeInfo(tmpLink);
          setTimeout(() => {
            genQRCode();
          }, 500);
        } else {
          error('Please input your website url');
        }
        break;
      default:
        break;
    }
    setTimeout(() => {
      setGenQRCodeSuccess('success');
    }, 1000);
  };

  const saveQRcodeBtnClicked = () => {
    const contentURL = qrcodeContentIndex == '1' ? urlInfo : loadedFileURL;
    const sendDt = {
      uuid: qrcodeUUID,
      codeType: '1', // means qrcode
      qrcodeName,
      qrcodeInfo,
      qrcodeImgURL,
      pdfviewImgURL,
      contentURL,
      contentType: qrcodeContentIndex,
      contentTitle,
      contentDescription,
      primaryColor,
      buttonColor
    };
    dispatch(saveQRCode(sendDt)).then((res) => {
      if (res?.payload?.status == 201) {
        success('QR code saved successfully');
      } else {
        error('Error occured');
      }
    });
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

  const toggleTab = (tab) => {
    if (qrcodeContentIndex !== tab) {
      setQRcodeContentIndex(tab);
      // Init the tab content info
      setContentTitle('');
      setContentDescription('');
      setLoadedFileURL(null);
      // canvasRef = useRef(null);
    }
  };

  // const calcPhoneHeight = () => {
  //   const phoneDOMElement = document.getElementById('smartphonearea');
  //   const tmpWidth = phoneDOMElement?.offsetWidth;

  //   return tmpWidth * 1.8;
  //   // phoneDOMElement?.style.setProperty('height', `${tmpWidth * 1.8}px`);
  // };

  const calcPhoneWidth = () => {
    const phoneDOMElement = document.getElementById('smartphonearea');
    const tmpWidth = phoneDOMElement?.offsetWidth;
    return tmpWidth;
  };

  return (
    <Fragment>
      <Row className="qrcode">
        <div className="fs-2 qrcode-title">QR Code Setting</div>
        <Col lg="8" md="12" sm="12" className="qrcode-leftside">
          <UncontrolledAccordion defaultOpen={['1', '2', '3', '4']} stayOpen className="mt-1">
            <AccordionItem>
              <AccordionHeader targetId="1">
                <Icon.Globe style={{ marginInline: '0.5rem' }} />
                ENTER CONTENT
              </AccordionHeader>
              <AccordionBody accordionId="1">
                <div style={{ fontWeight: 800, margin: '0.5rem' }}>QR Code Name</div>
                <Input
                  value={qrcodeName}
                  onChange={(e) => setQRCodeName(e.target.value)}
                  placeholder="Input your QR Code Name"
                />
                <div>
                  <Nav tabs className="m-0">
                    <NavItem>
                      <NavLink
                        className="justify-content-start"
                        active={qrcodeContentIndex === '1'}
                        onClick={() => toggleTab('1')}
                      >
                        {/* <GiRank2 className="font-medium-1 me-50" /> */}
                        <span className="fs-5">Website</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className="justify-content-start"
                        active={qrcodeContentIndex === '2'}
                        onClick={() => toggleTab('2')}
                      >
                        {/* <GiRank2 className="font-medium-1 me-50" /> */}
                        <span className="fs-5">PDF</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className="justify-content-start"
                        active={qrcodeContentIndex === '3'}
                        onClick={() => toggleTab('3')}
                      >
                        {/* <GiRank2 className="font-medium-1 me-50" /> */}
                        <span className="fs-5">Image</span>
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={qrcodeContentIndex} style={{ padding: '1rem' }}>
                    <TabPane tabId="1">
                      <WebsiteURL urlInfo={urlInfo} setUrlInfo={setUrlInfo} />
                    </TabPane>
                    <TabPane tabId="2">
                      <PDFView
                        qrcodeContentIndex={qrcodeContentIndex}
                        loadedFileURL={loadedFileURL}
                        setLoadedFileURL={setLoadedFileURL}
                        primaryColor={primaryColor}
                        setPrimaryColor={setPrimaryColor}
                        buttonColor={buttonColor}
                        setButtonColor={setButtonColor}
                        canvasRef={canvasRef}
                        designColorList={designColorList}
                        contentTitle={contentTitle}
                        setContentTitle={setContentTitle}
                        contentDescription={contentDescription}
                        setContentDescription={setContentDescription}
                      />
                    </TabPane>
                    <TabPane tabId="3">
                      <ImageViewer
                        qrcodeContentIndex={qrcodeContentIndex}
                        loadedFileURL={loadedFileURL}
                        setLoadedFileURL={setLoadedFileURL}
                        primaryColor={primaryColor}
                        setPrimaryColor={setPrimaryColor}
                        buttonColor={buttonColor}
                        setButtonColor={setButtonColor}
                        canvasRef={canvasRef}
                        designColorList={designColorList}
                        contentTitle={contentTitle}
                        setContentTitle={setContentTitle}
                        contentDescription={contentDescription}
                        setContentDescription={setContentDescription}
                      />
                    </TabPane>
                  </TabContent>
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
                      id="upload-logo-image"
                      type="file"
                      onChange={(e) => {
                        convertFile(e?.target?.files[0]);
                      }}
                      hidden={true}
                    />
                    <Label htmlFor="upload-logo-image">
                      <a className="btn btn-success" style={{ width: '200px' }}>
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
            <AccordionItem>
              <AccordionHeader targetId="4">
                <Icon.Save style={{ marginInline: '0.5rem' }} />
                CREATE & SAVE QR CODE
              </AccordionHeader>
              <AccordionBody accordionId="4">
                <Row>
                  <Col lg="4" md="6" sm="12" className="qrcode-image-part">
                    <div>
                      {genQRCodeSuccess == 'success' ? (
                        <img
                          id="myqr"
                          className="qrcode-image"
                          src={qrcodeResult}
                          width={'239px'}
                          style={{ borderRadius: '5px' }}
                        />
                      ) : (
                        <Spinner
                          style={{ margin: 'calc(50% - 2.7rem)', width: '5rem', height: '5rem' }}
                        />
                      )}
                    </div>
                    <div
                      style={{
                        width: '1px',
                        height: '1px',
                        overflow: 'scroll',
                        visibility: 'hidden'
                      }}
                    >
                      <QRCode
                        value={qrcodeInfo}
                        id="QRCode"
                        size={qrImgSize}
                        bgColor={backColor}
                        fgColor={foreColor}
                        includeMargin={true}
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
                        className="mt-1 mb-1"
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
                  </Col>
                  <Col
                    lg="8"
                    md="6"
                    sm="12"
                    className="btn-array d-flex flex-column justify-content-between align-items-start mt-3 mb-3"
                  >
                    <Button
                      className="m-1"
                      color="success"
                      size="md"
                      onClick={createQRcodeBtnClicked}
                      style={{ marginInline: '0.25rem', width: '180px', padding: '0.5rem' }}
                      disabled={
                        !(
                          (qrcodeContentIndex == '1' && urlInfo) ||
                          (qrcodeContentIndex !== '1' && loadedFileURL)
                        )
                      }
                    >
                      <AiOutlineAppstoreAdd size={20} style={{ marginInlineEnd: '0.5rem' }} />
                      Create QR Code
                    </Button>

                    <Button.Ripple
                      className="m-1"
                      color="danger"
                      size="md"
                      onClick={saveQRcodeBtnClicked}
                      style={{ marginInline: '0.25rem', width: '180px', padding: '0.5rem' }}
                      disabled={qrcodeUUID ? false : true}
                    >
                      <AiOutlineSave size={20} style={{ marginInlineEnd: '1rem' }} />
                      Save QR Code
                    </Button.Ripple>
                    <Button.Ripple
                      className="m-1"
                      color="info"
                      size="md"
                      style={{ marginInline: '0.25rem', width: '180px', padding: '0.5rem' }}
                      onClick={downloadPNGBtnClicked}
                      disabled={!qrcodeInfo}
                    >
                      <AiOutlineDownload size={20} style={{ marginInlineEnd: '0.5rem' }} />
                      Download PNG
                    </Button.Ripple>
                  </Col>
                  {/* <Col lg="6" md="0" sm="0"></Col> */}
                </Row>
              </AccordionBody>
            </AccordionItem>
          </UncontrolledAccordion>
        </Col>
        <Col lg="4" md="12" sm="12" className="qrcode-rightside">
          <div className="preview-text" style={{ fontWeight: 800, margin: '0.5rem' }}>
            Preview
          </div>
          <div
            id="smartphonearea"
            className="smartphone-preview"
            // style={{ height: calcPhoneHeight() }}
          >
            <div className="smartphone-skeleton">
              {qrcodeContentIndex !== '1' && (
                <>
                  <div className="smartphone-background">
                    <div
                      className="top-backgnd d-flex flex-column"
                      style={{
                        backgroundColor: primaryColor,
                        padding: '1rem 1.5rem',
                        color: 'white'
                      }}
                    >
                      <span style={{ fontWeight: '800', fontSize: '16px', marginBottom: '10px' }}>
                        {contentTitle?.length ? contentTitle : 'The Basic Title'}
                      </span>
                      <span>
                        {contentDescription?.length
                          ? contentDescription
                          : 'Description for following file'}
                      </span>
                    </div>

                    <div className="bottom-backgnd" style={{ backgroundColor: 'lightgray' }}></div>
                  </div>
                  <div className="smartphone-img-area">
                    <canvas
                      id="smartphone-preview"
                      ref={canvasRef}
                      width={calcPhoneWidth() * 0.8}
                      height={calcPhoneWidth() * 1.1}
                      style={{
                        maxWidth: `${calcPhoneWidth() * 0.8}px`,
                        maxHeight: `${calcPhoneWidth * 1.1}px`
                      }}
                    />
                  </div>
                  <a
                    className="smartphone-button-area"
                    href={loadedFileURL}
                    style={{ backgroundColor: buttonColor }}
                  >
                    <div
                      className="smartphone-button"
                      style={{
                        color: 'white',
                        textAlign: 'center',
                        verticalAlign: 'center'
                      }}
                    >
                      <div>
                        <AiOutlineEye size={20} style={{ marginInlineEnd: '0.5rem' }} />
                        View
                      </div>
                    </div>
                  </a>
                </>
              )}
            </div>
          </div>
        </Col>
        {/* <Col lg="12" md="12" sm="12" className="qrcode-list">
          <div className="mt-1 fs-4">Saved QR Codes</div>
        </Col> */}
      </Row>
    </Fragment>
  );
};

export default QRCodeSetting;
