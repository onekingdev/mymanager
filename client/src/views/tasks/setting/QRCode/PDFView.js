import { Fragment, useEffect, useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as PDFJS from 'pdfjs-dist/legacy/build/pdf';

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

import useMessage from '../../../../lib/useMessage';
import { fileUpload } from '../store';
import { AiOutlineAntDesign, AiOutlineCloudUpload, AiOutlineInfoCircle } from 'react-icons/ai';

PDFJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.min.js`;

var Lst;
var designLst;

const initialPDFImgURL =
  'https://storage.googleapis.com/mymember-storage/my-manager/ba09c6fc-5501-4abe-b1df-a2754b1278b7-initial-pdf.jpg';

const PDFView = (props) => {
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
  const [pageCnt, setPageCnt] = useState(0);
  const [pdfFile, setPdfFile] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [dropWidth, setDropWidth] = useState('10%');
  const [dropHeight, setDropHeight] = useState('10%');

  // ** Reference
  // const canvasRef = useRef(null);
  const parent = useRef(null);

  const dispatch = useDispatch();

  //loading pdf from url
  useEffect(() => {
    if (qrcodeContentIndex == '2' && loadedFileURL) {
      const loadingTask = PDFJS.getDocument(loadedFileURL);
      loadingTask.promise.then((loadedPdf) => {
        setPdfFile(loadedPdf);
        setPageCnt(loadedPdf.numPages);
      });
    }
  }, [loadedFileURL]);

  //render page on canvas
  useEffect(() => {
    if (pdfFile != null) {
      renderPage(currentPage);
    } else {
    }
  }, [canvasRef, pdfFile]);

  //render all pages on side menu
  useEffect(() => {
    if (pdfFile != null && pageCnt > 0) {
      renderPages();
    }
  }, [pageCnt]);

  function uploadPDF(file) {
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

  const calcScale = () => {
    const defaultInnerWidth = 1920;
    const defaultScale = 0.5;
    return (defaultScale * window.innerWidth) / defaultInnerWidth;
  };

  const renderPage = useCallback(
    async (currentPage) => {
      if (pdfFile != null) {
        const page = await pdfFile.getPage(currentPage);
        const viewport = page.getViewport({ scale: calcScale() });
        const canvas = canvasRef.current;
        const canvasContext = canvas.getContext('2d');

        // canvas.height = viewport.height;
        // canvas.width = viewport.width;
        setDropHeight(`${canvas.height}px`);
        setDropWidth(`${canvas.width}px`);
        const renderContext = { canvasContext, viewport };
        page.render(renderContext);
      }
    },
    [pdfFile]
  );

  const renderPages = useCallback(async () => {
    // Init pages
    while (parent.current.firstChild) {
      parent.current.removeChild(parent.current.lastChild);
    }
    // Generate pages
    if (pdfFile != null && pageCnt > 0) {
      for (let index = 1; index <= pageCnt; index++) {
        const page = await pdfFile.getPage(index);
        const viewport = page.getViewport({ scale: 0.1 });
        const canvas = document.createElement('canvas');
        const canvasContext = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        canvas.id = index;
        const p = document.createElement('p');
        p.innerHTML = index;
        p.className = 'text-center';
        p.style = 'margin: 0;';
        const div = document.createElement('li');
        div.className = 'pdf-page-center';

        div.appendChild(canvas);
        div.appendChild(p);
        div.addEventListener('click', (e) => handlePageClick(e, index));
        const renderContext = { canvasContext, viewport };
        page.render(renderContext);

        parent.current.appendChild(div);
      }
    }
  }, [pageCnt, pdfFile]);

  const handlePageClick = (e, pageNumber) => {
    let obj = e.target;
    if (obj.className == 'pdf-page-center') {
      if (Lst) Lst.className = 'pdf-page-center';
      obj.className = 'pdf-page-center-clicked';
      Lst = obj;
    } else {
      let tmpObj = e.srcElement.parentElement;
      if (Lst) Lst.className = 'pdf-page-center';
      tmpObj.className = 'pdf-page-center-clicked';
      Lst = tmpObj;
    }
    renderPage(pageNumber);
    setCurrentPage(pageNumber);
  };

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
      console.log(obj.style);
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
          id={`designbtnpdf${index}`}
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
              accept=".pdf"
              id="upload-pdf"
              type="file"
              onChange={(e) => {
                uploadPDF(e?.target?.files[0]);
              }}
              hidden={true}
            />
            <Label htmlFor="upload-pdf">
              <a
                className="btn btn-success d-flex justify-content-center align-items-center"
                style={{ width: '200px', height: '40px', padding: 0 }}
              >
                {loading && (
                  <Spinner
                    style={{
                      width: '1.5rem',
                      height: '1.5rem',
                      marginRight: '1rem'
                    }}
                  />
                )}
                Upload PDF
              </a>
            </Label>
            <div
              ref={parent}
              className="d-flex justify-content-start align-items-center"
              style={{ overflowX: 'auto', height: '11rem', border: '1px dashed grey' }}
            ></div>
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
      {/* <Col md="5" sm="12">
        <div style={{ fontWeight: 800, margin: '0.5rem' }}>Preview</div>
        <div className="smartphone-preview">
          <div className="smartphone-skeleton">
            <canvas id="smartphone-preview" ref={canvasRef} />
          </div>
        </div>
      </Col> */}
    </Row>
  );
};

export default PDFView;
