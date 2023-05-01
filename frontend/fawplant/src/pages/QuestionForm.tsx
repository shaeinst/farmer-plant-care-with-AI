import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import { TextField, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import URLS from "../utils/urls";
import { RootState } from "../utils/redux/store";
import { useSelector } from "react-redux";

interface QuestionFormData {
    title: string;
    description: string;
}

const QuestionForm = () => {
    const [formData, setFormData] = useState<QuestionFormData>({
        title: "",
        description: "",
    });
    const [feedbackMsg, setFeedbackMsg] = useState("");
    const [isPosting, setIsPosting] = useState(false);

    const handleChange = (
        event: React.ChangeEvent<{ name?: string; value: unknown }>
    ) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name as string]: value as string,
        }));
    };

    const { authToken } = useSelector(
        (state: RootState) => state.authentication
    );

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFeedbackMsg("");
        setIsPosting(true);

        await axios
            .post(URLS.CREATE_POST, formData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
            })
            .then((response) => {
                console.log(response.data);
                setFeedbackMsg("your question posted");
            })
            .catch((error) => {
                console.error(error);
                const errorMsg =
                    error.response.data.detail ||
                    "An error occurred while posting .";
                setFeedbackMsg(errorMsg);
            });
        setIsPosting(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack
                spacing={{ xs: 1, sm: 2 }}
                direction="row"
                useFlexGap
                flexWrap="wrap"
                justifyContent="center"
            >
                <TextField
                    label="What's your Problem?"
                    variant="outlined"
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    fullWidth
                />
                <TextField
                    label="Explain your problem in details"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    multiline
                    required
                    fullWidth
                    rows={6}
                />
                <div>
                    <div style={{ color: "#ff6666" }}>{feedbackMsg}</div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            marginTop: "20px",
                        }}
                    >
                        <LoadingButton
                            loading={isPosting}
                            variant="outlined"
                            type="submit"
                        >
                            Submit Problem
                        </LoadingButton>
                    </div>
                </div>
            </Stack>
        </form>
    );
};

export default QuestionForm;
