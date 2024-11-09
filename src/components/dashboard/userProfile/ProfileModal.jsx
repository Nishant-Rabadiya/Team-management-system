import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

import { formatDate } from '../CommonFunction';

const ProfileModal = ({ show, handleClose, user }) => {
    const queryClient = useQueryClient();
    const teamData = queryClient.getQueryData(['teamData']);

    const findData = teamData?.find(id => id?.id === user?.reportsTo);

    return (
        <Modal show={show} onHide={handleClose} keyboard={false}>
            <div className='profile-modal'>
                <Modal.Header className='d-flex justify-content-between p-3'>
                    <Modal.Title>Employee Details</Modal.Title>
                    <Button className='bg-dark' onClick={handleClose}><i className='fa-solid fa-xmark'></i></Button>
                </Modal.Header>
                <Modal.Body>
                    {user ? (
                        <div className='modal-section'>
                            <p className='modal-data-title'>Name: <span className='modal-data'>{user?.firstName} {user?.lastName}</span></p>
                            <p className='modal-data-title'>Email: <span className='modal-data'>{user?.email}</span></p>
                            <p className='modal-data-title'>Mo: <span className='modal-data'>{user?.mo ? user?.mo : ''}</span></p>
                            <p className='modal-data-title'>Role: <span className='modal-data'>{user?.role}</span></p>
                            <p className='modal-data-title'>Project: <span className='modal-data'>{user?.project ? user?.project : 'N/A'}</span></p>
                            <p className='modal-data-title'>Username: <span className='modal-data'>{user?.username}</span></p>
                            <p className='modal-data-title'>Join: <span className='modal-data'>{formatDate(user?.date)}</span></p>
                            <p className='modal-data-title'>Report: <span className='modal-data'>{findData ? findData?.firstName + ' ' + findData?.lastName : 'N/A'}</span></p>
                        </div>
                    ) : (
                        <p>No user selected</p>
                    )}
                </Modal.Body>
            </div>
        </Modal>
    );
};

export default ProfileModal;

