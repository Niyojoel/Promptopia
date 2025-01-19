"use client"

import { svgs } from "@data/content";
import { DB } from "@data/db"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link";
import { usePathname} from "next/navigation"
import { useState } from "react"

//moved handleTagClick to context
const PromptCard = ({post, handleEdit, handleDelete, handleTagClick}) => {
  const {data: session} = useSession();
  const {userDB} = DB();
  const pathname = usePathname();

  const [copied, setCopied] = useState("")

  const handlePromptCopy = ()=> {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  }

  return (
    <article className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3">
          <Link href="/profile">
            <Image 
            src={post?.author?.image || userDB.image} alt="user_image" 
            width={40} 
            height={40} 
            className="rounded-full object-contain"
            />
          </Link>
          <div className="flex flex-col">
            <Link href="/profile">
              <h3 className="font-satoshi font-semibold text-gray-900">{post?.author?.username}</h3>
            </Link>
            <p className="font-inter text-sm text-gray-500">{post?.author?.email || userDB.email}</p>
          </div>
        </div>
        <div className="copy_btn" onClick={handlePromptCopy}>
          <Image src={copied === post.prompt ? svgs.tick : svgs.copy} width={12} height={12} alt="copy-svg"/>
        </div>
      </div>
      <p className="my-4 font-satoshi text-[15px] text-gray-700">{post.prompt}</p>
      <div className="flex gap-3">
        {Object.values(post.tag.replace("  ", " ").split(" ")).map((tag, index) => (
          <p key={`${tag}${index}`} className="font-inter text-sm blue_gradient cursor-pointer" onClick={()=> {handleTagClick && handleTagClick(tag)}}>
            <span className="text-gray-500">#</span>{tag.includes("#") ? tag.replace("#",'') : tag}
          </p>
          )
        )}
      </div>
      
      {(session?.user?.id === post?.author?._id && pathname ==="/profile") && (
        <div className="mt-3 flex-center gap-6 border-t border-gray-100 pt-3">
          <p className="font-inter text-sm green_gradient cursor-pointer" onClick={() => handleEdit && handleEdit(post)}>
            Edit
          </p>
          <p className="font-inter text-sm orange_gradient cursor-pointer" onClick={() => handleDelete && handleDelete(post)}>
            Delete
          </p>
        </div>
      )}
    </article>
  )
}

export default PromptCard