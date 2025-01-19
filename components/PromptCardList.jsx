"use client"

import { usePathname, useSearchParams } from "next/navigation";
import PromptCard from "./PromptCard";
import { usePromptContext } from "./context";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const PromptCardList = ({margin, handleDelete, handleEdit})=> {
    const {data: session} = useSession();
    const {posts, fetchResponse, handleTagClick, setPosts} = usePromptContext();
    
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);

    const postFetchByTag = (pathname, params)=> {
        //feed for tag filter
        if(pathname === `/prompts` && params.get("tag")) {
            const tag = params.get("tag");
            console.log("on tag filter page")
            fetchResponse({endpoint:`/api/prompt?tag=${tag}`,  method:'GET', payload: {}}); 
        }

        if(pathname === '/profile' && session?.user?.id) {
            fetchResponse({endpoint: `/api/users/${session?.user?.id}/posts`, method:'GET', payload: {}})
        };
        setIsLoading(false);
    }
    
    useEffect(()=> {
        setIsLoading(true);
        setPosts(null)
        postFetchByTag(pathname, searchParams);
    }, [pathname]);


    return (
        <>
            {isLoading && (<h2 className="mt-16 text-gray-600 items-center">Loading Prompts... </h2>)}
            <div className={`prompt_layout mt-${margin} opacity-0 transition-opacity duration-500 ${posts?.length && "opacity-100"} `}>
                {posts !== null && posts?.map(post => (
                <PromptCard
                    key={post._id} 
                    post={post} 
                    handleEdit={handleEdit} 
                    handleTagClick={handleTagClick}
                    handleDelete={handleDelete}/>
                ))}
            </div>
        </>
    )
};

export default PromptCardList;