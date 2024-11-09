import React, { useCallback } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import MessageIcon from './MessageIcon';

import { getTeamData, updateUser } from '../../../api/api';
import { getAllTeamData, mutationData } from '../CommonFunction';

const Navbar = ({ onSearch, data }) => {
    const navigate = useNavigate();
    const userEmail = JSON.parse(localStorage?.getItem('loginData'))?.email;

    const teamData = getAllTeamData('teamData', getTeamData);

    const mutation = mutationData('teamData', updateUser);

    const { register } = useForm();
    const handleSearch = useCallback(
        debounce((searchTerm) => {
            onSearch(searchTerm);
        }, 300),
        [onSearch]
    );

    const handleChange = (event) => {
        handleSearch(event.target.value);
    };

    const handleUserProfile = () => {
        navigate(`/userprofile`);
    };

    const handleLogOutButton = () => {
        const currentUser = teamData?.team?.find(user => user.email === userEmail);
        localStorage.setItem('loginData', JSON.stringify({ email: '' }));
        mutation.mutate({ ...currentUser, lastLogin: Date.now() });
        toast.success('Logout Successfully !');
        navigate('/login')
    };

    return (

        <div className='bg-dark text-light navbar'>

            <p className='m-0 text-secondary' >Dashboard / <span className='text-light'>{data?.role}</span></p>

            <div className='d-flex align-items-center'>
                <form>
                    <div className='d-flex'>
                        <p className='m-0 search-icon'><i className='fa-solid fa-magnifying-glass'></i></p>
                        <input className='bg-dark text-light search-input' {...register('search', {
                            onChange: (e) => handleChange(e),
                        })} type='text' placeholder='Search' />
                    </div>
                </form>

                <div className='d-flex'>
                    <MessageIcon icon='fa-solid fa-bell' />
                    <MessageIcon icon={'fa-solid fa-message'} />

                    <DropdownButton title={data?.firstName.charAt(0).toUpperCase() ?? ''} id='bg-nested-dropdown' bsPrefix='user-profile bg-dark text-light'>
                        <Dropdown.Item eventKey='1' onClick={handleUserProfile}>Profile</Dropdown.Item>
                        <Dropdown.Item eventKey='2' onClick={handleLogOutButton}>LogOut</Dropdown.Item>
                    </DropdownButton>
                </div>

            </div>
        </div>
    )
}

export default Navbar;
