import React, { useState } from 'react';
import Input from '../Layouts/Input';
import File from '../Layouts/File';
import Button from '../Layouts/Button';
import axios from 'axios';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const input = [
        { name: 'username', label: 'Username', type: 'text', placeholder: 'Username', icon: 'ph:user-light' },
        { name: 'email', label: 'Email', type: 'email', placeholder: 'Email', icon: 'mdi-light:email' },
        { name: 'password', label: 'Password', type: 'password', placeholder: 'Password', icon: 'bitcoin-icons:key-outline' },
        { name: 'image', label: 'Upload Avatar', type: 'file', }
    ];

    const [userdata, setUserdata] = useState({
        username: '',
        email: '',
        password: '',
        image: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setUserdata({ ...userdata, [name]: files[0] });
        } else {
            setUserdata({ ...userdata, [name]: value });
        }
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.entries(userdata).forEach(([key, value]) => {
            data.append(key, value);
        });
        try {
            const response = await axios.post(`${api}/api/user/register`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setUserdata({
                username: '',
                email: '',
                password: '',
                image: null,
            });
            console.log(response.data.user);
            navigate('/user/dashboard')
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='bg-black'>
            <div className='container mx-auto'>
                <div className='flex justify-center items-center h-screen'>
                    <div className='w-1/2 bg-white p-12 rounded-xl'>
                        <form method='post' className='flex flex-col gap-3'>
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
                                <Button type='submit' onClick={handleSubmit} name='Submit' />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
