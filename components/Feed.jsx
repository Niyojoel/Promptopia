"use client";

import { useEffect} from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { usePromptContext } from "./context";
import PromptCard from "./PromptCard";

const Feed = () => {
  const {posts, fetchResponse,  searchTerm, setSearchTerm} = usePromptContext();
  const searchParams = useSearchParams();

  const router = useRouter();
  const pathname = usePathname();

  //Feed search function
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);

    if(e.target.value !== "") {
      router.push(`/prompts?search=${e.target.value}`);
      return;
    }
    router.push("/");
  }

  //Fetching posts for feed
  const feedPostsFetch = (pathname, params)=> {
    //feed for home page
    if(pathname === "/") {
      console.log("fetching posts")
      fetchResponse({endpoint:"/api/prompt", method:'GET', payload: {}});
    }; 

    //search feed
    if(pathname === `/prompts` && params.get("search")) {
      const search = params.get("search");
      setSearchTerm(search);
      console.log("on search page");
      fetchResponse({endpoint:`/api/prompt?search=${search}`, method:'GET', payload: {}});
    };
  }
  
  useEffect(()=> {
    feedPostsFetch(pathname, searchParams)
  }, [pathname, searchParams]);

  useEffect(()=> {
    searchTerm && fetchResponse({endpoint:`/api/prompt?search=${searchTerm}`, method:'GET', payload: {}});
  },[searchTerm]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input type="text" placeholder="Search for a tag or a username" value={searchTerm} className="search_input peer" onChange={handleSearch} required autoFocus>
        </input>
      </form>
      {pathname === "/prompts" && !posts.length && (
      <div className="flex flex-col gap-5 items-center">
        <h2 className="mt-16 text-gray-600 ">No Prompt field match the search term...  </h2>
        <h1 className=""> You can Sign in and Create one 
        </h1>
      </div>
      )}
      <div className={`prompt_layout mt-15`}>
        {posts?.map(post => post && (
          <PromptCard key={post.id} post={post}/> //_id
        ))}
      </div>
    </section>
  )
}
export default Feed