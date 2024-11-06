import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        localStorage.clear();

        if (!token || role !== 'admin') {
            navigate('/login')
        }
    },[navigate])


    return (
        <div>Home</div>
    )
}

export default Home;