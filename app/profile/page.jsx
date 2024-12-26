"use client";

import {useEffect } from "react";
import { useSession } from "next-auth/react";
import Profile from "@components/Profile";
import { DB } from "@data/db";
import { useRouter } from "next/navigation";
import { usePromptContext } from "@components/context";

const ProfilePage =()=> {
    const {data: session} = useSession();
    const router = useRouter();
    const {userDB} = DB();
    const {fetchResponse, posts, setPosts} = usePromptContext();

    if (!(session?.user?.id || userDB.id)) return router.push('/')


    const handleTagClick = (tag)=> {
        console.log("click on tag")
        router.push(`/prompts?tag=${tag}`); // _id
    }

    const handleEdit = (post)=> {
        router.push(`/update-prompt?id=${post.id}`); // _id
    }

    const handleDelete = async(post_)=> {
        const hasConfirmed = confirm("Are you sure you want to delete this prompt ?");
        
        if(hasConfirmed) {
            try {
                await fetchResponse({endpoint:`api/prompt/${post_.id.toString()}`, method: "DELETE", payload:{}});

                const filteredPosts = posts?.filter(post=> post.id !== post_.id)
                setPosts(filteredPosts);
            } catch(error) {
                console.log(error);
            }
        }
    }
    
    useEffect(()=> {
        if (session?.user?.id || userDB.id) fetchResponse({endpoint: `/api/users/${session?.user?.id}/posts`,  method:'GET', payload: {}})
    },[]) 

    return (
        <Profile
          name="My" 
          desc="Welcome to your personalized profile page"
          data={posts}
          handleTagClick ={handleTagClick}
          handleEdit={handleEdit}
          handleDelete = {handleDelete}
        />
    )
}

export default ProfilePage