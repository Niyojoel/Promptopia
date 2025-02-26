"use client"

import Form from "@components/Form";
import { usePromptContext } from "@components/context";
import { DB } from "@data/db";
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
        fetchResponse, 
        setSubmitting,
        responseStatus,
        setResponseStatus
    } = usePromptContext();
    const {userDB} = DB();


    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    const updatePrompt = async (e)=> {
        e.preventDefault();
        setSubmitting(true);

        if (!promptId) return alert('Prompt ID is missing');
        console.log(promptForm)
        try {
            const response = await fetchResponse({
               endpoint:`/api/prompt/${promptId}`, 
               method:'PATCH', 
               payload: {...promptForm}
            });

            console.log("before routing back home")
   
            if(response.ok) {
                setResponseStatus("success")
            };

        }catch(error) {
            setResponseStatus("failure");
            console.log(error)
        }
        finally {
            setSubmitting(false);
        }
    };

    useEffect(()=> {
        const getPromptDetails = async (ID) => {
          await fetchResponse({endpoint:`/api/prompt/${ID}`, method:'GET', payload: {}});
        };
        getPromptDetails(promptId);
    }, [promptId])

    useEffect(()=> {
        responseStatus === "success" && router.push('/'); 
        setResponseStatus("");
    }, [responseStatus, setResponseStatus, router])

    if (!(session?.user?.id)) return router.push('/')
    
      console.log(posts)

    return (<Form
            type= "Edit"
            handleSubmit = {updatePrompt}
        />)
} 

export default UpdatePrompt;