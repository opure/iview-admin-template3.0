import axios from '@/libs/api.request'
import Axios from 'axios'

export const login = ({ userName, password }) => {
  const data = {
    password: password,
    username: userName,
    grant_type: 'password',
    scope: 'read write'
  }
  return Axios.request({
    url: 'http://localhost:8111/oauth/token',
    headers: {
      'Authorization': 'Basic MTAwMDE6bXlvbmVsZXIxMjM=',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: data,
    method: 'post'
  })
}

export const getUserInfo = () => {
  return axios.request({
    url: 'http://localhost:8111/api/v2/user/userInfo',
    method: 'get'
  })
}

export const logout = () => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}
