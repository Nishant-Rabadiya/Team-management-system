import React from 'react';

const FormFieldSection = ({ children }) => {
    return (
        <div className='d-flex justify-content-around profile-input-section'>
            {children}
        </div>
    )
};

export default FormFieldSection;
