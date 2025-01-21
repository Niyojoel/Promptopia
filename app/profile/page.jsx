"use client";

import {useEffect } from "react";
import { useSession } from "next-auth/react";
import Profile from "@components/Profile";
import { useRouter } from "next/navigation";
import { usePromptContext } from "@components/context";

const ProfilePage =()=> {
    const {data: session} = useSession();
    const router = useRouter();
    const {fetchResponse, updatePosts} = usePromptContext();

    const handleEdit = (post)=> {
        router.push(`/update-prompt?id=${post._id}`);
    }

    const handleDelete = async(post_)=> {
        const hasConfirmed = confirm("Are you sure you want to delete this prompt ?");
        
        console.log(hasConfirmed);
        if(hasConfirmed) {
            try {
                await fetchResponse({endpoint:`api/prompt/${post_._id.toString()}`, method:"DELETE", payload:{}});
                updatePosts(post_._id)
            } catch(error) {
                console.log(error);
            }
        }
    }

    useEffect(()=> {
    if (!session?.user?.id) {
        router.replace("/");
    }
    },[session, router])

    return (
        <Profile
          name="My" 
          desc="Welcome to your personalized profile page"
          handleEdit={handleEdit}
          handleDelete = {handleDelete}
        />
    )
}

export default ProfilePage