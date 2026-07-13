import { FC } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './app/pages/Home';
import Signup from './app/auth/Signup';
import Signin from './app/auth/Signin';
import PrivateRoute from './utils/PrivateRoute';
import Dashboard from './app/pages/dashboard/Dashboard';
import { RootState, useAppSelector } from './redux/store';

const App: FC = () => {
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.signin.isAuthenticated
  );

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth/signup' element={<Signup />} />
          <Route path='/auth/signin' element={<Signin />} />

          <Route
            path='/dashboard/*'
            element={
              <PrivateRoute
                element={Dashboard}
                isAuthenticated={isAuthenticated}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
