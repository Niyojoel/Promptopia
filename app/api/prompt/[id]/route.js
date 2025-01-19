import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, {params}) => {
  try {
    await connectToDB();

    const params_ = await params

    const prompt = await Prompt.findById(params_.id).populate("author");

    if(!prompt) return new Response ("Prompt not found", {status: 404})
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  try {
    await connectToDB();

    const params_ = await params;

    const {prompt, tag} = await req.json();

    let existingPrompt = await Prompt.findById(params_.id);

    if(!existingPrompt) return new Response("Prompt not found", { status: 404 });

    existingPrompt = {...existingPrompt, prompt, tag};

    await existingPrompt.save();
    
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};

export const DELETE = async (req, {params}) => {
  try {
    await connectToDB();

    const params_ = await params;

    const existingPrompt = await Prompt.findById(params_.id);

    if (!existingPrompt) return new Response("Prompt not found", { status: 404 });

    await Prompt.findByIdAndDelete(params_.id);

    return new Response(JSON.stringify("Prompt declared successfully"), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to delete prompts", { status: 500 });
  }
};
