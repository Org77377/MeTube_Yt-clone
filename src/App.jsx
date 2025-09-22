import Navbar from '../components/Navbar/Navbar';
import 'bootstrap-icons/font/bootstrap-icons.css';
// import Home from '../components/Home/Home';
import { Outlet } from 'react-router-dom';

function App() {

  return (
    <>
      <Navbar/>
      <Outlet/>
      {/* <Home/> */}
    </>
  )
}

export default App
