import React from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const notifySuccess = (msg) => {
    toast.success(msg)
}

const notifyerror = (msg) => {
    toast.error(msg)
}

const notifyinfo = (msg) => {
    toast.info(msg)
}

const notifywarning = (msg) => {
    toast.warning(msg)
}

export { notifySuccess, notifyerror, notifyinfo, notifywarning };