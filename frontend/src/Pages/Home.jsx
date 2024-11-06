import React, { useState } from 'react';
import Input from '../Layouts/Input';
import File from '../Layouts/File';
import Button from '../Layouts/Button';
import axios from 'axios';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { notifyError, notifySuccess } from '../Layouts/Toast';

const Home = () => {
    // Input field configurations
    const input = [
        { name: 'username', label: 'Username', type: 'text', placeholder: 'Username', icon: 'ph:user-light' },
        { name: 'email', label: 'Email', type: 'email', placeholder: 'Email', icon: 'mdi-light:email' },
        { name: 'password', label: 'Password', type: 'password', placeholder: 'Password', icon: 'bitcoin-icons:key-outline' },
        { name: 'image', label: 'Upload Avatar', type: 'file' }
    ];

    // State to hold form data
    const [userdata, setUserdata] = useState({
        username: '',
        email: '',
        password: '',
        image: null,
    });

    const navigate = useNavigate();

    // Handle input change for both text and file inputs
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setUserdata({ ...userdata, [name]: files[0] });
        } else {
            setUserdata({ ...userdata, [name]: value });
        }
    };

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare form data for submission
        const data = new FormData();
        Object.entries(userdata).forEach(([key, value]) => {
            data.append(key, value);
        });

        try {
            // POST request to the API with form data
            const response = await axios.post(`${api}/api/user/register`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Reset the form state on successful submission
            setUserdata({
                username: '',
                email: '',
                password: '',
                image: null,
            });
            notifySuccess(response.data.msg)
            console.log(response.data.msg);
            navigate('/user/dashboard'); // Redirect to dashboard

        } catch (error) {
            notifyError(error.response?.data?.msg)
            console.error("Registration error:", error);
        }
    };

    return (
        <div className='bg-black'>
            <div className='container mx-auto'>
                <div className='flex justify-center items-center h-screen'>
                    <div className='w-1/2 bg-white p-12 rounded-xl'>
                        <form method='post' className='flex flex-col gap-3' onSubmit={handleSubmit}>
                            {input.map((item, index) => (
                                item.type === 'file' ? (
                                    <File
                                        key={index}
                                        name={item.name}
                                        label={item.label}
                                        type={item.type}
                                        className='hidden'
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <Input
                                        key={index}
                                        name={item.name}
                                        label={item.label}
                                        type={item.type}
                                        value={userdata[item.name]}
                                        className='py-2 ps-10 outline-black border border-gray-300 rounded-lg relative bg-gray-50 focus:bg-transparent'
                                        icon={item.icon}
                                        placeholder={item.placeholder}
                                        onChange={handleChange}
                                    />
                                )
                            ))}
                            <div>
                                <Button type='submit' name='Submit' />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
