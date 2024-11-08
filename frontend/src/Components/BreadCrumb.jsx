import React from 'react'

const BreadCrumb = ({ name }) => {
    return (
        <header className="bg-white shadow">
            <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8 flex flex-row justify-between">
                <h1 className="text-xl font-bold tracking-tight text-gray-900">
                    {name}
                </h1>
                <ul className='flex flex-row gap-2'>
                    <li>Home</li>
                    <li>/</li>
                    <li>{name}</li>
                </ul>
            </div>
        </header>
    )
}

export default BreadCrumb