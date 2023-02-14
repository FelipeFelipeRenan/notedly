import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import {GET_MY_NOTE} from "../gql/query"
import NoteFeed from "../components/NoteFeed"

export default MyNotes = () =>{
    useEffect(() =>{
        // atualizar o titulo do documento
        document.title = 'My Notes - Notedly'
    })

    const {loading, error, data} = useQuery(GET_MY_NOTE)

    if(loading) return <p>Loading...</p>
    if(error) return <p>`Error ${error.message}`</p>

    if (data.me.notes.length !== 0) {
        return <NoteFeed notes={data.me.notes} />
        
    } else {
        return <p>No notes yet</p>
    }
}