import axios from '@/libs/api.request'
import Axios from 'axios/index'

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

export const getUserInfo = (token) => {
  return axios.request({
    url: 'get_info',
    params: {
      token
    },
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}
