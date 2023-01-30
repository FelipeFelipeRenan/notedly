import React, { useEffect } from "react";

export default MyNotes = () =>{
    useEffect(() =>{
        // atualizar o titulo do documento
        document.title = 'My Notes - Notedly'
    }, [])
    return(
        <div>
            
            <p>These are my notes</p>
        </div>
    )
}