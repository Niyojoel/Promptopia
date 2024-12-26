import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async ({params})=> {
    try {
        await connectToDB();

        const{tag, searchTerm} = params;

        let prompts = await Prompt.find({}).populate("author");

        if (tag) prompts = prompts.filter(prompt => prompt.tag.includes(tag));

        if (searchTerm) prompts = prompts.filter(
          (prompt) =>
            prompt.tag.toLowerCase().includes(searchTerm) ||
            prompt.prompt.toLowerCase().includes(searchTerm) ||
            prompt.author.username.toLowerCase().includes(searchTerm) ||
            prompt.author.email.toLowerCase().includes(searchTerm)
        );

        return new Response(JSON.stringify(prompts), {status: 200})
        
    } catch(error) {
        console.log(error);
        return new Response ("Failed to fetch all prompts", {status: 500})
    }
}