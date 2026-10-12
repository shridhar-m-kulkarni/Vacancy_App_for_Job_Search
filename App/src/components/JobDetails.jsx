
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Css/JobDetails.css";
import axios from "axios";

const JobDetails = () => {

  // Store all companies
  const [companyData, setCompanyData] = useState([]);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const boxRef = useRef(null)


  // Get Job Data


   const JobData = async () => {

  

  try {

    const response = await axios.get(
      `http://localhost:3000/jobs?page=${page}`,
      {
        withCredentials: true
      }
    );

   


    // Attach new data below previous data
    setCompanyData((prev) => {
      return [
        ...prev,
        ...response.data
      ];
    });


  } catch (error) {

    console.log(error);

  }



};
  


  // Run API once when page loads
  useEffect(() => {

    JobData();

  }, [page]);


  // View Details
  const handleViewDetails = (job) => {

    console.log("Selected Job:", job);

    navigate("/job-description", {
      state: job
    });

  };


  // Apply
  const handleApply = (job) => {

    console.log("Selected Job:", job);

    navigate("/apply-job", {
      state: job
    });

  };



   useEffect(() => {

    const observer = new IntersectionObserver((entries) => {

      if (entries[0].isIntersecting) {

       

      setPage((prev) => prev + 1);
     

      } 

    });


    if (boxRef.current) {

      observer.observe(boxRef.current);

    }


    return () => {

      observer.disconnect();

    };

  }, []);




  return (
    <>

    <div className="job-details-container">

      <div className="jobs-list">

        {/* Display all companies */}

        {companyData.map((job) => (


          <div className="job-card" key={job.id}>

            {/* Company Logo */}

            <div className="company-logo">

              <img
                src={job.companyLogo}
                alt={job.companyName}
              />

            </div>


            {/* Job Information */}

            <div className="job-info">

              <h2>
                {job.jobTitle}
              </h2>

              <h3>
                {job.companyName}
              </h3>

              <p>
                💰 <strong>Salary:</strong> {job.salary}
              </p>

              <p>
                📍 <strong>Location:</strong> {job.location}
              </p>

              <p>
                💻 <strong>Work Type:</strong> {job.jobType}
              </p>

            </div>


            {/* Buttons */}

            <div className="job-buttons">

              <button
                className="view-btn"
                onClick={() => handleViewDetails(job)}
              >
                View Details
              </button>


              <button
                className="apply-btn"
                onClick={() => handleApply(job)}
              >
                Apply
              </button>

            </div>

          </div>

        ))}

      </div>
    </div>
<div ref={boxRef} style={{display:"flex",alignItems:"center",justifyContent:"center"}}><h1>Loading....</h1></div>

</>
  );

};

export default JobDetails;

