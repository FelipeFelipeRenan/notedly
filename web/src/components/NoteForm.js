import React,{useState} from "react";


import Button from "./Button";
import styled from "styled-components";

const Wrapper = styled.div`
    height: 100%;

`

const Form = styled.form`
    height: 100%;

`

const TextArea = styled.textarea`
    width: 100% :
    height: 90%;

`

export default NoteForm = props =>{
    const [value, setValue] = useState({content: props.content || ''})

    const onChange = event =>{
        setValue({
            ...value,
            [event.target.name]: event.target.value
        })

    }

    return(
        <Wrapper>
            <Form
                onSubmit={e => {
                    e.preventDefault()
                    props.action({
                        variables: {
                            ...values
                        }
                    })
                }} 
            >
                <TextArea
                    required
                    type="text"
                    name="content"
                    placeholder="Note Content"
                    value={value.content}
                    onChange={onChange}
                
                />
                <Button type="submit">Save</Button>
            </Form>
        </Wrapper>
    )



}