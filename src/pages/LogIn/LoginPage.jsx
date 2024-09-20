import React, { useState } from "react";
import SignInBox from "../../components/loginComponents/SignInBox";
import Logo from "../../components/navbar/logo/Logo";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [mode, setMode] = useState("sign-in")
    const [studentId, setStudentId] = useState("");
    const [password, setPassword] = useState("");
    
    const navigate = useNavigate();

    function handleLinkClick(e){
        e.preventDefault()
        setMode((prevMode) => (prevMode === "sign-in" ? "sign-up" : "sign-in"));
    }

    function handleLogin(e) {
        e.preventDefault();
        console.log(process.env.REACT_APP_SERVER_DOMAIN_NAME);
        if (mode === "sign-in") {
            axios.post(`${process.env.REACT_APP_SERVER_DOMAIN_NAME}/sign-in`,
                {
                    student_id: studentId,
                    password: password
                }
            ).then((res) => {
                if (res.data.successful) {
                    localStorage.setItem("token", res.data.token);
                    navigate("/home");
                }
            }).catch((err) => {
                console.log(err);
            });
        } else if (mode === "sign-up") {
            axios.post(`${process.env.REACT_APP_SERVER_DOMAIN_NAME}/sign-up`,
                {
                    student_id: studentId,
                    password: password
                }
            ).then((res) => {
                if (res.data.successful) {
                    localStorage.setItem("token", res.data.token);
                    navigate("/home");
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    function handleStudentIdChange(e) {
        setStudentId(e.target.value);
    }
    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    return (
        <div className="flex h-screen w-screen overflow-hidden">
            {/* logo and main page */}
            <div className="bg-neutral-900 flex items-center justify-center h-full w-1/2 overflow-hidden">
                <Logo hasText={false} />
            </div>
            <div className="bg-neutral-900 w-1/4 min-w-[17rem] overflow-hidden"></div>
            <div className="bg-neutral-200 w-1/4 min-w-[18rem] overflow-hidden"></div>

            {/* sign in overlay */}
            <div className="flex fixed top-0 bottom-0 right-0 w-1/2 min-w-[35rem]">
                {/* separator */}
                <div className="h-full w-10 bg-neutral-600 transform -skew-x-12"></div>

                {/* white background and form */}
                <div className="h-full bg-white p-8 flex-grow flex items-center justify-center transform -skew-x-12">
                    <SignInBox mode={mode} handleLinkClick={handleLinkClick} Login={handleLogin} onStudentIdChange={handleStudentIdChange} onPasswordChange={handlePasswordChange} />
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
