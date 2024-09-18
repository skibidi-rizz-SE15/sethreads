import React from "react";
import SignInBox from "../../components/loginComponents/SignInBox";
import Logo from "../../components/navbar/logo/Logo";

const LoginPage = () => {
    return (
        <div className="flex h-screen w-screen overflow-hidden bg-black">
            {/* Left side (black background with logo) */}
            <div className="bg-black flex items-center justify-center h-full w-1/2 overflow-hidden">
                <div className="text-white text-4xl font-bold">LOGO</div>
            </div>
            <div className="bg-black w-1/4 overflow-hidden"></div>
            <div className="bg-white w-1/4 overflow-hidden"></div>

            {/* Right side (white background with form) */}
            <div className="flex fixed top-0 bottom-0 right-0 w-1/2 min-w-[35rem]">
                {/* Diagonal separator */}
                <div className="h-full w-10 bg-neutral-600 transform -skew-x-12 "></div>

                {/* White background and form */}
                <div className="h-full bg-white p-8 flex-grow flex items-center transform -skew-x-12">
                    <form className="w-full max-w-sm mx-auto">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                        </div>
                        <div className="flex items-center justify-between">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                Sign In
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
