import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import defaultUserImage from "../assets/default_user.png";
import axios from "axios";
import URLS from "../utils/urls";
import { RootState } from "../utils/redux/store";
import { useSelector } from "react-redux";

interface AnswerInterface {
    id: string | number;
    title: string;
    description: string;
}
interface CommentInterface {
    id?: string | number;
    user: string;
    solution: string;
    profileUrl: string;
}

interface AnswerDisplayInterace {
    comments: CommentInterface[];
    answer: AnswerInterface;
    expanded: string | false;
    handleChange: (
        panel: string
    ) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
}

const CommentDisplay = ({
    user,
    solution,
    profileUrl,
}: CommentInterface): JSX.Element => {
    return (
        <div
            style={{
                display: "flex",
                gap: "20px",
                alignItems: "flex-start",
                maxWidth: "60vw",
                marginBottom: "40px",
            }}
        >
            <div
                style={{
                    flexShrink: 0 /* Prevents the image container from shrinking */,
                    height: "60px",
                    width: "60px",
                    objectFit: "cover",
                    borderRadius: "50%",
                }}
            >
                <img
                    src={profileUrl ? profileUrl : defaultUserImage}
                    style={{ height: "100%", width: "100%" }}
                />
            </div>
            <div>
                <h4>{user} </h4>
                <div>{solution}</div>
            </div>
        </div>
    );
};

const AnswerDisplay = ({
    answer,
    comments,
    expanded,
    handleChange,
}: AnswerDisplayInterace): JSX.Element => {
    const pannel = answer.id.toString();
    return (
        <Accordion
            expanded={expanded === pannel}
            onChange={handleChange(pannel)}
            style={{ minWidth: "60vw", marginBottom: "20px" }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3bh-content"
                id="panel3bh-header"
            >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                    {answer.title}
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                    {answer.description}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography style={{ maxHeight: "60vh", overflowY: "scroll" }}>
                    {comments.map((comment) => {
                        return (
                            <CommentDisplay
                                user={comment.user}
                                solution={comment.solution}
                                profileUrl={comment.profileUrl}
                            />
                        );
                    })}
                </Typography>
            </AccordionDetails>
        </Accordion>
    );
};

export default function Answer() {
    const [expanded, setExpanded] = useState<string | false>(false);
    const [answers, setAnswers] = useState<AnswerInterface[]>([]);
    const [comments, setComments] = useState<CommentInterface[]>([]);
    const [commentId, setCommentId] = useState<string | number>("");

    const handleChange =
        (panel: string) =>
        (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
            setCommentId(panel);
        };

    const { authToken } = useSelector(
        (state: RootState) => state.authentication
    );

    const fetchAnswers = async () => {
        await axios
            .get(URLS.FARMER_POSTS, {
                headers: { Authorization: `Bearer ${authToken}` },
            })
            .then((response) => {
                const data = response.data;
                setAnswers(data);
            })
            .catch((error) => {
                const errorMsg =
                    error.response.data.detail ||
                    "An error occurred while getting answers .";
                console.error(errorMsg);
            });
    };

    const fetchComments = async (id: string | number) => {
        await axios
            .get(`${URLS.FARMER_POST_COMMENT}${id}/`, {
                headers: { Authorization: `Bearer ${authToken}` },
            })
            .then((response) => {
                const data = response.data;
                setComments(data);
            })
            .catch((error) => {
                const errorMsg =
                    error.response.data.detail ||
                    "An error occurred while getting comments .";
                console.error(errorMsg);
            });
    };

    useEffect(() => {
        fetchAnswers();
    }, []);

    useEffect(() => {
        if (expanded) {
            fetchComments(commentId);
            console.log("======================");
            console.log("REQUESTED");
            console.log("======================");
        }
    }, [expanded]);

    return (
        <div>
            {answers.map((ans) => {
                return (
                    <AnswerDisplay
                        answer={ans}
                        comments={comments}
                        expanded={expanded}
                        handleChange={handleChange}
                    />
                );
            })}
        </div>
    );
}
