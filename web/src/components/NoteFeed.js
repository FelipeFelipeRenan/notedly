import React from "react";
import Note from "./Note";

export default NoteFeed = ({notes}) =>{
    return (
        <div>
            {notes.map(note =>{
                <div key={note.id}>
                    <Note note={note}/>
                    
                </div>
            })}
        </div>
    )
}