<template>
  <div>
    <Card style="width:100%">
      <p slot="title">基础操作</p>
      <div style="min-height: 300px;">
        <Form :label-width="150">
          <Button type="primary" class="startButton" v-bind:disabled="loading.startStatus" long
                  size="large"
                  :loading="loading.taskLoading"
                  @click="executeTask">
            <span v-if="!loading.taskLoading">开始执行任务</span>
            <span v-else>vpn连接中,请稍后...</span>
          </Button>
          <Row>
            <FormItem label="任务日期" style="margin-top: 30px">
              <i-col span="6">
                <DatePicker v-model="startDate" format="yyyy-MM-dd"
                            @on-change="getOrderCount"
                            type="date" placeholder="Start Date"
                            style="width: 200px"></DatePicker>
              </i-col>
              <i-col span="6">
                <span v-html="taskInfo.surplusCount">未执行任务0单</span>
                <span v-html="taskInfo.lockOrderCount" class="spacing"> 已锁任务0单</span>
              </i-col>
            </FormItem>
          </Row>
          <FormItem label="个人数据统计" style="margin-top: 10px">
            <span>今日刷单数{{personCount.count}}单</span>
            <span class="spacing">累计刷单数{{personCount.totalCount}}单</span>
          </FormItem>
          <FormItem label="获取验证码" style="margin: 10px">
            <Input v-model="verifyCode" size="large" :readonly="true"
                   style="width: 300px"/>
            <Button type="primary" style="margin-left: 10px"
                    :loading="loading.verifyCodeLoading"
                    @click="getVerifyCode">
              <span v-if="!loading.verifyCodeLoading">点击获取</span>
              <span v-else>验证码获取中...</span>
            </Button>
          </FormItem>
          <FormItem label="更换账号" style="margin-top: 20px">
            <RadioGroup v-model="accountSign">
              <radio label="LOCKED">账号被封更换账号</radio>
              <radio label="WRONG">密码错误更换账号</radio>
              <radio label="UNLOCKED">更换账号</radio>
            </RadioGroup>
            <Button type="primary" style="margin-left: 15px"
                    :loading="loading.switchLoading"
                    @click="switchAccount">
              <span v-if="!loading.switchLoading">提交</span>
              <span v-else>更换账号中...</span>
            </Button>
          </FormItem>
        </Form>
      </div>
    </Card>
    <Card style="margin-top:10px;width:100%">
      <p slot="title">账号信息</p>
      <Form :model="creditCardInfo" :label-width="150">
        <Row>
          <i-col span="6">
            <form-item label="亚马逊账号">
              <i-input v-model="accountInfo.email" :readonly="false"
                       @on-click="copy(accountInfo.email)"
                       icon="ios-copy-outline"
                       style="width: 300px">
              </i-input>
            </form-item>
          </i-col>
          <i-col span="12">
            <form-item label="密码">
              <i-input v-model="accountInfo.passwd" :readonly="true"
                       @on-click="copy(accountInfo.passwd)"
                       icon="ios-copy-outline"
                       style="width: 300px"></i-input>
            </form-item>
          </i-col>
        </Row>
      </Form>
    </Card>

    <Card style="margin-top:10px;width:100%">
      <p slot="title">刷单信息</p>
      <div>
        <Collapse v-model="collapseValue">
          <Panel name="1">
            史蒂夫·乔布斯
            <p slot="content">史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。</p>
          </Panel>
          <Panel name="2">
            斯蒂夫·盖瑞·沃兹尼亚克
            <p slot="content">斯蒂夫·盖瑞·沃兹尼亚克（Stephen Gary
              Wozniak），美国电脑工程师，曾与史蒂夫·乔布斯合伙创立苹果电脑（今之苹果公司）。斯蒂夫·盖瑞·沃兹尼亚克曾就读于美国科罗拉多大学，后转学入美国著名高等学府加州大学伯克利分校（UC
              Berkeley）并获得电机工程及计算机（EECS）本科学位（1987年）。</p>
          </Panel>
          <Panel name="3">
            乔纳森·伊夫
            <p slot="content">
              乔纳森·伊夫是一位工业设计师，现任Apple公司设计师兼资深副总裁，英国爵士。他曾参与设计了iPod，iMac，iPhone，iPad等众多苹果产品。除了乔布斯，他是对苹果那些著名的产品最有影响力的人。</p>
          </Panel>
        </Collapse>
      </div>
    </Card>


    <Card style="margin-top:10px;width:100%">
      <p slot="title">标记任务</p>
      <div>
        <row>
          <i-col span="12">
            <i-form :model="completeInfo" :label-width="150">
              <form-item label="订单号">
                <i-input v-model="completeInfo.orderNo" placeholder="请输入订单号..."
                         style="width: 300px"></i-input>
              </form-item>
              <form-item label="礼品卡金额">
                <input-number v-model="completeInfo.fee"
                              :max="10000" :min="0" :step="2" style="width: 300px">

                </input-number>
              </form-item>
              <form-item label="信用卡金额">
                <input-number v-model="completeInfo.cardFee"
                              :max="10000" :min="0" :step="2" style="width: 300px">
                </input-number>
              </form-item>
              <form-item>
                <i-button type="primary" @click="submitInfo"
                          :loading="loading.submitLoading">
                  <span v-if="!loading.submitLoading">我已完成</span>
                  <span v-else>执行中...</span>
                </i-button>

              </form-item>
            </i-form>
          </i-col>

          <i-col span="12">
            <i-form :model="completeInfo" :label-width="150">
              <form-item label="常见原因">
                <checkbox-group v-model="completeInfo.errorMsg">
                  <checkbox label="地址错误"></checkbox>
                  <checkbox label="金额错误"></checkbox>
                  <checkbox label="店铺名称错误"></checkbox>
                </checkbox-group>
              </form-item>
              <form-item label="失败原因">
                <i-input v-model="completeInfo.failReason" type="textarea"
                         placeholder="地址金额错误等..."
                         :autosize="{minRows: 2,maxRows: 5}"></i-input>
              </form-item>
              <form-item>
                <i-button type="error" @click="loading.confirmModal = true">打回任务</i-button>
              </form-item>
            </i-form>
          </i-col>

        </row>
      </div>
    </Card>
    <Card style="margin-top:10px;width:100%">
      <p slot="title">信用卡信息</p>
      <Form :model="creditCardInfo" :label-width="150">
        <Row>
          <i-col span="6">
            <form-item label="卡号">
              <i-input v-model="creditCardInfo.number" :readonly="true"
                       @on-click="copy(creditCardInfo.number)"
                       icon="ios-copy-outline"
                       style="width: 300px"></i-input>
            </form-item>
          </i-col>
          <i-col span="3">
            <form-item label="有效期">
              <i-input v-model="creditCardInfo.dateStr" :readonly="true"
                       style="width: 100px"> >
              </i-input>
            </form-item>
          </i-col>
          <i-col span="6">
            <form-item label="安全码">
              <i-input v-model="creditCardInfo.csc" :readonly="true"
                       @on-click="copy(creditCardInfo.csc)"
                       icon="ios-copy-outline"
                       style="width: 100px">
              </i-input>
            </form-item>
          </i-col>
        </Row>
        <form-item>
          <i-button type="primary" @click="bindCard" :loading="loading.bindLoading">
            <span v-if="!loading.bindLoading">{{creditCardInfo.bindText}}</span>
            <span v-else>绑定中...</span>
          </i-button>
        </form-item>
      </Form>
    </Card>
    <modal v-model="loading.confirmModal" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <icon type="information-circled"></icon>
        <span>打回确认</span>
      </p>
      <div style="text-align:center">
        <p>确认打回?</p>
      </div>
      <div slot="footer">
        <i-button type="error" size="large" long :loading="loading.modalLoading" @click="repulseTask">打回</i-button>
      </div>
    </modal>
  </div>

</template>

<script>
  import {timeFormat} from '@/libs/util'
  import {connectVpn, getTask, disConnectVpn} from '@/api/task.js'
  import FormItem from "iview/src/components/form/form-item";

  export default {
    components: {FormItem},
    name: 'order-page',
    data() {
      return {
        loading: {
          startStatus: false,
          taskLoading: false,
          verifyCodeLoading: false,
          switchLoading: false,
          bindLoading: false,
          submitLoading: false,
          modalLoading: false,
          confirmModal: false
        },
        collapseValue: ['1', '2', '3'],
        accountInfo: {
          email: '',
          passwd: '',
          ip: ''
        },
        taskInfo: {
          surplusCount: '',
          lockOrderCount: ''
        },
        completeInfo: {
          orderNo: '',
          fee: 0,
          cardFee: 0,
          errorMsg: [],
          failReason: ''
        },
        personCount: {
          count: 0,
          totalCount: 0
        },
        creditCardInfo: {
          name: '',
          number: '',
          dateStr: '',
          csc: '',
          bindText: '绑定'
        },
        startDate: '',
        verifyCode: '', //验证码,
        accountSign: 'LOCKED'
      }
    },
    mounted() {
      this.startDate = timeFormat(new Date().getTime())
      this.getOrderCount();
    },
    methods: {
      getOrderCount() {
        this.taskInfo.surplusCount = '待执行任务<span style="color: red">20</span>单'
        this.taskInfo.lockOrderCount = '已锁定任务<span style="color: red">20</span>单'
      },
      executeTask() {


      },
      getVerifyCode() {

      },
      switchAccount() {

      },
      bindCard() {

      },
      submitInfo() {

      },
      repulseTask() {
          this.loading.modalLoading = true;
      }
    }
  }
</script>

<style>
  .spacing {
    margin-left: 20px;
  }

  .startButton {
    height: 60px;
  }
</style>
