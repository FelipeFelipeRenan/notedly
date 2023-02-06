import React from "react";
import logo from '../img/logo.svg'
import styled from "styled-components";
import { gql } from "@apollo/client";
import { Link } from "react-router-dom";

const IS_LOGGED_IN = gql`
    {
        isLoggedIn @client
    }
`
const HeaderBar = styled.header`
    width: 100%;
    padding: 0.5em 1em;
    display: flex;
    height: 64px;
    position: fixed;
    align-items:center;
    background-color: #fff
    box-shadow: 0 0 5px 0 rgba(0,0,0,0.25);
    z-index:1;
`

const LogoText = styled.h1`
    margin: 0;
    padding: 0;
    display: inline;
`

const UserState = styled.div`
        margin-left: auto;
    `

export default Header = props =>{
    return (
        <HeaderBar>
            <img src={logo} alt="Notedly Logo" height="40"/>
            <LogoText>Notedly</LogoText>
            <HeaderBar>
                {data.isLoggedIn? (
                    <p>Log Out</p>
                ):(
                    <p>
                        <Link to={'/signin'}>Sign In</Link>
                        <Link to={'/signin'}>Sign Up</Link>
                    </p>
                )}
            </HeaderBar>
        </HeaderBar>
    )
}