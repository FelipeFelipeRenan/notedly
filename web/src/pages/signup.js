import React, { useEffect } from "react";

export default SignUp = props =>{
    useEffect(() =>{
        document.title = 'Sign up - Notedly'


    })

    return(
        <div>
            <form>
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
                <button type="submit">Submit</button>
            </form>
        </div>
    )

}