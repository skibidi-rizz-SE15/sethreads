import React from "react";
import SignInBox from "../../components/loginComponents/SignInBox";
import Logo from "../../components/navbar/logo/Logo";

const LoginPage = () => {
    return (
        <div className="relative w-screen h-screen">
            {/* Left side with logo or content */}
            <div className="absolute top-0 left-0 w-1/2 h-full bg-neutral-800 flex justify-center items-center">
                {/* Enlarged Logo */}
                <div className="flex justify-center items-center">
                    <Logo hasText={false} /> {/* Adjust the width and height */}
                </div>
            </div>

            {/* Right side trapezoid */}
            <div className="absolute top-0 right-0 w-3/5 h-full">
                <div style={{width: '100%', height: '100%', backgroundColor: '#F8F8F8', clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)'}}>
                </div>
            </div>

            {/* Sign In box, positioned in front of trapezoid */}
            <div className="absolute top-1/2 right-1/4 transform -translate-y-1/2 z-10">
                <SignInBox />
            </div>
        </div>
    );
}

export default LoginPage;
