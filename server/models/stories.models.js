import {model, Schema} from 'mongoose';
const StorySchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Every story has a title!"],
            minlength: [2, "Your title must be at least 2 characters."],
            maxlength: [255, "That's not a title; that's an essay! Less than 255 characters please!"]
        },
        genre: {
            type: String,
            required: [true, "Micro-genres are acceptable, but no genre is not!"],
            minlength: [3, "A genre should be at least 3 characters"],
            maxlength: [255, "That's not a genre; that's a whole essay. Less than 255 characters please!"],
        },
        tagline: {
            type: String,
            required: [true, "A quick catchy hook is needed"],
            minlength: [10, "A tagline should be quick, but longer than 10 characters"],
            maxlength: [100, "A couple of sentences should be sufficient for a tagline!"],
        },
        description: {
            type: String,
            required: [true, "A little more room to describe your story"],
            minlength: [10, "Your description longer than 10 characters"],
            maxlength: [1000, "Save some characters for your story!"],
        },
        count: {
            type: Number,
            default:0
        },
        dailyGoal: {
            type: Number
        },
        history: {
            type: Array
        },
        daily: {
            type: Array
        },
        completed:{
            type: Boolean,
            default:false
        }
    },
    { timestamps: true }
);
const Story = model("Story", StorySchema);
export default Story;
