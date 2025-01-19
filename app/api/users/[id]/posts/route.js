import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, {params})=> {
    try {
        await connectToDB();

        const params_ = await params;

        const prompts = await Prompt.find({author: params_.id}).populate("author");
        return new Response(JSON.stringify(prompts), {status: 200})
        
    } catch(error) {
        console.log(error);
        return new Response ("Failed to fetch all prompts", {status: 500})
    }
}