import styled from 'styled-components';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
    username: yup.string().required('Username is required').max(20, 'Username should be lesser than 20 characters').matches(/^[a-zA-Z\-]+$/, 'Username can only contain letters and dashes'),
    email: yup.string().required('Email is required').email('Email is invalid'),
    password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must contain at least\none uppercase letter\none lowercase letter\none number\none special character'),
}).required();

export default function SignUp() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = data => console.log(data);
    var errUsername = {
        errors: errors.username,
    }
    var errEmail = {
        errors: errors.email,
    }
    var errPassword = {
        errors: errors.password,
    }
    return (
        <SignUpWrapper>
            <Head>
                <title>Sign up | Paasify</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <ImageWrapper>
            </ImageWrapper>
            <SignUpForm method='post' onSubmit={handleSubmit(onSubmit)}>
                <Title>Sign up<br />on Paasify</Title>
                <Input name="username" placeholder="Username" type="text" {...register('username')} err={errUsername} />
                {errors.username?.message ? <p>*{errors.username?.message}</p> : null}
                <Input name="email" placeholder="Email" type="email" {...register('email', { required: true, pattern: /^\S+@\S+$/i })} err={errEmail} />
                {errors.email?.message ? <p>*{errors.email?.message}</p> : null}
                <Input name="password" placeholder="Password" type="password" {...register('password', { required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ })} err={errPassword} />
                {errors.password?.message ? <p style={{whiteSpace: 'pre-wrap'}}>*{errors.password?.message}</p> : null}
                <Button>Continue</Button>
            </SignUpForm>
        </SignUpWrapper>
    )
}

const SignUpWrapper = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    height: 100vh;
    font-family: 'Raleway', sans-serif;
`

const ImageWrapper = styled.div`
    background: url(https://source.unsplash.com/collection/96625331/1080x1920) no-repeat center center;
    background-size: cover;
    width: 100%;
    height: 100%;
`

const SignUpForm = styled.form`
    height: 100%;
    max-width: 360px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    padding-inline: 80px;
`

const Title = styled.h1`
    font-size: 48px;
    font-weight: 600;
    margin-bottom: 1.8rem;
    line-height: 1.2;
`

const Input = styled.input`
    font-family: inherit;
    font-weight: 400;
    padding: 16px 20px;
    border-radius: 5px;
    outline: none;
    border: 0.2px solid rgba(0,0,0,0.2);
    border-color: ${props => props.err.errors ? 'red' : null};
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
        border: 1px solid rgba(0,0,0,0.5);
        border-color: ${props => props.err.errors ? 'red' : null};
    }
`

const Button = styled.button`
    padding: 16px 64px;
    border-radius: 5px;
    font-family: inherit;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    background-color: #0066FF;
    border: none;
    cursor: pointer;
`