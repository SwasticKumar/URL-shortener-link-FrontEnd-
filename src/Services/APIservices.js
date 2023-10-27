import axios from 'axios';

const BASE_URL = "https://url-shortener-link-backend.onrender.com";
// const BASE_URL = "https://url-backend-z3ta.onrender.com";

export const addUser = async (payload) => {
    const response = await axios.post(`${BASE_URL}/user/signup`, payload);
    return response;
};

export const activateAccount = async (id,token,payload) => {
    const response = await axios.post(`${BASE_URL}/user/activate/${id}/${token}`, payload);
    return response;
};

export const userLogin = async (payload) => {
    const response = await axios.post(`${BASE_URL}/user/login`, payload);
    return response;
}; 

export const getAllURL = async (data, config) => {
    const response = await axios.post(`${BASE_URL}/url/all`,data, config)
    return response;
}
export const getTodayURL = async (data, config) => {
    const response = await axios.post(`${BASE_URL}/url/today`,data, config)
    return response;
}
export const getMonthlyURL = async (data, config) => {
    const response = await axios.post(`${BASE_URL}/url/monthly`,data, config)
    return response;
}
export const createURL = async (data, config) => {
    const response = await axios.post(`${BASE_URL}/url/createURL`,data, config)
    return response;
}
export const updateURLCount = async (data, config) => {
    const response = await axios.post(`${BASE_URL}/url/clickcount`,data, config)
    return response;
}
export const forgotPassword = async (payload) => {
    const response = await axios.post(`${BASE_URL}/user/forgot-password`, payload);
    return response;
};
export const activationMail = async (payload) => {
    const response = await axios.post(`${BASE_URL}/user/activation`, payload);
    return response;
};
export const verifyAuthorization = async (id,token) => {
    const response = await axios.get(`${BASE_URL}/user/forgot-password/authorize/${id}/${token}`);
    return response;
};
export const resetPassword = async (id,payload) => {
    const response = await axios.post(`${BASE_URL}/user/reset-password/${id}`, payload);
    return response;
};
