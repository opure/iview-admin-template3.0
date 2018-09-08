<template>
  <div>
    <Button type="primary" long style="height: 50px;" @click="unlock('part')">一键解锁自己订单</Button>
    <Button type="primary" long style="margin-top: 20px; height: 50px" @click="unlock('all')">一键解锁所有订单</Button>
  </div>
</template>
<script>
  import {unLockOrder} from '@/api/task.js'
  import {Message} from 'iview'

  export default {
    name: 'unlock_order',
    methods: {
      unlock(type) {
        return new Promise((resolve, reject) => {
          unLockOrder({type}).then(res => {
            Message.info("解锁成功")
            resolve(data)
          }).catch(err => {
            Message.info("解锁失败")
            reject(err)
          })
        })

      }
    }

  }
</script>
