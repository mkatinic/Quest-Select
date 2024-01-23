import './index.scss';
import { Link, NavLink } from 'react-router-dom';
import navLogo from '../../Assets/Images/nav-logo.jpeg';

const Navbar = () => {
    return (
    <div className='nav-bar'>
        <Link className='logo' to='/'>
            <img src={navLogo} alt="logo"/>
        </Link>
        <nav>
            <NavLink exact="true" activeclassname="active" className="user-link" to="/search">
                Search
            </NavLink>
            <NavLink exact="true" activeclassname="active" className="user-link" to="/search">
                Library
            </NavLink>
            <NavLink exact="true" activeclassname="active" className="user-link" to="/login">
                Login
            </NavLink>
         </nav>
    </div>
    )
}

export default Navbar