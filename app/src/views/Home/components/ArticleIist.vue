<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
        offset="50"
      >
        <ArticleItem
          v-for="obj in list"
          :key="obj.art_id"
          :artObj="obj"
          @disLikeE="disLikeFn"
          @reportE="reportFn"
          @click.native="itemClickFn(obj.art_id)"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from "../../../components/ArticleItem.vue";
import {
  getAllArticleListAPI,
  disliskeArticleAPI,
  feedbackArticleReportAPI,
} from "@/api";
import { Notify } from "vant";
//问题 key重复，因为created里请求和onload请求同时发送，请求的都是一样的数据
//原因 van-list组件挂载时默认就会判定一次是否触底 第一页数据也是网络请求回来的，
//标签先挂载了，数据回来更新DOM，标签没有高度，此时loading上来就会触发加载，导致同时请求回了一样的数据
//（个人理解，就是在最先挂载的时候，先挂载标签，数据还没有到DOM，此时没有东西，所以loading上来就触发开始进行加载，
//这两个事件同时进行，最后导致数据重复）
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
      isLoading: false, //顶部的加载状态
    };
  },
  components: {
    ArticleItem,
  },
  async created() {
    this.getArticleListFn();
    // console.log(111);
    // const res = await getAllArticleListAPI({
    //   channel_id: this.channelId,
    //   timestamp: this.theTime,
    // });
    // console.log(res);
    // //下一段开头的那边文章时间戳
    // //第一次系统时间timestamp->
    // this.list = res.data.data.results;
    // this.theTime = res.data.data.pre_timestamp;
  },

  methods: {
    //专门负责发送请求
    async getArticleListFn() {
      const res = await getAllArticleListAPI({
        channel_id: this.channelId,
        timestamp: this.theTime,
      });
      console.log(res);
      //created()上来第一次list是空数组，合并空数组没有问题
      //onLoad()触底加载更多，2个数组合并更没有问题
      this.list = [
        ...this.list,
        /*现在的数组是空的，然后回来，与请求的数组合并在赋予list*/ ...res.data
          .data.results,
      ];
      this.theTime = res.data.data.pre_timestamp; //合并好后将下一页的页码保存，此时onload也在用

      this.loading = false;
      if (res.data.data.pre_timestamp === null) {
        //本次回来的数据时最后，没有下一段数据了
        this.finished = true;
      }
      //顶部加载状态改为false
      this.isLoading = false;
    },

    //底部加载事件方法
    async onLoad() {
      if (this.list.length === 0) {
        this.loading = false;
        return;
      }
      //【总结】就是将下面的getArticleList方法封装起来，然后哪里需要哪里调用
      // console.log(222);
      // const res = await getAllArticleListAPI({
      //   channel_id: this.channelId,
      //   timestamp: this.theTime
      // });
      // console.log(res);
      // this.list = [...this.list,...res.data.data.results];
      // this.theTime = res.data.data.pre_timestamp;
      this.getArticleListFn(); //这边调用的一个异步函数，导致数据没有回来
      //就往下面走，所以会报错，可以把下面的代码执行代码放入异步执行函数getArticleListFn里面
      //走完后，然后在用getArticleListFn。

      // this.loading = false;
      // if (res.data.data.pre_timestamp === null) {
      //   //本次回来的数据时最后，没有下一段数据了
      //   this.finished = true;
      // }
    },
    //顶部：刷新数据事件方法
    async onRefresh() {
      this.list = [];
      this.theTime = new Date().getTime();

      this.getArticleListFn();

      //list数组情况，来一份新的数据
      // const res = await getAllArticleListAPI({
      //   channel_id: this.channelId,
      //   timestamp: this.theTime,
      // });
      // console.log(res);
      // this.list = [...this.list, ...res.data.data.results];
      // this.theTime = res.data.data.pre_timestamp;
      //顶部加载状态改为false

      //this.isLoading = false;//这边调用的一个异步函数，导致数据没有回来
      //就往下面走，所以会报错，可以把下面的代码执行代码放入异步执行函数getArticleListFn里面
      //走完后，然后在用getArticleListFn。
    },
    //不感兴趣
    async disLikeFn(id) {
      const res = await disliskeArticleAPI({ artId: id });
      console.log(res);
      Notify({ type: "success", message: "反馈成功" });
    },
    //反馈文章
    async reportFn(id, value) {
      const res = await feedbackArticleReportAPI({ artId: id, type: value });
      console.log(res);
       Notify({ type: "success", message: "举报成功" });
    },
    itemClickFn(id) {
      this.$router.push({
        path:`/detail?art_id=${id}`
      })
    },
  },
};
</script>

<style>
</style>