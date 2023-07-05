import React, { useState } from 'react';
import { Input, Button } from 'reactstrap';
import { QrReader } from 'react-qr-reader';

import '@src/assets/styles/setting/scanner.scss';

function QRscanner() {
  const [data, setData] = useState('No Result');

  return (
    <div className="scanner">
      <div className="fs-2 scanner-title">Scanner</div>

      <div className="scanner-main-part">
        <div className="scan-video align-items-center justify-content-center">
          {!data && (
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
        <div className="scan-result">
          {data && (
            <>
              <p className="scan-result-title">Scan Result</p>
              <a href={data} className="scan-result-url mb-2" aria-multiline>
                {data}
              </a>
              <Button.Ripple
                color="success"
                // style={{ width: '100%' }}
                size="lg"
                onClick={(e) => {
                  e.preventDefault();
                  setData(null);
                }}
              >
                {data == 'No Result' ? 'Start Scan' : 'Scan Again'}
              </Button.Ripple>
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
