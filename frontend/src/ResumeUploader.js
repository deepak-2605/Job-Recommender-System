import React, { useEffect, useState } from 'react';
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
      console.log(formData);
      console.log(response.data);
      setData(response.data);
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
  useEffect(()=>{
    const rawData = [
  {
    index: 1,
    job_designation: "Software Engineer",
    createdAt: "2023-05-15",
    application_deadline: "2023-09-15",
    company_name: "Tech Innovators",
    average_revenue: 150000,
    average_salary: 120,
    competitors: "InnoSoft, CodeCraft",
    founded: 2015,
  },
  {
    index: 2,
    job_designation: "Data Scientist",
    createdAt: "2023-06-01",
    application_deadline: "2023-10-01",
    company_name: "Data Wizards",
    average_revenue: 200000,
    average_salary: 130,
    competitors: "DataGurus, InfoInsights",
    founded: 2010,
  },
  {
    index: 3,
    job_designation: "Product Manager",
    createdAt: "2023-07-10",
    application_deadline: "2023-11-10",
    company_name: "Product Pioneers",
    average_revenue: 300000,
    average_salary: 150,
    competitors: "ProdMan, InnovateCorp",
    founded: 2012,
  },
  {
    index: 4,
    job_designation: "UX/UI Designer",
    createdAt: "2023-08-05",
    application_deadline: "2023-12-05",
    company_name: "Design Dynamics",
    average_revenue: 100000,
    average_salary: 110,
    competitors: "DesignFlow, CreateSpace",
    founded: 2018,
  },
  {
    index: 5,
    job_designation: "Marketing Specialist",
    createdAt: "2023-04-20",
    application_deadline: "2023-08-20",
    company_name: "Market Masters",
    average_revenue: 250000,
    average_salary: 140,
    competitors: "BrandBoost, MarketGenius",
    founded: 2005,
  },
];

    const datat = rawData.map((row, index) => ({
    index: index + 1,
    company_name: row['company_name'],
    average_revenue: row['average_revenue'],
    average_salary: row['average_salary'],
    competitors: row['competitors'],
    founded: row['founded'],
   
  }));
  setData(datat);
  }, []);
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
