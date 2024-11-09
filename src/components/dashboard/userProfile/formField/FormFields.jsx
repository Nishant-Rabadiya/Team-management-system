import React from 'react';

const FormFields = ({ title, data, value, placeholder, disabled, error, options, isSelect }) => {
  return (
    <div>
      <p className='profile-input-title m-0'>{title}</p>

      {isSelect ? (
        <select {...data} className='profile-input bg-dark text-light p-2'>
          <option value=''>{placeholder}</option>
          {options?.map((option) => (
            <option key={option?.id} value={option?.name}>
              {option?.name}
            </option>
          ))}
        </select>
      ) : (
        <input {...data} value={value} className='profile-input bg-dark text-light' type='text' placeholder={placeholder} disabled={disabled} />
      )}

      <p className='profile-error text-danger m-0'>{error}</p>
    </div>
  );
};

export default FormFields;

