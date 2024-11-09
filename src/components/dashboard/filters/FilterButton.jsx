import React, { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const FilterButton = ({ filterType, onFilterChange: handleFilterChange }) => {
    const [role, setSelectedRole] = useState('');

    const handleLocalFilterChange = (name) => {
        setSelectedRole(name);
        handleFilterChange(name);
    };

    return (
        <div className='d-flex'>

            <span className='filter-icon'>
                <i className='fa-solid fa-filter'></i>
            </span>

            <DropdownButton title={role ? role : 'Filter'} bsPrefix='filters-button display-1'>
                {filterType?.map((name) => (
                    <Dropdown.Item eventKey={name?.name} key={name?.name} onClick={() => handleLocalFilterChange(name?.name)}>{name?.name}</Dropdown.Item>
                ))}
            </DropdownButton>

            <button className='filters-clear-button display-1' onClick={() => handleLocalFilterChange('')}>
                <span className='text-secondary'>
                    <i className='fa-solid fa-xmark'></i>
                </span>
            </button>

        </div>
    )
}

export default FilterButton;

