import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req)=> {
    const query = req.url.split('?')[1];
    const queryString = query?.split("=")[1];

    try {
        await connectToDB();
        
        let prompts = await Prompt.find({}).populate("author");


        if (query?.includes("tag")) prompts = prompts
          .filter((prompt) => prompt.tag.includes(queryString))

        if (query?.includes("search"))
          prompts = prompts.filter(prompt =>
              prompt.tag.toLowerCase().includes(queryString) ||
              prompt.prompt.toLowerCase().includes(queryString) ||
              prompt.author?.username?.toLowerCase().includes(queryString) ||
              prompt.author?.email?.toLowerCase().includes(queryString)
            )

        return new Response(JSON.stringify(prompts), {status: 200})
        
    } catch(error) {
        console.log(error);
        return new Response ("Failed to fetch all prompts", {status: 500})
    }
}