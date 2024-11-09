import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/dashboard/pageNotFound.css';

const PageNotFound = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(`/dashboard`);
  }

  return (
    <div className='d-flex justify-content-center align-items-center not-found-main-section'>
      <div className='not-found-section text-center'>
        <h1 className='text-secondary'>Oops!</h1>
        <p className='text-secondary m-0'>Something went wrong!</p>

        <p className='not-found-icon m-0'><i className='fa-solid fa-file-invoice'></i></p>

        <button type='button' className='return-home-button' onClick={handleGoBack}>Return Home </button>
      </div>
    </div>
  )
};

export default PageNotFound;
