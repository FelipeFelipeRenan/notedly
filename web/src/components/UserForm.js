import React, { useEffect, useState } from "react";
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
export default UserForm = props =>{

    const [values, setValues] = useState()

    const onChange = event => {
        setValues({
        ...values,
        [event.target.name]: event.target.value
        });
        };
    
    return(
        <Wrapper>
            {props.formType === 'signup' ? <h2>Sign Up</h2> : <h2>Sign In</h2>}
            <h2>Sign Up</h2>
            <Form
                onSubmit={event =>{
                    event.preventDefault()
                    props.action({
                        variables: {
                            ...values
                        }
                    })
                }}
                >
                {props.formType === 'signup' && (<>
                <label htmlFor="username">Username:</label>
                <input 
                    required
                    type="text" 
                    id="username"
                    name="username" 
                    placeholder="Username"
                    onChange={onChange}
                />
                
                </>)}

                <label htmlFor="email">Email:</label>
                <input 
                    required
                    type="email" 
                    id="email"
                    name="email" 
                    placeholder="Email"
                    onChange={onChange}
                />
                <label htmlFor="password">Password</label>
                <input 
                    type="password"
                    id="password" 
                    name="password" 
                    placeholder="Password"
                    onChange={onChange}
                />
                <Button type="submit">Submit</Button>
            </Form>
        </Wrapper>
    )

}