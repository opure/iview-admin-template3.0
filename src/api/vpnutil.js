import {connectVpnRequest, disConnectVpnRequest} from '@/api/task'
import {Message} from 'iview'

export function cnnectVpn (vpnInfo = {}) {
  return new Promise((resolve, reject) => {
    connectVpnRequest({vpnInfo}).then(res => {
      resolve()
    }).catch(err => {
      Message.error('vpn连接失败!')
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
