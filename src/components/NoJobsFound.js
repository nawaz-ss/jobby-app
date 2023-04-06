import React from 'react'
import { ImageAssets } from '../utils/ImageUtils'

function NoJobsFound() {
  return (
    <div className='center-div'>
        <img src={ImageAssets.NO_JOBS_IMG} alt='no-jobs' className='' />
        <h1>No Jobs Found</h1>
        <p>We could not find any jobs. Try other filters.</p>
    </div>
  )
}

export default NoJobsFound