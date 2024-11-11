import React, { useState, useEffect } from 'react';
import '../../styles/signinbox.css';

const SignInBox = ({ mode = "sign-in", handleLinkClick, Login, onStudentIdChange, onPasswordChange, onSuccess, triggerAnimation, studentId, password }) => {
    const [prevMode, setPrevMode] = useState(mode);

    useEffect(() => {
        if (mode !== prevMode) {
            setPrevMode(mode);
        }
    }, [mode, prevMode]);

    let passwordPlaceholder, modeMessage, modeText, modeTextOpposite;
    if (mode === "sign-up") {
        passwordPlaceholder = "Create Password";
        modeMessage = "Already have an account?";
        modeText = "Sign Up";
        modeTextOpposite = "Sign In";
    } else {
        passwordPlaceholder = "Password";
        modeMessage = "Don't have an account?";
        modeText = "Sign In";
        modeTextOpposite = "Sign Up";
    }

    return (
        <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full overflow-hidden">
            <h1 className="text-2xl font-semibold text-center mb-6">{modeText}</h1>
            <form className="space-y-4">
                <div className='hover:cursor-text'>
                    {(onSuccess === false) && <p key={triggerAnimation} className="text-red-500 text-sm animate-wiggle">Invalid student ID or password</p>}
                    <input
                        type="text"
                        placeholder="Student ID"
                        className={`w-full px-4 py-2 rounded-md border ${onSuccess === false ? 'border-red-500' : 'border-gray-300'
                            } bg-gray-100 placeholder-gray-400 text-gray-600 focus:outline-none ${onSuccess === false ? '' : 'focus:ring-2 focus:ring-yellow-500 transition duration-300'}`}
                        value={studentId}
                        onChange={onStudentIdChange}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder={passwordPlaceholder}
                        className={`w-full px-4 py-2 rounded-md border ${onSuccess === false ? 'border-red-500' : 'border-gray-300'
                            } bg-gray-100 placeholder-gray-400 text-gray-600 focus:outline-none ${onSuccess === false ? '' : 'focus:ring-2 focus:ring-yellow-500 transition duration-300'}`}
                        value={password}
                        onChange={onPasswordChange}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition duration-300"
                    onClick={Login}
                >
                    {modeText}
                </button>
            </form>
            <div className="mt-6 text-center text-gray-400">
                <p>
                    {modeMessage + " "}
                    <a href="/register" onClick={handleLinkClick} className="underline text-gray-500">
                        {modeTextOpposite}
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignInBox;