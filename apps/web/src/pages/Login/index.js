import { useEffect, useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import {login} from '../../actions/auth';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const loginUrl = `${process.env.REACT_APP_API_URL}/api/users/auth/login`;
  
  function handleSubmit(e) {
    e.preventDefault();

    // ! DEBUG line
    console.log('Email:', email, 'Password:', password);
    
    login(email, password);
  }
  return (
    <>
      <LoginWrapper>
        <Helmet>
          <title>Login | Paasify</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Helmet>
        <LoginForm method="post" onSubmit={handleSubmit}>
          <Title>Login to Paasify</Title>
          <Input
            name="email"
            placeholder="Email"
            type="email"
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            name="password"
            placeholder="Password"
            type="password"
            onChange={e => setPassword(e.target.value)}
          />
          <Button>Continue</Button>
        </LoginForm>
      </LoginWrapper>
    </>
  );
}

const LoginWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  justify-content: center;
  align-content: center;
  font-family: "Raleway", sans-serif;
`;
const LoginForm = styled.form`
  padding: 100px 80px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 44px;
`;

const Input = styled.input`
  width: 320px;
  border-radius: 5px;
  font-family: inherit;
  font-size: 16px;
  padding: 16px 20px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  outline: none;
  ::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }
  :focus {
    border: 1px solid rgba(0, 0, 0);
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

export default Login;
