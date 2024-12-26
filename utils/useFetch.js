import { usePromptContext } from "@components/context";
import { useEffect} from "react";

export const fetchPosts = async (endPoint="GET", method, payload={}) => {

  let storedPosts = JSON.parse(localStorage.getItem("posts")) || [];

  const setStorage =(posts)=> localStorage.setItem("posts", JSON.stringify(posts));

  try {
    if (method === "GET") {
      /*const response = await fetch(endPoint);
      const data = await response.json();
      return data;
      */

      let localResponse = [...storedPosts];

      let searchWord;
      
      if (endPoint.includes('/api/prompt/') && endPoint.split("/")[2]){
         console.log(endPoint.split("/")[3]);
         localResponse = localResponse?.find(
           (response) => response.id === endPoint.split("/")[3]
         );
      }

      if (endPoint.includes("?")){
        searchWord = endPoint.slice(endPoint.indexOf("=") + 1).toLowerCase();
        console.log("endpoint with query");
      }

      if (endPoint.includes("?tag=")) {
        console.log("includes tag")
        console.log(localResponse);
        localResponse = localResponse?.filter(response =>
          response.tag.toLowerCase().includes(searchWord)
        );
        console.log(searchWord);
      }
      if (endPoint.includes("?search=")) {
        console.log(searchWord);
        console.log("the search feed");
        localResponse = localResponse?.filter(
          (response) =>
            response.tag.toLowerCase().includes(searchWord) ||
            response.prompt.toLowerCase().includes(searchWord) ||
            response.author.username.toLowerCase().includes(searchWord) ||
            response.author.email.toLowerCase().includes(searchWord)
        );
      }

      return localResponse; //data
    }

    if (method === "POST" || method === "PATCH") {
      /*const response = await fetch(endPoint, {
        method,
        body: JSON.stringify(payload),
      });
      return response;
      */

      let posts = [...storedPosts];

      if (method === "POST") {
        const duplicatePost = posts?.find(
          (post) => post.prompt.toLowerCase() === payload.prompt.toLowerCase()
        );
        console.log(duplicatePost);
        if (duplicatePost === undefined) {
          storedPosts = [...storedPosts, payload];
          console.log(storedPosts)
          setStorage(storedPosts);
          // return "Prompt successfully created";
        }
        // return "The same prompt already exist";
      }
    }

    if (method === 'PATCH') {
      console.log('patch method on the way')
      console.log(endPoint.split("/")[endPoint.split("/").length - 1])
      storedPosts = storedPosts.map(post => {
        if (post.id === endPoint.split("/")[endPoint.split("/").length - 1]) {
          post = {...post, prompt: payload.prompt, tag: payload.tag };
          console.log(post);
          return post;
        }
        return post;
      });
      setStorage(storedPosts);
    }

    if (method === "DELETE") {
      /*const response = await fetch(endPoint, {
        method,
      });*/

      storedPosts = storedPosts.filter(
        (post) =>
          post.id !== endPoint.split("/")[endPoint.split("/").length - 1]
      );
      setStorage(storedPosts);

      return "Prompt deleted successfully";
    }
    // const data = await response.json();
  } catch (error) {
    console.log(error);
  }
};
