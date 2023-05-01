import axios from "axios";
import URLS from "../urls";
import { useState } from "react";

interface ProfileInterface {
    email: string;
    first_name: string;
    last_name: string;
    mobile_number: string | null;
    profile_picture: string | null;
}

const useGetProfile = () => {
    //
    const [isSuccess, setIsSuccess] = useState(false);

    const profileDetails = async (
        accessToken: string | null
    ): Promise<ProfileInterface> => {
        let profileData: ProfileInterface = {
            email: "",
            first_name: "",
            last_name: "",
            mobile_number: null,
            profile_picture: null,
        };

        console.log("=============== token ======================");
        console.log(accessToken);
        console.log("=============== end token ======================");
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        await axios
            .get(URLS.PROFILE, config)
            .then((response) => {
                const data: ProfileInterface = response.data;
                profileData = data;
                setIsSuccess(true);
            })
            .catch((error) => {
                console.error("Error fetching profile data", error);
                const errorMsg =
                    error.response?.data?.detail ||
                    "An error occurred while fetching profile data.";
                console.error(errorMsg);
            });

        return profileData;
    };

    return {
        profileDetails,
        isSuccess: isSuccess,
    };
};

export default useGetProfile;
