import React, { useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import Admintopbar from './Admintopbar';
import { useNavigate } from 'react-router-dom';

const AdminLayout = () => {

    const navigate = useNavigate()
    
    useEffect(()=>{
        const role = localStorage.getItem('role');

        if (role !== "admin") {
            navigate('/login')
        }
    })

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-1/6 text-white sm:hidden lg:block">
                <AdminSidebar />
            </div>

            {/* Main content area */}
            <div className="flex flex-col w-full">
                {/* Top bar */}
                <div className="w-full bg-white">
                    <Admintopbar />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
