import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// export const queryClient = (endpoint) => {
//     useQueryClient.invalidateQueries(endpoint);
// };
// export const queryClient = useQueryClient();

export const axiosIntance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
});

