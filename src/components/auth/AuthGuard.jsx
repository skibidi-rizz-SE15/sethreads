import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import axios from 'axios'

function AuthGuard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setIsAuthenticated(false)
            setIsLoading(false)
            return
        }

        axios.get(`${process.env.REACT_APP_SERVER_DOMAIN_NAME}/verify`, {
            headers: {
                "x-token": token
            }
        })
        .then((res) => {
            setIsAuthenticated(res.data.successful)
        })
        .catch((err) => {
            console.error('Authentication error:', err)
            setIsAuthenticated(false)
        })
        .finally(() => {
            setIsLoading(false)
        })
    }, [])

    if (isLoading) {
        return (
            <main className="flex flex-col items-center justify-center overflow-y-auto w-full h-screen bg-neutral-800">
                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/7d8da78db1ff40849a641d3086462423e911d33579caaab958d340cde9701cf2?placeholderIfAbsent=true&apiKey=6c97697ae0354418a18c66f6f8aad447"
                    alt=""
                    className="object-contain aspect-[1.87] w-[120px] animate-pulse"
                />
                {/* <p className="pt-3 mt-4 text-lg text-gray-300 typing-animation">Loading</p> */}
            </main>
        );
    }

    return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

export default AuthGuard