import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import * as yup from 'yup';

export const formatDate = (milliseconds) => new Date(milliseconds).toLocaleDateString('en-GB');

export const firstNameValidation = yup.string().required('First Name is required');

export const lastNameValidation = yup.string().required('Last Name is required');

export const userNameValidation = yup.string().required('Username Name is required');

export const emailValidation = yup
    .string()
    .email('Invalid email format')
    .required('Email is required')
    .matches(/^[a-z0-9]+@[a-z0-9]+\.[a-zA-Z]{2,4}$/, 'Invalid email format');

export const passwordValidation = yup
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Password is required')
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':'\\|,.<>\/?]).*$/,
        'Password must be strong.'
    );

export const mobileValidation = yup
    .string()
    .matches(/^[0-9]{10}$/, 'Mo must be exactly 10 digits')
    .required('Mo is required');

export const projectValidation = yup.string().required('Project Name is required');



export const handleTeamChange = (userId, action, data, email, mutation) => {
    const userToModify = data?.find(user => user?.id === userId);
    const currentUser = data?.find(user => user?.email === email);
    if (userToModify && currentUser) {
        const message = action === 'add'
            ? `${userToModify?.firstName + ' ' + userToModify?.lastName} added to your team`
            : `${userToModify?.firstName + ' ' + userToModify?.lastName} removed from your team`;

        const reportsTo = action === 'add' ? currentUser?.id : '';
        action === 'add' ? toast.success(message) : toast.error(message)

        mutation.mutate({ ...userToModify, reportsTo });
    }
};


export const getAllTeamData = (queryKey, queryFn) => {
    const { data: team, isLoading, error } = useQuery({
        queryKey: [queryKey],
        queryFn: queryFn,
        options: {
            staleTime: Infinity,
        },
    });

    return { team, isLoading, error };
};

export const mutationData = (queryKey, queryFn) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        queryKey: [queryKey],
        mutationFn: queryFn,
        onSuccess: () => {
            queryClient.invalidateQueries(queryKey);
        }
    });

    return mutation;
};



export const getTeamMembers = (tlId, teamData) => {
    let directReports = teamData?.filter(user => user?.reportsTo === tlId) || [];

    directReports.forEach(user => {
        if (user?.role === 'TL') {
            const subTeam = getTeamMembers(user?.id, teamData);
            directReports = [...directReports, ...subTeam];
        }
    });

    return directReports;
};

export const applyFilter = (users, filter) => {
    switch (filter) {
        case 'TL':
        case 'Employee':
        case 'Admin':
            return users?.filter(user => user?.role === filter);
        case 'Start Date':
            return users?.filter(user => user?.date)?.sort((a, b) => new Date(a?.date) - new Date(b?.date));
        case 'A-Z':
            return [...users]?.sort((a, b) => a?.firstName.localeCompare(b?.firstName));
        case 'Z-A':
            return [...users]?.sort((a, b) => b?.firstName.localeCompare(a?.firstName));
        case 'Project A':
        case 'Project B':
        case 'Project C':
            return users?.filter(user => user?.project === filter);
        default:
            return users;
    }
};

export const searchFilter = (filteredUsers, searchTerm) => {
    if (!searchTerm) return filteredUsers;

    return filteredUsers?.filter(user =>
        user?.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user?.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );
};




















// Search functionality
// if (searchTerm) {
//     filteredUsers = filteredUsers?.filter(user =>
//         user?.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         user?.lastName.toLowerCase().includes(searchTerm.toLowerCase())
//     );
// }