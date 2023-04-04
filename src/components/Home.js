import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const jumpToJobs = () => navigate('/jobs')
  
  return (
    <div className='flex-grow-1 overflow-scroll home-container'>
      <div className='container'>
        <div className='text-container p-3 mt-5'>
          <h2 className='home-text-heading'>Find the job that fits your life</h2>
          <p className='home-text-description my-3'>
            Millions of people are searching for jobs, salary information, copany reviews.
            Find the job that fits your abilities and potential.
          </p>
          <Button size='lg' className='my-3' onClick={jumpToJobs}>Find Jobs</Button>
        </div>
      </div>
    </div>
  )
}

export default Home;