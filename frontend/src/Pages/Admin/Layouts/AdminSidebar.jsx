import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';

const AdminSidebar = () => {
    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

    const toggleDropdown = (index) => {
        setOpenDropdownIndex(openDropdownIndex === index ? null : index);
    };

    const navsidebar = [
        { name: "Dashboard", link: '/dashboard', icon: "mage:dashboard-plus" },
        {
            name: "Blog",
            dropdown: [
                { name: "Add Blog", link: "/add-blog", icon: "formkit:add" },
                { name: "All Blog", link: "/all-blog", icon: "" },
                { name: "Add Category", link: "/add-category", icon: "formkit:add" },
                { name: "All Category", link: "/all-category", icon: "material-symbols-light:category-search-outline" }
            ],
        },
    ];

    return (
        <nav className="bg-[#fcfcfc] shadow-lg h-screen fixed top-0 left-0 min-w-[15vw] py-6 px-4 font-[sans-serif] overflow-auto">
            <a href="#">
                <img src="https://readymadeui.com/readymadeui.svg" alt="logo" className='w-[160px]' />
            </a>

            <ul className="mt-8">
                {navsidebar.map((item, index) => (
                    <li key={index} className="mt-6">
                        <div className="flex cursor-pointer group" onClick={() => toggleDropdown(index)}>
                            <Link to={`/admin${item.link}`} className='flex flex-row items-center' >
                                <Icon icon={item.icon} color='black' fontSize={25} />
                                <h6 className="text-gray-600 group-hover:text-black text-sm font-bold px-4 flex-1">{item.name}</h6>
                            </Link>
                            {item.dropdown && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-gray-600 group-hover:fill-black" viewBox="0 0 451.847 451.847">
                                    <path
                                        d="M225.923 354.706c-8.098 0-16.195-3.092-22.369-9.263L9.27 151.157c-12.359-12.359-12.359-32.397 0-44.751 12.354-12.354 32.388-12.354 44.748 0l171.905 171.915 171.906-171.909c12.359-12.354 32.391-12.354 44.744 0 12.365 12.354 12.365 32.392 0 44.751L248.292 345.449c-6.177 6.172-14.274 9.257-22.369 9.257z"
                                        data-original="#000000" />
                                </svg>
                            )}
                        </div>

                        {item.dropdown && openDropdownIndex === index && (
                            <ul className="space-y-1 mt-2 pl-4">
                                {item.dropdown.map((subitem, subIndex) => (
                                    <li key={subIndex}>
                                        <Link to={`/admin${subitem.link}`} className="text-gray-600 hover:text-black transition-all text-sm flex gap-3 items-center hover:bg-[#efefef] rounded-md px-4 py-3">
                                            <Icon icon={subitem.icon} color='black' fontSize={25} />
                                            <span>{subitem.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </nav >
    );
};

export default AdminSidebar;
