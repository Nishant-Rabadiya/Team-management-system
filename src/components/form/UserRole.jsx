import React, { useState } from 'react';

const UserRole = (props) => {
    const [role, setRole] = useState('');

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    return (
        <div>
            <label className='input-title'>{props?.title}</label>
            <select className='select-role bg-dark text-light' {...props?.data} value={role} onChange={handleRoleChange}>
                {props?.roles?.map((role) => (
                    <option key={role?.name} value={role?.name}>{role?.name}</option>
                ))}
            </select>
        </div>
    );
};

export default UserRole;
