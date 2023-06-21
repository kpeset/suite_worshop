import "./Nav.css";
import { Link } from "react-router-dom";

const Navbar = () => {

    const auth = false;

    return (
        <header className='navbar'>
            <div className='navbar__title navbar__item'><Link to="/">My panel</Link></div>
            {auth && 
                <>
                    <div className='navbar__item'><Link to="/albums">Albums</Link></div>
                    <div className='navbar__item'><Link to="/tracks">Tracks</Link></div>
                    <div className='navbar__item'><Link to="/users">Users</Link></div>
                </>
            }
            {!auth && <div className='navbar__item'><Link to="/login">Login</Link></div>}
        </header>
    )
};

export default Navbar;