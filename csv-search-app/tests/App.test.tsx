import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom/extend-expect'
import App from '../src/App';

describe('Main page rendering', () => {
  beforeEach(() => {
    // write someting before each test
  });

  afterEach(() => {
    // write someting after each test
  });

  it('renders FileUpload and PaginatedList components', async () => {
    render(
      <App />
    );
    
    // Check if FileUpload component is rendered
    const fileUploadComponent = screen.getByTestId('fileUpload');
    expect(fileUploadComponent).toBeInTheDocument();

    // Check if PaginatedList component is rendered
    const paginatedListComponent = screen.getByTestId('paginatedList');
    expect(paginatedListComponent).toBeInTheDocument();
  });
});



describe('Uploading .csv files', () => {
  afterEach(() => {
    // write someting after each test
  });

  let file : File
  beforeEach(() => {
    file = new File(['dummy, csv, test'], 'test.csv', { type: 'text/csv' });
  });

  it('allows file input', async () => {
    render(<App />);  

    // get the upload button
    const fileInput = screen.getByTestId("file-input");
    
    // simulate ulpoad event and wait until finish
    await waitFor(() =>
      fireEvent.change(fileInput, {
        target: { files: [file] },
      })
    );
  
    //let image = document.getElementById("photo-uploader");
    const fileInputAfter = screen.getByTestId("file-input") as HTMLInputElement;
  
    // check if the file is there
    if (fileInputAfter) {
      console.log("fileInputAfter", fileInputAfter.files)
      if (fileInputAfter.files) {
        expect(fileInputAfter.files).toHaveLength(1);
        expect(fileInputAfter.files[0]).toBe(file);
      }
    }
  });

  it('allows CSV file to be uploaded', async () => {
    render(<App />);  

    // get the upload button
    const fileInput = screen.getByTestId("file-input");
    
    // simulate ulpoad event and wait until finish
    await waitFor(() =>
      fireEvent.change(fileInput, {
        target: { files: [file] },
      })
    );
  
    //let image = document.getElementById("photo-uploader");
    const fileInputAfter = screen.getByTestId("file-input") as HTMLInputElement;
  
    // check if the file is there
    if (fileInputAfter) {
      console.log("fileInputAfter", fileInputAfter.files)
      if (fileInputAfter.files) {
        expect(fileInputAfter.files).toHaveLength(1);
        expect(fileInputAfter.files[0]).toBe(file);
      }
    }
    
    //Simulate a successful file upload by mocking the fetch response
    const mockedResponse = {
      ok: true,
      json: async () => ({ data: [{ column1: 'value1' }] }),
    };

    global.fetch = jest.fn().mockResolvedValue(mockedResponse);

    // Trigger the upload button click
    const uploadButton = screen.getByText('Upload');
    console.log("uploadButton", uploadButton)
    fireEvent.click(uploadButton);

    // Wait for the file upload to complete
    // Check if the file upload status message is initially empty
    const uploadStatus = screen.getByTestId('uploadStatus');
    await waitFor(() => expect(uploadStatus).toHaveTextContent('Successfully uploaded file.'));

  });

  

  it('uploads a CSV file and updates the component state', async () => {
    const mockUploadResponse = {
      ok: true,
      json: async () => ({
        data: [{ column1: 'value1' }],
      }),
    } as Response;
  
    jest.spyOn(global, 'fetch').mockResolvedValue(mockUploadResponse);

    render(<App />);

    const file = new File(['dummy, csv, test'], 'test.csv', { type: 'text/csv' });

    // Simulate selecting a file
    const fileInput = screen.getByTestId('file-input');
    userEvent.upload(fileInput, file);

    // Trigger the upload
    const uploadButton = screen.getByText('Upload');
    fireEvent.click(uploadButton);

    // Wait for the upload to complete
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/upload', {
        method: 'POST',
        body: expect.any(FormData),
      });
    });

    // Assert the component state changes
    const uploadStatus = screen.getByTestId('uploadStatus');
    await waitFor(() => expect(uploadStatus).toHaveTextContent('Successfully uploaded file.'));
    //const uploadedData = screen.getByTestId('uploadedData');

    //expect(uploadStatus).toHaveTextContent('Successfully uploaded file.');
    //expect(uploadedData).toHaveTextContent('value1');
  });
});