import React from 'react'

const Button = ({ name, onClick ,type}) => {
    return (
        <button type={type} onClick={onClick} className='py-3 bg-blue-300 w-full text-xl font-medium'>{name}</button>
    )
}

export default Button;