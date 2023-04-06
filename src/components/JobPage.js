import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_URL, getToken } from '../utils/CommonUtils';
import { AiFillStar } from "react-icons/ai";
import { FaShareSquare } from "react-icons/fa";
import { BsBriefcase } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";

function JobPage() {
    const [jobDetails, setJobDetails] = useState(null);
    const [jobId, setJobId] = useState(null);
    const navigate = useNavigate();
    const urlParams = useParams();

    const getJobDetails = async () => {
        const url = `${BASE_URL}/jobs/${urlParams.jobId}`;
        const options = {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
            method: 'GET',
        }

        const response = await fetch(url, options);
        if (response.ok) {
            const data = await response.json();
            //console.log('job data',data);
            setJobDetails(data);
        }
    }

    useEffect(() => {
        setJobId(urlParams.jobId)
    },[]);

    useEffect(() => {
        getJobDetails()
    }, [jobId])

    const jumpToJob = (id) => {
        setJobId(id);
        navigate(`/jobs/${id}`);
    }

    const jobDetailsCard = () => {
        if (jobDetails) {
            return (
                <div className='container job-card p-3 mb-3'>
                    <div className='d-flex'>
                        <img src={jobDetails.job_details.company_logo_url} alt='company-logo' className='company-logo' />
                        <div className='flex-grow-1 ms-3'>
                            <p className='job-card-title fw-bold my-0'>{jobDetails.job_details.title}</p>
                            <p className='job-card-title fw-bold'> <AiFillStar className='star-icon me-2' />{jobDetails.job_details.rating}</p>
                        </div>
                    </div>
                    <div className='d-flex mt-3'>
                        <p className='job-card-title me-3'> <CiLocationOn className='star-icon me-2' />{jobDetails.job_details.location}</p>
                        <p className='job-card-title me-auto'> <BsBriefcase className='star-icon me-2' />{jobDetails.job_details.employment_type}</p>
                        <p className='job-card-title'>{jobDetails.job_details.package_per_annum}</p>
                    </div>
                    <hr className='mt-0' />
                    <div className='d-flex align-items-center'>
                        <h4 className='me-auto'>Description</h4>
                        <a href={jobDetails?.job_details?.company_website_url} target='_blank'><FaShareSquare className='cursor-pointer' /></a>
                    </div>
                    <p className='mb-3'>{jobDetails.job_details.job_description}</p>

                    <h4 className=''>Skills</h4>
                    <div className='row mb-3'>
                        {jobDetails.job_details.skills.map((skill, i) => {
                            return (
                                <div className='col-12 col-md-4 my-3' key={i}>
                                    <div className='d-flex align-items-center'>
                                        <img src={skill.image_url} alt='skill-logo' className='me-3' style={{ height: '50px' }} />
                                        <p className='my-0'>{skill.name}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <h4 className=''>Life at Company</h4>
                    <div className='d-flex justify-content-reverse'>
                        <p>{jobDetails.job_details.life_at_company.description}</p>
                        <img src={jobDetails.job_details.life_at_company.image_url} alt='company-logo' className='' />

                    </div>
                </div>
            )
        } else {
            return null
        }
    }

    return (
        <div className='flex-grow-1 overflow-scroll'>
            <div className='container d-flex flex-column h-100 p-3'>
                {jobDetailsCard()}
                <h3>Similar Jobs</h3>
                <div className='row'>
                    {jobDetails?.similar_jobs?.map((job, i) => {
                        return (
                            <div className='col-12 col-md-4' key={i} onClick={() => jumpToJob(job.id)}>
                                <div className='container job-card p-3 mb-3'>
                                    <div className='d-flex'>
                                        <img src={job.company_logo_url} alt='company-logo' className='company-logo' />
                                        <div className='flex-grow-1 ms-3'>
                                            <p className='job-card-title fw-bold my-0'>{job.title}</p>
                                            <p className='job-card-title fw-bold'> <AiFillStar className='star-icon me-2' />{job.rating}</p>
                                        </div>
                                    </div>
                                    <p className='job-card-description fw-bold'>Description</p>
                                    <p className='job-card-description'>{job.job_description}</p>
                                    <div className='d-flex mt-3'>
                                        <p className='job-card-title me-3'> <CiLocationOn className='star-icon me-2' />{job.location}</p>
                                        <p className='job-card-title '> <BsBriefcase className='star-icon me-2' />{job.employment_type}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default JobPage