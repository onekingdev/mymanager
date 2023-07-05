import { Fragment, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  UncontrolledAccordion,
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
  TabPane
} from 'reactstrap';

import {
  AiOutlineQrcode,
  AiOutlineBarcode,
  AiOutlineUnorderedList,
  AiOutlineScan,
  AiOutlineAppstoreAdd,
  AiOutlineSave,
  AiOutlineDownload
} from 'react-icons/ai';

import { useBarcode } from '@createnextapp/react-barcode';
import * as Icon from 'react-feather';
import Nouislider from 'nouislider-react';

// * Styles
import '@src/assets/styles/setting/barcode.scss';
import '@styles/react/libs/noui-slider/noui-slider.scss';

// * Components
import useMessage from '../../../../lib/useMessage';
import { fileUpload, saveQRCode } from '../store';

const defaultBarcodeImgUrl =
  'https://storage.googleapis.com/mymember-storage/my-manager/7d1385b2-72d6-4335-8e7b-fc9f9661bd15-qr_code_barcode.jpg';

const BarcodeSetting = () => {
  const [barcodeImgWidth, setBarcodeImgWidth] = useState(3);
  const [barcodeImgHeight, setBarcodeImgHeight] = useState(120);
  const [foreColor, setForeColor] = useState('#000000');
  const [backColor, setBackColor] = useState('#FFFFFF');

  const [primaryColor, setPrimaryColor] = useState('#da5167');
  const [buttonColor, setButtonColor] = useState('#464154');

  const [barcodeUUID, setBarcodeUUID] = useState(null);
  const [barcodeName, setBarcodeName] = useState('My Barcode');
  const [barcodeInfo, setBarcodeInfo] = useState('123 45678');
  const [loadedFileURL, setLoadedFileURL] = useState(null);

  const [barcodeImgURL, setBarcodeImgURL] = useState(null);
  const [pdfviewImgURL, setPDFviewImgURL] = useState(null);

  // ** Reference
  const canvasRef = useRef(null);

  const dispatch = useDispatch();

  const { success, error } = useMessage();

  const { inputRef } = useBarcode({
    value: barcodeInfo.length ? barcodeInfo : 'No Data',
    options: {
      background: backColor,
      lineColor: foreColor,
      width: barcodeImgWidth,
      height: barcodeImgHeight
    }
  });
  const downloadBarcode = () => {
    const element = document.getElementById('mybarcode');

    const pngUrl = element.toDataURL().replace('image/png', 'image/octet-stream');
    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'mymanager_barcode.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  // const toggle = (id) => {
  //   if (open.includes(id.toString())) {
  //     setOpen(open.filter((x) => x !== id.toString()));
  //   } else {
  //     const tmp = open;
  //     tmp.push(id.toString());
  //     tmp.sort();
  //     setOpen(tmp);
  //   }
  // };

  const saveBarcodeBtnClicked = () => {
    document.body.style.cursor = 'wait';

    const barcode_canvas = document.getElementById('mybarcode');
    barcode_canvas.crossOrigin = 'Anonymous';

    // QR Code Image Upload
    barcode_canvas.toBlob((blob1) => {
      const formData1 = new FormData();
      formData1.append('file', blob1, 'barcode-image.png');
      dispatch(fileUpload(formData1))
        .then((res1) => {
          if (res1.payload) {
            let tmpbarcodeImgURL = res1.payload.data.url;
            setBarcodeImgURL(tmpbarcodeImgURL);

            let sendDt = {
              codeType: '2', // means barcode
              qrcodeName: barcodeName,
              qrcodeInfo: barcodeInfo,
              qrcodeImgURL: tmpbarcodeImgURL
            };

            dispatch(saveQRCode(sendDt)).then((res) => {
              if (res?.payload?.status == 201) {
                success('QR code saved successfully');
                document.body.style.cursor = 'default';
              } else {
                error('Error occured');
                document.body.style.cursor = 'default';
              }
            });

            // Save barcode Info into database
          } else {
            error('Barcode image upload failed');
            document.body.style.cursor = 'default';
          }
        })
        .catch((err) => {
          console.log(err);
          error('Barcode image upload failed');
          document.body.style.cursor = 'default';
        });
    });

    const sendDt = {
      // uuid: barcodeUUID,
      barcodeName,
      barcodeInfo,
      barcodeImgURL
      // pdfviewImgURL,
      // contentType: barcodeContentIndex,
      // primaryColor,
      // buttonColor
    };
    // dispatch(saveBarcode(sendDt)).then((res) => {
    //   if (res?.payload?.status == 201) {
    //     success('QR code saved successfully');
    //   } else {
    //     error('Error occured');
    //   }
    // });
  };

  const downloadPNGBtnClicked = () => {
    downloadBarcode();
  };

  const handleChangeForeColor = (event) => {
    setForeColor(event.target.value);
  };

  const handleChangeBackColor = (event) => {
    setBackColor(event.target.value);
  };

  return (
    <Fragment>
      <Row className="barcode">
        <div className="fs-2 barcode-title">Barcode Setting</div>
        <Col lg="12" md="12" sm="12" className="barcode-leftside">
          <UncontrolledAccordion defaultOpen={['1', '2', '3']} stayOpen className="mt-1">
            <AccordionItem>
              <AccordionHeader targetId="1">
                <Icon.Globe style={{ marginInline: '0.5rem' }} />
                ENTER CONTENT
              </AccordionHeader>
              <AccordionBody accordionId="1">
                <Row>
                  <Col lg="3" md="6" sm="12">
                    <div style={{ fontWeight: 800, margin: '0.5rem' }}>Barcode Name</div>
                    <Input
                      value={barcodeName}
                      onChange={(e) => setBarcodeName(e.target.value)}
                      placeholder="Input your Barcode Name"
                    />
                  </Col>
                  <Col lg="3" md="6" sm="12">
                    <div style={{ fontWeight: 800, margin: '0.5rem' }}>Your Content</div>
                    <Input
                      value={barcodeInfo}
                      onChange={(e) => setBarcodeInfo(e.target.value)}
                      placeholder="Input your content data"
                    />
                  </Col>
                </Row>
              </AccordionBody>
            </AccordionItem>
            <AccordionItem>
              <AccordionHeader targetId="2">
                <Icon.PenTool style={{ marginInline: '0.5rem' }} />
                SET COLORS & SIZE
              </AccordionHeader>
              <AccordionBody accordionId="2">
                <Row>
                  <Col lg="3" md="6" sm="12">
                    <div className="colorBlock">
                      <div style={{ fontWeight: 800, margin: '0.5rem' }}>Line Color</div>
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
                  </Col>
                  <Col lg="3" md="6" sm="12">
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
                  </Col>
                  {/* <Col lg="3" md="6" sm="12">
                    <div style={{ fontWeight: 800, margin: '0.5rem' }}>Width</div>
                    <Input
                      id="widthText"
                      name="widthText"
                      className="sizeText"
                      placeholder="Input barcode width [pixel]"
                      type="text"
                      value={barcodeImgWidth}
                      onChange={(e) => setBarcodeImgWidth(e.target.value)}
                    />
                  </Col>
                  <Col lg="3" md="6" sm="12">
                    <div style={{ fontWeight: 800, margin: '0.5rem' }}>Height</div>
                    <Input
                      id="heightText"
                      name="heightText"
                      className="sizeText"
                      placeholder="Input barcode height [pixel]"
                      type="text"
                      value={barcodeImgHeight}
                      onChange={(e) => setBarcodeImgHeight(e.target.value)}
                    />
                  </Col> */}
                </Row>
              </AccordionBody>
            </AccordionItem>
            {/* <AccordionItem>
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
                      className="barcode-logo-image"
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
            </AccordionItem> */}
            <AccordionItem>
              <AccordionHeader targetId="3">
                <Icon.Save style={{ marginInline: '0.5rem' }} />
                SAVE BARCODE
              </AccordionHeader>
              <AccordionBody accordionId="3">
                <Row>
                  <Col lg="12" md="12" sm="12" className="barcode-image-part">
                    {barcodeInfo.length ? (
                      <canvas id="mybarcode" ref={inputRef} />
                    ) : (
                      <p>No Content</p>
                    )}
                  </Col>
                  <Col
                    lg="12"
                    md="12"
                    sm="12"
                    className="btn-array d-flex justify-content-start align-items-start mt-1 mb-1"
                    // style={{ marginLeft: '8rem' }}
                  >
                    <Button.Ripple
                      className="m-1"
                      color="danger"
                      size="md"
                      onClick={saveBarcodeBtnClicked}
                      style={{ marginInline: '0.25rem', width: '180px', padding: '0.5rem' }}
                    >
                      <AiOutlineSave size={20} style={{ marginInlineEnd: '1rem' }} />
                      Save Barcode
                    </Button.Ripple>
                    <Button.Ripple
                      className="m-1"
                      color="info"
                      size="md"
                      style={{ marginInline: '0.25rem', width: '180px', padding: '0.5rem' }}
                      onClick={downloadPNGBtnClicked}
                    >
                      <AiOutlineDownload size={20} style={{ marginInlineEnd: '0.5rem' }} />
                      Download
                    </Button.Ripple>
                  </Col>
                </Row>
              </AccordionBody>
            </AccordionItem>
          </UncontrolledAccordion>
        </Col>
      </Row>
    </Fragment>
  );
};

export default BarcodeSetting;
