import axios from 'axios'
const baseUrl = '/api/login'

const userLogin = async (props) => {
  try {
    const request = await axios.post(baseUrl, props)
    return request.data
  } catch (err) {
    console.log(err);
    return err
  }

}

// eslint-disable-next-line import/no-anonymous-default-export
export default { userLogin }