"use client";

import { useEffect} from "react"
import PromptCard from "./PromptCard";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { usePromptContext } from "./context";

const Feed = () => {
  const {posts, fetchResponse,  searchTerm, setSearchTerm, submitting, setSubmitting} = usePromptContext();
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

  const handleTagClick = (tag)=> {
    try{
      router.push(`/prompts?tag=${tag.replace("#", "")}`)
    }catch (error) {
        console.log(error);
    } 
  }

  const feedFetch = (pathname, params)=> {
    //feed for home page
    if(pathname === "/") {
      console.log("fetching posts")
      fetchResponse({endpoint:"/api/prompt", method:'GET', payload: {}});
      return;
    }; 

    //feed for tag filter
    if(pathname === `/prompts` && params.get("tag")) {
      const tag = params.get("tag");
      console.log("on tag filter page")
      fetchResponse({endpoint:`/api/prompt?tag=${tag}`,  method:'GET', payload: {}}); 
      return;
    }

    //search feed
    if(pathname === `/prompts` && params.get("search")) {
      const search = params.get("search");
      setSearchTerm(search);
      console.log("on search page");
      fetchResponse({endpoint:`/api/prompt?search=${search}`, method:'GET', payload: {}});
      return;
    };
  }
  
  useEffect(()=> {
    feedFetch(pathname, searchParams)
  }, [pathname, searchParams]);

  useEffect(()=> {
    searchTerm && fetchResponse({endpoint:`/api/prompt?search=${searchTerm}`, method:'GET', payload: {}});
  },[searchTerm]);

  console.log(posts)
  console.log(pathname)

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input type="text" placeholder="Search for a tag or a username" value={searchTerm} className="search_input peer" onChange={handleSearch} required autoFocus>
        </input>
      </form>
      <PromptCardList data={posts} handleTagClick={handleTagClick}/>
    </section>
  )
}

const PromptCardList = ({data, handleTagClick})=> {
  return (
    <div className="prompt_layout mt-16">
      {data?.map(post => post && (
        <PromptCard key={post.id} post={post} handleTagClick={handleTagClick}/> //_id
      ))}
    </div>
  )
}
export default Feed