import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import Register from './Components/Register';
import Login from './Components/Login';
import ForgetPassword from './Components/ForgetPassword';
import ResetPassword from './Components/ResetPassword';
import Error from './Components/Error';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    path:'/',
    element: <LandingPage />
  },
  {
    path:"/register",
    element: <Register />
  },
  {
    path:'/login',
    element: <Login />
  },
  {
    path:'/forgetpassword',
    element: <ForgetPassword />
  },
  {
    path:'/passwordreset/:token',
    element:<ResetPassword />
  },
  {
    path:"*",
    element: <Error />
  }
])
const App = () => {
  return (
    <div>
      <RouterProvider router={router}/>
      <ToastContainer />
    </div>
  );
};

export default App;