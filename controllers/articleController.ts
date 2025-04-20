import { Request, Response, Router } from "express";
import Article from "../models/article";
import Comment from "../models/comment";
import { CallbackError } from "mongoose";

const router: Router = Router();

router.post('/article', async (req: Request, res: Response) => {
  const data = new Article({
      header: req.body.header,
      content: req.body.content
  })

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave)
  }
  catch (error) {
    res.status(400).json({message: error})
  }
})

router.get('/article', async (req: Request, res: Response) => {
  try{
    const data = await Article.find();
    res.json(data)
  }
  catch(error){
    res.status(500).json({message: error})
  }
})

router.get('/article/:id', async (req: Request, res: Response) => {
  try{
    const data = await Article.findById(req.params.id);
    res.json(data)
  }
  catch(error){
    res.status(500).json({message: error})
  }
})

router.delete('/article/:id', async (req: Request, res: Response) => {
  try{
    const id = req.params.id;
    await Article.findByIdAndDelete(id);
    const data = await Article.find();
    res.send(data);
  }
  catch(error){
    res.status(500).json({message: error})
  }
})

router.put('/article/:id', async (req: Request, res: Response) => {
  try{
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };  

    const result = await Article.findByIdAndUpdate(
        id, updatedData, options
    )

    res.send(result)
  }
  catch(error){
    res.status(500).json({message: error})
  }
})


router.post('/article/:id/comment', async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
  
      // save the comment
      const newComment = new Comment({
        date: new Date(),
        content: req.body.content,
        article: id
      });
  
      const savedComment = await newComment.save(); 
  
      // Update the article 
      const updatedArticle = await Article.findByIdAndUpdate(
        id,
        { $push: { comments: savedComment._id } },
        { new: true }
      );
  
      res.status(200).json(updatedArticle);
    } catch (error) {
      res.status(500).json({ message: "Error posting comment", error });
    }
});


router.get('/article/:id/comment', async (req: Request, res: Response) => {
    try{
      const id = req.params.id;
  
      const result = await Article.findById(id).populate("comments");
    
      res.send(result);
    }
    catch(error){
      res.status(500).json({message: error})
    }
})


export default router;