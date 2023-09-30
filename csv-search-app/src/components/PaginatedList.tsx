import React, { useEffect, useState } from "react";

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
    <div>
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
              <tr key={index}>
                {tableHeaders.map((header) => (
                  <td key={header}>{item[header]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div>
        <button onClick={() => prevPage()} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalNumPages}
        </span>
        <button
          onClick={() => nextPage()}
          disabled={currentPage === totalNumPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginatedList;
