import React from 'react'
import { ImageAssets } from '../utils/ImageUtils'

function PageNotFound() {
  return (
    <div className='h-100 center-div'>
      {/* <form className='login-container p-4'>
        <img src={ImageAssets.LOGO} alt='logo' className='login-page-logo mx-auto mb-3' />
        
      </form> */}
      <img src={ImageAssets.NOT_FOUND} alt='not-foung' className='' />
      <h2>Page Not Found</h2>
      <p className='text-center'>We are sorry, the page  you requested could not be found</p>
    </div>
  )
}

export default PageNotFound