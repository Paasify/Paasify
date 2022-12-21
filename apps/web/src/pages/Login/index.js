import { useEffect, useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import axios, { AxiosError } from "axios";
import { useSignIn } from "react-auth-kit";
import { useIsAuthenticated } from "react-auth-kit";

function Login() {
  // Check Auth
  const isAuthenticated = useIsAuthenticated();
  if (isAuthenticated()) {
    window.location.href = "/";
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState();
  const signIn = useSignIn();

  const loginUrl = `${process.env.REACT_APP_API_URL}/api/users/auth/login`;

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(loginUrl, {
        email,
        password,
      });
      signIn({
        token: response.data.accessToken,
        expiresIn: (response.data.expiresIn/60) || 86400,
        tokenType: "Bearer",
        authState: {
          email: response.data.email,
          userName: response.data.userName,
        },
      });
    } catch (err) {
      if (err.response.data.message) {
        setLoginError(err.response.data.message);
      } else {
        setLoginError("Something went wrong");
      }
      console.log(err.response.data.message);
    }
  };
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
        <LoginForm method="post" onSubmit={onSubmit}>
          <Title>Login to Paasify</Title>
          <Input
            name="email"
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            error={loginError}
          />
          <Input
            name="password"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            error={loginError}
          />
          {loginError && <LoginError>{loginError}</LoginError>}
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
  ${(props) => {
    if (props.error) {
      return `
        border: 1px solid red;
      `;
    }
  }}
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

const LoginError = styled.p`
  color: red;
`

export default Login;
