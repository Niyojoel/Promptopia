import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async ({params})=> {
    try {
        await connectToDB();

        const{tag, searchTerm} = params;

        const prompts = await Prompt.find({
            tag: tag || ""
            // prompt: 
            
        }).populate("author");
        return new Response(JSON.stringify(prompts), {status: 200})
        
    } catch(error) {
        console.log(error);
        return new Response ("Failed to fetch all prompts", {status: 500})
    }
}