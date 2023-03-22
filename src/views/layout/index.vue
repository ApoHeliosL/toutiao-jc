<template>
    <div class="layout-container">
      <!-- 子路由出口 -->
      <router-view />
      <!-- /子路由出口 -->
  
      <!-- 底部导航栏 -->
      <van-tabbar v-model="active" route>
        <van-tabbar-item icon="home-o" to="/home">
          <i slot="icon" class="toutiao toutiao-shouye"></i>
          <span class="text">首页</span>
        </van-tabbar-item>
        <van-tabbar-item icon="comment-o" to="/qa">
          <i slot="icon" class="toutiao toutiao-wenda"></i>
          <span class="text">问答</span>
        </van-tabbar-item>
        <van-tabbar-item icon="video-o" to="/film">
          <i slot="icon" class="toutiao toutiao-shipin"></i>
          <span class="text">视频</span>
        </van-tabbar-item>
        <van-tabbar-item icon="manager-o" to="/mine">
          <i slot="icon" class="toutiao toutiao-wode"></i>
          <span class="text">{{this.$store.state.user ? '我的' : '未登录'}}</span>
        </van-tabbar-item>
      </van-tabbar>
      <!-- /底部导航栏 -->
    </div>
  </template>
  
  <script>
  export default {
    name: 'LayoutIndex',
    components: {},
    props: {},
    data () {
      return {
        active: 0
      }
    },
    computed: {},
    watch: {},
    created () {},
    mounted () {},
    methods: {}
  }
  </script>
  
  <style scoped lang="less"></style>