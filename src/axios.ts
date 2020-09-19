import Axios from 'axios'

const apiClient = Axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default apiClient