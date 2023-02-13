import React, {useEffect} from "react";
import { useMutation, gql } from "@apollo/client";
import NoteForm from "../components/NoteForm";

export default NewNote = props =>{
    useEffect(() =>{
        document.title = 'New Note - Notedly'
    })

    return <NoteForm />
}