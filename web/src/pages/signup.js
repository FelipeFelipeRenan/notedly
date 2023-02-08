import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import { gql, useApolloClient, useMutation } from "@apollo/client";
import UserForm from "../components/UserForm";

const SIGNUP_USER = gql`
    mutation signUp($email: String!, $username: String!, $password: String!){
        signUp(email: $email, username: $username, password: $password)
    }
`

const Wrapper = styled.div`
    border: 1px solid #ff5f4f0
    max-width: 500px;
    padding: 1em;
    margin: 0 auto;
`
const Form = styled.form`
    label,
    input{
        display: block;
        line-height: 2em;
    }

    input {
        width: 100%;
        margin-bottom: 1em;
    }

`
export default SignUp = props =>{

    const [values, setValues] = useState()

    const onChange = event => {
        setValues({
        ...values,
        [event.target.name]: event.target.value
        });
        };

    const client = useApolloClient();

    const [signUp,{loading, error}] = useMutation(SIGNUP_USER, {
        onCompleted: data =>{
            
            localStorage.setItem('token', data.signUp)
            client.writeData({data:{isLoggedIn: true}})
            props.history.push('/')
        }
    })

    useEffect(() =>{
        document.title = 'Sign up - Notedly'
    })
    
    return(
        <>
            <UserForm action={signUp} formType="signUp" />
            {loading && <p>Loading...</p>}
            {error && <p>Error creating a account!</p>}
        </>
    )

}