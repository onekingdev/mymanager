import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import moment from 'moment';
import Upload from './../components/Upload';
import { useUploadDocument } from '../../../requests/documents/create-doc';
import { IncomeUpdateAction } from '../store/actions';
import { toast } from 'react-toastify';

function DocModal({ toggle, modal, data, dispatch,type }) {
  const locationPath = useLocation();
  const isExpenseSection = locationPath.pathname === '/finance/expense';
  const [form, setForm] = useState({ ...data });

  const uploadProof = () => {
    if (form.attachment) {
      const formData = new FormData();
      formData.append('file', form?.attachment);
      formData.append('type', type);
      useUploadDocument(formData).then((res) => {
        let payload = { documentId: res.uploadedDocuments.id };
        dispatch(IncomeUpdateAction(data._id, payload));
      });
      toggle()
    } else {
      toast.error('No file selected.');
    }
  };

  return (
    <div>
      <Button color="primary" className="btn btn-sm" outline onClick={toggle}>
        View
      </Button>
      <Modal isOpen={modal} toggle={toggle} size="xl" centered>
        <ModalHeader toggle={toggle}>
          {' '}
          {isExpenseSection ? 'Expense Details' : 'Income Details'}
        </ModalHeader>
        <div className="d-flex justify-content-around mt-1">
          <div className="d-flex">
            <h5>File Name - </h5>
            <span style={{ marginLeft: '5px' }}>{data?.documentId?.name}</span>
          </div>

          <div className="d-flex">
            <h5>Upload Date</h5>
            <span style={{ marginLeft: '5px' }}>
              {moment(data?.documentId?.createdAt).format('MM/DD/yyyy')}
            </span>
          </div>
        </div>
        <ModalBody>
          {data?.documentId ? (
            <iframe
              src={`${data?.documentId?.cloudUrl}`}
              className="w-100"
              style={{ minHeight: '500px' }}
            />
          ) : (
            <>
              <Upload onChange={(e) => setForm({ ...form, attachment: e.target.files[0] })} />
              <Button color="primary" onClick={uploadProof} className='mt-1'>
                Upload Proof
              </Button>
            </>
          )}
        </ModalBody>
      </Modal>
    </div>
  );
}

export default DocModal;
