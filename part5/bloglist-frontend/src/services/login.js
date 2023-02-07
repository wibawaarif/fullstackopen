import axios from 'axios'
const baseUrl = '/api/login'

const userLogin = async (props) => {
  const request = await axios.post(baseUrl, props)
  return request.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { userLogin }