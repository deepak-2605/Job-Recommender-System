import React, { useState } from 'react';
import axios from 'axios';
import CustomTable from "../src/components/CustomTable/CustomTable"; // Adjust the import path as needed

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
      const response = await axios.post('http://127.0.0.1:5000/recommend', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setData(response.data)
      // console.log(data)
      // Assuming the response is an array of job recommendations
      const responseData = response.data.map((row, index) => ({
        index: index + 1,
        company_name: row['Company Name'],  // Matching the key exactly as it appears in the response
        average_revenue: row['Average Revenue'],
        average_salary: row['Average Salary'],
        // competitors: row['Competitors'],
        competitors: row['Competitors'] === '-1' ? 'No Data' : row['Competitors'],
        founded: row['Founded'],
      }));
      console.log("responseData, ",responseData)
      setData(responseData);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const columns = [
    {
      Header: "ID",
      accessor: "index",
      disableFilters: true,
    },
    {
      Header: "Company Name",
      accessor: "company_name",
    },
    {
      Header: "Average Revenue",
      accessor: "average_revenue",
    },
    {
      Header: "Average Salary",
      accessor: "average_salary",
    },
    {
      Header: "Competitors",
      accessor: "competitors",
    },
    {
      Header: "Founded",
      accessor: "founded",
    },
  ];

  return (
    <div className="mx-auto flex flex-col justify-center items-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="text-3xl font-bold mb-8 text-center">
        Job Recommendation System
      </div>
      <div className="w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-4xl p-6 bg-white shadow-lg rounded-lg">
        <div className="text-center mb-4">
          <span className="text-2xl font-bold">Upload Your Resume</span>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <button
            type="submit"
            className="mt-4 w-[50%] ml-[25%] bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Upload
          </button>
        </form>
      </div>

      {data.length > 0 && (
        <div className="w-full max-w-4xl mt-8 overflow-x-auto">
          <CustomTable
            column_header={columns}
            table_data={data}
          />
        </div>
      )}
    </div>
  );
};

export default ResumeUploader;
