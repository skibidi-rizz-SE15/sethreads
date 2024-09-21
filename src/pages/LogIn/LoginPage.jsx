import React, { useEffect, useState } from "react";
import SignInBox from "../../components/loginComponents/SignInBox";
import Logo from "../../components/navbar/logo/Logo";
import axios from "axios";

import { Navigate, useNavigate } from "react-router-dom";

const LoginPage = ({ mode, handleLinkClick, handleStudentIdChange, handlePasswordChange, isSuccess, studentId, password, setIsSuccess }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setIsAuthenticated(false);
            setIsLoading(false);
            return;
        }

        axios.get(`${process.env.REACT_APP_SERVER_DOMAIN_NAME}/verify`, {
            headers: {
                "x-token": token,
            },
        })
            .then((res) => {
                setIsAuthenticated(res.data.successful);
            })
            .catch((err) => {
                console.error("Authentication error:", err);
                setIsAuthenticated(false);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
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
                setIsSuccess(false);
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
                setIsSuccess(false);
            });
        }
    }

    return isAuthenticated ? <Navigate to="/home" /> : (
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
                    <SignInBox 
                        mode={mode}
                        handleLinkClick={handleLinkClick}
                        Login={handleLogin}
                        onStudentIdChange={handleStudentIdChange}
                        onPasswordChange={handlePasswordChange}
                        onSuccess={isSuccess} />
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
