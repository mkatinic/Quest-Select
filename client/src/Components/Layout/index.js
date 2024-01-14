import './index.scss';
import Navbar from '../Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <>
        <div className="App">
            <Navbar />
        </div>
        <div className="Page">
            <Outlet />
        </div>
        </>
    )
}

export default Layout