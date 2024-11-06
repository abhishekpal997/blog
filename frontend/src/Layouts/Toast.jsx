import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notifySuccess = (msg) => {
    toast.success(msg);
}

const notifyError = (msg) => {
    toast.error(msg);
}

const notifyInfo = (msg) => {
    toast.info(msg);
}

const notifyWarning = (msg) => {
    toast.warn(msg);
}

export { notifySuccess, notifyError, notifyInfo, notifyWarning };
