import React, { useEffect } from 'react';
import { GoogleButton } from 'react-google-button';
import { UserAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate('/account');
    }
  }, [user]);

  return (
    <div className='text-center'>
      <h1 className=''>Sign in</h1>
      <div className='d-flex justify-content-center w-100'>
        <GoogleButton className='m-0' onClick={handleGoogleSignIn}/>
      </div>
    </div>
  );
};

export default SignIn;