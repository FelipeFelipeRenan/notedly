import React, {useEffect} from "react";
import { useMutation, gql } from "@apollo/client";

export default NewNote = props =>{
    useEffect(() =>{
        document.title = 'New Note - Notedly'
    })

    return <div>
        New note
    </div>
}