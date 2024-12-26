'use client'

import { fetchPosts } from "@utils/useFetch";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const { createContext, useContext, useState, useEffect } = require("react")

const PromptContext = createContext(null);

export const PromptProvider = ({children})=> {

    const router = useRouter();
    const pathname = usePathname();

    const [promptForm, setPromptForm] = useState({
        prompt: "",
        tag: ""
    });
    const [searchTerm, setSearchTerm] = useState("")
    const [searchTag, setSearchTag] = useState("")

    const [submitting, setSubmitting] = useState(false);

    const [posts, setPosts] = useState([]);

    //api call function
    const fetchResponse = async (fetchParams) => {
        const response  = await fetchPosts(fetchParams.endpoint, fetchParams.method, fetchParams.payload)
        // console.log(response);

        
        if(fetchParams.method = "GET") {
            console.log(pathname)
            if(pathname === '/update-prompt') {
                return response ? setPromptForm({prompt: response.prompt, tag: response.tag}) : setPromptForm({}); //setPosts(response.data);
            }
            response ? setPosts(response) : setPosts([]); //setPosts(response.data);
        }
        // return response;
    }

    const handleTagClick = (tag)=> {
      try{
        router.push(`/prompts?tag=${tag.replace("#", "")}`)
      }catch (error) {
        console.log(error);
      } 
    }

    return <PromptContext.Provider value= {{fetchResponse, posts,  setPosts, promptForm, setPromptForm, searchTerm, setSearchTerm, searchTag, setSearchTag, submitting, setSubmitting, handleTagClick}}>
        {children}
    </PromptContext.Provider>
}

export const usePromptContext = ()=> {
    return useContext(PromptContext);
} 