"use client"

import Form from "@components/Form";
import { usePromptContext } from "@components/context";
import { DB } from "@data/db";
import { fetchPosts } from "@utils/useFetch";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const UpdatePrompt = ()=> {
    const {data: session} = useSession();
    let router = useRouter();
    const {promptForm, setPromptForm} = usePromptContext();
    const {userDB} = DB();

    if (!(session?.user?.id || userDB.id)) return router.push('/')

    const [submitting, setSubmitting] = useState(false);
    
    const searchParams = useSearchParams();

    const promptId = searchParams.get('id');

    const updatePrompt = async (e)=> {
        e.preventDefault();
        setSubmitting(true);

        if (!promptId) return alert('Prompt ID is missing');

        try {
            const response = fetchResponse({
               endpoint:`/api/prompt/${promptId}`, 
               method:'PATCH', 
               payload: {...promptForm}
            });
   
            if(response) { //response.ok
                router.push('/');
                return;
            };

        }catch(error) {
            console.log(error)
        };
    };

    useEffect(()=> {
        const getPromptDetails = async () => {
        const response = fetchResponse({endpoint:`/api/prompt/${promptId}`, method:'GET', payload: {}})
        
        const localResponse = response?.find(resp => resp.id === promptId);
        const {prompt, tag} = localResponse;
        console.log(localResponse);
        setPromptForm({prompt, tag});
        };
        if(promptId) getPromptDetails();
    }, [promptId])

    return (<Form
            type= "Edit"
            post = {promptForm}
            setPost = {setPromptForm}
            submitting = {submitting}
            handleSubmit = {updatePrompt}
        />)
} 

export default UpdatePrompt;