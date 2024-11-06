import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../Layouts/Button';

const Dashboard = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');


        if (!token) {
            navigate('/login')
        }
    }, [navigate])

    const role = localStorage.getItem('role');

    const handleClick = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }
    return (
        <div>
            {
                role === 'admin' ? (
                    <h1>welcome Admin</h1>
                ) : ""
            }
            <Button name='Logout' type='button' onClick={handleClick} />
        </div>


    )
}

export default Dashboard;