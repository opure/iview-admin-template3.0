import {getUserInfo, login, logout} from '@/api/user'
import {getToken, setToken} from '@/libs/util'
import {Message} from 'iview'

export default {
  state: {
    userName: '',
    userId: '',
    avatorImgPath: '',
    token: getToken(),
    access: ''
  },
  mutations: {
    setAvator (state, avatorPath) {
      state.avatorImgPath = avatorPath
    },
    setUserId (state, id) {
      state.userId = id
    },
    setUserName (state, name) {
      state.userName = name
    },
    setAccess (state, access) {
      state.access = access
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    }
  },
  actions: {
    // 登录
    handleLogin ({commit}, {userName, password}) {
      userName = userName.trim()
      return new Promise((resolve, reject) => {
        login({
          userName,
          password
        }).then(res => {
          const data = res.data
          commit('setToken', data.access_token)
          resolve()
        }).catch(err => {
          Message.info('用户名或者密码错误!')
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({state, commit}) {
      return new Promise((resolve, reject) => {
        /* logout(state.token).then(() => {
          commit('setToken', '')
          commit('setAccess', [])
          resolve()
        }).catch(err => {
          reject(err)
        }) */
        commit('setToken', '')
        commit('setAccess', [])
        resolve()
      })
    },
    // 获取用户相关信息
    getUserInfo ({state, commit}) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(res => {
          const data = res.data
          // commit('setAvator', data.avator)
          commit('setUserName', data)
          // commit('setUserId', data.user_id)
          commit('setAccess', 'super_admin')
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
