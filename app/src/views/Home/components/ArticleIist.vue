<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <ArticleItem
        v-for="obj in list"
        :key="obj.art_id"
        :artObj="obj"
      ></ArticleItem>
    </van-list>
  </div>
</template>

<script>
import ArticleItem from "./ArticleItem";
import { getAllArticleListAPI } from "@/api";
export default {
  props: {
    // list:Array文章列表数组
    channelId: Number, //频道ID
  },
  data() {
    return {
      list: [], //文章列表数组
      loading: false, //底部加载状态
      finished: false, //底部完成状态
      theTime: new Date().getTime(), //分页
    };
  },
  components: {
    ArticleItem,
  },
  async created() {
    const res = await getAllArticleListAPI({
      channel_id: this.channelId,
      timestamp: this.theTime
    });
    console.log(res);
    //下一段开头的那边文章时间戳
    //第一次系统时间timestamp->
    this.list = res.data.data.results;
    this.theTime = res.data.data.pre_timestamp;
  },

  methods: {
    //底部加载的时间方法
    async onLoad() {
      const res = await getAllArticleListAPI({
        channel_id: this.channelId,
        timestamp: this.theTime
      });
      console.log(res);
       if(res.data.data.results.length===0){
        this.finished =true
        return
      }
      this.list = [...this.list,...res.data.data.results];
      this.theTime = res.data.data.pre_timestamp;

      this.loading=false
    },
  },
};
</script>

<style>
</style>