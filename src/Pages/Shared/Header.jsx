import { Link } from "react-router-dom";
import '../style/style.css';
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { logout } from "../../features/auth/authSlice";

const Header = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const { email, role } = state.auth.user;
    const handleLogOut = () => {
        signOut(auth)
            .then(() => {
                dispatch(logout())
            })
    }
    return (
        <div className="navbar navbar_container py-0 px-8">
            <div className="navbar-start">
                <Link to="/">
                    <img src="https://i.ibb.co/74Rr68v/logo.png" width={200} alt="logo" />
                </Link>

            </div>
            <div className="navbar-center">


            </div>
            <div className="navbar-end">
                {/* ------Dashboard button------ */}
                {
                    email && role && <Link to="/dashboard" className="btn btn-info">Dashboard</Link>
                }

                {/* ------Login Logout button------ */}
                {
                    email ?
                        <button className="btn btn-accent text-white mx-2" onClick={handleLogOut}>Log Out</button>
                        :
                        <Link to="/login" className='btn btn-success mx-2 text-white'>Login</Link>
                }

                {/* ------Get Started button------ */}
                {
                    email && !role && <Link to="/register" className="btn btn-error rounded-full hover:bg-rose-500">Get Started</Link>
                }

            </div>
        </div>
    );
};

export default Header;