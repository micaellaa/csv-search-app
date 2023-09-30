import React, { useEffect, useState } from "react";
import { Button, TextField, IconButton } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

interface PaginatedListProps {
  uploadedData: any[]; // You can replace 'any' with a more specific type if you have one
}

const PaginatedList = ({ uploadedData }: PaginatedListProps) => {
  const [listData, setListData] = useState<any[]>([]);
  const [currPageListData, setCurrPageListData] = useState<any[]>([]);
  const [tableHeaders, setTableHeaders] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalNumPages, setTotalNumPages] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const itemsPerPage = 60;

  // Process uploaded data: assign to listData, extract headers, get total number of pages
  useEffect(() => {
    console.log("inpaginated", uploadedData);

    if (uploadedData) {
      setListData(uploadedData);

      const numPages = Math.ceil(uploadedData.length / itemsPerPage);
      setTotalNumPages(numPages);
    } else {
      return;
    }
    if (uploadedData.length > 1) {
      const firstItem = uploadedData[0];
      const headers = Object.keys(firstItem);
      setTableHeaders(headers);
    }
  }, [uploadedData]);

  // Extract sliced listData to display
  useEffect(() => {
    if (!listData) return;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setCurrPageListData(listData.slice(startIndex, endIndex));
  }, [listData, currentPage]);

  // Filter data according to search query
  useEffect(() => {
    if (!uploadedData) return;
    const filteredData = uploadedData.filter((item) =>
      getItemValues(item).toLowerCase().includes(searchQuery.toLowerCase())
    );
    // Total number of pages
    const numPages = Math.ceil(filteredData.length / itemsPerPage);
    setTotalNumPages(numPages);
    setListData(filteredData);
  }, [searchQuery, uploadedData]);

  const handleSearchFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchQuery(event.target.value);
  }

  // Handle pagination navigation (e.g., next page, previous page, etc.)
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const getItemValues = (item: any) => {
    let values = Object.values(item);
    let output = "";
    for (let val of values) {
      output += val;
    }
    return output;
  };

  return (
    <div style={{display:'flex', justifyContent:'center'}}>
    <div style={{ width: '60%', minWidth: '600px'}}>

      <TextField
          style={{ width: '100%', marginBottom:'20px' }}
          id="outlined-textarea"
          label="Search"
          placeholder="Search by any value"
          onChange={handleSearchFieldChange}
          InputProps={{
            endAdornment: (
              <SearchOutlinedIcon fontSize='small'/>
            ),
          }}
          multiline
        />
      
      {currPageListData && (
          <table>
            <thead>
              <tr>
                {tableHeaders.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currPageListData?.map((item, index) => (
                <tr key={index} >
                  {tableHeaders.map((header) => (
                    <td key={header}>{item[header]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

      )}
      <div>
        <Button variant="outlined" size="small" onClick={() => prevPage()} disabled={currentPage === 1}>
          Previous
        </Button>
        <span style={{margin:"10px"}}>
          Page {currentPage} of {totalNumPages}
        </span>
        <Button variant="outlined" size="small"
          onClick={() => nextPage()}
          disabled={currentPage === totalNumPages}
        >
          Next
        </Button>
      </div>
      </div>
    </div>
  );
};

export default PaginatedList;
