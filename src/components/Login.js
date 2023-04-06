import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
//import { useDispatch } from 'react-redux';
import { ImageAssets } from '../utils/ImageUtils';
//import { fetchUser } from '../redux/actions';
import { BASE_URL } from '../utils/CommonUtils';
import Cookies from 'js-cookie';
import { getToken } from '../utils/CommonUtils';

function Login({signIn}) {
  const [ errorMsg, setErrorMsg ] = useState(null);
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
  } = useForm();

  const onSubmit = async data => {
    //console.log('form data ::', data);
    const url = `${BASE_URL}/login`
    const options = {
        method: 'POST',
        body: JSON.stringify(data),
    };
    const response = await fetch(url, options);
    //console.log('API RES::', response);
    const data1 = await response.json()
    //console.log('API DATA :', data1);

    if (response.ok === true) {
      Cookies.set('token', data1['jwt_token'], {expires: 1});
      signIn();
      navigate("/");
    } else {
      setErrorMsg(data1['error_msg']) 
    }
  }

  useEffect(() => {
    if(getToken()){
      navigate("/")
    }
  },[])

  return (
    <div className='h-100 center-div'>
      <form className='login-container p-4' autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <img src={ImageAssets.LOGO} alt='logo' className='login-page-logo mx-auto mb-3' />
        <label>
          USERNAME<br />
          <input {...register('username')} className='input-field px-2 mt-1 w-100' type='text' required />
        </label>
        <label className='mt-3'>
          PASSWORD<br />
          <input {...register('password')} className='input-field px-2 mt-1 w-100' type='password' required />
        </label>
        <Button variant="primary" type="submit" className='mt-3'>
          Submit
        </Button>
        {errorMsg && <span className='text-danger'>{errorMsg}</span>}
      </form>
    </div>
  )
}

export default Login;