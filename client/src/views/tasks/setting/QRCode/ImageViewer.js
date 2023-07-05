import { Fragment, useState, useEffect, useCallback } from 'react';
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
  TabPane
} from 'reactstrap';

import { AiOutlineAntDesign, AiOutlineCloudUpload, AiOutlineInfoCircle } from 'react-icons/ai';

import useMessage from '../../../../lib/useMessage';
import { fileUpload } from '../store';

var designLst;

const ImageViewer = (props) => {
  const { success, error } = useMessage();

  const {
    qrcodeContentIndex,
    loadedFileURL,
    setLoadedFileURL,
    primaryColor,
    setPrimaryColor,
    buttonColor,
    setButtonColor,
    canvasRef,
    designColorList,
    contentTitle,
    setContentTitle,
    contentDescription,
    setContentDescription
  } = props;

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  function uploadImage(file) {
    // Set cursor with waiting
    document.body.style.cursor = 'wait';
    setLoading(true);

    const form = new FormData();
    form.append('file', file);
    dispatch(fileUpload(form))
      .then((res) => {
        if (res.payload) {
          setLoadedFileURL(res.payload.data.url);
          success('File upload success');
        } else {
          error('File upload failed');
        }

        // Set cursor with default
        document.body.style.cursor = 'default';
        setLoading(false);
      })
      .catch((err) => {
        // Set cursor with default
        document.body.style.cursor = 'default';
        error('File upload failed');
        console.log(err);
        setLoading(false);
      });
  }

  //render page on canvas
  useEffect(() => {
    renderImage();
  }, [canvasRef, loadedFileURL]);

  const renderImage = useCallback(() => {
    if (qrcodeContentIndex == '3' && loadedFileURL != null) {
      const context = canvasRef.current.getContext('2d');
      const canvas = canvasRef.current;
      const image = new Image();
      image.src = loadedFileURL;
      image.onload = () => {
        canvas.height = (image.height * canvasRef.current.width) / image.width;
        context.drawImage(
          image,
          0,
          0,
          image.width,
          image.height,
          0,
          0,
          canvasRef.current.width,
          (image.height * canvasRef.current.width) / image.width
        );
      };
    }
  }, [loadedFileURL]);

  const handleDesignButtonClick = (e, index) => {
    let obj = e.target;
    if (obj?.id) {
      if (designLst) {
        designLst.style =
          'width: 4rem; height: 4rem; padding: 0.3rem; background-color : #f7f7f7; border: 1px solid #ddd';
      }
      obj.style =
        'width: 4rem; height: 4rem; padding: 0.3rem; background-color: #ffffff; border: 2px solid #90c52d';
      designLst = obj;
      setPrimaryColor(designColorList[index].primary);
      setButtonColor(designColorList[index].button);
    } else {
      let tmpObj = e.target.parentElement;
      if (designLst) {
        designLst.style =
          'width: 4rem; height: 4rem; padding: 0.3rem; background-color : #f7f7f7; border: 1px solid #ddd';
      }
      tmpObj.style =
        'width: 4rem; height: 4rem; padding: 0.3rem; background-color: #ffffff; border: 2px solid #90c52d';
      designLst = tmpObj;
      setPrimaryColor(designColorList[index].primary);
      setButtonColor(designColorList[index].button);
    }
  };

  const renderDesignColorButtons = () => {
    return designColorList.map((each, index) => {
      return (
        <Button.Ripple
          key={`designbtn_pdf_${Math.floor(Math.random() * 1000)}_${Math.floor(
            Math.random() * 1000
          )}`}
          id={`designbtnimg${index}`}
          className="d-flex flex-column align-items-center"
          style={{
            width: '4rem',
            height: '4rem',
            padding: '0.3rem',
            backgroundColor: '#f7f7f7',
            border: '1px solid #ddd'
          }}
          color="light-secondary"
          onClick={(e) => handleDesignButtonClick(e, index)}
        >
          <div style={{ width: '3rem', height: '1rem', backgroundColor: each.primary }}></div>
          <div
            style={{
              width: '1.5rem',
              height: '0.3rem',
              backgroundColor: each.button,
              marginTop: '0.3rem'
            }}
          ></div>
        </Button.Ripple>
      );
    });
  };

  const renderColorPickers = () => {
    return (
      <div
        className="d-flex justify-content-between align-items-center"
        style={{ paddingInline: '5rem' }}
      >
        <div className="colorBlock">
          <div style={{ fontWeight: 800, margin: '0.5rem' }}>Primary</div>
          <div className="colorSet d-flex justify-content-start align-items-center">
            <Input
              id="primaryColor2"
              name="primaryColor2"
              className="colorPicker"
              placeholder="color placeholder"
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
            />
            <Input
              id="primaryColorText2"
              name="primaryColorText2"
              className="colorPickerText"
              placeholder="color placeholder"
              type="text"
              value={primaryColor.toUpperCase()}
              onChange={(e) => setPrimaryColor(e.target.value)}
            />
          </div>
        </div>
        <div className="colorBlock">
          <div style={{ fontWeight: 800, margin: '0.5rem' }}>Button</div>
          <div className="colorSet d-flex justify-content-start align-items-center">
            <Input
              id="buttonColor2"
              name="buttonColor2"
              className="colorPicker"
              placeholder="color placeholder"
              type="color"
              value={buttonColor}
              onChange={(e) => setButtonColor(e.target.value)}
            />
            <Input
              id="buttonColorText2"
              name="buttonColorText2"
              className="colorPickerText"
              placeholder="color placeholder"
              type="text"
              value={buttonColor.toUpperCase()}
              onChange={(e) => setButtonColor(e.target.value)}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <Row>
      <Col md="12" sm="12">
        <div className="frame-with-border">
          <div className="frame-with-border-header">
            <AiOutlineCloudUpload size={22} style={{ marginRight: '1rem' }} />
            <div>Upload PDF</div>
          </div>
          <div className="frame-with-border-body">
            <Input
              accept=".png, .jpg, .jpeg"
              id={'upload-image'}
              type="file"
              onChange={(e) => {
                uploadImage(e?.target?.files[0]);
              }}
              hidden={true}
            />
            <Label htmlFor={'upload-image'}>
              <a
                className={'btn btn-success d-flex justify-content-center align-items-center'}
                style={{ width: '200px', height: '40px', padding: 0 }}
              >
                Upload Image
              </a>
            </Label>
            <div
              className="d-flex align-items-center"
              style={{
                border: '1px dashed grey',
                width: '11rem',
                height: '11rem',
                backgroundColor: 'white'
              }}
            >
              <img
                id="contentImg"
                className="qrcode-logo-image"
                src={loadedFileURL}
                width={'100%'}
                // height={'100%'}
                style={{
                  padding: '0.3rem',
                  borderRadius: '5px'
                }}
              />
            </div>
          </div>
        </div>

        <div className="frame-with-border">
          <div className="frame-with-border-header">
            <AiOutlineAntDesign size={22} style={{ marginRight: '1rem' }} />
            <div>Design & Customize</div>
          </div>
          <div className="frame-with-border-body">
            <div
              className="d-flex justify-content-between align-items-center"
              style={{ paddingInline: '2rem' }}
            >
              {renderDesignColorButtons()}
            </div>
            <div>{renderColorPickers()}</div>
          </div>
        </div>

        <div className="frame-with-border">
          <div className="frame-with-border-header">
            <AiOutlineInfoCircle size={22} style={{ marginRight: '1rem' }} />
            <div>Basic Information</div>
          </div>
          <div
            className="justify-content-between align-items-center frame-with-border-body"
            style={{ paddingInline: '2rem' }}
          >
            <div className="d-flex align-items-center justify-content-between w-100 mb-1">
              <span>Title</span>
              <Input
                value={contentTitle}
                onChange={(e) => setContentTitle(e.target.value)}
                placeholder="Title or PDF name"
                style={{ width: '80%' }}
              />
            </div>
            <div className="d-flex align-items-center justify-content-between w-100">
              <span>Description</span>
              <Input
                value={contentDescription}
                onChange={(e) => setContentDescription(e.target.value)}
                placeholder="Description or PDF name"
                style={{ width: '80%' }}
              />
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default ImageViewer;
