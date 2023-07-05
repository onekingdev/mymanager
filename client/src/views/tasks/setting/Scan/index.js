import React, { useState } from 'react';
import { Input, Button, Row, Col } from 'reactstrap';
import { QrReader } from 'react-qr-reader';

import {
  AiOutlineQrcode,
  AiOutlineBarcode,
  AiOutlineUnorderedList,
  AiOutlineScan
} from 'react-icons/ai';

import '@src/assets/styles/setting/scanner.scss';

import BarcodeScanner from './BarcodeScan';

function QRscanner() {
  const [data, setData] = useState('No Result');
  const [codeType, setCodeType] = useState(1);

  const _onDetected = (result) => {
    if (result?.codeResult?.code) {
      setData(result?.codeResult?.code);
    }
    // this.setState({ results: [] })
    // this.setState({ results: this.state.results.concat([result]) })
  };

  return (
    <div className="scanner">
      <div className="fs-2 scanner-title">Scanner</div>

      <div className="scanner-main-part">
        <div className="scan-video align-items-center justify-content-center">
          {!data && codeType == 1 && (
            <QrReader
              onResult={(result, error) => {
                if (!!result) {
                  setData(result?.text);
                }

                if (!!error) {
                  console.info(error);
                }
              }}
              // style={{ width: '300px' }}
              delay={500}
              constraints={{
                facingMode: 'environment'
              }}
            />
          )}
        </div>
        {!data && codeType == 2 && <BarcodeScanner onDetected={_onDetected} />}
        <div className="scan-result">
          {data && (
            <>
              <p className="scan-result-title">Scan Result</p>
              <a href={data} className="scan-result-url mb-2" aria-multiline>
                {data}
              </a>
              <div className="d-flex">
                <Row>
                  <Col md="6" sm="12" className="mt-1">
                    <Button.Ripple
                      color="success"
                      style={{ width: '250px' }}
                      size="lg"
                      onClick={(e) => {
                        e.preventDefault();
                        setData(null);
                        setCodeType(1);
                      }}
                    >
                      <AiOutlineQrcode size={20} style={{ marginRight: '0.5rem' }} />
                      QR Code Scan
                    </Button.Ripple>
                  </Col>
                  <Col md="6" sm="12" className="mt-1">
                    <Button.Ripple
                      color="success"
                      style={{ width: '250px' }}
                      size="lg"
                      onClick={(e) => {
                        e.preventDefault();
                        setData(null);
                        setCodeType(2);
                      }}
                    >
                      <AiOutlineBarcode size={20} style={{ marginRight: '0.5rem' }} />
                      Barode Scan
                    </Button.Ripple>
                  </Col>
                </Row>
              </div>
              {/* <Button
                color="success"
                // style={{ width: '100%' }}
                size="lg"
                onClick={(e) => {
                  e.preventDefault();
                  setData(null);
                }}
              >
                Go to this link
              </Button> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default QRscanner;
