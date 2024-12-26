import Link from "next/link";
import {createPost} from "@data/content"
import { usePromptContext } from "./context";

const Form = ({type, handleSubmit}) => {
  const {submitting, promptForm, setPromptForm} = usePromptContext();

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {`${type} ${createPost.description}`}
      </p>

      <form onSubmit={handleSubmit} className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
        <label htmlFor="prompt_content">
          <span className="font-semibold text-base text-gray-700"> 
            {createPost.promptLabel}
          </span>
        </label>
        <textarea value={promptForm.prompt} id="prompt_content" onChange={(e)=> setPromptForm({...promptForm, prompt:e.target.value})} placeholder="Write your prompt here..."  className="form_textarea" autoFocus={true} required/>

        <label htmlFor="prompt_tag">
          <span className="font-semibold text-base text-gray-700"> 
            {createPost.promptTag} <span className="font-normal"> (#product, #webdev, #idea)</span>
          </span>
        </label>
        <input value={promptForm.tag} id="prompt_tag" onChange={(e)=> setPromptForm({...promptForm, tag:e.target.value})} placeholder="#tag"  className="form_input" required/>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm"> 
            Cancel
          </Link>
          <button type="submit" disabled={submitting} className="py-1.5 px-5 text-sm bg-primary-orange rounded-full text-white focus:bg-orange-700">
            {submitting ? `${type}...` : type }
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form