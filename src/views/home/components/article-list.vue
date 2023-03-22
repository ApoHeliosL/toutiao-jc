<template>
         <!-- 文章列表组件 -->
    <div class="article-list">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh" :success-text="refreshSuccessText" :success-duration="1000">
        <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        >
            <van-cell v-for="(article,index) in articles" :key="index" :title="article.title" />
            
        </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
import {getArticles} from '@/api/article'
export default {
  name:'ArticleList',
  components: {},
  props:{
    channel:{
        type:Object,
        required:true
    }
  },
  data() {
    return {
      articles: [], // 数据列表
      loading: false,
      finished: false,
      timestamp: null, // 获取下一页数据的时间戳
      error:false, //控制请求失败字体
      refreshing: false,
      refreshSuccessText:'刷新成功'
    };
  },
  created(){
    this.onLoad();
  },
  //异步更新列表数据
  methods:{
    //获取文章信息
    async onLoad () {
    try{
        //1.获取请求数据
        const {data} = await getArticles({
        channel_id: this.channel.id, // 频道 ID
        timestamp: this.timestamp || Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳，timestamp 相当于页码，请求最新数据使用当前最新时间戳，下一页数据使用上一次返回的数据中的时间戳
        with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
      });
    //   console.log(data);
        // 2. 把数据放到 articles 数组中
      const  {results}  = data.data
    //   console.log(results);
      this.articles.push(...results)
        // console.log(this.articles);
      // 3. 设置本次加载状态结束，它才可以判断是否需要加载下一次，否则就会永远的停在这里
      this.loading = false

      // 4. 数据全部加载完成
      if (results.length) {
        // 更新获取下一页数据的页码
        this.timestamp = data.data.pre_timestamp
      } else {
        // 没有数据了，把加载状态设置结束，不再触发加载更多
        this.finished = true
      }
        }
        catch(err){
            // console.log("请求失败",err);
            // this.$toast('请求失败了')
            this.error = true;
            this.loading = false
        }
       
    },
    async onRefresh() {
        try{
            //1.获取请求数据
                const {data} = await getArticles({
                channel_id: this.channel.id, // 频道 ID
                timestamp: Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳，timestamp 相当于页码，请求最新数据使用当前最新时间戳，下一页数据使用上一次返回的数据中的时间戳
                with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
            });
            //2.数据追加到顶部
            this.articles.unshift(...data.data.results)
            // 3. 设置本次加载状态结束，它才可以判断是否需要加载下一次，否则就会永远的停在这里
            this.refreshing = false
        }
        catch(err){
            this.refreshing = false
            this.refreshSuccessText = '刷新失败';

        }
    },

  }
};
</script>
<style  scoped lang='less'>
// .article-list {
//   position: fixed;
//   left: 0;
//   right: 0;
//   top: 90px;
//   bottom: 50px;
//   overflow-y: auto;
// }
</style>