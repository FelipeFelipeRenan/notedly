import { gql, useApolloClient, useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import UserForm from "../components/UserForm";

const SIGNIN_USER = gql`
    mutation signIn($email: String, $password: String!){
        signIn(email: $email, password: $password)
    }

`


export default SignIn = props =>{
    useEffect(() =>{
        document.title = 'Sign In - Notedly'
    })

    const client = useApolloClient()
    const [signIn, {loading, error}] = useMutation(SIGNIN_USER,{
        onCompleted: data =>{
            localStorage.setItem('token', data.signIn)

            client.writeData({data: {isLoggedIn: true}})

            props.history.push('/')
        }
    })

    return (
        <>
            <UserForm action={signIn} formType="signin" />
            {loading && <p>Loading..</p>}
            {error && <p>Error signing in!</p>}
        </>
    )


}