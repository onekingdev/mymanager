import { QRCodeCanvas } from 'qrcode.react';
import React from 'react';

import { Download } from 'react-feather';
import { Button, Card, CardBody, Modal, ModalBody, ModalHeader } from 'reactstrap';

export default function QrCodeModal({ open, toggle, store }) {
  const handleDownloadQR = () => {
    var canvas = document.getElementById('qrcode');
    var url = canvas.toDataURL('image/jpg');
    var link = document.createElement('a');
    link.download = 'qr.jpg';
    link.href = url;
    link.click();
  };

  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalHeader>QR Code To Share Your Form</ModalHeader>
      <ModalBody>
        <div className="d-flex justify-content-between">
          <p>Share your QR code with anyone for easy access to your form</p>
          <Button color="link" onClick={handleDownloadQR}>
            <Download />
          </Button>
          {/* <a href={`data:image/jpg;charset=utf-8,${encodeURIComponent(document.getElementById('qrcode'))}`} download="qr.jpg" className='btn btn-link'>
          <Download />
          </a> */}
        </div>
        <Card className="bg-light border">
          <CardBody>
            <div className="w-100 mx-auto text-center">
              <QRCodeCanvas
                value={`https://mymanager.com/form-funnel/${store?.form?._id}&path=${store?.form?.formData[0]?.path}`}
                id="qrcode"
                size={200}
              />
            </div>
          </CardBody>
        </Card>
      </ModalBody>
    </Modal>
  );
}
