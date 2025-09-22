import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ContextProvider } from '../context/SidebarContext.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import VideoPage from "../components/VideoPage.jsx";

const route = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [{
      path: "/video/:id",
      element: <VideoPage/>,
  },]
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
