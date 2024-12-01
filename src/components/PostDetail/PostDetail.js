import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useParams to get route params and useNavigate for navigation
import PostService from '../../services/PostService'; 
import EditPostDialog from '../PostEditDialog/PostEditDialog';  // Assuming EditPostDialog is a separate component
import './PostDetail.css'; // Assuming you have a PostService
import SuccessMessage from '../SuccessMessage/SuccessMessage';


const PostDetail = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams(); // Retrieve the post id from the URL parameters
  const navigate = useNavigate(); // To navigate programmatically
  const [openDialog, setOpenDialog] = useState(false); // State to control dialog visibility
  const [showMessage, setShowMessage] = useState(false); 
  const [message, setMessage] = useState('');
  const [bgColor, setBgColor] = useState('green');  
  
  useEffect(() => {
    // Fetch the post data from your service or API based on the ID
    const fetchPost = async () => {
      const data = await PostService.getPost(id); // Assuming PostService has a method to get post by ID
      setPost(data);
    };

    fetchPost();
  }, [id]); // Re-fetch when id changes

  const editPost = () => {
    setOpenDialog(true);  // Open the dialog when clicking the "Edit" button
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog
  };

  const handleUpdatePost = (updatedPost) => {
    setPost(updatedPost); // Update the post with the updated data
    setShowMessage(true); // Show the success message
    setMessage('Post updated successfully!');
    setBgColor('#28a745');  // Green background for success
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);

    setOpenDialog(false); // Close the dialog after updating
  };

  const deletePost = () => {
    PostService.deletePost(id); // Assuming PostService has a method to delete the post
    setMessage('Post deleted successfully!');
    setBgColor('#e93c3c');
    setShowMessage(true); 
    setTimeout(() => {
        setShowMessage(false); // Hide the message
        navigate('/'); // Navigate after the message is hidden
    }, 3000);
  };

  if (!post) {
    return <div>Loading...</div>; // Loading state while fetching the post data
  }

  return (
    <div className="container detail-container mt-5">
      <h2 className="post-header-text">Post Detail</h2>
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="d-flex align-items-center mb-1">
            <div className="title-circle d-flex align-items-center justify-content-center">
              {post.title.charAt(0)}
            </div>
            <h2 className="card-title ml-3">{post.title}</h2>
          </div>
          <p className="card-text">{post.body}</p>
          <div className="d-flex">
            <button className="btn mr-2 edit-btn" onClick={editPost}>Edit</button>
            <button className="btn delete-btn mr-2" onClick={deletePost}>Delete</button>
          </div>
        </div>
      </div>

        {/* Display the Success Message */}
        {showMessage && (
            <SuccessMessage message={message} backgroundColor={bgColor} />
        )}

      {/* EditPostDialog Component */}
      <EditPostDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        postId={post.id}
        handleUpdate={handleUpdatePost}
      />
    </div>
  );
};

export default PostDetail;
