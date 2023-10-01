import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import PaginatedList from '../../src/components/PaginatedList'

const mockData = [
  { name: 'value1', email: 'valueA' },
  { name: 'value2', email: 'valueB' },
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
});

it('filters data based on search query and column', async () => {
  render(<PaginatedList uploadedData={mockData} />);
  
  // Simulate selecting a column and entering a search query
  const searchKeySelect = screen.getByTestId('search-column');
  const selectNode = searchKeySelect.childNodes[0].childNodes[0];

  fireEvent.change(selectNode, { target: { value: "2" } });

  await waitFor(() => {
    expect(selectNode).toHaveValue("2");
  });
  
  const searchInput = screen.getByLabelText("Search");
  
  fireEvent.change(searchInput, { target: { value: "valueA" } }); // Enter a search query

  await waitFor(() => {
    expect(searchInput).toHaveValue("valueA");
  });

  await waitFor(async() => {
    const filteredDataCellsAfter = screen.getAllByRole('cell');
    expect(filteredDataCellsAfter).toHaveLength(2); // Assuming one row with two columns matches the filter
  });

});