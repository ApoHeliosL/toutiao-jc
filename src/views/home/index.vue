<template>
  <div class="home-container">
      <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round 
        icon="search"
      >搜索</van-button>
    </van-nav-bar>
     <!-- 频道列表tab标签页 -->
  <van-tabs class="channer-tabs" v-model="active" animated swipeable>
    <van-tab
    v-for="channel in channels"
    :key="channel.id"
    :title="channel.name"
   >
    <!-- 文章列表 -->
    <ArticleList :channel="channel" />
     <!-- 文章列表 -->
    </van-tab>
  
  <div slot="nav-right" class="placeholder"></div>
    <div slot="nav-right" class="hamburger-btn">
      <i class="toutiao toutiao-gengduo"></i>
    </div>
  </van-tabs>
   
  </div>
 
</template>

<script>
import {getUserChannels} from '@/api/user'
import ArticleList from './components/article-list.vue';
export default {
  name:'HomeIndex',
  components: {
    ArticleList
  },
  data() {
    return {
      active:0,
      channels:[]
    };
  },
  created(){
    this.getChannels()
  },
  methods:{
    //获取首页频道分类
    async getChannels(){
      const result = await getUserChannels();
      this.channels = result.data.data.channels;
      // console.log(this.channels);
    }
  }
};
</script>
<style  scoped lang='less'>
.home-container{
  
  .page-nav-bar{
    /deep/.van-nav-bar__title{
      max-width: unset;
    }
    .search-btn{
      width: 277px;
      height: 32px;
      background-color: #5babfb;
      border: none;
      .van-icon {
      font-size: 16px;
    }
    .van-button__text {
      font-size: 14px;
    }
    }
    background-color: #10a1df;
    .van-icon-search:before{
      color: white;
    }
  }
  .channer-tabs{
    /deep/.van-tabs__wrap {
      height: 41px;
      position: fixed;
      top:46px;
      left: 0;
      right: 0;
      z-index: 1;
      // margin-top: 46px;
    }
    /deep/ .van-tab{
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
    }
    /deep/ .van-tabs__line {
    bottom: 20px;
    width: 15px !important;
    height: 3px;
    background: #3296fa;
  }
  .placeholder{
    // 不参与flex空间计算
    flex-shrink: 0;
    width: 33px;
    height: 41px;
  }

  .hamburger-btn{
    padding-right: 5px;
    position: fixed;
    right: 0;
    width: 33px;
    height: 41px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    opacity: 0.902;
    i.toutiao{
      font-size: 16.5px;
    }
    &:before{
      content:"";
      position: absolute;
      left: 0;
      width:10px;
      height: 100%;
      // background-image:url(~@/assets/jianbian.png);
      background-size: contain;
    }
  }
  }
}
</style>