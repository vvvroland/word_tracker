import Story from "../models/stories.models.js";

const StoryController = {

    // Add a Story
    addOne: async (req, res) => {
        try {
            console.log(req.body)
            const newStory = await Story.create(req.body);
            console.log(newStory)
            res.json(newStory);
        } catch (error) {
            console.log("~~~~Here~~~~")
            console.log(error);
            res.status(400).json(error);
        }
    },

    // Retrieve all Storys
    getAll: async (req, res) => {
        try {
            console.log(req.body)
            const allStorys = await Story.find();
            res.json(allStorys);
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    },

    // Retreive one Story
    getOne: async (req, res) => {
        try {
            const oneStory = await Story.findById(req.params.id);
            res.json(oneStory);
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    },

    // Edit a Story
    updateOne: async (req, res) => {
        const options = {
            new: true, //returning updated item
            runValidators: true, //run the validation to make sure it follows them. Only updates the items provided, not ones you forgot to update
        };
        try {
            const updatedStory = await Story.findByIdAndUpdate(req.params.id, req.body, options);
            res.json(updatedStory);
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    },

    // Edit a Story
    updateWord: async (req, res) => {
        const options = {
            new: true, //returning updated item
            runValidators: true, //run the validation to make sure it follows them. Only updates the items provided, not ones you forgot to update
        };
        try {
            const updatedStory = await Story.findByIdAndUpdate(req.params.id, req.body, options);
            res.json(updatedStory);
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    },

    // Delete a Story
    deleteOne: async (req, res) => {
        try {
            const deletedStory = await Story.findByIdAndDelete(req.params.id);
            res.json(deletedStory)
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    }
}

export default StoryController;

