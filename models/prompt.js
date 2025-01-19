import {models, model, Schema} from 'mongoose';

const PromptSchema = new Schema ({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    prompt: {
        type: String,
        required: [true, "Prompt Content is required"]
    },
    tag: {
        type: String,
        required: [true, "Tag is required"]
    },
})

const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;