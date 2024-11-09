import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
    const user = JSON.parse(localStorage?.getItem('loginData'));
    const isAuthenticated = user?.email ? false : true;
    return isAuthenticated ? children : <Navigate to={`/dashboard`} />;
};

export default PublicRoute;