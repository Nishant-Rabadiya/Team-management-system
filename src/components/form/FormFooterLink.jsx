import React from 'react';
import { Link } from 'react-router-dom';

const FormFooterLink = (props) => {
    return (
        <p className='form-footer my-3'>
            {props?.title} 
            <Link to={props?.path} className='link'>
                <span className='footer-link'>{props?.name}</span>
            </Link>
        </p>
    )
};

export default FormFooterLink;
