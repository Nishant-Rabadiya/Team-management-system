import React, { useState } from 'react';

export const FormFields = (props) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = props?.title === 'Password:';
    
    return (
        <div>
            <label className='input-title'>{props?.title}</label>

            {isPassword ? (
                <div className='d-flex align-items-center'>
                    <input {...props?.data} 
                        type={showPassword ? 'text' : 'password'} 
                        placeholder={props?.placeholder} 
                        className='password-input-field bg-dark text-light' 
                    />
                    <p className='password-hide-show-button bg-dark text-light' 
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ cursor: 'pointer' }} >
                        {showPassword ? (
                            <i className='fa-regular fa-eye'></i>
                        ) : (
                            <i className='fa-regular fa-eye-slash'></i> 
                        )}
                    </p>
                </div>
            ) : (
                <input 
                    {...props?.data} 
                    placeholder={props?.placeholder} 
                    className='input-field bg-dark text-light' 
                />
            )}

            <p className='error-message'>{props?.error}</p>
        </div>
    );
};


