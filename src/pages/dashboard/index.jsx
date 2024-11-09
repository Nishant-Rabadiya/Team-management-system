import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import Navbar from '../../components/dashboard/navbar/Navbar'
import FilterButton from '../../components/dashboard/filters/FilterButton';
import ProfileModal from '../../components/dashboard/userProfile/ProfileModal';
import { getTeamData, updateUser } from '../../api/api';
import { applyFilter, formatDate, getTeamMembers, searchFilter } from '../../components/dashboard/CommonFunction';
import { adminOption, employeeOption, tlOption } from '../../@core/constants';
import { UserRoles } from '../../@core/utils/enum';
import TeamActionButton from '../../components/dashboard/teamActionButton/TeamActionButton';
// import { queryClient } from '../../@core/utils/axiosInstance';

const Dashboard = () => {
    // add in same file as axios instance
    const queryClient = useQueryClient();

    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('');
    const userEmail = JSON.parse(localStorage?.getItem('loginData'))?.email;
    const [modalState, setModalState] = useState({
        show: false,
        user: null,
    });

    const handleClose = () => setModalState({ ...modalState, show: false });

    const { data: teamData, isLoading } = useQuery({
        queryKey: ['teamData'],
        queryFn: getTeamData,
        staleTime: Infinity
    });

    const mutation = useMutation({
        queryKey: ['teamData'],
        mutationFn: updateUser,
        onSuccess: () => {
            // queryClient('teamData');
            queryClient.invalidateQueries('teamData');
        }
    });

    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
    };

    const handleFilterChange = (role) => {
        setFilter(role);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    };

    const currentUser = teamData?.find(user => user?.email === userEmail);

    const getFilteredData = () => {
        if (!currentUser) return [];

        let filteredUsers = teamData?.filter(user => user?.id !== currentUser?.id) || [];

        if (currentUser?.role === UserRoles?.Admin) {
            filteredUsers = applyFilter(filteredUsers, filter);
        } else if (currentUser?.role === UserRoles?.TL) {
            filteredUsers = getTeamMembers(currentUser?.id, teamData) || [];

            const unassignedEmployees = teamData?.filter(user => user?.role === 'Employee' && !user?.reportsTo) || [];
            filteredUsers = [...filteredUsers, ...unassignedEmployees];

            if (filter === 'Team') {
                filteredUsers = filteredUsers?.filter(user => user?.reportsTo === currentUser?.id || getTeamMembers(currentUser?.id, teamData).some(member => member?.id === user?.id));
            }
            filteredUsers = applyFilter(filteredUsers, filter);
        } else {
            filteredUsers = applyFilter(teamData || []);
        }

        return searchFilter(filteredUsers, searchTerm);
    };

    const handlePromote = (userId, newRole) => {
        const userToPromote = teamData?.find(user => user?.id === userId);
        if (userToPromote) {
            if (newRole === 'Admin' || newRole === 'TL') {
                mutation.mutate({ ...userToPromote, role: newRole, isEditedBy: currentUser?.id, reportsTo: currentUser?.id });
            } else if (newRole === 'Employee') {
                const employeesToUpdate = teamData?.filter(user => user?.reportsTo === userToPromote?.id);
                employeesToUpdate?.map(employee => {
                    mutation.mutate({ ...employee, reportsTo: '' });
                });
                mutation.mutate({ ...userToPromote, role: newRole, isEditedBy: '', reportsTo: '' });
            } else {
                mutation.mutate({ ...userToPromote, role: newRole });
            }
        }
    };

    const handleTableRow = (user) => {
        setModalState({ show: true, user });
    }

    const filteredData = getFilteredData();

    const filterButton = (role) => {
        if (role === 'Admin') {
            return <FilterButton filterType={adminOption} onFilterChange={handleFilterChange} />
        } else if (role === 'TL') {
            return <FilterButton filterType={tlOption} onFilterChange={handleFilterChange} />
        } else {
            return <FilterButton filterType={employeeOption} onFilterChange={handleFilterChange} />
        }
    };

    return (
        <>
            <div className='main-container bg-dark'>
                <Navbar data={currentUser} onSearch={handleSearch} />

                <div className='text-light dashboard-body'>
                    <div className='d-flex justify-content-between dashboard-header p-3'>
                        <h3 className='m-0 d-flex align-items-center'>All Members</h3>

                        <div className='d-flex'>
                            {filterButton(currentUser?.role)}
                        </div>
                    </div>

                    <div className='px-3'>
                        <Table hover variant='dark' size='sm' responsive>
                            <thead className='table-heading'>
                                <tr>
                                    <th className='table-header'>Name</th>
                                    <th className='table-header'>Email</th>
                                    <th className='table-header'>Role</th>
                                    <th className='table-header'>Project Name</th>
                                    <th className='table-header'>Username</th>
                                    <th className='table-header'>Date</th>
                                    <th className='table-header'>Promote</th>
                                </tr>
                            </thead>
                            <tbody className='table-body'>
                                {
                                    filteredData?.length ?
                                        filteredData?.map((user) => (
                                            <tr key={user?.id} >
                                                <td className='table-data' onClick={() => handleTableRow(user)}><span className='table-name'>{user?.firstName + ' ' + user?.lastName}</span></td>
                                                <td className='table-data text-secondary'>{user?.email}</td>
                                                <td className='table-data'>{user?.role}</td>
                                                <td className='table-data'>{user?.project ? user?.project : 'N/A'}</td>
                                                <td className='table-data'>{user?.username}</td>
                                                <td className='table-data'>{formatDate(user?.date)}</td>
                                                {currentUser?.role === UserRoles.Admin && (
                                                    <td className='table-data table-button'>
                                                        <select value={user.role} onChange={(e) => handlePromote(user?.id, e.target.value)} className='role-select'>
                                                            <option value='TL'>Promote to TL</option>
                                                            <option value='Admin'>Promote to Admin</option>
                                                            <option value='Employee'>Back to Employee</option>
                                                        </select>
                                                    </td>
                                                )}

                                                {currentUser?.role === UserRoles.TL && (
                                                    <td className='table-data table-button'>
                                                        {user.reportsTo === currentUser?.id ?
                                                            <TeamActionButton
                                                                user={user}
                                                                currentUser={currentUser}
                                                                teamData={teamData}
                                                                mutation={mutation}
                                                            /> :
                                                            <TeamActionButton
                                                                user={user}
                                                                currentUser={currentUser}
                                                                teamData={teamData}
                                                                mutation={mutation}
                                                            />}
                                                        <select value={user?.role} onChange={(e) => handlePromote(user?.id, e.target.value)} className='role-select'>
                                                            <option value='TL'>Promote to TL</option>
                                                            <option value='Employee'>Back to Employee</option>
                                                        </select>
                                                    </td>
                                                )}

                                                {currentUser?.role === UserRoles.Employee && (
                                                    <td className='table-data '>{'N/A'}</td>
                                                )}
                                            </tr>
                                        )) :
                                        <tr>
                                            <td colSpan='7' className='text-center'>
                                                Data not found!
                                            </td>
                                        </tr>
                                }
                            </tbody>
                        </Table>
                    </div>

                </div>

            </div>

            <ProfileModal
                show={modalState.show}
                handleClose={handleClose}
                user={modalState.user}
            />
        </>
    )
};

export default Dashboard;
