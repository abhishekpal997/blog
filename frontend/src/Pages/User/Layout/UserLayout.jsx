import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import { useNavigate } from 'react-router-dom'
import UserTopbar from './UserTopbar'

const UserLayout = () => {

    const navigate = useNavigate()
    const role = localStorage.getItem('role');
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token'); // Token should be available here

    useEffect(() => {
        const role = localStorage.getItem('role');
        if (role !== "user") {
            navigate('/login')
        }
    })

    return (
        <>
            <div className="flex h-screen">
                {/* Sidebar */}
                <div className="w-1/6 text-white sm:hidden lg:block">
                    <Sidebar />
                </div>

                {/* Main content area */}
                <div className="flex flex-col w-full">
                    {/* Top bar */}
                    <div className="w-full bg-white">
                        <UserTopbar />
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserLayout