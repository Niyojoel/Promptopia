"use client"

import Form from "@components/Form";
import { usePromptContext } from "@components/context";
import { DB } from "@data/db";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {v4 as uuidv4} from 'uuid';

//moved submitting state to context
const CreatePrompt = ()=> {
    const {data: session} = useSession();
    const {promptForm, fetchResponse, setSubmitting} = usePromptContext();
    let router = useRouter();
    const {userDB} = DB();

    if (!(session?.user?.id || userDB.id)) return router.push('/')

    const createPrompt = async (e)=> {
        e.preventDefault();
        setSubmitting(true);

        try {
           const newPrompt = {id: uuidv4(), author: {...userDB}, ...promptForm}; 
            const response = fetchResponse({
                endpoint:"api/prompt/new", 
                method:'POST', 
                payload: {...newPrompt}
            });

            if(response) { //response.ok
                router.push('/');
                return;
            };
            
        }catch(error) {
            console.log(error)
        };
    }

    return (<Form
        type= "Create"
        handleSubmit = {createPrompt}
    />)
} 

export default CreatePrompt;