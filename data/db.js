import { useEffect, useState } from "react";

const _id = "ac7a5000-c06d-11ef-8bec-e7b70a23110e";

export const DB = () => {
  const [promptIds, setPromptIds] = useState([]);
  const [prompts, setPrompts] = useState([]);

   const userDB = {
    id: _id,
    username: "Jason",
    email: "jason12@gamil.com",
    image: "/assets/images/profile.jpg",
  };

  useEffect(()=> {
    const store = localStorage?.getItem("posts");
    setPrompts(JSON.parse(store && store) || []);
  }, []);

  useEffect(()=> {
    setPromptIds(prompts && prompts.map((post) => post.id));
  }, [])
  
  return {userDB, promptIds}
}
