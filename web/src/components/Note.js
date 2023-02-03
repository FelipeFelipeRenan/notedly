import React from "react";
import ReactMarkdown from "react-markdown";

export default Note = ({note}) =>{
    return (
        <article>
            <img src={note.author.avatar} 
            alt={`${note.author.username} avatar`} 
            height="50px"
            />{' '}
            
            {note.author.username} {note.createdAt} {note.favoriteCount}{' '}
            
            <ReactMarkdown source={note.content} />

        </article>
    )
}