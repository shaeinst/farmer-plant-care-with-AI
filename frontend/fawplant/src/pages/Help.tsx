import React, { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { RootState } from "../utils/redux/store";
import QuestionForm from "./QuestionForm";
import Answers from "./Answers";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        "aria-controls": `vertical-tabpanel-${index}`,
    };
}

//
const Help = () => {
    const navigate = useNavigate();

    const [value, setValue] = useState(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const { authToken, isSignedIn } = useSelector(
        (state: RootState) => state.authentication
    );

    useEffect(() => {
        if (!isSignedIn) {
            // Redirect the user to login page if not signed in
            navigate("/login");
        }
    }, [isSignedIn]);

    return (
        <Box
            sx={{
                flexGrow: 1,
                // bgcolor: "background.paper",
                display: "flex",
                height: "100vh",
                marginTop: "40px",
            }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: "divider" }}
            >
                <Tab label="Ask" {...a11yProps(0)} />
                <Tab label="Records" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <QuestionForm />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Answers />
            </TabPanel>
        </Box>
    );
};
export default Help;
