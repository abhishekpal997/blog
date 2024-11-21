import React, { useEffect, useState } from 'react';
import Input from '../../Layouts/Input';
import Button from '../../Layouts/Button';
import axios from 'axios';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { notifyError, notifySuccess } from '../../Layouts/Toast';
import { Helmet } from 'react-helmet';


const Login = () => {
    // Input field configurations
    const input = [
        { name: 'email', label: 'Email', type: 'email', placeholder: 'Email', icon: 'mdi-light:email' },
        { name: 'password', label: 'Password', type: 'password', placeholder: 'Password', icon: 'bitcoin-icons:key-outline' },
    ];

    // State to hold form data
    const [userdata, setUserdata] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    // Handle input change for both text and file inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserdata({ ...userdata, [name]: value });
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        const username = localStorage.getItem('username');

        if (token) {
            if (role === 'admin') {
                navigate('/admin/dashboard')
            } else if (role === 'user') {
                navigate('/user/dashboard')
            }
        }

    }, [navigate])

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare form data for submission

        try {
            // POST request to the API with form data
            const response = await axios.post(`${api}/api/user/login`, userdata);

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.user.role);
            localStorage.setItem('username', response.data.user.username);


            if (response.data.user.role === 'admin') {
                navigate('/admin/dashboard');
            } else if (response.data.user.role === 'user') {
                navigate('/user/dashboard')
            }
            // Reset the form state on successful submission
            setUserdata({
                email: '',
                password: '',
            });
            notifySuccess(response.data.msg)
            console.log(response.data.user.username);


        } catch (error) {
            notifyError(error.response?.data?.msg)
            console.error(error.response?.data?.msg);
        }
    };

    return (
        <>
            <Helmet>
                <title>Login</title>
                <meta name='description' content='Login Page' />
            </Helmet>
            <div className='bg-black'>
                <div className='container mx-auto'>
                    <div className='flex justify-center items-center h-screen'>
                        <div className='lg:w-1/2 bg-white p-12 rounded-xl'>
                            <form method='post' className='flex flex-col gap-3 sm:' onSubmit={handleSubmit}>
                                {input.map((item, index) => (

                                    <Input
                                        key={index}
                                        name={item.name}
                                        label={item.label}
                                        type={item.type}
                                        value={userdata[item.name]}
                                        className='py-2 ps-10 outline-black border border-gray-300 rounded-lg bg-gray-50 focus:bg-transparent'
                                        icon={item.icon}
                                        placeholder={item.placeholder}
                                        onChange={handleChange}
                                    />

                                ))}
                                <div>
                                    <Button type='submit' name='Login' />
                                </div>
                            </form>
                            <div className='my-3'>
                                <p className='text-center'>Don't have an account? <a href='/register' className='text-blue-600'>Register</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
