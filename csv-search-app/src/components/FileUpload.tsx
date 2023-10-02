import React, { useState, useEffect, ChangeEvent } from "react";
import { Button, Input } from '@mui/material';
import './css/FileUpload.css';

interface FileUploadProps {
  uploadedData: any[];
  setUploadedData: (data: any) => void;
}

function FileUpload({ uploadedData, setUploadedData }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [uploadResponseOk, setUploadResponseOk] = useState<boolean>(false);
  const [isDataUploaded, setIsDataUploaded] = useState<boolean>(false);

  useEffect(() => {
    if (uploadedData && uploadedData.length >= 1) {
      setIsDataUploaded(true);
    }
  }, [uploadedData])

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("csvFile", file);

      try {
        const response = await fetch("http://localhost:3001/upload", {
          method: "POST",
          body: formData,
          // // Add this line to track upload progress
          // onUploadProgress: (progressEvent) => {
          //   const progress = Math.round(
          //     (progressEvent.loaded / progressEvent.total) * 100
          //   );
          //   setUploadProgress(progress);
          // },
        });
        if (!response.ok) {
          const errorMessage = await response.json();
          //console.log("errorMessage", errorMessage);
        } else {
          const fileObj = await response.json();
          const fileData = fileObj.data
          setUploadResponseOk(true)
          setUploadStatus("Successfully uploaded file.");
          setUploadedData(fileData);
        }
      } catch (error) {
        let message = (error as Error).message;
        setUploadStatus("Unable to load the file: " + message);
        console.log("errork", message);
      }
    }
  };

  const handleClearData = () => {
    window.location.reload();
  }

  return (
   <div style={{display:'flex', justifyContent:'center'}} data-testid="fileUpload">
      <div style={{ width: '60%', minWidth: '650px'}}>
      <h3>Upload a CSV File</h3>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          style={{ marginRight: "10px", width: "70%"}} 
          id="file-input"
          data-testid="file-input"
          className="custom-file-input"
          disabled={isDataUploaded}
        />
        {isDataUploaded ? 
          (<Button variant="contained" onClick={handleClearData} style={{ width: "20%", backgroundColor: "#717f91"}} >Clear Data</Button>) :
          (<Button variant="contained" onClick={handleUpload} style={{ width: "20%"}} >Upload</Button>)
        }
      <p data-testid="uploadStatus" style={{color: uploadResponseOk ? '#32612D' : '#7C0A02'}}>{uploadStatus}</p>
      </div>
    </div>
  );
}

export default FileUpload;
