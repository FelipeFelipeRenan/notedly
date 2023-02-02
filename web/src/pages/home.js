import React from "react"
import Button from "../components/Button"

import { useQuery, gql } from "@apollo/client"
import ReactMarkdown from "react-markdown"

// Query do GraphQl 
const GET_NOTES = gql`
    query NoteFeed($cursor: String){
        noteFeed(cursor: $cursor){
            cursor
            hasNextPage
            notes{
                id
                createdAt
                content
                favoriteCount
                author{
                    username
                    id
                    avatar
                }
            }
        }
    }

`

export default Home = () =>{

    const {data, loading, error, fetchMore} = useQuery(GET_NOTES)
    
    loading?<p>Loading!</p>:<p>Error!</p>;
    
    return(
        <div>
            {data.noteFeed.notes.map(note =>{
                
                <article key={note.id}>
                    <img src={note.author.avatar} 
                    alt={`${note.author.username} avatar`}
                    height="50px"
                    />{' '}
                    {note.author.username} {note.createdAt} {note.favoriteCount}{' '}
                    <ReactMarkdown source={note.content}/>
                    
                </article>
            })}
        </div>
    )
}