import React, { useState } from 'react';
import axios from 'axios';

const ResumeUploader = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('resume', file);

    try {
      const response = await axios.post('YOUR_API_ENDPOINT', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setData(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="mx-auto  flex flex-col justify-center items-center bg-gray-100">
      <div className="text-3xl font-bold mb-8 text-center">
        Job Recommendation System
      </div>
      <div className="w-full max-w-md p-4 bg-white shadow-lg rounded-lg">
        <div >
            <span className="text-3xl font-bold mb-8 text-center">Upload Your Resume</span>
           
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <button
            type="submit"
            className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Upload
          </button>
        </form>
        {data.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">API Response</h3>
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Key</th>
                  <th className="py-2 px-4 border-b">Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(data).map(([key, value]) => (
                  <tr key={key}>
                    <td className="py-2 px-4 border-b">{key}</td>
                    <td className="py-2 px-4 border-b">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeUploader;
