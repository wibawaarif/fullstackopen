import axios from "axios";
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data).catch(err => err.response.data.error)
}

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response)
}

const updatePerson = (id, data) => {
  const request = axios.put(`${baseUrl}/${id}`, data)
  return request.then(response => response.data)
}

const exportedObject = {
  create,
  deletePerson,
  getAll,
  updatePerson,
}

export default exportedObject;