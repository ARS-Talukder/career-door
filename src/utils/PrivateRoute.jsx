import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../Pages/Shared/Loading";

const PrivateRoute = ({ children }) => {
    const { pathname } = useLocation();
    const state = useSelector(state => state);
    const { user: { email }, isLoading } = state.auth;

    if (isLoading) {
        return <Loading></Loading>;
    }

    if (!isLoading && !email) {
        return <Navigate to='/login' state={{ path: pathname }} />;
    }

    return children;
};

export default PrivateRoute;
