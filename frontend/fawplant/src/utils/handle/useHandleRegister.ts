import { useState } from "react";
import URLS from "../urls";
import axios from "axios";

interface PropsInterface {
    firstname: string | null;
    lastname: string | null;
    email: string | null;
    password: string | null;
    mobileNumber: string | null;
}

const useUserRegister = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const register = async ({
        firstname: firstName,
        lastname: lastName,
        email,
        password,
        mobileNumber,
    }: PropsInterface) => {
        setLoading(true);

        await axios
            .post(
                URLS.CREATE_USER,
                {
                    email: email,
                    password: password,
                    first_name: firstName,
                    last_name: lastName,
                    mobile_number: mobileNumber,
                    user_type: "farmer",
                }
                // { headers: { "Content-Type": "application/json" } }
            )
            .then((response) => {
                // on sucessfully creation of user
                setIsSuccess(true);
            })
            .catch((error) => {
                console.log("====== Error from useHandleRegister ======");
                // console.error("Error logging in", error);
                console.log("====== END Error from useHandleRegister ======");
                const error_msg = "An error occurred while creating account.";
                console.log(error_msg);
                setErrorMsg(error_msg);
            });

        setLoading(false);
    };

    return {
        register,
        isSuccess,
        loading,
        errorMsg,
    };
};

export default useUserRegister;
