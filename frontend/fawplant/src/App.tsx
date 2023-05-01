import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/404";
import Profile from "./pages/Profile";
import Detector from "./pages/Detector";
import Help from "./pages/Help";

const App = () => {
    return (
        <div id="APP">
            {/* this is home page */}
            <Navbar />

            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="lg">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/detector" element={<Detector />} />
                        <Route path="/help" element={<Help />} />

                        {/* if no url matchs (404 not found) */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Container>
            </React.Fragment>
        </div>
    );
};

export default App;
