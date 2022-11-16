import axios from 'axios';

const URL = `${process.env.REACT_APP_API_URL}/api/users/auth`;

const loginEP = async(email, password) => {
    await axios.post(`${URL}/login`, { email, password })
        .then((response) => {
        
            if (response.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }

            return response.data;
        }
    );
}

const logoutEP = () => {
    localStorage.removeItem('user');
}

const signup = async(username, email, password) => {
    return await axios.post(`${URL}/signup`, { username, email, password });
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
}

export {
    loginEP,
    logoutEP,
    signup,
    getCurrentUser
}