"use client"

import Form from "@components/Form";
import { usePromptContext } from "@components/context";
import { DB } from "@data/db";
import { fetchPosts } from "@utils/useFetch";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

//moved submitting state to context
const UpdatePrompt = ()=> {
    const {data: session} = useSession();
    let router = useRouter();
    const {
        posts,
        promptForm, 
        setPromptForm, 
        fetchResponse, 
        setSubmitting
    } = usePromptContext();
    const {userDB} = DB();

    if (!(session?.user?.id || userDB.id)) return router.push('/')

    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    const updatePrompt = async (e)=> {
        e.preventDefault();
        setSubmitting(true);

        if (!promptId) return alert('Prompt ID is missing');
        console.log(promptForm)
        try {
            const response = fetchResponse({
               endpoint:`/api/prompt/${promptId}`, 
               method:'PATCH', 
               payload: {...promptForm}
            });
   
            if(response) { //response.ok
                router.push("/");
                return;
            };

        }catch(error) {
            console.log(error)
        };
    };

    const getPromptDetails = async (ID) => {
      await fetchResponse({endpoint:`/api/prompt/${ID}`, method:'GET', payload: {}});
    };
    
    useEffect(()=> {
        getPromptDetails(promptId);
    }, [promptId])
    
      console.log(posts)

    return (<Form
            type= "Edit"
            handleSubmit = {updatePrompt}
        />)
} 

export default UpdatePrompt;