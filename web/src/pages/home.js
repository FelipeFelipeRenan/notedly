import React from "react"
import Button from "../components/Button"

import { useQuery, gql } from "@apollo/client"

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
           { console.log(data)}
            The data loaded!

        </div>
    )
}