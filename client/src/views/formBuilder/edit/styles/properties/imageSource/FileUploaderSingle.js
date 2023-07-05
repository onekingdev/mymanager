// ** React Imports
import { useState, Fragment } from 'react';
// ** Reactstrap Imports
import { Button, ListGroup, ListGroupItem } from 'reactstrap';

// ** Third Party Imports
import { useDropzone } from 'react-dropzone';
import { FileText, X, DownloadCloud } from 'react-feather';
import { useUploadSignature } from '../../../../../../requests/documents/recipient-doc';
import { useDispatch } from 'react-redux';
import { addToImageLibraryAction } from '../../../../store/action';

const FileUploaderSingle = ({setImgUrl}) => {
  // ** State
  const [files, setFiles] = useState([]);

  const dispatch = useDispatch();

  const handleFileUpload = () => {
    if (files.length > 0) {
      files.map((file) => {
        const formData = new FormData();
        formData.append('file', file);
        useUploadSignature(formData).then((res) => {
          if (res.success) {
            const payload = { image: res.url };
            dispatch(addToImageLibraryAction(payload))
            setImgUrl(res.url)
          }
        });
      });
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop: (acceptedFiles) => {
      setFiles([...files, ...acceptedFiles.map((file) => Object.assign(file))]);
    }
  });

  const renderFilePreview = (file) => {
    if (file.type.startsWith('image')) {
      return (
        <img
          className="rounded"
          alt={file.name}
          src={URL.createObjectURL(file)}
          height="28"
          width="28"
        />
      );
    } else {
      return <FileText size="28" />;
    }
  };

  const handleRemoveFile = (file) => {
    const uploadedFiles = files;
    const filtered = uploadedFiles.filter((i) => i.name !== file.name);
    setFiles([...filtered]);
  };

  const renderFileSize = (size) => {
    if (Math.round(size / 100) / 10 > 1000) {
      return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`;
    } else {
      return `${(Math.round(size / 100) / 10).toFixed(1)} kb`;
    }
  };

  const fileList = files.map((file, index) => (
    <ListGroupItem
      key={`${file.name}-${index}`}
      className="d-flex align-items-center justify-content-between"
    >
      <div className="file-details d-flex align-items-center">
        <div className="file-preview me-1">{renderFilePreview(file)}</div>
        <div>
          <p className="file-name mb-0">{file.name}</p>
          <p className="file-size mb-0">{renderFileSize(file.size)}</p>
        </div>
      </div>
      <Button
        color="danger"
        outline
        size="sm"
        className="btn-icon"
        onClick={() => handleRemoveFile(file)}
      >
        <X size={14} />
      </Button>
    </ListGroupItem>
  ));

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };

  return (
    <div className="mb-1">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <div className="d-flex align-items-center justify-content-center flex-column">
          <DownloadCloud size={64} />
          <h5>Drop Image here or click to upload</h5>
          <p className="text-secondary">
            Image
            <a href="/" onClick={(e) => e.preventDefault()}>
              browse
            </a>{' '}
            thorough your machine
          </p>
        </div>
      </div>
      {files.length ? (
        <Fragment>
          <ListGroup className="my-2">{fileList}</ListGroup>
          <div className="d-flex justify-content-end">
            <Button className="me-1" color="danger" outline onClick={handleRemoveAllFiles}>
              Remove All
            </Button>
            <Button color="primary" onClick={handleFileUpload}>
              Upload Files
            </Button>
          </div>
        </Fragment>
      ) : null}
    </div>
  );
};

export default FileUploaderSingle;
