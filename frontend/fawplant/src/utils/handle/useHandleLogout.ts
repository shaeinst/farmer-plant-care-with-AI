import { useDispatch } from "react-redux";
import { setAuthState } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { setProfileState } from "../redux/profileSlice";
import axios from "axios";

const useLogout = () => {
    //
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = async () => {
        // set token to null grobally
        dispatch(
            setAuthState({
                authToken: null,
                refreshAuthToken: null,
                isSignedIn: false,
            })
        );
        dispatch(
            setProfileState({
                name: null,
                mobile: null,
                email: null,
                profileUrl: null,
            })
        );

        // Clear the local storage
        localStorage.clear();
        // Clear the session storage
        sessionStorage.clear();
        // navigate to login page after clicking  logout
        navigate("/login");
        // Reload the page to clear the client-side session
        window.location.reload();
    };

    return {
        logout,
    };
};

export default useLogout;
