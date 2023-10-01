import React, {useState} from 'react';

// Components
import FileUpload from './components/FileUpload';
import PaginatedList from './components/PaginatedList';

function App() {
  const [uploadedData, setUploadedData] = useState<any[]>([]);

  return (
    <div className="App">
        <FileUpload setUploadedData={setUploadedData} />
     
        {uploadedData.length > 0 && (<PaginatedList uploadedData={uploadedData} />)}
      </div>
   
  );
}

export default App;
