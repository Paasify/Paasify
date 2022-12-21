import styled from "styled-components";
import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import BlurBlackImg from "../../assets/blur-black.jpg";
import axios from "axios";
import { useIsAuthenticated } from "react-auth-kit";

export default function Signup() {
  // Check Auth
  const isAuthenticated = useIsAuthenticated();
  if (isAuthenticated()) {
    window.location.href = "/";
  }
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/users/registered`)
      .then((res) => {
        if (res.data.registered) {
          window.location.href = "/login";
        }
      });
  });
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sideImg, setSideImg] = useState(BlurBlackImg);
  const signupUrl = `${process.env.REACT_APP_API_URL}/api/users/auth/signup`;

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Username", username, "Email", email, "Password", password);
    try {
      axios
        .post(signupUrl, {
          email,
          password,
          username,
        })
        .then((res) => {
          console.log(res);
        });
    } catch (err) {
      if (!err.response) {
        // network error
        console.log("Network Error");
      } else {
        // http status code
        const status = err.response.status;
        console.log("Status", status);
        // response data
        const data = err.response.data;
        console.log("Data", data);
      }
    }
  };

  useEffect(() => {
    axios
      .get("https://source.unsplash.com/collection/96625331/1080x1080")
      .then((res) => {
        setSideImg(res.request.responseURL);
      });
  }, []);
  return (
    <SignUpWrapper>
      <Helmet>
        <title>Sign up | Paasify</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Helmet>
      <ImageWrapper img={sideImg}></ImageWrapper>
      <SignUpForm method="post" onSubmit={onSubmit}>
        <Title>
          Sign up
          <br />
          on Paasify
        </Title>
        <Input
          name="username"
          placeholder="Username"
          type="text"
          spellCheck="false"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          name="email"
          placeholder="Email"
          type="email"
          spellCheck="false"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          name="password"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button>Continue</Button>
      </SignUpForm>
    </SignUpWrapper>
  );
}

const SignUpWrapper = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  height: 100vh;
  font-family: "Raleway", sans-serif;
`;

const ImageWrapper = styled.div`
  background: url(${(props) => props.img}) no-repeat center center;
  background-size: cover;
  width: 100%;
  height: 100%;
`;

const SignUpForm = styled.form`
  height: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  padding-inline: 80px;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 600;
  margin-bottom: 1.8rem;
  line-height: 1.2;
`;

const Input = styled.input`
  font-family: inherit;
  font-weight: 400;
  padding: 16px 20px;
  border-radius: 5px;
  outline: none;
  border: 0.2px solid rgba(0, 0, 0, 0.2);
  font-size: 16px;
  transition: 0.1s;
  ::placeholder {
    font-weight: 400;
  }
  ::-moz-selection {
    background: rgba(33, 225, 225, 0.5);
  }
  ::selection {
    background: rgba(33, 225, 225, 0.5);
  }
  :focus {
    border: 1px solid rgba(0, 0, 0, 0.5);
  }
`;

const Button = styled.button`
  padding: 16px 64px;
  border-radius: 5px;
  font-family: inherit;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  background-color: #0066ff;
  border: none;
  cursor: pointer;
`;
