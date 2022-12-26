import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import {useAuthUser} from 'react-auth-kit'
import { useSignOut } from "react-auth-kit";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const auth = useAuthUser()
  const signOut = useSignOut()
  
  return (
    <NavbarWrapper>
      <Left>
        <Link to="/dashboard">Paasify</Link>
      </Left>
      <Right>
        <MainLink to="/new">Add new</MainLink>
        <MainLink to="/apps">Apps</MainLink>
        <h1>Hello <span>{auth().userName}</span> 👋</h1>
        <a onClick={() => signOut()}>Log out</a>
      </Right>
    </NavbarWrapper>
  );
}

const NavbarWrapper = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid;
`;

const Left = styled.div`
  padding: 0 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    text-decoration: none;
    :active {
      color: black;
    }
  }
`;

const Right = styled.div`
  padding: 0 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  span {
    font-weight: 600;
    text-decoration: underline;
  }
  a {
    cursor: pointer;
    text-decoration: none;
    padding: 0.8rem 1rem;
    border-radius: 5px;
    color: black;
    transition: 0.3s;
    :hover {
      background: red;
      color: #fff;
    }
  }
`;

const MainLink = styled(Link)`
  text-decoration: none;
  padding: 0.8rem 1rem;
  border-radius: 5px;
  color: black;
  transition: 0.3s;
  :hover {
    background: #000 !important;
    color: #fff;
  }
`