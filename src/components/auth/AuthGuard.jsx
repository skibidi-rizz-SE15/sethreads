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
        return <div>Loading...</div> // Bro can add loading page here.
    }

    return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

export default AuthGuard