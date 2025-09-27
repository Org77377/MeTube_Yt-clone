import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ContextProvider } from '../context/SidebarContext.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import VideoPage from "../pages/VideoPage.jsx";
import Home from '../components/Home/Home.jsx';
import SignUp from '../pages/SignUp.jsx';
import SignIn from '../pages/Signin.jsx';
import { Channel } from '../pages/channel.jsx';
import { ToastContainer } from 'react-toastify';
import VideoUpload from '../pages/VideoUpload.jsx';

const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/video/:id',
        element: <VideoPage />
      },
      {
        path: "/channel/:id",
        element: <Channel />,
      },
      {
        path: "/upload",
        element: <VideoUpload/>, 
      },
    ]
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/login',
    element: <SignIn />,
  },
])

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <ContextProvider>
      <RouterProvider router={route}>
        <App />
      </RouterProvider>
      <ToastContainer theme="dark" autoClose="2000" position='top-center' hideProgressBar='true' />
    </ContextProvider>
  /* </StrictMode>, */
)
