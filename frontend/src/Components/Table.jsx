import React from 'react';
import api from '../api/api';

const Table = ({ data, filter }) => {
    if (!data || data.length === 0) {
        return <div>No data available</div>;
    }

    const keys = Object.keys(data[0])

    return (
        <div className="font-[sans-serif] overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-800 whitespace-nowrap">
                    <tr>
                        {keys.map((key, index) => (
                            <th key={index} className="p-4 text-left text-sm font-medium text-white">
                                {key.toUpperCase()}
                            </th>
                        ))}
                        <th className="p-4 text-left text-sm font-medium text-white">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody className="whitespace-nowrap">
                    {data.map((item, rowIndex) => (
                        <tr key={rowIndex} className="even:bg-blue-50">
                            {keys.map((key, cellIndex) => (
                                <td key={cellIndex} className="p-4 text-sm text-black">
                                    {

                                        key === filter[1]
                                            ? item.category?.[0]?.name
                                            : key === filter[2]
                                                ? item.author?.[0]?.username
                                                : key === filter[3]
                                                    ? <img src={`${api}/uploads/blog/${item[key]}`} width={50} alt="" srcset="" />
                                                    : key === filter[4]
                                                        ? item.Comment.length
                                                        : item[key]

                                    }
                                </td>
                            ))}
                            <td className="p-4">
                                <button className="mr-4" title="Edit">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-blue-500 hover:fill-blue-700" viewBox="0 0 348.882 348.882">
                                        <path
                                            d="M333.988 11.758l-.42-.383A43.363 43.363 0 0 0 304.258 0a43.579 43.579 0 0 0-32.104 14.153L116.803 184.231a14.993 14.993 0 0 0-3.154 5.37l-18.267 54.762c-2.112 6.331-1.052 13.333 2.835 18.729 3.918 5.438 10.23 8.685 16.886 8.685h.001c2.879 0 5.693-.592 8.362-1.76l52.89-23.138a14.985 14.985 0 0 0 5.063-3.626L336.771 73.176c16.166-17.697 14.919-45.247-2.783-61.418z"
                                        />
                                        <path
                                            d="M303.85 138.388c-8.284 0-15 6.716-15 15v127.347c0 21.034-17.113 38.147-38.147 38.147H68.904c-21.035 0-38.147-17.113-38.147-38.147V100.413c0-21.034 17.113-38.147 38.147-38.147h131.587c8.284 0 15-6.716 15-15s-6.716-15-15-15H68.904C31.327 32.266.757 62.837.757 100.413v180.321c0 37.576 30.571 68.147 68.147 68.147h181.798c37.576 0 68.147-30.571 68.147-68.147V153.388c.001-8.284-6.715-15-14.999-15z"
                                        />
                                    </svg>
                                </button>
                                <button className="mr-4" title="Delete">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-red-500 hover:fill-red-700" viewBox="0 0 24 24">
                                        <path
                                            d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Z"
                                        />
                                        <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z" />
                                        <path d="M15 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
