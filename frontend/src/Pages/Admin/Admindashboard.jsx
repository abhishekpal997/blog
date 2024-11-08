import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import BreadCrumb from '../../Components/BreadCrumb';
import Table from '../../Components/Table';
import api from '../../api/api';
import axios from 'axios';

const Dashboard = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');


        if (!token) {
            navigate('/login')
        }
    }, [navigate])

    const role = localStorage.getItem('role');

    const [userallpost, setUserallpost] = useState([]);

    useEffect(() => {
        const fetchuserallpost = async () => {
            try {
                const response = await axios.get(`${api}/api/post/get`);
                setUserallpost(response.data.post);
                console.log(response.data.post);

            } catch (error) {
                console.log(error);

            }
        }

        fetchuserallpost()

    }, [])

    const filter = ['title','category','author','image']

    return (
        <>
            <BreadCrumb name={"Dashboard"} />
            <div>
                <Table data={userallpost} filter={filter} />
            </div>
        </>


    )
}

export default Dashboard;