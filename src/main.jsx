import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ContextProvider } from '../context/SidebarContext.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import VideoPage from "../pages/VideoPage.jsx";
import Home from '../components/Home/Home.jsx';
import SignUp from '../pages/SignUp.jsx';
import SignIn from '../pages/Signin.jsx';

const route = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: '/',
        element: <Home/>,
      },
      {
        path:'/video/:id',
        element:<VideoPage/>  
      },
    ]
  },
  {
    path:'/signup',
    element: <SignUp/>,
  },
  {
    path:'/signin',
    element: <SignIn/>,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
      <RouterProvider router={route}>
        <App />
      </RouterProvider>
    </ContextProvider>
  </StrictMode>,
)
