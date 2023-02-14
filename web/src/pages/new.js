import React, {useEffect} from "react";
import { useMutation, gql } from "@apollo/client";
import NoteForm from "../components/NoteForm";
import { NEW_NOTE } from "../gql/mutation";
import { GET_NOTES } from "../gql/query";



export default NewNote = props =>{
    useEffect(() =>{
        document.title = 'New Note - Notedly'
    })

    const [data, {loading, error}] = useMutation(NEW_NOTE,{
        refetchQueries: [{query: GET_NOTES}],
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