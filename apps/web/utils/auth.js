import axios from 'axios'
import Router from 'next/router'
import { Cookies } from 'react-cookie'
import nextCookie from 'next-cookies'

// Set Cookies
const cookies = new Cookies()

export const handleAuthSSR = async (ctx) => {
  const { token } = nextCookie(ctx)
  const url = `${process.env.API_URL}/api/users/validate`

  const redirectOnError = () => {
    console.log('Redirecting back to main page')
    if (typeof window !== 'undefined') {
      Router.push('/login')
    } else {
      ctx.res.writeHead(302, { Location: '/login' })
      ctx.res.end()
    }
  }

  try {
    if (!token) {
      return redirectOnError()
    }
    const response = await axios.get(url, {
      headers: { Authorization: token },
    })

    if (!response.data.user) {
      return redirectOnError()
    }
  } catch (error) {
    console.log('Error: ', error)
    return redirectOnError()
  }
  return {}
}

export const login = async ({ token }) => {
  cookies.set('token', token, { maxAge: 60 * 60 * 24 })
}

export const logout = () => {
  cookies.remove('token')
}
