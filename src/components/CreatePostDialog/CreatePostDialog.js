import React, { useState ,useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import PostService from '../../services/PostService'; // Assuming PostService handles API calls
import './CreatePostDialog.css'

const CreatePostDialog = ({ open, handleClose, handleCreate }) => {
  const [post, setPost] = useState({ title: '', body: '' });


  useEffect(() => {
    if (!open) {
      setPost({ title: '', body: '' });
    }
  }, [open]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreatePost = async () => {
    try {
      const newPost = await PostService.createPost(post); // Create post through the API
      handleCreate(newPost); 
      handleClose(); // Close the dialog after creating the post
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create New Post</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          name="title"
          value={post.title}
          onChange={handleInputChange}
          margin="normal"
        />
        <TextField
          label="Body"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          name="body"
          value={post.body}
          onChange={handleInputChange}
          margin="normal"
        />
      </DialogContent>
      <DialogActions className='mb-2 mx-3'> 
        <Button onClick={handleClose} className="cancel-btn">
          Cancel
        </Button>
        <Button onClick={handleCreatePost} className="create-btn" >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePostDialog;
