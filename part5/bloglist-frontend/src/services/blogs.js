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

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  postBlog
}