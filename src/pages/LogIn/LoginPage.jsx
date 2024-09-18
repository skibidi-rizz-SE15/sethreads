import React from "react";
import SignInBox from "../../components/loginComponents/SignInBox";
import Logo from "../../components/navbar/logo/Logo";

const LoginPage = () => {
    return (
        <div className="flex h-screen w-screen overflow-hidden bg-black">
            {/* logo and main page */}
            <div className="bg-black flex items-center justify-center h-full w-1/2 overflow-hidden">
                <Logo hasText={false} />
            </div>
            <div className="bg-black w-1/4 overflow-hidden"></div>
            <div className="bg-neutral-200 w-1/4 overflow-hidden"></div>

            {/* sign in overlay */}
            <div className="flex fixed top-0 bottom-0 right-0 w-1/2 min-w-[35rem]">
                {/* separator */}
                <div className="h-full w-10 bg-neutral-600 transform -skew-x-12 "></div>

                {/* white background and form */}
                <div className="h-full bg-white p-8 flex-grow flex items-center justify-center transform -skew-x-12">
                    <SignInBox />
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
