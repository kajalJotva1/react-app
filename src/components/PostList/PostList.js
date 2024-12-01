import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostService from '../../services/PostService';
import CreatePostDialog from '../CreatePostDialog/CreatePostDialog';
import './PostList.css'; // Import the CSS for this component
import SuccessMessage from '../SuccessMessage/SuccessMessage';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false); // Dialog state
  const [loading, setLoading] = useState(false); 
  const [showMessage, setShowMessage] = useState(false); 
  const [post, setPost] = useState({ title: '', body: '' });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10; // Number of posts per page

  const navigate = useNavigate();  // Initialize navigate function

  // Fetch posts from service
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await PostService.getPosts();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const goToDetail = (id) => {
    navigate(`/posts/${id}`);
  };

  const openCreateDialog = () => {
    setPost({ title: '', body: '' });
    setOpenDialog(true); // Open the dialog when clicking the "Add New Post" button
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCreatePost = (newPost) => {
    const nextIndex = posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1;

    const postWithIndex = { ...newPost, id: nextIndex };

    setPosts((prevPosts) => [...prevPosts, postWithIndex]);
    setShowMessage(true); // Show the success message

    setTimeout(() => setShowMessage(false), 3000);
  };

  // Calculate total pages based on the posts length
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Get posts for the current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page handler
  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="text-center text-uppercase font-weight-bold text-primary">Post List</h2>

        <button className="add-new-btn btn mb-3 float-right" onClick={openCreateDialog}>
          <i className="fas fa-plus-circle"></i> Add New Post
        </button>

        {showMessage && (
          <SuccessMessage message="Post created successfully!" backgroundColor="#28a745" />
        )}
      </div>

      {/* Post Table */}
      <table className="table table-striped table-hover post-list-table">
        <thead> 
          <tr className="text-center">
            <th>ID</th>
            <th>POST</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((post) => (
            <tr key={post.id}>
              <td className="text-center">{post.id}</td>
              <td>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <div className="title-circle d-flex align-items-center justify-content-center">
                      {post.title.charAt(0)}
                    </div>
                    <div className="d-flex flex-column">
                      <h3 className="post-title mb-0">{post.title}</h3>
                    </div>
                  </div>
                  <div className="p-1">
                    <button className="btn view-btn btn-sm" onClick={() => goToDetail(post.id)}>
                      <i className="fas fa-eye"></i> View
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          {/* Previous button */}
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <a className="page-link" href="#" onClick={() => changePage(currentPage - 1)}>
              Previous
            </a>
          </li>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index}
              className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
            >
              <a className="page-link" href="#" onClick={() => changePage(index + 1)}>
                {index + 1}
              </a>
            </li>
          ))}

          {/* Next button */}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <a className="page-link" href="#" onClick={() => changePage(currentPage + 1)}>
              Next
            </a>
          </li>
        </ul>
      </nav>

      {/* Create Post Dialog */}
      <CreatePostDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        handleCreate={handleCreatePost}
      />
    </div>
  );
};

export default PostList;
