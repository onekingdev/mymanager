import React, { useState, useRef } from 'react';
import { Input, Label } from 'reactstrap';

import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData } from '../../../utility/Utils'
function ImageUploadExample({onChange}) {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);
  const currentPath = useSelector((state) => state.filemanager.currentPath);
  const dispatch = useDispatch();
  async function handleInputChange(event) {
    const file = event.target.files[0];
    setFile(file);
    onChange(event);
    
  }

  return (
    <div>
      <div className="file-upload">
        <Label>Proof</Label>
        <Input type="file" onChange={handleInputChange} ref={inputRef} />
        {uploading && (
          <div className="d-flex">
            <div className="loading-expense"></div>
             <div className="file-upload-status">Waiting for upload...</div>
          </div>
        )}
        {file && (
          <div className="file-upload-progress" style={{ width: `${uploadProgress}%` }}></div>
        )}
      </div>
    </div>
  );
}

export default ImageUploadExample;
