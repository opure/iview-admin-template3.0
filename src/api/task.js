import axios from '@/libs/api.request'
import Axios from 'axios'
import baseURL from '_conf/url'

export const connectVpn = ({vpnInfo}) => {
  const data = {
    vpnInfo
  }
  return axios.request({
    url: baseURL.localUrl + 'execTask',
    params: JSON.stringify(data),
    method: 'post'
  })
}

export const getTask = ({startDate}) => {
  return axios.request({
    url: baseURL.baseUrl + '/getTask',
    params: {
      startDate
    },
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
