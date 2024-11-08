import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../Layouts/Button';
import Table from '../../Components/Table';
import axios from 'axios';
import api from '../../api/api';

const Dashboard = () => {
    const navigate = useNavigate();
    const [userpost, setUserpost] = useState([]);
    const role = localStorage.getItem('role');
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token'); // Token should be available here

    useEffect(() => {
        const fetchPost = async () => {

            if (!token) {
                navigate('/login');
            }

            if (!username) {
                console.log("Username not found in localStorage.");
                return;
            }

            try {
                console.log(`Fetching posts for username: ${username}`);
                const response = await axios.get(`${api}/api/post/get/${username}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log("Response data:", response); // Log the entire response to check structure

                if (response.data) {
                    // Set the posts and user data if available
                    setUserpost(response.data.post || []);
                    setUser(response.data.user || null);
                } else {
                    console.log("No data returned from API.");
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPost();
    }, [username, token]); // Depend on username and token to trigger re-fetching


    const postdata = ['title','category', 'author','image'];

    return (
        <div>
            <div>
                {userpost.length > 0 ? (
                    <Table
                        data={userpost}
                        filter={postdata}
                    />
                ) : (
                    <p>No posts to display.</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
