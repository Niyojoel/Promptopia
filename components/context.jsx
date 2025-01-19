'use client'

import { fetchPosts } from "@utils/useFetch";
import { usePathname, useRouter } from "next/navigation";

const { createContext, useContext, useState} = require("react")

const PromptContext = createContext(null);

export const PromptProvider = ({children})=> {

    const router = useRouter();
    const pathname = usePathname();

    const [promptForm, setPromptForm] = useState({
        prompt: "",
        tag: ""
    });
    const [responseStatus, setResponseStatus] =useState("");
    const [searchTerm, setSearchTerm] = useState("")
    const [searchTag, setSearchTag] = useState("")

    const [submitting, setSubmitting] = useState(false);

    const [posts, setPosts] = useState([]);

    //api call function
    const fetchResponse = async (fetchParams) => {
        const method = fetchParams.method;
        const response  = await fetchPosts(fetchParams.endpoint, fetchParams.method, fetchParams.payload)

        console.log(response);
        const data = await response.json();

        if(method === "GET") populatePosts(data);
        if(method === "GET" && pathname === '/update-prompt') populatePrompt(data);
        
        return response;
    }

    //Syncing local variable with fetched data ----------

    const populatePosts = (data)=> {
        return data ? setPosts(data) : setPosts([]); 
    }

    //for updatePrompt form
    const populatePrompt = (data)=>{
        return data ? setPromptForm({prompt: data.prompt, tag: data.tag}) : setPromptForm({});
    } 

    //Effecting delete on posts
    const updatePosts = (id)=> {
        setPosts(prevPosts => prevPosts.filter(post=> post._id !== id));
    }
    //-----------------------

    const handleTagClick = (tag)=> {
      try{
        router.push(`/prompts?tag=${tag.replace("#", "")}`)
      }catch (error) {
        console.log(error);
      } 
    }

    return <PromptContext.Provider value= {{fetchResponse, updatePosts, posts,  setPosts, promptForm, setPromptForm, searchTerm, setSearchTerm, searchTag, setSearchTag, submitting, setSubmitting, responseStatus, setResponseStatus, handleTagClick}}>
        {children}
    </PromptContext.Provider>
}

export const usePromptContext = ()=> {
    return useContext(PromptContext);
} 