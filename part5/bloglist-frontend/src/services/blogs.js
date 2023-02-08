import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const postBlog = async (props) => {
  const request = await axios.post(baseUrl, props, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
  return request.data
}

const updateBlog = async (props) => {
  const request = await axios.put(`${baseUrl}/${props.id}`, props, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })

  return request.data
}

const deleteBlog = async (id) => {
  const request = await axios.delete(`${baseUrl}/${id}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })

  return request.data
}

export default {
  getAll,
  postBlog,
  updateBlog,
  deleteBlog
}