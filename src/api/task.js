import axios from '@/libs/api.request'
import Axios from 'axios'
import baseURL from '_conf'

export const connectVpn = ({vpnInfo}) => {
  return axios.request({
    url: baseURL.localUrl + '/connectVpn',
    params: vpnInfo,
    method: 'post'
  })
}

// by rand()
export const getTask = ({startDate}) => {
  return axios.request({
    url: baseURL.baseUrl + '/getTask/' + startDate,
    method: 'get'
  })
}

// by id
export const getTaskById = ({taskId}) => {
  return axios.request({
    url: baseURL.baseUrl + '/getTask/' + taskId,
    method: 'get'
  })
}

export const disConnectVpn = () => {
  Axios.get(baseURL.localUrl + '/disConnect')
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
}
