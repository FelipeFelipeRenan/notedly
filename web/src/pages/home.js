import React from "react"
import Button from "../components/Button"

import { useQuery, gql } from "@apollo/client"
import ReactMarkdown from "react-markdown"
import NoteFeed from "../components/NoteFeed"

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
        <>
         <NoteFeed notes={data.noteFeed.notes} />
      {data.noteFeed.hasNextPage && (
        <Button
          onClick={() =>
            fetchMore({
              variables: {
                cursor: data.noteFeed.cursor
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                return {
                  noteFeed: {
                    cursor: fetchMoreResult.noteFeed.cursor,
                    hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                    notes: [
                      ...previousResult.noteFeed.notes,
                      ...fetchMoreResult.noteFeed.notes
                    ],
                    __typename: 'noteFeed'
                  }
                };
              }
            })
          }
        >
          Load more
        </Button>
      )}
            
            </>
            )
        }