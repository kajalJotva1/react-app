import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material'; 
import PostService from '../../services/PostService';  // Assuming you have PostService to handle API calls
import './PostEditDialog.css';

const EditPostDialog = ({ open, handleClose, postId, handleUpdate }) => {
  const [post, setPost] = useState({
    title: '',
    body: ''
  });

  useEffect(() => {
    // Fetch the post data when dialog opens
     console.log(postId,"///")
    if (open) {
      const fetchPost = async () => {
        const data = await PostService.getPost(postId);
        setPost(data);
      };
      fetchPost();
    }
  }, [open, postId]);

  const onUpdate = () => {
    // Handle the update
    PostService.updatePost(postId, post)
      .then((response) => {
        handleUpdate(post);
        handleClose();
      })
      .catch((error) => {
        console.error("Error updating post:", error);
      });
  };

  const onCancel = () => {
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Post</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          margin="normal"
        />
        <TextField
          label="Body"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={post.body}
          onChange={(e) => setPost({ ...post, body: e.target.value })}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary" className='cancel-btn'>
          Cancel
        </Button>
        <Button onClick={onUpdate} color="primary" className='update-btn'>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPostDialog;
