import {connectVpnRequest, disConnectVpnRequest} from '@/api/task'

export function cnnectVpn (vpnInfo = {}) {
  return new Promise((resolve, reject) => {
    connectVpnRequest({vpnInfo}).then(res => {
      const data = res.data
      resolve(data)
    }).catch(err => {
      this.loading.taskLoading = true
      reject(err)
    })
  })
}

export function disConnectVpn () {
  return new Promise((resolve, reject) => {
    disConnectVpnRequest().then(res => {
      resolve()
    }).catch(err => {
      this.loading.taskLoading = true
      reject(err)
    })
  })
}
