import { Navigate, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Registration from './pages/form/registration';
import Login from './pages/form/login';
import Dashboard from './pages/dashboard';
import UserProfile from './components/dashboard/userProfile/UserProfile';
import PublicRoute from './components/publicRoute/PublicRoute';
import PrivateRoute from './components/privateRoute/PrivateRoute';

import './App.css';
import './style/form/registration.css';
import './style/form/formCommonComponent.css';
import './style/form/formResponsive.css';
import './style/dashboard/dashboard.css';
import './style/dashboard/dashboardResponsive.css';


const App = () => {
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<PublicRoute><Registration /></PublicRoute>}/>
        <Route path='/login' element={<PublicRoute><Login /></PublicRoute>}/>
        <Route path='/dashboard' element={<PrivateRoute> <Dashboard /> </PrivateRoute>}/>
        <Route path='/userprofile' element={ <PrivateRoute><UserProfile /></PrivateRoute>}/>
        <Route path='*' element={<Navigate to='/login' />} />
      </Routes>
    </div>
  )
}

export default App;
