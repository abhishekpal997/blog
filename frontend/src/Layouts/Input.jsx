import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';

const Input = ({ name, label, type, value, onChange, placeholder, icon, className }) => {
    return (
        <div className='w-full flex flex-col gap-2 relative'>
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={className} // Add padding to the left for icon spacing
            />
            <span className='absolute top-3/4 -translate-y-1/2 left-3'>
                <Icon icon={icon} fontSize={20} />
            </span>
        </div>
    );
};

export default Input;
