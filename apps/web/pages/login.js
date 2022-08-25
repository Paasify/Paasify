import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import { login } from '../utils/auth'
import { Cookies } from 'react-cookie'
import axios from 'axios'
import { useForm } from 'react-hook-form'

const cookies = new Cookies()

export default function Login({ API_URL }) {
  const url = `${API_URL}/api/users/login`

  // email, password, token, error states
  const [token, setToken] = useState(cookies.get('token') || null)
  const [error, setError] = useState('')
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  // react hook form
  const {
    loginForm,
    handleSubmit,
    formState: { errors },
  } = useForm()

  // if react hook form is fine then send data to server
  const onSubmit = async (data) => {
    const { email, password } = data

    // send data to server to check if the user is valid
    const response = await axios.post(url, {
      email,
      password,
    })

    // if the user is valid then set the token in the cookie
    if (response.data.token) {
      const { token } = response.data
      await login({ token })
      setToken(token)
      setError(null)
    } else {
      setError(error.message)
    }
  }

  // const onEmailChange = (e) => {
  //   setEmail(e.target.value)
  // }
  // const onPasswordChange = (e) => {
  //   setPassword(e.target.value)
  // }

  // const onLoginClick = async (e) => {
  //   e.preventDefault()
  //   try {
  //     const url = `${API_URL}/api/users/login`
  //     const response = await axios.post(url, {
  //       email,
  //       password,
  //     })
  //     const { token } = response.data
  //     await login({ token })
  //     setToken(token)
  //     setError(null)
  //   } catch (error) {
  //     console.error(
  //       'You have an error in your code or there are network issue.',
  //       error
  //     )
  //     setError(error.message)
  //   }
  // }

  // useEffect(() => {

  // })
  return (
    <LoginWrapper>
      <Head>
        <title>Login | Paasify</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <LoginForm method="post" onSubmit={handleSubmit(onSubmit)}>
        <Title>Login to Paasify</Title>
        <Input
          name="email"
          placeholder="Email"
          type="email"
          // onChange={(e) => onEmailChange(e)}
        />
        <Input
          name="password"
          placeholder="Password"
          type="password"
          // onChange={(e) => onPasswordChange(e)}
        />
        <Button>Continue</Button>
        {error && <p>Error: ${error}</p>}
        {token && <p>Token: {token}</p>}
        <ForgotPassword>Forgot password?</ForgotPassword>
      </LoginForm>
    </LoginWrapper>
  )
}

Login.getInitialProps = async (ctx) => {
  return { API_URL: process.env.API_URL }
}

const LoginWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  justify-content: center;
  align-content: center;
  font-family: 'Raleway', sans-serif;
`
const LoginForm = styled.form`
  padding: 100px 80px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 44px;
`

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
`

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
`

const ForgotPassword = styled.a`
  font-size: 14px;
  color: #000;
`
