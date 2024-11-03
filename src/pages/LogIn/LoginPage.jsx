import React, { useEffect, useState } from "react";
import SignInBox from "../../components/loginComponents/SignInBox";
import Logo from "../../components/navbar/logo/Logo";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../../components/loading/Loading";

import { Navigate, useNavigate } from "react-router-dom";

const LoginPage = ({
  mode,
  handleLinkClick,
  handleStudentIdChange,
  handlePasswordChange,
  isSuccess,
  studentId,
  password,
  setIsSuccess,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [toggleAnimation, setToggleAnimation] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
      setIsLoading(false);
      return;
    }

    axios
      .get(`${process.env.REACT_APP_SERVER_DOMAIN_NAME}/verify`, {
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
    return <Loading />;
  }

  function handleLogin(e) {
    e.preventDefault();
    if (mode === "sign-in") {
      const minDelay = 1000; // Minimum delay in milliseconds

      toast.promise(
        new Promise((resolve, reject) => {
          const startTime = Date.now();
          axios
            .post(`${process.env.REACT_APP_SERVER_DOMAIN_NAME}/sign-in`, {
              student_id: studentId,
              password: password,
            })
            .then((res) => {
              const elapsedTime = Date.now() - startTime;
              const remainingDelay = Math.max(0, minDelay - elapsedTime);

              setTimeout(() => resolve(res), remainingDelay);
            })
            .catch((err) => {
              const elapsedTime = Date.now() - startTime;
              const remainingDelay = Math.max(0, minDelay - elapsedTime);

              setTimeout(() => reject(err), remainingDelay);
            });
        }),
        {
          pending: "Signing in...",
          success: {
            render({ data }) {
              if (data.data.successful) {
                localStorage.setItem("token", data.data.token);
                setIsSuccess(true);
                if (data.data.admin) {
                  navigate("/admin");
                } else {
                  navigate("/home");
                }
                return "Signed in successfully!";
              } else {
                setIsSuccess(false);
                setToggleAnimation((prev) => !prev);
                throw new Error("Login failed");
              }
            },
          },
          error: {
            render({ data }) {
              setIsSuccess(false);
              setToggleAnimation((prev) => !prev);
              console.error(data);
              return "Failed to sign in. Please check your credentials.";
            },
          },
        },
        {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
        }
      );
    } else if (mode === "sign-up") {
      const minDelay = 1000; // Minimum delay in milliseconds

      toast.promise(
        new Promise((resolve, reject) => {
          const startTime = Date.now();
          axios
            .post(`${process.env.REACT_APP_SERVER_DOMAIN_NAME}/sign-up`, {
              student_id: studentId,
              password: password,
            })
            .then((res) => {
              const elapsedTime = Date.now() - startTime;
              const remainingDelay = Math.max(0, minDelay - elapsedTime);

              setTimeout(() => resolve(res), remainingDelay);
            })
            .catch((err) => {
              const elapsedTime = Date.now() - startTime;
              const remainingDelay = Math.max(0, minDelay - elapsedTime);

              setTimeout(() => reject(err), remainingDelay);
            });
        }),
        {
          pending: "Signing up...",
          success: {
            render({ data }) {
              if (data.data.successful) {
                localStorage.setItem("token", data.data.token);
                setIsSuccess(true);
                navigate("/home");
                return "Signed up successfully!";
              } else {
                setIsSuccess(false);
                setToggleAnimation((prev) => !prev);
                throw new Error("Login failed");
              }
            },
          },
          error: {
            render({ data }) {
              setIsSuccess(false);
              setToggleAnimation((prev) => !prev);
              console.error(data);
              return "Failed to sign up. Please check your credentials.";
            },
          },
        },
        {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
        }
      );
    }
  }

  return isAuthenticated ? (
    <Navigate to="/home" />
  ) : (
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
            studentId={studentId}
            password={password}
            handleLinkClick={handleLinkClick}
            Login={handleLogin}
            onStudentIdChange={handleStudentIdChange}
            onPasswordChange={handlePasswordChange}
            triggerAnimation={toggleAnimation}
            onSuccess={isSuccess}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
