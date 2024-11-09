import React from 'react';

const FormSubmitButton = (props) => {
    return (
        <button type='submit' className='register-button mt-4'>{props?.button}</button>
    )
};

export default FormSubmitButton;
