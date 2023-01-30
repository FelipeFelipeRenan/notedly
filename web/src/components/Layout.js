import React from "react";

import Header from './Header';
import Navigation from "./Navigation";

export default Layout = ({children}) =>{
    return (
        <>
            <Header />
            <div className="wrapper">
                <Navigation />
                <main>
                    {children}
                </main>
                
            </div>
        </>
    )
}