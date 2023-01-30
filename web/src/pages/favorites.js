import React ,{ useEffect } from "react";

export default Favorites  = () =>{
    useEffect(() => {
        
        document.title = 'Favorites - Notedly'

    })

    return(
        <div>
            
            <p>These are my favorites</p>
        </div>
    )
    
}