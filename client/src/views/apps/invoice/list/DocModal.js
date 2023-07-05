import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function DocModal({ toggle, modal }) {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [fileContent, setFileContent] = useState(null);
  const [fileName, setFileName] = useState('');

  const locationPath = useLocation();
  const isExpenseSection = locationPath.pathname === '/finance/expense';

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file.name);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFileContent(reader.result);
    };
  };

  const renderFile = () => {
    if (!fileContent) {
      return <p>No file uploaded</p>;
    }
    const extension = file.name.split('.').pop();
    switch (extension) {
      case 'doc':
      case 'docx':
        return <p>Unsupported file type</p>;
      case 'pdf':
        return (
          <object
            data={`data:application/pdf;base64,${btoa(fileContent)}`}
            type="application/pdf"
            style={{ width: '100%', height: '500px' }}
          >
            <p>Unable to display PDF.</p>
          </object>
        );
      default:
        return <p>Unsupported file type</p>;
    }
  };

  return (
    <div>
      <Button color="primary" className="btn btn-sm" outline onClick={toggle}>
        View
      </Button>
      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>
          {' '}
          {isExpenseSection ? 'Expense Details' : 'Income Details'}
        </ModalHeader>
        <div className="d-flex justify-content-around mt-1">
          <div className="d-flex">
            <h5>File Name - </h5>
            <span style={{ marginLeft: '5px' }}>File Name</span>
          </div>
          <div className="d-flex">
            <h5>Type - </h5>
            <span style={{ marginLeft: '5px' }}>PDF</span>
          </div>
          <div className="d-flex">
            <h5>Upload Date - </h5>
            <span style={{ marginLeft: '5px' }}>02/02/2023</span>
          </div>
        </div>
        <ModalBody>
          {renderFile()}
          {/* {fileContent ? <img src={fileContent} alt="Preview" /> : <p>No preview available</p>} */}
        </ModalBody>
      </Modal>
    </div>
  );
}

export default DocModal;
