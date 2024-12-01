import axios from 'axios';

const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

const PostService = {

  // Get all posts
  getPosts: async () => {
    try {
      const response = await axios.get(apiUrl);
      return response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  },

  // Get a specific post by ID
  getPost: async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching post with ID ${id}:`, error);
      throw error;
    }
  },

  // Create a new post
  createPost: async (post) => {
    try {
      const response = await axios.post(apiUrl, post);
      return response.data;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  },

  // Update an existing post
  updatePost: async (id, postData) => {
    try {
      const response = await axios.put(`${apiUrl}/${id}`, postData);
      return response.data;
    } catch (error) {
      console.error(`Error updating post with ID ${id}:`, error);
      throw error;
    }
  },

  // Delete a post
  deletePost: async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting post with ID ${id}:`, error);
      throw error;
    }
  }

};

export default PostService;
