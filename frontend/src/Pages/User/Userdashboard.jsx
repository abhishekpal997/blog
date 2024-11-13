import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../Layouts/Button';
import Table from '../../Components/Table';
import axios from 'axios';
import api from '../../api/api';
import Input from '../../Layouts/Input';
import File from '../../Layouts/File';
import { notifyError, notifySuccess } from '../../Layouts/Toast';

const Dashboard = () => {
    const navigate = useNavigate();
    const [userpost, setUserpost] = useState([]);
    const [user, setUser] = useState(null);
    const role = localStorage.getItem('role');
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    const [category, setCategory] = useState([]);
    const [blogpost, setBlogpost] = useState({
        title: "",
        url: "",
        category: "",
        author: "",
        image: null,
    });
    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        const fetchPost = async () => {
            if (!username) {
                console.log("Username not found in localStorage.");
                return;
            }

            try {
                const response = await axios.get(`${api}/api/post/get/${username}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUserpost(response.data.post || []);
                setUser(response.data.user || null);

                // Update `author` in `blogpost` once `user` data is set
                setBlogpost({...blogpost, author: response.data.user._id})
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        const fetchCategory = async () => {
            try {
                const response = await axios.get(`${api}/api/category/get`);
                setCategory(response.data.category || []);
            } catch (error) {
                console.log("Error fetching categories:", error);
            }
        };

        fetchPost();
        fetchCategory();
    }, [username, token, navigate]);


    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setBlogpost((prev) => ({
            ...prev,
            [name]: name === 'image' ? files[0] : value,
        }));
    };

    const handleCategoryChange = (e) => {
        setBlogpost((prev) => ({ ...prev, category: e.target.value }));
    };

    const input = [
        { name: "title", type: "text", label: "Blog Title", placeholder: "Enter Blog Title" },
        { name: "url", type: "text", label: "Blog Url", placeholder: "Enter Blog Url" },
        { name: "category", type: "select", label: "Select Category", placeholder: "Select" },
        { name: "image", type: "file", label: "Upload Image", placeholder: "upload image" },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token) {
            notifyError("Authentication token missing. Please log in.");
            return;
        }

        if (role !== "user") {
            notifyError("You are not authorized to create a post.");
        }

        const data = new FormData();
        Object.entries(blogpost).forEach(([key, value]) => {
            data.append(key, value);
        });

        try {
            const response = await axios.post(`${api}/api/post/create`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            setBlogpost({
                title: "",
                url: "",
                category: "",
                author: "",
                image: null,
            });

            console.log(response.data.post);
            notifySuccess(response.data.msg || "Post created successfully");
            fetchPost();
        } catch (error) {
            console.error("Error creating post:", error);
            notifyError(error.response?.data?.msg || "Error creating post.");
        }
    };


    const postdata = ['title', 'category', 'author', 'image', "Comment"];

    return (
        <div className=''>
            <div className='flex flex-col justify-between items-center gap-12'>
                <div className='w-6/12'>
                    <form className='grid grid-cols-2 gap-4' onSubmit={handleSubmit}>
                        {input.map((item, index) => (
                            item.type === 'file' ? (
                                <div className='col-span-2' key={index}>
                                    <File
                                        name={item.name}
                                        type={item.type}
                                        label={item.label}
                                        onChange={handleChange}
                                        className='hidden'
                                    />
                                </div>
                            ) : item.type === "select" ? (
                                <div className='col-span-2 flex flex-col gap-2' key={index}>
                                    <label>{item.label}</label>
                                    <select
                                        name={item.name}
                                        value={blogpost.category}
                                        onChange={handleCategoryChange}
                                        className='py-2 outline-black border rounded-lg focus:bg-transparent bg-gray-50'
                                    >
                                        <option value="">Select Category</option>
                                        {category.map((cat) => (
                                            <option key={cat._id} value={cat._id}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ) : (
                                <Input
                                    key={index}
                                    label={item.label}
                                    type={item.type}
                                    name={item.name}
                                    onChange={handleChange}
                                    placeholder={item.placeholder}
                                    value={blogpost[item.name]}
                                    className='py-2 ps-10 outline-black border border-gray-300 rounded-lg bg-gray-50 focus:bg-transparent'
                                />
                            )
                        ))}
                        <div>
                            <Button type='submit' name='Submit' />
                        </div>
                    </form>
                </div>
                <div>
                    {userpost.length > 0 ? (
                        <Table data={userpost} filter={postdata} />
                    ) : (
                        <p>No posts to display.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
