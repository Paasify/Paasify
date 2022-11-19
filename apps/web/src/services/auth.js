import axios from "axios";

const URL = `${process.env.REACT_APP_API_URL}/api/users/auth`;

class AuthService {
  login(username, password) {
    return axios
      .post(URL + "login", { username, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, password) {
    return axios.post(URL + "signup", { username, email, password });
  }
}

export default new AuthService();