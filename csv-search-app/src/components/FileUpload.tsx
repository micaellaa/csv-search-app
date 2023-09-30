import React, { useState, ChangeEvent } from "react";

interface FileUploadProps {
  setUploadedData: (data: any) => void;
}

function FileUpload({ setUploadedData }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  //const [uploadProgress, setUploadProgress] = useState(null);

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
          console.log("errorMEssage", errorMessage);
        } else {
          const fileObj = await response.json();
          const fileData = fileObj.data
          setUploadStatus("Successfully uploaded file.");
          setUploadedData(fileData);
          console.log("fileData", fileData);
        }
      } catch (error) {
        let message = (error as Error).message;
        setUploadStatus("Unable to load the file: " + message);
        console.log("errork", message);
      }
    }
  };

  return (
    <div>
      <h1>Upload a CSV File</h1>
      <input type="file" onChange={handleFileChange} accept={".csv"} />
      {/* {uploadProgress > 0 && (
        <div>
          <progress value={uploadProgress} max="100" />
          {uploadProgress}% Uploaded
        </div>
      )} */}
      <button onClick={handleUpload}>Upload</button>
      <p>{uploadStatus}</p>
    </div>
  );
}

export default FileUpload;
