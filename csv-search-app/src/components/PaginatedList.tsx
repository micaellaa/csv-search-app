import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  InputLabel,
  Select,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import "./css/PaginatedList.css";

interface PaginatedListProps {
  uploadedData: any[];
}

interface TableHeaders {
  [key: string]: string;
}

const PaginatedList = ({ uploadedData }: PaginatedListProps) => {
  const [listData, setListData] = useState<any[] | null>(null);
  const [currPageListData, setCurrPageListData] = useState<any[]>([]);
  const [tableHeaders, setTableHeaders] = useState<TableHeaders>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalNumPages, setTotalNumPages] = useState<number>(1);
  const [searchKey, setSearchKey] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const itemsPerPage = 60;

  // Process uploaded data: assign to listData, extract headers, get total number of pages
  useEffect(() => {
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
      const headerObject: TableHeaders = {};
      headers.forEach((header, index) => {
        //console.log("headerObject[index] = header", index, header )
        headerObject[index] = header;
      });
      setTableHeaders(headerObject);
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
    if (!uploadedData || !searchKey || searchKey === "") return;

    const searchColumn = tableHeaders[searchKey];

    const filteredData = uploadedData.filter((item) =>
      item[searchColumn]
        .toString()
        .toLowerCase()
        .includes(searchQuery.toString().toLowerCase())
    );
    setListData(filteredData);

    // Total number of pages
    const numPages = Math.ceil(filteredData.length / itemsPerPage);
    setTotalNumPages(numPages);
  }, [tableHeaders, searchQuery, searchKey, uploadedData]);

  // Handle field changes
  const handleSearchFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const handleChangeSearchKey = (event: SelectChangeEvent) => {
    setSearchKey(event.target.value);
    console.log("searchkey", searchKey);
  };

  // Handle pagination navigation (e.g., next page, previous page, etc.)
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center" }}
      data-testid="paginatedList"
    >
      {listData && (
        <div style={{ width: "60%", minWidth: "650px" }}>
          <div style={{ display: "flex" }}>
            <TextField
              style={{ width: "70%", marginBottom: "20px" }}
              id="outlined-textarea"
              label="Search"
              data-testid="search-field"
              placeholder="Search by any value"
              onChange={handleSearchFieldChange}
              InputProps={{
                endAdornment: <SearchOutlinedIcon fontSize="small" />,
              }}
              multiline
            />
            <FormControl
              style={{ height: "100%", width: "25%", marginLeft: "10px" }}
            >
              <InputLabel
                htmlFor="demo-simple-select"
                id="demo-simple-select-label"
              >
                Search Column
              </InputLabel>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={searchKey}
                label="search-column"
                data-testid="search-column"
                onChange={handleChangeSearchKey}
                native={true}
              >
                <option value=""></option>
                {Object.values(tableHeaders).map((colHeader, index) => (
                  <option key={colHeader} value={index}>
                    {colHeader}
                  </option>
                ))}
              </Select>
            </FormControl>
          </div>
          <table className="listDataTable">
            <thead>
              <tr>
                {tableHeaders &&
                  Object.values(tableHeaders).map((header, index) => (
                    <th key={header}>{header}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {currPageListData?.map((item, index) => (
                <tr key={index}>
                  {Object.values(tableHeaders).map((header, index) => (
                    <td key={header}>{item[header]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => prevPage()}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span style={{ margin: "10px" }}>
              Page {currentPage} of {totalNumPages}
            </span>
            <Button
              variant="outlined"
              size="small"
              onClick={() => nextPage()}
              disabled={currentPage >= totalNumPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaginatedList;
