import React, { useState } from 'react';
import * as d3 from 'd3';

const CSVReader = ({ callback }) => {
  const [csvData, setCsvData] = useState(null);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [fileName, setFileName] = useState(""); // New state for file name

  const handleFile = (file) => {
    if (file) {
      const fileType = file.type;
      const fileName = file.name;

      if (!(fileType === "text/csv") || !(fileName.endsWith(".csv"))) {
        alert("Please upload a valid CSV file.");
        return;
      }

      // Update file name state
      setFileName(fileName);
    } else {
      alert("Please upload a valid CSV file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      try {
        const parsedData = d3.csvParse(text, d3.autoType);
        setCsvData(parsedData);
        setPreviewData(parsedData.slice(0, 10));
        console.log(parsedData);
        setError(null);
        callback(JSON.stringify(parsedData.slice(0, 30)));
      } catch (err) {
        console.log(err);
        setError("Error parsing CSV file.");
      }
    };
    reader.readAsText(file);
  };

  // Handle file input change (for file upload input)
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleFile(file);
    }
  };

  // Drag and drop handlers
  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  // Helper function to render the preview table
  const renderTablePreview = () => {
    if (!previewData || previewData.length === 0) return null;

    const columns = Object.keys(previewData[0]);

    return (
      <table style={{ border: '1px solid #ddd', borderCollapse: 'collapse', width: '100%', marginTop: '20px' }}>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index} style={{ border: '1px solid #ddd', padding: '8px' }}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {previewData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={colIndex} style={{ border: '1px solid #ddd', padding: '8px' }}>{row[col]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className='flex flex-col items-center justify-items-center'>
      <div className="csv-uploader">
        <div className='w-full flex items-center justify-center'>
          {/* Hidden file input */}
          <input
            id="csvFileInput"
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            style={{ display: 'none' }} // Hide the file input
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          />

          {/* Custom file upload button */}
          <label
            htmlFor="csvFileInput"
            className={`drop-area ${isDragging ? 'dragging' : ''}`}
            style={{
              border: isDragging ? '2px dashed #4CAF50' : '2px dashed #ccc',
              padding: '20px',
              marginTop: '20px',
              borderRadius: '10px',
              textAlign: 'center',
              cursor: 'pointer',
              maxWidth: previewData ? '300px' : '100%',
              transition: 'max-width 0.3s',
              display: 'inline-block',
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {fileName ? `Uploaded File: ${fileName}` : 'Drag and drop a CSV file here, or click to upload'}
          </label>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* Toggle Preview Button */}
        {previewData && (
          <div className='w-full flex items-center justify-center'>
            <button
              onClick={() => setShowPreview((prev) => !prev)}
              style={{
                alignSelf: 'center',
                marginTop: '20px',
                padding: '10px 20px',
                backgroundColor: '#4CAF50',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </button>
          </div>
        )}
      </div>

      {showPreview && (
        <div className="overflow-auto" style={{ maxHeight: '100vh', marginTop: '20px' }}>
          {renderTablePreview()}
        </div>
      )}
    </div>
  );
};

export default CSVReader;
