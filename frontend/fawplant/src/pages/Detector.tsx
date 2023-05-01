// import { useState } from "react";
// import { InboxOutlined, SmileOutlined } from "@ant-design/icons";
// import { Coronavirus } from "@mui/icons-material";
// import type { UploadProps } from "antd";
// import { Button, Result, message, Upload } from "antd";
// import Cookies from "js-cookie";

// import URLS from "../utils/urls";
// import axios from "axios";

// const { Dragger } = Upload;

// // export const detectDisease = async (formData: FormData) => {
// //     const config = {
// //         withCredentials: true,
// //     };

// //     await axios
// //         .get(URLS.DETECTOR, config)
// //         .then((response) => {
// //             //
// //         })
// //         .catch((error) => {
// //             const errorMsg = error.response?.data?.detail || "error occured";
// //             console.error(errorMsg);
// //         });
// // };

// const _token = localStorage.getItem("token");
// const csrfToken = Cookies.get("csrftoken") || "";
// let token = "";
// if (_token) {
//     const { accessToken } = JSON.parse(_token);
//     token = accessToken;
// }

// const dragerProps = (
//     setImageUploaded: React.Dispatch<React.SetStateAction<boolean>>
// ): UploadProps => {
//     return {
//         name: "file",
//         multiple: false,
//         action: URLS.DETECTOR,
//         withCredentials: true,
//         headers: {
//             Authorization: `Token ${token}`, // Include token authentication header
//             "X-CSRFToken": csrfToken, // Include CSRF token header if applicable
//         },
//         // withCredentials: true,
//         onChange(info) {
//             const { status } = info.file;
//             if (status !== "uploading") {
//                 console.log(info.file, info.fileList);
//             }
//             if (status === "done") {
//                 setImageUploaded(true);
//                 message.success(
//                     `${info.file.name} file uploaded successfully.`
//                 );
//             } else if (status === "error") {
//                 message.error(`${info.file.name} file upload failed.`);
//                 setImageUploaded(false);
//             }
//         },
//         onDrop(e) {
//             console.log("Dropped files", e.dataTransfer.files);
//         },
//     };
// };

// const Detector = () => {
//     const [diseaseResult, setDiseaseResult] = useState(
//         " your plant is infected"
//     );
//     const [showResult, setShowResult] = useState(false);
//     const [imageUploaded, setImageUploaded] = useState(false);

//     const _draggerProps = dragerProps(setImageUploaded);

//     return (
//         <div
//             style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 justifyContent: "center",
//             }}
//         >
//             <Dragger
//                 {..._draggerProps}
//                 style={{ width: "60vw", padding: "10px" }}
//             >
//                 <p className="ant-upload-drag-icon">
//                     <InboxOutlined />
//                 </p>
//                 <p className="ant-upload-text">
//                     Click or drag image to this area to upload
//                 </p>
//                 <p className="ant-upload-hint">
//                     upload the image of your plants which you want to detect the
//                     diseases
//                 </p>
//             </Dragger>
//             {showResult && (
//                 <Result
//                     icon={<Coronavirus style={{ fontSize: "80px" }} />}
//                     title={diseaseResult}
//                     extra={<Button type="primary">Check New</Button>}
//                 />
//             )}
//         </div>
//     );
// };

import React, { useEffect, useState } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import URLS from "../utils/urls";
import { RootState } from "../utils/redux/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "antd";

interface AnalysisResult {
    result: string;
}

const DiseaseDetector: React.FC = () => {
    const [analysisResult, setAnalysisResult] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    const { authToken, isSignedIn } = useSelector(
        (state: RootState) => state.authentication
    );
    const navigate = useNavigate();

    const handleFileUpload = async (file: File) => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append("image", file);

            const response = await axios.post<AnalysisResult>(
                URLS.DETECTOR,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );

            setAnalysisResult(response.data.result);
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (!isSignedIn) {
            // Redirect the user to login page if not signed in
            navigate("/login");
        }
    }, [isSignedIn]);
    return (
        <div style={{ maxWidth: "600px", margin: "auto", textAlign: "center" }}>
            <h2>AI Disease Detector</h2>
            <Dropzone onDrop={([file]) => handleFileUpload(file)}>
                {({ getRootProps, getInputProps }) => (
                    <div
                        {...getRootProps()}
                        style={{
                            border: "2px dashed #ccc",
                            borderRadius: "4px",
                            padding: "50px",
                            cursor: "pointer",
                        }}
                    >
                        <input {...getInputProps()} />
                        <p>
                            Drag and drop an image file here or click to select
                            a file
                        </p>
                    </div>
                )}
            </Dropzone>
            {isLoading ? <Skeleton active /> : null}
            {analysisResult && (
                <div
                    style={{
                        marginTop: "20px",
                        border: "1px solid #ccc",
                        padding: "20px",
                        textAlign: "left",
                    }}
                >
                    <h3>Analysis Result:</h3>
                    <p>{analysisResult}</p>
                </div>
            )}
        </div>
    );
};

export default DiseaseDetector;
