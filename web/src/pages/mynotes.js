import { useEffect } from "react";

export default MyNotes = () =>{
    useEffect(() =>{
        // atualizar o titulo do documento
        document.title = 'My Notes - Notedly'
    }, [])
    return(
        <div>
            <h1>Notedly</h1>
            <p>These are my notes</p>
        </div>
    )
}