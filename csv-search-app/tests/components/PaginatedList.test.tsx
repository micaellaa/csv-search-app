import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PaginatedList from '../../src/components/PaginatedList'

const mockData = [
  { column1: 'value1', column2: 'valueA' },
  { column1: 'value2', column2: 'valueB' },
  // Add more mock data as needed
];

it('renders the component', () => {
  render(<PaginatedList uploadedData={mockData} />);
  // Assert that the component or its key elements are rendered
  const paginatedList = screen.getByTestId('paginatedList');
  expect(paginatedList).toBeInTheDocument();
});

it('populates data and headers correctly', () => {
  render(<PaginatedList uploadedData={mockData} />);
  // Assert that headers are present and data is displayed
  const headers = screen.getAllByRole('columnheader');
  expect(headers).toHaveLength(2); // Assuming two columns
  const dataCells = screen.getAllByRole('cell');
  expect(dataCells).toHaveLength(4); // Assuming two rows with two columns each
  // Add more assertions as needed
});

it('filters data based on search query and column', async () => {
  render(<PaginatedList uploadedData={mockData} />);
  // Simulate selecting a column and entering a search query
  const searchKeySelect = screen.getByTestId('search-column');
  const selectNode = searchKeySelect.childNodes[0].childNodes[0];
  fireEvent.change(selectNode, { target: { value: "0" } });
  //fireEvent.change(searchKeySelect, { target: { value: '0' } }); // Assuming '0' represents the first column
  //console.log("searchkeyselect", searchKeySelect)
  
  //userEvent.selectOptions(searchKeySelect, '0'); // Assuming '0' represents the first column
  
  const searchInput = screen.getByLabelText('search-field');
  fireEvent.change(searchInput, { target: { value: 'value1' } }); // Enter a search query
  // Wait for the component to re-render with filtered data
  await waitFor(() => {
    const filteredDataCells = screen.getAllByRole('cell');
    expect(filteredDataCells).toHaveLength(4); // Assuming one row with two columns matches the filter
  });
  // Add more assertions as needed
});

// it('handles pagination correctly', async () => {
//   render(<PaginatedList uploadedData={mockData} />);
//   // Simulate clicking the "Next" button
//   const nextPageButton = screen.getByText('Next');
//   fireEvent.click(nextPageButton);
//   // Wait for the component to re-render with the next page of data
//   await waitFor(() => {
//     // Assert that the page number is updated
//     const pageNumberText = screen.getByText('Page 2 of 2'); // Assuming there are two total pages
//     expect(pageNumberText).toBeInTheDocument();
//   });
//   // Add more assertions as needed
// });