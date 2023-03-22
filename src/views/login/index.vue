<template>
  <div class="login-container">
    <van-nav-bar
    class="app-nav-bar "
  title="登录/注册"
  left-text="返回"
  left-arrow
  @click-left="$router.back()"
/>

<van-form @submit="onLogin" :show-error="false" :show-error-message="false" @failed="onFailed" validate-first ref="login-form">
  <van-field
    v-model="user.mobile"
    name="mobile"
    label="手机号码"
    icon-prefix="toutiao"
    left-icon="shouji"
    placeholder="请输入手机号码"
    :rules="formRules.mobile"
  />
  <van-field
    v-model="user.code"
    label="验证码"
    clearable
    icon-prefix="toutiao"
    left-icon="yanzhengma"
    placeholder="请输入验证码"
    :rules="formRules.code"
  >
  <template #button>
    <van-count-down 
    v-if="isCountDownShow"
    :time="1000*60" 
    format="ss s"
    @finish="isCountDownShow=false"
    />
    <van-button 
    v-else
    :loading="isSendSmsLoading"
    size="mini" round class="send-btn" @click.prevent="onSendSms">发送验证码</van-button>
  </template>
  </van-field>
  <div class="login-btn-wrap">
    <van-button class="login-btn" type="info" block>登录</van-button>
</div>
</van-form>


  </div>
</template>

<script>
import {login} from '@/api/user'
import {sendSms} from '@/api/sendSms'
// import {Toast} from 'vant'
export default {
  name:'LoginIndex',
  components: {},
  data() {
    return {
        user:{
            mobile:'',//手机号
            code:'' //验证码
        },
        // 表单校验规则
        formRules:{
          mobile:[
            {required:true,message:'请输入手机号'},
            {pattern:/^1{3|5|7|8|9}\d{9}$/,message:'手机号码格式错误'}
          ],
          code:[
          {required:true,message:'请输入验证码'},
            {pattern:/^\d{6}$/,message:'验证码格式错误'}
          ]
        },
        isCountDownShow:false,
        isSendSmsLoading:false//发送验证码按钮的loading
    };
  },
  methods:{
  async onLogin(){
      this.$toast.loading({
          message: '登陆中...',
          forbidClick: true, // 禁止背景点击
          duration:0
        });
      //找到数据接口
      //封装请求方法
      //请求调用登录
      try{
        const {data} = await login(this.user)
        // console.log(res);
        this.$toast.success('登陆成功');
        //将后端返回的用户登陆状态 token存入vuex
        this.$store.commit('setUser',data.data)
        this.$router.back()//先用这种方式 不太好
      }catch(err){
         //处理响应结果
        console.log('登陆失败',err);
        this.$toast.fail('登录失败,手机号或验证码错误');
      }
    
     
    },
    onFailed(error){
      console.log(error);
      if(error.errors[0]){
        this.$toast({
          message:error.errors[0].message,
          position:'top'
        })
      }
    },
  async  onSendSms(){
     //校验手机号吗
    try{
      const validateResult = await this.$refs['login-form'].validate('mobile')
      //请求发送验证码-用户接收短信-》输入验证码->请求登录
      this.isSendSmsLoading= true
      const res = await sendSms(this.user.mobile)
      console.log(res);
      console.log(validateResult);
       //请求发送验证码-》显示倒计时-》隐藏发送按钮
       this.isCountDownShow = true;


    }catch(err){
      // console.log(err);
      let message=''
      //不同错误有不同 的报错提示
      // 429 发送太频繁
      if(err&&err.response&&err.response.status==429){
        message= err.response.data.message
        console.log(message);
      }else if(err.name = 'mobile'){
        message=err.message
      }else{
        message='发送失败，请稍后重试'
      }
      this.$toast({
          message,
          position:'top'
        })
    }
      //倒计时结束-》显示发送按钮
      //监听倒计时结束事件 finish
      //无论成功或是失败都需要关闭loading状态
      this.isSendSmsLoading = false
    }
  }
};
</script>
<style  scoped lang='less'>
    .login-container{
     .send-btn{
      height: 23px;
      width: 76px;
      background-color: #ededed;
      .van-button__text{
        font-size: 11px;
        color: #666;
      }
     }
        .login-btn-wrap{
            padding: 26px 16px;
            .login-btn{
                background-color: #6db4fb;
                .van-button__text{
                  font-size: 15px;

                }
            }
        }
    }
</style>