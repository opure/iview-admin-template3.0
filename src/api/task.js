import axios from '@/libs/api.request'
import Axios from 'axios'
import baseURL from '_conf'

export const connectVpnRequest = ({vpnInfo}) => {
  return Axios.request({
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

// save task
export const saveTask = ({completeInfo}) => {
  return axios.request({
    url: baseURL.baseUrl + '/taskInfo',
    params: completeInfo,
    method: 'put'
  })
}

// repluse task
export const repluseTask = ({errorInfo}) => {
  return axios.request({
    url: baseURL.baseUrl + '/repluseTask',
    params: errorInfo,
    method: 'put'
  })
}

// bind card
export const bindCard = ({accountId}) => {
  return axios.request({
    url: baseURL.baseUrl + '/bindCard/' + accountId,
    method: 'put'
  })
}

// switch acccount
export const swtichAccount = ({taskId, status}) => {
  return axios.request({
    url: baseURL.baseUrl + '/refreshAccount/' + taskId + '/' + status,
    method: 'put'
  })
}

// get code
export const getCode = ({email}) => {
  return axios.request({
    url: baseURL.baseUrl + '/getVerifyCode/' + email,
    method: 'get'
  })
}

export const disConnectVpnRequest = () => {
  Axios.get(baseURL.localUrl + '/disConnect')
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
}
