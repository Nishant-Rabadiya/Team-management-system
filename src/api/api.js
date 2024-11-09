import {axiosIntance} from '../@core/utils/axiosInstance';

export const getTeamData = async () => {
    const response = await axiosIntance.get(
        `/teamData`,
    );
    return response.data;
};

export const sendRegistrationData = async (data) => {
    const response = await axiosIntance.post(
        `/teamData`, data
    );
    return response.data;
};

export const updateUser = async (updatedUser) => {
    const response = await axiosIntance.put(`/teamData/${updatedUser.id}`, updatedUser);
    return response.data;
};

//coudiam