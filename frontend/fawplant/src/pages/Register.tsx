import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { TextField, Button } from "@mui/material";
import useUserRegister from "../utils/handle/useHandleRegister";

interface RegisterFormData {
    firstname: string | null;
    lastname: string | null;
    email: string | null;
    password: string | null;
    confirmPassword: string | null;
    mobileNumber: string | null;
}

const Register = () => {
    const [formData, setFormData] = useState<RegisterFormData>({
        firstname: null,
        lastname: null,
        email: null,
        password: null,
        confirmPassword: null,
        mobileNumber: null,
    });
    const [feedbackMsg, setFeedbackMsg] = useState("");
    const navigate = useNavigate();
    const { register, isSuccess, loading, errorMsg } = useUserRegister();

    const handleChange = (
        event: React.ChangeEvent<{ name?: string; value: unknown }>
    ) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name as string]: value as string,
        }));
    };

    const isValid = (): boolean => {
        if (
            formData.password !== formData.confirmPassword ||
            !formData.email ||
            !formData.mobileNumber
        ) {
            return false;
        }

        return true;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFeedbackMsg("");

        if (isValid()) {
            // handle account creation
            await register(formData);

            if (isSuccess) {
                setFeedbackMsg(errorMsg);
            }

            console.log("================================");
            console.log(errorMsg, isSuccess);
            console.log("================================");
        } else {
            setFeedbackMsg("please fill all the fields correctly");
        }
        console.log("================================");
        console.log(formData);
        console.log("================================");
    };

    useEffect(() => {
        if (isSuccess) {
            // Redirect the user to SignIn page after sucessfully creating user
            navigate("/login");
        }
    }, [isSuccess, loading]);

    return (
        <div
            style={{
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                marginTop: "40px",
            }}
        >
            <div style={{ maxWidth: "40%" }}>
                <form onSubmit={handleSubmit}>
                    <Stack
                        spacing={{ xs: 1, sm: 2 }}
                        direction="row"
                        useFlexGap
                        flexWrap="wrap"
                        justifyContent="center"
                    >
                        <div style={{ display: "flex", flex: 1, gap: "5px" }}>
                            <TextField
                                label="First Name"
                                variant="outlined"
                                name="firstname"
                                type="text"
                                value={formData.firstname}
                                onChange={handleChange}
                                required
                                fullWidth
                            />
                            <TextField
                                label="Last Name"
                                variant="outlined"
                                name="lastname"
                                type="text"
                                value={formData.lastname}
                                onChange={handleChange}
                                required
                                fullWidth
                            />
                        </div>
                        <TextField
                            label="Email"
                            variant="outlined"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
                        <div style={{ display: "flex", flex: 1, gap: "5px" }}>
                            <TextField
                                label="Password"
                                variant="outlined"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                fullWidth
                            />
                            <TextField
                                label="Confirm Password"
                                variant="outlined"
                                name="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                fullWidth
                            />
                        </div>
                        <TextField
                            label="Mobile Number"
                            variant="outlined"
                            name="mobileNumber"
                            type="tel"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
                        <div>
                            <div style={{ color: "#ff6666" }}>
                                {feedbackMsg}
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    marginTop: "20px",
                                }}
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                >
                                    Register
                                </Button>

                                <div>
                                    Alreadyhave an account?
                                    <Link
                                        to="/login"
                                        style={{ textDecoration: "none" }}
                                    >
                                        <Button color="primary">Login</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Stack>
                </form>
            </div>
        </div>
    );
};

export default Register;
