//React
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//components
//packages
//utils
import { AiFillStar, AiOutlineSearch } from "react-icons/ai";
import { BsBriefcase } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { getToken, EMPLOYMENT_TYPES, SALARY_RANGES, BASE_URL } from '../utils/CommonUtils';
import NoJobsFound from './NoJobsFound';

function Jobs() {
  const [jobTypes, setJobTypes] = useState([]);
  const [count, setCount] = useState(0);
  const [salaryRange, setSalaryRange] = useState(null);
  const [searchString, setSearchString] = useState('');
  const [jobsData, setJobsData] = useState(null);
  const [profileData, setProfileData] = useState(null);

  const navigate = useNavigate();

  const updatedSearchJobTypes = (type) => {
    // console.log({type});
    // console.log('initial',jobTypes);
    if (jobTypes.includes(type)) {
      const index = jobTypes.indexOf(type);
      jobTypes.splice(index, 1);
    } else {
      jobTypes.push(type)
    }
    setJobTypes(jobTypes);
    setCount(jobTypes.length);
  }

  const searchJobs = async () => {
    const employmentType = `employment_type=${jobTypes.length ? jobTypes.join(',') : ''}`;
    const minPackage = `minimum_package=${salaryRange ? salaryRange : ''}`;
    const search = `search=${searchString.length ? searchString : ''}`;

    const url = `${BASE_URL}/jobs?${employmentType}&${minPackage}&${search}`;

    const options = {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      //console.log('response data',data)
      setJobsData(data.jobs)
    }
  }

  const getProfile = async () => {
    const url = `${BASE_URL}/profile`;
    const options = {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      //console.log('profile data',data.profile_details)
      setProfileData(data.profile_details);
    }
  }

  useEffect(() => {
    searchJobs()
  }, [count, salaryRange, searchString])

  useEffect(() => {
    getProfile()
  },[])

  const renderJobsView = () => {
    if (jobsData) {
      if (jobsData.length) {
        return (
          <div>
            {jobsData.map((job, i) => {
              return (
                <div className='container job-card p-3 mb-3' key={i} onClick={() => navigate(`/jobs/${job.id}`)}>
                  <div className='d-flex'>
                    <img src={job.company_logo_url} alt='company-logo' className='company-logo' />
                    <div className='flex-grow-1 ms-3'>
                      <p className='job-card-title fw-bold my-0'>{job.title}</p>
                      <p className='job-card-title fw-bold'> <AiFillStar className='star-icon me-2' />{job.rating}</p>
                    </div>
                  </div>
                  <div className='d-flex mt-3'>
                    <p className='job-card-title me-3'> <CiLocationOn className='star-icon me-2' />{job.location}</p>
                    <p className='job-card-title me-auto'> <BsBriefcase className='star-icon me-2' />{job.employment_type}</p>
                    <p className='job-card-title'>{job.package_per_annum}</p>
                  </div>
                  <hr className='mt-0' />
                  <p className='job-card-description fw-bold'>Description</p>
                  <p className='job-card-description'>{job.job_description}</p>
                </div>
              )
            })}
          </div>
        )
      } else {
        return <NoJobsFound />
      }
    }
  }

  const renderProfileView = () => {
    if(profileData){
      return(
        <div className='profile-container p-2'>
          <img src={profileData?.profile_image_url} alt='profile-logo' className='' />
          <p className='profile-name'>{profileData?.name}</p>
          <p className='profile-description'>{profileData?.short_bio}</p>
        </div>
      )
    }else{
      return null
    }
  }

  // console.log(jobsData)
  // console.log(profileData)

  return (
    <div className='flex-grow-1 overflow-scroll'>
      <div className='container d-flex h-100 p-3'>
        {/* left side tab */}
        <div className='container d-flex flex-column' style={{ width: '30%' }}>
          {renderProfileView()}
          <hr className='hr-line' />
          <div>
            <p className=''>Type of Employement</p>
            {EMPLOYMENT_TYPES.map((el, i) => {
              return (
                <div className='d-flex align-items-center mb-2' key={i}>
                  <input type='checkbox' className='me-2' value={el.value} onChange={e => updatedSearchJobTypes(e.target.value
                  )} />
                  <label>{el.label}</label>
                </div>
              )
            })}
          </div>
          <hr className='hr-line' />
          <div>
            <p className=''>Salary Range</p>
            {SALARY_RANGES.map((el, i) => {
              return (
                <div className='d-flex align-items-center mb-2' key={i}>
                  <input type='radio' className='me-2' value={el.value} checked={el.value === salaryRange} onChange={(e) => setSalaryRange(e.target.value)} />
                  <label>{el.label}</label>
                </div>
              )
            })}
          </div>
        </div>
        {/* right side tab */}
        <div className='d-flex flex-column overflow-scroll' style={{ width: '70%' }}>
          <div className='d-flex mb-2'>
            <div className='d-flex' style={{ border: '1px solid white' }}>
              <input type='search' className='search-box' value={searchString} onChange={e => setSearchString(e.target.value)} />
              <div className='center-div search-icon-box cursor-pointer' onClick={searchJobs}><AiOutlineSearch /></div>
            </div>
          </div>
          {renderJobsView()}
        </div>
      </div>
    </div>
  )
}

export default Jobs;