import React, { Children } from 'react';
import '../../style/form/formLayout.css';

const FormLayout = ({ children }) => {
    return (
        <div className='main-section bg-dark'>

            <div className='form-section bg-dark text-light'>
                {Children.only(children)}
            </div>

        </div>
    )
};

export default FormLayout;
