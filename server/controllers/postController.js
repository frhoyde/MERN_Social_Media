import express from 'express';
import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js'


export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(409).json( { message: err.message } );
  }
}

// export const updatePost = async (req, res) => {
//   const { id: _id } = req.param;

//   const post = req.body;
//   console.log(_id);
//   if(!mongoose.Types.ObjectId.isValid(_id)){
//     return res.status(404).send('No post with that id');
//   }

//   const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true})

//   res.json(updatePost);
// }
export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}
