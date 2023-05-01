import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import useLogin from "../utils/handle/useHandleLogin";
import { Button, FormHelperText, TextField } from "@mui/material";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login, isSuccess, loading, errorMsg } = useLogin();
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        // handle submit
        event.preventDefault();

        await login(email, password);
    };

    useEffect(() => {
        // console.log("========== FROM EEFFECT ==========================");
        // console.log(isSuccess, loading);
        // console.log("=========== end FROM EEFFECT =====================");
        if (isSuccess) {
            // Redirect the user to Homepage for authenticated users
            navigate("/");
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
                    <TextField
                        type="email"
                        label="Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        margin="normal"
                        required
                        fullWidth
                    />
                    <TextField
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        margin="normal"
                        required
                        fullWidth
                    />

                    <div style={{ margin: "10px 0", color: "#ff6666" }}>
                        {errorMsg}
                    </div>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={loading ? true : false}
                    >
                        Login
                    </Button>
                </form>
                <div style={{ marginTop: "18px" }}>
                    Don't have an account?
                    <Link to="/register" style={{ textDecoration: "none" }}>
                        <Button color="primary">Create new accout</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

/*
*
    this is ant desgin. we are not using it (for now)
*
*/
// import { TextField, Button } from "@mui/material";
// import { FormHelperText } from "@mui/material";
// import { Button, Form, Input } from "antd";

// const Login = () => {
//     const { login, isSuccess, loading } = useLogin();
//     const navigate = useNavigate();

//     const onFinish = async (values: any) => {
//         // when enterd password and email is vaild on frontend
//         const email = values.email;
//         const password = values.password;

//         await login(email, password);
//     };

//     const onFinishFailed = (errorInfo: any) => {
//         console.log("Failed:", errorInfo);
//     };

//     useEffect(() => {
//         if (isSuccess) {
//             // Redirect the user to Homepage for authenticated users
//             navigate("/");
//         }
//     }, [isSuccess, loading]);

//     return (
//         <div
//             style={{
//                 alignItems: "center",
//                 justifyContent: "center",
//                 display: "flex",
//                 marginTop: "40px",
//             }}
//         >
//             <div style={{ maxWidth: "40%" }}>
//                 <Form
//                     name="basic"
//                     labelCol={{ span: 8 }}
//                     wrapperCol={{ span: 16 }}
//                     style={{ maxWidth: 600 }}
//                     initialValues={{ remember: true }}
//                     onFinish={onFinish}
//                     onFinishFailed={onFinishFailed}
//                     autoComplete="off"
//                 >
//                     <Form.Item
//                         label="Email"
//                         name="email"
//                         rules={[
//                             {
//                                 type: "email",
//                                 message: "Please input vaild email!",
//                             },
//                         ]}
//                     >
//                         <Input />
//                     </Form.Item>

//                     <Form.Item
//                         label="Password"
//                         name="password"
//                         rules={[
//                             {
//                                 required: true,
//                                 message: "Please input your password!",
//                             },
//                         ]}
//                     >
//                         <Input.Password />
//                     </Form.Item>

//                     <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
//                         <Button type="primary" htmlType="submit">
//                             Submit
//                         </Button>
//                     </Form.Item>
//                 </Form>
//             </div>
//         </div>
//     );
// };

export default Login;
