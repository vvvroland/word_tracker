import { Router } from "express";
import StoryController from "../controllers/stories.controllers.js";
console.log(StoryController)


const router = Router();

router.route('/stories')
    .get(StoryController.getAll)
    .post(StoryController.addOne);

router.route("/stories/:id")
    .get(StoryController.getOne)
    .put(StoryController.updateOne)
    .delete(StoryController.deleteOne);



export default router;