import React from 'react';
import { Copy } from 'react-feather';
import { toast } from 'react-toastify';
import { Button, Card, CardBody, Modal, ModalBody, ModalHeader } from 'reactstrap';

export default function EmbedModal({ open, toggle, store }) {

  const handleCopy = () => {
    navigator.clipboard.writeText(`   <iframe height="100%" width="100%"
    style="position: 'relative';overflow-x: 'hidden';border: 'none';border: none;"
    src="https://mymanager.com/form-funnel/${store?.form?._id}&path=${store?.form?.formData[0]?.path}"
  />`);
    toast.success('Copied!');
  };
  return (
    <>
      <Modal isOpen={open} toggle={toggle}>
        <ModalHeader toggle={toggle}>Embed Funnel In Your Website</ModalHeader>
        <ModalBody>
          <div className="d-flex justify-content-between">
            <p>Place this code in your HTML where you want your Funnel to appear.</p>
            <Button color="link" onClick={handleCopy}>
              <Copy />
            </Button>
          </div>
          <Card className="bg-light border">
            <CardBody>
              <p>
                <code className='bg-transparent text-secondary'>{`   <iframe 
                        style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;"
                        src="https://mymanager.com/form-funnel/${store?.form?._id}&path=${store?.form?.formData[0]?.path}"
                      >your browser doesn't support form</iframe>`}</code>
              </p>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    </>
  );
}
