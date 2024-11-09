import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const user = JSON.parse(localStorage?.getItem('loginData'));
    const isAuthenticated = user?.email ? true : false ;
    return isAuthenticated ? children : <Navigate to='/login' />;
};

export default PrivateRoute;
