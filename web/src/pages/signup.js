import React, { useEffect } from "react";
import styled from "styled-components";
import Button from "../components/Button";

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
    useEffect(() =>{
        document.title = 'Sign up - Notedly'


    })

    return(
        <Wrapper>
            <h2>Sign Up</h2>
            <Form>
                <label htmlFor="username">Username:</label>
                <input 
                    required
                    type="text" 
                    id="username"
                    name="username" 
                    placeholder="Username"
                />
                <label htmlFor="email">Email:</label>
                <input 
                    required
                    type="email" 
                    id="email"
                    name="email" 
                    placeholder="Email"
                />
                <label htmlFor="password">Password</label>
                <input 
                    type="password"
                    id="password" 
                    name="password" 
                    placeholder="Password"
                />
                <Button type="submit">Submit</Button>
            </Form>
        </Wrapper>
    )

}