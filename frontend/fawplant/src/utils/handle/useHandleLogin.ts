import { useEffect, useState } from "react";
import URLS from "../urls";
import { useDispatch } from "react-redux";
import { setAuthState } from "../redux/authSlice";
import axios from "axios";
import Cookies from "js-cookie";
import useGetProfile from "../apis/useGetProfile";
import { setProfileState } from "../redux/profileSlice";

interface TokenInterface {
    accessToken: string | null;
    refreshToken: string | null;
}

const useLogin = () => {
    const [token, setToken] = useState<TokenInterface>({
        accessToken: null,
        refreshToken: null,
    });
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const dispatch = useDispatch();
    const { profileDetails } = useGetProfile();

    // const login = async ({ email, password }: LoginParams) => {

    const login = async (email: string | null, password: string | null) => {
        setLoading(true);

        // const csrftoken = Cookies.get("csrftoken");

        await axios
            .post(
                URLS.AUTH_TOKEN,
                { email, password },
                {
                    headers: {
                        "Content-Type": "application/json",
                        // "X-CSRFToken": csrftoken,
                    },
                }
            )
            .then((response) => {
                const _accessToken: string = response.data.access;
                const _refreshToken: string = response.data.refresh;

                setToken({
                    accessToken: _accessToken,
                    refreshToken: _refreshToken,
                });
                setIsSuccess(true);

                // set token to global state
                dispatch(
                    setAuthState({
                        authToken: _accessToken,
                        refreshAuthToken: _refreshToken,
                        isSignedIn: true,
                    })
                );

                // save tokens to browser's local-storage
                localStorage.setItem(
                    "token",
                    JSON.stringify({
                        accessToken: _accessToken,
                        refreshToken: _refreshToken,
                    })
                );

                console.log("\n\n========================================");
                console.log("Token: ", _accessToken);
                console.log("Refresh Token: ", _refreshToken);
                console.log("========================================\n\n");
            })
            .catch((error) => {
                console.error("Error logging in", error);
                const errorMsg =
                    error.response.data.detail ||
                    "An error occurred while logging in.";
                setErrorMsg(errorMsg);
            });

        setLoading(false);
    };

    useEffect(() => {
        const fetchProfileData = async () => {
            const profileData = await profileDetails(token.accessToken);
            const data = {
                name: `${profileData.first_name} ${profileData.last_name}`,
                mobile: profileData.mobile_number,
                email: profileData.email,
                profileUrl: profileData.profile_picture,
            };

            // set token to global state
            dispatch(setProfileState(data));
            // save profile to browser's local-storage
            localStorage.setItem("profile", JSON.stringify(data));
        };

        if (isSuccess) {
            fetchProfileData();
        }
    }, [isSuccess]);

    return {
        login,
        token,
        isSuccess,
        loading,
        errorMsg,
    };
};

export default useLogin;
