<template>
        <van-cell class="article-item" >
            <div slot="title" class="title van-multi-ellipsis--l2" >{{ article.title }}</div>
            <div slot="label">
                 <!-- 右侧取决于图片是否只有三张 -->
                <div v-if="article.cover.type===3" class="cover-wrap" >
                    <div class="cover-item"
                    v-for="(imgSrc,index) in article.cover.images" :key="index">
                        <van-image
                        class="cover-item-img"
                        fit="cover"
                        :src="imgSrc"
                        />
                    </div>
                    
                </div>
                <div class="label-info-wrap 
                ">
                    <span>{{ article.aut_name }}</span>
                    <span>{{ article.com_count }}评论</span>
                    <span>{{ article.pubdate }}</span>
                </div>
                
            </div>
            <!-- 右侧取决于图片是否只有一张 -->
            <van-image
            class="right-cover"
            v-if="article.cover.type===1"
            slot="default"
            fit='cover'
            :src="article.cover.images[0]"
            />
        </van-cell>
</template>

<script>
export default {
name:'ArticleItem',
  components: {},
  props:{
    article:{
        type:Object
    }
  },
  data() {
    return {
    };
  },
};
</script>
<style  scoped lang='less'>
.article-item{
    .title{
        font-size: 16px;
        color: #3a3a3a;
    }
    .van-cell__value{
        flex:unset;
        width: 116px;
        height: 73px;
        padding-left:12px;
    }
    .cover-wrap{
        display: flex;
        padding: 15px 0;
        .cover-item{
           flex: 1;
           height: 73px;
        &:not(:last-child){
            padding-right: 2px;
        }
           .cover-item-img{
            width: 100%;
            height: 73px;
           }
        }
    }
    .right-cover{
        width: 116px;
        height: 73px;
    }
    .label-info-wrap span{
        font-size: 11px;
        color: #b4b4b4;
        margin-right:  10px;
    }
}
</style>