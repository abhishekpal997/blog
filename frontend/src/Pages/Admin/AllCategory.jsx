import React, { useEffect, useState } from 'react'
import BreadCrumb from '../../Components/BreadCrumb';
import Table from '../../Components/Table';
import axios from 'axios';
import api from '../../api/api';

const AllCategory = () => {

  const [categoryall, setCategoryall] = useState([]);

  useEffect(() => {
    const fetchcategory = async () => {
      try {
        const response = await axios.get(`${api}/api/category/get`)
        setCategoryall(response.data.category);

      } catch (error) {
        console.log(error);

      }
    }

    fetchcategory()
  }, [])

  const filter = ['name','category','author','parent','image']

  return (
    <>
      <BreadCrumb name={'All Category'} />
      <div className='my-5'>
        <Table data={categoryall} filter={filter} />
      </div>
    </>
  )
}

export default AllCategory;