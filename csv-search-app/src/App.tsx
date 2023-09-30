import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
// Components
import FileUpload from './components/FileUpload';
import PaginatedList from './components/PaginatedList';

function App() {
  const [uploadedData, setUploadedData] = useState<any[]>([]);

  return (
    <div className="App">
      <FileUpload setUploadedData={setUploadedData} />
      <PaginatedList uploadedData={uploadedData} />
    </div>
  );
}

export default App;
