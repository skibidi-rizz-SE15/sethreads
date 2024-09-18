import React from "react";

const SignInBox = () => {
    return (
        <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full">
            <h1 className="text-2xl font-semibold text-center mb-6">Sign In</h1>
            <form className="space-y-4">
                <div>
                    <input
                        type="text"
                        placeholder="Student ID"
                        className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-100 placeholder-gray-400 text-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-100 placeholder-gray-400 text-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition duration-300"
                >
                    Login
                </button>
            </form>
            <div className="mt-6 text-center text-gray-400">
                <p>
                    Don’t have an account?{" "}
                    <a href="/register" className="underline text-gray-500">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignInBox;
