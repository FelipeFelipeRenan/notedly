import React, {useEffect} from "react";
import { useMutation, gql } from "@apollo/client";
import NoteForm from "../components/NoteForm";

const NEW_NOTE = gql`
    mutation newNote($content: String!){
        newNote(content: $content){
            id
            content
            createdAt
            favoriteCount
            favoritedBy{
                id
                username
            }
            author{
                username
                id
            }
        }
    }

`

export default NewNote = props =>{
    useEffect(() =>{
        document.title = 'New Note - Notedly'
    })

    const [data, {loading, error}] = useMutation(NEW_NOTE,{
        onCompleted: data =>{
            props.history.push(`note/${note.NewNote.id}`)
        }
    })

    return (
    
    <>
        {loading && <p>Loading...</p>}
        {error && <p>Error saving the note</p>}
        <NoteForm action={data}/>
    </>
    )
}