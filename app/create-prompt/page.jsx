"use client"

import Form from "@components/Form";
import { usePromptContext } from "@components/context";
import { DB } from "@data/db";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {v4 as uuidv4} from 'uuid';

//moved submitting state to context
const CreatePrompt = ()=> {
    const {data: session} = useSession();
    const {promptForm, fetchResponse, setSubmitting, responseStatus, setResponseStatus} = usePromptContext();
    let router = useRouter();
    const {userDB} = DB();

    if (!(session?.user?.id || userDB.id)) return router.push('/')

    const createPrompt = async (e)=> {
        e.preventDefault();
        setSubmitting(true);

        try {
            const newPrompt = {userId: session?.user?.id, ...promptForm}; 
            const response = await fetchResponse({
                endpoint:"api/prompt/new", 
                method:'POST', 
                payload: {...newPrompt}
            });

            if(response.ok) {
                setResponseStatus("success")
            };
            
        }catch(error) {
            setResponseStatus("failure");
            console.log(error)
        }finally {
            setSubmitting(false);
        }
    }

    useEffect(()=> {
        responseStatus === "success" && router.push('/'); 
        setResponseStatus("");
    }, [responseStatus])

    return (<Form
        type= "Create"
        handleSubmit = {createPrompt}
    />)
} 

export default CreatePrompt;