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
                <DatePicker :value="startDate" format="yyyy-MM-dd"
                            @on-change="getOrderCount"
                            type="date" placeholder="Start Date"
                            style="width: 200px"></DatePicker>
              </i-col>
              <i-col span="12">
                <span v-html="countInfo.totalCount"></span>
                <span v-html="countInfo.finishedCount" class="spacing"></span>
                <span v-html="countInfo.waitingCount" class="spacing"></span>
                <span v-html="countInfo.handlingCount" class="spacing"></span>
                <span v-html="countInfo.endCount" class="spacing"></span>
                <span v-html="countInfo.errorCount" class="spacing"></span>
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
                    @click="switchAccoutAndOpenChrome">
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
              <i-input v-model="accountInfo.email" :readonly="true"
                       @on-click="copy(accountInfo.email)"
                       icon="ios-copy-outline"
                       style="width: 300px">
              </i-input>
            </form-item>
          </i-col>
          <i-col span="6">
            <form-item label="密码">
              <i-input v-model="accountInfo.passwd" :readonly="true"
                       @on-click="copy(accountInfo.passwd)"
                       icon="ios-copy-outline"
                       style="width: 300px"></i-input>
            </form-item>
          </i-col>
          <i-col span="6">
            <form-item label='IP'>
              <i-input v-model="accountInfo.ip" :readonly="true"
                       @on-click="copy(accountInfo.ip)"
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
          <panel v-for="(od,index) in orderDetails" :key="index" name="index">
            <span>排单人: {{taskInfo.createUserName}}</span>
            <span>ASIN: {{od.asinInfo.asin}}</span>
            <span class="span-spacing">ASIN数量:{{od.quantity}}单</span>
            <span class="span-spacing">ASIN价格区间:{{od.asinInfo.minPrice}}~{{od.asinInfo.maxPrice}}</span>
            <p slot="content">
            <Form :label-width="150">
              <row>
                <i-col span="12">
                  <form-item label="广告位搜索">
                    <radio-group v-model="od.adSpace == 'NOTAD' ? '否': '是'">
                      <radio label="是"></radio>
                      <radio label="否"></radio>
                    </radio-group>
                  </form-item>
                  <form-item label="关键字">
                    <i-input v-model="od.keyWord" :readonly="true"
                             @on-click="copy(od.keyWord)"
                             icon="ios-copy-outline"
                             style="width: 300px"></i-input>
                  </form-item>
                  <form-item label="辅助关键字">
                    <i-input v-model="od.asinInfo.keyWords.join(',')" :readonly="true"
                             @on-click="copy(od.asinInfo.keyWords.join(','))"
                             icon="ios-copy-outline"
                             style="width: 300px"></i-input>
                  </form-item>
                  <form-item label="商品Asin">
                    <i-input v-model="od.asinInfo.asin" :readonly="true"
                             style="width: 300px"></i-input>
                  </form-item>
                  <form-item label="优惠券">
                    <i-input v-model="od.coupon" :readonly="true"
                             @on-click="copy(od.coupon)"
                             icon="ios-copy-outline"
                             style="width: 300px"></i-input>
                  </form-item>
                  <form-item label="对手Asin">
                    <i-input v-model="od.rivalAsin==null ? '无竞争对手asin' : od.rivalAsin.rivalAsin" :readonly="true"
                             style="width: 300px"></i-input>
                  </form-item>
                  <form-item label="备注">
                    <Input v-model="od.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                           style="width: 300px"
                           :readonly="true"/>
                  </form-item>
                  <form-item label="店铺名称">
                    <i-input v-model="od.asinInfo.sellerName" :readonly="true"
                             style="width: 300px"></i-input>
                  </form-item>
                  <!--    <form-item label="短链接">
                        <i-input v-model="od.asinInfo.shortConnection" :readonly="true"
                                 style="width: 300px"></i-input>
                      </form-item>-->
                </i-col>
                <i-col span="12">
                  <form-item label="商品链接">
                    <i-input v-model="od.asinInfo.goodsUrl" :readonly="true"
                             style="width: 300px"></i-input>
                  </form-item>
                  <form-item label="商品标题">
                    <i-input v-model="od.asinInfo.goodsTitle" :readonly="true"
                             style="width: 300px"></i-input>
                  </form-item>
                  <form-item label="商品属性">
                    <span v-html="od.asinInfo.asinP"></span>
                  </form-item>
                  <form-item label="可接受最高运费">
                    <span v-html="od.asinInfo.maxCarriage"></span>
                  </form-item>
                  <form-item label="可接受最高税费">
                    <span v-html="od.asinInfo.maxRate"></span>
                  </form-item>
                  <form-item label="商品页数">
                    <span v-html="od.page"></span>
                  </form-item>
                  <form-item label="图片">
                    <img :src="od.asinInfo.imageUrl"
                         style="width :20em;">
                  </form-item>
                </i-col>
              </row>
            </Form>
            </p>
          </panel>
        </Collapse>
      </div>
    </Card>
    <Collapse v-model="addressInfo.value" simple style="margin-top:10px;width:100%">
      <Panel name="1">
        地址信息
        <p slot="content">
          <row>
            <i-form :model="addressInfo" :label-width="90">
              <i-col span="4">
                <form-item label="收件人姓名">
                  <i-input v-model="addressInfo.fullName" :readonly="true"
                           @on-click="copy(addressInfo.fullName)"
                           icon="ios-copy-outline"
                           style="width: 100px"></i-input>
                </form-item>
                <form-item label="国家">
                  <i-input v-model="addressInfo.country" :readonly="true"
                           @on-click="copy(addressInfo.country)"
                           icon="ios-copy-outline"
                           style="width: 100px"></i-input>
                </form-item>
                <form-item label="洲">
                  <i-input v-model="addressInfo.stage" :readonly="true"
                           @on-click="copy(addressInfo.stage)"
                           icon="ios-copy-outline"
                           style="width: 100px"></i-input>
                </form-item>
                <form-item label="城市">
                  <i-input v-model="addressInfo.city" :readonly="true"
                           @on-click="copy(addressInfo.city)"
                           icon="ios-copy-outline"
                           style="width: 100px"></i-input>
                </form-item>
              </i-col>
              <i-col span="6">
                <form-item label="详细地址">
                  <i-input v-model="addressInfo.address" :readonly="true"
                           @on-click="copy(addressInfo.address)"
                           icon="ios-copy-outline"
                           style="width: 200px"></i-input>
                </form-item>
                <form-item label="电话">
                  <i-input v-model="addressInfo.tel" :readonly="true"
                           @on-click="copy(addressInfo.tel)"
                           icon="ios-copy-outline"
                           style="width: 200px"></i-input>
                </form-item>
                <form-item label="邮编">
                  <i-input v-model="addressInfo.zipCode" :readonly="true"
                           @on-click="copy(addressInfo.zipCode)"
                           icon="ios-copy-outline"
                           style="width: 200px"></i-input>
                </form-item>
              </i-col>
            </i-form>
          </row>
        </p>
      </Panel>
    </Collapse>
    <Card style="margin-top:10px;width:100%">
      <p slot="title">标记任务</p>
      <div>
        <row>
          <i-col span="12">
            <i-form :model="completeInfo" ref="complteValidate" :rules="rules" :label-width="150">
              <form-item prop="orderNo" label="订单号">
                <i-input v-model="completeInfo.orderNo" placeholder="请输入订单号..."
                         style="width: 300px"></i-input>
              </form-item>
              <form-item prop="fee" label="礼品卡金额">
                <input-number v-model="completeInfo.fee"
                              :max="10000" :min="0" :step="2" style="width: 300px">

                </input-number>
              </form-item>
              <form-item prop="cardFee" label="信用卡金额">
                <input-number v-model="completeInfo.cardFee"
                              :max="10000" :min="0" :step="2" style="width: 300px">
                </input-number>
              </form-item>
              <form-item>
                <i-button type="primary" @click="submitInfo('complteValidate')"
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
  import * as task from '@/api/task.js'
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
          accountId: 0,
          email: '',
          paaswd: '',
          ip: ''
        },
        taskInfo: {
          taskId: 0,
          startDate: '',
          createUserName: ''
        },
        countInfo: {
          totalCount: '总任务数0单',
          handlingCount: '已锁定任务0单',
          waitingCount: '未执行任务0单',
          finishedCount: '已完成任务0单',
          errorCount: '已打回任务0单',
          endCount: '用户终结单数',
        },
        userInfo: {
          count: 0,
          totalCount: 0
        },
        orderDetails: {},
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
        addressInfo: {
          fullName: '',
          country: '',
          stage: '',
          city: '',
          address: '',
          tel: '',
          zipCode: '',
          value: '1'
        },
        creditCardInfo: {
          name: '',
          number: '',
          dateStr: '',
          csc: '',
          bindText: '绑定'
        },
        startDate: new Date(),
        verifyCode: '', //验证码,
        accountSign: 'LOCKED',
        rules: {
          orderNo: [
            {required: true, message: '订单号不能为空', trigger: 'blur'}
          ],
        }
      }
    },
    mounted() {
      this.getOrderCount(timeFormat(new Date().getTime()))
    },
    methods: {
      getOrderCount(date) {
        this.startDate = date;
        return new Promise((resolve, reject) => {
          task.execInfo({date}).then(res => {
            const data = res.data;
            for (let x in data) {
              if (data[x].status === "HANDLING") {
                this.countInfo.handlingCount = '已锁定任务<span style="color: red">' + data[x].count + '</span>单'
              } else if (data[x].status === 'WAITING') {
                this.countInfo.waitingCount = '待执行任务<span style="color: red">' + data[x].count + '</span>单'
              } else if (data[x].status === 'END') {
                this.countInfo.endCount = '用户终结任务数<span style="color: red">' + data[x].count + '</span>单'
              } else if (data[x].status === 'ERROR') {
                this.countInfo.errorCount = '手动打回<span style="color: red">' + data[x].count + '</span>单'
              } else if (data[x].status === 'FINISHED') {
                this.countInfo.finishedCount = '已完成任务数<span style="color: red">' + data[x].count + '</span>单'
              } else {
                this.countInfo.totalCount = '总任务数<span style="color: red">' + data[x].count + '</span>单'
              }
            }
            resolve(data)
          }).catch(err => {
            this.loading.taskLoading = false;
            reject(err)
          })
        })
      },
      executeTask(taskId) {
        var _this = this;
        this.getBasicIfo(taskId).then(data => {
          if (null != data) {
            _this.connectVpn(data)
          }
        })
      },
      switchAccoutAndOpenChrome() {
        this.switchAccount().then(data => {
          this.executeTask(this.taskInfo.taskId)
        })
      },
      getBasicIfo(taskId) {
        let args;
        if (taskId) {
          args = this.startDate;
        } else {
          args = taskId
        }
        this.loading.taskLoading = true;
        return new Promise((resolve, reject) => {
          task.getTask({args}).then(res => {
            const data = res.data;
            if (null === data) {
              this.loading.taskLoading = false;
              this.$Message.info('暂无待处理的任务!');
              return;
            } else {
              this.taskInfo = data;
              this.accountInfo = data;
              this.addressInfo = data;
              this.creditCardInfo = data;
              if (data.bindStatus === 'BIND') {
                this.creditCardInfo.bindText = '已绑定';
              }
              this.userInfo = data;
              this.orderDetails = data.taskDetails;
              this.addressInfo.value = '1';
              if (data.bindStatus) {
                if (data.bindStatus === 'BIND') {
                  this.creditCardInfo.bindText = '已绑定'
                } else {
                  this.creditCardInfo.bindText = '绑定'
                }
              }
            }
            resolve(data)
          }).catch(err => {
            reject(err);
          }).finally(() => {
          })
        })
      },
      connectVpn(data) {

        let vpnInfo = {
          configName: data.configName,
          userName: data.proxyName,
          passwd: data.proxyPasswd,
          ip: data.ip,
          email: data.email,
          title: data.taskDetails[0].asinInfo.goodsTitle,
          webSite: data.taskDetails[0].asinInfo.webSite,
          urlSign: data.urlSign,
          shortUrl: data.taskDetails[0].asinInfo.shortConnection
        }


        this.$connectVpn(vpnInfo).then(res => {
          this.loading.startStatus = true;
        }).catch(error => {
          this.$Message.warning("vpn连接失败!");
          this.loading.startStatus = false;
          this.resetInfo();
        }).finally(() => {
          this.loading.taskLoading = false;
        })

      },
      getVerifyCode() {
        let email = this.accountInfo.email;
        if (email == '') {
          this.$Message.warning("暂无任务无法获取邮箱言验证码");
          return;
        }
        this.loading.verifyCodeLoading = true;
        return new Promise((resolve, reject) => {
          task.getCode({email}).then(res => {
            const data = res.data;
            this.verifyCode = data.data;
            resolve(data)
          }).catch(err => {
            this.$Message.error("获取验证码失败");
            reject(err)
          }).finally(() => {
            this.loading.verifyCodeLoading = false;
          })
        })
      },
      resetInfo() {
        this.accountInfo = {};
        this.taskInfo = {};
        this.orderDetails = {};
        this.addressInfo = {};
        this.creditCardInfo = {};
        this.creditCardInfo.bindText = '绑定';
        this.completeInfo = {};
      },
      switchAccount() {
        const _this = this;
        let taskId = _this.taskInfo.taskId;
        let status = _this.accountSign;
        if (taskId == 0) {
          _this.$Message.error("暂无处理的任务,无法切换账号")
          return;
        }
        return new Promise((resolve, reject) => {
          task.swtichAccount({taskId, status}).then(res => {
         //   _this.$Message.info(res.data.message);
            resolve()
          }).catch(err => {
            _this.$Message.info(err);
            reject(err)
          })
        })
      },
      bindCard() {
        const _this = this;
        let accountId = _this.accountInfo.accountId
        if (accountId == 0) {
          _this.$Message.warning("暂无账号需要绑定");
          return;
        }
        return new Promise((resolve, reject) => {
          task.bindCard({accountId}).then(res => {
            _this.$Message.info('信用卡绑定成功');
            resolve()
          }).catch(err => {
            _this.$Message.warning('信用卡绑定失败');
            reject(err)
          })
        })
      },
      submitInfo(name) {
        const _this = this;
        if (_this.taskInfo.taskId == 0 || _this.taskInfo.taskId == null) {
          _this.$Message.error("暂无处理的任务,无法提交")
          return;
        }
        this.$refs[name].validate((valid) => {
            if (valid) {
              if (_this.completeInfo.cardFee > 0 || _this.completeInfo.fee > 0) {
                let completeInfo = {
                  taskId: _this.taskInfo.taskId,
                  orderNo: _this.completeInfo.orderNo,
                  cardFee: _this.completeInfo.cardFee,
                  fee: _this.completeInfo.fee,
                }
                return new Promise((resolve, reject) => {
                  task.saveTask({completeInfo}).then(res => {
                    _this.resetInfo();
                    _this.loading.startStatus = false;
                    _this.$Message.info('订单信息保存成功');
                    resolve()
                  }).catch(err => {
                    _this.$Message.warning('订单信息保存失败');
                    reject(err)
                  }).finally(() => {
                  })
                })
              } else {
                _this.$Message.warning('请输入正确的金额');
              }
            }
            else {
              _this.$Message.warning('请填写订单号');
            }
          }
        )

      },
      copy: function (value) {
        var oInput = document.createElement('input');
        oInput.value = value;
        document.body.appendChild(oInput);
        oInput.select(); // 选择对象
        document.execCommand("Copy"); // 执行浏览器复制命令
        oInput.style.display = 'none';
        this.$Message.success("复制成功")
      }
      ,
      repulseTask() {
        const _this = this;
        if (_this.taskInfo.taskId == 0) {
          _this.$Message.error("暂无处理的任务,无法提交")
          _this.resetInfo();
          _this.loading.confirmModal = false;
          return;
        }
        this.loading.modalLoading = true;
        let failReason = _this.completeInfo.failReason

        let errorMsg = _this.completeInfo.errorMsg

        if (failReason != '' || errorMsg.length != 0) {
          let errorInfo = {
            taskId: _this.taskInfo.taskId,
            status: 'ERROR',
            remark: errorMsg.join(",") + '' + failReason
          }
          return new Promise((resolve, reject) => {
            task.repluseTask({errorInfo}).then(res => {
              _this.$Message.warning('打回任务成功');
              _this.resetInfo();
              resolve()
            }).catch(err => {
              _this.$Message.warning('打回任务失败');
              reject(err)
            }).finally(() => {
              _this.loading.modalLoading = false;
              _this.loading.startStatus = false;
              _this.loading.confirmModal = false;
            })
          })
        } else {
          _this.$Message.warning("请填写打回原因");
          _this.loading.confirmModal = false;
          this.loading.modalLoading = false;
          return;
        }
      }
    }
  }
</script>

<style>
  .spacing {
    margin-left: 20px;
  }

  .span-spacing {
    margin-left: 5px;
  }

  .startButton {
    height: 60px;
  }
</style>
