<template>
  <div class="my-container">
      <van-cell-group class="my-info" v-if="user">
        <van-cell  center class="base-info" :border="false">
          <van-image
          class="avatar"
              slot="icon"
              round
              fit="cover"
              :src="userInfo.photo"
            />
          <div slot="title" class="name">{{ userInfo.name }}</div>
          <van-button
            size="small"
            round
            class="update-btn"
          >编辑资料</van-button>
        </van-cell>       
        <van-grid :border="false" class="data-info">
          <van-grid-item class="data-info-item">
            <span slot="text" class="text-wrap">
              <div class="count">123</div>
              <div class="text">头条</div>
            </span>
          </van-grid-item>
          <van-grid-item class="data-info-item">
            <span slot="text" class="text-wrap">
              <div class="count">123</div>
              <div class="text">关注</div>
            </span>
          </van-grid-item>
          <van-grid-item class="data-info-item">
            <span slot="text" class="text-wrap">
              <div class="count">123</div>
              <div class="text">粉丝</div>
            </span>
          </van-grid-item>
          <van-grid-item class="data-info-item">
            <span slot="text" class="text-wrap">
              <div class="count">123</div>
              <div class="text">点赞</div>
            </span>
          </van-grid-item>
        </van-grid> 
      </van-cell-group>

      <div class="not-login" v-else>
        <div @click="$router.push('/login')">
          <img class="mobile" src="./未登录.png" alt="未登录">
        </div>
        <div class="text">未登录</div>
      </div>

      <van-grid  :column-num="2"  :border="false" class="nav-grid mb-4" >
        <van-grid-item 
        class="nav-grid-item"
        icon-prefix="toutiao"
        icon="shoucang" text="收藏" />
        <van-grid-item 
        class="nav-grid-item"
        icon-prefix="toutiao"
        icon="lishi" text="历史" />
      </van-grid>

      <van-cell title="消息通知" is-link to="/" />
      <van-cell title="小智同学" is-link to="/" class="mb-4"/>
      <van-cell 
      v-if="user"
      title="退出登录"  
      clickable
      class="logout-cell"
      @click="onLogout"
      />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getUserInfo } from '@/api/user';
export default {
  name:'MineIndex',
  components: {},
  data() {
    return {
      userInfo:{}//当前用户信息
    };
  },
  computed:{
    ...mapState(['user'])
  },
  created(){
    //如果登录了请求加载用户信息
    if(this.user){
      this.loadUserInfo()
    }
    
  },
  methods:{
    onLogout(){
      //退出提示  Dialog弹出框
      this.$dialog.confirm({
        title:'确认退出吗？ '
      }).then(()=>{
        console.log('确认执行这里');
         //确认退出 清除登录状态（容器中的user+本地存储的user）
         this.$store.commit('setUser',null);
      }).catch(()=>{
        console.log('取消执行这里');
      })
     

    },
   async loadUserInfo(){
    try{
      const {data} = await getUserInfo()
      this.userInfo = data.data
      console.log(data);
    }catch(err){
      this.$toast('获取数据失败,请稍后重试')
    }
   }
  }
};
</script>
<style  scoped lang='less'>
  .my-container{
    .my-info{
      background: url(./banner.jpg) no-repeat;
      background-size: cover;
      .base-info{
        box-sizing: border-box;
        padding-top: 38px;
        padding-bottom: 11px;
        height: 115px;
        background-color: unset;
        .avatar{
          box-sizing: border-box;
          width: 66px;
          height: 66px;
          border: 1px solid #fff;
        }
        .name{
          font-size: 15px;
          color: #fff;
          margin-left: 11px;
        }
        .update-btn{
          height: 16px;
          font-size: 10px;
          color: #666;
          line-height: 16px;
        }
      }
      .data-info{
        .data-info-item{
          height: 65px;
          color: #fff;
          .text-wrap{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .count{
            font-size: 18px;
          }
          .text{
            font-size: 11px;
          }
          }
          
        }
      }
     
    /deep/ .van-grid-item__content{
        background-color: unset;
    }
    }
    .not-login{
      height: 180px;
      background: url('./banner.jpg') no-repeat;
      background-size:cover ;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile{
        width: 66px;
        height: 66px;
        border-radius: 50%;
      }
      .text{
        color: #fff;
        font-size: 14px;
      }
    }
    .nav-grid{
      /deep/.nav-grid-item{
          height: 70px;
         .toutiao{
            font-size: 22px;
          }
          .toutiao-shoucang{
            color: #eb5253;
          } 
          .toutiao-lishi{
            color: #ff9d1d;
          }
          .van-grid-item__text{
            font-size: 14px;
            color: #333;
          }
        }
      }
      .logout-cell{
        text-align: center;
        color: #d86262;
      }
      .mb-4{
        margin-bottom: 4px;
      }
  }
</style>